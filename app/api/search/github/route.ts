import { NextResponse } from 'next/server';
import { searchGitHubIssues, searchGitHubRepositories } from '@/services/github-search';

/**
 * API Route: Real-time GitHub search
 * GET /api/search/github
 * 
 * Query parameters:
 * - q: search query
 * - language: filter by language (optional)
 * - type: 'issues' | 'repos' (default: 'issues')
 * - limit: number of results (default: 30)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const language = searchParams.get('language') || undefined;
    const type = searchParams.get('type') || 'issues';
    const limit = parseInt(searchParams.get('limit') || '30');

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    let results;

    if (type === 'repos') {
      results = await searchGitHubRepositories(query, language, limit);
    } else {
      results = await searchGitHubIssues(query, language, limit);
    }

    return NextResponse.json({
      success: true,
      data: results,
      count: results.length,
      query,
      language,
      type,
    });
  } catch (error) {
    console.error('Error in GitHub search API:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to search GitHub',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
