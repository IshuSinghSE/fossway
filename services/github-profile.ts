import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_APP_TOKEN,
});

export interface GitHubUserProfile {
  login: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  blog: string;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
  updated_at: string;
  avatar_url: string;
}

export interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  pushed_at: string;
  created_at: string;
  updated_at: string;
  size: number;
  default_branch: string;
}

export interface UserSkillProfile {
  languages: { language: string; count: number; percentage: number }[];
  topics: { topic: string; count: number }[];
  frameworks: string[];
  activityLevel: 'inactive' | 'low' | 'moderate' | 'active' | 'very_active';
  totalStars: number;
  totalRepos: number;
  recentActivity: boolean;
  contributionYears: number;
  preferredIssueTypes: string[];
  score: number;
}

/**
 * Fetch GitHub user profile
 */
export async function fetchGitHubProfile(username: string): Promise<GitHubUserProfile | null> {
  try {
    const { data } = await octokit.users.getByUsername({
      username,
    });

    return {
      login: data.login,
      name: data.name,
      bio: data.bio,
      location: data.location,
      blog: data.blog || '',
      followers: data.followers,
      following: data.following,
      public_repos: data.public_repos,
      created_at: data.created_at,
      updated_at: data.updated_at,
      avatar_url: data.avatar_url,
    };
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    return null;
  }
}

/**
 * Fetch user repositories
 */
