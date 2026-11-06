import React from 'react';
import { 
  Heart, 
  GitBranch, 
  Sparkles, 
  Cpu, 
  Layers, 
  BrainCircuit, 
  BookOpen 
} from 'lucide-react';
import { interestsData } from '../data/portfolioData';

export const Interests: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GitBranch': return GitBranch;
      case 'Sparkles': return Sparkles;
      case 'Cpu': return Cpu;
      case 'Layers': return Layers;
      case 'BrainCircuit': return BrainCircuit;
      case 'BookOpen': return BookOpen;
      default: return Heart;
    }
  };

  return (
    <section className="relative py-24 bg-[#080808] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/20 text-purple-300 text-xs font-mono uppercase tracking-widest mb-3">
            <Heart className="w-3.5 h-3.5 text-purple-400" />
            <span>05 // Passions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Personal Interests & <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Curiosity</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mt-3 text-sm">
            What drives my creative thinking, problem-solving habits, and everyday engineering curiosity beyond the terminal.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-transparent mt-4 rounded-full" />
        </div>

        {/* Interests Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {interestsData.map((interest, idx) => {
            const Icon = getIcon(interest.icon);
            return (
              <div
                key={idx}
                className="group relative bg-[#12101e]/60 hover:bg-[#18152b] p-6 rounded-2xl border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 hover:-translate-y-1.5 shadow-lg hover:shadow-purple-950/30 backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-purple-600/15 border border-purple-500/25 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {interest.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                    {interest.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-purple-500/10">
                  {interest.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono text-purple-300/80 bg-purple-950/30"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

