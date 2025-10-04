// Database Types for FOSSWay Supabase Schema

export interface User {
  id: string;
  github_username: string;
  email: string;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  languages: string[];
  interests: string[];
  career_path: string | null;
  experience_level: 'beginner' | 'intermediate' | 'advanced' | null;
  updated_at: string;
}

export interface Repository {
  id: number;
  repo_name: string;
  owner: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  open_issues: number;
  license: string | null;
  topics: string[];
  pushed_at: string | null;
  url: string;
  score: number;
  fetched_at: string;
  created_at: string;
  updated_at: string;
}

export interface Issue {
  id: number;
  github_issue_id: number;
  repo_id: number;
  title: string;
  body: string | null;
  url: string;
  labels: string[];
  state: string;
  difficulty: 'easy' | 'medium' | 'hard' | null;
  created_at: string;
  updated_at: string;
  fetched_at: string;
}

export interface UserActivity {
  id: string;
  user_id: string;
  issue_id: number;
  action: 'viewed' | 'saved' | 'opened' | 'contributed';
  timestamp: string;
}

export interface SavedIssue {
  id: string;
  user_id: string;
  issue_id: number;
  notes: string | null;
  created_at: string;
}

export interface AIRecommendation {
  id: string;
  user_id: string;
  recommendations: Record<string, unknown>;
  context: string | null;
  created_at: string;
}

// Extended types with joins
export interface IssueWithRepo extends Issue {
  repository?: Repository;
}

export interface SavedIssueWithDetails extends SavedIssue {
  issue?: IssueWithRepo;
}

export interface UserActivitySummary {
  user_id: string;
  github_username: string;
  total_issues_interacted: number;
  issues_viewed: number;
  issues_saved: number;
  issues_opened: number;
  contributions: number;
}

export interface PopularRepository extends Repository {
  issue_count: number;
  user_interactions: number;
}

export interface TrendingIssue extends Issue {
  repo_name: string;
  owner: string;
  repo_stars: number;
  view_count: number;
}

// Form types
export interface UserPreferencesUpdate {
  languages?: string[];
  interests?: string[];
  career_path?: string;
  experience_level?: 'beginner' | 'intermediate' | 'advanced';
}

export interface UserProfileUpdate {
  github_username?: string;
  avatar_url?: string;
  bio?: string;
}

// Database insert types
export type UserInsert = Omit<User, 'created_at' | 'updated_at'>;
export type RepositoryInsert = Omit<Repository, 'id' | 'created_at' | 'updated_at' | 'fetched_at'>;
export type IssueInsert = Omit<Issue, 'id' | 'fetched_at'>;
export type UserActivityInsert = Omit<UserActivity, 'id' | 'timestamp'>;
export type SavedIssueInsert = Omit<SavedIssue, 'id' | 'created_at'>;
