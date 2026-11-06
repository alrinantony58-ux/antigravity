import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Sparkles, Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#06050b] border-t border-purple-500/15 py-12 overflow-hidden text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-purple-500/10">
          
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center font-bold text-white text-xs font-mono">
              AG
            </div>
            <div>
              <div className="font-semibold text-white text-sm">Alrin Antony Gonsalvez</div>
              <div className="text-[11px] font-mono text-purple-400">Software Engineer • India</div>
            </div>
          </div>

          {/* Nav Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
            <a href="#home" className="hover:text-purple-300 transition-colors">Home</a>
            <a href="#about" className="hover:text-purple-300 transition-colors">About</a>
            <a href="#skills" className="hover:text-purple-300 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-purple-300 transition-colors">Projects</a>
            <a href="#education" className="hover:text-purple-300 transition-colors">Education</a>
            <a href="#contact" className="hover:text-purple-300 transition-colors">Contact</a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#12101e] hover:bg-purple-950/50 border border-purple-500/20 text-xs text-zinc-300 hover:text-white transition-all shadow-md"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-purple-400" />
          </button>
        </div>

        {/* Bottom Details */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} Alrin Antony Gonsalvez. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with React, TypeScript & Tailwind CSS</span>
            <span className="text-purple-400 mx-1">•</span>
            <span className="text-purple-300 font-mono">Deep Purple Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

