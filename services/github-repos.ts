import { Octokit } from "@octokit/rest";
import { createClient } from "../lib/supabase/server";

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

export interface GitHubRepo {
  full_name: string;
  name: string;
  owner: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  topics: string[];
  pushed_at: string;
  html_url: string;
  license: { name: string } | null;
  has_good_first_issues?: boolean;
}

export interface GitHubIssue {
  id: number;
  title: string;
  body: string | null;
  html_url: string;
  labels: Array<{ name: string; color: string }>;
  state: string;
  created_at: string;
  repository_url: string;
  user: {
    login: string;
    avatar_url: string;
  };
}

/**
 * Fetch popular repositories from GitHub
 * Stars > 500, recently updated, sorted by stars
 */
export async function fetchPopularRepositories(perPage: number = 30): Promise<GitHubRepo[]> {
  try {
    const response = await octokit.rest.search.repos({
      q: 'stars:>500 pushed:>2024-06-01',
      sort: 'stars',
      order: 'desc',
      per_page: perPage,
    });

    return response.data.items.map(repo => ({
      full_name: repo.full_name,
      name: repo.name,
      owner: repo.owner?.login || 'unknown',
      description: repo.description,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      open_issues_count: repo.open_issues_count,
      topics: repo.topics || [],
      pushed_at: repo.pushed_at || new Date().toISOString(),
      html_url: repo.html_url,
      license: repo.license,
    }));
  } catch (error) {
    console.error('Error fetching popular repositories:', error);
    return [];
  }
}

/**
 * Fetch beginner-friendly repositories with "good first issue" label
 * Great for onboarding new contributors
 */
export async function fetchBeginnerFriendlyRepositories(perPage: number = 20): Promise<GitHubRepo[]> {
  try {
    const response = await octokit.rest.search.repos({
      q: 'label:good-first-issue stars:>50 pushed:>2024-06-01',
      sort: 'updated',
      order: 'desc',
      per_page: perPage,
    });

    return response.data.items.map(repo => ({
      full_name: repo.full_name,
      name: repo.name,
      owner: repo.owner?.login || 'unknown',
      description: repo.description,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      open_issues_count: repo.open_issues_count,
      topics: repo.topics || [],
      pushed_at: repo.pushed_at || new Date().toISOString(),
      html_url: repo.html_url,
      license: repo.license,
      has_good_first_issues: true,
    }));
  } catch (error) {
    console.error('Error fetching beginner-friendly repositories:', error);
    return [];
  }
}

/**
 * Fetch repositories by specific language and criteria
 */
export async function fetchRepositoriesByLanguage(
  language: string,
  minStars: number = 100,
  perPage: number = 20
): Promise<GitHubRepo[]> {
  try {
    const response = await octokit.rest.search.repos({
      q: `language:${language} stars:>${minStars} pushed:>2024-06-01`,
      sort: 'stars',
      order: 'desc',
      per_page: perPage,
    });

    return response.data.items.map(repo => ({
      full_name: repo.full_name,
      name: repo.name,
      owner: repo.owner?.login || 'unknown',
      description: repo.description,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      open_issues_count: repo.open_issues_count,
      topics: repo.topics || [],
      pushed_at: repo.pushed_at || new Date().toISOString(),
      html_url: repo.html_url,
      license: repo.license,
    }));
  } catch (error) {
    console.error(`Error fetching ${language} repositories:`, error);
    return [];
  }
}

/**
 * Fetch "good first issue" issues from a repository
 */
export async function fetchGoodFirstIssues(
  owner: string,
  repo: string,
  perPage: number = 10
): Promise<GitHubIssue[]> {
  try {
    const response = await octokit.rest.issues.listForRepo({
      owner,
      repo,
      labels: 'good first issue',
      state: 'open',
      per_page: perPage,
      sort: 'created',
      direction: 'desc',
    });

    return response.data.map(issue => ({
      id: issue.id,
      title: issue.title,
      body: issue.body || null,
      html_url: issue.html_url,
      labels: issue.labels.map((label) => ({
        name: typeof label === 'string' ? label : (label.name || ''),
        color: typeof label === 'string' ? 'cccccc' : (label.color || 'cccccc'),
      })),
      state: issue.state,
      created_at: issue.created_at,
      repository_url: issue.repository_url,
      user: {
        login: issue.user?.login || 'unknown',
        avatar_url: issue.user?.avatar_url || '',
      },
    }));
  } catch (error) {
    console.error(`Error fetching good first issues for ${owner}/${repo}:`, error);
    return [];
  }
}

/**
 * Store fetched repositories in Supabase
 */
export async function storeRepositoriesInDatabase(repos: GitHubRepo[]): Promise<void> {
  const supabase = await createClient();

  const repoData = repos.map(repo => ({
    repo_name: repo.full_name,
    owner: repo.owner,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    open_issues: repo.open_issues_count,
    license: repo.license?.name || null,
    topics: repo.topics,
    pushed_at: repo.pushed_at,
    url: repo.html_url,
    score: repo.stargazers_count, // Simple scoring for now
    fetched_at: new Date().toISOString(),
  }));

  const { error } = await supabase
    .from('repositories')
    .upsert(repoData, {
      onConflict: 'repo_name',
      ignoreDuplicates: false,
    });

  if (error) {
    console.error('Error storing repositories in database:', error);
    throw error;
  }
}

/**
 * Get repositories from database with optional filtering
 */
export async function getRepositoriesFromDatabase(options?: {
  languages?: string[];
  minStars?: number;
  hasGoodFirstIssues?: boolean;
  limit?: number;
}) {
  const supabase = await createClient();

  let query = supabase
    .from('repositories')
    .select('*')
    .order('stars', { ascending: false });

  if (options?.languages && options.languages.length > 0) {
    query = query.in('language', options.languages);
  }

  if (options?.minStars) {
    query = query.gte('stars', options.minStars);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching repositories from database:', error);
    return [];
  }

  return data;
}

/**
 * Refresh repository data (for cron jobs)
 */
export async function refreshRepositoryData(): Promise<{
  popular: number;
  beginnerFriendly: number;
}> {
  try {
    // Fetch both types of repos
    const [popularRepos, beginnerRepos] = await Promise.all([
      fetchPopularRepositories(30),
      fetchBeginnerFriendlyRepositories(20),
    ]);

    // Combine and deduplicate
    const allRepos = [...popularRepos, ...beginnerRepos];
    const uniqueRepos = Array.from(
      new Map(allRepos.map(repo => [repo.full_name, repo])).values()
    );

    // Store in database
    await storeRepositoriesInDatabase(uniqueRepos);

    return {
      popular: popularRepos.length,
      beginnerFriendly: beginnerRepos.length,
    };
  } catch (error) {
    console.error('Error refreshing repository data:', error);
    throw error;
  }
}

/**
 * Get personalized repository recommendations based on user preferences
 */
export async function getPersonalizedRepositories(
  userId: string,
  limit: number = 20
) {
  const supabase = await createClient();

  // Get user preferences
  const { data: preferences } = await supabase
    .from('user_preferences')
    .select('languages, interests, experience_level')
    .eq('user_id', userId)
    .single();

  if (!preferences) {
    // Return popular repos if no preferences
    return getRepositoriesFromDatabase({ limit });
  }

  // Filter by user's preferred languages
  return getRepositoriesFromDatabase({
    languages: preferences.languages,
    minStars: preferences.experience_level === 'beginner' ? 50 : 500,
    limit,
  });
}
