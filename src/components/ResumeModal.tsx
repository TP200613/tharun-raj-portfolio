import React from 'react';
import { X, Printer, Download } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundFx } from '../utils/sound';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const p = PORTFOLIO_DATA.personal;

  const handlePrint = () => {
    soundFx.playClick();
    window.print();
  };

  const handleDownloadTxt = () => {
    soundFx.playSuccess();
    const certsText = PORTFOLIO_DATA.certificates
      .map((c) => `• ${c.title} | ${c.issuer} ${c.date}`)
      .join('\n');

    const content = `${p.name.toUpperCase()}
LinkedIn: ${p.linkedin}                Email: ${p.email}
GitHub:   ${p.githubProfile || p.github}       Mobile: ${p.phone}

SKILLS
• Languages:       Python, SQL, JavaScript (ES6+), TypeScript, HTML5, CSS3
• Technologies:    Pandas, React, Flask, Three.js, Tailwind CSS, Git, GitHub Actions, Canva
• Databases/Tools: MySQL, SQLite, Vercel, Render, VS Code
• Soft Skills:     Problem solving, Team collaboration, Analytical thinking, Research mindset, Adaptability

PROJECTS
GitPulse | GitHub                                              Jun 2026 - Jul 2026
• Built a full-stack GitHub profile analytics platform solo in 5 weeks, fetching live data through the GitHub API with pagination support for large commit histories.
• Designed a SQLite analytics layer to calculate commit streaks, consistency scores (0-100), language detection, and repository rankings based on stars and forks.
• Implemented multi-user side-by-side comparison with interactive React charts and a 3D interface using Three.js and React Three Fiber, deploying backend on Render and frontend on Vercel.
• Tech Stack: React, TypeScript, Python, Flask, SQLite, Tailwind CSS, Three.js, GitHub API, Vercel, Render

TRAINING
Microsoft AI Skills Fest | Certificate                          Jun 2026 - Jul 2026
AI & Data Engineering Track — Virtual Global Technical Training
Hands-on Trainee in AI Tools, GitHub Actions & Copilot
• Completed comprehensive technical modules covering Git and GitHub fundamentals, repository architecture, and product management.
• Mastered secure repository practices, including automated CodeQL code scanning, secret scanning, and GitHub security policies.
• Gained hands-on exposure to GitHub Actions CI/CD workflow automation, scheduled pipeline triggers, and prebuilt Microsoft 365 Copilot AI agents.

CERTIFICATES
${certsText}

ACHIEVEMENTS
• Solved 30+ consecutive LeetCode DSA problems daily throughout July 2026, maintaining a 100% daily solve streak.
• Architected and shipped GitPulse full-stack platform solo within a 5-week sprint with live 3D visualizers.
• Maintained high academic standing with CGPA 7.88 in B.Tech CSE (AI & Data Engineering) at Lovely Professional University.

EDUCATION
Lovely Professional University                                  Phagwara, Punjab
Bachelor of Technology - Computer Science and Engineering; CGPA: 7.88 Aug 2025 - Present

Sri Valli Vilas Alaya                                           Cuddalore, Tamil Nadu
Higher Secondary Education (Class XII - CBSE); Percentage: 79.6% May 2024

Edify School Vazhappattu Neelikkupam                             Cuddalore, Tamil Nadu
Secondary Education (Class X - CBSE)                            Jun 2021 - Mar 2022
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Tharun_Raj_TP_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      id="printable-resume-container"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto print:p-0 print:static print:overflow-visible"
    >
      {/* Dark Overlay (hidden on print) */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm print:hidden print-hidden"
        onClick={() => {
          soundFx.playClick();
          onClose();
        }}
      />

      {/* Main Resume Dialog Card */}
      <div
        id="printable-resume-card"
        className="relative w-full max-w-4xl rounded-2xl bg-[#ffffff] border border-[var(--theme-border)] shadow-2xl z-10 overflow-hidden animate-in zoom-in-95 duration-200 print:border-none print:shadow-none print:max-w-none print:rounded-none"
      >
        {/* Modal Toolbar (hidden on print) */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#faf8f5] border-b border-[var(--theme-border)] print:hidden print-hidden">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[var(--theme-primary)]" />
            <h3 className="text-xs sm:text-sm font-heading font-bold text-[#1c1917] uppercase tracking-wider">
              Curriculum Vitae // {p.name}
            </h3>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleDownloadTxt}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg btn-theme-secondary text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Download clean plain text resume"
            >
              <Download size={13} className="text-[var(--theme-dark)]" />
              <span className="hidden sm:inline">Download</span> .TXT
            </button>
            <button
              onClick={handlePrint}
              className="px-3 sm:px-3.5 py-1.5 rounded-lg btn-theme-primary text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Print CV or Save Clean PDF"
            >
              <Printer size={13} />
              <span>Save as PDF / Print</span>
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-[#ffffff] hover:bg-[var(--theme-light)] text-[#57534e] hover:text-[#1c1917] border border-[var(--theme-border)] transition-colors cursor-pointer"
              title="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Resume Document — Exactly Matching Sample Layout */}
        <div
          id="printable-resume-body"
          className="p-6 sm:p-10 max-h-[82vh] overflow-y-auto bg-[#ffffff] text-[#000000] font-sans space-y-4 print:max-h-none print:overflow-visible print:p-0 print:space-y-3"
          style={{ fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}
        >
          {/* Top Header: Name & 2-Column Contact Info */}
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#000000] uppercase font-heading">
              {p.name}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 text-[12px] sm:text-[13px] text-[#000000] leading-snug pt-0.5">
              <div className="space-y-0.5">
                <div>
                  <span className="font-semibold">LinkedIn: </span>
                  <a
                    href={p.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1d4ed8] hover:underline"
                  >
                    {p.linkedin}
                  </a>
                </div>
                <div>
                  <span className="font-semibold">GitHub: </span>
                  <a
                    href={p.githubProfile || p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1d4ed8] hover:underline"
                  >
                    {p.githubProfile || p.github}
                  </a>
                </div>
              </div>

              <div className="space-y-0.5 sm:text-right">
                <div>
                  <span className="font-semibold">Email: </span>
                  <a
                    href={`mailto:${p.email}`}
                    className="text-[#1d4ed8] hover:underline"
                  >
                    {p.email}
                  </a>
                </div>
                <div>
                  <span className="font-semibold">Mobile: </span>
                  <span>{p.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 1. SKILLS SECTION */}
          <section className="space-y-1">
            <div className="border-b border-[#000000] pb-0.5">
              <h2 className="text-[13px] font-bold text-[#1e3a8a] uppercase tracking-wider font-heading">
                SKILLS
              </h2>
            </div>

            <div className="text-[11.5px] sm:text-[12px] text-[#000000] space-y-0.5 leading-relaxed">
              <div className="flex flex-wrap items-baseline gap-1">
                <span className="font-bold">• Languages:</span>
                <span>Python, SQL, JavaScript (ES6+), TypeScript, HTML5, CSS3</span>
              </div>
              <div className="flex flex-wrap items-baseline gap-1">
                <span className="font-bold">• Technologies:</span>
                <span>HTML, CSS, React, Flask, Pandas, Three.js, Tailwind CSS, Git, GitHub Actions, Canva</span>
              </div>
              <div className="flex flex-wrap items-baseline gap-1">
                <span className="font-bold">• Databases/Tools:</span>
                <span>MySQL, SQLite, Git, GitHub, Vercel, Render, VS Code</span>
              </div>
              <div className="flex flex-wrap items-baseline gap-1">
                <span className="font-bold">• Soft Skills:</span>
                <span>Problem solving, Team collaboration, Analytical thinking, Research mindset, Adaptability</span>
              </div>
            </div>
          </section>

          {/* 2. PROJECTS SECTION */}
          <section className="space-y-2">
            <div className="border-b border-[#000000] pb-0.5">
              <h2 className="text-[13px] font-bold text-[#1e3a8a] uppercase tracking-wider font-heading">
                PROJECTS
              </h2>
            </div>

            <div className="space-y-2.5 text-[11.5px] sm:text-[12px] text-[#000000]">
              {/* Project 1: GitPulse */}
              <div className="space-y-0.5">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="font-bold text-[12.5px] text-[#000000]">
                    <span>GitPulse | </span>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1d4ed8] hover:underline"
                    >
                      GitHub
                    </a>
                  </div>
                  <span className="text-[11.5px] text-[#000000] shrink-0">Jun 2026 - Jul 2026</span>
                </div>

                <ul className="space-y-0.5 pl-3.5 list-disc leading-relaxed text-[#111827]">
                  <li>
                    Built a full-stack GitHub profile analytics platform solo in 5 weeks, fetching live data through the GitHub API with pagination support for large commit histories.
                  </li>
                  <li>
                    Designed a SQLite analytics layer to calculate commit streaks, consistency scores (0–100), language detection, and repository rankings based on stars and forks.
                  </li>
                  <li>
                    Implemented multi-user side-by-side comparison with interactive React charts and a 3D interface using Three.js and React Three Fiber, deploying backend on Render and frontend on Vercel.
                  </li>
                  <li>
                    <span className="font-semibold">Tech Stack: </span>
                    <span>React, TypeScript, Python, Flask, SQLite, Tailwind CSS, Three.js, GitHub API, Vercel, Render</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. TRAINING SECTION */}
          <section className="space-y-1">
            <div className="border-b border-[#000000] pb-0.5">
              <h2 className="text-[13px] font-bold text-[#1e3a8a] uppercase tracking-wider font-heading">
                TRAINING
              </h2>
            </div>

            <div className="text-[11.5px] sm:text-[12px] text-[#000000] space-y-0.5 leading-relaxed">
              <div className="flex items-baseline justify-between gap-2">
                <div className="font-bold text-[12px] text-[#000000]">
                  <span>Microsoft AI Skills Fest | </span>
                  <span className="text-[#1d4ed8]">Certificate</span>
                </div>
                <span className="text-[11.5px] text-[#000000] shrink-0">Jun 2026 - Jul 2026</span>
              </div>
              <div className="font-semibold text-[#111827]">
                AI &amp; Data Engineering Track — Virtual Global Technical Training
              </div>
              <div className="italic text-[#374151]">
                Hands-on Trainee in AI Tools, GitHub Actions &amp; Copilot
              </div>

              <ul className="space-y-0.5 pl-3.5 list-disc text-[#111827] pt-0.5">
                <li>
                  Completed comprehensive technical modules covering Git and GitHub fundamentals, repository architecture, and product management.
                </li>
                <li>
                  Mastered secure repository practices, including automated CodeQL code scanning, secret scanning, and GitHub security policies.
                </li>
                <li>
                  Gained hands-on exposure to GitHub Actions CI/CD workflow automation, scheduled pipeline triggers, and prebuilt Microsoft 365 Copilot AI agents.
                </li>
              </ul>
            </div>
          </section>

          {/* 4. CERTIFICATES SECTION */}
          <section className="space-y-1">
            <div className="border-b border-[#000000] pb-0.5">
              <h2 className="text-[13px] font-bold text-[#1e3a8a] uppercase tracking-wider font-heading">
                CERTIFICATES
              </h2>
            </div>

            <div className="text-[11.5px] sm:text-[12px] text-[#000000] space-y-0.5">
              {PORTFOLIO_DATA.certificates.map((cert) => (
                <div key={cert.id} className="flex items-baseline justify-between gap-2">
                  <span>• {cert.title} | {cert.issuer}</span>
                  <span className="text-[11.5px] text-[#000000] shrink-0 font-medium">{cert.date}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 5. ACHIEVEMENTS SECTION */}
          <section className="space-y-1">
            <div className="border-b border-[#000000] pb-0.5">
              <h2 className="text-[13px] font-bold text-[#1e3a8a] uppercase tracking-wider font-heading">
                ACHIEVEMENTS
              </h2>
            </div>

            <div className="text-[11.5px] sm:text-[12px] text-[#000000] space-y-0.5 leading-relaxed">
              <div>
                • Solved <strong className="text-[#000000]">30+ consecutive LeetCode DSA problems</strong> daily throughout July 2026, maintaining a 100% daily solve streak.
              </div>
              <div>
                • Architected and shipped <strong className="text-[#000000]">GitPulse full-stack platform</strong> solo within a 5-week sprint with live 3D visualizers.
              </div>
              <div>
                • Maintained high academic standing with <strong className="text-[#000000]">CGPA 7.88</strong> in B.Tech CSE (AI &amp; Data Engineering) at Lovely Professional University.
              </div>
            </div>
          </section>

          {/* 6. EDUCATION SECTION */}
          <section className="space-y-1">
            <div className="border-b border-[#000000] pb-0.5">
              <h2 className="text-[13px] font-bold text-[#1e3a8a] uppercase tracking-wider font-heading">
                EDUCATION
              </h2>
            </div>

            <div className="text-[11.5px] sm:text-[12px] text-[#000000] space-y-1.5">
              {/* LPU */}
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-bold text-[12px] text-[#000000]">• Lovely Professional University</span>
                  <span className="text-[11.5px] text-[#000000] shrink-0">Phagwara, Punjab</span>
                </div>
                <div className="flex items-baseline justify-between gap-2 pl-3 text-[#111827]">
                  <span>Bachelor of Technology - Computer Science and Engineering; <strong className="text-[#000000]">CGPA: 7.88</strong></span>
                  <span className="text-[11.5px] text-[#000000] shrink-0">Aug 2025 - Present</span>
                </div>
              </div>

              {/* Sri Valli Vilas Alaya */}
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-bold text-[12px] text-[#000000]">• Sri Valli Vilas Alaya</span>
                  <span className="text-[11.5px] text-[#000000] shrink-0">Cuddalore, Tamil Nadu</span>
                </div>
                <div className="flex items-baseline justify-between gap-2 pl-3 text-[#111827]">
                  <span>Higher Secondary Education (Class XII - CBSE); <strong className="text-[#000000]">Percentage: 79.6%</strong></span>
                  <span className="text-[11.5px] text-[#000000] shrink-0">May 2024</span>
                </div>
              </div>

              {/* Edify School */}
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-bold text-[12px] text-[#000000]">• Edify School Vazhappattu Neelikkupam</span>
                  <span className="text-[11.5px] text-[#000000] shrink-0">Cuddalore, Tamil Nadu</span>
                </div>
                <div className="flex items-baseline justify-between gap-2 pl-3 text-[#111827]">
                  <span>Secondary Education (Class X - CBSE)</span>
                  <span className="text-[11.5px] text-[#000000] shrink-0">Jun 2021 - Mar 2022</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
