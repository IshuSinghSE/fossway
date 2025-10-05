'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Loader2, Github, CheckCircle2, AlertCircle } from 'lucide-react';

interface ProfileSyncStatus {
  synced: boolean;
  syncedAt?: string;
  profile?: {
    languages: string[];
    interests: string[];
    experienceLevel: string;
    careerPath: string;
  };
}

export default function GitHubProfileSync() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<ProfileSyncStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const checkSyncStatus = async () => {
    try {
      const response = await fetch('/api/profile/analyze');
      if (response.ok) {
        const data = await response.json();
        setStatus(data);
      }
    } catch (err) {
      console.error('Failed to check sync status:', err);
    }
  };

  const analyzeProfile = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/profile/analyze', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Profile analyzed successfully! Your preferences have been updated.');
        setStatus({
          synced: true,
          syncedAt: new Date().toISOString(),
          profile: {
            languages: data.profile.languages,
            interests: data.profile.interests,
            experienceLevel: data.profile.experienceLevel,
            careerPath: data.profile.careerPath,
          },
        });
      } else {
        setError(data.error || 'Failed to analyze profile');
      }
    } catch (err) {
      setError('An error occurred while analyzing your profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Github className="h-5 w-5" />
          GitHub Profile Sync
        </CardTitle>
        <CardDescription>
          Automatically analyze your GitHub repositories to personalize issue recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {status?.synced && (
          <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950 p-4">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
            <div className="space-y-2 flex-1">
              <p className="text-sm font-medium text-green-900 dark:text-green-100">
                Profile synced successfully
              </p>
              {status.syncedAt && (
                <p className="text-xs text-green-700 dark:text-green-300">
                  Last synced: {new Date(status.syncedAt).toLocaleString()}
                </p>
              )}
              {status.profile && (
                <div className="space-y-2 mt-3">
                  <div>
                    <p className="text-xs font-medium text-green-900 dark:text-green-100 mb-1">
                      Languages:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {status.profile.languages.map((lang) => (
                        <Badge key={lang} variant="secondary" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-green-900 dark:text-green-100 mb-1">
                      Interests:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {status.profile.interests.slice(0, 8).map((interest) => (
                        <Badge key={interest} variant="outline" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="font-medium">Experience:</span>{' '}
                      <span className="capitalize">{status.profile.experienceLevel}</span>
                    </div>
                    <div>
                      <span className="font-medium">Path:</span>{' '}
                      <span className="capitalize">{status.profile.careerPath.replace('-', ' ')}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950 p-4">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
            <p className="text-sm text-red-900 dark:text-red-100">{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950 p-4">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
            <p className="text-sm text-green-900 dark:text-green-100">{success}</p>
          </div>
        )}

        <div className="space-y-2">
          <Button
            onClick={analyzeProfile}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Profile...
              </>
            ) : (
              <>
                <Github className="mr-2 h-4 w-4" />
                {status?.synced ? 'Re-sync Profile' : 'Analyze GitHub Profile'}
              </>
            )}
          </Button>
          
          {!status && (
            <Button
              onClick={checkSyncStatus}
              variant="outline"
              className="w-full"
              size="sm"
            >
              Check Sync Status
            </Button>
          )}
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>This will:</p>
          <ul className="list-disc list-inside space-y-0.5 ml-2">
            <li>Fetch your public repositories</li>
            <li>Analyze programming languages and topics</li>
            <li>Detect your skill level and experience</li>
            <li>Update your preferences automatically</li>
            <li>Improve issue recommendations</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
