import { Rocket, Github, Twitter, Mail, ExternalLink, MapPin, Heart, Users } from "lucide-react";
import Link from "next/link";

export function EnhancedFooter() {
  const mainLinks = [
    { label: "About", href: "#about" },
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#process" },
    { label: "Goals", href: "#goals" }
  ];

  const communityLinks = [
    { label: "GitHub Repo", href: "#", icon: ExternalLink },
    { label: "Documentation", href: "#" },
    { label: "Community", href: "#community" },
    { label: "Support", href: "#" }
  ];

  return (
    <footer className="relative border-t border-white/10 bg-gradient-to-b from-background to-background/95">
      {/* Decorative top border with animation */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 via-purple-500 to-transparent animate-pulse"></div>
      
      <div className="container mx-auto px-6 py-16">
        {/* Main footer content */}
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Rocket className="w-10 h-10 text-transparent" />
                  <svg className="absolute inset-0 w-10 h-10" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="footer-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00d9ff" />
                        <stop offset="50%" stopColor="#b24fff" />
                        <stop offset="100%" stopColor="#ff69b4" />
                      </linearGradient>
                    </defs>
                    <Rocket className="w-10 h-10" fill="url(#footer-logo-gradient)" />
                  </svg>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  FOSSWay
                </span>
              </div>
              
              <p className="text-white/70 max-w-md leading-relaxed text-lg">
                Empowering the next generation of open-source contributors through AI-driven personalization 
                and seamless project discovery.
              </p>
            </div>

            {/* Location */}
            <div className="glass rounded-2xl p-6 border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-purple-500/5"></div>
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <div className="font-semibold text-white">Built in India</div>
                  <div className="text-white/60">New Delhi, India 🇮🇳</div>
                </div>
              </div>
            </div>

            {/* Team link */}
            <Link href="/team" className="block">
              <div className="glass rounded-2xl p-6 border border-purple-400/30 relative overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-500/10 group-hover:from-purple-400/20 group-hover:to-pink-500/20 transition-all duration-300"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400/20 to-pink-500/20 flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-500 group-hover:bg-clip-text transition-all duration-300">
                        The Code Squad
                      </div>
                      <div className="text-white/60 text-sm">Meet our amazing team</div>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Navigate</h4>
            <div className="space-y-3">
              {mainLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-white/70 hover:text-white transition-colors duration-300 group relative"
                >
                  <span className="relative z-10">{link.label}</span>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Community Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Community</h4>
            <div className="space-y-3">
              {communityLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 group"
                >
                  <span className="relative z-10">{link.label}</span>
                  {link.icon && (
                    <link.icon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  )}
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300"></div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <h5 className="text-sm font-medium text-white/60 mb-3">Connect With Us</h5>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-12 h-12 rounded-xl glass border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300 group"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-xl glass border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-blue-400/50 hover:bg-blue-400/10 transition-all duration-300 group"
                >
                  <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-xl glass border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-purple-400/50 hover:bg-purple-400/10 transition-all duration-300 group"
                >
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>



        {/* Bottom section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 text-white/60">
              <span>© 2024 FOSSWay</span>
              <div className="flex items-center gap-2">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                <span>for developers, by developers</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-white/50">
              <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
              <div className="w-1 h-1 rounded-full bg-white/30"></div>
              <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
              <div className="w-1 h-1 rounded-full bg-white/30"></div>
              <a href="#" className="hover:text-white transition-colors duration-300">Open Source</a>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyan-500/5 via-purple-500/5 to-transparent pointer-events-none"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400/40 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-pink-400/30 rounded-full animate-bounce"></div>
      </div>
    </footer>
  );
}