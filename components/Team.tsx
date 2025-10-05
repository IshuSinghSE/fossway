import { ArrowLeft, Github, Linkedin, Mail, Code, Palette, Lightbulb, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

const teamMembers = [
  {
    name: "Vinay Kumar",
    role: "Frontend Developer & UI Designer",
    bio: "Passionate about creating beautiful and intuitive user experiences. Specializes in React, Next.js, and modern CSS frameworks.",
    social: {
      github: "https://github.com/vinaysingh-05",
      linkedin: "https://www.linkedin.com/in/vinay-kumar0805",
      email: "vinay@fossway.dev"
    },
    color: "text-cyan-400",
    bgGradient: "from-cyan-400/20 to-blue-500/20",
    borderColor: "border-cyan-400/30",
    icon: Palette
  },
  {
    name: "Ishu",
    role: "Full Stack Developer",
    bio: "Full-stack wizard with expertise in both frontend and backend technologies. Passionate about building scalable applications.",
    social: {
      github: "https://github.com/IshuSinghSE",
      linkedin: "https://linkedin.com/in/wth-ishu",
      email: "ishu@fossway.dev"
    },
    color: "text-purple-400",
    bgGradient: "from-purple-400/20 to-pink-500/20",
    borderColor: "border-purple-400/30",
    icon: Code
  },
  {
    name: "Bhavyaa Bansal",
    role: "Designer & Concept Thinker",
    bio: "Creative visionary who transforms complex ideas into elegant design solutions. Expert in user research and design thinking.",
    social: {
      github: "#",
      linkedin: "https://linkedin.com/in/bhavyaa-bansal-0b5170334",
      email: "bhavyaa@fossway.dev"
    },
    color: "text-green-400",
    bgGradient: "from-green-400/20 to-emerald-500/20",
    borderColor: "border-green-400/30",
    icon: Lightbulb
  }
];

export function Team() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <Button 
          variant="outline"
          asChild
          className="glass border-white/30 text-white hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300 mb-8"
        >
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 border border-cyan-400/30 mb-6">
            <Users className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400">Meet the Team</span>
          </div>
          
          {/* Team Logo */}
          <div className="flex justify-center mb-8">
            <div className="glass rounded-3xl p-6 border border-white/10 hover:scale-105 transition-all duration-300">
              <Image 
                src={"/team_logo.png"} 
                alt="The Code Squad Logo" 
                width={256}
                height={256}
                priority
                className="w-64 h-auto mx-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
          
          <p className="text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-8">
            A passionate team of developers and designers united by a shared vision: 
            making open source accessible to everyone.
          </p>

          {/* Team stats */}
          <div className="flex justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">3</div>
              <div className="text-white/60">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">50+</div>
              <div className="text-white/60">Combined Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">∞</div>
              <div className="text-white/60">Shared Passion</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="glass rounded-3xl p-8 border border-white/10 relative overflow-hidden group hover:scale-105 transition-all duration-500"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${member.bgGradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                
                <div className="relative z-10 space-y-6">
                  {/* Basic info with icon */}
                  <div className="text-center">
                    <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${member.bgGradient} glass border ${member.borderColor} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <member.icon className={`w-10 h-10 ${member.color}`} />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                      {member.name}
                    </h3>
                    <p className={`font-medium ${member.color} mb-4`}>
                      {member.role}
                    </p>
                  </div>

                  {/* Bio */}
                  <p className="text-white/70 leading-relaxed text-center">
                    {member.bio}
                  </p>

                  {/* Social links */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-center gap-4">
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl glass border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300 group/social"
                      >
                        <Github className="w-6 h-6 group-hover/social:scale-110 transition-transform duration-300" />
                      </a>
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl glass border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-blue-400/50 hover:bg-blue-400/10 transition-all duration-300 group/social"
                      >
                        <Linkedin className="w-6 h-6 group-hover/social:scale-110 transition-transform duration-300" />
                      </a>
                      <a
                        href={`mailto:${member.social.email}`}
                        className={`w-12 h-12 rounded-xl glass border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:${member.borderColor} hover:bg-gradient-to-br hover:${member.bgGradient} transition-all duration-300 group/social`}
                      >
                        <Mail className="w-6 h-6 group-hover/social:scale-110 transition-transform duration-300" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}