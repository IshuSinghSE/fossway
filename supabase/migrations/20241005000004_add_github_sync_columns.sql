-- Add GitHub profile sync tracking columns to user_preferences
ALTER TABLE user_preferences 
ADD COLUMN IF NOT EXISTS github_profile_synced BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS github_profile_synced_at TIMESTAMP WITH TIME ZONE;

-- Create index for efficient querying
CREATE INDEX IF NOT EXISTS idx_user_preferences_github_synced 
ON user_preferences(github_profile_synced, github_profile_synced_at);

-- Add unique constraint on user_id in ai_recommendations to allow upsert
ALTER TABLE ai_recommendations 
ADD CONSTRAINT ai_recommendations_user_id_unique UNIQUE (user_id);
