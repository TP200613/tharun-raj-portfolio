import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Grid3X3, Binary, Waves, Settings2, Network, Flower2 } from 'lucide-react';
import { soundFx } from '../utils/sound';
import { getAssetUrl } from '../utils/assetPath';

export type BackgroundMode = 'constellation' | 'blueprint' | 'binary' | 'silk' | 'datapacket' | 'floral';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  glyph?: string;
  size?: number;
}

// Convert hex color to rgba components
const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) || 184;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 134;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 11;
  return { r, g, b };
};

const GLYPHS = ['01', 'λ', '√', '{ }', '< >', 'AI', 'SQL', 'API', 'Git', '3D', '⚡', 'π', '0x', '=>'];

export const ParticleBackground: React.FC<{ accentColor?: string }> = ({ accentColor = '#4A0E17' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<BackgroundMode>(() => {
    return (localStorage.getItem('tharun_portfolio_bg_mode') as BackgroundMode) || 'constellation';
  });
  const [showControls, setShowControls] = useState(false);

  const handleModeChange = (newMode: BackgroundMode) => {
    soundFx.playClick();
    setMode(newMode);
    localStorage.setItem('tharun_portfolio_bg_mode', newMode);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let time = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking with smooth interpolation
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 160,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      if (mouse.x === -1000) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const { r, g, b } = hexToRgb(accentColor);

    // Initialize particles for constellation / binary modes
    const particleCount = Math.min(Math.floor((width * height) / 18000), 55);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 2 + 1.2;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius,
        baseRadius: radius,
        alpha: Math.random() * 0.35 + 0.15,
        glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        size: Math.floor(Math.random() * 4) + 10,
      });
    }

    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // -------------------------------------------------------------
      // MODE 1: CONSTELLATION & FLUID AURORA (Default)
      // -------------------------------------------------------------
      if (mode === 'constellation') {
        // Soft Breathing Aurora Radial Washes
        const cos1 = Math.cos(time * 0.7) * 40;
        const sin1 = Math.sin(time * 0.9) * 40;
        const grad1 = ctx.createRadialGradient(
          width * 0.25 + cos1,
          height * 0.25 + sin1,
          50,
          width * 0.25 + cos1,
          height * 0.25 + sin1,
          width * 0.45
        );
        grad1.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.065)`);
        grad1.addColorStop(1, 'transparent');
        ctx.fillStyle = grad1;
        ctx.fillRect(0, 0, width, height);

        const cos2 = Math.sin(time * 0.6) * 50;
        const sin2 = Math.cos(time * 0.8) * 50;
        const grad2 = ctx.createRadialGradient(
          width * 0.8 + cos2,
          height * 0.75 + sin2,
          60,
          width * 0.8 + cos2,
          height * 0.75 + sin2,
          width * 0.5
        );
        grad2.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.055)`);
        grad2.addColorStop(1, 'transparent');
        ctx.fillStyle = grad2;
        ctx.fillRect(0, 0, width, height);

        // Render Constellation Nodes & Connecting Beams
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx = -p.vx;
          if (p.y < 0 || p.y > height) p.vy = -p.vy;

          // Interactive magnetic repulsion with cursor
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius && mouse.x > 0) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= (dx / dist) * force * 1.8;
            p.y -= (dy / dist) * force * 1.8;
            p.radius = p.baseRadius * (1 + force * 1.4);
          } else {
            p.radius = p.baseRadius;
          }

          // Draw Glowing Node
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha})`;
          ctx.fill();

          // Connect nearest neighbors with glowing lines
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const d = Math.hypot(p.x - p2.x, p.y - p2.y);
            const maxD = 125;

            if (d < maxD) {
              const lineAlpha = (1 - d / maxD) * 0.14;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineAlpha})`;
              ctx.lineWidth = 0.85;
              ctx.stroke();
            }
          }
        }
      }

      // -------------------------------------------------------------
      // MODE 2: CYBER BLUEPRINT & INTERACTIVE TORCH GRID
      // -------------------------------------------------------------
      else if (mode === 'blueprint') {
        const gridSize = 32;
        const cols = Math.ceil(width / gridSize);
        const rows = Math.ceil(height / gridSize);

        // Torchlight field around mouse
        if (mouse.x > 0) {
          const torch = ctx.createRadialGradient(mouse.x, mouse.y, 20, mouse.x, mouse.y, 220);
          torch.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.14)`);
          torch.addColorStop(1, 'transparent');
          ctx.fillStyle = torch;
          ctx.fillRect(0, 0, width, height);
        }

        // Draw Minimal Blueprint Grid Points
        for (let x = 0; x <= cols; x++) {
          for (let y = 0; y <= rows; y++) {
            const px = x * gridSize;
            const py = y * gridSize;

            let dotAlpha = 0.08;
            let dotRadius = 1;

            if (mouse.x > 0) {
              const dist = Math.hypot(mouse.x - px, mouse.y - py);
              if (dist < 200) {
                const boost = (200 - dist) / 200;
                dotAlpha += boost * 0.45;
                dotRadius += boost * 1.5;
              }
            }

            ctx.beginPath();
            ctx.arc(px, py, dotRadius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${dotAlpha})`;
            ctx.fill();
          }
        }

        // Occasional traveling data pulses along grid lines
        const pulseY = (Math.sin(time * 1.2) * 0.5 + 0.5) * height;
        ctx.beginPath();
        ctx.moveTo(0, pulseY);
        ctx.lineTo(width, pulseY);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.035)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // -------------------------------------------------------------
      // MODE 3: FLOATING BINARY & CYBER GLYPHS
      // -------------------------------------------------------------
      else if (mode === 'binary') {
        ctx.font = '11px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.y -= 0.35; // Gentle upward drift
          p.x += Math.sin(time + i) * 0.2;

          if (p.y < -20) {
            p.y = height + 20;
            p.x = Math.random() * width;
          }

          // Interactive push
          if (mouse.x > 0) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 120) {
              const force = (120 - dist) / 120;
              p.x -= (dx / dist) * force * 1.5;
            }
          }

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha * 0.85})`;
          ctx.fillText(p.glyph || '01', p.x, p.y);
        }
      }

      // -------------------------------------------------------------
      // MODE 4: SILK MINIMAL QUIET LUXURY
      // -------------------------------------------------------------
      else if (mode === 'silk') {
        const cos = Math.cos(time * 0.5) * 60;
        const sin = Math.sin(time * 0.5) * 60;

        const gradCenter = ctx.createRadialGradient(
          width * 0.5 + cos,
          height * 0.4 + sin,
          100,
          width * 0.5 + cos,
          height * 0.4 + sin,
          width * 0.6
        );
        gradCenter.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.06)`);
        gradCenter.addColorStop(1, 'transparent');
        ctx.fillStyle = gradCenter;
        ctx.fillRect(0, 0, width, height);
      }

      // -------------------------------------------------------------
      // MODE 5: DATA PACKET STREAM (Data Engineering & Pipeline Flow)
      // -------------------------------------------------------------
      else if (mode === 'datapacket') {
        const laneCount = 7;
        const laneSpacing = height / (laneCount + 1);

        // Draw pipeline bus tracks
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.08)`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        for (let i = 1; i <= laneCount; i++) {
          const y = i * laneSpacing;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
        ctx.setLineDash([]);

        // Packet payload tokens
        const PACKET_TOKENS = ['[SQL]', '[0xFA]', '[ETL]', '[200 OK]', '[STREAM]', '[JSON]', '[KAFKA]', '[PARQUET]', '[PANDAS]', '[REST]'];

        ctx.font = '10px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const laneIndex = (i % laneCount) + 1;
          const targetY = laneIndex * laneSpacing;

          // Snap smoothly to pipeline lane
          p.y += (targetY - p.y) * 0.05;
          p.x += Math.abs(p.vx) * 3 + 1.2; // High-speed pipeline flow

          if (p.x > width + 100) {
            p.x = -80;
            p.glyph = PACKET_TOKENS[Math.floor(Math.random() * PACKET_TOKENS.length)];
          }

          // Packet trailing glow head
          const grad = ctx.createLinearGradient(p.x - 30, p.y, p.x + 8, p.y);
          grad.addColorStop(0, 'transparent');
          grad.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${p.alpha * 0.4})`);
          grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${p.alpha})`);

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.roundRect(p.x - 28, p.y - 2, 34, 4, 2);
          ctx.fill();

          // Packet Head Node
          ctx.beginPath();
          ctx.arc(p.x + 6, p.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Packet Payload Label
          if (i % 2 === 0) {
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha * 0.85})`;
            ctx.fillText(p.glyph || '[DATA]', p.x + 12, p.y - 8);
          }

          // Mouse proximity transmission handshake beam
          if (mouse.x > 0) {
            const dMouse = Math.hypot(mouse.x - p.x, mouse.y - p.y);
            if (dMouse < 140) {
              ctx.beginPath();
              ctx.moveTo(mouse.x, mouse.y);
              ctx.lineTo(p.x, p.y);
              ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${(1 - dMouse / 140) * 0.3})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }

      // -------------------------------------------------------------
      // MODE 6: FLORAL & BOTANICAL LUXE (Organic Petal Embers & Gold Lineage)
      // -------------------------------------------------------------
      else if (mode === 'floral') {
        // Soft breathing ivory-gold / ambient radial bloom
        const cos = Math.cos(time * 0.4) * 40;
        const sin = Math.sin(time * 0.4) * 40;

        const gradBloom = ctx.createRadialGradient(
          width * 0.5 + cos,
          height * 0.35 + sin,
          80,
          width * 0.5 + cos,
          height * 0.35 + sin,
          width * 0.7
        );
        gradBloom.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.07)`);
        gradBloom.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, 0.02)`);
        gradBloom.addColorStop(1, 'transparent');
        ctx.fillStyle = gradBloom;
        ctx.fillRect(0, 0, width, height);

        // Render delicate falling petal particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.y += 0.45 + (i % 3) * 0.2;
          p.x += Math.sin(time * 1.2 + i) * 0.65;

          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }

          // Mouse proximity soft wind swirl
          if (mouse.x > 0) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 150) {
              const force = (150 - dist) / 150;
              p.x -= (dx / dist) * force * 2.2;
              p.y -= (dy / dist) * force * 1.5;
            }
          }

          // Draw delicate organic petal / golden leaf ember
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(time * 0.5 + i);

          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 1.8, p.radius * 0.9, Math.PI / 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha * 0.6})`;
          ctx.fill();

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [accentColor, mode]);

  return (
    <>
      {/* Subtle Luxury Floral Wallpaper Texture Layer */}
      {mode === 'floral' && (
        <div
          className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center transition-opacity duration-700 animate-in fade-in"
          style={{
            backgroundImage: `url(${getAssetUrl('floral_luxury_light.jpg')})`,
            opacity: 0.12,
            mixBlendMode: 'multiply'
          }}
        />
      )}

      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.95 }}
      />

      {/* Innovative Floating Ambient Background Controller Pill */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:block">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#ffffff]/90 backdrop-blur-md border border-[var(--theme-border)] shadow-md">
          <button
            onClick={() => setShowControls((prev: boolean) => !prev)}
            title="Configure Background Canvas"
            className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              showControls
                ? 'bg-[var(--theme-light)] text-[var(--theme-dark)] border border-[var(--theme-border)]'
                : 'text-[#57534e] hover:text-[#1c1917]'
            }`}
          >
            <Settings2 size={14} className="text-[var(--theme-primary)]" />
            <span className="text-[11px] uppercase tracking-wider font-mono">Ambience</span>
          </button>

          {showControls && (
            <div className="flex items-center gap-1 pl-1 border-l border-[var(--theme-border)] animate-in fade-in slide-in-from-left-2 duration-200">
              <button
                onClick={() => handleModeChange('floral')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  mode === 'floral'
                    ? 'bg-[var(--theme-primary)] text-white shadow-xs'
                    : 'text-[#57534e] hover:text-[#1c1917] hover:bg-[#faf8f5]'
                }`}
              >
                <Flower2 size={12} />
                <span>Floral Luxe</span>
              </button>

              <button
                onClick={() => handleModeChange('datapacket')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  mode === 'datapacket'
                    ? 'bg-[var(--theme-primary)] text-white shadow-xs'
                    : 'text-[#57534e] hover:text-[#1c1917] hover:bg-[#faf8f5]'
                }`}
              >
                <Network size={12} />
                <span>Data Packets</span>
              </button>

              <button
                onClick={() => handleModeChange('constellation')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  mode === 'constellation'
                    ? 'bg-[var(--theme-primary)] text-white shadow-xs'
                    : 'text-[#57534e] hover:text-[#1c1917] hover:bg-[#faf8f5]'
                }`}
              >
                <Sparkles size={12} />
                <span>Constellation</span>
              </button>

              <button
                onClick={() => handleModeChange('blueprint')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  mode === 'blueprint'
                    ? 'bg-[var(--theme-primary)] text-white shadow-xs'
                    : 'text-[#57534e] hover:text-[#1c1917] hover:bg-[#faf8f5]'
                }`}
              >
                <Grid3X3 size={12} />
                <span>Grid Torch</span>
              </button>

              <button
                onClick={() => handleModeChange('binary')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  mode === 'binary'
                    ? 'bg-[var(--theme-primary)] text-white shadow-xs'
                    : 'text-[#57534e] hover:text-[#1c1917] hover:bg-[#faf8f5]'
                }`}
              >
                <Binary size={12} />
                <span>Binary Drift</span>
              </button>

              <button
                onClick={() => handleModeChange('silk')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  mode === 'silk'
                    ? 'bg-[var(--theme-primary)] text-white shadow-xs'
                    : 'text-[#57534e] hover:text-[#1c1917] hover:bg-[#faf8f5]'
                }`}
              >
                <Waves size={12} />
                <span>Silk Minimal</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ParticleBackground;
