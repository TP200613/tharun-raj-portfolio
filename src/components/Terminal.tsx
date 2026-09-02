import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundFx } from '../utils/sound';

interface HistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

const TECH_QUOTES = [
  '"First, solve the problem. Then, write the code." — John Johnson',
  '"Simplicity is prerequisite for reliability." — Edsger W. Dijkstra',
  '"Talk is cheap. Show me the code." — Linus Torvalds',
  '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler',
];

export const Terminal: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 'init-1',
      command: 'welcome',
      output: (
        <div className="space-y-1 text-[#f5efe6]">
          <p className="text-[#d4af37] font-bold">
            🚀 THARUN RAJ T P // MAINFRAME CONSOLE v3.0 [READY]
          </p>
          <p className="text-[#a8a29e] text-xs">
            Logged in as <span className="text-[#f5efe6]">guest@tharun-raj</span>. Type <span className="text-[#d4af37] font-bold">'help'</span> for available system commands.
          </p>
        </div>
      ),
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    soundFx.playKeypress();
    setCommandHistory((prev) => [...prev, rawCmd.trim()]);
    setHistoryIndex(-1);

    const timestamp = new Date().toLocaleTimeString();
    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-2 py-1">
            <p className="text-[#d4af37] font-semibold">Available Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
              {PORTFOLIO_DATA.terminalCommands.map((c) => (
                <div key={c.cmd} className="flex items-center gap-2">
                  <span className="text-[#d4af37] font-mono font-bold w-28">{c.cmd}</span>
                  <span className="text-[#d6d3d1]">{c.desc}</span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="space-y-1.5 text-xs text-[#f5efe6] py-1">
            <p><span className="text-[#d4af37] font-bold">NAME:</span> {PORTFOLIO_DATA.personal.name}</p>
            <p><span className="text-[#b8860b] font-bold">ROLE:</span> {PORTFOLIO_DATA.personal.role}</p>
            <p><span className="text-[#38bdf8] font-bold">ACADEMIC STANDING:</span> Lovely Professional University (CGPA: 7.88)</p>
            <p><span className="text-[#34d399] font-bold">BIO:</span> {PORTFOLIO_DATA.personal.bio}</p>
          </div>
        );
        break;

      case 'education':
      case 'lpu':
        output = (
          <div className="space-y-2 text-xs text-[#f5efe6] py-1">
            <div className="p-2 rounded bg-[#292524] border border-[#b8860b]/40">
              <p className="text-[#d4af37] font-bold">🎓 1. Lovely Professional University (LPU)</p>
              <p><span className="text-[#38bdf8]">Degree:</span> Bachelor of Technology - CSE (AI and Data Engineering)</p>
              <p><span className="text-[#34d399]">CGPA:</span> 7.88 | <span className="text-[#a8a29e]">Aug 2025 - Present (Phagwara, Punjab)</span></p>
            </div>
            <div className="p-2 rounded bg-[#292524] border border-[#44403c]">
              <p className="text-[#d4af37] font-bold">🏫 2. Sri Valli Vilas Alaya</p>
              <p><span className="text-[#38bdf8]">Exam:</span> Senior School Certificate (Class XII) - CBSE</p>
              <p><span className="text-[#34d399]">Percentage:</span> 79.6% | <span className="text-[#a8a29e]">May 2024 (Cuddalore, Tamil Nadu)</span></p>
            </div>
            <div className="p-2 rounded bg-[#292524] border border-[#44403c]">
              <p className="text-[#d4af37] font-bold">🏫 3. Edify School Vazhappattu Neelikkupam</p>
              <p><span className="text-[#38bdf8]">Exam:</span> Secondary School Examination (Class X) - CBSE</p>
              <p><span className="text-[#a8a29e]">Year: 2022 (Cuddalore, Tamil Nadu)</span></p>
            </div>
          </div>
        );
        break;

      case 'certificates':
      case 'cert':
        output = (
          <div className="space-y-1.5 text-xs text-[#f5efe6] py-1">
            <p className="text-[#d4af37] font-semibold">Verified Microsoft Certificates (Microsoft AI Skills Fest):</p>
            {PORTFOLIO_DATA.certificates.map((c, i) => (
              <div key={i} className="p-2 rounded bg-[#292524] border border-[#44403c] flex items-center justify-between">
                <span className="text-[#34d399] font-medium">• {c.title}</span>
                <span className="text-[#d4af37] font-mono text-[11px]">{c.date}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'gitpulse':
        output = (
          <div className="space-y-1.5 text-xs text-[#f5efe6] py-1 p-2.5 rounded bg-[#292524] border border-[#b8860b]/40">
            <p className="text-[#d4af37] font-bold text-sm">⭐ GitPulse | GitHub — Flagship Analytics Platform (Solo 5-Week Build)</p>
            <p className="text-[#e7e5e4]">Built a full-stack GitHub profile analytics platform solo in 5 weeks, fetching live data through GitHub API with pagination support.</p>
            <p className="text-[#a8a29e]">Engineered SQLite analytics layer for commit streaks, consistency scores (0–100), language detection, and repo rankings based on stars/forks.</p>
            <p className="text-[#38bdf8]">Multi-user comparison with interactive React charts and 3D interface using Three.js &amp; React Three Fiber.</p>
            <p className="text-[#34d399] text-[11px]">Deployments: Vercel (Frontend) + Render (Flask Backend)</p>
            <div className="flex items-center gap-3 pt-1 text-[11px]">
              <a href="https://gitpulse-v1.vercel.app" target="_blank" rel="noopener noreferrer" className="text-[#38bdf8] underline hover:text-[#7dd3fc]">🔗 Live Demo: gitpulse-v1.vercel.app</a>
              <a href="https://github.com/TP200613/TP200613" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] underline hover:text-[#fef08a]">📁 GitHub Repo</a>
            </div>
          </div>
        );
        break;

      case 'microsoft-ai':
      case 'skills-fest':
        output = (
          <div className="space-y-1.5 text-xs text-[#f5efe6] py-1">
            <p className="text-[#34d399] font-bold">🌐 Microsoft AI Skills Fest (AI &amp; Data Engineering Track)</p>
            <p className="text-[#e7e5e4]">Completed June–July 2026 global virtual program.</p>
            <p className="text-[#a8a29e]">• Completed modules covering Git and GitHub fundamentals &amp; repository management.</p>
            <p className="text-[#a8a29e]">• Learned secure repository practices, code scanning, and GitHub best practices.</p>
            <p className="text-[#a8a29e]">• Built CI workflows with GitHub Actions and explored Microsoft 365 Copilot agents.</p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-2 text-xs py-1">
            <p className="text-[#d4af37] font-semibold">Core Skills &amp; Competencies:</p>
            {PORTFOLIO_DATA.skillCategories.map((cat) => (
              <div key={cat.category} className="space-y-0.5">
                <span className="text-[#fbbf24] font-semibold">{cat.category}:</span>{' '}
                <span className="text-[#e7e5e4]">
                  {cat.skills.map((s) => s.name).join(', ')}
                </span>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs py-1">
            <p className="text-[#d4af37] font-semibold">Featured Projects:</p>
            <div className="space-y-1.5">
              {PORTFOLIO_DATA.projects.map((p, i) => (
                <div key={p.id} className="p-2 rounded bg-[#292524] border border-[#44403c]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#fbbf24] font-bold">{i + 1}. {p.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#b8860b]/20 text-[#d4af37]">{p.category}</span>
                  </div>
                  <p className="text-[#a8a29e] mt-0.5">{p.tagline}</p>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'stats':
      case 'leetcode':
        output = (
          <div className="space-y-2 text-xs py-1">
            <div className="p-3 rounded bg-[#292524] border border-[#b8860b]/40 text-center space-y-1">
              <div className="text-[#d4af37] font-bold text-xl">30+ Days Consecutive LeetCode Streak</div>
              <div className="text-[#e7e5e4] text-xs">Solved daily problems throughout July 2026 (@_Tharun_13)</div>
              <div className="text-[#a8a29e] text-[11px]">Focus on Data Structures, Algorithms, Arrays, Two Pointers, and Binary Search</div>
              <div className="pt-2">
                <a
                  href={PORTFOLIO_DATA.personal.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-3 py-1 rounded bg-[#b8860b] text-white text-xs font-bold hover:bg-[#d4af37] transition-colors"
                >
                  Open LeetCode Profile (@_Tharun_13) ↗
                </a>
              </div>
            </div>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1.5 text-xs py-1 text-[#e7e5e4]">
            <p className="text-[#d4af37] font-semibold">Direct Contact Channels:</p>
            <p>📧 Email: <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="text-[#38bdf8] hover:underline">{PORTFOLIO_DATA.personal.email}</a></p>
            <p>📱 Mobile: <a href={`tel:${PORTFOLIO_DATA.personal.phone}`} className="text-[#34d399] hover:underline">{PORTFOLIO_DATA.personal.phone}</a></p>
            <p>🐙 GitHub: <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noopener noreferrer" className="text-[#38bdf8] hover:underline">{PORTFOLIO_DATA.personal.github}</a></p>
            <p>💼 LinkedIn: <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#38bdf8] hover:underline">{PORTFOLIO_DATA.personal.linkedin}</a></p>
          </div>
        );
        break;

      case 'github':
        output = (
          <div className="space-y-1.5 text-xs py-1 text-[#e7e5e4]">
            <p className="text-[#38bdf8] font-bold">🐙 GitHub Profile: @TP200613</p>
            <p>Direct Link: <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noopener noreferrer" className="text-[#d4af37] underline">{PORTFOLIO_DATA.personal.github}</a></p>
            <p className="text-[#a8a29e]">Repositories: GitPulse, LeetCode vault, Data engineering pipelines.</p>
          </div>
        );
        break;

      case 'resume':
      case 'cv':
        output = (
          <div className="space-y-1.5 text-xs py-1 text-[#e7e5e4]">
            <p className="text-[#34d399] font-bold">📄 Official Curriculum Vitae / Resume</p>
            <p>Name: <span className="text-[#f5efe6]">{PORTFOLIO_DATA.personal.name}</span></p>
            <p>Degree: <span className="text-[#f5efe6]">{PORTFOLIO_DATA.personal.role} @ LPU (CGPA: 7.88)</span></p>
            <p>Email: <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="text-[#38bdf8] hover:underline">{PORTFOLIO_DATA.personal.email}</a></p>
            <p className="text-[#a8a29e]">Tip: Use the 'Resume' button in the top navigation bar to view, save as PDF, or print the full formatted resume.</p>
          </div>
        );
        break;

      case 'sudo hire-me':
      case 'hire-me':
      case 'hire':
        soundFx.playSuccess();
        triggerConfetti();
        output = (
          <div className="space-y-2 p-3 rounded-lg bg-[#292524] border border-[#d4af37]/60 text-xs py-2">
            <p className="text-[#34d399] font-bold text-sm">
              🎉 RECRUITMENT PROTOCOL: ACCESS GRANTED!
            </p>
            <p className="text-[#e7e5e4]">
              Thank you for considering THARUN RAJ T P! (B.Tech CSE AI &amp; Data @ LPU, CGPA: 7.88, solo builder of GitPulse, {PORTFOLIO_DATA.certificates.length}x Microsoft certified).
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}?subject=Opportunity%20for%20Tharun%20Raj%20T%20P`}
                className="px-3 py-1.5 rounded bg-[#b8860b] text-white font-bold hover:bg-[#936a28] transition-colors"
              >
                Email Tharun Directly
              </a>
              <a
                href={`tel:${PORTFOLIO_DATA.personal.phone}`}
                className="px-3 py-1.5 rounded bg-[#292524] border border-[#d4af37] text-[#d4af37] font-bold hover:bg-[#44403c] transition-colors"
              >
                Call: {PORTFOLIO_DATA.personal.phone}
              </a>
            </div>
          </div>
        );
        break;

      case 'quote': {
        const quoteIndex = commandHistory.length % TECH_QUOTES.length;
        const randomQuote = TECH_QUOTES[quoteIndex];
        output = <p className="italic text-[#fbbf24] text-xs py-1">{randomQuote}</p>;
        break;
      }

      case 'matrix':
        setIsMatrixActive(true);
        setTimeout(() => setIsMatrixActive(false), 5000);
        output = (
          <p className="text-[#34d399] font-mono text-xs py-1 animate-pulse">
            [MATRIX RAIN INITIATED FOR 5 SECONDS...] 01010100 01001000 01000001 01010010 01010101 01001110
          </p>
        );
        break;

      case 'whoami':
        output = <p className="text-[#38bdf8] text-xs py-1">guest_user @ localhost [Elevated Developer Guest Session]</p>;
        break;

      case 'date':
        output = <p className="text-[#e7e5e4] text-xs py-1">{new Date().toString()}</p>;
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        output = (
          <p className="text-[#f87171] text-xs py-1">
            command not found: <span className="font-bold">{cmd}</span>. Type <span className="text-[#fbbf24] font-semibold">'help'</span> for available commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: rawCmd,
        output,
        timestamp,
      },
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = PORTFOLIO_DATA.terminalCommands.find((c) =>
        c.cmd.startsWith(inputVal.toLowerCase())
      );
      if (match) {
        setInputVal(match.cmd);
      }
    }
  };

  const copyCommand = (cmd: string) => {
    soundFx.playClick();
    setInputVal(cmd);
    inputRef.current?.focus();
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 page-fade-in">
      {/* Header Info */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5efe6] border border-[#e2d5bc] text-xs font-bold text-[#8c6721]">
          <TerminalIcon size={14} />
          <span>INTERACTIVE MAINFRAME SHELL</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#1c1917]">
          Developer <span className="text-gradient-sandal">Mainframe Terminal</span>
        </h2>
        <p className="text-sm text-[#57534e] max-w-xl mx-auto">
          Explore Tharun Raj's profile, GitPulse architecture, skills, education, and credentials via an interactive unix console.
        </p>
      </div>

      {/* Terminal Window */}
      <div className="relative rounded-2xl bg-[#1c1917] border border-[#e8decb] shadow-2xl overflow-hidden font-mono text-white">
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#292524] border-b border-[#44403c]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ef4444] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#f59e0b] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#10b981] inline-block" />
            <span className="text-xs text-[#d6d3d1] ml-2 font-medium">
              tharun-raj@mainframe:~ (bash)
            </span>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              setHistory([]);
            }}
            title="Clear terminal"
            className="text-xs text-[#a8a29e] hover:text-white p-1 rounded hover:bg-[#44403c] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Trash2 size={13} />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>

        {/* Quick Command Suggestions */}
        <div className="px-4 py-2 bg-[#292524]/60 border-b border-[#44403c] flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-[#a8a29e] shrink-0">Quick run:</span>
          {['help', 'about', 'gitpulse', 'education', 'certificates', 'skills', 'stats', 'contact', 'sudo hire-me'].map((c) => (
            <button
              key={c}
              onClick={() => {
                copyCommand(c);
                handleCommand(c);
              }}
              className="px-2 py-0.5 rounded bg-[#44403c] hover:bg-[#b8860b] text-[#f5efe6] shrink-0 transition-colors cursor-pointer"
            >
              {c}
            </button>
          ))}
        </div>

        {/* Terminal Screen Body */}
        <div
          className={`p-4 sm:p-6 min-h-[340px] max-h-[480px] overflow-y-auto space-y-4 text-sm ${
            isMatrixActive ? 'bg-[#052e16]/30' : ''
          }`}
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#a8a29e]">
                <span className="text-[#34d399] font-bold">➜</span>
                <span className="text-[#d4af37] font-semibold">~</span>
                <span className="text-white font-bold">{item.command}</span>
                <span className="text-[10px] text-[#78716c] ml-auto">{item.timestamp}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}

          {/* Current Input Prompt */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[#34d399] font-bold text-xs">➜</span>
            <span className="text-[#d4af37] font-semibold text-xs">~</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type command ('help', 'gitpulse', 'education', 'certificates', 'sudo hire-me')..."
              className="flex-1 bg-transparent border-none outline-none text-white text-xs sm:text-sm placeholder:text-[#78716c] focus:ring-0 font-mono"
            />
            <button
              onClick={() => handleCommand(inputVal)}
              className="p-1 rounded bg-[#44403c] hover:bg-[#b8860b] text-white text-xs transition-colors cursor-pointer"
            >
              <CornerDownLeft size={14} />
            </button>
          </div>

          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};
