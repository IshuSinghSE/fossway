'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Star, GitBranch, Clock, ExternalLink, Github, X, RefreshCw, Bookmark, BookmarkCheck, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { trackActivity } from "@/services/activity";
import { saveIssue, unsaveIssue } from "@/services/saved-issues";
import type { User } from "@supabase/supabase-js";
import type { UserPreferences } from "@/lib/types/database";
import { mockIssues } from "@/lib/data";
import { getLanguageColor, getDifficultyColor, formatStars, formatRelativeTime } from "@/lib/utils/issue-helpers";

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
  const [isSearching, setIsSearching] = useState(false);
  const [savedIssueIds, setSavedIssueIds] = useState<Set<string>>(new Set());
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [showingRealData, setShowingRealData] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [availableIssuesCount, setAvailableIssuesCount] = useState(0);

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

  // Fetch real repository data from database
  const fetchRealRepositories = async () => {
    try {
      const response = await fetch('/api/repos/fetch?type=beginner&limit=50');
      const result = await response.json();
      
      if (result.success && result.data) {
        // Transform repository data to match Issue interface
        const transformedIssues: Issue[] = result.data.map((repo: Record<string, unknown>, index: number) => ({
          id: String(repo.id || index),
          title: `Contribute to ${repo.name}`,
          repository: String(repo.repo_name || ''),
          description: String(repo.description || 'No description available'),
          language: String(repo.language || 'Multiple'),
          difficulty: (typeof repo.stars === 'number' && repo.stars > 10000 ? 'Intermediate' : 'Beginner') as 'Beginner' | 'Intermediate' | 'Advanced',
          stars: typeof repo.stars === 'number' ? repo.stars : 0,
          timeEstimate: '2-4 hours',
          labels: [...(Array.isArray(repo.topics) ? repo.topics : []), 'good first issue'],
          author: String(repo.owner || ''),
          createdAt: repo.pushed_at ? new Date(String(repo.pushed_at)).toLocaleDateString() : 'Recently',
          url: String(repo.url || ''),
          isSaved: false,
        }));
        
        setIssues(transformedIssues);
        setShowingRealData(true);
      }
    } catch (error) {
      console.error('Error fetching real repositories:', error);
      // Keep using mock data on error
    }
  };

  // Real-time GitHub search with API
  const searchGitHubIssues = async (query: string, language: string) => {
    if (query.length < 3) {
      // Reset to mock data if query is too short
      setIssues(mockIssues);
      setShowingRealData(false);
      return;
    }

    setIsSearching(true);
    try {
      const params = new URLSearchParams({
        q: query,
        type: 'issues',
        limit: '30',
      });
      
      if (language !== 'All') {
        params.append('language', language.toLowerCase());
      }

      const response = await fetch(`/api/search/github?${params.toString()}`);
      const result = await response.json();
      
      if (result.success && result.data) {
        // Transform GitHub search results to Issue interface
        const transformedIssues: Issue[] = result.data.map((item: {
          id: string;
          title: string;
          repository: string;
          description: string | null;
          language: string | null;
          stars: number;
          url: string;
          created_at: string;
          author: string;
          labels: string[];
        }) => ({
          id: item.id,
          title: item.title,
          repository: item.repository,
          description: item.description || 'No description available',
          language: item.language || 'Multiple',
          difficulty: 'Beginner' as const,
          stars: item.stars,
          timeEstimate: '2-4 hours',
          labels: item.labels.length > 0 ? item.labels : ['good first issue'],
          author: item.author,
          createdAt: formatRelativeTime(item.created_at),
          url: item.url,
          isSaved: false,
        }));
        
        setIssues(transformedIssues);
        setShowingRealData(true);
      }
    } catch (error) {
      console.error('Error searching GitHub:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search effect (500ms delay)
  useEffect(() => {
    if (searchQuery.length === 0) {
      // Reset to mock data when search is cleared
      setIssues(mockIssues);
      setShowingRealData(false);
      return;
    }

    if (searchQuery.length < 3) {
      // Don't search until at least 3 characters
      return;
    }

    const timer = setTimeout(() => {
      searchGitHubIssues(searchQuery, selectedLanguage);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedLanguage]);

  const filteredIssues = issues.filter(issue => {
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

  // Check if filters are active and no results found
  useEffect(() => {
    const hasActiveFilters = selectedLanguage !== "All" || 
                            selectedDifficulty !== "All" || 
                            selectedTimeRange !== "All" ||
                            searchQuery.length > 0;
    
    if (hasActiveFilters && filteredIssues.length === 0 && !isLoading && !isSearching) {
      // Calculate how many issues would be available if we reset filters
      const availableCount = issues.length;
      if (availableCount > 0) {
        setAvailableIssuesCount(availableCount);
        setShowResetDialog(true);
      }
    }
  }, [filteredIssues.length, selectedLanguage, selectedDifficulty, selectedTimeRange, searchQuery, isLoading, isSearching, issues.length]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedLanguage("All");
    setSelectedDifficulty("All");
    setSelectedTimeRange("All");
    setShowResetDialog(false);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      // First, trigger a refresh of repository data from GitHub
      await fetch('/api/repos/refresh', { method: 'POST' });
      // Then fetch the updated data
      await fetchRealRepositories();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsLoading(false);
    }
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

  return (
    <div className="min-h-screen bg-background text-foreground pt-20 px-4 md:px-20">
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

        {/* Real Data Banner */}
        {showingRealData && (
          <div className="glass rounded-lg p-4 border border-green-400/30 bg-green-400/10 mb-8 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <p className="text-green-400 text-sm">
              🎉 Showing live data from GitHub! {filteredIssues.length} {searchQuery ? 'search results' : 'repositories'} available.
            </p>
          </div>
        )}

        {/* Searching Indicator */}
        {isSearching && (
          <div className="glass rounded-lg p-4 border border-cyan-400/30 bg-cyan-400/10 mb-8 flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
            <p className="text-cyan-400 text-sm">
              Searching GitHub for &ldquo;{searchQuery}&rdquo;...
            </p>
          </div>
        )}

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
      <div className="container mx-auto px-6 mb-8 md:px-32">
        <div className="glass rounded-2xl p-6 border border-white/10">
          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
              <Input
                placeholder="Search issues on GitHub (type 3+ characters for real-time search)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 glass border-white/20 text-white placeholder:text-white/50"
              />
              {isSearching && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
                </div>
              )}
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredIssues.map((issue) => {
                const langColor = getLanguageColor(issue.language);
                const diffColor = getDifficultyColor(issue.difficulty);
                
                return (
                  <div key={issue.id} className="glass rounded-xl p-4 border border-white/10 hover:scale-[1.02] hover:border-cyan-400/30 transition-all duration-300 group flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2 flex-1">
                        {issue.title}
                      </h3>
                      <Badge className={`${diffColor} glass border shrink-0 text-xs`}>
                        {issue.difficulty}
                      </Badge>
                    </div>

                    {/* Repository & Stats */}
                    <div className="flex items-center gap-3 text-white/60 text-xs mb-3">
                      <div className="flex items-center gap-1 truncate">
                        <Github className="w-3 h-3 shrink-0" />
                        <span className="truncate">{issue.repository}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Star className="w-3 h-3" />
                        {formatStars(issue.stars)}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/70 text-sm leading-relaxed line-clamp-2 mb-3 flex-1">
                      {issue.description}
                    </p>

                    {/* Labels */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <Badge variant="outline" className={`${langColor.bg} ${langColor.text} ${langColor.border} border text-xs`}>
                        {issue.language}
                      </Badge>
                      {issue.labels.slice(0, 2).map((label, index) => (
                        <Badge key={index} variant="outline" className="glass border-white/20 text-white/60 text-[10px] px-1.5 py-0">
                          {label}
                        </Badge>
                      ))}
                      {issue.labels.length > 2 && (
                        <Badge variant="outline" className="glass border-white/20 text-white/60 text-[10px] px-1.5 py-0">
                          +{issue.labels.length - 2}
                        </Badge>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center pt-3 border-t border-white/10 mt-auto">
                      <div className="flex items-center gap-1 text-white/60 text-xs">
                        <Clock className="w-3 h-3" />
                        {issue.createdAt}
                      </div>
                      <div className="flex gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSaveToggle(issue.id)}
                          className="glass border-white/20 hover:border-cyan-400/50 h-8 px-2"
                        >
                          {savedIssueIds.has(issue.id) ? (
                            <BookmarkCheck className="w-3.5 h-3.5 text-cyan-400" />
                          ) : (
                            <Bookmark className="w-3.5 h-3.5" />
                          )}
                        </Button>
                        <Button
                          asChild
                          size="sm"
                          className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white border-0 group/btn h-8 px-3 text-xs"
                        >
                          <a 
                            href={issue.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={() => handleIssueClick(issue.id)}
                          >
                            View
                            <ExternalLink className="w-3 h-3 ml-1 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
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

      {/* Reset Filters Dialog */}
      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent className="glass border-white/20 bg-background/95 backdrop-blur-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              No Matches Found, But...
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/70 text-base space-y-3">
              <p>
                🤔 Hmm, your current filters are a bit too picky! No issues match your criteria.
              </p>
              <p className="text-lg font-semibold text-white">
                But wait! I&apos;ve got <span className="text-cyan-400">{availableIssuesCount} awesome issues</span> ready for you! 🎉
              </p>
              <p>
                Want me to reset your filters and show you all the cool stuff you could be working on?
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="glass border-white/20 text-white hover:bg-white/10">
              Nah, I&apos;ll keep looking
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleResetFilters}
              className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white border-0"
            >
              Yes, show me the issues! 🚀
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}