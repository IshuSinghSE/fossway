'use client';
import { useState } from "react";
import Link from "next/link";
import { Rocket, Menu, X, Github } from "lucide-react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#process" },
    { label: "Community", href: "#community" },
    { label: "About", href: "#about" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <Rocket className="w-8 h-8 text-transparent" />
              <svg className="absolute inset-0 w-8 h-8" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00d9ff" />
                    <stop offset="50%" stopColor="#b24fff" />
                    <stop offset="100%" stopColor="#ff69b4" />
                  </linearGradient>
                </defs>
                <Rocket className="w-8 h-8" fill="url(#logo-gradient)" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              FOSSWay
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
              >
                <span className="relative z-10">{link.label}</span>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300"></div>
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            {/* <Button 
              variant="outline" 
              size="sm"
              className="glass border-border text-foreground hover:border-primary/50 hover:bg-accent/10 transition-all duration-300"
            >
              <Github className="w-4 h-4 mr-2" />
              Sign in with GitHub
            </Button> */}
            <Button 
              size="sm"
              asChild
              className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
            >
              <Link href="/issues">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden glass border-border text-foreground hover:border-primary/50"
          >
            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 p-4 glass rounded-xl border border-border">
            <nav className="flex flex-col gap-4 mb-4">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 py-2"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <div className="flex justify-center mb-2">
                <ThemeToggle />
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="glass border-border text-foreground hover:border-primary/50 justify-start"
              >
                <Github className="w-4 h-4 mr-2" />
                Sign in with GitHub
              </Button>
              <Button 
                size="sm"
                asChild
                onClick={() => setIsMenuOpen(false)}
                className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white border-0"
              >
                <Link href="/issues">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}