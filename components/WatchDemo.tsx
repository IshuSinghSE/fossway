'use client';
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Play, Pause, Volume2, Maximize, RotateCcw, CheckCircle, Star } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const demoSteps = [
  {
    title: "GitHub Authentication",
    description: "Seamlessly connect your GitHub account with one click",
    duration: "0:00 - 0:30",
    thumbnail: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop",
    completed: false
  },
  {
    title: "AI Profile Analysis",
    description: "Our AI analyzes your repositories and coding patterns",
    duration: "0:30 - 1:15",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    completed: false
  },
  {
    title: "Personalized Matching",
    description: "Get curated issues that match your skill level",
    duration: "1:15 - 2:00",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    completed: false
  },
  {
    title: "Start Contributing",
    description: "Jump into your first open source contribution",
    duration: "2:00 - 2:45",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    completed: false
  }
];

const features = [
  "AI-powered skill analysis",
  "Personalized issue recommendations", 
  "Beginner-friendly matching",
  "Real-time GitHub integration",
  "Community support"
];

export function WatchDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [volume] = useState(80);
  const totalDuration = 165; // 2:45 in seconds

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    
    if (!isPlaying) {
      // Simulate video progress
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            clearInterval(interval);
            return totalDuration;
          }
          
          // Update current step based on time
          if (prev >= 0 && prev < 30) setCurrentStep(0);
          else if (prev >= 30 && prev < 75) setCurrentStep(1);
          else if (prev >= 75 && prev < 120) setCurrentStep(2);
          else if (prev >= 120) setCurrentStep(3);
          
          return prev + 1;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const progress = (currentTime / totalDuration) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <Button 
          variant="outline"
          asChild
          className="glass border-white/30 text-white hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300 mb-8"
        >
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 border border-purple-400/30 mb-6">
            <Play className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">Interactive Demo</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            See{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              FOSSWay
            </span>{" "}
            in Action
          </h1>
          
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Watch how FOSSWay transforms your open source journey from confusion to contribution in under 3 minutes
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Video Player */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Video Area */}
            <div className="relative glass rounded-3xl overflow-hidden border border-white/10 group">
              {/* Video Thumbnail/Preview */}
              <div className="relative aspect-video">
                <ImageWithFallback
                  src={demoSteps[currentStep]?.thumbnail}
                  alt={`Demo step ${currentStep + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    onClick={handlePlayPause}
                    size="lg"
                    className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-110"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" />
                    )}
                  </Button>
                </div>

                {/* Current Step Indicator */}
                <div className="absolute bottom-4 left-4 glass rounded-lg px-3 py-2 border border-white/20">
                  <div className="text-white font-medium text-sm">
                    Step {currentStep + 1}: {demoSteps[currentStep]?.title}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="p-6 space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-white/60">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(totalDuration)}</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={handlePlayPause}
                      variant="outline"
                      size="sm"
                      className="glass border-white/30 text-white hover:border-cyan-400/50"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    
                    <Button
                      onClick={handleRestart}
                      variant="outline"
                      size="sm"
                      className="glass border-white/30 text-white hover:border-purple-400/50"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>

                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-white/60" />
                      <div className="w-20 h-1 bg-white/20 rounded-full">
                        <div 
                          className="h-full bg-white rounded-full"
                          style={{ width: `${volume}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="glass border-white/30 text-white hover:border-green-400/50"
                  >
                    <Maximize className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Current Step Details */}
            <div className="glass rounded-2xl p-6 border border-white/10">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold">
                    {currentStep + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{demoSteps[currentStep]?.title}</h3>
                    <p className="text-white/60">{demoSteps[currentStep]?.duration}</p>
                  </div>
                </div>
                <p className="text-white/80 leading-relaxed">
                  {demoSteps[currentStep]?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Demo Steps */}
            <div className="glass rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Demo Timeline</h3>
              <div className="space-y-4">
                {demoSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-300 ${
                      index === currentStep 
                        ? 'bg-cyan-400/10 border border-cyan-400/30' 
                        : index < currentStep 
                        ? 'bg-green-400/10 border border-green-400/30'
                        : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === currentStep 
                        ? 'bg-cyan-400 text-black' 
                        : index < currentStep 
                        ? 'bg-green-400 text-black'
                        : 'bg-white/20 text-white/60'
                    }`}>
                      {index < currentStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium text-sm ${
                        index === currentStep ? 'text-cyan-400' : 
                        index < currentStep ? 'text-green-400' : 'text-white/80'
                      }`}>
                        {step.title}
                      </div>
                      <div className="text-xs text-white/50">{step.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Covered */}
            <div className="glass rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">What You&apos;ll See</h3>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="glass rounded-2xl p-6 border border-white/10 text-center">
              <h3 className="text-lg font-bold text-white mb-2">Ready to Get Started?</h3>
              <p className="text-white/60 mb-4 text-sm">
                Experience FOSSWay for yourself and find your first contribution today
              </p>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white border-0"
              >
                <Link href="/issues">Find Your First Issue</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Questions About FOSSWay?
          </h2>
          <p className="text-white/60 mb-8">
            Check out our documentation or get in touch with our community
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" className="glass border-white/30 text-white">
              View Documentation
            </Button>
            <Button variant="outline" className="glass border-white/30 text-white">
              Join Community
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}