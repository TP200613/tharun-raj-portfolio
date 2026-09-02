import React, { useState, useEffect } from 'react';
import {
  Brain,
  Zap,
  Users,
  Lightbulb,
  Sparkles,
  Smile,
  ShieldCheck,
  Compass,
  GitBranch,
  Volume2,
  VolumeX,
  MessageSquare,
  Flame,
  Terminal as TerminalIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/sound';

export interface SoftSkillDetail {
  id: string;
  name: string;
  level: number;
  badge: string;
  tagline: string;
  description: string;
  realWorldExample: string;
  primaryColor: string;
  accentBg: string;
  statusTag: string;
  tharunQuote: string;
  spokenQuote: string;
  hudMetrics: string[];
}

const SOFT_SKILLS: SoftSkillDetail[] = [
  {
    id: 'analytical',
    name: 'Analytical Thinking',
    level: 95,
    badge: 'Core Mindset',
    tagline: 'Deconstructing complex data structures & logical flows',
    description: 'Systematic breakdown of multi-variable problems, calculating algorithmic complexity, and mapping optimal relational database architectures.',
    realWorldExample: 'Designed SQLite analytics layer for GitPulse to calculate 0–100 consistency scores & streak mechanics.',
    primaryColor: '#0284c7',
    accentBg: 'rgba(2, 132, 199, 0.12)',
    statusTag: 'Data & Schema Analytics',
    tharunQuote: '“When approaching complex datasets, I break them down into relational schemas, indexed queries, and asymptotic time/space complexities.”',
    spokenQuote: 'When approaching complex datasets, I break them down into relational schemas, indexed queries, and asymptotic time and space complexities.',
    hudMetrics: ['Query Index Optimization', 'Relational Schema Normalization', 'Sub-ms Data Traversal']
  },
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    level: 94,
    badge: 'Daily Rigor',
    tagline: 'Algorithmic persistence and root-cause debugging',
    description: 'Relentless drive to discover elegant, clean solutions for edge cases, memory bottlenecks, and asynchronous race conditions.',
    realWorldExample: 'Maintained 30+ consecutive days LeetCode daily challenge streak with structured pattern logs.',
    primaryColor: '#b8860b',
    accentBg: 'rgba(184, 134, 11, 0.12)',
    statusTag: 'Eureka / Root-Cause Debugging',
    tharunQuote: '“Every bug or algorithmic puzzle has a root cause. I trace edge cases systematically and optimize towards clean O(n) or O(log n) efficiency.”',
    spokenQuote: 'Every bug or algorithmic puzzle has a root cause. I trace edge cases systematically and optimize towards clean O of n efficiency.',
    hudMetrics: ['30+ Days LeetCode Streak', 'Asymptotic Complexity Profiling', 'Edge-Case Validation']
  },
  {
    id: 'collaboration',
    name: 'Team Collaboration',
    level: 90,
    badge: 'Synergy & Git',
    tagline: 'Empathy, clear documentation, and peer review',
    description: 'Active listener who embraces agile workflows, writes thorough documentation, and fosters positive, productive pair-programming environments.',
    realWorldExample: 'Certified in GitHub CI/CD workflows and collaborative repository best practices at Microsoft AI Fest.',
    primaryColor: '#16a34a',
    accentBg: 'rgba(22, 163, 74, 0.12)',
    statusTag: 'Agile & CI/CD Synergy',
    tharunQuote: '“Great software thrives on shared clarity. I prioritize detailed documentation, modular pull requests, and supportive pair programming.”',
    spokenQuote: 'Great software thrives on shared clarity. I prioritize detailed documentation, modular pull requests, and supportive pair programming.',
    hudMetrics: ['GitHub CI/CD Automation', 'Clear Markdown Documentation', 'Agile Code Review']
  },
  {
    id: 'research',
    name: 'Research Mindset',
    level: 92,
    badge: 'Continuous Learner',
    tagline: 'Curiosity driven exploration of modern AI & tools',
    description: 'Eagerness to dive deep into official documentation, benchmarks, and emerging tech stacks to choose the right tool for the job.',
    realWorldExample: 'Self-taught Three.js & React Three Fiber to build 3D interactive visualizations for GitPulse in under 5 weeks.',
    primaryColor: '#7c3aed',
    accentBg: 'rgba(124, 58, 237, 0.12)',
    statusTag: 'Modern Tech Exploration',
    tharunQuote: '“I love diving into documentation and new frameworks—like mastering Three.js to render real-time 3D GitHub analytics for GitPulse.”',
    spokenQuote: 'I love diving into documentation and new frameworks, like mastering Three.js to render real-time 3D GitHub analytics.',
    hudMetrics: ['Three.js & WebGL Visuals', 'Emerging Tool Benchmark', 'Hands-On Prototype Testing']
  },
  {
    id: 'adaptability',
    name: 'Adaptability & Agility',
    level: 92,
    badge: 'Fast Pivot',
    tagline: 'Rapid versatility across full-stack ecosystems',
    description: 'Seamlessly shifting between Python Flask backend logic, React TypeScript UI interfaces, and SQL database querying with speed and precision.',
    realWorldExample: 'Balanced B.Tech CSE coursework (CGPA 7.88), independent software builds, and competitive programming.',
    primaryColor: '#ea580c',
    accentBg: 'rgba(234, 88, 12, 0.12)',
    statusTag: 'Full-Stack Agility',
    tharunQuote: '“Whether building Python Flask backend engines, React TypeScript UIs, or tuning SQL databases, I embrace rapid context shifts with enthusiasm.”',
    spokenQuote: 'Whether building Python Flask backend engines, React TypeScript UIs, or tuning SQL databases, I embrace rapid context shifts with enthusiasm.',
    hudMetrics: ['Flask + React Full-Stack', 'Multi-Language Fluidity', 'Fast Requirements Adaptation']
  }
];

