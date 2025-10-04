import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-background pt-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="glass rounded-2xl p-8 border border-border">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Your Profile
          </h1>

          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center gap-4">
              {user.user_metadata?.avatar_url && (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full border-2 border-primary"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {user.user_metadata?.full_name || user.user_metadata?.user_name || "User"}
                </h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>

            {/* User Info */}
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Account Information</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">User ID:</span>
                  <span className="text-foreground font-mono text-sm">{user.id}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="text-foreground">{user.email}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">Provider:</span>
                  <span className="text-foreground capitalize">{user.app_metadata?.provider || "github"}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">Created:</span>
                  <span className="text-foreground">
                    {new Date(user.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">Last Sign In:</span>
                  <span className="text-foreground">
                    {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* GitHub Info */}
            {user.user_metadata?.user_name && (
              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold mb-4 text-foreground">GitHub Information</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Username:</span>
                    <a
                      href={`https://github.com/${user.user_metadata.user_name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      @{user.user_metadata.user_name}
                    </a>
                  </div>
                  {user.user_metadata?.name && (
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Full Name:</span>
                      <span className="text-foreground">{user.user_metadata.name}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Raw Data (for debugging) */}
            {/* <details className="border-t border-border pt-6">
              <summary className="text-lg font-semibold mb-4 text-foreground cursor-pointer hover:text-primary">
                Raw User Data (Debug)
              </summary>
              <pre className="bg-muted p-4 rounded-lg overflow-auto text-xs">
                {JSON.stringify(user, null, 2)}
              </pre>
            </details> */}
          </div>
        </div>
      </div>
    </div>
  );
}
