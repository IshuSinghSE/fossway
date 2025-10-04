-- View: User activity summary
CREATE VIEW user_activity_summary AS
SELECT 
  u.id as user_id,
  u.github_username,
  COUNT(DISTINCT ua.issue_id) as total_issues_interacted,
  COUNT(CASE WHEN ua.action = 'viewed' THEN 1 END) as issues_viewed,
  COUNT(CASE WHEN ua.action = 'saved' THEN 1 END) as issues_saved,
  COUNT(CASE WHEN ua.action = 'opened' THEN 1 END) as issues_opened,
  COUNT(CASE WHEN ua.action = 'contributed' THEN 1 END) as contributions
FROM users u
LEFT JOIN user_activity ua ON u.id = ua.user_id
GROUP BY u.id, u.github_username;

-- View: Popular repositories
CREATE VIEW popular_repositories AS
SELECT 
  r.*,
  COUNT(DISTINCT i.id) as issue_count,
  COUNT(DISTINCT ua.user_id) as user_interactions
FROM repositories r
LEFT JOIN issues i ON r.id = i.repo_id
LEFT JOIN user_activity ua ON i.id = ua.issue_id
GROUP BY r.id
ORDER BY r.score DESC, r.stars DESC;

-- View: Trending issues (most viewed in last 7 days)
CREATE VIEW trending_issues AS
SELECT 
  i.*,
  r.repo_name,
  r.owner,
  r.stars as repo_stars,
  COUNT(DISTINCT ua.user_id) as view_count
FROM issues i
JOIN repositories r ON i.repo_id = r.id
LEFT JOIN user_activity ua ON i.id = ua.issue_id 
  AND ua.action = 'viewed' 
  AND ua.timestamp > NOW() - INTERVAL '7 days'
WHERE i.state = 'open'
GROUP BY i.id, r.id
ORDER BY view_count DESC, r.stars DESC
LIMIT 100;