interface QuickPrompt {
  id: string;
  label: string;
  icon: React.ElementType;
  message: string;
  spoken: string;
}

const QUICK_PROMPTS: QuickPrompt[] = [
  {
    id: 'hi',
    label: 'Say Hi! 👋',
    icon: Smile,
    message: '“Hi there! 👋 I am Tharun Raj T P. Welcome to my technical portfolio! I love building full-stack platforms, exploring AI/data engineering, and solving complex algorithmic challenges!”',
    spoken: 'Hi there! I am Tharun Raj. Welcome to my technical portfolio! I love building full-stack platforms, exploring AI and data engineering, and solving complex algorithmic challenges.'
  },
  {
    id: 'ai',
    label: 'Why AI & Data? 🤖',
    icon: Brain,
    message: '“I am fascinated by how raw data translates into actionable intelligence. At LPU (CGPA 7.88), I focus on predictive models, relational schemas, and high-performance algorithms!”',
    spoken: 'I am fascinated by how raw data translates into actionable intelligence. At LPU, I focus on predictive models, relational schemas, and high-performance algorithms.'
  },
  {
    id: 'gitpulse',
    label: 'GitPulse 3D Engine? 🚀',
    icon: Sparkles,
    message: '“I developed GitPulse solo in 5 weeks! It connects to GitHub API, computes 0–100 consistency scores, and visualizes your commits into interactive 3D commit topologies using Three.js!”',
    spoken: 'I developed GitPulse solo in 5 weeks! It connects to GitHub API, computes consistency scores, and visualizes your commits into interactive 3D commit topologies using Three.js.'
  },
  {
    id: 'leetcode',
    label: '30+ Day Streak? 🔥',
    icon: Flame,
    message: '“In July 2026, I completed 30+ consecutive daily challenges on LeetCode. Daily problem solving sharpens pattern recognition and asymptotic optimization under real constraints!”',
    spoken: 'In July 2026, I completed 30+ consecutive daily challenges on LeetCode. Daily problem solving sharpens pattern recognition and algorithmic optimization.'
  },
  {
    id: 'philosophy',
    label: 'Dev Philosophy? ⚡',
    icon: TerminalIcon,
    message: '“Write clean, modular code. Respect edge cases. Build with relentless curiosity and always verify performance through data.”',
    spoken: 'Write clean, modular code. Respect edge cases. Build with relentless curiosity and always verify performance through data.'
  }
];

