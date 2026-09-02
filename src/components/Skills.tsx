import React, { useState, useMemo } from 'react';
import {
  Code2,
  Brain,
  Sparkles,
  Target,
  Users,
  Zap,
  Lightbulb,
  Search,
  Cpu,
  LayoutGrid,
  ListFilter,
  X
} from 'lucide-react';
import { LeetCodeDashboard } from './LeetCodeDashboard';
import { SoftSkillsCharacter } from './SoftSkillsCharacter';
import { AlgorithmVisualizer } from './AlgorithmVisualizer';
import { getSkillLogo } from '../utils/skillIcons';
import { soundFx } from '../utils/sound';

export interface EnhancedSkill {
  name: string;
  category: string;
  level: number;
  experience: 'Intermediate' | 'Advanced' | 'Proficient' | 'Hands-On';
  brandColor: string;
  bgGlow: string;
  practicalUsage: string;
  appliedIn: string;
  tags: string[];
}

const ENHANCED_SKILLS: EnhancedSkill[] = [
  {
    name: 'Python',
    category: 'Languages',
    level: 60,
    experience: 'Intermediate',
    brandColor: '#387eb8',
    bgGlow: 'rgba(56, 126, 184, 0.14)',
    practicalUsage: 'Backend microservices, ML data pipelines, SQLite analytics & LeetCode DSA solving',
    appliedIn: 'GitPulse Backend & 30+ Day Streak',
    tags: ['Backend', 'AI/ML', 'DSA', 'ETL']
  },
  {
    name: 'SQL',
    category: 'Languages',
    level: 60,
    experience: 'Intermediate',
    brandColor: '#0284c7',
    bgGlow: 'rgba(2, 132, 199, 0.14)',
    practicalUsage: 'Relational schema design, sub-ms indexed queries, aggregations & consistency metrics',
    appliedIn: 'SQLite Analytics Layer & Data Engine',
    tags: ['Databases', 'Indexing', 'Analytics']
  },
  {
    name: 'React',
    category: 'Technologies & Frameworks',
    level: 60,
    experience: 'Intermediate',
    brandColor: '#06b6d4',
    bgGlow: 'rgba(6, 182, 212, 0.14)',
    practicalUsage: 'Component architecture, custom hooks, reactive state, Three.js 3D integration',
    appliedIn: 'GitPulse 3D UI & Portfolio System',
    tags: ['Frontend', 'Hooks', 'Components', 'SPA']
  },
  {
    name: 'TypeScript',
    category: 'Languages',
    level: 60,
    experience: 'Intermediate',
    brandColor: '#3178c6',
    bgGlow: 'rgba(49, 120, 198, 0.14)',
    practicalUsage: 'Type safety, strict interfaces, generic API models & scalable application design',
    appliedIn: 'Mainframe Portfolio & GitPulse Engine',
    tags: ['Type Safety', 'Interfaces', 'Generics']
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'Languages',
    level: 60,
    experience: 'Intermediate',
    brandColor: '#eab308',
    bgGlow: 'rgba(234, 179, 8, 0.14)',
    practicalUsage: 'Asynchronous async/await logic, DOM manipulations, Canvas rendering & event systems',
    appliedIn: 'Interactive Web Platforms & Scripts',
    tags: ['Async', 'DOM', 'Canvas', 'ES6+']
  },
  {
    name: 'HTML5 & CSS3',
    category: 'Languages',
    level: 65,
    experience: 'Intermediate',
    brandColor: '#e34f26',
    bgGlow: 'rgba(227, 79, 38, 0.14)',
    practicalUsage: 'Semantic layouts, responsive flex/grid architectures, keyframe animations & accessibility',
    appliedIn: 'All Web Interfaces & Components',
    tags: ['Semantic', 'Flexbox', 'Grid', 'Animations']
  },
  {
    name: 'Three.js & React Three Fiber',
    category: 'Technologies & Frameworks',
    level: 60,
    experience: 'Intermediate',
    brandColor: '#9333ea',
    bgGlow: 'rgba(147, 51, 234, 0.14)',
    practicalUsage: '3D WebGL interactive commit topology, node clustering, shaders & camera orbit controls',
    appliedIn: 'GitPulse 3D Topology Visualizer',
    tags: ['3D Graphics', 'WebGL', 'Shaders', 'Topology']
  },
  {
    name: 'Flask',
    category: 'Technologies & Frameworks',
    level: 60,
    experience: 'Intermediate',
    brandColor: '#1c1917',
    bgGlow: 'rgba(28, 25, 23, 0.12)',
    practicalUsage: 'Python RESTful API endpoints, GitHub API scraping, CORS routing & analytical services',
    appliedIn: 'GitPulse Cloud Microservice',
    tags: ['REST APIs', 'Python', 'Routing', 'CORS']
  },
  {
    name: 'Pandas',
    category: 'Technologies & Frameworks',
    level: 60,
    experience: 'Intermediate',
    brandColor: '#150458',
    bgGlow: 'rgba(21, 4, 88, 0.14)',
    practicalUsage: 'DataFrame transformations, time-series analysis, statistical metrics & data cleaning',
    appliedIn: 'AI & Data Engineering Pipeline',
    tags: ['DataFrames', 'Data Cleaning', 'Analysis']
  },
  {
    name: 'Tailwind CSS',
    category: 'Technologies & Frameworks',
    level: 65,
    experience: 'Intermediate',
    brandColor: '#0ea5e9',
    bgGlow: 'rgba(14, 165, 233, 0.14)',
    practicalUsage: 'Utility-first modern styling, dark/light themes, fluid typography & glassmorphism UI',
    appliedIn: 'All Modern Frontend Architectures',
    tags: ['Utility CSS', 'Glassmorphism', 'Themes']
  },
  {
    name: 'SQLite',
    category: 'Databases & Tools',
    level: 60,
    experience: 'Intermediate',
    brandColor: '#003b57',
    bgGlow: 'rgba(0, 59, 87, 0.14)',
    practicalUsage: 'Lightweight embedded storage, commit streak calculations & 0–100 consistency engine',
    appliedIn: 'GitPulse 0–100 Consistency Layer',
    tags: ['Embedded DB', 'Streak Engine', 'Caching']
  },
  {
    name: 'MySQL',
    category: 'Databases & Tools',
    level: 60,
    experience: 'Intermediate',
    brandColor: '#00758f',
    bgGlow: 'rgba(0, 117, 143, 0.14)',
    practicalUsage: 'Relational database schema normalization, multi-table joins & transaction integrity',
    appliedIn: 'Academic Coursework & Projects @ LPU',
    tags: ['RDBMS', 'Normalization', 'Joins']
  },
  {
    name: 'Git',
    category: 'Databases & Tools',
    level: 65,
    experience: 'Intermediate',
    brandColor: '#f05032',
    bgGlow: 'rgba(240, 80, 50, 0.14)',
    practicalUsage: 'Branching models, merge conflict resolution, rebase workflows & version history',
    appliedIn: 'Microsoft AI Fest & Daily Regimen',
    tags: ['VCS', 'Branching', 'Rebase', 'Workflows']
  },
  {
    name: 'GitHub & GitHub Actions',
    category: 'Databases & Tools',
    level: 65,
    experience: 'Intermediate',
    brandColor: '#24292f',
    bgGlow: 'rgba(36, 41, 47, 0.12)',
    practicalUsage: 'Automated CI/CD pipelines, secret scanning, repository security & release workflows',
    appliedIn: '3x Microsoft Fest Certified',
    tags: ['CI/CD', 'Automation', 'Workflows', 'Security']
  },
  {
    name: 'Vercel & Render',
    category: 'Databases & Tools',
    level: 60,
    experience: 'Intermediate',
    brandColor: '#000000',
    bgGlow: 'rgba(0, 0, 0, 0.12)',
    practicalUsage: 'Edge CDN frontend hosting, Python web service deployment, SSL & environment keys',
    appliedIn: 'GitPulse Full-Stack Live Production',
    tags: ['Cloud', 'Production', 'Edge CDN', 'Hosting']
  },
  {
    name: 'Canva',
    category: 'Databases & Tools',
    level: 60,
    experience: 'Intermediate',
    brandColor: '#00c4cc',
    bgGlow: 'rgba(0, 196, 204, 0.14)',
    practicalUsage: 'Technical presentation decks, visual asset generation & architecture diagrams',
    appliedIn: 'Project Graphics & UI Blueprints',
    tags: ['Visual Design', 'Diagrams', 'Assets']
  }
];

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [levelFilter, setLevelFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'cards' | 'compact'>('cards');
  const [copiedSkill, setCopiedSkill] = useState<string | null>(null);

  const categories = ['All', 'Languages', 'Technologies & Frameworks', 'Databases & Tools'];

  const filteredSkills = useMemo(() => {
    return ENHANCED_SKILLS.filter((s) => {
      const matchCategory = activeCategory === 'All' || s.category === activeCategory;
      const matchLevel =
        levelFilter === 'All' ||
        s.experience === levelFilter;
      const matchSearch =
        searchQuery.trim() === '' ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.practicalUsage.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.appliedIn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCategory && matchLevel && matchSearch;
    });
  }, [activeCategory, levelFilter, searchQuery]);

  const handleCardClick = (skill: EnhancedSkill) => {
    soundFx.playClick();
    setCopiedSkill(skill.name);
    setTimeout(() => setCopiedSkill(null), 1800);
  };

  const getFallbackIcon = (name: string) => {
    const norm = name.toLowerCase();
    if (norm.includes('analytical')) return <Brain size={22} className="text-[var(--theme-dark)]" />;
    if (norm.includes('problem')) return <Zap size={22} className="text-[var(--theme-dark)]" />;
    if (norm.includes('team') || norm.includes('collaboration')) return <Users size={22} className="text-[var(--theme-dark)]" />;
    if (norm.includes('research')) return <Lightbulb size={22} className="text-[var(--theme-dark)]" />;
    return <Target size={22} className="text-[var(--theme-dark)]" />;
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 page-fade-in">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--theme-light)] border border-[var(--theme-border)] text-xs font-bold text-[var(--theme-dark)] shadow-xs">
          <Code2 size={14} className="text-[var(--theme-primary)]" />
          <span>TECHNICAL ARSENAL &amp; DSA RIGOR</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#1c1917]">
          Skills &amp; <span className="text-gradient-theme">Technical Proficiencies</span>
        </h2>
        <p className="text-sm sm:text-base text-[#57534e] max-w-2xl mx-auto">
          Production-tested languages, databases, 3D visualizers, and framework tools with proven real-world execution.
        </p>

        {/* Quick Tech Metrics Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-4">
          {[
            { label: 'Core Technologies', val: '16+ Tools', desc: 'React, Flask, SQL, Three.js' },
            { label: 'LeetCode Streak', val: '30+ Days', desc: 'July 2026 Daily Rigor' },
            { label: 'Academic Standing', val: 'CGPA 7.88', desc: 'B.Tech CSE (AI & Data) @ LPU' },
            { label: 'Verified Certs', val: '3x Microsoft', desc: 'Git, GitHub & CI/CD Fest' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-[#ffffff] border border-[var(--theme-border)] shadow-xs hover:border-[var(--theme-primary)] transition-all hover:-translate-y-0.5 text-left"
            >
              <div className="text-sm sm:text-base font-heading font-bold text-[#1c1917]">
                {item.val}
              </div>
              <div className="text-[11px] font-semibold text-[var(--theme-dark)]">
                {item.label}
              </div>
              <div className="text-[10px] text-[#78716c] truncate">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 1. Core Technical Skills Section with High-End Attractive UI/UX */}
      <div className="space-y-6">
        {/* Controls Bar: Category Pills + Search + Level Filter + View Switcher */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#ffffff] border border-[var(--theme-border)] shadow-md space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#1c1917] flex items-center gap-2">
                <Sparkles size={20} className="text-[var(--theme-primary)]" />
                <span>Core Stack &amp; Technologies</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[var(--theme-light)] text-[var(--theme-dark)] border border-[var(--theme-border)] font-mono font-bold">
                  {filteredSkills.length} of {ENHANCED_SKILLS.length}
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-[#78716c] mt-0.5">
                Explore production capabilities, practical use cases, and applied project architectures.
              </p>
            </div>

            {/* View Mode & Level Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Level Filter Dropdown */}
              <div className="flex items-center gap-1 bg-[#faf8f5] p-1 rounded-xl border border-[var(--theme-border)] text-xs">
                {['All', 'Intermediate'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      soundFx.playClick();
                      setLevelFilter(lvl);
                    }}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                      levelFilter === lvl
                        ? 'bg-[var(--theme-light)] text-[var(--theme-dark)] border border-[var(--theme-border)] font-bold shadow-xs'
                        : 'text-[#78716c] hover:text-[#1c1917]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>

              {/* View Switcher */}
              <div className="flex items-center gap-1 bg-[#faf8f5] p-1 rounded-xl border border-[var(--theme-border)]">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setViewMode('cards');
                  }}
                  title="Detailed Cards View"
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === 'cards'
                      ? 'bg-[var(--theme-light)] text-[var(--theme-dark)] border border-[var(--theme-border)] shadow-xs'
                      : 'text-[#a8a29e] hover:text-[#1c1917]'
                  }`}
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setViewMode('compact');
                  }}
                  title="Compact Matrix View"
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === 'compact'
                      ? 'bg-[var(--theme-light)] text-[var(--theme-dark)] border border-[var(--theme-border)] shadow-xs'
                      : 'text-[#a8a29e] hover:text-[#1c1917]'
                  }`}
                >
                  <ListFilter size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Search Bar & Category Filter Pills */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-3 border-t border-[var(--theme-border)]">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {categories.map((cat) => {
                const count =
                  cat === 'All'
                    ? ENHANCED_SKILLS.length
                    : ENHANCED_SKILLS.filter((s) => s.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      soundFx.playClick();
                      setActiveCategory(cat);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      activeCategory === cat
                        ? 'btn-theme-primary shadow-xs'
                        : 'bg-[#faf8f5] border border-[var(--theme-border)] text-[#57534e] hover:text-[#1c1917] hover:border-[var(--theme-primary)]'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-black/10">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Interactive Search Input */}
            <div className="relative w-full md:w-72">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter stack (e.g. React, Python)..."
                className="w-full pl-9 pr-8 py-1.5 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)] text-xs text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:border-[var(--theme-primary)] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#a8a29e] hover:text-[#1c1917] cursor-pointer"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Empty state when search produces 0 results */}
        {filteredSkills.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-[#ffffff] border border-[var(--theme-border)] space-y-3">
            <Search size={32} className="mx-auto text-[#a8a29e]" />
            <h4 className="text-base font-heading font-bold text-[#1c1917]">
              No technologies matched "{searchQuery}"
            </h4>
            <p className="text-xs text-[#78716c]">
              Try searching by technology name, category, or project (e.g. Python, SQL, GitPulse).
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
                setLevelFilter('All');
              }}
              className="px-4 py-1.5 rounded-xl btn-theme-primary text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* 1A. DETAILED CARDS VIEW (Elevated Premium UI/UX) */}
        {viewMode === 'cards' && filteredSkills.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSkills.map((skill) => {
              const logo = getSkillLogo(skill.name, 28);
              const isCopied = copiedSkill === skill.name;

              return (
                <div
                  key={skill.name}
                  onClick={() => handleCardClick(skill)}
                  className="relative rounded-3xl bg-[#ffffff] border border-[var(--theme-border)] hover:border-[var(--theme-primary)] transition-all duration-300 hover:-translate-y-1.5 group shadow-xs hover:shadow-xl flex flex-col justify-between overflow-hidden cursor-pointer"
                >
                  {/* Top Glowing Ambient Light Bar */}
                  <div
                    className="h-1.5 w-full transition-all duration-500 group-hover:h-2"
                    style={{ backgroundColor: skill.brandColor }}
                  />

                  {/* Dynamic Brand Color Subtle Radial Glow on Hover */}
                  <div
                    className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-2xl opacity-0 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none"
                    style={{ backgroundColor: skill.brandColor }}
                  />

                  <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between relative z-10">
                    {/* Top Row: Authentic Logo, Name & Experience Tag */}
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          {/* Elevated Authentic Logo Frame */}
                          <div
                            className="w-12 h-12 rounded-2xl bg-[#faf8f5] border border-[var(--theme-border)] group-hover:border-transparent flex items-center justify-center shadow-xs group-hover:scale-108 transition-all duration-300 shrink-0"
                            style={{
                              boxShadow: `0 4px 12px ${skill.bgGlow}`
                            }}
                          >
                            {logo || getFallbackIcon(skill.name)}
                          </div>

                          <div>
                            <h4 className="font-heading font-bold text-base sm:text-lg text-[#1c1917] group-hover:text-[var(--theme-dark)] transition-colors leading-tight">
                              {skill.name}
                            </h4>
                            <span className="text-[11px] text-[#78716c] font-medium">
                              {skill.category}
                            </span>
                          </div>
                        </div>

                        {/* Experience Level Pill */}
                        <span className="text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border shadow-xs shrink-0 bg-[var(--theme-light)] text-[var(--theme-dark)] border-[var(--theme-border)]">
                          {skill.experience}
                        </span>
                      </div>

                      {/* Practical Capabilities Description */}
                      <p className="text-xs text-[#57534e] leading-relaxed line-clamp-2 min-h-[32px]">
                        {skill.practicalUsage}
                      </p>
                    </div>

                    {/* Applied In Real-World Project Callout Tag */}
                    <div className="space-y-3 pt-2">
                      <div className="p-2.5 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)] flex items-center justify-between gap-2 text-[11px]">
                        <div className="flex items-center gap-1.5 truncate text-[#57534e]">
                          <Cpu size={13} className="shrink-0 text-[var(--theme-primary)]" />
                          <span className="truncate font-semibold text-[#1c1917]">
                            {skill.appliedIn}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-[var(--theme-dark)] shrink-0">
                          {isCopied ? '✓ ACTIVE' : 'APPLIED'}
                        </span>
                      </div>

                      {/* Proficiency Indicator Gauge */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-[#78716c] text-[11px]">Technical Competency</span>
                          <span className="font-mono font-bold text-[#1c1917]">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Animated Gradient Bar with Glowing Dot */}
                        <div className="h-2 w-full bg-[#faf8f5] rounded-full overflow-hidden p-0.5 border border-[var(--theme-border)] relative">
                          <div
                            className="h-full rounded-full transition-all duration-700 ease-out"
                            style={{
                              width: `${skill.level}%`,
                              background: `linear-gradient(90deg, var(--theme-primary) 0%, ${skill.brandColor} 100%)`
                            }}
                          />
                        </div>
                      </div>

                      {/* Micro Tags */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {skill.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-[#ffffff] border border-[var(--theme-border)] text-[#78716c] font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 1B. COMPACT MATRIX VIEW */}
        {viewMode === 'compact' && filteredSkills.length > 0 && (
          <div className="rounded-3xl bg-[#ffffff] border border-[var(--theme-border)] overflow-hidden shadow-md divide-y divide-[var(--theme-border)]">
            {filteredSkills.map((skill) => {
              const logo = getSkillLogo(skill.name, 22);
              return (
                <div
                  key={skill.name}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#faf8f5] transition-colors"
                >
                  <div className="flex items-center gap-3 sm:w-1/3">
                    <div className="w-10 h-10 rounded-xl bg-[#ffffff] border border-[var(--theme-border)] flex items-center justify-center shadow-xs shrink-0">
                      {logo || getFallbackIcon(skill.name)}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm sm:text-base text-[#1c1917]">
                        {skill.name}
                      </h4>
                      <span className="text-[11px] text-[#78716c]">{skill.category}</span>
                    </div>
                  </div>

                  <div className="text-xs text-[#57534e] sm:w-1/3 leading-relaxed">
                    <span className="font-semibold text-[#1c1917]">Applied in:</span> {skill.appliedIn}
                  </div>

                  <div className="flex items-center gap-4 sm:w-1/4 justify-between sm:justify-end">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase bg-[var(--theme-light)] text-[var(--theme-dark)] border border-[var(--theme-border)]">
                      {skill.experience}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#1c1917]">
                      {skill.level}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Interactive Soft Skills Animated Character Showcase */}
      <div className="pt-8 border-t border-[var(--theme-border)]">
        <SoftSkillsCharacter />
      </div>

      {/* 3. LeetCode Problem Solving Hub */}
      <div className="space-y-6 pt-8 border-t border-[var(--theme-border)]">
        <div className="flex items-center gap-2">
          <Brain size={22} className="text-[var(--theme-dark)]" />
          <h3 className="text-2xl font-heading font-bold text-[#1c1917]">
            LeetCode &amp; Algorithmic Rigor (30+ Day Daily Streak)
          </h3>
        </div>
        <LeetCodeDashboard />
      </div>

      {/* 4. Interactive Algorithm Visualizer & DSA Sandbox */}
      <div className="space-y-6 pt-8 border-t border-[var(--theme-border)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles size={22} className="text-[var(--theme-primary)]" />
            <h3 className="text-2xl font-heading font-bold text-[#1c1917]">
              Interactive Algorithm Visualizer &amp; Sandbox
            </h3>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[var(--theme-light)] text-[var(--theme-dark)] border border-[var(--theme-border)] w-fit">
            LIVE SYNTHESIZER AUDIO &amp; STEP ENGINE
          </span>
        </div>
        <AlgorithmVisualizer />
      </div>
    </div>
  );
};

export default Skills;

