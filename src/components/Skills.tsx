import React, { useState } from 'react';
import { 
  Code2, 
  Layout, 
  Server, 
  Database, 
  Boxes, 
  Wrench, 
  Cpu, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  PlusCircle 
} from 'lucide-react';
import { skillsData } from '../data/portfolioData';
import { Skill } from '../types/portfolio';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Stack', icon: Sparkles },
    { id: 'languages', label: 'Languages', icon: Code2 },
    { id: 'frontend', label: 'Frontend', icon: Layout },
    { id: 'backend', label: 'Backend', icon: Server },
    { id: 'databases', label: 'Databases', icon: Database },
    { id: 'frameworks', label: 'Frameworks', icon: Boxes },
    { id: 'tools', label: 'Dev Tools', icon: Wrench },
    { id: 'other', label: 'Engineering Principles', icon: Cpu },
  ];

  const filteredSkills = skillsData.filter((skill) => {
    const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'languages': return { label: 'Language', color: 'text-amber-400 bg-amber-950/40 border-amber-500/30' };
      case 'frontend': return { label: 'Frontend', color: 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30' };
      case 'backend': return { label: 'Backend', color: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30' };
      case 'databases': return { label: 'Database', color: 'text-purple-400 bg-purple-950/40 border-purple-500/30' };
      case 'frameworks': return { label: 'Framework', color: 'text-pink-400 bg-pink-950/40 border-pink-500/30' };
      case 'tools': return { label: 'Tool', color: 'text-blue-400 bg-blue-950/40 border-blue-500/30' };
      default: return { label: 'Core', color: 'text-indigo-400 bg-indigo-950/40 border-indigo-500/30' };
    }
  };

  return (
    <section id="skills" className="relative py-28 bg-[#090810] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/20 text-purple-300 text-xs font-mono uppercase tracking-widest mb-3">
            <Code2 className="w-3.5 h-3.5 text-purple-400" />
            <span>02 // Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Skills & <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Technologies</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mt-4 text-sm sm:text-base">
            Categorized technical stack spanning client-side engineering, backend systems, database modeling, and developer tooling.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-transparent mt-4 rounded-full" />
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 bg-[#12111c] p-1.5 rounded-2xl border border-purple-500/20 backdrop-blur-md w-full md:w-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                      : 'text-zinc-400 hover:text-white hover:bg-purple-950/30'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search skill (e.g. React)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#12111c] text-white text-xs pl-10 pr-4 py-2.5 rounded-xl border border-purple-500/20 focus:outline-none focus:border-purple-400 transition-colors placeholder:text-zinc-500"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill, index) => {
            const badge = getCategoryBadge(skill.category);
            const isPlaceholder = skill.isPlaceholder;

            if (isPlaceholder) {
              return (
                <div
                  key={index}
                  className="group relative bg-[#0f0e18]/40 border border-dashed border-purple-500/30 rounded-2xl p-5 hover:border-purple-400 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md border border-purple-400/20 text-purple-300 bg-purple-950/20">
                      Editable Slot
                    </span>
                    <PlusCircle className="w-4 h-4 text-purple-400/60 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-400 font-mono group-hover:text-purple-300 transition-colors">
                      {skill.name}
                    </h4>
                    <p className="text-[11px] text-zinc-500 mt-1">
                      Ready for your personalized specialty
                    </p>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={index}
                className="group relative bg-[#13111f]/80 hover:bg-[#191629] border border-purple-500/15 hover:border-purple-400/40 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-purple-950/40 backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${badge.color}`}>
                      {badge.label}
                    </span>
                    {skill.highlight && (
                      <span className="flex items-center gap-1 text-[10px] text-purple-300 bg-purple-950/50 px-2 py-0.5 rounded-md border border-purple-500/30">
                        <CheckCircle2 className="w-3 h-3 text-purple-400" />
                        <span>Core</span>
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                    {skill.name}
                  </h4>
                </div>

                {/* Animated Proficiency Bar */}
                {skill.proficiency && (
                  <div className="mt-4 pt-3 border-t border-purple-500/10">
                    <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 mb-1.5">
                      <span>Proficiency</span>
                      <span className="text-purple-300 font-bold">{skill.proficiency}%</span>
                    </div>
                    <div className="w-full bg-[#1e1b2e] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full transition-all duration-500 group-hover:brightness-125"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Informational Callout */}
        <div className="mt-12 p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 text-center max-w-2xl mx-auto">
          <p className="text-xs text-zinc-400">
            <span className="text-purple-400 font-semibold">Note on Stack Accuracy:</span> All technical proficiencies listed represent active hands-on foundations. The marked placeholder slots are readily customizable in <code className="text-purple-300 font-mono text-[11px]">portfolioData.ts</code>.
          </p>
        </div>

      </div>
    </section>
  );
};

