import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Terminal,
  Code2,
  Cpu,
  Sparkles,
  Mail,
  FileText,
  Volume2,
  Copy,
  Home,
  Activity,
  Palette,
  MousePointer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GithubIcon } from './Icons';
import { soundFx } from '../utils/sound';
import { ACCENT_THEMES, type PageId } from '../types/theme';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigatePage: (page: PageId) => void;
  onOpenResume: () => void;
  onChangeAccent: (themeId: string) => void;
  onToggleSound: () => void;
  customCursorEnabled?: boolean;
  onToggleCursor?: () => void;
  onReplayIntro?: () => void;
}

interface PaletteAction {
  id: string;
  title: string;
  category: 'Pages' | 'Actions' | 'External' | 'Themes';
  icon: React.ComponentType<{ size?: number; className?: string }>;
  handler: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigatePage,
  onOpenResume,
  onChangeAccent,
  onToggleSound,
  customCursorEnabled,
  onToggleCursor,
  onReplayIntro
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        setQuery('');
        setSelectedIndex(0);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const goToPage = (page: PageId) => {
    soundFx.playClick();
    onNavigatePage(page);
    onClose();
  };

  const copyEmail = () => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    onClose();
  };

  const triggerConfetti = () => {
    soundFx.playSuccess();
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    onClose();
  };

  const themeActions: PaletteAction[] = ACCENT_THEMES.map((theme) => ({
    id: `thm-${theme.id}`,
    title: `Theme: ${theme.name} (${theme.tag})`,
    category: 'Themes',
    icon: Palette,
    handler: () => {
      soundFx.playSuccess();
      onChangeAccent(theme.id);
      onClose();
    }
  }));

  const actions: PaletteAction[] = [
    {
      id: 'page-home',
      title: 'Page: Home & Overview',
      category: 'Pages',
      icon: Home,
      handler: () => goToPage('home'),
    },
    {
      id: 'page-about',
      title: 'Page: About & Education (LPU)',
      category: 'Pages',
      icon: Cpu,
      handler: () => goToPage('about'),
    },
    {
      id: 'page-projects',
      title: 'Page: GitPulse & Projects Showcase',
      category: 'Pages',
      icon: Activity,
      handler: () => goToPage('projects'),
    },
    {
      id: 'page-skills',
      title: 'Page: DSA & Skills Hub (30+ Day Streak)',
      category: 'Pages',
      icon: Code2,
      handler: () => goToPage('skills'),
    },
    {
      id: 'page-terminal',
      title: 'Page: Interactive Mainframe Terminal',
      category: 'Pages',
      icon: Terminal,
      handler: () => goToPage('terminal'),
    },
    {
      id: 'page-contact',
      title: 'Page: Contact & Transmission',
      category: 'Pages',
      icon: Mail,
      handler: () => goToPage('contact'),
    },
    {
      id: 'act-resume',
      title: 'Action: View & Print Resume (CV)',
      category: 'Actions',
      icon: FileText,
      handler: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      id: 'act-copy-email',
      title: 'Action: Copy Tharun\'s Email Address',
      category: 'Actions',
      icon: Copy,
      handler: copyEmail,
    },
    {
      id: 'act-confetti',
      title: 'Action: Celebrate (Trigger Confetti)',
      category: 'Actions',
      icon: Sparkles,
      handler: triggerConfetti,
    },
    {
      id: 'act-sound',
      title: 'Action: Toggle Tactile Sound Effects',
      category: 'Actions',
      icon: Volume2,
      handler: () => {
        onToggleSound();
        onClose();
      },
    },
    ...(onToggleCursor
      ? [
          {
            id: 'act-cursor',
            title: `Action: ${customCursorEnabled ? 'Disable' : 'Enable'} Executive Custom Cursor`,
            category: 'Actions' as const,
            icon: MousePointer,
            handler: () => {
              onToggleCursor();
              soundFx.playSuccess();
              onClose();
            },
          },
        ]
      : []),
    ...(onReplayIntro
      ? [
          {
            id: 'act-replay-intro',
            title: 'Action: Replay Mainframe OS Boot Intro Sequence',
            category: 'Actions' as const,
            icon: Terminal,
            handler: () => {
              onClose();
              onReplayIntro();
            },
          },
        ]
      : []),
    ...themeActions,
    {
      id: 'ext-github',
      title: 'External: GitHub Profile (@TP200613)',
      category: 'External',
      icon: GithubIcon,
      handler: () => {
        window.open(PORTFOLIO_DATA.personal.github, '_blank');
        onClose();
      },
    },
    {
      id: 'ext-leetcode',
      title: 'External: LeetCode Profile (@_Tharun_13)',
      category: 'External',
      icon: Code2,
      handler: () => {
        window.open(PORTFOLIO_DATA.personal.leetcode, '_blank');
        onClose();
      },
    },
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }
    if (filtered.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
      soundFx.playKeypress();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      soundFx.playKeypress();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].handler();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => {
          soundFx.playClick();
          onClose();
        }}
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-xl rounded-2xl bg-[#ffffff] border border-[var(--theme-border)] shadow-2xl z-10 overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--theme-border)] bg-[#faf8f5]">
          <Search size={18} className="text-[var(--theme-dark)]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search pages, projects, themes ('Emerald', 'Theme', 'Resume', 'About')..."
            className="flex-1 bg-transparent border-none outline-none text-[#1c1917] placeholder:text-[#a8a29e] text-sm font-sans"
          />
          <kbd className="px-2 py-0.5 rounded bg-[#ffffff] border border-[var(--theme-border)] text-[10px] font-mono text-[#78716c]">
            ESC
          </kbd>
        </div>

        {/* Action List */}
        <div className="max-h-[340px] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-[#78716c]">
              No commands matching <span className="font-semibold text-[#1c1917]">"{query}"</span>
            </div>
          ) : (
            filtered.map((action, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => {
                    soundFx.playClick();
                    action.handler();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--theme-light)] text-[var(--theme-dark)] shadow-xs'
                      : 'text-[#57534e] hover:bg-[#faf8f5]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#ffffff] text-[var(--theme-primary)]' : 'bg-[#faf8f5] text-[var(--theme-dark)]'}`}>
                      <Icon size={16} />
                    </div>
                    <span>{action.title}</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#ffffff] border border-[var(--theme-border)] text-[#78716c]">
                    {action.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-[#faf8f5] border-t border-[var(--theme-border)] flex items-center justify-between text-[11px] text-[#78716c]">
          <span>Use ↑↓ to navigate • ↵ to select</span>
          <span className="font-mono text-[10px] text-[var(--theme-dark)] font-bold">THARUN MAINFRAME</span>
        </div>
      </div>
    </div>
  );
};

