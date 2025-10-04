import { Users, Heart, Code, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Community() {
  const avatars = [
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face"
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Built for developers,{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              by developers
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Join a thriving community of contributors making open source more accessible for everyone.
          </p>
          
          {/* Community Stats Banner */}
          <div className="glass rounded-2xl p-6 max-w-lg mx-auto border border-white/10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                100M+
              </span>
              <span className="text-white/80">developers on GitHub</span>
            </div>
            <p className="text-white/60 text-sm">Ready to welcome new contributors</p>
          </div>
        </div>

        {/* Community Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Avatar cloud */}
          <div className="relative">
            {/* Background community image */}
            <div className="glass rounded-2xl p-6 overflow-hidden">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1740252117012-bb53ad05e370?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBjb21tdW5pdHklMjBhdmF0YXJzfGVufDF8fHx8MTc1OTEzMDQ4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Developer community"
                className="w-full h-64 object-cover rounded-xl opacity-60"
              />
            </div>

            {/* Floating avatars */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64">
                {avatars.map((avatar, index) => {
                  const angle = (index * 60) * (Math.PI / 180);
                  const radius = 80;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  
                  return (
                    <div
                      key={index}
                      className="absolute w-12 h-12 rounded-full glass border-2 border-white/20 overflow-hidden animate-pulse"
                      style={{
                        left: `calc(50% + ${x}px - 24px)`,
                        top: `calc(50% + ${y}px - 24px)`,
                        animationDelay: `${index * 200}ms`
                      }}
                    >
                      <ImageWithFallback 
                        src={avatar}
                        alt={`Community member ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  );
                })}
                
                {/* Center icon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 glass rounded-full border border-white/20 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-red-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Community features */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shrink-0">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Open Source First</h3>
                  <p className="text-white/70">FOSSWay itself is open source, embodying the values we promote.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Community Driven</h3>
                  <p className="text-white/70">Features and improvements come from the community that uses it.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shrink-0">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Quality Focused</h3>
                  <p className="text-white/70">Every recommendation is carefully curated for the best learning experience.</p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="glass rounded-2xl p-6 border border-white/10">
              <p className="text-white/80 italic mb-4">
                "FOSSWay helped me find my first meaningful open source contribution. The AI matching is spot-on!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <div>
                  <div className="font-semibold text-white">Alex Chen</div>
                  <div className="text-white/60 text-sm">Full-stack Developer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}