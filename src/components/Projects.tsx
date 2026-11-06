import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Layers, 
  Sparkles, 
  Info, 
  X, 
  CheckCircle, 
  Code 
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import { Project } from '../types/portfolio';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'Full-Stack', 'Frontend', 'Backend & API'];

  const filteredProjects = projectsData.filter((proj) => {
    if (selectedCategory === 'All') return true;
    return proj.category === selectedCategory;
  });

  return (
    <section id="projects" className="relative py-28 bg-[#080808] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/20 text-purple-300 text-xs font-mono uppercase tracking-widest mb-3">
            <FolderGit2 className="w-3.5 h-3.5 text-purple-400" />
            <span>03 // Portfolio Work</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Featured <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mt-4 text-sm sm:text-base">
            Architectural implementations, modern web applications, and system design showcases.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-transparent mt-4 rounded-full" />
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-[#12111c] p-1.5 rounded-2xl border border-purple-500/20 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-zinc-400 hover:text-white hover:bg-purple-950/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-[#12101e]/80 hover:bg-[#161327] rounded-3xl border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 hover:-translate-y-2 shadow-2xl hover:shadow-purple-950/40 backdrop-blur-xl overflow-hidden flex flex-col justify-between"
            >
              {/* Image Preview Container */}
              <div className="relative h-60 w-full overflow-hidden bg-[#0c0b14]">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#12101e] via-[#12101e]/40 to-transparent pointer-events-none" />

                {/* Badges Overlay */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-[#080808]/80 text-purple-300 border border-purple-500/30 backdrop-blur-md">
                    {project.category}
                  </span>

                  {project.isPlaceholder && (
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono text-amber-300 bg-amber-950/80 border border-amber-500/40 backdrop-blur-md">
                      Sample Showcase Template
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-purple-300/80 text-xs font-mono mb-3">
                    {project.tagline}
                  </p>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-1.5 mb-6">
                    {project.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack & Action Links */}
                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 pt-4 border-t border-purple-500/15">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-purple-950/40 text-purple-300 border border-purple-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium text-zinc-300 hover:text-white bg-[#1a1729] hover:bg-purple-900/30 border border-purple-500/20 hover:border-purple-400 transition-all"
                    >
                      <Github className="w-4 h-4 text-purple-400" />
                      <span>Source Code</span>
                    </a>

                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-600/30 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>

                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="p-2.5 rounded-xl text-zinc-400 hover:text-purple-300 bg-[#1a1729] hover:bg-purple-900/30 border border-purple-500/20 transition-all"
                      title="View Details"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Informational Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-[#13111f] to-indigo-950/40 border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-400 shrink-0">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Have specific project repositories to show?</h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                These cards are structured to easily slot in your live GitHub repos and production deployments.
              </p>
            </div>
          </div>
          <a
            href="https://github.com/alrin-antony"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl text-xs font-mono font-medium text-purple-300 border border-purple-500/40 bg-purple-900/20 hover:bg-purple-800/30 transition-colors whitespace-nowrap"
          >
            Visit GitHub Profile →
          </a>
        </div>

      </div>

      {/* Project Details Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#12101e] border border-purple-500/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl shadow-purple-950/50">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-purple-950/50 text-zinc-400 hover:text-white border border-purple-500/20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-2">
              <span>{activeModalProject.category}</span>
              <span>•</span>
              <span className="text-amber-300">Showcase Preview</span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              {activeModalProject.title}
            </h3>
            <p className="text-sm text-purple-300 mb-4 font-mono">
              {activeModalProject.tagline}
            </p>

            <p className="text-zinc-300 text-sm leading-relaxed mb-6">
              {activeModalProject.description}
            </p>

            <h4 className="text-xs font-mono text-purple-400 uppercase tracking-wider mb-2">
              Architectural Highlights
            </h4>
            <ul className="space-y-2 mb-6">
              {activeModalProject.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                  <CheckCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mb-6">
              {activeModalProject.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-purple-950/40 text-purple-300 border border-purple-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <a
                href={activeModalProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 text-center text-xs font-medium rounded-xl bg-purple-950/60 text-purple-300 border border-purple-500/30 hover:bg-purple-900/40"
              >
                GitHub Repository
              </a>
              <a
                href={activeModalProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 text-center text-xs font-medium rounded-xl bg-purple-600 text-white hover:bg-purple-500"
              >
                Live Demo
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