export const SoftSkillsCharacter: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<SoftSkillDetail>(SOFT_SKILLS[0]);
  const [activeSpeech, setActiveSpeech] = useState<string>(SOFT_SKILLS[0].tharunQuote);
  const [speechKey, setSpeechKey] = useState(0);
  const [isWaving, setIsWaving] = useState(false);
  const [voiceNarration, setVoiceNarration] = useState(false);
  const [activePromptId, setActivePromptId] = useState<string | null>(null);
  const [avatarStyle, setAvatarStyle] = useState<'anime' | '3d' | 'real'>('anime');

  // Cancel any active speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSelectSkill = (skill: SoftSkillDetail) => {
    soundFx.playClick();
    setSelectedSkill(skill);
    setActiveSpeech(skill.tharunQuote);
    setActivePromptId(null);
    setSpeechKey((prev) => prev + 1);

    if (voiceNarration) {
      soundFx.speakText(skill.spokenQuote);
    }
  };

  const handleSayHi = () => {
    setIsWaving(true);
    soundFx.playGreetingChime();
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    setActiveSpeech(QUICK_PROMPTS[0].message);
    setActivePromptId('hi');
    setSpeechKey((prev) => prev + 1);

    if (voiceNarration) {
      soundFx.speakText(QUICK_PROMPTS[0].spoken);
    }

    setTimeout(() => setIsWaving(false), 2600);
  };

  const handlePromptClick = (prompt: QuickPrompt) => {
    soundFx.playClick();
    setActiveSpeech(prompt.message);
    setActivePromptId(prompt.id);
    setSpeechKey((prev) => prev + 1);

    if (prompt.id === 'hi' || prompt.id === 'gitpulse') {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    }

    if (voiceNarration) {
      soundFx.speakText(prompt.spoken);
    }
  };

  const toggleVoice = () => {
    const next = !voiceNarration;
    setVoiceNarration(next);
    if (next) {
      soundFx.playSuccess();
      soundFx.speakText("Voice narration enabled! Click any prompt or skill to hear me speak.");
    } else {
      soundFx.playClick();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  // Determine which avatar image source to display based on style and waving state
  const getAvatarImageSrc = () => {
    if (avatarStyle === 'anime') {
      return isWaving ? '/tharun_anime_wave.jpg' : '/tharun_anime.jpg';
    }
    if (avatarStyle === '3d') {
      return '/tharun_avatar.png';
    }
    return '/tharun.png';
  };

  return (
    <div className="rounded-3xl bg-[#ffffff] border border-[var(--theme-border)] p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 space-y-8 relative overflow-hidden">
      {/* Top Background Ambient Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--theme-glow)] rounded-full blur-3xl opacity-20 pointer-events-none -mr-20 -mt-20" />

      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--theme-border)] relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--theme-light)] border border-[var(--theme-border)] text-xs font-bold text-[var(--theme-dark)] mb-1.5">
            <Smile size={13} className="animate-bounce text-[var(--theme-primary)]" />
            <span>ANIMATED AVATAR &amp; ENGINEERING MINDSET // THARUN RAJ</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#1c1917] flex items-center gap-2">
            <span>Interactive Avatar &amp; Soft Skills</span>
            <span className="text-lg animate-wave">👋</span>
          </h3>
        </div>

        {/* Action Controls: Voice Narration & Say Hi */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Voice Narration Button */}
          <button
            onClick={toggleVoice}
            title={voiceNarration ? 'Voice narration active (Click to mute)' : 'Enable Voice Narration'}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer border ${
              voiceNarration
                ? 'bg-[var(--theme-light)] border-[var(--theme-primary)] text-[var(--theme-dark)] ring-2 ring-[var(--theme-primary)]/20'
                : 'bg-[#faf8f5] border-[var(--theme-border)] text-[#57534e] hover:text-[#1c1917]'
            }`}
          >
            {voiceNarration ? (
              <>
                <Volume2 size={14} className="text-[var(--theme-primary)] animate-pulse" />
                <span>Voice Narration: ON</span>
              </>
            ) : (
              <>
                <VolumeX size={14} className="text-[#a8a29e]" />
                <span>Voice Narration: OFF</span>
              </>
            )}
          </button>

          {/* Say Hi Button */}
          <button
            onClick={handleSayHi}
            className="px-4 py-1.5 rounded-xl btn-theme-primary text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-all"
          >
            <span className="text-sm animate-wave">👋</span>
            <span>Say Hi to Tharun!</span>
          </button>
        </div>
      </div>

      {/* Main Showcase: Left Character Stage / Right Skill Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left: Interactive Anime / Animated Avatar Stage */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-7 rounded-3xl bg-[#faf8f5] border border-[var(--theme-border)] relative overflow-hidden group shadow-inner">
          {/* Dynamic Ambient Glow matching selected skill */}
          <div
            className="absolute w-72 h-72 rounded-full blur-3xl opacity-30 transition-all duration-700 pointer-events-none"
            style={{ backgroundColor: selectedSkill.primaryColor }}
          />

          {/* Interactive Speech Bubble with Animated Tail */}
          <div
            key={speechKey}
            className="relative z-20 w-full mb-5 p-4 rounded-2xl bg-[#ffffff] border border-[var(--theme-border)] shadow-md text-xs sm:text-[13px] text-[#1c1917] font-medium leading-relaxed animate-in fade-in zoom-in-95 duration-300"
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--theme-dark)] flex items-center justify-between gap-1.5 mb-1.5 font-mono">
              <span className="flex items-center gap-1.5">
                <Sparkles size={12} className="text-[var(--theme-primary)] animate-pulse" />
                <span>THARUN RAJ // {activePromptId ? 'TRANSMISSION' : selectedSkill.statusTag}</span>
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--theme-light)] text-[var(--theme-dark)] border border-[var(--theme-border)]">
                {voiceNarration ? '🔊 AUDIO ON' : '💬 ACTIVE'}
              </span>
            </div>
            
            <p className="italic text-[#292524] font-normal leading-relaxed">
              {activeSpeech}
            </p>

            {/* Bubble Tail */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#ffffff] border-r border-b border-[var(--theme-border)] rotate-45" />
          </div>

          {/* Interactive Anime Avatar Frame with Holographic Glow & Waving Badge */}
          <div
            className="relative z-10 w-52 h-60 flex items-center justify-center cursor-pointer transition-transform duration-500 hover:scale-103"
            onClick={handleSayHi}
            title="Click Tharun to wave and say hi!"
          >
            {/* Ambient Pulsing Aura Ring */}
            <div
              className="absolute -inset-3 rounded-3xl opacity-50 blur-lg transition-all duration-700 animate-pulse-glow pointer-events-none"
              style={{ backgroundColor: selectedSkill.primaryColor }}
            />

            {/* Floating Waving Badge */}
            <div className={`absolute -top-3 -right-3 z-30 px-3 py-1 rounded-full bg-[#ffffff] border border-[var(--theme-border)] shadow-lg flex items-center gap-1.5 transition-all duration-300 ${
              isWaving ? 'scale-115 ring-2 ring-[var(--theme-primary)] bg-[var(--theme-light)]' : 'hover:scale-105'
            }`}>
              <span className="text-base animate-wave">👋</span>
              <span className="text-[11px] font-heading font-bold text-[#1c1917]">
                {isWaving ? 'Waving!' : 'Say Hi!'}
              </span>
            </div>

            {/* Frame Container */}
            <div className="relative w-48 h-56 rounded-2xl overflow-hidden border-2 border-[var(--theme-border)] shadow-xl bg-[#ffffff] group-hover:border-[var(--theme-primary)] transition-colors">
              {/* Anime / Animated Character Illustration of Tharun */}
              <img
                key={`${avatarStyle}-${isWaving}`}
                src={getAvatarImageSrc()}
                alt="Tharun Raj T P Anime Avatar"
                className={`w-full h-full object-cover object-center transition-all duration-500 animate-in fade-in zoom-in-95 ${
                  isWaving ? 'scale-105' : 'group-hover:scale-103'
                }`}
              />

              {/* Holographic Mode Overlays based on active skill */}
              {selectedSkill.id === 'analytical' && (
                <>
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent animate-bounce opacity-75" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0284c7]/60 via-transparent to-transparent pointer-events-none flex flex-col justify-end p-2.5">
                    <div className="flex items-center justify-between text-white text-[10px] font-mono font-bold bg-[#0284c7]/90 px-2 py-1 rounded-md backdrop-blur-xs shadow-xs">
                      <span className="flex items-center gap-1">
                        <Brain size={11} />
                        ANALYTICS ACTIVE
                      </span>
                      <span>O(n) OPTIMAL</span>
                    </div>
                  </div>
                </>
              )}

              {selectedSkill.id === 'problem-solving' && (
                <>
                  <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-[#b8860b]/90 text-white shadow-md animate-bounce">
                    <Zap size={14} className="text-yellow-200" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#b8860b]/60 via-transparent to-transparent pointer-events-none flex flex-col justify-end p-2.5">
                    <div className="flex items-center justify-between text-white text-[10px] font-mono font-bold bg-[#b8860b]/90 px-2 py-1 rounded-md backdrop-blur-xs shadow-xs">
                      <span className="flex items-center gap-1">
                        <Zap size={11} />
                        EUREKA SOLVER
                      </span>
                      <span>30+ STREAK</span>
                    </div>
                  </div>
                </>
              )}

              {selectedSkill.id === 'collaboration' && (
                <>
                  <div className="absolute top-2 left-2 p-1.5 rounded-lg bg-[#16a34a]/90 text-white shadow-md">
                    <GitBranch size={14} className="animate-spin" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16a34a]/60 via-transparent to-transparent pointer-events-none flex flex-col justify-end p-2.5">
                    <div className="flex items-center justify-between text-white text-[10px] font-mono font-bold bg-[#16a34a]/90 px-2 py-1 rounded-md backdrop-blur-xs shadow-xs">
                      <span className="flex items-center gap-1">
                        <Users size={11} />
                        TEAM &amp; CI SYNC
                      </span>
                      <span>GITHUB ACTIVE</span>
                    </div>
                  </div>
                </>
              )}

              {selectedSkill.id === 'research' && (
                <>
                  <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-[#7c3aed]/90 text-white shadow-md">
                    <Lightbulb size={14} className="animate-pulse" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#7c3aed]/60 via-transparent to-transparent pointer-events-none flex flex-col justify-end p-2.5">
                    <div className="flex items-center justify-between text-white text-[10px] font-mono font-bold bg-[#7c3aed]/90 px-2 py-1 rounded-md backdrop-blur-xs shadow-xs">
                      <span className="flex items-center gap-1">
                        <Lightbulb size={11} />
                        RESEARCH LAB
                      </span>
                      <span>THREE.JS / AI</span>
                    </div>
                  </div>
                </>
              )}

              {selectedSkill.id === 'adaptability' && (
                <>
                  <div className="absolute top-2 left-2 p-1.5 rounded-lg bg-[#ea580c]/90 text-white shadow-md">
                    <Compass size={14} className="animate-spin" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#ea580c]/60 via-transparent to-transparent pointer-events-none flex flex-col justify-end p-2.5">
                    <div className="flex items-center justify-between text-white text-[10px] font-mono font-bold bg-[#ea580c]/90 px-2 py-1 rounded-md backdrop-blur-xs shadow-xs">
                      <span className="flex items-center gap-1">
                        <Compass size={11} />
                        FULL-STACK AGILITY
                      </span>
                      <span>FLASK + REACT</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Avatar Style Switcher Controls */}
          <div className="mt-3 flex items-center gap-1 p-1 bg-[#ffffff] rounded-xl border border-[var(--theme-border)] shadow-xs">
            {[
              { id: 'anime', label: '✨ Anime (Default)' },
              { id: '3d', label: '🎮 3D Avatar' },
              { id: 'real', label: '📷 Real Photo' }
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => {
                  soundFx.playClick();
                  setAvatarStyle(st.id as 'anime' | '3d' | 'real');
                }}
                className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                  avatarStyle === st.id
                    ? 'bg-[var(--theme-light)] text-[var(--theme-dark)] border border-[var(--theme-border)] font-bold shadow-xs'
                    : 'text-[#78716c] hover:text-[#1c1917]'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Quick Status Tag & Live Pulse */}
          <div className="text-[11px] font-mono text-[#78716c] font-semibold mt-3 flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: selectedSkill.primaryColor }}
            />
            <span className="text-[#1c1917] font-bold">
              {isWaving ? 'WAVING "HI!" 👋' : `ENGINEERING MODE: ${selectedSkill.name.toUpperCase()}`}
            </span>
          </div>

          {/* Quick Prompt Chips under Portrait */}
          <div className="w-full mt-4 pt-3 border-t border-[var(--theme-border)] space-y-1.5">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#78716c] flex items-center gap-1">
              <MessageSquare size={11} />
              <span>Interactive Topics (Click to ask):</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handlePromptClick(p)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all cursor-pointer ${
                    activePromptId === p.id
                      ? 'bg-[var(--theme-light)] border-[var(--theme-primary)] text-[var(--theme-dark)] font-bold shadow-xs'
                      : 'bg-[#ffffff] border-[var(--theme-border)] text-[#57534e] hover:border-[var(--theme-primary)] hover:text-[#1c1917]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Soft Skill Interactive Tabs & In-Depth Matrix */}
        <div className="lg:col-span-7 space-y-5">
          {/* Skill Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SOFT_SKILLS.map((skill) => {
              const isSelected = selectedSkill.id === skill.id && !activePromptId;
              return (
                <button
                  key={skill.id}
                  onClick={() => handleSelectSkill(skill)}
                  className={`p-3.5 rounded-2xl text-left transition-all duration-200 border flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--theme-light)] border-[var(--theme-primary)] text-[#1c1917] shadow-sm ring-1 ring-[var(--theme-primary)]/30'
                      : 'bg-[#faf8f5] hover:bg-[#ffffff] border-[var(--theme-border)] text-[#57534e] hover:border-[var(--theme-primary)]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shadow-xs transition-colors shrink-0"
                      style={{
                        backgroundColor: isSelected ? skill.primaryColor : '#ffffff',
                        color: isSelected ? '#ffffff' : skill.primaryColor,
                        border: '1px solid var(--theme-border)'
                      }}
                    >
                      {skill.id === 'analytical' && <Brain size={17} />}
                      {skill.id === 'problem-solving' && <Zap size={17} />}
                      {skill.id === 'collaboration' && <Users size={17} />}
                      {skill.id === 'research' && <Lightbulb size={17} />}
                      {skill.id === 'adaptability' && <Compass size={17} />}
                    </div>
                    <div>
                      <div className="font-heading font-bold text-xs sm:text-sm text-[#1c1917]">
                        {skill.name}
                      </div>
                      <div className="text-[10px] text-[#78716c] font-medium">
                        {skill.badge}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-[var(--theme-dark)] font-mono">
                    {skill.level}%
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Skill Detailed Showcase Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#faf8f5] border border-[var(--theme-border)] space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: selectedSkill.primaryColor }}
                />
                <h4 className="font-heading font-bold text-lg text-[#1c1917]">
                  {selectedSkill.name}
                </h4>
              </div>
              <span className="px-3 py-0.5 rounded-full bg-[#ffffff] border border-[var(--theme-border)] text-xs font-bold text-[var(--theme-dark)]">
                {selectedSkill.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed">
              {selectedSkill.description}
            </p>

            {/* Real World Proven Execution */}
            <div className="p-3.5 rounded-xl bg-[#ffffff] border border-[var(--theme-border)] space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#78716c] flex items-center gap-1">
                <ShieldCheck size={12} className="text-[#16a34a]" />
                <span>REAL WORLD APPLICATION // PROVEN TRACK RECORD</span>
              </div>
              <p className="text-xs text-[#1c1917] font-semibold">
                {selectedSkill.realWorldExample}
              </p>
            </div>

            {/* Key Engineering Pillars Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              {selectedSkill.hudMetrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-lg bg-[#ffffff] border border-[var(--theme-border)] text-[11px] text-[#57534e] font-medium flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)] shrink-0" />
                  <span className="truncate">{metric}</span>
                </div>
              ))}
            </div>

            {/* Proficiency Meter */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs text-[#57534e] font-medium">
                <span>Core Competency Index</span>
                <span className="font-bold text-[#1c1917]">{selectedSkill.level}%</span>
              </div>
              <div className="h-2.5 w-full bg-[#ffffff] rounded-full overflow-hidden p-0.5 border border-[var(--theme-border)]">
                <div
                  className="h-full rounded-full bg-[var(--theme-gradient)] transition-all duration-700 ease-out"
                  style={{ width: `${selectedSkill.level}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftSkillsCharacter;
