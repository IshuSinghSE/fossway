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

-- Step 3: Add RLS policies for repositories table
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'repositories' AND policyname = 'Service can insert repositories'
    ) THEN
        CREATE POLICY "Service can insert repositories"
          ON repositories FOR INSERT
          WITH CHECK (true);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'repositories' AND policyname = 'Service can update repositories'
    ) THEN
        CREATE POLICY "Service can update repositories"
          ON repositories FOR UPDATE
          USING (true);
    END IF;
END $$;

-- Step 4: Add RLS policies for ai_recommendations table
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'ai_recommendations' AND policyname = 'Users can insert own AI recommendations'
    ) THEN
        CREATE POLICY "Users can insert own AI recommendations"
          ON ai_recommendations FOR INSERT
          WITH CHECK (auth.uid() = user_id);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'ai_recommendations' AND policyname = 'Users can update own AI recommendations'
    ) THEN
        CREATE POLICY "Users can update own AI recommendations"
          ON ai_recommendations FOR UPDATE
          USING (auth.uid() = user_id);
    END IF;
END $$;

-- Step 5: Verify the changes
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

SELECT 
    'RLS Policies' as info,
    tablename,
    policyname,
    cmd
FROM pg_policies
WHERE tablename IN ('repositories', 'ai_recommendations')
ORDER BY tablename, policyname;
