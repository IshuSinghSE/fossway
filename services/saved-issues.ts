"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * Save an issue for later
 */
export async function saveIssue(userId: string, issueId: number, notes?: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("saved_issues")
    .insert({
      user_id: userId,
      issue_id: issueId,
      notes: notes || null,
    })
    .select()
    .single();

  return { data, error };
}

/**
 * Unsave an issue
 */
export async function unsaveIssue(userId: string, issueId: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("saved_issues")
    .delete()
    .eq("user_id", userId)
    .eq("issue_id", issueId);

  return { error };
}

/**
 * Get all saved issues for a user
 */
export async function getSavedIssues(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("saved_issues")
    .select(`
      *,
      issue:issues(
        *,
        repository:repositories(*)
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return { data, error };
}

/**
 * Check if an issue is saved
 */
export async function isIssueSaved(userId: string, issueId: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("saved_issues")
    .select("id")
    .eq("user_id", userId)
    .eq("issue_id", issueId)
    .limit(1);

  return { isSaved: data && data.length > 0, error };
}

/**
 * Update notes for a saved issue
 */
export async function updateSavedIssueNotes(
  userId: string,
  issueId: number,
  notes: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("saved_issues")
    .update({ notes })
    .eq("user_id", userId)
    .eq("issue_id", issueId)
    .select()
    .single();

  return { data, error };
}

/**
 * Get count of saved issues
 */
export async function getSavedIssuesCount(userId: string) {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("saved_issues")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  return { count: count || 0, error };
}
