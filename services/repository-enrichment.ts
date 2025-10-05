import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export interface RepositoryEnrichment {
  summary: string;
  category: string;
  contributionTips: string[];
  skillsNeeded: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

/**
 * Use Gemini AI to enrich repository metadata
 * This adds intelligent categorization and contribution guidance
 */
export async function enrichRepositoryWithAI(
  repoData: {
    name: string;
    description: string | null;
    language: string | null;
    topics: string[];
    stars: number;
    readme?: string;
  }
): Promise<RepositoryEnrichment | null> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
Analyze this GitHub repository and provide structured insights:

Repository: ${repoData.name}
Description: ${repoData.description || 'No description'}
Language: ${repoData.language || 'Unknown'}
Topics: ${repoData.topics.join(', ')}
Stars: ${repoData.stars}

Provide:
1. A one-line summary (max 100 chars)
2. Category (e.g., "Frontend Framework", "Backend API", "Dev Tools", "Mobile App")
3. 3 tips for new contributors
4. 3-5 skills needed to contribute
5. Difficulty level (Beginner/Intermediate/Advanced)

Format as JSON:
{
  "summary": "...",
  "category": "...",
  "contributionTips": ["...", "...", "..."],
  "skillsNeeded": ["...", "...", "..."],
  "difficulty": "..."
}
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    // Extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.warn('No JSON found in AI response for', repoData.name);
      return null;
    }

    const enrichment = JSON.parse(jsonMatch[0]) as RepositoryEnrichment;
    return enrichment;
  } catch (error) {
    console.error('Error enriching repository with AI:', error);
    return null;
  }
}

/**
 * Batch enrich multiple repositories
 * Uses rate limiting to avoid API quota issues
 */
export async function batchEnrichRepositories(
  repos: Array<{
    id: number;
    name: string;
    description: string | null;
    language: string | null;
    topics: string[];
    stars: number;
  }>,
  maxConcurrent: number = 3
): Promise<Map<number, RepositoryEnrichment>> {
  const enrichments = new Map<number, RepositoryEnrichment>();
  
  // Process in batches to avoid rate limits
  for (let i = 0; i < repos.length; i += maxConcurrent) {
    const batch = repos.slice(i, i + maxConcurrent);
    
    const results = await Promise.all(
      batch.map(async (repo) => {
        const enrichment = await enrichRepositoryWithAI(repo);
        return { id: repo.id, enrichment };
      })
    );

    results.forEach(({ id, enrichment }) => {
      if (enrichment) {
        enrichments.set(id, enrichment);
      }
    });

    // Wait between batches to respect rate limits
    if (i + maxConcurrent < repos.length) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  return enrichments;
}

/**
 * Generate contribution tips based on user profile and repository
 */
export async function generateContributionGuidance(
  userProfile: {
    languages: string[];
    experienceLevel: string;
    interests: string[];
  },
  repository: {
    name: string;
    description: string | null;
    language: string | null;
    topics: string[];
  }
): Promise<string[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
User Profile:
- Languages: ${userProfile.languages.join(', ')}
- Experience: ${userProfile.experienceLevel}
- Interests: ${userProfile.interests.join(', ')}

Repository:
- Name: ${repository.name}
- Description: ${repository.description}
- Language: ${repository.language}
- Topics: ${repository.topics.join(', ')}

Generate 3-5 specific, actionable tips for this user to start contributing to this repository.
Make them encouraging and tailored to their experience level.
Return as a JSON array of strings.

Example:
["Look for issues labeled 'good first issue' or 'documentation'", "Start by improving test coverage in areas you're familiar with", "Join their Discord/Slack to introduce yourself"]
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    // Extract array from response
    const arrayMatch = response.match(/\[[\s\S]*\]/);
    if (!arrayMatch) {
      return [
        "Start with documentation improvements",
        "Look for 'good first issue' labels",
        "Read the CONTRIBUTING.md guide first",
      ];
    }

    const tips = JSON.parse(arrayMatch[0]) as string[];
    return tips;
  } catch (error) {
    console.error('Error generating contribution guidance:', error);
    return [
      "Review the project's documentation first",
      "Check for beginner-friendly issues",
      "Introduce yourself in the community channels",
    ];
  }
}

/**
 * Static fallback enrichment based on heuristics
 * Used when AI is unavailable or for faster responses
 */
export function staticEnrichRepository(repoData: {
  name: string;
  description: string | null;
  language: string | null;
  topics: string[];
  stars: number;
}): RepositoryEnrichment {
  // Determine category from topics and language
  const topics = repoData.topics.map(t => t.toLowerCase());
  let category = "Other";

  if (topics.some(t => ['react', 'vue', 'angular', 'frontend', 'ui'].includes(t))) {
    category = "Frontend Framework";
  } else if (topics.some(t => ['backend', 'api', 'server', 'nodejs', 'express'].includes(t))) {
    category = "Backend API";
  } else if (topics.some(t => ['cli', 'tool', 'devops', 'automation'].includes(t))) {
    category = "Dev Tools";
  } else if (topics.some(t => ['mobile', 'ios', 'android', 'flutter'].includes(t))) {
    category = "Mobile App";
  } else if (topics.some(t => ['ml', 'ai', 'machine-learning', 'data-science'].includes(t))) {
    category = "AI/ML";
  } else if (topics.some(t => ['documentation', 'docs', 'learning'].includes(t))) {
    category = "Documentation";
  }

  // Determine difficulty based on stars and complexity
  let difficulty: 'Beginner' | 'Intermediate' | 'Advanced' = 'Intermediate';
  if (repoData.stars < 1000) {
    difficulty = 'Beginner';
  } else if (repoData.stars > 50000) {
    difficulty = 'Advanced';
  }

  // Generate tips based on language and category
  const contributionTips = [
    `Start by reading the ${repoData.name} documentation`,
    "Look for issues labeled 'good first issue' or 'help wanted'",
    "Check the CONTRIBUTING.md file for guidelines",
  ];

  // Skills based on language
  const skillsNeeded = [repoData.language || 'Programming'];
  if (repoData.language === 'JavaScript' || repoData.language === 'TypeScript') {
    skillsNeeded.push('Node.js', 'npm/yarn', 'Git');
  } else if (repoData.language === 'Python') {
    skillsNeeded.push('pip', 'virtualenv', 'Git');
  }

  return {
    summary: repoData.description?.slice(0, 100) || `A ${repoData.language || 'programming'} project`,
    category,
    contributionTips,
    skillsNeeded,
    difficulty,
  };
}
