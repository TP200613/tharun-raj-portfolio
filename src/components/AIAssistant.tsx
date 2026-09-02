import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ArrowRight
} from 'lucide-react';
import { soundFx } from '../utils/sound';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { PageId } from '../types/theme';

let messageCounter = 0;
const generateMessageId = () => `msg-${Date.now()}-${++messageCounter}`;

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  action?: {
    label: string;
    page?: PageId;
    isResume?: boolean;
  };
  timestamp: string;
}

const QUICK_PROMPTS = [
  'Why should a team hire Tharun Raj?',
  'How was GitPulse built and what makes it unique?',
  'View official formatted resume',
  'Tell me about his 30+ days LeetCode streak',
  'What Microsoft certificates does he hold?',
  'Summarize his education & CGPA at LPU',
];

interface AIAssistantProps {
  onOpenResume?: () => void;
  onNavigatePage: (page: PageId) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ onNavigatePage, onOpenResume }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello! I am Tharun Raj's AI Copilot assistant. I can answer questions about his B.Tech in AI & Data Engineering at LPU (CGPA 7.88), his GitPulse platform, ${PORTFOLIO_DATA.certificates.length}x Microsoft certificates, LeetCode daily streak, and technical stack. What would you like to explore?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const generateAIResponse = (userPrompt: string): { text: string; action?: { label: string; page?: PageId; isResume?: boolean } } => {
    const q = userPrompt.toLowerCase();

    if (q.includes('resume') || q.includes('cv') || q.includes('curriculum')) {
      return {
        text: `You can view, download, or print Tharun's official verified resume directly. It includes his complete education at LPU (CGPA 7.88), GitPulse architecture details, ${PORTFOLIO_DATA.certificates.length}x Microsoft certificates, and technical stack.`,
        action: { label: 'Open Official Resume Modal', isResume: true },
      };
    }

    if (q.includes('hire') || q.includes('why') || q.includes('candidate') || q.includes('strength')) {
      return {
        text: `THARUN RAJ T P stands out because he bridges rigorous academic foundation with proven execution: he maintains a 7.88 CGPA in B.Tech CSE (AI & Data) at LPU, built the GitPulse analytics platform solo in 5 weeks (Flask, React, Three.js, SQLite), solved LeetCode problems every single day in July 2026 (30+ consecutive day streak), and holds ${PORTFOLIO_DATA.certificates.length} verified Microsoft certificates from the Microsoft AI Skills Fest.`,
        action: { label: 'Go to Contact Page', page: 'contact' },
      };
    }

    if (q.includes('gitpulse') || q.includes('project') || q.includes('flask') || q.includes('three')) {
      return {
        text: "GitPulse is Tharun's flagship full-stack GitHub profile analytics platform built solo in 5 weeks. It fetches live data via GitHub API with pagination, calculates commit streaks & consistency scores (0–100) in SQLite, supports multi-user comparison, and features interactive React charts + 3D interface using Three.js & React Three Fiber (deployed on Vercel + Render).",
        action: { label: 'Explore GitPulse & Projects', page: 'projects' },
      };
    }

    if (q.includes('certificate') || q.includes('microsoft') || q.includes('fest') || q.includes('action')) {
      return {
        text: `Tharun participated in the Microsoft AI Skills Fest (AI & Data Engineering Track, Jun–Jul 2026) and earned ${PORTFOLIO_DATA.certificates.length} verified certificates covering Git, GitHub, Code Security & Scanning, GitHub Actions CI/CD automation, and Microsoft 365 Copilot agents.`,
        action: { label: 'View Certificates & Journey', page: 'about' },
      };
    }

    if (q.includes('leetcode') || q.includes('dsa') || q.includes('streak') || q.includes('algo')) {
      return {
        text: "In July 2026, Tharun solved 30+ LeetCode problems consecutively, solving at least one problem every single day with a focus on data structures and algorithms (Array Manipulation, Two Pointers, Strings, Hash Tables, and Binary Search).",
        action: { label: 'View DSA & Skills Hub', page: 'skills' },
      };
    }

    if (q.includes('lpu') || q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('b.tech') || q.includes('cgpa') || q.includes('school')) {
      return {
        text: "Tharun's education:\n1. Lovely Professional University: B.Tech CSE (AI & Data Engineering), CGPA: 7.88 (Aug 2025 - Present, Phagwara, Punjab)\n2. Sri Valli Vilas Alaya: Class XII CBSE, 79.6% (May 2024, Cuddalore, TN)\n3. Edify School Vazhappattu Neelikkupam: Class X CBSE (2022, Cuddalore, TN)",
        action: { label: 'View Academic Timeline', page: 'about' },
      };
    }

    if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('language') || q.includes('python') || q.includes('sql') || q.includes('soft')) {
      return {
        text: "Tharun's skill set:\n• Languages: Python, SQL, JavaScript, TypeScript, HTML/CSS\n• Technologies: Pandas, React, Flask, Three.js, Tailwind CSS, Canva\n• Databases/Tools: MySQL, SQLite, Git, GitHub, Render, Vercel\n• Soft Skills: Analytical Thinking, Problem Solving, Team Collaboration, Research Mindset, Adaptability",
        action: { label: 'View Full Skills Matrix', page: 'skills' },
      };
    }

    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('mobile')) {
      return {
        text: `You can reach Tharun directly:\n📧 Email: ${PORTFOLIO_DATA.personal.email}\n📱 Mobile: ${PORTFOLIO_DATA.personal.phone}\n💼 LinkedIn: linkedin.com/in/tharun1306\n🐙 GitHub: github.com/TP200613/TP200613`,
        action: { label: 'Open Contact Form', page: 'contact' },
      };
    }

    return {
      text: `THARUN RAJ T P is an AI & Data Engineering student @ LPU (CGPA 7.88), creator of GitPulse (solo 5-week build), and holds ${PORTFOLIO_DATA.certificates.length} verified Microsoft certificates. Feel free to ask about his projects, test the algorithm sandbox, or connect directly!`,
      action: { label: 'Contact Tharun', page: 'contact' },
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    soundFx.playKeypress();
    const userMsg: Message = {
      id: generateMessageId(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAIResponse(query);
      const aiMsg: Message = {
        id: generateMessageId(),
        sender: 'ai',
        text: response.text,
        action: response.action,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      soundFx.playSuccess();
    }, 500);
  };

  const handleActionClick = (action: { label: string; page?: PageId; isResume?: boolean }) => {
    soundFx.playClick();
    if (action.isResume) {
      if (onOpenResume) {
        onOpenResume();
      }
    } else if (action.page) {
      onNavigatePage(action.page);
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Copilot Agent Button in Theme Accent */}
      <div className="fixed bottom-6 right-6 z-40 print:hidden">
        <button
          onClick={() => {
            soundFx.playClick();
            setIsOpen(!isOpen);
          }}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full btn-theme-primary font-heading font-bold text-xs shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <div className="relative flex items-center justify-center">
            <Bot size={18} />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
          </div>
          <span>Ask Tharun AI</span>
          <Sparkles size={14} className="text-white animate-pulse" />
        </button>
      </div>

      {/* Slide-out Interactive Copilot Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 w-[92vw] sm:w-[420px] max-h-[580px] h-[78vh] z-50 rounded-3xl bg-[#ffffff] border border-[var(--theme-border)] shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200 print:hidden">
          {/* Header */}
          <div className="p-4 bg-[#faf8f5] border-b border-[var(--theme-border)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[var(--theme-light)] border border-[var(--theme-border)] text-[var(--theme-dark)]">
                <Bot size={20} className="text-[var(--theme-primary)]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-heading font-bold text-[#1c1917]">Tharun Copilot Agent</h3>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#f0fdf4] text-[#15803d] border border-[#bbf7d0] font-bold">
                    ONLINE
                  </span>
                </div>
                <p className="text-[11px] text-[#78716c]">
                  AI &amp; Data Engineering • LPU (CGPA 7.88)
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                setIsOpen(false);
              }}
              className="p-1.5 rounded-lg bg-[#ffffff] hover:bg-[var(--theme-light)] text-[#57534e] hover:text-[#1c1917] border border-[var(--theme-border)] cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-2 bg-[#faf8f5]/80 border-b border-[var(--theme-border)] flex items-center gap-1.5 overflow-x-auto text-[11px]">
            <span className="text-[#78716c] text-[10px] shrink-0 font-bold">Ask:</span>
            {QUICK_PROMPTS.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                className="px-2.5 py-1 rounded-full bg-[#ffffff] hover:bg-[var(--theme-light)] border border-[var(--theme-border)] hover:border-[var(--theme-primary)] text-[var(--theme-dark)] whitespace-nowrap shrink-0 transition-colors font-medium cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs bg-[#fdfbf7]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-lg bg-[var(--theme-light)] border border-[var(--theme-border)] text-[var(--theme-dark)] flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={13} className="text-[var(--theme-primary)]" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 space-y-2 ${
                    m.sender === 'user'
                      ? 'btn-theme-primary rounded-br-none shadow-sm'
                      : 'bg-[#ffffff] border border-[var(--theme-border)] text-[#1c1917] rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>

                  {m.action && (
                    <button
                      onClick={() => handleActionClick(m.action!)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--theme-light)] hover:bg-[#ffffff] border border-[var(--theme-border)] text-[var(--theme-dark)] text-[11px] font-bold transition-all mt-1 cursor-pointer"
                    >
                      <span>{m.action.label}</span>
                      <ArrowRight size={11} />
                    </button>
                  )}

                  <div className={`text-[9px] font-mono text-right ${m.sender === 'user' ? 'text-white/70' : 'text-[#a8a29e]'}`}>
                    {m.timestamp}
                  </div>
                </div>

                {m.sender === 'user' && (
                  <div className="w-6 h-6 rounded-lg bg-[var(--theme-light)] border border-[var(--theme-border)] text-[var(--theme-dark)] flex items-center justify-center shrink-0 mt-0.5">
                    <User size={13} className="text-[var(--theme-primary)]" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-[#78716c] text-xs">
                <div className="w-6 h-6 rounded-lg bg-[var(--theme-light)] border border-[var(--theme-border)] text-[var(--theme-dark)] flex items-center justify-center shrink-0">
                  <Bot size={13} className="text-[var(--theme-primary)]" />
                </div>
                <div className="flex items-center gap-1 p-3 rounded-2xl bg-[#ffffff] border border-[var(--theme-border)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)] animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)] animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-[#faf8f5] border-t border-[var(--theme-border)] flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about Tharun's skills, GitPulse, LPU..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-[#ffffff] border border-[var(--theme-border)] text-xs text-[#1c1917] placeholder:text-[#a8a29e] focus:border-[var(--theme-primary)] focus:outline-none"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="p-2 rounded-xl btn-theme-primary disabled:opacity-40 text-white transition-colors cursor-pointer"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
