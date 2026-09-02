import React, { useState, useMemo } from 'react';
import {
  Calendar,
  GraduationCap,
  Trophy,
  Sparkles,
  CheckCircle2,
  MapPin,
  Award,
  Rocket
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundFx } from '../utils/sound';

export const Timeline: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('All');

  const filterOptions = [
    { id: 'All', label: 'All Milestones', count: PORTFOLIO_DATA.timeline.length },
    { id: 'Education', label: '🎓 Education', count: PORTFOLIO_DATA.timeline.filter((i) => i.type === 'Education').length },
    { id: 'Milestone', label: '🚀 Builds & Systems', count: PORTFOLIO_DATA.timeline.filter((i) => i.type === 'Milestone').length },
    { id: 'Achievement', label: '🏆 Achievements', count: PORTFOLIO_DATA.timeline.filter((i) => i.type === 'Achievement').length },
    { id: 'Certification', label: '📜 Certifications', count: PORTFOLIO_DATA.timeline.filter((i) => i.type === 'Certification').length },
  ];

  const filteredItems = useMemo(() => {
    if (filterType === 'All') return PORTFOLIO_DATA.timeline;
    return PORTFOLIO_DATA.timeline.filter((item) => item.type === filterType);
  }, [filterType]);

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'Education':
        return { bg: 'bg-[#ecfdf5]', text: 'text-[#15803d]', border: 'border-[#16a34a]', glow: 'rgba(22, 163, 74, 0.25)' };
      case 'Milestone':
        return { bg: 'bg-[var(--theme-light)]', text: 'text-[var(--theme-dark)]', border: 'border-[var(--theme-primary)]', glow: 'var(--theme-glow)' };
      case 'Achievement':
        return { bg: 'bg-[#fffbeb]', text: 'text-[#d97706]', border: 'border-[#f59e0b]', glow: 'rgba(245, 158, 11, 0.25)' };
      case 'Certification':
        return { bg: 'bg-[#f5f3ff]', text: 'text-[#7c3aed]', border: 'border-[#8b5cf6]', glow: 'rgba(139, 92, 246, 0.25)' };
      default:
        return { bg: 'bg-[#faf8f5]', text: 'text-[#57534e]', border: 'border-[#e8decb]', glow: 'rgba(0, 0, 0, 0.05)' };
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--theme-light)] border border-[var(--theme-border)] text-xs font-bold text-[var(--theme-dark)] shadow-xs">
          <Calendar size={14} className="text-[var(--theme-primary)]" />
          <span>CAREER TRAJECTORY &amp; ROADMAP</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#1c1917]">
          Academic &amp; Engineering <span className="text-gradient-theme">Milestones</span>
        </h2>
        <p className="text-sm text-[#57534e] max-w-xl mx-auto">
          Chronological progression across B.Tech CSE coursework (CGPA 7.88), full-stack project builds, Microsoft certifications, and competitive daily problem solving.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                soundFx.playClick();
                setFilterType(opt.id);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                filterType === opt.id
                  ? 'btn-theme-primary shadow-xs'
                  : 'bg-[#ffffff] border border-[var(--theme-border)] text-[#57534e] hover:text-[#1c1917] hover:border-[var(--theme-primary)]'
              }`}
            >
              <span>{opt.label}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-black/10">
                {opt.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative border-l-2 border-[var(--theme-border)] ml-4 sm:ml-8 space-y-8">
        {filteredItems.map((item, index) => {
          const colors = getNodeColor(item.type);

          return (
            <div key={index} className="relative pl-6 sm:pl-9 group">
              {/* Timeline Node Icon with Glowing Aura */}
              <div
                className={`absolute -left-[19px] top-1.5 flex items-center justify-center w-9 h-9 rounded-full bg-[#ffffff] border-2 ${colors.border} ${colors.text} group-hover:scale-115 transition-all shadow-md`}
                style={{
                  boxShadow: `0 0 14px ${colors.glow}`
                }}
              >
                {item.type === 'Education' ? (
                  <GraduationCap size={16} />
                ) : item.type === 'Achievement' ? (
                  <Trophy size={16} />
                ) : item.type === 'Certification' ? (
                  <Award size={16} />
                ) : item.type === 'Milestone' ? (
                  <Rocket size={16} />
                ) : (
                  <Sparkles size={16} />
                )}
              </div>

              {/* Content Card with Ambient Hover Glow */}
              <div className="relative rounded-3xl bg-[#ffffff] border border-[var(--theme-border)] hover:border-[var(--theme-primary)] transition-all duration-300 group-hover:-translate-y-1 p-6 sm:p-7 space-y-4 shadow-xs hover:shadow-xl overflow-hidden">
                {/* Top Subtle Stripe */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: colors.border.replace('border-', '') }}
                />

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[var(--theme-light)] text-[var(--theme-dark)] border border-[var(--theme-border)] text-xs font-bold font-mono shadow-xs">
                      {item.year}
                    </span>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${colors.bg} ${colors.text} border`}>
                      {item.type}
                    </span>
                  </div>

                  <span className="text-xs text-[#78716c] font-medium flex items-center gap-1">
                    <MapPin size={13} className="text-[var(--theme-dark)]" />
                    {item.location}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-heading font-extrabold text-[#1c1917] group-hover:text-[var(--theme-dark)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-[var(--theme-dark)] mt-0.5 flex items-center gap-1.5">
                    <span>{item.organization}</span>
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed">
                  {item.description}
                </p>

                {/* Bullet highlights */}
                <div className="space-y-2 pt-2 border-t border-[var(--theme-border)]">
                  {item.highlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#57534e] font-medium">
                      <CheckCircle2 size={14} className="text-[#16a34a] shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;

