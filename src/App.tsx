import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ACCENT_THEMES, type PageId } from './types/theme';
import { ParticleBackground } from './components/ParticleBackground';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Terminal } from './components/Terminal';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { ResumeModal } from './components/ResumeModal';
import { AIAssistant } from './components/AIAssistant';
import { CustomCursor } from './components/CustomCursor';
import { IntroSequence } from './components/IntroSequence';
import { soundFx } from './utils/sound';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_ORDER: { id: PageId; name: string }[] = [
  { id: 'home', name: 'Home' },
  { id: 'about', name: 'About & Journey' },
  { id: 'projects', name: 'GitPulse & Projects' },
  { id: 'skills', name: 'DSA & Skills Hub' },
  { id: 'terminal', name: 'Mainframe Terminal' },
  { id: 'contact', name: 'Contact & Resume' },
];

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    return sessionStorage.getItem('tharun_intro_seen') !== 'true';
  });
  const [customCursor, setCustomCursor] = useState<boolean>(() => {
    return localStorage.getItem('tharun_portfolio_custom_cursor') !== 'false';
  });
  const [currentAccent, setCurrentAccent] = useState<string>(() => {
    return localStorage.getItem('tharun_portfolio_theme') || 'burgundy';
  });

  // Keep custom cursor preference stored
  useEffect(() => {
    localStorage.setItem('tharun_portfolio_custom_cursor', String(customCursor));
  }, [customCursor]);

  // Keep data-theme attribute on document root synchronized and stored
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentAccent);
    localStorage.setItem('tharun_portfolio_theme', currentAccent);
  }, [currentAccent]);

  // Handle URL hash on load & hashchange
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validPage = PAGE_ORDER.find((p) => p.id === hash);
      if (validPage) {
        setCurrentPage(validPage.id);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Sync state to URL hash
  const navigateToPage = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        soundFx.playClick();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFx.setMuted(!next);
  };

  const selectedThemeObj = ACCENT_THEMES.find((t) => t.id === currentAccent) || ACCENT_THEMES[0];
  const themeAccentColor = selectedThemeObj ? selectedThemeObj.color : '#4A0E17';

  // Current page index for bottom pagination
  const currentIndex = PAGE_ORDER.findIndex((p) => p.id === currentPage);
  const prevPage = currentIndex > 0 ? PAGE_ORDER[currentIndex - 1] : null;
  const nextPage = currentIndex < PAGE_ORDER.length - 1 ? PAGE_ORDER[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1c1917] relative font-sans selection:bg-[var(--theme-primary)] selection:text-white flex flex-col justify-between">
      {/* Precision Executive Custom Cursor with Theme Reactive Aura */}
      <CustomCursor enabled={customCursor} />

      {/* Dynamic Canvas Particles synchronized with Selected Palette */}
      <ParticleBackground accentColor={themeAccentColor} />

      {/* Floating Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onSelectPage={navigateToPage}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        currentAccent={currentAccent}
        onChangeAccent={setCurrentAccent}
        customCursorEnabled={customCursor}
        onToggleCursor={() => setCustomCursor((prev) => !prev)}
      />

      {/* Main Page Display Area */}
      <main className="relative z-10 flex-1 pt-14">
        {currentPage === 'home' && (
          <Hero
            onOpenResume={() => setIsResumeOpen(true)}
            onNavigatePage={(page) => navigateToPage(page as PageId)}
          />
        )}

        {currentPage === 'about' && <About />}

        {currentPage === 'projects' && <Projects />}

        {currentPage === 'skills' && <Skills />}

        {currentPage === 'terminal' && <Terminal />}

        {currentPage === 'contact' && (
          <Contact onOpenResume={() => setIsResumeOpen(true)} />
        )}

        {/* Page-by-Page Pagination Navigator */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
          <div className="p-4 sm:p-6 rounded-2xl bg-[#ffffff] border border-[var(--theme-border)] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevPage ? (
              <button
                onClick={() => {
                  soundFx.playClick();
                  navigateToPage(prevPage.id);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#faf8f5] hover:bg-[var(--theme-light)] border border-[var(--theme-border)] hover:border-[var(--theme-primary)] text-xs font-bold text-[#1c1917] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ChevronLeft size={16} className="text-[var(--theme-dark)]" />
                <span>Previous: {prevPage.name}</span>
              </button>
            ) : (
              <div className="hidden sm:block" />
            )}

            <div className="flex items-center gap-1.5 text-xs font-mono text-[#78716c]">
              <span>Page {currentIndex + 1} of {PAGE_ORDER.length}</span>
              <span>•</span>
              <span className="font-bold text-[var(--theme-dark)]">{PAGE_ORDER[currentIndex].name}</span>
            </div>

            {nextPage ? (
              <button
                onClick={() => {
                  soundFx.playClick();
                  navigateToPage(nextPage.id);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl btn-theme-primary text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Next: {nextPage.name}</span>
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={() => {
                  soundFx.playClick();
                  navigateToPage('home');
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl btn-theme-primary text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Back to Home</span>
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer
        currentPage={currentPage}
        onNavigatePage={navigateToPage}
      />

      {/* Floating Interactive AI Copilot Agent */}
      <AIAssistant
        onOpenResume={() => setIsResumeOpen(true)}
        onNavigatePage={navigateToPage}
      />

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigatePage={navigateToPage}
        onOpenResume={() => setIsResumeOpen(true)}
        onChangeAccent={setCurrentAccent}
        onToggleSound={handleToggleSound}
        customCursorEnabled={customCursor}
        onToggleCursor={() => setCustomCursor((prev) => !prev)}
        onReplayIntro={() => setShowIntro(true)}
      />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Futuristic Mainframe Boot Intro Sequence Screen */}
      {showIntro && (
        <IntroSequence
          onComplete={() => {
            setShowIntro(false);
            sessionStorage.setItem('tharun_intro_seen', 'true');
          }}
          accentColor={themeAccentColor}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />
      )}
    </div>
  );
}

export default App;

