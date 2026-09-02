import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sparkles,
  Search,
  Activity,
  Flame,
  Star,
  GitFork,
  Users,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { soundFx } from '../utils/sound';
import { getAssetUrl } from '../utils/assetPath';

interface GitHubProfileData {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  consistencyScore: number;
  streakDays: number;
  topLanguages: { name: string; percentage: number; color: string }[];
  topRepos: { name: string; stars: number; forks: number; language: string; url: string }[];
}

const PRESET_PROFILES: Record<string, GitHubProfileData> = {
  TP200613: {
    login: 'TP200613',
    name: 'Tharun Raj T P',
    avatar_url: getAssetUrl('tharun.png'),
    bio: 'B.Tech CSE (AI & Data Engineering) @ LPU | Full-Stack & GitPulse Creator',
    public_repos: 14,
    followers: 18,
    following: 22,
    created_at: '2024-01-15',
    consistencyScore: 94,
    streakDays: 32,
    topLanguages: [
      { name: 'Python', percentage: 42, color: '#b8860b' },
      { name: 'TypeScript / React', percentage: 34, color: '#8c6721' },
      { name: 'SQL & Data', percentage: 16, color: '#16a34a' },
      { name: 'Other', percentage: 8, color: '#d97706' },
    ],
    topRepos: [
      { name: 'GitPulse-Analytics-Platform', stars: 24, forks: 8, language: 'Python / Flask', url: 'https://github.com/TP200613' },
      { name: 'Leetcode-Daily-Solutions-Vault', stars: 19, forks: 6, language: 'Python / C++', url: 'https://github.com/TP200613/Leetcode' },
      { name: 'AI-Data-Pipelines', stars: 12, forks: 3, language: 'Python / SQL', url: 'https://github.com/TP200613' },
    ],
  },
  torvalds: {
    login: 'torvalds',
    name: 'Linus Torvalds',
    avatar_url: 'https://avatars.githubusercontent.com/u/1024025?v=4',
    bio: 'Creator of Linux and Git',
    public_repos: 6,
    followers: 240000,
    following: 0,
    created_at: '2011-09-03',
    consistencyScore: 98,
    streakDays: 180,
    topLanguages: [
      { name: 'C', percentage: 88, color: '#b8860b' },
      { name: 'Shell', percentage: 8, color: '#8c6721' },
      { name: 'Makefile', percentage: 4, color: '#78716c' },
    ],
    topRepos: [
      { name: 'linux', stars: 185000, forks: 54000, language: 'C', url: 'https://github.com/torvalds/linux' },
      { name: 'subsurface-for-dir', stars: 1400, forks: 420, language: 'C++', url: 'https://github.com/torvalds' },
    ],
  },
  shadcn: {
    login: 'shadcn',
    name: 'shadcn',
    avatar_url: 'https://avatars.githubusercontent.com/u/124599?v=4',
    bio: 'Building UI components and modern web tools.',
    public_repos: 32,
    followers: 85000,
    following: 40,
    created_at: '2012-05-10',
    consistencyScore: 96,
    streakDays: 64,
    topLanguages: [
      { name: 'TypeScript', percentage: 76, color: '#b8860b' },
      { name: 'JavaScript', percentage: 18, color: '#d97706' },
      { name: 'CSS', percentage: 6, color: '#8c6721' },
    ],
    topRepos: [
      { name: 'ui', stars: 72000, forks: 6200, language: 'TypeScript', url: 'https://github.com/shadcn/ui' },
      { name: 'taxonomy', stars: 18000, forks: 2400, language: 'TypeScript', url: 'https://github.com/shadcn' },
    ],
  },
};

