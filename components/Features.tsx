import { Github, Brain, BarChart3, Search, Filter, Bell, Users, Code2, GitMerge, Award, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Github,
    title: "GitHub Integration",
    description: "Seamlessly connect your GitHub account to analyze your coding patterns and preferences.",
    gradient: "from-cyan-400 to-blue-500",
    details: ["OAuth 2.0 secure authentication", "Repository analysis", "Activity pattern recognition"]
  },
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description: "Our intelligent algorithms find issues that perfectly match your skill level and interests.",
    gradient: "from-purple-400 to-pink-500",
    details: ["Machine learning recommendations", "Skill assessment", "Interest prediction"]
  },
  {
    icon: Filter,
    title: "Advanced Filtering",
    description: "Filter by language, difficulty, time commitment, and project type to find your perfect match.",
    gradient: "from-green-400 to-emerald-500",
    details: ["Language filtering", "Difficulty levels", "Time estimation", "Project categories"]
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description: "Track your contributions, skill development, and impact across the open source ecosystem.",
    gradient: "from-orange-400 to-red-500",
    details: ["Contribution tracking", "Skill progression", "Impact metrics", "Achievement system"]
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Get personalized alerts for new opportunities that match your evolving profile.",
    gradient: "from-yellow-400 to-orange-500",
    details: ["Real-time notifications", "Custom alert preferences", "Mobile friendly", "Email digests"]
  },
  {
    icon: Users,
    title: "Mentorship Network",
    description: "Connect with experienced developers who can guide your open source journey.",
    gradient: "from-pink-400 to-rose-500",
    details: ["Mentor matching", "1-on-1 guidance", "Community forums", "Office hours"]
  },
  {
    icon: Code2,
    title: "Code Quality Insights",
    description: "Receive feedback on your contributions to improve your coding skills.",
    gradient: "from-blue-400 to-indigo-500",
    details: ["Code review assistance", "Best practice suggestions", "Performance optimization"]
  },
  {
    icon: GitMerge,
    title: "Contribution Workflow",
    description: "Streamlined process from issue discovery to successful pull request merge.",
    gradient: "from-indigo-400 to-purple-500",
    details: ["Step-by-step guides", "Template assistance", "Automated testing"]
  },
  {
    icon: Award,
    title: "Recognition System",
    description: "Earn badges, certificates, and build your developer portfolio through contributions.",
    gradient: "from-emerald-400 to-teal-500",
    details: ["Digital badges", "Contribution certificates", "Portfolio building"]
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "All recommended projects are vetted for code quality and active maintenance.",
    gradient: "from-violet-400 to-purple-500",
    details: ["Project vetting", "Maintainer verification", "Community health checks"]
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Get notified instantly when new issues matching your profile become available.",
    gradient: "from-cyan-400 to-teal-500",
    details: ["Live issue feed", "Instant matching", "Priority notifications"]
  },
  {
    icon: Search,
    title: "Smart Discovery",
    description: "Advanced search capabilities to find exactly what you're looking for.",
    gradient: "from-rose-400 to-pink-500",
    details: ["Semantic search", "Fuzzy matching", "Context-aware results"]
  }
];

export function Features() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 border border-cyan-400/30 mb-6">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400">Powerful Features</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            A comprehensive suite of tools designed to make your open source journey smooth, 
            rewarding, and impactful from day one.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 border border-white/10 group hover:scale-105 transition-all duration-500 relative overflow-hidden"
            >
              {/* Background glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
              
              {/* Content */}
              <div className="relative z-10 space-y-4">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                </div>

                {/* Feature details */}
                <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {feature.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center gap-2 text-white/60 text-sm">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient}`}></div>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover effect border animation */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="glass rounded-3xl p-8 max-w-2xl mx-auto border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-500/5 to-pink-500/5"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 text-white">Ready to Experience All Features?</h3>
              <p className="text-white/70 mb-6 text-lg">
                Join thousands of developers who are already using FOSSWay to kickstart their open source journey.
              </p>
              
              {/* Feature highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">12</div>
                  <div className="text-white/60 text-sm">Core Features</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">AI</div>
                  <div className="text-white/60 text-sm">Powered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">100%</div>
                  <div className="text-white/60 text-sm">Free</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">24/7</div>
                  <div className="text-white/60 text-sm">Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="mt-16 flex justify-center items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse delay-200"></div>
          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse delay-400"></div>
          <div className="w-3 h-3 rounded-full bg-orange-400 animate-pulse delay-600"></div>
          <div className="w-3 h-3 rounded-full bg-pink-400 animate-pulse delay-800"></div>
        </div>
      </div>
    </section>
  );
}