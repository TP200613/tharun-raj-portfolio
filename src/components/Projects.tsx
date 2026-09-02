import React, { useState } from 'react';
import { ExternalLink, Sparkles, ArrowUpRight, Cpu, Activity, Layers } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';
import { GithubIcon } from './Icons';
import { ProjectModal } from './ProjectModal';
import { GitPulseSimulator } from './GitPulseSimulator';
import { soundFx } from '../utils/sound';
import { getAssetUrl } from '../utils/assetPath';

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Full Stack', 'Data & Analytics', 'Algorithms & Systems'];

  const filteredProjects =
    activeCategory === 'All'
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.category === activeCategory);

  const handleInspect = (project: Project) => {
    soundFx.playClick();
    setSelectedProject(project);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 page-fade-in">
      {/* Page Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--theme-light)] border border-[var(--theme-border)] text-xs font-bold text-[var(--theme-dark)]">
          <Activity size={14} />
          <span>FLAGSHIP INNOVATION &amp; SYSTEMS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#1c1917]">
          GitPulse &amp; <span className="text-gradient-theme">Featured Engineering</span>
        </h2>
        <p className="text-sm sm:text-base text-[#57534e] max-w-2xl mx-auto">
          Explore Tharun's flagship GitHub analytics platform live below, alongside verified full-stack applications and data architectures.
        </p>
      </div>

      {/* Flagship GitPulse Simulator Live Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-[var(--theme-border)]">
          <Sparkles size={18} className="text-[var(--theme-primary)]" />
          <h3 className="text-lg font-heading font-bold text-[#1c1917]">
            Flagship: GitPulse Intelligence Engine (Live Simulator)
          </h3>
        </div>
        <GitPulseSimulator />
      </div>

      {/* Other Projects Grid Section */}
      <div className="space-y-8 pt-8 border-t border-[var(--theme-border)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-heading font-bold text-[#1c1917] flex items-center gap-2">
              <Layers size={22} className="text-[var(--theme-dark)]" />
              <span>Architectural Systems &amp; Solutions</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#78716c] mt-0.5">
              Production data pipelines, analytics engines, and algorithm pattern repositories.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundFx.playClick();
                  setActiveCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'btn-theme-primary'
                    : 'bg-[#ffffff] border border-[var(--theme-border)] text-[#57534e] hover:text-[#1c1917] hover:border-[var(--theme-primary)] shadow-xs'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl bg-[#ffffff] border border-[var(--theme-border)] hover:border-[var(--theme-primary)] flex flex-col justify-between overflow-hidden group transition-all duration-300 hover:-translate-y-1.5 shadow-md hover:shadow-2xl"
            >
              {/* Graphic Visual Banner with Hover Zoom */}
              {project.image ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#1c1917] border-b border-[var(--theme-border)] cursor-pointer" onClick={() => handleInspect(project)}>
                  <img
                    src={getAssetUrl(project.image)}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Floating Badges over Graphic */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-sm">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[var(--theme-primary)] text-white shadow-sm flex items-center gap-1">
                        <Sparkles size={11} />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Title Overlay at bottom of graphic */}
                  <div className="absolute bottom-3 left-4 right-4 pointer-events-none">
                    <h3 className="text-xl font-heading font-extrabold text-white group-hover:text-[var(--theme-light)] transition-colors drop-shadow-md">
                      {project.title}
                    </h3>
                  </div>
                </div>
              ) : (
                <div className="h-2 w-full bg-[var(--theme-gradient)]" />
              )}

              <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  {!project.image && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[var(--theme-light)] text-[var(--theme-dark)] border border-[var(--theme-border)]">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-[var(--theme-light)] text-[var(--theme-dark)] border border-[var(--theme-border)] flex items-center gap-1">
                          <Sparkles size={11} className="text-[var(--theme-primary)]" />
                          Featured
                        </span>
                      )}
                    </div>
                  )}

                  <div>
                    {!project.image && (
                      <h3 className="text-xl font-heading font-bold text-[#1c1917] group-hover:text-[var(--theme-dark)] transition-colors">
                        {project.title}
                      </h3>
                    )}
                    <p className="text-xs text-[#78716c] font-medium mt-0.5">
                      {project.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed">
                    {project.description}
                  </p>

                  <div className="p-3 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)] flex items-center gap-2 text-xs font-semibold text-[#15803d]">
                    <Cpu size={15} className="shrink-0 text-[#16a34a]" />
                    <span className="truncate">{project.metrics[0]}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.slice(0, 5).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-[#faf8f5] text-xs font-medium text-[#78716c] border border-[var(--theme-border)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--theme-border)] flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleInspect(project)}
                    className="px-3.5 py-2 rounded-xl bg-[#faf8f5] hover:bg-[var(--theme-light)] text-[#1c1917] text-xs font-bold flex items-center gap-1.5 transition-colors border border-[var(--theme-border)] hover:border-[var(--theme-primary)] cursor-pointer"
                  >
                    <span>Architecture</span>
                    <ArrowUpRight size={14} className="text-[var(--theme-dark)]" />
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundFx.playClick()}
                      className="p-2 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)] hover:border-[var(--theme-primary)] text-[#57534e] hover:text-[#1c1917] transition-colors cursor-pointer"
                      title="GitHub Repository"
                    >
                      <GithubIcon size={16} />
                    </a>

                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => soundFx.playClick()}
                        className="px-3 py-2 rounded-xl bg-[var(--theme-light)] border border-[var(--theme-border)] text-[var(--theme-dark)] hover:bg-[var(--theme-border)] text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        title="View Demo or Profile"
                      >
                        <span>Demo</span>
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep-Dive Inspection Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};
