import { Rocket, Star, GitBranch, Users, ArrowRight, Play, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function EnhancedHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Enhanced Content */}
          <div className="space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 border border-cyan-400/30">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-400">AI-Powered Open Source Discovery</span>
            </div>

            <div className="space-y-8">
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                Your{" "}
                <span className="relative">
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                    Personalized
                  </span>
                  <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 12">
                    <path
                      d="M5 6 Q150 1 295 6"
                      stroke="url(#hero-underline)"
                      strokeWidth="2"
                      fill="none"
                      className="animate-pulse"
                    />
                    <defs>
                      <linearGradient id="hero-underline" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00d9ff" />
                        <stop offset="50%" stopColor="#b24fff" />
                        <stop offset="100%" stopColor="#ff69b4" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Launchpad
                </span>
                <br />
                into Open Source
              </h1>
              
              <p className="text-2xl text-white/80 leading-relaxed max-w-2xl">
                Connect with projects, contribute code, and grow your skills. 
                <span className="text-green-400 font-semibold"> Seamlessly</span>, with 
                <span className="text-purple-400 font-semibold"> AI-driven matching</span>.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Button 
                size="lg"
                asChild
                className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 hover:from-cyan-500 hover:via-purple-600 hover:to-pink-600 text-white border-0 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 text-xl px-10 py-8 rounded-2xl group relative overflow-hidden"
              >
                <Link href="/issues">
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                  <Rocket className="w-6 h-6 mr-4 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                  <span className="relative z-10">Find Your First Issue</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                </Link>
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                asChild
                className="glass border-white/30 text-white hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300 text-xl px-10 py-8 rounded-2xl group"
              >
                <Link href="/demo">
                  <Play className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                  Watch Demo
                </Link>
              </Button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center group">
                <div className="glass rounded-2xl p-4 mb-3 group-hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">100M+</div>
                </div>
                <div className="text-white/60">GitHub Developers</div>
              </div>
              <div className="text-center group">
                <div className="glass rounded-2xl p-4 mb-3 group-hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">420M+</div>
                </div>
                <div className="text-white/60">Open Repositories</div>
              </div>
              <div className="text-center group">
                <div className="glass rounded-2xl p-4 mb-3 group-hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">∞</div>
                </div>
                <div className="text-white/60">Opportunities</div>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced Visual */}
          <div className="relative">
            {/* Main 3D container */}
            <div className="relative perspective-1000 transform-gpu">
              {/* Main dashboard mockup */}
              <div className="relative glass rounded-3xl p-8 transform rotate-y-6 hover:rotate-y-3 transition-transform duration-700 group">
                <div className="relative overflow-hidden rounded-2xl">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1632893037506-aac33bf18107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb2RpbmclMjBkYXNoYm9hcmQlMjBkYXJrfGVufDF8fHx8MTc1OTEzMDQ3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="FOSSWay Dashboard"
                    className="w-full h-80 object-cover"
                  />
                  {/* Overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-[1px]"></div>
                  
                  {/* Animated code elements */}
                  <div className="absolute top-4 left-4 glass rounded-lg px-3 py-2 text-sm font-mono text-green-400 animate-pulse">
                    git clone...
                  </div>
                  <div className="absolute bottom-4 right-4 glass rounded-lg px-3 py-2 text-sm font-mono text-cyan-400 animate-bounce">
                    npm install
                  </div>
                </div>
              </div>

              {/* Floating elements with enhanced animations */}
              <div className="absolute -top-8 -right-8 glass rounded-2xl p-4 animate-float">
                <Star className="w-8 h-8 text-yellow-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
              
              <div className="absolute -bottom-8 -left-8 glass rounded-2xl p-4 animate-float-delayed">
                <GitBranch className="w-8 h-8 text-green-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              </div>

              <div className="absolute top-1/2 -right-12 glass rounded-2xl p-4 animate-bounce">
                <Users className="w-8 h-8 text-blue-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
              </div>

              {/* Enhanced tech badges */}
              <div className="absolute -top-12 left-1/4 glass rounded-full px-4 py-2 border border-cyan-400/30 animate-pulse">
                <span className="text-cyan-400 font-semibold">React</span>
              </div>
              <div className="absolute -bottom-12 right-1/4 glass rounded-full px-4 py-2 border border-purple-400/30 animate-pulse delay-300">
                <span className="text-purple-400 font-semibold">Python</span>
              </div>
              <div className="absolute top-1/4 -left-12 glass rounded-full px-4 py-2 border border-green-400/30 animate-pulse delay-700">
                <span className="text-green-400 font-semibold">JavaScript</span>
              </div>
            </div>

            {/* Enhanced connecting lines with animation */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500">
              <defs>
                <linearGradient id="animated-line" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#b24fff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ff69b4" stopOpacity="0.6" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M 100 150 Q 250 50 400 250"
                stroke="url(#animated-line)"
                strokeWidth="3"
                fill="none"
                filter="url(#glow)"
                className="animate-pulse"
              />
              <path
                d="M 150 350 Q 250 300 350 200"
                stroke="url(#animated-line)"
                strokeWidth="3"
                fill="none"
                filter="url(#glow)"
                className="animate-pulse delay-1000"
              />
              <circle cx="100" cy="150" r="4" fill="#00d9ff" className="animate-pulse">
                <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="350" cy="200" r="4" fill="#b24fff" className="animate-pulse delay-500">
                <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}