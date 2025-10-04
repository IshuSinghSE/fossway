'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Star, GitBranch, Clock, ExternalLink, Github, X, RefreshCw, Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { trackActivity } from "@/services/activity";
import { saveIssue, unsaveIssue } from "@/services/saved-issues";
import type { User } from "@supabase/supabase-js";
import type { UserPreferences } from "@/lib/types/database";

interface Issue {
  id: string;
  title: string;
  repository: string;
  description: string;
  language: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  stars: number;
  timeEstimate: string;
  labels: string[];
  author: string;
  createdAt: string;
  url: string;
  isSaved?: boolean;
}

interface OptionItem {
  id: string;
  value: string;
  label: string;
  icon: string;
}

interface IssueDiscoveryProps {
  user: User;
  preferences: UserPreferences | null;
  availableLanguages: OptionItem[];
  availableGroups: OptionItem[];
  availableContributions: OptionItem[];
}

const mockIssues: Issue[] = [
  {
    id: "1",
    title: "Add dark mode toggle to documentation website",
    repository: "awesome-docs/website",
    description: "We need to implement a dark mode toggle for better user experience. The toggle should be persistent across sessions.",
    language: "JavaScript",
    difficulty: "Beginner",
    stars: 1250,
    timeEstimate: "2-4 hours",
    labels: ["good first issue", "documentation", "frontend"],
    author: "docsMaintainer",
    createdAt: "2 days ago",
    url: "https://github.com/awesome-docs/website/issues/123"
  },
  {
    id: "2",
    title: "Fix responsive layout issue on mobile devices",
    repository: "react-components/ui-library",
    description: "The card component doesn't display correctly on mobile screens. Need to adjust CSS media queries.",
    language: "CSS",
    difficulty: "Beginner",
    stars: 890,
    timeEstimate: "1-3 hours",
    labels: ["bug", "css", "mobile", "good first issue"],
    author: "uiTeam",
    createdAt: "1 day ago",
    url: "https://github.com/react-components/ui-library/issues/456"
  },
  {
    id: "3",
    title: "Implement user authentication with JWT",
    repository: "backend-api/auth-service",
    description: "Need to add JWT-based authentication to the API. Include login, logout, and token refresh endpoints.",
    language: "Python",
    difficulty: "Intermediate",
    stars: 2340,
    timeEstimate: "8-12 hours",
    labels: ["enhancement", "backend", "authentication"],
    author: "apiMaintainer",
    createdAt: "3 days ago",
    url: "https://github.com/backend-api/auth-service/issues/789"
  },
  {
    id: "4",
    title: "Add TypeScript support to existing JavaScript project",
    repository: "legacy-app/frontend",
    description: "Gradually migrate the codebase to TypeScript. Start with utility functions and components.",
    language: "TypeScript",
    difficulty: "Intermediate",
    stars: 567,
    timeEstimate: "10-15 hours",
    labels: ["typescript", "migration", "enhancement"],
    author: "frontendLead",
    createdAt: "5 days ago",
    url: "https://github.com/legacy-app/frontend/issues/321"
  },
  {
    id: "5",
    title: "Optimize database queries for better performance",
    repository: "data-analytics/dashboard",
    description: "Several database queries are taking too long. Need to analyze and optimize for better performance.",
    language: "SQL",
    difficulty: "Advanced",
    stars: 1890,
    timeEstimate: "15-20 hours",
    labels: ["performance", "database", "optimization"],
    author: "dbAdmin",
    createdAt: "1 week ago",
    url: "https://github.com/data-analytics/dashboard/issues/654"
  }
];

const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];
const timeRanges = ["All", "1-3 hours", "4-8 hours", "8+ hours"];

