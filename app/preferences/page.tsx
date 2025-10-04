import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PreferencesForm } from "@/components/preferences/PreferencesForm";
import { getUserPreferences } from "@/services/preferences";

export default async function PreferencesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Get existing preferences
  const { data: preferences } = await getUserPreferences(user.id);

  return (
    <div className="min-h-screen bg-background pt-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
            Your Preferences
          </h1>
          <p className="text-muted-foreground">
            Tell us about your skills and interests to get personalized recommendations
          </p>
        </div>

        <PreferencesForm userId={user.id} initialPreferences={preferences} />
      </div>
    </div>
  );
}
