import { LogIn, Scan, Zap, Rocket, ArrowRight, CheckCircle, Code, Target } from "lucide-react";
import { Button } from "./ui/button";

const processSteps = [
  {
    icon: LogIn,
    title: "Seamless GitHub Integration",
    description: "Connect instantly with your GitHub account. No registration hassles, no extra passwords to remember.",
    details: [
      "One-click OAuth authentication",
      "Secure connection to your GitHub profile",
      "Instant access to your repositories and activity"
    ],
    color: "text-cyan-400",
    bgGradient: "from-cyan-400/20 to-cyan-600/20",
    borderColor: "border-cyan-400/30"
  },
  {
    icon: Scan,
    title: "AI-Powered Skill Analysis",
    description: "Our advanced AI analyzes your GitHub activity, repositories, and coding patterns to understand your expertise.",
    details: [
      "Language proficiency detection",
      "Framework and library identification",
      "Experience level assessment",
      "Interest area mapping"
    ],
    color: "text-purple-400",
    bgGradient: "from-purple-400/20 to-purple-600/20",
    borderColor: "border-purple-400/30"
  },
  {
    icon: Target,
    title: "Personalized Issue Matching",
    description: "Get precisely curated issues that match your skill level, interests, and learning goals.",
    details: [
      "Difficulty-appropriate recommendations",
      "Technology stack alignment",
      "Learning opportunity identification",
      "Community impact assessment"
    ],
    color: "text-green-400",
    bgGradient: "from-green-400/20 to-green-600/20",
    borderColor: "border-green-400/30"
  },
  {
    icon: Rocket,
    title: "Effortless Contribution",
    description: "Jump straight into contributing with comprehensive context, setup guides, and community support.",
    details: [
      "Direct GitHub issue linking",
      "Setup and environment guides",
      "Community mentor connections",
      "Progress tracking and recognition"
    ],
    color: "text-orange-400",
    bgGradient: "from-orange-400/20 to-orange-600/20",
    borderColor: "border-orange-400/30"
  }
];

export function EnhancedProcess() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 border border-purple-400/30 mb-6">
            <Code className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">The FOSSWay Process</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            From{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Zero
            </span>{" "}
            to{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Hero
            </span>
          </h2>
          <p className="text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Our revolutionary 4-step process transforms complete beginners into confident open-source contributors in minutes, not months.
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-24">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* Content */}
              <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                {/* Step indicator */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-500/20 flex items-center justify-center text-2xl font-bold text-white">
                      {index + 1}
                    </div>
                    <div className="w-20 h-px bg-gradient-to-r from-cyan-400 to-purple-500"></div>
                  </div>
                </div>

                {/* Icon and title */}
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.bgGradient} glass border ${step.borderColor} flex items-center justify-center`}>
                    <step.icon className={`w-8 h-8 ${step.color}`} />
                  </div>
                  <h3 className="text-3xl font-bold text-white">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xl text-white/80 leading-relaxed">
                  {step.description}
                </p>

                {/* Details */}
                <div className="space-y-3">
                  {step.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center gap-3">
                      <CheckCircle className={`w-5 h-5 ${step.color}`} />
                      <span className="text-white/70">{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Action button for last step */}
                {index === processSteps.length - 1 && (
                  <Button 
                    className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white border-0 shadow-lg hover:shadow-orange-500/25 transition-all duration-300 text-lg px-8 py-6 rounded-xl group"
                  >
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                )}
              </div>

              {/* Visual representation */}
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="glass rounded-3xl p-8 border border-white/10 relative overflow-hidden group">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.bgGradient} opacity-50 group-hover:opacity-70 transition-opacity duration-500`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10 aspect-square flex items-center justify-center">
                    <div className="text-center space-y-6">
                      <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${step.bgGradient} glass border ${step.borderColor} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500`}>
                        <step.icon className={`w-12 h-12 ${step.color}`} />
                      </div>
                      
                      {/* Animated elements based on step */}
                      <div className="space-y-4">
                        {index === 0 && (
                          <div className="flex justify-center gap-2">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-200"></div>
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-400"></div>
                          </div>
                        )}
                        {index === 1 && (
                          <div className="relative">
                            <div className="w-32 h-2 bg-white/10 rounded-full mx-auto">
                              <div className="w-1/2 h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse"></div>
                            </div>
                            <span className="text-sm text-purple-400 mt-2 block">Analyzing...</span>
                          </div>
                        )}
                        {index === 2 && (
                          <div className="grid grid-cols-2 gap-2">
                            <div className="glass rounded-lg p-2 text-xs text-green-400 border border-green-400/30">React</div>
                            <div className="glass rounded-lg p-2 text-xs text-blue-400 border border-blue-400/30">Python</div>
                            <div className="glass rounded-lg p-2 text-xs text-purple-400 border border-purple-400/30">GraphQL</div>
                            <div className="glass rounded-lg p-2 text-xs text-orange-400 border border-orange-400/30">Beginner</div>
                          </div>
                        )}
                        {index === 3 && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-center gap-2">
                              <Rocket className="w-4 h-4 text-orange-400 animate-bounce" />
                              <span className="text-sm text-orange-400">Contributing...</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Connecting arrow to next step */}
                  {index < processSteps.length - 1 && (
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 hidden lg:block">
                      <ArrowRight className={`w-8 h-8 ${step.color} rotate-90 animate-bounce`} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="glass rounded-3xl p-8 max-w-2xl mx-auto border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-500/10 to-pink-500/10"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 text-white">Ready to Transform Your Open Source Journey?</h3>
              <p className="text-white/70 mb-6 text-lg">Join thousands of developers who've found their perfect first contribution through FOSSWay.</p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 hover:from-cyan-500 hover:via-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 text-lg px-8 py-6 rounded-xl group"
              >
                Begin Your FOSSWay Journey
                <Rocket className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}