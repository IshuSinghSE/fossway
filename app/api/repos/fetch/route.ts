import { NextResponse } from 'next/server';
import { 
  getRepositoriesFromDatabase, 
  getPersonalizedRepositories,
  fetchGoodFirstIssues 
} from '@/services/github-repos';
import { createClient } from '@/lib/supabase/server';

/**
 * API Route: Fetch repositories
 * GET /api/repos/fetch
 * 
 * Query parameters:
 * - type: 'popular' | 'beginner' | 'personalized'
 * - language: filter by language
 * - limit: number of results (default: 20)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'popular';
    const language = searchParams.get('language');
    const limit = parseInt(searchParams.get('limit') || '20');

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let repositories;

    switch (type) {
      case 'personalized':
        if (!user) {
          return NextResponse.json(
            { error: 'Authentication required for personalized repos' },
            { status: 401 }
          );
        }
        repositories = await getPersonalizedRepositories(user.id, limit);
        break;

      case 'beginner':
        repositories = await getRepositoriesFromDatabase({
          minStars: 50,
          hasGoodFirstIssues: true,
          limit,
        });
        break;

      case 'popular':
      default:
        repositories = await getRepositoriesFromDatabase({
          minStars: 500,
          limit,
        });
        break;
    }

    // Apply language filter if provided
    if (language && repositories) {
      repositories = repositories.filter(
        repo => repo.language?.toLowerCase() === language.toLowerCase()
      );
    }

    return NextResponse.json({
      success: true,
      data: repositories,
      count: repositories?.length || 0,
    });
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch repositories',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/repos/fetch
 * Fetch good first issues for a specific repository
 * 
 * Body: { owner: string, repo: string }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { owner, repo } = body;

    if (!owner || !repo) {
      return NextResponse.json(
        { error: 'Missing owner or repo parameter' },
        { status: 400 }
      );
    }

    const issues = await fetchGoodFirstIssues(owner, repo, 10);

    return NextResponse.json({
      success: true,
      data: issues,
      count: issues.length,
    });
  } catch (error) {
    console.error('Error fetching issues:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch issues',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
