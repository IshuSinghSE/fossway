import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function AuthCodeError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="glass rounded-2xl p-8 border border-border text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-destructive/10">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Authentication Error
          </h1>
          
          <p className="text-muted-foreground mb-6">
            Sorry, we couldn&apos;t complete your sign-in. This could be due to an expired link or a configuration issue.
          </p>

          <div className="space-y-3">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white border-0"
            >
              <Link href="/auth/login">Try Again</Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