export async function fetchGitHubRepos(username: string, maxRepos: number = 10): Promise<GitHubRepo[]> {
  try {
    const { data } = await octokit.repos.listForUser({
      username,
      per_page: maxRepos,
      sort: 'updated',
      direction: 'desc',
    });

    const reposWithTopics = await Promise.all(
      data.map(async (repo) => {
        // Skip fetching topics to avoid 403 errors, use empty array
        // Topics API requires specific permissions
        return {
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          language: repo.language || null,
          stargazers_count: repo.stargazers_count || 0,
          forks_count: repo.forks_count || 0,
          topics: [], // Topics not available without specific scope
          pushed_at: repo.pushed_at || '',
          created_at: repo.created_at || '',
          updated_at: repo.updated_at || '',
          size: repo.size || 0,
          default_branch: repo.default_branch || 'main',
        };
      })
    );

    return reposWithTopics;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

/**
 * Analyze user skills from repositories
 */
export function analyzeUserSkills(repos: GitHubRepo[], profile: GitHubUserProfile): UserSkillProfile {
  // Analyze languages
  const langFreq: Record<string, number> = {};
  repos.forEach(repo => {
    if (repo.language) {
      langFreq[repo.language] = (langFreq[repo.language] || 0) + 1;
    }
  });

  const totalLangRepos = Object.values(langFreq).reduce((a, b) => a + b, 0);
  const languages = Object.entries(langFreq)
    .map(([language, count]) => ({
      language,
      count,
      percentage: Math.round((count / totalLangRepos) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Analyze topics
  const topicFreq: Record<string, number> = {};
  repos.forEach(repo => {
    repo.topics.forEach(topic => {
      topicFreq[topic] = (topicFreq[topic] || 0) + 1;
    });
  });

  const topics = Object.entries(topicFreq)
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);

  // Detect frameworks from topics and repo names
  const frameworkKeywords = [
    'react', 'vue', 'angular', 'svelte', 'next', 'nuxt', 'gatsby',
    'django', 'flask', 'fastapi', 'express', 'nestjs', 'spring',
    'tensorflow', 'pytorch', 'scikit-learn', 'keras',
    'docker', 'kubernetes', 'aws', 'azure', 'gcp'
  ];

  const frameworks = [...new Set(
    topics
      .map(t => t.topic.toLowerCase())
      .filter(topic => frameworkKeywords.some(fw => topic.includes(fw)))
      .slice(0, 10)
  )];

  // Calculate activity level
  const now = new Date();
  const recentRepos = repos.filter(repo => {
    const pushedDate = new Date(repo.pushed_at);
    const monthsAgo = (now.getTime() - pushedDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
    return monthsAgo < 3;
  });

  let activityLevel: UserSkillProfile['activityLevel'] = 'inactive';
  if (recentRepos.length === 0) activityLevel = 'inactive';
  else if (recentRepos.length < 3) activityLevel = 'low';
  else if (recentRepos.length < 10) activityLevel = 'moderate';
  else if (recentRepos.length < 20) activityLevel = 'active';
  else activityLevel = 'very_active';

  // Calculate total stars
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

  // Check recent activity (last 30 days)
  const recentActivity = repos.some(repo => {
    const pushedDate = new Date(repo.pushed_at);
    const daysAgo = (now.getTime() - pushedDate.getTime()) / (1000 * 60 * 60 * 24);
    return daysAgo < 30;
  });

  // Calculate contribution years
  const accountAge = new Date(profile.created_at);
  const contributionYears = Math.floor((now.getTime() - accountAge.getTime()) / (1000 * 60 * 60 * 24 * 365));

  // Suggest preferred issue types based on languages and topics
  const preferredIssueTypes: string[] = [];
  
  const topLangs = languages.slice(0, 3).map(l => l.language.toLowerCase());
  if (topLangs.some(l => ['javascript', 'typescript', 'css', 'html'].includes(l))) {
    preferredIssueTypes.push('frontend', 'ui-ux', 'accessibility');
  }
  if (topLangs.some(l => ['python', 'java', 'go', 'rust', 'ruby'].includes(l))) {
    preferredIssueTypes.push('backend', 'api', 'performance');
  }
  if (topics.some(t => ['documentation', 'docs'].includes(t.topic.toLowerCase()))) {
    preferredIssueTypes.push('documentation');
  }
  if (topics.some(t => ['testing', 'ci', 'cd'].includes(t.topic.toLowerCase()))) {
    preferredIssueTypes.push('testing', 'devops');
  }

  // Calculate skill score (0-10)
  let score = 0;
  score += Math.min(repos.length / 10, 2); // Up to 2 points for repo count
  score += Math.min(totalStars / 100, 2); // Up to 2 points for stars
  score += Math.min(profile.followers / 50, 2); // Up to 2 points for followers
  score += Math.min(contributionYears / 2, 2); // Up to 2 points for experience
  if (activityLevel === 'very_active') score += 2;
  else if (activityLevel === 'active') score += 1.5;
  else if (activityLevel === 'moderate') score += 1;

  return {
    languages,
    topics,
    frameworks,
    activityLevel,
    totalStars,
    totalRepos: repos.length,
    recentActivity,
    contributionYears,
    preferredIssueTypes,
    score: Math.min(Math.round(score * 10) / 10, 10),
  };
}

/**
 * Get user contribution stats using GraphQL
 * Note: This may fail with 403 if token doesn't have required scopes
 */
export async function fetchContributionStats(username: string): Promise<{
  totalContributions: number;
  restrictedContributions: number;
} | null> {
  try {
    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
            restrictedContributionsCount
          }
        }
      }
    `;

    const response = await octokit.graphql<{
      user: {
        contributionsCollection: {
          contributionCalendar: { totalContributions: number };
          restrictedContributionsCount: number;
        };
      };
    }>(query, { username });

    return {
      totalContributions: response.user.contributionsCollection.contributionCalendar.totalContributions,
      restrictedContributions: response.user.contributionsCollection.restrictedContributionsCount,
    };
  } catch {
    // Silently fail - contribution stats are optional
    console.log('Note: Contribution stats unavailable (requires additional GitHub token scopes)');
    return null;
  }
}

/**
 * Complete user profiling pipeline
 */
export async function profileGitHubUser(username: string) {
  try {
    // Fetch profile
    const profile = await fetchGitHubProfile(username);
    if (!profile) {
      throw new Error('Failed to fetch GitHub profile');
    }

    // Fetch repositories
    const repos = await fetchGitHubRepos(username);
    
    // Analyze skills
    const skillProfile = analyzeUserSkills(repos, profile);
    
    // Fetch contribution stats
    const contributionStats = await fetchContributionStats(username);

    return {
      profile,
      repos,
      skillProfile,
      contributionStats,
      analyzedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error profiling GitHub user:', error);
    throw error;
  }
}
