import React from 'react';
import { User, Code, Rocket, Brain, ShieldCheck, HeartHandshake, MapPin, Briefcase, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const About: React.FC = () => {
  const cards = [
    {
      icon: Code,
      title: "Clean Architecture",
      subtitle: "Code Quality & Discipline",
      description: "Dedicated to writing maintainable, self-documenting code with strong typing, robust error handling, and clean modular boundaries."
    },
    {
      icon: Brain,
      title: "Problem Solver",
      subtitle: "Analytical & Algorithmic",
      description: "Approaching challenges with structured decomposition, optimizing algorithms for time and space, and thoroughly testing edge conditions."
    },
    {
      icon: Rocket,
      title: "Modern Tech Enthusiast",
      subtitle: "Rapid Adoption & Agility",
      description: "Continuously staying ahead of contemporary web standards, cloud paradigms, serverless backends, and developer tooling ecosystems."
    },
    {
      icon: Briefcase,
      title: "Immediate Availability",
      subtitle: "Actively Interviewing",
      description: "Ready to join an engineering organization immediately as a Software Engineer, whether in-person across India or in distributed remote teams."
    }
  ];

  return (
    <section id="about" className="relative py-28 bg-[#080808] overflow-hidden">
      {/* Background Subtle Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/20 text-purple-300 text-xs font-mono uppercase tracking-widest mb-3">
            <User className="w-3.5 h-3.5 text-purple-400" />
            <span>01 // Discover</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-transparent mt-4 rounded-full" />
        </div>

        {/* Narrative & Profile Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
          
          {/* Main Story / Narrative Column */}
          <div className="lg:col-span-7 bg-gradient-to-b from-[#13111f]/90 to-[#0c0b14]/90 p-8 sm:p-10 rounded-3xl border border-purple-500/20 shadow-2xl shadow-purple-950/20 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-wider mb-4">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Engineering Philosophy & Profile</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 leading-snug">
                Turning complex logical puzzles into refined, elegant digital products.
              </h3>
              <div className="space-y-4 text-zinc-300 text-base leading-relaxed">
                <p>
                  Hello! I'm <strong className="text-white font-semibold">{personalInfo.name}</strong>, a Software Engineer from India. My passion lies at the intersection of robust backend logic, resilient system design, and sleek, responsive user interfaces.
                </p>
                <p>
                  {personalInfo.about.bio}
                </p>
                <p className="text-zinc-400">
                  {personalInfo.about.focus} I view software not just as syntax, but as a medium for solving real-world challenges, eliminating inefficiencies, and delivering genuine value to users.
                </p>
                <p className="text-purple-300 font-medium pt-2 border-t border-purple-500/10">
                  🎯 <strong className="text-white">Career Ambition:</strong> {personalInfo.about.goals}
                </p>
              </div>
            </div>

            {/* Quick Badges Bar */}
            <div className="mt-8 pt-6 border-t border-purple-500/15 flex flex-wrap gap-3">
              <span className="px-3.5 py-1.5 rounded-lg bg-purple-950/40 border border-purple-500/20 text-purple-300 text-xs font-mono">
                📍 Location: India
              </span>
              <span className="px-3.5 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 text-xs font-mono">
                💼 Status: Open to Opportunities
              </span>
              <span className="px-3.5 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
                🚀 Full-Stack Engineering
              </span>
            </div>
          </div>

          {/* Quick Metrics / Summary Block */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="bg-[#12101e]/80 p-6 rounded-2xl border border-purple-500/20 backdrop-blur-md">
              <div className="text-xs font-mono text-purple-400 uppercase tracking-wider mb-2">Base Of Operations</div>
              <div className="text-xl font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-400" />
                <span>India (Open to Relocation & Remote)</span>
              </div>
              <p className="text-xs text-zinc-400 mt-2">
                Available to collaborate with teams across Indian tech hubs (Bengaluru, Hyderabad, Pune, NCR, etc.) as well as international remote teams.
              </p>
            </div>

            <div className="bg-[#12101e]/80 p-6 rounded-2xl border border-purple-500/20 backdrop-blur-md">
              <div className="text-xs font-mono text-purple-400 uppercase tracking-wider mb-2">Core Technical Values</div>
              <ul className="text-sm text-zinc-300 space-y-2.5">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">✓</span>
                  <span><strong>Maintainability First:</strong> Readable code over clever one-liners.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">✓</span>
                  <span><strong>Performance Mindset:</strong> Fast render cycles, low memory footprints, and fast queries.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">✓</span>
                  <span><strong>Collaborative Spirit:</strong> Constructive code reviews, thorough documentation, and shared ownership.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 p-6 rounded-2xl border border-purple-500/30 backdrop-blur-md">
              <div className="text-xs font-mono text-purple-300 uppercase tracking-wider mb-1">What I Bring to Your Team</div>
              <p className="text-sm text-zinc-200 mt-1 font-medium">
                High motivation, rapid learning velocity, eagerness to solve complex bugs, and dedication to building scalable web applications.
              </p>
            </div>
          </div>

        </div>

        {/* 4 Interactive Animated Information Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="group relative bg-[#110f1c]/70 hover:bg-[#161326]/90 p-6 rounded-2xl border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 hover:-translate-y-1.5 shadow-lg hover:shadow-purple-900/30 backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 mb-5 shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                    {card.title}
                  </h4>
                  <div className="text-xs font-mono text-purple-400/70 mb-3 uppercase tracking-wider">
                    {card.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>
                
                {/* Bottom line accent */}
                <div className="mt-5 w-8 h-0.5 bg-purple-500/40 group-hover:w-full group-hover:bg-purple-400 transition-all duration-300 rounded-full" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

