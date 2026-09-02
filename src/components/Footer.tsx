import React from 'react';
import { ArrowUp } from 'lucide-react';
import { soundFx } from '../utils/sound';
import type { PageId } from '../types/theme';

interface FooterProps {
  currentPage: PageId;
  onNavigatePage: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentPage, onNavigatePage }) => {
  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pages: { id: PageId; name: string }[] = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About & Journey' },
    { id: 'projects', name: 'GitPulse & Projects' },
    { id: 'skills', name: 'DSA & Skills Hub' },
    { id: 'terminal', name: 'Terminal' },
    { id: 'contact', name: 'Contact' },
  ];

  return (
    <footer className="mt-20 border-t border-[var(--theme-border)] bg-[#ffffff] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Info */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-heading font-bold text-base text-[#1c1917]">
              THARUN RAJ T P
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--theme-light)] text-[var(--theme-dark)] border border-[var(--theme-border)] font-bold">
              Mainframe Portfolio
            </span>
          </div>
          <p className="text-xs text-[#78716c]">
            B.Tech CSE (AI &amp; Data Engineering) • Lovely Professional University
          </p>
        </div>

        {/* Page Switcher Links */}
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                soundFx.playClick();
                onNavigatePage(p.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                currentPage === p.id
                  ? 'bg-[var(--theme-light)] text-[var(--theme-dark)] font-bold'
                  : 'text-[#57534e] hover:text-[#1c1917]'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-[#faf8f5] hover:bg-[var(--theme-light)] border border-[var(--theme-border)] text-[#57534e] hover:text-[var(--theme-dark)] transition-colors shadow-xs cursor-pointer"
            title="Scroll to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};
