import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signInWithGitHub } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default async function LoginPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/issues");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="glass rounded-2xl p-8 border border-border">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
              Welcome to FOSSWay
            </h1>
            <p className="text-muted-foreground">
              Sign in with GitHub to start contributing to open source
            </p>
          </div>

          <form action={signInWithGitHub}>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              size="lg"
            >
              <Github className="w-5 h-5 mr-2" />
              Sign in with GitHub
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-6">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
