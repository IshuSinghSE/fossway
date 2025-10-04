import { NextResponse } from 'next/server';
import { createClient } from '../../../../lib/supabase/server';
import { profileGitHubUser } from '../../../../services/github-profile';
import { upsertUserPreferences } from '../../../../services/preferences';

export async function POST() {
  try {
    const supabase = await createClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get GitHub username from user metadata
    const githubUsername = user.user_metadata?.user_name || user.user_metadata?.preferred_username;
    
    if (!githubUsername) {
      return NextResponse.json(
        { error: 'GitHub username not found in user metadata' },
        { status: 400 }
      );
    }

    // Profile the user
    console.log(`Profiling GitHub user: ${githubUsername}`);
    const profileData = await profileGitHubUser(githubUsername);

    // Extract data for preferences
    const { skillProfile, profile, contributionStats } = profileData;

    // Prepare languages and interests
    const languages = skillProfile.languages.slice(0, 5).map(l => l.language);
    const interests = [
      ...skillProfile.topics.slice(0, 10).map(t => t.topic),
      ...skillProfile.frameworks,
    ].slice(0, 15);

    // Determine experience level based on years and activity
    let experienceLevel: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
    if (skillProfile.contributionYears >= 3 && skillProfile.score >= 5) {
      experienceLevel = 'advanced';
    } else if (skillProfile.contributionYears >= 1 || skillProfile.score >= 3) {
      experienceLevel = 'intermediate';
    }

    // Determine career path based on languages and topics
    let careerPath: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'devops' | 'data-science' | 'ml-ai' | 'other' = 'other';
    const topLangs = languages.map(l => l.toLowerCase());
    const topTopics = interests.map(t => t.toLowerCase());

    if (topLangs.some(l => ['javascript', 'typescript'].includes(l)) && 
        topTopics.some(t => ['react', 'vue', 'angular'].includes(t))) {
      careerPath = 'frontend';
    } else if (topLangs.some(l => ['python', 'java', 'go', 'rust'].includes(l)) &&
               topTopics.some(t => ['api', 'backend', 'database'].includes(t))) {
      careerPath = 'backend';
    } else if (topLangs.includes('javascript') || topLangs.includes('typescript')) {
      careerPath = 'fullstack';
    } else if (topLangs.some(l => ['swift', 'kotlin', 'dart'].includes(l))) {
      careerPath = 'mobile';
    } else if (topTopics.some(t => ['docker', 'kubernetes', 'ci', 'cd', 'devops'].includes(t))) {
      careerPath = 'devops';
    } else if (topLangs.includes('python') && topTopics.some(t => ['machine-learning', 'deep-learning', 'ai'].includes(t))) {
      careerPath = 'ml-ai';
    } else if (topLangs.includes('python') && topTopics.some(t => ['data', 'analytics', 'data-science'].includes(t))) {
      careerPath = 'data-science';
    }

    // Update user preferences
    await upsertUserPreferences(user.id, {
      languages,
      interests,
      experience_level: experienceLevel,
      career_path: careerPath,
      github_profile_synced: true,
      github_profile_synced_at: new Date().toISOString(),
    });

    // Store repositories in database
    const { error: repoError } = await supabase
      .from('repositories')
      .upsert(
        profileData.repos.slice(0, 50).map(repo => ({
          user_id: user.id,
          github_id: `${profile.login}/${repo.name}`,
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          language: repo.language,
          stars_count: repo.stargazers_count,
          topics: repo.topics,
          last_updated: repo.updated_at,
          is_fork: false, // Would need additional API call to determine
        })),
        { 
          onConflict: 'github_id',
          ignoreDuplicates: false 
        }
      );

    if (repoError) {
      console.error('Error storing repositories:', repoError);
    }

    // Store AI recommendations based on profile
    const recommendations = {
      skill_level: skillProfile.score,
      suggested_languages: languages,
      suggested_topics: interests,
      issue_types: skillProfile.preferredIssueTypes,
      activity_level: skillProfile.activityLevel,
      contribution_years: skillProfile.contributionYears,
      total_contributions: contributionStats?.totalContributions || 0,
    };

    const { error: aiError } = await supabase
      .from('ai_recommendations')
      .upsert({
        user_id: user.id,
        recommended_repos: [],
        recommended_issues: [],
        skill_match_score: skillProfile.score,
        reasoning: `Profiled based on ${skillProfile.totalRepos} repositories, ${skillProfile.languages.length} languages, and ${skillProfile.topics.length} topics.`,
        metadata: recommendations,
      }, {
        onConflict: 'user_id',
        ignoreDuplicates: false
      });

    if (aiError) {
      console.error('Error storing AI recommendations:', aiError);
    }

    return NextResponse.json({
      success: true,
      profile: {
        username: githubUsername,
        languages,
        interests,
        experienceLevel,
        careerPath,
        skillScore: skillProfile.score,
        activityLevel: skillProfile.activityLevel,
        totalRepos: skillProfile.totalRepos,
        totalStars: skillProfile.totalStars,
        contributionYears: skillProfile.contributionYears,
        totalContributions: contributionStats?.totalContributions || 0,
      },
      message: 'Profile analyzed and stored successfully',
    });
  } catch (error) {
    console.error('Error analyzing profile:', error);
    return NextResponse.json(
      { error: 'Failed to analyze profile', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user preferences to check sync status
    const { data: preferences, error: prefError } = await supabase
      .from('user_preferences')
      .select('github_profile_synced, github_profile_synced_at, languages, interests, experience_level, career_path')
      .eq('user_id', user.id)
      .single();

    if (prefError) {
      return NextResponse.json(
        { error: 'Failed to fetch profile sync status' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      synced: preferences?.github_profile_synced || false,
      syncedAt: preferences?.github_profile_synced_at,
      profile: preferences ? {
        languages: preferences.languages,
        interests: preferences.interests,
        experienceLevel: preferences.experience_level,
        careerPath: preferences.career_path,
      } : null,
    });
  } catch (error) {
    console.error('Error fetching profile status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile status' },
      { status: 500 }
    );
  }
}
