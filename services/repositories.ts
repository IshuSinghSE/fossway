"use server";

import { createClient } from "@/lib/supabase/server";
import type { RepositoryInsert } from "@/lib/types/database";

/**
 * Get all repositories with optional filters
 */
export async function getRepositories(filters?: {
  language?: string;
  minStars?: number;
  topics?: string[];
  limit?: number;
}) {
  const supabase = await createClient();
  
  let query = supabase
    .from("repositories")
    .select("*")
    .order("score", { ascending: false })
    .order("stars", { ascending: false });

  if (filters?.language) {
    query = query.eq("language", filters.language);
  }

  if (filters?.minStars) {
    query = query.gte("stars", filters.minStars);
  }

  if (filters?.topics && filters.topics.length > 0) {
    query = query.contains("topics", filters.topics);
  }

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;
  return { data, error };
}

/**
 * Get a single repository by ID
 */
export async function getRepositoryById(id: number) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("repositories")
    .select("*")
    .eq("id", id)
    .single();

  return { data, error };
}

/**
 * Get a repository by name (owner/repo)
 */
export async function getRepositoryByName(repoName: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("repositories")
    .select("*")
    .eq("repo_name", repoName)
    .single();

  return { data, error };
}

/**
 * Cache a repository (insert or update)
 */
export async function cacheRepository(repo: RepositoryInsert) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("repositories")
    .upsert({
      ...repo,
      fetched_at: new Date().toISOString(),
    })
    .select()
    .single();

  return { data, error };
}

/**
 * Batch cache repositories
 */
export async function cacheRepositories(repos: RepositoryInsert[]) {
  const supabase = await createClient();

  const reposWithTimestamp = repos.map(repo => ({
    ...repo,
    fetched_at: new Date().toISOString(),
  }));

  const { data, error } = await supabase
    .from("repositories")
    .upsert(reposWithTimestamp)
    .select();

  return { data, error };
}

/**
 * Get popular repositories from view
 */
export async function getPopularRepositories(limit: number = 50) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("popular_repositories")
    .select("*")
    .limit(limit);

  return { data, error };
}

/**
 * Search repositories by language and topics
 */
export async function searchRepositories(searchParams: {
  languages?: string[];
  topics?: string[];
  minStars?: number;
}) {
  const supabase = await createClient();
  
  let query = supabase
    .from("repositories")
    .select("*");

  if (searchParams.languages && searchParams.languages.length > 0) {
    query = query.in("language", searchParams.languages);
  }

  if (searchParams.topics && searchParams.topics.length > 0) {
    query = query.overlaps("topics", searchParams.topics);
  }

  if (searchParams.minStars) {
    query = query.gte("stars", searchParams.minStars);
  }

  query = query
    .order("score", { ascending: false })
    .order("stars", { ascending: false })
    .limit(100);

  const { data, error } = await query;
  return { data, error };
}

/**
 * Update repository score (for recommendation ranking)
 */
export async function updateRepositoryScore(repoId: number, score: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("repositories")
    .update({ score })
    .eq("id", repoId)
    .select()
    .single();

  return { data, error };
}
