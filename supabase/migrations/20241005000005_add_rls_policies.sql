-- ============================================================================
-- Add RLS policies for profile analysis feature
-- This allows authenticated users to insert repositories and AI recommendations
-- ============================================================================

-- Repositories table: Allow service/authenticated users to insert
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

-- AI Recommendations table: Allow authenticated users to manage their recommendations
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

-- Verify policies
SELECT 
    schemaname,
    tablename,
    policyname,
    cmd
FROM pg_policies
WHERE tablename IN ('repositories', 'ai_recommendations')
ORDER BY tablename, policyname;
