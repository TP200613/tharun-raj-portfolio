import React from 'react';
import { X, ExternalLink, Cpu, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { GithubIcon } from './Icons';
import { soundFx } from '../utils/sound';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => {
          soundFx.playClick();
          onClose();
        }}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#ffffff] border border-[var(--theme-border)] shadow-2xl z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Top Header Banner with Graphic Image */}
        <div className="relative min-h-[160px] p-6 sm:p-8 bg-[#1c1917] text-white overflow-hidden flex flex-col justify-end">
          {project.image && (
            <>
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917] via-[#1c1917]/70 to-black/30 pointer-events-none" />
            </>
          )}

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer border border-white/20 z-20"
          >
            <X size={18} />
          </button>

          <div className="relative z-10 space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-white border border-white/20">
              {project.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              {project.title}
            </h3>
            <p className="text-sm text-white/90 max-w-xl">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto text-[#57534e] text-sm">
          {/* Detailed Overview */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[var(--theme-dark)] uppercase tracking-wider flex items-center gap-1.5 font-heading">
              <Sparkles size={14} className="text-[var(--theme-primary)]" />
              <span>Project Overview &amp; Architecture</span>
            </h4>
            <p className="text-[#57534e] leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Architecture Highlights */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[var(--theme-dark)] uppercase tracking-wider flex items-center gap-1.5 font-heading">
              <Cpu size={14} className="text-[var(--theme-primary)]" />
              <span>Key Architectural Decisions</span>
            </h4>
            <div className="space-y-2">
              {project.architecture.map((arch, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)]">
                  <CheckCircle2 size={16} className="text-[var(--theme-primary)] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#57534e] font-medium">{arch}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#15803d] uppercase tracking-wider flex items-center gap-1.5 font-heading">
              <Layers size={14} />
              <span>Performance Benchmarks &amp; Milestones</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {project.metrics.map((metric, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)] text-center">
                  <div className="text-xs font-bold text-[#15803d]">
                    {metric}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#78716c] uppercase tracking-wider font-heading">
              Technologies &amp; Libraries
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-[var(--theme-light)] border border-[var(--theme-border)] text-xs font-semibold text-[var(--theme-dark)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#faf8f5] border-t border-[var(--theme-border)] flex items-center justify-between">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClick()}
            className="px-4 py-2 rounded-xl bg-[#ffffff] border border-[var(--theme-border)] hover:border-[var(--theme-primary)] text-[#1c1917] text-xs font-bold flex items-center gap-2 transition-colors shadow-xs"
          >
            <GithubIcon size={16} />
            <span>View Source Code</span>
          </a>

          {project.demo.startsWith('http') ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              className="px-5 py-2 rounded-xl btn-theme-primary text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
            >
              <span>Live Application</span>
              <ExternalLink size={14} />
            </a>
          ) : (
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="px-5 py-2 rounded-xl btn-theme-primary text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Close Window</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
