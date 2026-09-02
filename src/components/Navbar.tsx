import React, { useState, useEffect, useRef } from 'react';
import {
  Home,
  User,
  Activity,
  Code2,
  Terminal,
  Mail,
  Volume2,
  VolumeX,
  Search,
  FileText,
  Menu,
  X,
  Palette,
  Check,
  MousePointer
} from 'lucide-react';
import { soundFx } from '../utils/sound';
import { getAssetUrl } from '../utils/assetPath';
import { ACCENT_THEMES, type PageId, type AccentTheme } from '../types/theme';

export type { PageId, AccentTheme };

interface NavbarProps {
  currentPage: PageId;
  onSelectPage: (page: PageId) => void;
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  currentAccent: string;
  onChangeAccent: (accent: string) => void;
  customCursorEnabled?: boolean;
  onToggleCursor?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onSelectPage,
  onOpenCommandPalette,
  onOpenResume,
  soundEnabled,
  onToggleSound,
  currentAccent,
  onChangeAccent,
  customCursorEnabled,
  onToggleCursor
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const paletteRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close palette dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (paletteRef.current && !paletteRef.current.contains(event.target as Node)) {
        setPaletteOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navPages: { id: PageId; name: string; icon: React.ElementType }[] = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'about', name: 'About & Journey', icon: User },
    { id: 'projects', name: 'Projects & GitPulse', icon: Activity },
    { id: 'skills', name: 'DSA & Skills', icon: Code2 },
    { id: 'terminal', name: 'Terminal', icon: Terminal },
    { id: 'contact', name: 'Contact', icon: Mail },
  ];

  const currentThemeObj = ACCENT_THEMES.find((t) => t.id === currentAccent) || ACCENT_THEMES[0];

  const handlePageClick = (pageId: PageId) => {
    soundFx.playClick();
    setMobileMenuOpen(false);
    onSelectPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4 px-3 sm:px-6 pointer-events-none">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        {/* Unified Floating Glass Island Dock */}
        <div
          className={`flex items-center justify-between gap-3 px-3.5 sm:px-5 py-2.5 rounded-3xl transition-all duration-300 border backdrop-blur-2xl shadow-lg hover:shadow-xl ${
            scrolled
              ? 'bg-[#ffffff]/95 border-[var(--theme-border)] shadow-xl'
              : 'bg-[#ffffff]/90 border-[var(--theme-border)]'
          }`}
        >
          {/* 1. Left Brand: 3D Interactive Flip Avatar / Monogram */}
          <button
            onClick={() => handlePageClick('home')}
            className="flex items-center gap-2.5 group cursor-pointer text-left shrink-0"
            title="Tharun Raj T P // Mainframe OS (Click to return Home)"
          >
            {/* 3D Flip Card Container */}
            <div className="relative w-9 h-9 [perspective:600px]">
              <div className="relative w-full h-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-xs">
                {/* Front Side: Photo Avatar */}
                <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-[var(--theme-border)] group-hover:border-[var(--theme-primary)] bg-[var(--theme-light)] [backface-visibility:hidden]">
                  <img
                    src={getAssetUrl('tharun1.png')}
                    alt="Tharun Raj"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Back Side: Sleek <TR/> Monogram */}
                <div className="absolute inset-0 w-full h-full rounded-2xl border border-[var(--theme-primary)] bg-[var(--theme-light)] flex items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <span className="font-heading font-extrabold text-[11px] tracking-wider text-[var(--theme-dark)] font-mono">
                    &lt;TR/&gt;
                  </span>
                </div>
              </div>

              {/* Live Online Pulse Dot */}
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5 pointer-events-none z-10">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: currentThemeObj.color }}
                />
                <span
                  className="relative inline-flex rounded-full h-2.5 w-2.5 shadow-xs"
                  style={{ backgroundColor: currentThemeObj.color }}
                />
              </span>
            </div>

            <div className="hidden sm:flex flex-col">
              <span className="font-heading font-extrabold text-sm text-[#1c1917] tracking-tight group-hover:text-[var(--theme-dark)] transition-colors leading-tight">
                THARUN RAJ
              </span>
              <span className="text-[10px] text-[#78716c] font-medium font-mono leading-tight">
                LPU // AI &amp; Full-Stack
              </span>
            </div>
          </button>

          {/* 2. Center Navigation Links (Clean Single-Line Strip - Always Visible on md and up) */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-[#faf8f5] p-1 rounded-2xl border border-[var(--theme-border)] shrink-0">
            {navPages.map((page) => {
              const isActive = currentPage === page.id;
              const Icon = page.icon;
              return (
                <button
                  key={page.id}
                  onClick={() => handlePageClick(page.id)}
                  className={`px-2.5 lg:px-3 py-1.5 rounded-xl text-[11px] lg:text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'btn-theme-primary shadow-xs font-bold'
                      : 'text-[#57534e] hover:text-[#1c1917] hover:bg-[#ffffff]'
                  }`}
                >
                  <Icon size={13} className={isActive ? 'text-white' : 'text-[var(--theme-dark)]'} />
                  <span>{page.name}</span>
                </button>
              );
            })}
          </nav>

          {/* 3. Right Unified Controls & Action Suite */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick Search Button */}
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenCommandPalette();
              }}
              title="Quick Command & Search (Ctrl+K)"
              className="hidden lg:flex items-center gap-2 px-2.5 lg:px-3 py-1.5 rounded-2xl bg-[#faf8f5] hover:bg-[#ffffff] border border-[var(--theme-border)] hover:border-[var(--theme-primary)] text-xs font-semibold text-[#57534e] hover:text-[#1c1917] transition-all shadow-xs cursor-pointer"
            >
              <Search size={13} className="text-[var(--theme-primary)]" />
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-[var(--theme-border)] text-[#78716c]">
                Ctrl K
              </span>
            </button>

            {/* Utility Group: Sound + Cursor */}
            <div className="hidden xl:flex items-center gap-1 bg-[#faf8f5] p-1 rounded-2xl border border-[var(--theme-border)]">
              <button
                onClick={() => {
                  onToggleSound();
                  if (!soundEnabled) soundFx.playSuccess();
                }}
                title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
                className="p-1.5 rounded-xl text-[#57534e] hover:text-[#1c1917] hover:bg-[#ffffff] transition-all cursor-pointer"
              >
                {soundEnabled ? (
                  <Volume2 size={14} className="text-[var(--theme-primary)]" />
                ) : (
                  <VolumeX size={14} className="text-[#a8a29e]" />
                )}
              </button>

              {onToggleCursor && (
                <button
                  onClick={() => {
                    soundFx.playClick();
                    onToggleCursor();
                  }}
                  title={customCursorEnabled ? 'Custom Cursor Active' : 'Enable Custom Cursor'}
                  className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                    customCursorEnabled
                      ? 'bg-[var(--theme-light)] text-[var(--theme-dark)]'
                      : 'text-[#a8a29e] hover:text-[#1c1917] hover:bg-[#ffffff]'
                  }`}
                >
                  <MousePointer size={14} className={customCursorEnabled ? 'text-[var(--theme-primary)]' : 'text-[#a8a29e]'} />
                </button>
              )}
            </div>

            {/* Color Palette Selector Dropdown */}
            <div className="relative" ref={paletteRef}>
              <button
                onClick={() => {
                  soundFx.playClick();
                  setPaletteOpen(!paletteOpen);
                }}
                title="Switch Theme Palette"
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-2xl bg-[#faf8f5] hover:bg-[#ffffff] border border-[var(--theme-border)] hover:border-[var(--theme-primary)] text-xs font-semibold text-[#1c1917] transition-all shadow-xs cursor-pointer"
              >
                <span
                  className="w-3 h-3 rounded-full shrink-0 shadow-xs ring-1 ring-black/10"
                  style={{ backgroundColor: currentThemeObj.color }}
                />
                <Palette size={13} className="text-[var(--theme-dark)]" />
                <span className="hidden xl:inline text-[11px] font-medium text-[#57534e]">
                  {currentThemeObj.name.split(' ')[0]}
                </span>
              </button>

              {paletteOpen && (
                <div className="absolute right-0 mt-2 w-72 p-2.5 bg-[#ffffff] border border-[var(--theme-border)] rounded-3xl shadow-2xl z-50 backdrop-blur-2xl animate-in zoom-in-95">
                  <div className="px-2.5 py-1.5 flex items-center justify-between border-b border-[var(--theme-border)] mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716c]">
                      Theme Palette Select
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--theme-light)] text-[var(--theme-dark)] font-bold">
                      {ACCENT_THEMES.length} Themes
                    </span>
                  </div>

                  <div className="space-y-1 max-h-[300px] overflow-y-auto pr-1">
                    {ACCENT_THEMES.map((theme) => {
                      const isSelected = currentAccent === theme.id;
                      return (
                        <button
                          key={theme.id}
                          onClick={() => {
                            soundFx.playSuccess();
                            onChangeAccent(theme.id);
                            setPaletteOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[var(--theme-light)] text-[#1c1917] font-bold shadow-xs border border-[var(--theme-border)]'
                              : 'text-[#57534e] hover:bg-[#faf8f5] hover:text-[#1c1917]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs ring-1 ring-black/10"
                              style={{ backgroundColor: theme.color }}
                            />
                            <div>
                              <div className="font-semibold">{theme.name}</div>
                              <div className="text-[10px] text-[#78716c]">{theme.tag}</div>
                            </div>
                          </div>

                          {isSelected && (
                            <Check size={14} className="text-[var(--theme-primary)] shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Primary Action Button: Resume */}
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenResume();
              }}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-2xl btn-theme-primary text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
            >
              <FileText size={13} />
              <span>Resume</span>
            </button>

            {/* Mobile / Small Screen Menu Button */}
            <button
              onClick={() => {
                soundFx.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-1.5 rounded-2xl bg-[#faf8f5] border border-[var(--theme-border)] text-[#1c1917] cursor-pointer"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Page Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="max-w-7xl mx-auto mt-2 pointer-events-auto md:hidden px-3 sm:px-6">
          <div className="bg-[#ffffff]/95 backdrop-blur-2xl border border-[var(--theme-border)] rounded-3xl p-5 shadow-2xl animate-in slide-in-from-top duration-200 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {navPages.map((page) => {
                const isActive = currentPage === page.id;
                const Icon = page.icon;
                return (
                  <button
                    key={page.id}
                    onClick={() => handlePageClick(page.id)}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-left transition-all cursor-pointer ${
                      isActive
                        ? 'btn-theme-primary shadow-xs font-bold'
                        : 'bg-[#faf8f5] text-[#57534e] hover:text-[#1c1917] border border-[var(--theme-border)]'
                    }`}
                  >
                    <Icon size={14} className={isActive ? 'text-white' : 'text-[var(--theme-dark)]'} />
                    <span>{page.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Search on Mobile Drawer */}
            <div className="pt-2 border-t border-[var(--theme-border)] flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setMobileMenuOpen(false);
                  onOpenCommandPalette();
                }}
                className="w-full py-2 px-3 rounded-2xl bg-[#faf8f5] border border-[var(--theme-border)] text-xs font-semibold text-[#57534e] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search size={14} className="text-[var(--theme-primary)]" />
                <span>Search Everything (Ctrl+K)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;


