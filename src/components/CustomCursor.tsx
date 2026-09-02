import React, { useEffect, useRef, useState } from 'react';

interface CustomCursorProps {
  enabled?: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ enabled = true }) => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isHoveringInput, setIsHoveringInput] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(pointer: fine)').matches;
    }
    return false;
  });

  // Position state tracking for Lerp animation
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  // Check if device supports fine pointer (mouse/trackpad, not touch-only)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(pointer: fine)');

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  // Update body class for hiding default cursor when enabled
  useEffect(() => {
    if (enabled && isFinePointer) {
      document.documentElement.classList.add('custom-cursor-active');
    } else {
      document.documentElement.classList.remove('custom-cursor-active');
    }

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [enabled, isFinePointer]);

  // Main cursor motion loop and interactive detection
  useEffect(() => {
    if (!enabled || !isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) {
        setIsVisible(true);
        ringPos.current = { x: e.clientX, y: e.clientY };
      }

      // Check if hovering interactive target
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInput =
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable ||
          target.closest('input, textarea, [contenteditable="true"]');

        const isInteractive =
          isInput ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'SELECT' ||
          target.getAttribute('role') === 'button' ||
          target.getAttribute('role') === 'tab' ||
          target.getAttribute('role') === 'switch' ||
          target.classList.contains('cursor-pointer') ||
          target.closest('button, a, select, [role="button"], [role="tab"], .cursor-pointer, input, textarea');

        setIsHoveringInput(Boolean(isInput));
        setIsHoveringInteractive(Boolean(isInteractive));
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth Lerp animation loop for outer ring and ambient glow
    const animate = () => {
      // Linear interpolation factor (0.22 = responsive yet silky smooth)
      const factor = 0.22;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * factor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * factor;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [enabled, isFinePointer, isVisible]);

  if (!enabled || !isFinePointer) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* 1. Ambient Radial Glow Aura */}
      <div
        ref={glowRef}
        className={`fixed top-0 left-0 -ml-10 -mt-10 w-20 h-20 rounded-full pointer-events-none transition-all duration-300 ease-out will-change-transform ${
          isHoveringInteractive
            ? 'scale-150 opacity-40 bg-[var(--theme-primary)] blur-xl'
            : 'scale-100 opacity-20 bg-[var(--theme-primary)] blur-lg'
        }`}
      />

      {/* 2. Fluid Trailing Ring / Halo */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none will-change-transform transition-all ease-out flex items-center justify-center ${
          isHoveringInput
            ? '-ml-1.5 -mt-4 w-3 h-8 rounded-md border-2 border-[var(--theme-primary)] bg-[var(--theme-light)]/60 shadow-md duration-150'
            : isHoveringInteractive
            ? isClicking
              ? '-ml-5 -mt-5 w-10 h-10 rounded-full border-2 border-[var(--theme-primary)] bg-[var(--theme-primary)]/20 shadow-lg scale-90 duration-100'
              : '-ml-7 -mt-7 w-14 h-14 rounded-full border-2 border-[var(--theme-primary)] bg-[var(--theme-primary)]/15 backdrop-blur-[1px] shadow-lg shadow-[var(--theme-glow)] scale-100 duration-200'
            : isClicking
            ? '-ml-3.5 -mt-3.5 w-7 h-7 rounded-full border border-[var(--theme-primary)] bg-[var(--theme-primary)]/25 scale-75 duration-100'
            : '-ml-4.5 -mt-4.5 w-9 h-9 rounded-full border border-[var(--theme-primary)]/70 bg-[var(--theme-primary)]/5 backdrop-blur-[0.5px] scale-100 duration-200'
        }`}
      >
        {/* Subtle interior pulse indicator when hovering buttons/links */}
        {isHoveringInteractive && !isHoveringInput && (
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)] animate-ping opacity-75" />
        )}
      </div>

      {/* 3. Instant Zero-Latency Center Precision Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 rounded-full pointer-events-none will-change-transform transition-all duration-100 ease-out shadow-sm ${
          isHoveringInput
            ? 'w-1 h-3 rounded-none bg-[var(--theme-primary)] opacity-90'
            : isClicking
            ? 'w-2.5 h-2.5 -ml-1.25 -mt-1.25 bg-[var(--theme-dark)] scale-125'
            : isHoveringInteractive
            ? 'w-2 h-2 bg-[var(--theme-primary)] scale-110 shadow-sm shadow-[var(--theme-primary)]'
            : 'w-2 h-2 bg-[var(--theme-primary)] shadow-sm'
        }`}
      />
    </div>
  );
};
