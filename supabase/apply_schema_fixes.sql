-- ============================================================================
-- IMPORTANT: Run this SQL in Supabase SQL Editor
-- This fixes the schema to match the GitHub profiling implementation
-- ============================================================================

-- Step 1: Add GitHub profile sync tracking columns to user_preferences
ALTER TABLE user_preferences 
ADD COLUMN IF NOT EXISTS github_profile_synced BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS github_profile_synced_at TIMESTAMP WITH TIME ZONE;

-- Create index for efficient querying
CREATE INDEX IF NOT EXISTS idx_user_preferences_github_synced 
ON user_preferences(github_profile_synced, github_profile_synced_at);

-- Step 2: Add unique constraint on user_id in ai_recommendations to allow upsert
-- First check if constraint exists, if not add it
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'ai_recommendations_user_id_unique'
    ) THEN
        ALTER TABLE ai_recommendations 
        ADD CONSTRAINT ai_recommendations_user_id_unique UNIQUE (user_id);
    END IF;
END $$;

-- Step 3: Verify the changes
SELECT 
    'user_preferences' as table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name = 'user_preferences'
    AND column_name IN ('github_profile_synced', 'github_profile_synced_at');

SELECT 
    'ai_recommendations constraints' as info,
    constraint_name,
    constraint_type
FROM information_schema.table_constraints
WHERE table_name = 'ai_recommendations';
