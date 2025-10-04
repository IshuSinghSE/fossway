import { LogIn, Scan, Zap, Rocket } from "lucide-react";

const steps = [
  {
    icon: LogIn,
    title: "Sign in with GitHub",
    description: "Quick OAuth login - no extra accounts needed",
    color: "text-cyan-400",
    bgColor: "from-cyan-400/20 to-cyan-600/20"
  },
  {
    icon: Scan,
    title: "Automated skill detection",
    description: "We analyze your profile to understand your expertise",
    color: "text-purple-400",
    bgColor: "from-purple-400/20 to-purple-600/20"
  },
  {
    icon: Zap,
    title: "Discover personalized issues",
    description: "Get curated matches based on your skills and interests",
    color: "text-green-400",
    bgColor: "from-green-400/20 to-green-600/20"
  },
  {
    icon: Rocket,
    title: "Contribute with one click",
    description: "Jump straight to GitHub with all the context you need",
    color: "text-orange-400",
    bgColor: "from-orange-400/20 to-orange-600/20"
  }
];

export function HowItWorks() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            How{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              FOSSWay
            </span>{" "}
            works
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            From first visit to first contribution in just four simple steps.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 via-green-400 to-orange-400 transform -translate-y-1/2 z-0"></div>
          
          {/* Steps */}
          <div className="grid lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="text-center group"
              >
                {/* Step number and icon */}
                <div className="relative mx-auto mb-6">
                  {/* Step number background */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.bgColor} glass border border-white/10 flex items-center justify-center group-hover:scale-110 transition-all duration-300 mx-auto relative`}>
                    <step.icon className={`w-8 h-8 ${step.color}`} />
                    
                    {/* Step number badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>

                  {/* Connecting dot for mobile */}
                  <div className="lg:hidden w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-4"></div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                    {step.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="glass rounded-2xl p-8 max-w-md mx-auto border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">Ready to start your journey?</h3>
            <p className="text-white/70 mb-4">Join thousands of developers making their first contributions.</p>
            <div className="flex justify-center">
              <div className="w-8 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}