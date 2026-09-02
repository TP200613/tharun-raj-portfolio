import React, { useState } from 'react';
import {
  Cpu,
  Terminal,
  Shield,
  Target,
  Layers,
  Sparkles,
  GraduationCap,
  Award,
  BookOpen,
  MapPin,
  CheckCircle2,
  FileCode2,
  Copy,
  Check,
  Zap
} from 'lucide-react';
import { Timeline } from './Timeline';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundFx } from '../utils/sound';
import { getAssetUrl } from '../utils/assetPath';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'certs' | 'specs'>('overview');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (field: string, val: string) => {
    soundFx.playSuccess();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(val).catch(() => {});
    }
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const highlights = [
    {
      icon: Layers,
      title: 'Full-Stack & 3D Engineering',
      badge: 'GitPulse Creator',
      color: '#0284c7',
      bgGlow: 'rgba(2, 132, 199, 0.12)',
      desc: 'Built GitPulse solo in 5 weeks using Python Flask, React, Three.js, React Three Fiber, SQLite, and GitHub API with live deployment on Vercel & Render.',
      metrics: ['Solo 5-Week Build', '3D Commit Visualizer', 'Vercel + Render Live']
    },
    {
      icon: GraduationCap,
      title: 'B.Tech CSE (AI & Data) — CGPA 7.88',
      badge: 'Academic Standing',
      color: '#16a34a',
      bgGlow: 'rgba(22, 163, 74, 0.12)',
      desc: 'Pursuing degree at Lovely Professional University (Aug 2025 - Present), maintaining a 7.88 CGPA with deep focus on AI, Data Engineering, Python & SQL.',
      metrics: ['CGPA: 7.88 / 10.0', 'Relational Database Systems', 'AI & ML Workflows']
    },
    {
      icon: Target,
      title: 'Structured Algorithmic Rigor',
      badge: 'Daily Problem Solving',
      color: '#d97706',
      bgGlow: 'rgba(217, 119, 6, 0.12)',
      desc: 'Solved 30+ LeetCode problems consecutively in July 2026, solving at least one problem every day with a focus on data structures, time complexity and algorithms.',
      metrics: ['30+ Day Consecutive Streak', 'July 2026 Milestone', 'Asymptotic Optimization']
    },
    {
      icon: Shield,
      title: 'Microsoft AI Skills Fest & CI/CD',
      badge: 'Verified Microsoft Certs',
      color: '#7c3aed',
      bgGlow: 'rgba(124, 58, 237, 0.12)',
      desc: `Earned ${PORTFOLIO_DATA.certificates.length} official Microsoft certificates covering Git, GitHub security, repository scanning, CI/CD Actions, and Copilot agents during the AI & Data Engineering Track.`,
      metrics: ['Git Fundamentals', 'GitHub Code Security', 'GitHub Actions Automation']
    }
  ];

  const devSpecs = [
    { label: 'Degree & Specialization', val: 'B.Tech CSE (AI and Data Engineering)', icon: GraduationCap },
    { label: 'University & Campus', val: 'Lovely Professional University (Phagwara, Punjab)', icon: MapPin },
    { label: 'Academic Standing', val: 'CGPA: 7.88 / 10.0 (Aug 2025 - Present)', icon: Award },
    { label: 'Senior Secondary (XII)', val: 'Sri Valli Vilas Alaya, CBSE — 79.6% (May 2024)', icon: BookOpen },
    { label: 'Secondary School (X)', val: 'Edify School Vazhappattu Neelikkupam, CBSE (2022)', icon: BookOpen },
    { label: 'Core Languages', val: 'Python, SQL, JavaScript (ES6+), TypeScript, HTML5, CSS3', icon: FileCode2 },
    { label: 'Frameworks & Tools', val: 'React, Flask, SQLite, MySQL, Three.js, Pandas, Git, GitHub Actions', icon: Cpu },
    { label: 'Soft Skills Mindset', val: 'Analytical Thinking, Problem Solving, Team Collaboration, Research Mindset', icon: Zap }
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 page-fade-in">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--theme-light)] border border-[var(--theme-border)] text-xs font-bold text-[var(--theme-dark)] shadow-xs">
          <Cpu size={14} className="text-[var(--theme-primary)]" />
          <span>DEVELOPER PROFILE // ENGINEERING JOURNEY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#1c1917]">
          About &amp; Journey // <span className="text-gradient-theme">THARUN RAJ T P</span>
        </h2>
        <p className="text-sm sm:text-base text-[#57534e] max-w-2xl mx-auto">
          B.Tech CSE (AI &amp; Data Engineering) student @ Lovely Professional University with a passion for hands-on full-stack development and algorithmic rigor.
        </p>

        {/* Sub-Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {[
            { id: 'overview', label: '🌟 Executive Overview & Narrative' },
            { id: 'timeline', label: '🧭 Career Milestones & Timeline' },
            { id: 'certs', label: `📜 Microsoft AI Certifications (${PORTFOLIO_DATA.certificates.length}x)` },
            { id: 'specs', label: '⚙️ Technical & Academic Specs' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundFx.playClick();
                setActiveTab(tab.id as 'overview' | 'timeline' | 'certs' | 'specs');
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer shadow-xs ${
                activeTab === tab.id
                  ? 'btn-theme-primary'
                  : 'bg-[#ffffff] border border-[var(--theme-border)] text-[#57534e] hover:text-[#1c1917] hover:border-[var(--theme-primary)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: EXECUTIVE OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-12 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Bio & Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#ffffff] border border-[var(--theme-border)] shadow-md space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--theme-border)]">
                  <h3 className="text-xl font-heading font-bold text-[#1c1917] flex items-center gap-2.5">
                    <Sparkles size={20} className="text-[var(--theme-primary)] animate-pulse" />
                    <span>Engineering Mindset &amp; Philosophy</span>
                  </h3>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[var(--theme-light)] text-[var(--theme-dark)] border border-[var(--theme-border)]">
                    LPU // CSE (AI &amp; DATA)
                  </span>
                </div>
                
                <p className="text-[#57534e] text-sm sm:text-base leading-relaxed">
                  I am <strong className="text-[#1c1917] font-semibold">Tharun Raj T P</strong>, a Computer Science &amp; Engineering undergraduate specializing in <span className="text-[var(--theme-dark)] font-semibold">Artificial Intelligence and Data Engineering</span> at Lovely Professional University (CGPA: 7.88). I am driven by the belief that real engineering mastery is born from <span className="text-[var(--theme-primary)] font-semibold">hands-on building</span>.
                </p>

                <p className="text-[#57534e] text-sm sm:text-base leading-relaxed">
                  In 5 weeks, I single-handedly designed and built <strong className="text-[#1c1917] font-semibold">GitPulse</strong>—a full-stack GitHub analytics platform combining a Python Flask API backend, a custom SQLite consistency engine, and an interactive 3D WebGL commit topology visualizer with Three.js.
                </p>

                <p className="text-[#57534e] text-sm sm:text-base leading-relaxed">
                  I maintained a consecutive <strong className="text-[#1c1917] font-semibold">30+ days daily challenge streak on LeetCode</strong> throughout July 2026, solving at least one problem daily with focus on algorithmic patterns and asymptotic Big-O efficiency. Additionally, I earned {PORTFOLIO_DATA.certificates.length} verified Microsoft certificates during the <span className="text-[#15803d] font-semibold">Microsoft AI Skills Fest</span>.
                </p>

                <div className="pt-3 border-t border-[var(--theme-border)] grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold">
                  <div className="p-2 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)] text-center">
                    <span className="text-[var(--theme-dark)] block font-bold">CGPA: 7.88</span>
                    <span className="text-[10px] text-[#78716c]">LPU CSE</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)] text-center">
                    <span className="text-[var(--theme-dark)] block font-bold">5-Week Build</span>
                    <span className="text-[10px] text-[#78716c]">GitPulse Engine</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)] text-center">
                    <span className="text-[var(--theme-dark)] block font-bold">30+ Days</span>
                    <span className="text-[10px] text-[#78716c]">LeetCode Streak</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)] text-center">
                    <span className="text-[var(--theme-dark)] block font-bold">{PORTFOLIO_DATA.certificates.length}x Microsoft</span>
                    <span className="text-[10px] text-[#78716c]">AI Fest Certs</span>
                  </div>
                </div>
              </div>

              {/* AI & Data Architecture Visual Graphic Blueprint */}
              <div className="rounded-3xl bg-[#ffffff] border border-[var(--theme-border)] overflow-hidden shadow-md group">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#1c1917]">
                  <img
                    src={getAssetUrl('ai_pipeline_graphic.jpg')}
                    alt="AI and Data Architecture Blueprint"
                    className="w-full h-full object-cover opacity-85 group-hover:scale-103 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                  
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[var(--theme-light)] border border-white/20">
                      AI &amp; DATA PIPELINE ARCHITECTURE
                    </span>
                    <span className="text-[10px] font-mono text-[#16a34a] bg-black/70 px-2.5 py-0.5 rounded-full border border-white/20 font-bold">
                      ● RELATIONAL SCHEMAS
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                    <h4 className="text-sm sm:text-base font-heading font-extrabold text-white">
                      Relational ETL, Schema Normalization &amp; Model Inference Pipeline
                    </h4>
                    <p className="text-[11px] text-[#d6d3d1] mt-0.5">
                      Python Flask microservices connected to SQLite/MySQL with sub-ms query traversal.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Four Pillars of Engineering Excellence */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 pb-1">
                <Shield size={18} className="text-[var(--theme-primary)]" />
                <h3 className="text-lg font-heading font-bold text-[#1c1917]">
                  Pillars of Engineering Excellence
                </h3>
              </div>

              {highlights.map((h, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-[#ffffff] border border-[var(--theme-border)] hover:border-[var(--theme-primary)] transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-xl space-y-3 group relative overflow-hidden"
                >
                  <div
                    className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity pointer-events-none"
                    style={{ backgroundColor: h.color }}
                  />

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2.5 rounded-xl text-white shadow-xs group-hover:scale-108 transition-all shrink-0"
                        style={{ backgroundColor: h.color }}
                      >
                        <h.icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-base text-[#1c1917] group-hover:text-[var(--theme-dark)] transition-colors">
                          {h.title}
                        </h4>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#78716c]">
                          {h.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed">
                    {h.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {h.metrics.map((m, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-lg bg-[#faf8f5] text-[10px] font-semibold text-[#78716c] border border-[var(--theme-border)]"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE TIMELINE & MILESTONES */}
      {activeTab === 'timeline' && (
        <div className="animate-in fade-in duration-300">
          <Timeline />
        </div>
      )}

      {/* TAB 3: MICROSOFT AI SKILLS FEST CERTIFICATIONS */}
      {activeTab === 'certs' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#ffffff] border border-[var(--theme-border)] shadow-md space-y-3">
            <div className="flex items-center gap-2.5">
              <Award size={24} className="text-[var(--theme-primary)]" />
              <h3 className="text-2xl font-heading font-bold text-[#1c1917]">
                Microsoft AI Skills Fest Certifications &amp; Training
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#57534e] max-w-2xl leading-relaxed">
              Completed official Microsoft AI Skills Fest modules covering Git version control, secure GitHub repositories, and automated CI/CD pipelines with GitHub Actions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTFOLIO_DATA.certificates.map((cert, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#ffffff] border border-[var(--theme-border)] hover:border-[var(--theme-primary)] transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[var(--theme-light)] border border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-dark)] font-bold text-xs shadow-xs">
                      #{idx + 1}
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#ecfdf5] border border-[#a7f3d0] text-[#15803d] font-bold text-[10px] flex items-center gap-1 shadow-xs">
                      <CheckCircle2 size={11} />
                      Verified
                    </span>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-base text-[#1c1917] group-hover:text-[var(--theme-dark)] transition-colors leading-snug">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-[var(--theme-dark)] font-medium mt-1">
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--theme-border)] flex items-center justify-between text-[11px] text-[#78716c]">
                  <span>Track: {cert.track || 'AI & Data'}</span>
                  <span className="font-mono font-bold text-[#1c1917]">{cert.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-[#faf8f5] border border-[var(--theme-border)] space-y-4">
            <h4 className="font-heading font-bold text-base text-[#1c1917] flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[#16a34a]" />
              <span>Key Competencies Gained from Microsoft AI Fest</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#57534e]">
              <div className="p-3.5 rounded-xl bg-[#ffffff] border border-[var(--theme-border)] space-y-1">
                <strong className="text-[#1c1917] block">1. Git Fundamentals &amp; VCS</strong>
                <p>Repository tracking, branch management, merge conflict resolution, and clean commit hygiene.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#ffffff] border border-[var(--theme-border)] space-y-1">
                <strong className="text-[#1c1917] block">2. GitHub Security &amp; Scanning</strong>
                <p>Code scanning best practices, secret protection, automated vulnerability alerts, and branch policies.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#ffffff] border border-[var(--theme-border)] space-y-1">
                <strong className="text-[#1c1917] block">3. GitHub Actions CI/CD</strong>
                <p>YAML workflow authoring, automated test triggers, multi-job pipelines, and deployment webhooks.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: TECHNICAL & ACADEMIC SPECS */}
      {activeTab === 'specs' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#ffffff] border border-[var(--theme-border)] shadow-md space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--theme-border)]">
              <div>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#1c1917] flex items-center gap-2">
                  <Terminal size={20} className="text-[var(--theme-primary)]" />
                  <span>Technical &amp; Academic Specifications</span>
                </h3>
                <p className="text-xs text-[#78716c] mt-0.5">
                  Verified system parameters, academic milestones, and engineering configurations.
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[var(--theme-light)] text-[var(--theme-dark)] border border-[var(--theme-border)]">
                MAINFRAME SPEC // v3.2
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {devSpecs.map((spec, idx) => {
                const Icon = spec.icon;
                const isCopied = copiedField === spec.label;

                return (
                  <div
                    key={idx}
                    onClick={() => handleCopy(spec.label, spec.val)}
                    className="p-4 rounded-2xl bg-[#faf8f5] hover:bg-[#ffffff] border border-[var(--theme-border)] hover:border-[var(--theme-primary)] transition-all flex items-start justify-between gap-3 shadow-xs cursor-pointer group"
                    title="Click to copy value"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-[#ffffff] border border-[var(--theme-border)] text-[var(--theme-dark)] group-hover:bg-[var(--theme-primary)] group-hover:text-white transition-colors shrink-0">
                        <Icon size={16} />
                      </div>
                      <div>
                        <span className="text-[11px] font-medium text-[#78716c] block">
                          {spec.label}
                        </span>
                        <h4 className="text-xs sm:text-sm font-semibold text-[#1c1917] mt-0.5 leading-snug">
                          {spec.val}
                        </h4>
                      </div>
                    </div>

                    <span className="text-[10px] text-[#a8a29e] group-hover:text-[var(--theme-dark)] transition-colors shrink-0 mt-1">
                      {isCopied ? (
                        <span className="text-[#16a34a] font-bold flex items-center gap-0.5">
                          <Check size={11} /> Copied
                        </span>
                      ) : (
                        <Copy size={12} />
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
