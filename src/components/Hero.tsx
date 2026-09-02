import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Mail,
  Phone,
  Copy,
  Check,
  Award,
  Code2,
  Sparkles,
  FileText,
  GraduationCap,
  ArrowUpRight
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './Icons';
import { soundFx } from '../utils/sound';
import { DeveloperPassCard } from './DeveloperPassCard';

const ROLES = [
  'AI & Data Engineering Student (CGPA: 7.88)',
  'Full-Stack Developer (React & Flask)',
  'Hands-On Project Builder (GitPulse Creator)',
  'Python & SQL Specialist'
];

interface HeroProps {
  onOpenResume: () => void;
  onNavigatePage: (page: 'about' | 'projects' | 'skills' | 'terminal' | 'contact') => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onNavigatePage }) => {
  const [copied, setCopied] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentFullText = ROLES[textIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText.length < currentFullText.length) {
        timer = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        }, 30);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1400);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length - 1));
        }, 15);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % ROLES.length);
        }, 30);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex]);

  const handleCopyEmail = () => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative min-h-[86vh] flex items-center justify-center pt-24 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden page-fade-in">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[360px] bg-[var(--theme-primary)]/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[420px] h-[420px] bg-[var(--theme-primary)]/8 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl w-full mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bio & Intro */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Availability Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#ffffff] border border-[var(--theme-border)] shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16a34a] opacity-80"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#16a34a]"></span>
              </span>
              <span className="text-xs font-semibold text-[#57534e] tracking-wide">
                {PORTFOLIO_DATA.personal.status}
              </span>
            </div>

            {/* Main Title & Typewriter */}
            <div className="space-y-2">
              <div className="text-xs sm:text-sm font-bold text-[var(--theme-dark)] tracking-wider uppercase flex items-center gap-2">
                <Sparkles size={16} className="text-[var(--theme-primary)] animate-pulse" />
                <span>HANDS-ON DEVELOPER // AI &amp; DATA ENGINEERING</span>
              </div>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-heading font-extrabold tracking-tight text-[#1c1917] leading-tight">
                I'm <span className="text-gradient-theme">THARUN RAJ T P</span>
              </h1>
              <div className="h-10 sm:h-12 flex items-center">
                <span className="text-xl sm:text-2xl lg:text-3xl font-heading font-semibold text-[#57534e]">
                  {displayText}
                  <span className="inline-block w-2.5 h-6 sm:h-8 ml-1 bg-[var(--theme-primary)] animate-pulse align-middle" />
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#57534e] max-w-2xl leading-relaxed font-normal">
              {PORTFOLIO_DATA.personal.bio}
            </p>

            {/* Primary Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  soundFx.playClick();
                  onNavigatePage('projects');
                }}
                className="px-7 py-3.5 rounded-xl btn-theme-primary font-semibold text-sm flex items-center gap-2.5 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Projects &amp; GitPulse</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenResume();
                }}
                className="px-6 py-3.5 rounded-xl btn-theme-secondary font-semibold text-sm flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <FileText size={16} className="text-[var(--theme-dark)]" />
                <span>View Resume / CV</span>
              </button>
            </div>

            {/* Email, Phone & Social Profile Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4 text-[#57534e]">
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#ffffff] hover:bg-[var(--theme-light)] border border-[var(--theme-border)] text-[#57534e] hover:text-[#1c1917] text-xs font-medium transition-colors shadow-xs cursor-pointer"
                title="Copy email to clipboard"
              >
                <Mail size={14} className="text-[var(--theme-dark)]" />
                <span>{PORTFOLIO_DATA.personal.email}</span>
                {copied ? (
                  <Check size={14} className="text-[#16a34a] ml-1" />
                ) : (
                  <Copy size={13} className="text-[#a8a29e] ml-1" />
                )}
              </button>

              <a
                href={`tel:${PORTFOLIO_DATA.personal.phone}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#ffffff] hover:bg-[var(--theme-light)] border border-[var(--theme-border)] text-[#57534e] hover:text-[#1c1917] text-xs font-medium transition-colors shadow-xs"
                title="Call Tharun"
              >
                <Phone size={13} className="text-[var(--theme-dark)]" />
                <span>{PORTFOLIO_DATA.personal.phone}</span>
              </a>

              <div className="h-4 w-px bg-[var(--theme-border)] hidden sm:block" />

              <div className="flex items-center gap-2">
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="p-2 rounded-lg bg-[#ffffff] border border-[var(--theme-border)] hover:border-[var(--theme-primary)] hover:text-[#1c1917] transition-colors shadow-xs cursor-pointer"
                  title="GitHub Profile"
                >
                  <GithubIcon size={16} />
                </a>
                <a
                  href={PORTFOLIO_DATA.personal.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="p-2 rounded-lg bg-[#ffffff] border border-[var(--theme-border)] hover:border-[var(--theme-primary)] hover:text-[var(--theme-primary)] transition-colors shadow-xs cursor-pointer"
                  title="LeetCode Profile"
                >
                  <LeetCodeIcon size={16} />
                </a>
                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="p-2 rounded-lg bg-[#ffffff] border border-[var(--theme-border)] hover:border-[#0284c7] hover:text-[#0284c7] transition-colors shadow-xs cursor-pointer"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Holographic Developer Pass Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <DeveloperPassCard
              onOpenResume={onOpenResume}
              onNavigatePage={onNavigatePage}
            />
          </div>
        </div>

        {/* Quick Credentials Strip */}
        <div className="pt-8 border-t border-[var(--theme-border)] grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'LeetCode Daily Streak', val: '30+ Days', icon: Code2, page: 'skills' as const },
            { label: 'Flagship Platform', val: 'GitPulse (Solo 5-Wk)', icon: Sparkles, page: 'projects' as const },
            { label: 'Academic Standing', val: 'CGPA 7.88 @ LPU', icon: GraduationCap, page: 'about' as const },
            { label: 'Certificates', val: '3x Microsoft AI Fest', icon: Award, page: 'about' as const },
          ].map((stat, i) => (
            <button
              key={i}
              onClick={() => {
                soundFx.playClick();
                onNavigatePage(stat.page);
              }}
              className="p-4 rounded-2xl bg-[#ffffff] border border-[var(--theme-border)] hover:border-[var(--theme-primary)] hover:shadow-md transition-all flex items-center justify-between text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-[var(--theme-light)] text-[var(--theme-dark)] group-hover:bg-[var(--theme-primary)] group-hover:text-white transition-colors">
                  <stat.icon size={22} />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-heading font-bold text-[#1c1917]">
                    {stat.val}
                  </div>
                  <div className="text-xs text-[#78716c] font-medium">{stat.label}</div>
                </div>
              </div>
              <ArrowUpRight size={16} className="text-[#a8a29e] group-hover:text-[var(--theme-dark)] transition-colors shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
