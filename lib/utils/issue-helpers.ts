/**
 * Language color mappings based on GitHub's language colors
 * https://github.com/ozh/github-colors
 */

export const languageColors: Record<string, { bg: string; text: string; border: string }> = {
  // Popular languages
  JavaScript: { bg: 'bg-yellow-400/20', text: 'text-yellow-400', border: 'border-yellow-400/30' },
  TypeScript: { bg: 'bg-blue-400/20', text: 'text-blue-400', border: 'border-blue-400/30' },
  Python: { bg: 'bg-blue-500/20', text: 'text-blue-500', border: 'border-blue-500/30' },
  Java: { bg: 'bg-orange-500/20', text: 'text-orange-500', border: 'border-orange-500/30' },
  'C#': { bg: 'bg-purple-500/20', text: 'text-purple-500', border: 'border-purple-500/30' },
  PHP: { bg: 'bg-indigo-400/20', text: 'text-indigo-400', border: 'border-indigo-400/30' },
  'C++': { bg: 'bg-pink-500/20', text: 'text-pink-500', border: 'border-pink-500/30' },
  C: { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-400/30' },
  Ruby: { bg: 'bg-red-500/20', text: 'text-red-500', border: 'border-red-500/30' },
  Go: { bg: 'bg-cyan-400/20', text: 'text-cyan-400', border: 'border-cyan-400/30' },
  Swift: { bg: 'bg-orange-400/20', text: 'text-orange-400', border: 'border-orange-400/30' },
  Kotlin: { bg: 'bg-purple-400/20', text: 'text-purple-400', border: 'border-purple-400/30' },
  Rust: { bg: 'bg-orange-600/20', text: 'text-orange-600', border: 'border-orange-600/30' },
  Dart: { bg: 'bg-teal-400/20', text: 'text-teal-400', border: 'border-teal-400/30' },
  Scala: { bg: 'bg-red-600/20', text: 'text-red-600', border: 'border-red-600/30' },
  Shell: { bg: 'bg-green-500/20', text: 'text-green-500', border: 'border-green-500/30' },
  'Objective-C': { bg: 'bg-blue-600/20', text: 'text-blue-600', border: 'border-blue-600/30' },
  R: { bg: 'bg-blue-300/20', text: 'text-blue-300', border: 'border-blue-300/30' },
  Perl: { bg: 'bg-indigo-500/20', text: 'text-indigo-500', border: 'border-indigo-500/30' },
  Haskell: { bg: 'bg-purple-600/20', text: 'text-purple-600', border: 'border-purple-600/30' },
  Elixir: { bg: 'bg-purple-300/20', text: 'text-purple-300', border: 'border-purple-300/30' },
  Clojure: { bg: 'bg-green-600/20', text: 'text-green-600', border: 'border-green-600/30' },
  Lua: { bg: 'bg-blue-700/20', text: 'text-blue-700', border: 'border-blue-700/30' },
  MATLAB: { bg: 'bg-orange-300/20', text: 'text-orange-300', border: 'border-orange-300/30' },
  Groovy: { bg: 'bg-cyan-600/20', text: 'text-cyan-600', border: 'border-cyan-600/30' },
  
  // Markup/Style
  HTML: { bg: 'bg-orange-500/20', text: 'text-orange-500', border: 'border-orange-500/30' },
  CSS: { bg: 'bg-blue-400/20', text: 'text-blue-400', border: 'border-blue-400/30' },
  Markdown: { bg: 'bg-gray-600/20', text: 'text-gray-400', border: 'border-gray-400/30' },
  
  // Databases
  SQL: { bg: 'bg-pink-400/20', text: 'text-pink-400', border: 'border-pink-400/30' },
  
  // Default
  Multiple: { bg: 'bg-white/10', text: 'text-white/70', border: 'border-white/20' },
  default: { bg: 'bg-white/10', text: 'text-white/70', border: 'border-white/20' },
};

/**
 * Get language color classes
 */
export function getLanguageColor(language: string | null): { bg: string; text: string; border: string } {
  if (!language) return languageColors.default;
  return languageColors[language] || languageColors.default;
}

/**
 * Get difficulty color classes
 */
export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'Beginner':
    case 'easy':
      return 'bg-green-400/20 text-green-400 border-green-400/30';
    case 'Intermediate':
    case 'medium':
      return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
    case 'Advanced':
    case 'hard':
      return 'bg-red-400/20 text-red-400 border-red-400/30';
    default:
      return 'bg-white/20 text-white border-white/30';
  }
}

/**
 * Format star count
 */
export function formatStars(stars: number): string {
  if (stars >= 1000) {
    return `${(stars / 1000).toFixed(1)}k`;
  }
  return stars.toString();
}

/**
 * Format date to relative time
 */
export function formatRelativeTime(date: string): string {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}
