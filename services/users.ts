"use server";
import { createClient } from "@/lib/supabase/server";

const supabase = createClient();

export async function getUserByUUID(user_uuid: string) {
  const { data, error } = await (await supabase).from("users").select("*").eq("user_uuid", user_uuid);
  return { data, error };
}

export async function getUserByEmail(email: string) {
  const { data, error } = await (await supabase).from("users").select("*").eq("email", email);
  return { data, error };
}

export async function updateUserFullName(user_id: string, full_name: string) {
  const { data, error } = await (await supabase).from("users").update({ full_name }).eq("id", user_id);
  return { data, error };
}

export async function deleteUserAccount(user_id: string) {
  console.log("Deleting user account:", user_id);
  const { data, error } = await (await supabase).auth.admin.deleteUser(user_id);
  console.log("User account deleted:", data, error);
  return { error };
}