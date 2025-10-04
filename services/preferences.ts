"use server";

import { createClient } from "@/lib/supabase/server";
import type { UserPreferencesUpdate } from "@/lib/types/database";

/**
 * Get user preferences by user ID
 */
export async function getUserPreferences(userId: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("user_preferences")
    .select("*")
    .eq("user_id", userId)
    .single();

  return { data, error };
}

/**
 * Create or update user preferences
 */
export async function upsertUserPreferences(
  userId: string,
  preferences: UserPreferencesUpdate
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_preferences")
    .upsert({
      user_id: userId,
      ...preferences,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  return { data, error };
}

/**
 * Add a language to user preferences
 */
export async function addLanguagePreference(userId: string, language: string) {
  const supabase = await createClient();

  // Get current preferences
  const { data: current } = await getUserPreferences(userId);
  
  if (!current) {
    return await upsertUserPreferences(userId, { languages: [language] });
  }

  const languages = [...new Set([...current.languages, language])];
  return await upsertUserPreferences(userId, { languages });
}

/**
 * Remove a language from user preferences
 */
export async function removeLanguagePreference(userId: string, language: string) {
  const { data: current } = await getUserPreferences(userId);
  
  if (!current) return { data: null, error: null };

  const languages = current.languages.filter((lang: string) => lang !== language);
  return await upsertUserPreferences(userId, { languages });
}

/**
 * Add an interest to user preferences
 */
export async function addInterestPreference(userId: string, interest: string) {
  const { data: current } = await getUserPreferences(userId);
  
  if (!current) {
    return await upsertUserPreferences(userId, { interests: [interest] });
  }

  const interests = [...new Set([...current.interests, interest])];
  return await upsertUserPreferences(userId, { interests });
}

/**
 * Remove an interest from user preferences
 */
export async function removeInterestPreference(userId: string, interest: string) {
  const { data: current } = await getUserPreferences(userId);
  
  if (!current) return { data: null, error: null };

  const interests = current.interests.filter((int: string) => int !== interest);
  return await upsertUserPreferences(userId, { interests });
}

/**
 * Update career path
 */
export async function updateCareerPath(userId: string, careerPath: string) {
  return await upsertUserPreferences(userId, { career_path: careerPath });
}

/**
 * Update experience level
 */
export async function updateExperienceLevel(
  userId: string,
  experienceLevel: 'beginner' | 'intermediate' | 'advanced'
) {
  return await upsertUserPreferences(userId, { experience_level: experienceLevel });
}
