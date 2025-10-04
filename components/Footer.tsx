import { Rocket, Github, Twitter, Mail, ExternalLink } from "lucide-react";

export function Footer() {
  const links = [
    { label: "About", href: "#" },
    { label: "Features", href: "#" },
    { label: "GitHub Repo", href: "#", icon: ExternalLink },
    { label: "Contact", href: "#" }
  ];

  return (
    <footer className="relative border-t border-white/10">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
      
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo and tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Rocket className="w-8 h-8 text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text" 
                       style={{fill: 'url(#footer-logo-gradient)'}} />
                <svg className="absolute inset-0 w-8 h-8" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="footer-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00d9ff" />
                      <stop offset="100%" stopColor="#b24fff" />
                    </linearGradient>
                  </defs>
                  <Rocket className="w-8 h-8" fill="url(#footer-logo-gradient)" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                FOSSWay
              </span>
            </div>
            <p className="text-white/60 max-w-sm">
              Empowering the next generation of open-source contributors.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-6 justify-center">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-1 group"
              >
                {link.label}
                {link.icon && (
                  <link.icon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                )}
                <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300"></div>
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex gap-4 justify-center md:justify-end">
            <a
              href="#"
              className="w-10 h-10 rounded-full glass border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-cyan-400/50 transition-all duration-300 group"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full glass border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-cyan-400/50 transition-all duration-300 group"
            >
              <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full glass border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-cyan-400/50 transition-all duration-300 group"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </a>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © 2024 FOSSWay. Built for developers, by developers.
          </p>
          
          <div className="flex items-center gap-4 text-sm text-white/50">
            <span>Paranox 2.O</span>
            <div className="w-1 h-1 rounded-full bg-white/30"></div>
            <span>Open Innovation Track</span>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyan-500/5 via-purple-500/5 to-transparent pointer-events-none"></div>
    </footer>
  );
}