import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

export interface GitHubSearchResult {
  id: number;
  title: string;
  repository: string;
  repositoryUrl: string;
  description: string | null;
  language: string | null;
  labels: string[];
  state: string;
  url: string;
  createdAt: string;
  user: {
    login: string;
    avatarUrl: string;
  };
  stars: number;
}

/**
 * Search GitHub issues in real-time
 * Searches for issues with "good first issue" label by default
 */
export async function searchGitHubIssues(
  query: string,
  language?: string,
  perPage: number = 30
): Promise<GitHubSearchResult[]> {
  try {
    // Build search query
    let searchQuery = `${query} label:"good first issue" state:open`;
    
    if (language && language !== 'All') {
      searchQuery += ` language:${language}`;
    }

    const response = await octokit.rest.search.issuesAndPullRequests({
      q: searchQuery,
      sort: 'updated',
      order: 'desc',
      per_page: perPage,
    });

    // Fetch repository stars for each issue
    const issuesWithStars = await Promise.all(
      response.data.items.map(async (issue) => {
        try {
          // Extract owner and repo from repository_url
          const repoUrlParts = issue.repository_url.split('/');
          const owner = repoUrlParts[repoUrlParts.length - 2];
          const repo = repoUrlParts[repoUrlParts.length - 1];

          // Fetch repo details for star count
          const repoData = await octokit.rest.repos.get({ owner, repo });

          return {
            id: issue.id,
            title: issue.title,
            repository: `${owner}/${repo}`,
            repositoryUrl: `https://github.com/${owner}/${repo}`,
            description: issue.body || null,
            language: repoData.data.language,
            labels: issue.labels.map((label) =>
              typeof label === 'string' ? label : label.name || ''
            ),
            state: issue.state,
            url: issue.html_url,
            createdAt: issue.created_at,
            user: {
              login: issue.user?.login || 'unknown',
              avatarUrl: issue.user?.avatar_url || '',
            },
            stars: repoData.data.stargazers_count,
          };
        } catch (error) {
          console.error('Error fetching repo details:', error);
          // Return issue without stars if repo fetch fails
          const repoUrlParts = issue.repository_url.split('/');
          const owner = repoUrlParts[repoUrlParts.length - 2];
          const repo = repoUrlParts[repoUrlParts.length - 1];
          
          return {
            id: issue.id,
            title: issue.title,
            repository: `${owner}/${repo}`,
            repositoryUrl: `https://github.com/${owner}/${repo}`,
            description: issue.body || null,
            language: null,
            labels: issue.labels.map((label) =>
              typeof label === 'string' ? label : label.name || ''
            ),
            state: issue.state,
            url: issue.html_url,
            createdAt: issue.created_at,
            user: {
              login: issue.user?.login || 'unknown',
              avatarUrl: issue.user?.avatar_url || '',
            },
            stars: 0,
          };
        }
      })
    );

    return issuesWithStars;
  } catch (error) {
    console.error('Error searching GitHub issues:', error);
    return [];
  }
}

/**
 * Search repositories in real-time
 */
export async function searchGitHubRepositories(
  query: string,
  language?: string,
  perPage: number = 30
): Promise<GitHubSearchResult[]> {
  try {
    let searchQuery = `${query} good-first-issues:>0`;
    
    if (language && language !== 'All') {
      searchQuery += ` language:${language}`;
    }

    const response = await octokit.rest.search.repos({
      q: searchQuery,
      sort: 'stars',
      order: 'desc',
      per_page: perPage,
    });

    return response.data.items.map((repo) => ({
      id: repo.id,
      title: `Contribute to ${repo.name}`,
      repository: repo.full_name,
      repositoryUrl: repo.html_url,
      description: repo.description,
      language: repo.language,
      labels: repo.topics || [],
      state: 'open',
      url: repo.html_url,
      createdAt: repo.created_at,
      user: {
        login: repo.owner?.login || 'unknown',
        avatarUrl: repo.owner?.avatar_url || '',
      },
      stars: repo.stargazers_count,
    }));
  } catch (error) {
    console.error('Error searching GitHub repositories:', error);
    return [];
  }
}
