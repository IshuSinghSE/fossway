"use server";

import { createClient } from "@/lib/supabase/server";
import type { IssueInsert } from "@/lib/types/database";

/**
 * Get all issues with optional filters
 */
export async function getIssues(filters?: {
  repoId?: number;
  labels?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  state?: string;
  limit?: number;
}) {
  const supabase = await createClient();
  
  let query = supabase
    .from("issues")
    .select(`
      *,
      repository:repositories(*)
    `)
    .eq("state", filters?.state || "open")
    .order("updated_at", { ascending: false });

  if (filters?.repoId) {
    query = query.eq("repo_id", filters.repoId);
  }

  if (filters?.labels && filters.labels.length > 0) {
    query = query.contains("labels", filters.labels);
  }

  if (filters?.difficulty) {
    query = query.eq("difficulty", filters.difficulty);
  }

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;
  return { data, error };
}

/**
 * Get a single issue by ID
 */
export async function getIssueById(id: number) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("issues")
    .select(`
      *,
      repository:repositories(*)
    `)
    .eq("id", id)
    .single();

  return { data, error };
}

/**
 * Get issue by GitHub issue ID
 */
export async function getIssueByGithubId(githubIssueId: number) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("issues")
    .select(`
      *,
      repository:repositories(*)
    `)
    .eq("github_issue_id", githubIssueId)
    .single();

  return { data, error };
}

/**
 * Cache an issue (insert or update)
 */
export async function cacheIssue(issue: IssueInsert) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("issues")
    .upsert({
      ...issue,
      fetched_at: new Date().toISOString(),
    }, {
      onConflict: 'github_issue_id'
    })
    .select()
    .single();

  return { data, error };
}

/**
 * Batch cache issues
 */
export async function cacheIssues(issues: IssueInsert[]) {
  const supabase = await createClient();

  const issuesWithTimestamp = issues.map(issue => ({
    ...issue,
    fetched_at: new Date().toISOString(),
  }));

  const { data, error } = await supabase
    .from("issues")
    .upsert(issuesWithTimestamp, {
      onConflict: 'github_issue_id'
    })
    .select();

  return { data, error };
}

/**
 * Get trending issues from view
 */
export async function getTrendingIssues(limit: number = 50) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("trending_issues")
    .select("*")
    .limit(limit);

  return { data, error };
}

/**
 * Get issues by repository ID
 */
export async function getIssuesByRepo(repoId: number, limit: number = 20) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("issues")
    .select("*")
    .eq("repo_id", repoId)
    .eq("state", "open")
    .order("updated_at", { ascending: false })
    .limit(limit);

  return { data, error };
}

/**
 * Search issues by labels
 */
export async function searchIssuesByLabels(labels: string[], limit: number = 100) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("issues")
    .select(`
      *,
      repository:repositories(*)
    `)
    .contains("labels", labels)
    .eq("state", "open")
    .order("updated_at", { ascending: false })
    .limit(limit);

  return { data, error };
}

/**
 * Get good first issues
 */
export async function getGoodFirstIssues(limit: number = 50) {
  return await searchIssuesByLabels(["good first issue", "good-first-issue"], limit);
}

/**
 * Get help wanted issues
 */
export async function getHelpWantedIssues(limit: number = 50) {
  return await searchIssuesByLabels(["help wanted", "help-wanted"], limit);
}
