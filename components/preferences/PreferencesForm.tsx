"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus, Save } from "lucide-react";
import { upsertUserPreferences } from "@/services/preferences";
import type { UserPreferences } from "@/lib/types/database";

interface PreferencesFormProps {
  userId: string;
  initialPreferences: UserPreferences | null;
}

const POPULAR_LANGUAGES = [
  "JavaScript", "TypeScript", "Python", "Java", "Go", "Rust",
  "C++", "C#", "Ruby", "PHP", "Swift", "Kotlin", "Dart"
];

const POPULAR_INTERESTS = [
  "Frontend", "Backend", "Full Stack", "Mobile", "DevOps",
  "AI/ML", "Data Science", "Security", "Testing", "Documentation",
  "UI/UX", "Performance", "Accessibility"
];

export function PreferencesForm({ userId, initialPreferences }: PreferencesFormProps) {
  const [languages, setLanguages] = useState<string[]>(
    initialPreferences?.languages || []
  );
  const [interests, setInterests] = useState<string[]>(
    initialPreferences?.interests || []
  );
  const [careerPath, setCareerPath] = useState(
    initialPreferences?.career_path || ""
  );
  const [experienceLevel, setExperienceLevel] = useState<string>(
    initialPreferences?.experience_level || "beginner"
  );
  const [customLanguage, setCustomLanguage] = useState("");
  const [customInterest, setCustomInterest] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const addLanguage = (lang: string) => {
    if (lang && !languages.includes(lang)) {
      setLanguages([...languages, lang]);
    }
  };

  const removeLanguage = (lang: string) => {
    setLanguages(languages.filter(l => l !== lang));
  };

  const addInterest = (interest: string) => {
    if (interest && !interests.includes(interest)) {
      setInterests([...interests, interest]);
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");

    const { error } = await upsertUserPreferences(userId, {
      languages,
      interests,
      career_path: careerPath || undefined,
      experience_level: experienceLevel as 'beginner' | 'intermediate' | 'advanced',
    });

    setIsSaving(false);

    if (error) {
      setSaveMessage("Error saving preferences. Please try again.");
    } else {
      setSaveMessage("Preferences saved successfully!");
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Languages */}
      <Card className="glass border-border">
        <CardHeader>
          <CardTitle>Programming Languages</CardTitle>
          <CardDescription>
            Select the languages you know or want to learn
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Selected Languages */}
          <div className="flex flex-wrap gap-2">
            {languages.map(lang => (
              <Badge
                key={lang}
                variant="secondary"
                className="px-3 py-1 cursor-pointer hover:bg-destructive/10"
                onClick={() => removeLanguage(lang)}
              >
                {lang}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
            {languages.length === 0 && (
              <p className="text-sm text-muted-foreground">No languages selected</p>
            )}
          </div>

          {/* Popular Languages */}
          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">Popular Languages</Label>
            <div className="flex flex-wrap gap-2">
              {POPULAR_LANGUAGES.filter(lang => !languages.includes(lang)).map(lang => (
                <Badge
                  key={lang}
                  variant="outline"
                  className="px-3 py-1 cursor-pointer hover:bg-accent"
                  onClick={() => addLanguage(lang)}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {lang}
                </Badge>
              ))}
            </div>
          </div>

          {/* Custom Language */}
          <div className="flex gap-2">
            <Input
              placeholder="Add custom language..."
              value={customLanguage}
              onChange={(e) => setCustomLanguage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addLanguage(customLanguage);
                  setCustomLanguage("");
                }
              }}
            />
            <Button
              variant="outline"
              onClick={() => {
                addLanguage(customLanguage);
                setCustomLanguage("");
              }}
            >
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Interests */}
      <Card className="glass border-border">
        <CardHeader>
          <CardTitle>Areas of Interest</CardTitle>
          <CardDescription>
            What aspects of development interest you most?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Selected Interests */}
          <div className="flex flex-wrap gap-2">
            {interests.map(interest => (
              <Badge
                key={interest}
                variant="secondary"
                className="px-3 py-1 cursor-pointer hover:bg-destructive/10"
                onClick={() => removeInterest(interest)}
              >
                {interest}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
            {interests.length === 0 && (
              <p className="text-sm text-muted-foreground">No interests selected</p>
            )}
          </div>

          {/* Popular Interests */}
          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">Popular Interests</Label>
            <div className="flex flex-wrap gap-2">
              {POPULAR_INTERESTS.filter(interest => !interests.includes(interest)).map(interest => (
                <Badge
                  key={interest}
                  variant="outline"
                  className="px-3 py-1 cursor-pointer hover:bg-accent"
                  onClick={() => addInterest(interest)}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          {/* Custom Interest */}
          <div className="flex gap-2">
            <Input
              placeholder="Add custom interest..."
              value={customInterest}
              onChange={(e) => setCustomInterest(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addInterest(customInterest);
                  setCustomInterest("");
                }
              }}
            />
            <Button
              variant="outline"
              onClick={() => {
                addInterest(customInterest);
                setCustomInterest("");
              }}
            >
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Career Path & Experience */}
      <Card className="glass border-border">
        <CardHeader>
          <CardTitle>Career Information</CardTitle>
          <CardDescription>
            Help us understand your goals and experience level
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="career-path">Career Path (Optional)</Label>
            <Input
              id="career-path"
              placeholder="e.g., Full Stack Developer, Data Scientist, DevOps Engineer"
              value={careerPath}
              onChange={(e) => setCareerPath(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience-level">Experience Level</Label>
            <Select value={experienceLevel} onValueChange={setExperienceLevel}>
              <SelectTrigger id="experience-level">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner - Just starting out</SelectItem>
                <SelectItem value="intermediate">Intermediate - Some experience</SelectItem>
                <SelectItem value="advanced">Advanced - Experienced developer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex items-center justify-between">
        <div>
          {saveMessage && (
            <p className={`text-sm ${saveMessage.includes('Error') ? 'text-destructive' : 'text-green-500'}`}>
              {saveMessage}
            </p>
          )}
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  );
}
