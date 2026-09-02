import React from 'react';
import {
  Code2,
  ExternalLink,
  Flame,
  Target,
  BarChart3,
  Calendar
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundFx } from '../utils/sound';
import { getAssetUrl } from '../utils/assetPath';

export const LeetCodeDashboard: React.FC = () => {
  const stats = PORTFOLIO_DATA.leetcodeStats;

  return (
    <div className="space-y-8">
      {/* Main Stats Card Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Overall LeetCode Badge & Metrics */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#ffffff] border border-[var(--theme-border)] shadow-md flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[var(--theme-light)] border border-[var(--theme-border)] text-[var(--theme-dark)]">
                  <Code2 size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-[#1c1917]">
                    LeetCode Profile
                  </h3>
                  <p className="text-xs font-mono text-[var(--theme-dark)] font-semibold">
                    @_Tharun_13
                  </p>
                </div>
              </div>

              <a
                href={PORTFOLIO_DATA.personal.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="px-3 py-1.5 rounded-lg bg-[var(--theme-light)] hover:bg-[var(--theme-border)] border border-[var(--theme-border)] text-[var(--theme-dark)] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Profile</span>
                <ExternalLink size={12} />
              </a>
            </div>

            {/* Big Total Solved Display with Graphic Showcase */}
            <div className="relative rounded-2xl overflow-hidden border border-[var(--theme-border)] bg-[#1c1917] text-white shadow-md group">
              <img
                src={getAssetUrl('leetcode_graphic.jpg')}
                alt="LeetCode DSA Visualization"
                className="w-full h-36 object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917] via-[#1c1917]/70 to-transparent flex flex-col justify-end p-4">
                <div className="text-3xl sm:text-4xl font-heading font-extrabold text-[var(--theme-primary)]">
                  {stats.totalSolved}
                </div>
                <div className="text-[11px] font-mono text-[#a8a29e] uppercase tracking-widest font-bold">
                  Consecutive Daily Problems • {stats.monthBadge}
                </div>
              </div>
            </div>

            {/* Habit & Discipline Callout */}
            <div className="p-4 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)] space-y-2">
              <div className="flex items-center gap-2 text-[var(--theme-dark)] text-xs font-bold">
                <Calendar size={15} />
                <span>STRUCTURED LEARNING DISCIPLINE</span>
              </div>
              <p className="text-xs text-[#57534e] leading-relaxed">
                {stats.description}
              </p>
            </div>
          </div>

          {/* Active Streak */}
          <div className="p-4 rounded-xl bg-[var(--theme-light)] border border-[var(--theme-border)] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2 text-[#d97706]">
              <Flame size={20} className="animate-bounce text-[#d97706]" />
              <span className="text-xs font-bold">DAILY STREAK RECORD</span>
            </div>
            <span className="text-sm font-bold text-[#1c1917]">30+ Days Consecutive</span>
          </div>
        </div>

        {/* Right: Breakdown by Difficulty & Algorithmic Topics */}
        <div className="lg:col-span-7 space-y-6">
          {/* Difficulty Tiers Breakdown */}
          <div className="p-6 rounded-2xl bg-[#ffffff] border border-[var(--theme-border)] shadow-md space-y-5">
            <h3 className="text-base font-heading font-bold text-[#1c1917] flex items-center gap-2">
              <BarChart3 size={18} className="text-[var(--theme-dark)]" />
              <span>Core Problem-Solving Distribution</span>
            </h3>

            <div className="space-y-4">
              {/* Easy */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#15803d] font-bold">Foundational &amp; Warmup Problems</span>
                  <span className="text-[#57534e] font-medium">
                    <strong className="text-[#15803d]">{stats.breakdown.easy.solved}</strong> / {stats.breakdown.easy.total}
                  </span>
                </div>
                <div className="h-2.5 w-full bg-[#faf8f5] rounded-full overflow-hidden border border-[var(--theme-border)]">
                  <div
                    className="h-full bg-[#16a34a] rounded-full"
                    style={{ width: `${(stats.breakdown.easy.solved / stats.breakdown.easy.total) * 100}%` }}
                  />
                </div>
              </div>

              {/* Medium */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[var(--theme-dark)] font-bold">Algorithmic &amp; Pattern-Heavy Problems</span>
                  <span className="text-[#57534e] font-medium">
                    <strong className="text-[var(--theme-dark)]">{stats.breakdown.medium.solved}</strong> / {stats.breakdown.medium.total}
                  </span>
                </div>
                <div className="h-2.5 w-full bg-[#faf8f5] rounded-full overflow-hidden border border-[var(--theme-border)]">
                  <div
                    className="h-full bg-[var(--theme-primary)] rounded-full"
                    style={{ width: `${(stats.breakdown.medium.solved / stats.breakdown.medium.total) * 100}%` }}
                  />
                </div>
              </div>

              {/* Hard */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#b91c1c] font-bold">Complex Optimization &amp; Edge Cases</span>
                  <span className="text-[#57534e] font-medium">
                    <strong className="text-[#b91c1c]">{stats.breakdown.hard.solved}</strong> / {stats.breakdown.hard.total}
                  </span>
                </div>
                <div className="h-2.5 w-full bg-[#faf8f5] rounded-full overflow-hidden border border-[var(--theme-border)]">
                  <div
                    className="h-full bg-[#ef4444] rounded-full"
                    style={{ width: `${(stats.breakdown.hard.solved / stats.breakdown.hard.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Top Algorithmic Categories */}
          <div className="p-6 rounded-2xl bg-[#ffffff] border border-[var(--theme-border)] shadow-md space-y-4">
            <h3 className="text-base font-heading font-bold text-[#1c1917] flex items-center gap-2">
              <Target size={18} className="text-[var(--theme-dark)]" />
              <span>DSA Patterns Under Continuous Practice</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stats.topCategories.map((cat, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)] flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-[#1c1917]">{cat.name}</div>
                    <div className="text-[11px] text-[var(--theme-dark)] font-semibold">
                      Pattern: {cat.count}
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--theme-light)] text-[var(--theme-dark)] border border-[var(--theme-border)] font-bold">
                    {cat.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

