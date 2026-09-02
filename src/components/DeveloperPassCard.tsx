import React, { useState, useRef, useCallback } from 'react';
import {
  ShieldCheck,
  RotateCw,
  Volume2,
  Sparkles,
  Award,
  FileText,
  Copy,
  Check,
  Cpu,
  Flame,
  Camera,
  Bot
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundFx } from '../utils/sound';
import { getAssetUrl } from '../utils/assetPath';

type AvatarPersona = 'photo' | 'anime' | 'avatar';

interface DeveloperPassCardProps {
  onOpenResume: () => void;
  onNavigatePage: (page: 'about' | 'projects' | 'skills' | 'terminal' | 'contact') => void;
}

export const DeveloperPassCard: React.FC<DeveloperPassCardProps> = ({
  onOpenResume,
  onNavigatePage
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [persona, setPersona] = useState<AvatarPersona>('photo');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isWaving, setIsWaving] = useState(false);

  // 3D Parallax Tilt State
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transformStyle, setTransformStyle] = useState<string>(
    'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  );
  const [glarePos, setGlarePos] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles (limit to ±8deg for smooth elegance)
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      setTransformStyle(
        `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
      );
      setGlarePos({ x: glareX, y: glareY, opacity: 0.35 });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setTransformStyle('perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
    setIsWaving(false);
  }, []);

  const handleFlip = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundFx.playClick();
    setIsFlipped((prev) => !prev);
  };

  const handlePersonaChange = (newPersona: AvatarPersona, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playSuccess();
    setPersona(newPersona);
  };

  const handleVoiceGreeting = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playSuccess();
    setIsWaving(true);
    soundFx.speakText(
      "Hi there! I am Tharun Raj T P, an AI and Data Engineering student at Lovely Professional University. Welcome to my portfolio!"
    );
    setTimeout(() => setIsWaving(false), 3500);
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playSuccess();
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email).catch(() => {});
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const getPersonaImage = () => {
    if (persona === 'anime') {
      return getAssetUrl(isWaving ? 'tharun_anime_wave.jpg' : 'tharun_anime.jpg');
    }
    if (persona === 'avatar') {
      return getAssetUrl('tharun_avatar.png');
    }
    return getAssetUrl('tharun1.png');
  };

  return (
    <div className="relative w-full max-w-sm sm:max-w-md mx-auto select-none pt-4 sm:pt-0">
      {/* Background Ambient Glow Halo in Burgundy & Gold */}
      <div className="absolute -inset-4 rounded-[2.5rem] bg-[var(--theme-gradient)] opacity-30 blur-2xl animate-pulse-glow pointer-events-none" />

      {/* Floating Status Satellite Top-Right */}
      <div className="hidden sm:flex items-center gap-2 absolute -top-4 -right-3 z-30 px-3.5 py-1.5 rounded-full bg-[#ffffff] border border-[var(--theme-border)] shadow-lg animate-float-slow backdrop-blur-md">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16a34a] opacity-80" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#16a34a]" />
        </span>
        <span className="text-[11px] font-mono font-bold text-[#1c1917]">Open to Opportunities</span>
      </div>

      {/* Floating Status Satellite Bottom-Left */}
      <div
        className="hidden sm:flex items-center gap-1.5 absolute -bottom-3 -left-4 z-30 px-3.5 py-1.5 rounded-full bg-[#ffffff] border border-[var(--theme-border)] shadow-lg animate-float-slow backdrop-blur-md"
        style={{ animationDelay: '2s' }}
      >
        <Flame size={14} className="text-[#d97706] animate-bounce" />
        <span className="text-[11px] font-mono font-bold text-[var(--theme-dark)]">30+ Days LeetCode</span>
      </div>

      {/* 3D Tilt Card Wrapper */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative transition-transform duration-200 ease-out"
        style={{ transform: transformStyle, transformStyle: 'preserve-3d' }}
      >
        {/* Flip Container with 3D transition */}
        <div
          className={`relative w-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] ${
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* ================================================================= */}
          {/* FRONT FACE: Holographic Developer Identity Pass                   */}
          {/* ================================================================= */}
          <div className="relative rounded-3xl bg-[#ffffff] border-2 border-[var(--theme-border)] hover:border-[var(--theme-primary)] p-4 sm:p-5 shadow-2xl backdrop-blur-2xl [backface-visibility:hidden] z-10 transition-colors duration-300">
            {/* Holographic Specular Glare Layer */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300 z-20"
              style={{
                background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(200, 164, 100, 0.28) 0%, rgba(74, 14, 23, 0.12) 45%, transparent 75%)`,
                opacity: glarePos.opacity,
                mixBlendMode: 'color-dodge'
              }}
            />

            {/* Pass Header HUD Bar */}
            <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-[var(--theme-border)]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#16a34a] animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[var(--theme-dark)] uppercase tracking-wider">
                  DEV-PASS // ID: #TR-2006
                </span>
              </div>

              {/* Persona Switcher Buttons */}
              <div className="flex items-center gap-1 p-0.5 rounded-xl bg-[var(--theme-light)] border border-[var(--theme-border)]">
                <button
                  onClick={(e) => handlePersonaChange('photo', e)}
                  title="Real Portrait"
                  className={`p-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    persona === 'photo'
                      ? 'bg-[var(--theme-primary)] text-white shadow-xs'
                      : 'text-[#57534e] hover:text-[#1c1917]'
                  }`}
                >
                  <Camera size={13} />
                </button>
                <button
                  onClick={(e) => handlePersonaChange('anime', e)}
                  title="Anime Cyberpunk Persona"
                  className={`p-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    persona === 'anime'
                      ? 'bg-[var(--theme-primary)] text-white shadow-xs'
                      : 'text-[#57534e] hover:text-[#1c1917]'
                  }`}
                >
                  <Sparkles size={13} />
                </button>
                <button
                  onClick={(e) => handlePersonaChange('avatar', e)}
                  title="3D Minimal Avatar"
                  className={`p-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    persona === 'avatar'
                      ? 'bg-[var(--theme-primary)] text-white shadow-xs'
                      : 'text-[#57534e] hover:text-[#1c1917]'
                  }`}
                >
                  <Bot size={13} />
                </button>
              </div>
            </div>

            {/* Portrait Framing Container */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#1A080E] border border-[var(--theme-border)] shadow-inner group">
              <img
                src={getPersonaImage()}
                alt="THARUN RAJ T P"
                className="w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-104"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = getAssetUrl('tharun1.png');
                }}
              />

              {/* Holographic Subtle Corner Badge */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#ffffff]/90 backdrop-blur-md border border-[var(--theme-border)] text-[10px] font-mono font-bold text-[#1c1917] flex items-center gap-1.5 shadow-sm">
                <span className={isWaving ? 'animate-bounce' : 'animate-wave'}>👋</span>
                <span>Hi, I'm Tharun!</span>
              </div>

              {/* Interactive Audio Greeting Button (Top Right) */}
              <button
                onClick={handleVoiceGreeting}
                title="Hear Audio Greeting"
                className="absolute top-3 right-3 p-2 rounded-full bg-[#ffffff]/90 hover:bg-[#ffffff] text-[var(--theme-dark)] hover:text-[var(--theme-primary)] border border-[var(--theme-border)] shadow-md backdrop-blur-md transition-all active:scale-90 cursor-pointer flex items-center gap-1"
              >
                <Volume2 size={13} />
                <span className="text-[10px] font-bold font-mono pr-1">Audio</span>
              </button>

              {/* Overlay Hologram Watermark at Bottom of Portrait */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-3.5 pt-8 flex items-end justify-between pointer-events-none">
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E5D3B3]">
                    B.Tech CSE (AI &amp; Data)
                  </div>
                  <div className="text-sm sm:text-base font-heading font-extrabold text-white">
                    THARUN RAJ T P
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-lg bg-[var(--theme-primary)] text-white text-[10px] font-mono font-bold shadow-sm">
                    CGPA: 7.88
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Pass Verification & Flip Bar */}
            <div className="mt-3.5 pt-3 border-t border-[var(--theme-border)] flex items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1c1917]">
                  <ShieldCheck size={14} className="text-[#16a34a]" />
                  <span>Verified LPU Engineering Pass</span>
                </div>
                <p className="text-[10px] text-[#78716c] font-mono">
                  Phagwara, Punjab • Tamil Nadu
                </p>
              </div>

              {/* Interactive Flip Trigger Button */}
              <button
                onClick={handleFlip}
                className="px-3.5 py-1.5 rounded-xl btn-theme-primary text-xs font-bold font-mono flex items-center gap-1.5 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                title="Flip to view developer specifications"
              >
                <span>Dev Specs</span>
                <RotateCw size={12} className="animate-spin-slow" />
              </button>
            </div>
          </div>

          {/* ================================================================= */}
          {/* BACK FACE: Developer Clearance HUD & Specifications               */}
          {/* ================================================================= */}
          <div className="absolute inset-0 rounded-3xl bg-[#ffffff] border-2 border-[var(--theme-border)] p-4 sm:p-5 shadow-2xl backdrop-blur-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] z-10 flex flex-col justify-between overflow-y-auto text-[#1c1917]">
            {/* Back Header */}
            <div>
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[var(--theme-border)]">
                <div className="flex items-center gap-2">
                  <Cpu size={16} className="text-[var(--theme-primary)]" />
                  <span className="text-[11px] font-mono font-bold text-[var(--theme-dark)] uppercase">
                    CLEARANCE SPECIFICATIONS // HUD
                  </span>
                </div>
                <button
                  onClick={handleFlip}
                  className="p-1 rounded-lg hover:bg-[var(--theme-light)] text-[var(--theme-dark)] transition-colors cursor-pointer"
                  title="Return to portrait"
                >
                  <RotateCw size={14} />
                </button>
              </div>

              {/* Specs Grid */}
              <div className="space-y-2.5 text-xs">
                {/* Spec 1: Flagship */}
                <div
                  onClick={() => {
                    soundFx.playClick();
                    onNavigatePage('projects');
                  }}
                  className="p-2.5 rounded-xl bg-[var(--theme-light)] border border-[var(--theme-border)] hover:border-[var(--theme-primary)] transition-all cursor-pointer space-y-1 group"
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-[var(--theme-dark)]">
                    <span className="flex items-center gap-1.5">
                      <Sparkles size={12} className="text-[var(--theme-primary)]" />
                      <span>FLAGSHIP PLATFORM</span>
                    </span>
                    <span className="font-mono text-[10px] text-[#16a34a] group-hover:underline">EXPLORE ↗</span>
                  </div>
                  <div className="font-bold text-[#1c1917] text-xs">
                    GitPulse | Full-Stack Analytics Platform
                  </div>
                  <p className="text-[11px] text-[#57534e]">
                    Solo 5-week build with Python Flask, React, Three.js 3D visualizers, and SQLite streak analytics.
                  </p>
                </div>

                {/* Spec 2: Academic & LeetCode */}
                <div className="grid grid-cols-2 gap-2">
                  <div
                    onClick={() => {
                      soundFx.playClick();
                      onNavigatePage('skills');
                    }}
                    className="p-2.5 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)] hover:border-[var(--theme-primary)] transition-all cursor-pointer space-y-1 group"
                  >
                    <div className="text-[10px] font-mono font-bold text-[var(--theme-dark)] flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Flame size={12} className="text-[#d97706]" />
                        <span>LEETCODE</span>
                      </span>
                      <span className="text-[9px] text-[#78716c] group-hover:text-[var(--theme-primary)]">↗</span>
                    </div>
                    <div className="text-sm font-bold text-[#1c1917]">30+ Days</div>
                    <div className="text-[10px] text-[#78716c]">July 2026 daily streak</div>
                  </div>

                  <div
                    onClick={() => {
                      soundFx.playClick();
                      onNavigatePage('about');
                    }}
                    className="p-2.5 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)] hover:border-[var(--theme-primary)] transition-all cursor-pointer space-y-1 group"
                  >
                    <div className="text-[10px] font-mono font-bold text-[var(--theme-dark)] flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Award size={12} className="text-[var(--theme-primary)]" />
                        <span>ACADEMIC</span>
                      </span>
                      <span className="text-[9px] text-[#78716c] group-hover:text-[var(--theme-primary)]">↗</span>
                    </div>
                    <div className="text-sm font-bold text-[#1c1917]">7.88 CGPA</div>
                    <div className="text-[10px] text-[#78716c]">B.Tech AI &amp; Data @ LPU</div>
                  </div>
                </div>

                {/* Spec 3: Certifications */}
                <div
                  onClick={() => {
                    soundFx.playClick();
                    onNavigatePage('about');
                  }}
                  className="p-2.5 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)] hover:border-[var(--theme-primary)] transition-all cursor-pointer space-y-1 group"
                >
                  <div className="text-[10px] font-mono font-bold text-[var(--theme-dark)] flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={12} className="text-[#16a34a]" />
                      <span>MICROSOFT AI SKILLS FEST</span>
                    </span>
                    <span className="text-[9px] text-[#78716c] group-hover:text-[var(--theme-primary)]">↗</span>
                  </div>
                  <p className="text-[11px] text-[#57534e]">
                    {PORTFOLIO_DATA.certificates.length}x verified certificates across Git, GitHub Code Scanning, GitHub Actions CI/CD, and Copilot AI Agents.
                  </p>
                </div>
              </div>
            </div>

            {/* Back Footer Quick Actions */}
            <div className="pt-3 mt-2 border-t border-[var(--theme-border)] space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundFx.playClick();
                    onOpenResume();
                  }}
                  className="py-2 px-2.5 rounded-xl btn-theme-primary text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <FileText size={13} />
                  <span>View Resume</span>
                </button>

                <button
                  onClick={handleCopyEmail}
                  className="py-2 px-2.5 rounded-xl bg-[#faf8f5] hover:bg-[var(--theme-light)] border border-[var(--theme-border)] text-[#1c1917] text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={13} className="text-[#16a34a]" />
                      <span className="text-[#16a34a]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={handleFlip}
                className="w-full py-1.5 rounded-lg text-center text-[11px] font-mono font-semibold text-[var(--theme-dark)] hover:underline flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>↺ Return to Portrait Pass</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
