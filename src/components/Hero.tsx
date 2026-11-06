import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Download, MapPin, Terminal, Code2, Sparkles, Compass } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { Canvas3D } from './Canvas3D';

export const Hero: React.FC = () => {
  const titles = [
    "Software Engineer",
    "Full-Stack Developer",
    "Problem Solver",
    "Modern Web Architect"
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = titles[currentTitleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        if (displayText.length + 1 === fullText.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        if (displayText.length - 1 === 0) {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTitleIndex]);

  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Dynamic Purple Gradient Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e15_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status Beacon Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-mono mb-6 shadow-lg shadow-purple-900/20 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-zinc-200 font-medium">Seeking Software Engineer Roles</span>
              <span className="text-purple-400 font-mono">• India 🇮🇳</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-4">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-white via-zinc-200 to-purple-400 bg-clip-text text-transparent">
                Alrin Antony Gonsalvez.
              </span>
            </h1>

            {/* Animated Title Typing */}
            <div className="flex items-center gap-2 mb-4 font-mono text-xl sm:text-2xl lg:text-3xl font-semibold">
              <span className="text-purple-400">&gt;</span>
              <span className="text-purple-300">{displayText}</span>
              <span className="w-2.5 h-6 sm:h-8 bg-purple-400 animate-pulse inline-block" />
            </div>

            {/* Tagline */}
            <h2 className="text-lg sm:text-xl font-medium text-purple-200/90 mb-4 tracking-wide">
              {personalInfo.tagline}
            </h2>

            {/* Short Introduction */}
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-8 font-normal">
              A passionate software engineer based in India with an affinity for clean code, scalable backend services, and interactive web experiences. Constantly learning, building, and seeking high-impact opportunities with ambitious teams.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => scrollTo('#projects')}
                className="group relative px-7 py-3.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 shadow-xl shadow-purple-600/30 hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 border border-purple-400/40 w-full sm:w-auto overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                <span className="relative z-10">Explore My Work</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo('#contact')}
                className="px-7 py-3.5 rounded-xl font-medium text-sm text-zinc-300 hover:text-white bg-[#14121f]/90 hover:bg-purple-950/40 border border-purple-500/30 hover:border-purple-400/60 shadow-lg hover:shadow-purple-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 w-full sm:w-auto backdrop-blur-md"
              >
                <Mail className="w-4 h-4 text-purple-400" />
                <span>Get In Touch</span>
              </button>

              <a
                href="#contact"
                className="px-5 py-3.5 rounded-xl font-medium text-sm text-zinc-400 hover:text-purple-300 border border-transparent hover:border-purple-500/20 hover:bg-purple-950/20 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Download className="w-4 h-4 text-purple-400" />
                <span>Resume [PDF]</span>
              </a>
            </div>

            {/* Quick Stats / Highlights */}
            <div className="grid grid-cols-3 gap-6 sm:gap-8 pt-10 mt-10 border-t border-purple-500/15 w-full max-w-xl">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">India</div>
                <div className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-purple-400" />
                  <span>Base Location</span>
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">Ready</div>
                <div className="text-xs text-zinc-400 mt-1">Full-Time / Remote</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">Modern</div>
                <div className="text-xs text-zinc-400 mt-1">React & TypeScript</div>
              </div>
            </div>

          </div>

          {/* Right 3D Abstract Visual */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="w-full max-w-[480px] aspect-square relative flex items-center justify-center">
              
              {/* Outer Decorative Tech Rings */}
              <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-[spin_60s_linear_infinite] pointer-events-none" />
              <div className="absolute inset-6 rounded-full border border-dashed border-purple-400/15 animate-[spin_40s_linear_infinite_reverse] pointer-events-none" />
              
              {/* Corner Tech Markers */}
              <div className="absolute top-2 left-2 text-[10px] font-mono text-purple-400/60 uppercase tracking-widest pointer-events-none">
                SYS.CORE // V3.8
              </div>
              <div className="absolute bottom-2 right-2 text-[10px] font-mono text-purple-400/60 uppercase tracking-widest pointer-events-none">
                DYNAMIC MATRIX
              </div>

              {/* 3D Canvas Visual Engine */}
              <Canvas3D className="w-full h-full" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