export function IssueDiscovery({ 
  user, 
  preferences, 
  availableLanguages
}: IssueDiscoveryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedTimeRange, setSelectedTimeRange] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [savedIssueIds, setSavedIssueIds] = useState<Set<string>>(new Set());

  // Generate language options from available languages
  const languages = ["All", ...availableLanguages.map(lang => lang.label)];

  // Set default language from user preferences
  useEffect(() => {
    if (preferences && preferences.languages.length > 0) {
      const firstLang = preferences.languages[0];
      const matchingLang = availableLanguages.find(
        lang => lang.value === firstLang.toLowerCase() || lang.label === firstLang
      );
      if (matchingLang) {
        setSelectedLanguage(matchingLang.label);
      }
    }
  }, [preferences, availableLanguages]);

  // Set default difficulty from user experience level
  useEffect(() => {
    if (preferences?.experience_level) {
      const levelMap: Record<string, string> = {
        'beginner': 'Beginner',
        'intermediate': 'Intermediate',
        'advanced': 'Advanced'
      };
      setSelectedDifficulty(levelMap[preferences.experience_level] || "All");
    }
  }, [preferences]);

  const filteredIssues = mockIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.repository.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLanguage = selectedLanguage === "All" || issue.language === selectedLanguage;
    const matchesDifficulty = selectedDifficulty === "All" || issue.difficulty === selectedDifficulty;
    
    const matchesTimeRange = selectedTimeRange === "All" || 
                            (selectedTimeRange === "1-3 hours" && issue.timeEstimate.includes("1-3")) ||
                            (selectedTimeRange === "4-8 hours" && (issue.timeEstimate.includes("2-4") || issue.timeEstimate.includes("8"))) ||
                            (selectedTimeRange === "8+ hours" && (issue.timeEstimate.includes("8-12") || issue.timeEstimate.includes("10-15") || issue.timeEstimate.includes("15-20")));

    return matchesSearch && matchesLanguage && matchesDifficulty && matchesTimeRange;
  });

  const handleRefresh = () => {
    setIsLoading(true);
    // In production, this would fetch from GitHub API and cache in database
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleIssueClick = async (issueId: string) => {
    // Track that user viewed this issue
    try {
      // In production, you'd convert string ID to database issue ID
      const dbIssueId = parseInt(issueId);
      if (!isNaN(dbIssueId)) {
        await trackActivity(user.id, dbIssueId, 'viewed');
      }
    } catch (error) {
      console.error('Error tracking activity:', error);
    }
  };

  const handleSaveToggle = async (issueId: string) => {
    try {
      const dbIssueId = parseInt(issueId);
      if (isNaN(dbIssueId)) return;

      if (savedIssueIds.has(issueId)) {
        await unsaveIssue(user.id, dbIssueId);
        setSavedIssueIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(issueId);
          return newSet;
        });
      } else {
        await saveIssue(user.id, dbIssueId);
        setSavedIssueIds(prev => new Set(prev).add(issueId));
      }
    } catch (error) {
      console.error('Error toggling save:', error);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-400/20 text-green-400 border-green-400/30';
      case 'Intermediate': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      case 'Advanced': return 'bg-red-400/20 text-red-400 border-red-400/30';
      default: return 'bg-white/20 text-white border-white/30';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <Button 
          variant="outline"
          asChild
          className="glass border-white/30 text-white hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300 mb-8"
        >
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 border border-cyan-400/30 mb-6">
            <GitBranch className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400">Issue Discovery</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Find Your Perfect{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              First Issue
            </span>
          </h1>
          
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            {preferences && preferences.languages.length > 0 
              ? `Personalized for ${preferences.languages.join(', ')} developers`
              : "Discover beginner-friendly open source issues tailored to your skills"
            }
          </p>
          
          {!preferences && (
            <div className="mt-4">
              <Button
                asChild
                variant="outline"
                className="glass border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10"
              >
                <Link href="/preferences">
                  Set Your Preferences
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Filters Section */}
      <div className="container mx-auto px-6 mb-8">
        <div className="glass rounded-2xl p-6 border border-white/10">
          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
              <Input
                placeholder="Search issues, repositories, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 glass border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            {/* Filter Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Language Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Language</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full glass border border-white/20 rounded-lg px-3 py-2 text-white bg-transparent"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang} className="bg-background text-white">
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full glass border border-white/20 rounded-lg px-3 py-2 text-white bg-transparent"
                >
                  {difficulties.map(diff => (
                    <option key={diff} value={diff} className="bg-background text-white">
                      {diff}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Range Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Time Estimate</label>
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="w-full glass border border-white/20 rounded-lg px-3 py-2 text-white bg-transparent"
                >
                  {timeRanges.map(range => (
                    <option key={range} value={range} className="bg-background text-white">
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              {/* Refresh Button */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Actions</label>
                <Button
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white border-0"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2">
              {selectedLanguage !== "All" && (
                <Badge variant="outline" className="glass border-cyan-400/30 text-cyan-400">
                  {selectedLanguage}
                  <X 
                    className="w-3 h-3 ml-1 cursor-pointer" 
                    onClick={() => setSelectedLanguage("All")}
                  />
                </Badge>
              )}
              {selectedDifficulty !== "All" && (
                <Badge variant="outline" className="glass border-purple-400/30 text-purple-400">
                  {selectedDifficulty}
                  <X 
                    className="w-3 h-3 ml-1 cursor-pointer" 
                    onClick={() => setSelectedDifficulty("All")}
                  />
                </Badge>
              )}
              {selectedTimeRange !== "All" && (
                <Badge variant="outline" className="glass border-green-400/30 text-green-400">
                  {selectedTimeRange}
                  <X 
                    className="w-3 h-3 ml-1 cursor-pointer" 
                    onClick={() => setSelectedTimeRange("All")}
                  />
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-6 pb-16">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/70">Finding perfect matches...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {filteredIssues.length} Issues Found
              </h2>
              <div className="text-white/60">
                Showing personalized matches
              </div>
            </div>

            <div className="grid gap-6">
              {filteredIssues.map((issue) => (
                <div key={issue.id} className="glass rounded-2xl p-6 border border-white/10 hover:scale-[1.02] transition-all duration-300 group">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 mb-2">
                          {issue.title}
                        </h3>
                        <div className="flex items-center gap-4 text-white/60 text-sm">
                          <div className="flex items-center gap-1">
                            <Github className="w-4 h-4" />
                            {issue.repository}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {issue.stars}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {issue.timeEstimate}
                          </div>
                        </div>
                      </div>
                      <Badge className={`${getDifficultyColor(issue.difficulty)} glass border`}>
                        {issue.difficulty}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-white/70 leading-relaxed">
                      {issue.description}
                    </p>

                    {/* Labels */}
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="glass border-white/20 text-white/70">
                        {issue.language}
                      </Badge>
                      {issue.labels.map((label, index) => (
                        <Badge key={index} variant="outline" className="glass border-white/20 text-white/60 text-xs">
                          {label}
                        </Badge>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                      <div className="text-white/60 text-sm">
                        Created {issue.createdAt} by {issue.author}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSaveToggle(issue.id)}
                          className="glass border-white/20 hover:border-cyan-400/50"
                        >
                          {savedIssueIds.has(issue.id) ? (
                            <>
                              <BookmarkCheck className="w-4 h-4 mr-2 text-cyan-400" />
                              Saved
                            </>
                          ) : (
                            <>
                              <Bookmark className="w-4 h-4 mr-2" />
                              Save
                            </>
                          )}
                        </Button>
                        <Button
                          asChild
                          className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white border-0 group/btn"
                        >
                          <a 
                            href={issue.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={() => handleIssueClick(issue.id)}
                          >
                            View Issue
                            <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredIssues.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full glass border border-white/20 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-white/40" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No issues found</h3>
                <p className="text-white/60">Try adjusting your filters or search query</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}