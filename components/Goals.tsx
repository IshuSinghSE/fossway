import { Target, Rocket, Users, Globe, TrendingUp, Award, Zap, Heart } from "lucide-react";

const goals = [
  {
    icon: Users,
    title: "1 Million Contributors",
    description: "Connect 1 million new developers to meaningful open source contributions by 2026",
    timeline: "2026",
    progress: 15,
    color: "text-cyan-400",
    bgGradient: "from-cyan-400/20 to-blue-500/20",
    borderColor: "border-cyan-400/30"
  },
  {
    icon: Globe,
    title: "Global Accessibility",
    description: "Make FOSSWay available in 20+ languages, ensuring open source is accessible worldwide",
    timeline: "2025",
    progress: 40,
    color: "text-purple-400",
    bgGradient: "from-purple-400/20 to-pink-500/20",
    borderColor: "border-purple-400/30"
  },
  {
    icon: TrendingUp,
    title: "AI Enhancement",
    description: "Develop advanced semantic matching that understands project context and developer intent",
    timeline: "2025",
    progress: 60,
    color: "text-green-400",
    bgGradient: "from-green-400/20 to-emerald-500/20",
    borderColor: "border-green-400/30"
  },
  {
    icon: Award,
    title: "Recognition System",
    description: "Create a comprehensive achievement and mentorship system for contributors at all levels",
    timeline: "2024",
    progress: 80,
    color: "text-orange-400",
    bgGradient: "from-orange-400/20 to-red-500/20",
    borderColor: "border-orange-400/30"
  }
];

const impacts = [
  {
    number: "75%",
    label: "Reduce Time to First Contribution",
    description: "From weeks of searching to minutes of discovery"
  },
  {
    number: "50%",
    label: "Increase Contribution Success Rate",
    description: "Better matching leads to more successful PRs"
  },
  {
    number: "10x",
    label: "Expand Contributor Diversity",
    description: "Lowering barriers for underrepresented groups"
  },
  {
    number: "100%",
    label: "Open Source Commitment",
    description: "FOSSWay itself will always remain open source"
  }
];

export function Goals() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-400/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 border border-green-400/30 mb-6">
            <Target className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-green-400">Our Vision & Goals</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            Building the{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Future
            </span>{" "}
            of{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Open Source
            </span>
          </h2>
          <p className="text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            Our ambitious roadmap to transform how developers discover, contribute to, and grow within 
            the open source ecosystem.
          </p>
        </div>

        {/* Impact Goals */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold text-center mb-12 text-white">
            Measurable Impact We're Driving
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impacts.map((impact, index) => (
              <div
                key={index}
                className="glass rounded-3xl p-8 border border-white/10 text-center relative overflow-hidden group hover:scale-105 transition-all duration-300"
              >
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-500/5 group-hover:from-cyan-400/10 group-hover:to-purple-500/10 transition-all duration-500"></div>
                
                <div className="relative z-10 space-y-4">
                  <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    {impact.number}
                  </div>
                  <h4 className="text-lg font-semibold text-white">
                    {impact.label}
                  </h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {impact.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Goals */}
        <div className="space-y-16">
          <h3 className="text-4xl font-bold text-center text-white">
            Strategic Roadmap
          </h3>

          <div className="grid lg:grid-cols-2 gap-12">
            {goals.map((goal, index) => (
              <div
                key={index}
                className="glass rounded-3xl p-8 border border-white/10 relative overflow-hidden group hover:scale-[1.02] transition-all duration-500"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${goal.bgGradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                
                <div className="relative z-10 space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${goal.bgGradient} glass border ${goal.borderColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <goal.icon className={`w-8 h-8 ${goal.color}`} />
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                          {goal.title}
                        </h4>
                        <div className={`text-sm font-medium ${goal.color} bg-white/10 rounded-full px-3 py-1 mt-2 inline-block`}>
                          Target: {goal.timeline}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/80 text-lg leading-relaxed">
                    {goal.description}
                  </p>

                  {/* Progress */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">Progress</span>
                      <span className={`font-semibold ${goal.color}`}>{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${goal.bgGradient.replace('/20', '')} transition-all duration-1000 ease-out`}
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Key metrics */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Zap className="w-4 h-4" />
                      <span>
                        {index === 0 && "Currently: 150K+ developers reached"}
                        {index === 1 && "Currently: 8 languages supported"}
                        {index === 2 && "Currently: Advanced ML models in development"}
                        {index === 3 && "Currently: Beta testing phase"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision Statement */}
        <div className="mt-24">
          <div className="glass rounded-3xl p-12 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-500/5 to-pink-500/5"></div>
            
            <div className="relative z-10 text-center space-y-8">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 glass border border-white/20 flex items-center justify-center">
                  <Heart className="w-10 h-10 text-pink-400" />
                </div>
              </div>
              
              <h3 className="text-4xl font-bold text-white">
                Our Ultimate Vision
              </h3>
              
              <p className="text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                A world where <span className="text-cyan-400 font-semibold">every developer</span>, 
                regardless of their background or experience level, can easily find their place in the 
                open source community and make <span className="text-purple-400 font-semibold">meaningful contributions</span> 
                that drive innovation and positive change.
              </p>

              {/* Timeline */}
              <div className="pt-8">
                <div className="flex justify-center items-center gap-4 text-white/60">
                  <Rocket className="w-5 h-5 text-cyan-400" />
                  <span>2024: Foundation</span>
                  <div className="w-8 h-px bg-gradient-to-r from-cyan-400 to-purple-500"></div>
                  <span>2025: Growth</span>
                  <div className="w-8 h-px bg-gradient-to-r from-purple-500 to-pink-500"></div>
                  <span>2026: Global Impact</span>
                  <Target className="w-5 h-5 text-pink-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Join the mission CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 glass rounded-full px-6 py-3 border border-green-400/30">
            <Users className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">Be part of this journey</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}