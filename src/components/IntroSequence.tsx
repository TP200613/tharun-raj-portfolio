import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, ArrowRight, Volume2, VolumeX, FastForward, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/sound';

interface IntroSequenceProps {
  onComplete: () => void;
  accentColor: string;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  color: string;
  alpha: number;
  angle: number;
  speed: number;
  orbitRadius: number;
  orbitSpeed: number;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({
  onComplete,
  accentColor,
  soundEnabled,
  onToggleSound,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isExploding, setIsExploding] = useState(false);
  const isExplodingRef = useRef(false);
  const mouseRef = useRef<{ x: number; y: number; isHovering: boolean }>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    isHovering: false,
  });

  // Canvas particle simulation with gravity & mouse physics
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colorPalette = [
      accentColor,
      '#ffffff',
      '#d4af37',
      '#f59e0b',
      '#38bdf8',
      '#e2e8f0',
    ];

    // Initialize 140 particles with orbital and physics properties
    const particleCount = Math.min(150, Math.floor((width * height) / 9000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const orbitRadius = Math.random() * Math.min(width, height) * 0.42 + 20;
      particles.push({
        x: width / 2 + Math.cos(angle) * orbitRadius,
        y: height / 2 + Math.sin(angle) * orbitRadius,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 2.8 + 1.2,
        baseSize: Math.random() * 2.8 + 1.2,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        alpha: Math.random() * 0.7 + 0.3,
        angle,
        speed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        orbitRadius,
        orbitSpeed: (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
      });
    }

    let shockwaveRadius = 0;
    let shockwaveAlpha = 0;

    const render = () => {
      const burstSpeed = isExplodingRef.current ? 25 : 0;
      // Semi-transparent background clear for dynamic light trails
      ctx.fillStyle = 'rgba(10, 8, 7, 0.22)';
      ctx.fillRect(0, 0, width, height);

      const targetX = mouseRef.current.isHovering ? mouseRef.current.x : width / 2;
      const targetY = mouseRef.current.isHovering ? mouseRef.current.y : height / 2;

      // Draw dynamic glowing central core aura
      const radialGlow = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        width > 768 ? 320 : 200
      );
      radialGlow.addColorStop(0, `${accentColor}35`);
      radialGlow.addColorStop(0.5, `${accentColor}10`);
      radialGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, width > 768 ? 320 : 200, 0, Math.PI * 2);
      ctx.fill();

      // Render shockwave if exploding
      if (shockwaveAlpha > 0.01) {
        ctx.save();
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 3;
        ctx.globalAlpha = shockwaveAlpha;
        ctx.shadowColor = accentColor;
        ctx.shadowBlur = 25;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, shockwaveRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        shockwaveRadius += 35;
        shockwaveAlpha *= 0.94;
      }

      // Update & Draw each particle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (burstSpeed > 0) {
          // Explosive shockwave motion
          const dx = p.x - width / 2;
          const dy = p.y - height / 2;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          p.vx = (dx / dist) * burstSpeed;
          p.vy = (dy / dist) * burstSpeed;
          p.x += p.vx;
          p.y += p.vy;
          p.size *= 1.02;
        } else {
          // Standard orbital + gravitational attraction physics
          p.angle += p.orbitSpeed;
          const orbitTargetX = targetX + Math.cos(p.angle) * p.orbitRadius;
          const orbitTargetY = targetY + Math.sin(p.angle) * p.orbitRadius;

          // Pull towards target orbit
          const dx = orbitTargetX - p.x;
          const dy = orbitTargetY - p.y;
          p.vx += dx * 0.003;
          p.vy += dy * 0.003;

          // Mouse gravity lens effect
          const mouseDx = targetX - p.x;
          const mouseDy = targetY - p.y;
          const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

          if (mouseDist < 250 && mouseDist > 20) {
            const force = (250 - mouseDist) / 250;
            p.vx += (mouseDx / mouseDist) * force * 0.35;
            p.vy += (mouseDy / mouseDist) * force * 0.35;
          }

          // Apply drag / damping
          p.vx *= 0.94;
          p.vy *= 0.94;
          p.x += p.vx;
          p.y += p.vy;
        }

        // Draw particle
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 4;
        ctx.fill();
        ctx.restore();

        // Connect nearby particles with subtle constellations
        if (burstSpeed === 0) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const connDx = p.x - p2.x;
            const connDy = p.y - p2.y;
            const connDist = Math.sqrt(connDx * connDx + connDy * connDy);

            if (connDist < 95) {
              ctx.save();
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = accentColor;
              ctx.globalAlpha = (1 - connDist / 95) * 0.22;
              ctx.lineWidth = 0.8;
              ctx.stroke();
              ctx.restore();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Mouse & Touch listeners for real-time gravity interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        isHovering: true,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          isHovering: true,
        };
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [accentColor]);

  const handleTriggerLaunch = useCallback(() => {
    if (isExploding) return;
    isExplodingRef.current = true;
    setIsExploding(true);
    soundFx.playGreetingChime();

    // Trigger celebratory confetti burst
    try {
      confetti({
        particleCount: 75,
        spread: 90,
        origin: { y: 0.55 },
        colors: [accentColor, '#d4af37', '#38bdf8', '#ffffff', '#1c1917'],
      });
    } catch {
      // ignore confetti errors
    }

    setTimeout(() => {
      onComplete();
    }, 700);
  }, [accentColor, isExploding, onComplete]);

  // Esc key listener for instant bypass
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleTriggerLaunch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTriggerLaunch]);

  return (
    <div
      onClick={handleTriggerLaunch}
      className={`fixed inset-0 z-[100] bg-[#0c0a09] text-[#faf8f5] flex flex-col justify-between p-4 sm:p-8 cursor-pointer select-none transition-all duration-700 overflow-hidden ${
        isExploding ? 'opacity-0 scale-125 blur-md pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Interactive Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
      />

      {/* Top Bar: Telemetry & Controls */}
      <header className="relative z-10 flex items-center justify-between max-w-5xl w-full mx-auto pointer-events-none">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-3 w-3">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-80"
              style={{ backgroundColor: accentColor }}
            />
            <span
              className="relative inline-flex rounded-full h-3 w-3"
              style={{ backgroundColor: accentColor }}
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#d6d3d1] uppercase">
              PARTICLE CORE // SYSTEM ACTIVE
            </span>
            <span className="text-[9px] font-mono text-[#a8a29e]">
              GRAVITATIONAL LENSING • THARUN RAJ T P
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 pointer-events-auto">
          {/* Audio Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSound();
              if (!soundEnabled) soundFx.playSuccess();
            }}
            className="p-2 rounded-xl bg-[#1c1917]/80 hover:bg-[#292524] border border-[#292524] text-[#a8a29e] hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1.5 backdrop-blur-md"
            title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
          >
            {soundEnabled ? (
              <Volume2 size={14} style={{ color: accentColor }} />
            ) : (
              <VolumeX size={14} />
            )}
            <span className="text-[10px] font-mono hidden sm:inline">
              {soundEnabled ? 'AUDIO ON' : 'MUTED'}
            </span>
          </button>

          {/* Quick Skip Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleTriggerLaunch();
            }}
            className="px-3.5 py-1.5 rounded-xl bg-[#1c1917]/80 hover:bg-[#292524] border border-[#292524] hover:border-[var(--theme-primary)] text-xs font-mono font-semibold text-[#a8a29e] hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm backdrop-blur-md group"
          >
            <span>Skip Intro</span>
            <FastForward size={13} className="group-hover:translate-x-0.5 transition-transform" />
            <kbd className="hidden sm:inline px-1 py-0.5 text-[9px] bg-[#0c0a09] border border-[#44403c] rounded text-[#78716c]">
              Esc
            </kbd>
          </button>
        </div>
      </header>

      {/* Centerpiece: Interactive Floating Glass Core Card */}
      <main className="relative z-10 max-w-xl w-full mx-auto my-auto flex flex-col items-center text-center space-y-6 pointer-events-auto">
        {/* Floating Gravitational Emblem */}
        <div className="relative group transition-transform duration-500 ease-out hover:scale-110">
          {/* Radiant Pulsing Backing */}
          <div
            className="absolute -inset-6 rounded-full blur-2xl opacity-40 animate-pulse transition-opacity duration-300 group-hover:opacity-75"
            style={{ backgroundColor: accentColor }}
          />

          {/* Rotating Orbit Ring */}
          <div
            className="absolute -inset-3 rounded-full border border-dashed opacity-40 animate-spin"
            style={{ borderColor: accentColor, animationDuration: '22s' }}
          />

          {/* Counter-Rotating Orbit Ring */}
          <div
            className="absolute -inset-1 rounded-full border border-dotted opacity-30 animate-spin"
            style={{
              borderColor: '#ffffff',
              animationDuration: '14s',
              animationDirection: 'reverse',
            }}
          />

          {/* Core Portrait Capsule with tharun1.png */}
          <div className="relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-[#1c1917]/90 border-2 border-[#44403c] backdrop-blur-2xl shadow-2xl transition-all duration-300 group-hover:border-[var(--theme-primary)] group-hover:scale-105">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#0c0a09] relative">
              <img
                src="/tharun1.png"
                alt="Tharun Raj T P"
                className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-500"
              />
              {/* Subtle glass gradient vignette */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Online Live Status Indicator */}
            <span className="absolute bottom-1 right-1 flex h-3.5 w-3.5">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: accentColor }}
              />
              <span
                className="relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-[#0c0a09]"
                style={{ backgroundColor: accentColor }}
              />
            </span>
          </div>
        </div>

        {/* Identity Headings */}
        <div className="space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1c1917]/80 border border-[#292524] text-[11px] font-mono text-[#d6d3d1] backdrop-blur-md shadow-xs">
            <Sparkles size={13} style={{ color: accentColor }} className="animate-spin" />
            <span>INTERACTIVE PARTICLE GRAVITY FIELD</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-white drop-shadow-lg">
            THARUN RAJ T P
          </h1>

          <p className="text-sm sm:text-base text-[#a8a29e] font-sans max-w-md mx-auto">
            B.Tech CSE (AI &amp; Data Engineering) • Lovely Professional University
          </p>
        </div>

        {/* Interactive Launch Button with Pulse Ripple */}
        <div className="pt-2 w-full max-w-sm">
          <div className="relative group">
            {/* Pulsing button aura */}
            <div
              className="absolute -inset-1 rounded-2xl opacity-60 blur-md group-hover:opacity-100 transition-opacity duration-300 animate-pulse"
              style={{ backgroundColor: accentColor }}
            />

            <button
              onClick={handleTriggerLaunch}
              className="relative w-full py-4 px-6 rounded-2xl font-heading font-bold text-sm sm:text-base text-white flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              style={{
                backgroundColor: accentColor,
                boxShadow: `0 10px 30px -5px ${accentColor}90`,
              }}
            >
              <Compass size={18} className="animate-spin" style={{ animationDuration: '8s' }} />
              <span>CLICK ANYWHERE TO ENTER</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Subtext Prompt */}
          <p className="text-[11px] font-mono text-[#78716c] mt-3">
            Move mouse to distort gravitational field • Click to ignite cosmic shockwave
          </p>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-5xl w-full mx-auto text-[11px] font-mono text-[#78716c] pointer-events-none">
        <div>
          <span>Lovely Professional University</span>
          <span className="mx-2">•</span>
          <span>Full-Stack &amp; AI Portfolio</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
          <span>Interactive Canvas Ready</span>
        </div>
      </footer>
    </div>
  );
};
