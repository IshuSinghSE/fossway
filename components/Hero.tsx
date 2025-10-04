import { Rocket, Star, GitBranch, Users } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Your Personalized{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Launchpad
                </span>{" "}
                into Open Source
              </h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-lg">
                Connect with projects, contribute code, and grow your skills. Seamlessly, with AI-driven matching.
              </p>
            </div>

            <Button 
              size="lg"
              className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 text-lg px-8 py-6 rounded-xl group"
            >
              <Rocket className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform duration-300" />
              Find Your First Issue
            </Button>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">100M+</div>
                <div className="text-white/60">Developers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">420M+</div>
                <div className="text-white/60">Repositories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">∞</div>
                <div className="text-white/60">Possibilities</div>
              </div>
            </div>
          </div>

          {/* Right Side - Visual */}
          <div className="relative">
            {/* Main laptop mockup */}
            <div className="relative glass rounded-2xl p-6 transform rotate-3 hover:rotate-1 transition-transform duration-500">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1632893037506-aac33bf18107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb2RpbmclMjBkYXNoYm9hcmQlMjBkYXJrfGVufDF8fHx8MTc1OTEzMDQ3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Dashboard mockup"
                className="w-full h-64 object-cover rounded-xl"
              />
              <div className="absolute inset-4 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl backdrop-blur-sm"></div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 glass rounded-full p-3 animate-bounce">
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
            
            <div className="absolute -bottom-4 -left-4 glass rounded-full p-3 animate-pulse">
              <GitBranch className="w-6 h-6 text-green-400" />
            </div>

            <div className="absolute top-1/2 -right-8 glass rounded-full p-3 animate-bounce delay-300">
              <Users className="w-6 h-6 text-blue-400" />
            </div>

            {/* Tech badges */}
            <div className="absolute -top-8 left-1/4 glass rounded-full px-3 py-1 text-sm font-medium text-cyan-400 border border-cyan-400/30">
              React
            </div>
            <div className="absolute -bottom-8 right-1/4 glass rounded-full px-3 py-1 text-sm font-medium text-purple-400 border border-purple-400/30">
              Python
            </div>
            <div className="absolute top-1/4 -left-8 glass rounded-full px-3 py-1 text-sm font-medium text-green-400 border border-green-400/30">
              JavaScript
            </div>

            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
              <defs>
                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#b24fff" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <path
                d="M 50 100 Q 200 50 350 200"
                stroke="url(#line-gradient)"
                strokeWidth="2"
                fill="none"
                className="animate-pulse"
              />
              <path
                d="M 100 300 Q 200 250 300 150"
                stroke="url(#line-gradient)"
                strokeWidth="2"
                fill="none"
                className="animate-pulse delay-500"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}