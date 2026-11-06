import React, { useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  ScrollText, 
  Calendar, 
  MapPin, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import { timelineData } from '../data/portfolioData';
import { TimelineItem } from '../types/portfolio';

export const Timeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'all'>('all');

  const filteredItems = timelineData.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'experience') return item.type === 'experience' || item.type === 'internship';
    if (activeTab === 'education') return item.type === 'education' || item.type === 'certification' || item.type === 'achievement';
    return true;
  });

  const getIconForType = (type: TimelineItem['type']) => {
    switch (type) {
      case 'education': return GraduationCap;
      case 'experience': return Briefcase;
      case 'internship': return Briefcase;
      case 'certification': return ScrollText;
      case 'achievement': return Award;
      default: return Sparkles;
    }
  };

  const getBadgeForType = (type: TimelineItem['type']) => {
    switch (type) {
      case 'education': return { label: 'Education', color: 'text-indigo-400 bg-indigo-950/40 border-indigo-500/30' };
      case 'experience': return { label: 'Work Experience', color: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30' };
      case 'internship': return { label: 'Internship', color: 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30' };
      case 'certification': return { label: 'Certification', color: 'text-amber-400 bg-amber-950/40 border-amber-500/30' };
      case 'achievement': return { label: 'Achievement', color: 'text-purple-400 bg-purple-950/40 border-purple-500/30' };
      default: return { label: 'Milestone', color: 'text-zinc-400 bg-zinc-900 border-zinc-700' };
    }
  };

  return (
    <section id="education" className="relative py-28 bg-[#090810] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/20 text-purple-300 text-xs font-mono uppercase tracking-widest mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
            <span>04 // Trajectory</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Education & <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Experience</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mt-4 text-sm sm:text-base">
            Verified academic foundations, software engineering training, certifications, and technical accomplishments.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-transparent mt-4 rounded-full" />
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-[#12111c] p-1.5 rounded-2xl border border-purple-500/20 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'all'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-purple-950/30'
              }`}
            >
              All Milestones
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'experience'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-purple-950/30'
              }`}
            >
              Experience & Internships
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'education'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-purple-950/30'
              }`}
            >
              Education & Certifications
            </button>
          </div>
        </div>

        {/* Vertical Timeline Tree */}
        <div className="relative border-l-2 border-purple-500/20 ml-4 sm:ml-32 space-y-12">
          {filteredItems.map((item) => {
            const Icon = getIconForType(item.type);
            const badge = getBadgeForType(item.type);

            return (
              <div key={item.id} className="relative pl-8 sm:pl-10 group">
                
                {/* Glowing Node on Timeline */}
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#12101e] border-2 border-purple-500 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Left Date Label (Desktop) */}
                <div className="hidden sm:block absolute -left-36 top-2 text-right w-28">
                  <span className="text-xs font-mono font-medium text-purple-300">
                    {item.period}
                  </span>
                </div>

                {/* Timeline Card */}
                <div className="bg-[#12101e]/80 hover:bg-[#161327] p-6 sm:p-7 rounded-2xl border border-purple-500/20 hover:border-purple-400/50 shadow-xl hover:shadow-purple-950/30 backdrop-blur-md transition-all duration-300">
                  
                  {/* Mobile Date Header */}
                  <div className="sm:hidden flex items-center gap-2 text-xs font-mono text-purple-300 mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-md border ${badge.color}`}>
                      {badge.label}
                    </span>

                    {item.isPlaceholder && (
                      <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                        Placeholder / Replaceable
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mb-4 font-mono">
                    <span className="text-purple-300 font-medium">{item.organization}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-purple-400" />
                      {item.location}
                    </span>
                    {item.credentialId && (
                      <>
                        <span>•</span>
                        <span className="text-amber-400">ID: {item.credentialId}</span>
                      </>
                    )}
                  </div>

                  {/* Descriptions */}
                  <div className="space-y-2 mb-4">
                    {item.description.map((desc, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span>{desc}</span>
                      </div>
                    ))}
                  </div>

                  {/* Skill Badges if applicable */}
                  {item.skills && item.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-purple-500/10">
                      {item.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950/30 text-purple-300 border border-purple-500/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

