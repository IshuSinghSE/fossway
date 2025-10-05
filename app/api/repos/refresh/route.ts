import { NextResponse } from 'next/server';
import { refreshRepositoryData } from '@/services/github-repos';
import { createClient } from '@/lib/supabase/server';

/**
 * API Route: Refresh repository data from GitHub
 * POST /api/repos/refresh
 * 
 * This endpoint fetches the latest popular and beginner-friendly repositories
 * from GitHub and stores them in the database.
 * 
 * Use this with a cron job for automatic daily updates.
 */
export async function POST() {
  try {
    // Verify authentication (optional - add admin check if needed)
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Refresh repository data
    const result = await refreshRepositoryData();

    return NextResponse.json({
      success: true,
      message: 'Repository data refreshed successfully',
      stats: result,
    });
  } catch (error) {
    console.error('Error refreshing repository data:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to refresh repository data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/repos/refresh
 * Returns refresh status and stats
 */
export async function GET() {
  try {
    const supabase = await createClient();
    
    // Get repository stats from database
    const { data: repos, error } = await supabase
      .from('repositories')
      .select('fetched_at, language, stars')
      .order('fetched_at', { ascending: false })
      .limit(1);

    if (error) throw error;

    const lastFetch = repos && repos.length > 0 ? repos[0].fetched_at : null;

    // Get count by type
    const { count: totalCount } = await supabase
      .from('repositories')
      .select('*', { count: 'exact', head: true });

    const { count: beginnerCount } = await supabase
      .from('repositories')
      .select('*', { count: 'exact', head: true })
      .gte('stars', 50)
      .lte('stars', 500);

    const { count: popularCount } = await supabase
      .from('repositories')
      .select('*', { count: 'exact', head: true })
      .gte('stars', 500);

    return NextResponse.json({
      success: true,
      stats: {
        lastFetch,
        totalRepositories: totalCount || 0,
        beginnerFriendly: beginnerCount || 0,
        popular: popularCount || 0,
      },
    });
  } catch (error) {
    console.error('Error getting refresh stats:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to get refresh stats'
      },
      { status: 500 }
    );
  }
}
