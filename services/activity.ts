"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * Track user activity
 */
export async function trackActivity(
  userId: string,
  issueId: number,
  action: 'viewed' | 'saved' | 'opened' | 'contributed'
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_activity")
    .insert({
      user_id: userId,
      issue_id: issueId,
      action,
    })
    .select()
    .single();

  return { data, error };
}

/**
 * Get user activity history
 */
export async function getUserActivity(userId: string, limit: number = 50) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_activity")
    .select(`
      *,
      issue:issues(
        *,
        repository:repositories(*)
      )
    `)
    .eq("user_id", userId)
    .order("timestamp", { ascending: false })
    .limit(limit);

  return { data, error };
}

/**
 * Get user activity summary
 */
export async function getUserActivitySummary(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_activity_summary")
    .select("*")
    .eq("user_id", userId)
    .single();

  return { data, error };
}

/**
 * Get recently viewed issues
 */
export async function getRecentlyViewedIssues(userId: string, limit: number = 10) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_activity")
    .select(`
      *,
      issue:issues(
        *,
        repository:repositories(*)
      )
    `)
    .eq("user_id", userId)
    .eq("action", "viewed")
    .order("timestamp", { ascending: false })
    .limit(limit);

  return { data, error };
}

/**
 * Check if user has viewed an issue
 */
export async function hasViewedIssue(userId: string, issueId: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_activity")
    .select("id")
    .eq("user_id", userId)
    .eq("issue_id", issueId)
    .eq("action", "viewed")
    .limit(1);

  return { hasViewed: data && data.length > 0, error };
}

/**
 * Get user's contributed issues
 */
export async function getUserContributions(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_activity")
    .select(`
      *,
      issue:issues(
        *,
        repository:repositories(*)
      )
    `)
    .eq("user_id", userId)
    .eq("action", "contributed")
    .order("timestamp", { ascending: false });

  return { data, error };
}
