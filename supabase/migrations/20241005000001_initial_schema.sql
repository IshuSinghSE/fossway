-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  github_username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create user_preferences table
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  languages TEXT[] DEFAULT '{}',
  interests TEXT[] DEFAULT '{}',
  career_path TEXT,
  experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'advanced')),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own preferences"
  ON user_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON user_preferences FOR UPDATE
  USING (auth.uid() = user_id);

-- Create repositories table
CREATE TABLE repositories (
  id BIGSERIAL PRIMARY KEY,
  repo_name TEXT UNIQUE NOT NULL,
  owner TEXT NOT NULL,
  description TEXT,
  language TEXT,
  stars INTEGER DEFAULT 0,
  forks INTEGER DEFAULT 0,
  open_issues INTEGER DEFAULT 0,
  license TEXT,
  topics TEXT[] DEFAULT '{}',
  pushed_at TIMESTAMP WITH TIME ZONE,
  url TEXT NOT NULL,
  score FLOAT DEFAULT 0,
  fetched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_repositories_language ON repositories(language);
CREATE INDEX idx_repositories_stars ON repositories(stars DESC);
CREATE INDEX idx_repositories_score ON repositories(score DESC);
CREATE INDEX idx_repositories_topics ON repositories USING GIN(topics);

-- Enable RLS
ALTER TABLE repositories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view repositories"
  ON repositories FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create issues table
CREATE TABLE issues (
  id BIGSERIAL PRIMARY KEY,
  github_issue_id BIGINT UNIQUE NOT NULL,
  repo_id BIGINT NOT NULL REFERENCES repositories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT,
  url TEXT NOT NULL,
  labels TEXT[] DEFAULT '{}',
  state TEXT DEFAULT 'open',
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  fetched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_issues_repo_id ON issues(repo_id);
CREATE INDEX idx_issues_labels ON issues USING GIN(labels);
CREATE INDEX idx_issues_difficulty ON issues(difficulty);
CREATE INDEX idx_issues_state ON issues(state);

-- Enable RLS
ALTER TABLE issues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view issues"
  ON issues FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create user_activity table
CREATE TABLE user_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  issue_id BIGINT NOT NULL REFERENCES issues(id) ON DELETE CASCADE,
  action TEXT NOT NULL CHECK (action IN ('viewed', 'saved', 'opened', 'contributed')),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_user_activity_user_id ON user_activity(user_id);
CREATE INDEX idx_user_activity_issue_id ON user_activity(issue_id);
CREATE INDEX idx_user_activity_action ON user_activity(action);
CREATE INDEX idx_user_activity_timestamp ON user_activity(timestamp DESC);

-- Enable RLS
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own activity"
  ON user_activity FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activity"
  ON user_activity FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create saved_issues table
CREATE TABLE saved_issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  issue_id BIGINT NOT NULL REFERENCES issues(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, issue_id)
);

-- Create index
CREATE INDEX idx_saved_issues_user_id ON saved_issues(user_id);

-- Enable RLS
ALTER TABLE saved_issues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own saved issues"
  ON saved_issues FOR ALL
  USING (auth.uid() = user_id);

-- Create ai_recommendations table
CREATE TABLE ai_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recommendations JSONB NOT NULL,
  context TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_ai_recommendations_user_id ON ai_recommendations(user_id);
CREATE INDEX idx_ai_recommendations_created_at ON ai_recommendations(created_at DESC);

-- Enable RLS
ALTER TABLE ai_recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own AI recommendations"
  ON ai_recommendations FOR SELECT
  USING (auth.uid() = user_id);