export const GitPulseSimulator: React.FC = () => {
  const [username, setUsername] = useState('TP200613');
  const [profile, setProfile] = useState<GitHubProfileData>(PRESET_PROFILES.TP200613);
  const [compareProfile, setCompareProfile] = useState<GitHubProfileData | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | '3d-mesh' | 'repos'>('overview');

  const canvas3dRef = useRef<HTMLCanvasElement | null>(null);

  // 3D Canvas Animation in Warm Sandalwood Gold Tones
  useEffect(() => {
    if (activeTab !== '3d-mesh') return;
    const canvas = canvas3dRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = 320);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 320;
    };
    window.addEventListener('resize', handleResize);

    const nodeCount = 65;
    const nodes: { x: number; y: number; z: number; origX: number; origY: number; origZ: number }[] = [];
    const radius = 105;

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      nodes.push({ x, y, z, origX: x, origY: y, origZ: z });
    }

    // Read current theme color from CSS variables or document attribute
    const themePrimary = getComputedStyle(document.documentElement).getPropertyValue('--theme-primary').trim() || '#4A0E17';
    const cleanHex = themePrimary.startsWith('#') ? themePrimary.replace('#', '') : '4A0E17';
    const r = parseInt(cleanHex.substring(0, 2), 16) || 74;
    const g = parseInt(cleanHex.substring(2, 4), 16) || 14;
    const b = parseInt(cleanHex.substring(4, 6), 16) || 23;

    let angleX = 0;
    let angleY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      angleX += 0.005;
      angleY += 0.008;

      const cx = width / 2;
      const cy = height / 2;

      const projected = nodes.map((node) => {
        const x1 = node.origX * Math.cos(angleY) + node.origZ * Math.sin(angleY);
        const z1 = -node.origX * Math.sin(angleY) + node.origZ * Math.cos(angleY);

        const y2 = node.origY * Math.cos(angleX) - z1 * Math.sin(angleX);
        const z2 = node.origY * Math.sin(angleX) + z1 * Math.cos(angleX);

        const fov = 300;
        const scale = fov / (fov + z2);
        const x2d = x1 * scale + cx;
        const y2d = y2 * scale + cy;

        return { x: x2d, y: y2d, z: z2, scale };
      });

      // Draw connecting lines in dynamic theme colors
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < 48) {
            const alpha = (1 - dist / 48) * (p1.z > 0 ? 0.45 : 0.18);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes in glowing theme colors
      projected.forEach((p) => {
        const size = Math.max(1, p.scale * 2.5);
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        const alpha = p.z > 0 ? 0.95 : 0.4;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();
      });

      // Central core glow
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 110);
      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.25)`);
      grad.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, 0.05)`);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 110, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [activeTab]);

  const analyzeUser = useCallback(async (targetUser: string, isCompare = false) => {
    const cleanUser = targetUser.trim();
    if (!cleanUser) return;

    soundFx.playClick();
    setLoading(true);

    if (PRESET_PROFILES[cleanUser]) {
      setTimeout(() => {
        if (isCompare) {
          setCompareProfile(PRESET_PROFILES[cleanUser]);
        } else {
          setProfile(PRESET_PROFILES[cleanUser]);
        }
        setLoading(false);
        soundFx.playSuccess();
      }, 350);
      return;
    }

    try {
      const encodedUser = encodeURIComponent(cleanUser);
      const res = await fetch(`https://api.github.com/users/${encodedUser}`);
      if (!res.ok) throw new Error('User not found');
      const data = await res.json();

      const reposRes = await fetch(`https://api.github.com/users/${encodedUser}/repos?sort=updated&per_page=6`);
      const reposData = reposRes.ok ? await reposRes.json() : [];

      const topRepos = (Array.isArray(reposData) ? reposData : [])
        .slice(0, 3)
        .map((r: { name: string; stargazers_count: number; forks_count: number; language: string; html_url: string }) => ({
          name: r.name,
          stars: r.stargazers_count || 0,
          forks: r.forks_count || 0,
          language: r.language || 'Code',
          url: r.html_url || `https://github.com/${encodedUser}`,
        }));

      const calculatedScore = Math.min(99, Math.max(65, Math.floor(data.public_repos * 2.5 + (data.followers || 1) * 0.5 + 60)));

      const newProfile: GitHubProfileData = {
        login: data.login,
        name: data.name || data.login,
        avatar_url: data.avatar_url,
        bio: data.bio || 'Developer on GitHub',
        public_repos: data.public_repos,
        followers: data.followers,
        following: data.following,
        created_at: data.created_at?.split('T')[0] || '2024-01-01',
        consistencyScore: calculatedScore,
        streakDays: Math.floor(Math.random() * 25) + 12,
        topLanguages: [
          { name: 'JavaScript / TS', percentage: 55, color: '#b8860b' },
          { name: 'Python', percentage: 30, color: '#8c6721' },
          { name: 'Other', percentage: 15, color: '#d97706' },
        ],
        topRepos: topRepos.length > 0 ? topRepos : [
          { name: `${cleanUser}-project`, stars: 5, forks: 1, language: 'Python', url: `https://github.com/${encodedUser}` }
        ],
      };

      if (isCompare) {
        setCompareProfile(newProfile);
      } else {
        setProfile(newProfile);
      }
      soundFx.playSuccess();
    } catch {
      if (!isCompare) {
        setProfile(PRESET_PROFILES.TP200613);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* Search & Preset Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#ffffff] border border-[var(--theme-border)] shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[var(--theme-border)]">
          <div className="relative flex-1 w-full max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78716c]" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && analyzeUser(username)}
              placeholder="Search GitHub username (e.g. TP200613, torvalds)..."
              className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)] text-sm text-[#1c1917] placeholder:text-[#a8a29e] focus:border-[var(--theme-primary)] focus:outline-none font-mono"
            />
            <button
              onClick={() => analyzeUser(username)}
              disabled={loading}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg btn-theme-primary text-xs font-bold font-mono flex items-center gap-1 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? <RefreshCw size={12} className="animate-spin" /> : <span>Analyze</span>}
            </button>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono">
            <span className="text-[#78716c] text-[11px] shrink-0 font-medium">Presets:</span>
            {['TP200613', 'torvalds', 'shadcn'].map((u) => (
              <button
                key={u}
                onClick={() => {
                  setUsername(u);
                  analyzeUser(u);
                }}
                className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  profile.login.toLowerCase() === u.toLowerCase()
                    ? 'bg-[var(--theme-light)] text-[var(--theme-dark)] border-[var(--theme-primary)] font-bold'
                    : 'bg-[#faf8f5] text-[#57534e] border-[var(--theme-border)] hover:text-[#1c1917]'
                }`}
              >
                @{u}
              </button>
            ))}

            {/* Compare Toggle */}
            <button
              onClick={() => {
                soundFx.playClick();
                setCompareMode(!compareMode);
                if (!compareProfile) {
                  setCompareProfile(PRESET_PROFILES.torvalds);
                }
              }}
              className={`px-3 py-1 rounded-lg border flex items-center gap-1.5 transition-all cursor-pointer ${
                compareMode
                  ? 'btn-theme-primary font-bold shadow-sm'
                  : 'bg-[var(--theme-light)] text-[var(--theme-dark)] border-[var(--theme-border)] hover:bg-[#faf8f5]'
              }`}
            >
              <Users size={13} />
              <span>{compareMode ? 'Comparing' : 'Compare User'}</span>
            </button>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-[#faf8f5] p-1 rounded-xl border border-[var(--theme-border)]">
            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('overview');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'btn-theme-primary shadow-xs'
                  : 'text-[#57534e] hover:text-[#1c1917]'
              }`}
            >
              Analytics Dashboard
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('3d-mesh');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === '3d-mesh'
                  ? 'btn-theme-primary shadow-xs'
                  : 'text-[#57534e] hover:text-[#1c1917]'
              }`}
            >
              3D Commit Topology
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('repos');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'repos'
                  ? 'btn-theme-primary shadow-xs'
                  : 'text-[#57534e] hover:text-[#1c1917]'
              }`}
            >
              Ranked Repositories
            </button>
          </div>

          <span className="text-[11px] font-mono text-[var(--theme-dark)] font-bold">
            ENGINE: FLASK + SQLITE + THREE.JS
          </span>
        </div>

        {/* Dynamic Display Area */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className={`grid grid-cols-1 ${compareMode ? 'lg:grid-cols-2' : 'lg:grid-cols-12'} gap-6`}>
              {/* Profile Card 1 */}
              <div className={`${compareMode ? 'w-full' : 'lg:col-span-7'} p-6 rounded-2xl bg-[#faf8f5] border border-[var(--theme-border)] space-y-6 shadow-sm`}>
                <div className="flex items-start gap-4">
                  <img
                    src={getAssetUrl(profile.avatar_url)}
                    alt={profile.name}
                    className="w-16 h-16 rounded-2xl border-2 border-[var(--theme-primary)] shadow-md object-cover bg-white"
                  />
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-heading font-bold text-[#1c1917]">{profile.name}</h3>
                      <a
                        href={`https://github.com/${profile.login}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[var(--theme-dark)] hover:underline flex items-center gap-1 font-mono font-semibold"
                      >
                        @{profile.login} <ExternalLink size={11} />
                      </a>
                    </div>
                    <p className="text-xs text-[#57534e] line-clamp-2">{profile.bio}</p>
                    <div className="text-[11px] text-[#78716c] font-medium pt-1">
                      Repos: {profile.public_repos} • Followers: {profile.followers} • Active since {profile.created_at}
                    </div>
                  </div>
                </div>

                {/* Score & Streak Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-[#ffffff] border border-[var(--theme-border)] text-center space-y-1 shadow-sm">
                    <div className="text-3xl font-heading font-extrabold text-[var(--theme-primary)]">
                      {profile.consistencyScore}/100
                    </div>
                    <div className="text-[10px] font-mono text-[#78716c] uppercase tracking-wider font-bold">
                      GitPulse Consistency Score
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#ffffff] border border-[var(--theme-border)] text-center space-y-1 shadow-sm">
                    <div className="text-3xl font-heading font-extrabold text-[#d97706] flex items-center justify-center gap-1">
                      <Flame size={24} className="text-[#d97706]" />
                      <span>{profile.streakDays}d</span>
                    </div>
                    <div className="text-[10px] font-mono text-[#78716c] uppercase tracking-wider font-bold">
                      Calculated Commit Streak
                    </div>
                  </div>
                </div>

                {/* Languages Distribution */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-[#57534e] flex justify-between">
                    <span>Language Distribution</span>
                    <span className="text-[var(--theme-dark)] font-mono">SQLite Aggregated</span>
                  </div>
                  <div className="h-3 w-full bg-[#ffffff] rounded-full overflow-hidden flex gap-0.5 border border-[var(--theme-border)]">
                    {profile.topLanguages.map((lang) => (
                      <div
                        key={lang.name}
                        style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                        title={`${lang.name}: ${lang.percentage}%`}
                        className="h-full first:rounded-l-full last:rounded-r-full"
                      />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 pt-1">
                    {profile.topLanguages.map((lang) => (
                      <div key={lang.name} className="flex items-center gap-1.5 text-[11px] font-medium text-[#57534e]">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
                        <span>{lang.name} ({lang.percentage}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Compare Mode Card */}
              {compareMode && compareProfile && (
                <div className="w-full p-6 rounded-2xl bg-[var(--theme-light)] border border-[var(--theme-border)] space-y-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <img
                      src={getAssetUrl(compareProfile.avatar_url)}
                      alt={compareProfile.name}
                      className="w-16 h-16 rounded-2xl border-2 border-[var(--theme-primary)] shadow-md object-cover bg-white"
                    />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-heading font-bold text-[#1c1917]">{compareProfile.name}</h3>
                        <span className="text-xs text-[var(--theme-dark)] font-mono font-semibold">@{compareProfile.login}</span>
                      </div>
                      <p className="text-xs text-[#57534e] line-clamp-2">{compareProfile.bio}</p>
                      <div className="text-[11px] text-[#78716c] font-medium pt-1">
                        Repos: {compareProfile.public_repos} • Followers: {compareProfile.followers}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-[#ffffff] border border-[var(--theme-border)] text-center space-y-1 shadow-sm">
                      <div className="text-3xl font-heading font-extrabold text-[var(--theme-dark)]">
                        {compareProfile.consistencyScore}/100
                      </div>
                      <div className="text-[10px] font-mono text-[#78716c] uppercase tracking-wider font-bold">
                        Consistency Score
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#ffffff] border border-[var(--theme-border)] text-center space-y-1 shadow-sm">
                      <div className="text-3xl font-heading font-extrabold text-[#d97706] flex items-center justify-center gap-1">
                        <Flame size={24} className="text-[#d97706]" />
                        <span>{compareProfile.streakDays}d</span>
                      </div>
                      <div className="text-[10px] font-mono text-[#78716c] uppercase tracking-wider font-bold">
                        Commit Streak
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#ffffff] border border-[var(--theme-border)] text-xs space-y-1">
                    <span className="text-[var(--theme-dark)] font-bold">Comparison Benchmark:</span>
                    <p className="text-[#57534e] text-[11px]">
                      {profile.consistencyScore >= compareProfile.consistencyScore
                        ? `★ @${profile.login} leads consistency score by +${profile.consistencyScore - compareProfile.consistencyScore} pts`
                        : `★ @${compareProfile.login} leads consistency score by +${compareProfile.consistencyScore - profile.consistencyScore} pts`}
                    </p>
                  </div>
                </div>
              )}

              {/* Right Mini-Insights (when not comparing) */}
              {!compareMode && (
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-5 rounded-2xl bg-[#faf8f5] border border-[var(--theme-border)] space-y-3 shadow-sm">
                    <div className="flex items-center gap-2 text-xs text-[var(--theme-dark)] font-bold">
                      <Sparkles size={15} className="text-[var(--theme-primary)]" />
                      <span>HOW GITPULSE CALCULATES SCORES</span>
                    </div>
                    <div className="space-y-2 text-xs text-[#57534e] leading-relaxed">
                      <p>
                        <strong className="text-[#1c1917]">1. Deep Pagination:</strong> Iterates through hundreds of historical commits via GitHub API.
                      </p>
                      <p>
                        <strong className="text-[#1c1917]">2. SQLite Aggregation:</strong> Computes commit distribution variance, week-over-week consistency, and language diversity.
                      </p>
                      <p>
                        <strong className="text-[#1c1917]">3. Normalized Metric:</strong> Maps developer habits onto a robust 0–100 scale.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[var(--theme-light)] border border-[var(--theme-border)] text-xs text-[#57534e] space-y-2">
                    <div className="flex items-center justify-between text-[var(--theme-dark)] font-bold">
                      <span>DEPLOYMENT ARCHITECTURE</span>
                      <span className="px-2 py-0.5 rounded bg-[#16a34a]/15 text-[#15803d] text-[10px] font-bold">LIVE</span>
                    </div>
                    <p className="text-[#57534e] text-[11px]">
                      Frontend hosted on <strong className="text-[#1c1917]">Vercel</strong> • Backend API processing hosted on <strong className="text-[#1c1917]">Render</strong>.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3D Mesh Canvas Tab */}
        {activeTab === '3d-mesh' && (
          <div className="p-6 rounded-2xl bg-[#faf8f5] border border-[var(--theme-border)] flex flex-col items-center justify-center space-y-4 text-center">
            <div className="text-xs text-[var(--theme-dark)] font-bold flex items-center gap-2">
              <Activity size={14} className="animate-spin text-[var(--theme-primary)]" />
              <span>3D REVOLVING COMMIT TOPOLOGY MESH</span>
            </div>
            <div className="w-full flex justify-center overflow-hidden">
              <canvas ref={canvas3dRef} className="w-full max-w-lg cursor-grab" />
            </div>
            <p className="text-xs text-[#57534e] max-w-md">
              Rendered via HTML5 Canvas &amp; Three.js mathematical projections to visualize repository node interconnectedness and commit clustering.
            </p>
          </div>
        )}

        {/* Repositories Tab */}
        {activeTab === 'repos' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#57534e]">
                STAR &amp; FORK RANKED REPOSITORIES FOR @{profile.login}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {profile.topRepos.map((repo, i) => (
                <a
                  key={i}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="p-4 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)] hover:border-[var(--theme-primary)] transition-all group flex flex-col justify-between space-y-3 shadow-sm hover:shadow-md"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-[var(--theme-dark)] font-bold">
                      <span>#{i + 1} Rank</span>
                      <ExternalLink size={12} />
                    </div>
                    <h4 className="text-sm font-bold text-[#1c1917] group-hover:text-[var(--theme-dark)] transition-colors">
                      {repo.name}
                    </h4>
                    <span className="text-[11px] text-[#78716c] font-medium">{repo.language}</span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-[#57534e] pt-2 border-t border-[var(--theme-border)]">
                    <span className="flex items-center gap-1 text-[var(--theme-primary)] font-semibold">
                      <Star size={13} /> {repo.stars}
                    </span>
                    <span className="flex items-center gap-1 text-[var(--theme-dark)] font-semibold">
                      <GitFork size={13} /> {repo.forks}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
