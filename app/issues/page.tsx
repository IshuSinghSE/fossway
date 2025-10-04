import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { IssueDiscovery } from "@/components/IssueDiscovery";
import { getUserPreferences } from "@/services/preferences";
import { groupOptions, contributionOptions, languagesOptions } from "@/lib/data";

export default async function IssuesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Get user preferences
  const { data: preferences } = await getUserPreferences(user.id);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <IssueDiscovery 
        user={user}
        preferences={preferences}
        availableLanguages={languagesOptions}
        availableGroups={groupOptions}
        availableContributions={contributionOptions}
      />
    </div>
  );
}
