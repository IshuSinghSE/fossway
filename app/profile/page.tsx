import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getUserPreferences } from "@/services/preferences";
import { generateProfileInsights } from "@/services/gemini";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, TrendingUp, Target, Lightbulb, Github, Calendar, Mail } from "lucide-react";
import Link from "next/link";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Fetch user preferences
  const { data: preferences } = await getUserPreferences(user.id);

  // Generate AI insights if profile is synced
  let insights = null;
  if (preferences?.github_profile_synced && preferences.languages && preferences.languages.length > 0) {
    try {
      insights = await generateProfileInsights(
        preferences.languages,
        preferences.interests || [],
        preferences.experience_level || "beginner",
        preferences.career_path || "other"
      );
    } catch (error) {
      console.error("Failed to generate insights:", error);
    }
  }

  // Fetch AI recommendations from database
  const { data: aiRecommendations } = await supabase
    .from("ai_recommendations")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return (
    <div className="min-h-screen bg-background pt-24 px-6 pb-12">
      <div className="container mx-auto max-w-6xl">
        {/* Header Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Profile Picture */}
              {user.user_metadata?.avatar_url && (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt="Profile"
                  width={120}
                  height={120}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-primary/20"
                />
              )}
              
              {/* User Info */}
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  {user.user_metadata?.full_name || user.user_metadata?.name || user.user_metadata?.user_name || "Developer"}
                </h1>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  {user.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {user.email}
                    </div>
                  )}
                  {user.user_metadata?.user_name && (
                    <a
                      href={`https://github.com/${user.user_metadata.user_name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      @{user.user_metadata.user_name}
                    </a>
                  )}
                  {user.created_at && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Joined {new Date(user.created_at).toLocaleDateString()}
                    </div>
                  )}
                </div>

                {/* Experience & Career Path Badges */}
                {preferences && (
                  <div className="flex flex-wrap gap-2">
                    {preferences.experience_level && (
                      <Badge variant="secondary" className="capitalize">
                        {preferences.experience_level}
                      </Badge>
                    )}
                    {preferences.career_path && (
                      <Badge variant="outline" className="capitalize">
                        {preferences.career_path.replace("-", " ")}
                      </Badge>
                    )}
                    {preferences.github_profile_synced && (
                      <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20">
                        GitHub Synced
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Skills & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Programming Languages */}
            {preferences?.languages && preferences.languages.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Languages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {preferences.languages.map((lang: string) => (
                      <Badge key={lang} variant="secondary">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Interests */}
            {preferences?.interests && preferences.interests.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Interests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {preferences.interests.slice(0, 12).map((interest: string) => (
                      <Badge key={interest} variant="outline">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Profile Stats */}
            {aiRecommendations?.recommendations && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Profile Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {aiRecommendations.recommendations.skill_level && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Skill Score</span>
                      <Badge variant="secondary">
                        {aiRecommendations.recommendations.skill_level}/10
                      </Badge>
                    </div>
                  )}
                  {aiRecommendations.recommendations.activity_level && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Activity</span>
                      <Badge variant="outline" className="capitalize">
                        {aiRecommendations.recommendations.activity_level.replace("_", " ")}
                      </Badge>
                    </div>
                  )}
                  {aiRecommendations.recommendations.contribution_years !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Experience</span>
                      <Badge variant="outline">
                        {aiRecommendations.recommendations.contribution_years} years
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Sync Prompt */}
            {!preferences?.github_profile_synced && (
              <Card className="border-primary/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Unlock AI Insights
                  </CardTitle>
                  <CardDescription>
                    Sync your GitHub profile to get personalized recommendations!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    href="/preferences"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                  >
                    Go to Preferences
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - AI Insights */}
          <div className="lg:col-span-2 space-y-6">
            {insights ? (
              <>
                {/* Motivational Message */}
                <Card className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Sparkles className="h-6 w-6 text-primary" />
                      Your Daily Inspiration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-medium text-foreground leading-relaxed">
                      {insights.motivationalMessage}
                    </p>
                  </CardContent>
                </Card>

                {/* Learning Path */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Recommended Learning Path
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground leading-relaxed">
                      {insights.learningPath}
                    </p>
                  </CardContent>
                </Card>

                {/* Project Ideas */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-primary" />
                      Project Ideas for You
                    </CardTitle>
                    <CardDescription>
                      Tailored to your skills and interests
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {insights.projectIdeas.map((idea, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </span>
                          <span className="text-foreground leading-relaxed pt-0.5">
                            {idea}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Next Steps */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Your Next Steps
                    </CardTitle>
                    <CardDescription>
                      Action items to level up your skills
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {insights.nextSteps.map((step, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded border-2 border-primary mt-0.5" />
                          <span className="text-foreground leading-relaxed">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </>
            ) : preferences?.github_profile_synced ? (
              <Card>
                <CardHeader>
                  <CardTitle>Generating Insights...</CardTitle>
                  <CardDescription>
                    We&apos;re analyzing your profile to provide personalized recommendations
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center min-h-[400px]">
                <CardContent className="text-center space-y-4 py-12">
                  <Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold">Get Personalized Insights</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Sync your GitHub profile to unlock AI-powered recommendations, project ideas, and a personalized learning path.
                  </p>
                  <Link
                    href="/preferences"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 py-2 mt-4"
                  >
                    Sync GitHub Profile
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
