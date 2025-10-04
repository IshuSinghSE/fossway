import { Heart, Users, Globe, Lightbulb, Shield, Target } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const values = [
  {
    icon: Heart,
    title: "Community First",
    description: "We believe in the power of open source communities to drive innovation and create positive change in the world.",
    color: "text-red-400",
    bgGradient: "from-red-400/20 to-pink-500/20"
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Connecting developers worldwide to meaningful projects that make a difference in people's lives.",
    color: "text-blue-400",
    bgGradient: "from-blue-400/20 to-cyan-500/20"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Using cutting-edge AI and machine learning to solve the age-old problem of open source discovery.",
    color: "text-yellow-400",
    bgGradient: "from-yellow-400/20 to-orange-500/20"
  },
  {
    icon: Shield,
    title: "Trust & Security",
    description: "Your data privacy is paramount. We use secure authentication and never store sensitive information.",
    color: "text-green-400",
    bgGradient: "from-green-400/20 to-emerald-500/20"
  }
];

export function About() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 border border-blue-400/30 mb-6">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">About FOSSWay</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            Bridging the Gap Between{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Aspiration
            </span>{" "}
            and{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Contribution
            </span>
          </h2>
          <p className="text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            FOSSWay was born from a simple observation: talented developers everywhere want to contribute to open source, 
            but don&apos;t know where to start. We&apos;re changing that story.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left side - Story */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">Our Story</h3>
              <div className="space-y-4 text-lg text-white/80 leading-relaxed">
                <p>
                  In the world of software development, open source is everywhere. The applications we use, 
                  the frameworks we build with, the tools that power our daily lives - they&apos;re all built 
                  by communities of passionate developers.
                </p>
                <p>
                  Yet for many developers, especially those just starting their journey, contributing to 
                  open source feels intimidating and inaccessible. The landscape is vast, the projects 
                  are complex, and finding that perfect first issue seems impossible.
                </p>
                <p>
                  <span className="text-cyan-400 font-semibold">FOSSWay changes that.</span> We use the power of 
                  artificial intelligence to understand your unique skills, interests, and experience level, 
                  then connect you with the perfect opportunities to make your mark in the open source world.
                </p>
              </div>
            </div>

            {/* Mission statement */}
            <div className="glass rounded-2xl p-6 border border-cyan-400/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-500/10"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-cyan-400" />
                  <h4 className="text-xl font-bold text-white">Our Mission</h4>
                </div>
                <p className="text-white/80 leading-relaxed">
                  To democratize open source contribution by making it accessible, personalized, and rewarding 
                  for developers at every skill level, ultimately strengthening the global open source ecosystem.
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Visual */}
          <div className="relative">
            <div className="glass rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-purple-500/10 to-pink-500/10 group-hover:from-cyan-400/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500"></div>
              
              <div className="relative z-10">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1740252117012-bb53ad05e370?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBjb21tdW5pdHklMjBhdmF0YXJzfGVufDF8fHx8MTc1OTEzMDQ4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Open source community"
                  className="w-full h-64 object-cover rounded-2xl opacity-80"
                />
                
                {/* Floating stats */}
                <div className="absolute top-4 right-4 glass rounded-lg p-3 animate-float">
                  <div className="text-cyan-400 font-bold">100M+</div>
                  <div className="text-white/60 text-sm">Developers</div>
                </div>
                
                <div className="absolute bottom-4 left-4 glass rounded-lg p-3 animate-float-delayed">
                  <div className="text-purple-400 font-bold">420M+</div>
                  <div className="text-white/60 text-sm">Repositories</div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-12 h-12 border-2 border-cyan-400/30 rounded-full animate-spin-slow"></div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 border-2 border-purple-400/30 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Our Values */}
        <div className="space-y-16">
          <div className="text-center">
            <h3 className="text-4xl font-bold mb-6 text-white">Our Core Values</h3>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              The principles that guide everything we do at FOSSWay
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-6 border border-white/10 relative overflow-hidden group hover:scale-105 transition-all duration-300"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10 text-center space-y-4">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.bgGradient} glass border border-white/20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className={`w-8 h-8 ${value.color}`} />
                  </div>

                  {/* Content */}
                  <h4 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                    {value.title}
                  </h4>
                  <p className="text-white/70 leading-relaxed text-sm">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-20">
          <div className="glass rounded-3xl p-12 max-w-4xl mx-auto border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-500/5 to-pink-500/5"></div>
            <div className="relative z-10 space-y-6">
              <h3 className="text-3xl font-bold text-white">Join Our Movement</h3>
              <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                Be part of the revolution that&apos;s making open source accessible to everyone. 
                Together, we&apos;re building a more inclusive and innovative future.
              </p>
              
              {/* Stats row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">24/7</div>
                  <div className="text-white/60">AI-Powered Matching</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">100%</div>
                  <div className="text-white/60">Free & Open Source</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">∞</div>
                  <div className="text-white/60">Growth Opportunities</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}