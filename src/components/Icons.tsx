import React from 'react';

export const GithubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const LinkedinIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const LeetCodeIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.05 5.05 0 0 0-3.85-1.424c-1.42 0-2.825.568-3.85 1.593l-4.32 4.381c-1.025 1.024-1.592 2.43-1.592 3.85s.567 2.826 1.592 3.85l4.332 4.363c1.025 1.025 2.43 1.592 3.85 1.592 1.42 0 2.825-.567 3.85-1.592l2.697-2.607c.514-.514.496-1.365-.039-1.901-.535-.535-1.386-.553-1.9.038z" />
    <path d="M10.8 12.8h8.4c.7 0 1.3-.6 1.3-1.3s-.6-1.3-1.3-1.3h-8.4c-.7 0-1.3.6-1.3 1.3s.6 1.3 1.3 1.3z" />
  </svg>
);

// Authentic Brand & Skill SVG Logos
export const PythonIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <defs>
      <linearGradient id="pyGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#387eb8" />
        <stop offset="100%" stopColor="#366994" />
      </linearGradient>
      <linearGradient id="pyGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffe873" />
        <stop offset="100%" stopColor="#ffd43b" />
      </linearGradient>
    </defs>
    <path
      fill="url(#pyGrad1)"
      d="M11.91 2c-5.44 0-5.1 2.36-5.1 2.36l.01 2.44h5.18v.74H4.88S2 7.22 2 12.7c0 5.48 2.52 5.28 2.52 5.28h1.5v-2.12s-.08-2.52 2.48-2.52h5.14s2.4-.04 2.4-2.36V4.44S16.5 2 11.91 2zm-2.82 1.63a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7z"
    />
    <path
      fill="url(#pyGrad2)"
      d="M12.09 22c5.44 0 5.1-2.36 5.1-2.36l-.01-2.44h-5.18v-.74h7.12S22 16.78 22 11.3c0-5.48-2.52-5.28-2.52-5.28h-1.5v2.12s.08 2.52-2.48 2.52h-5.14s-2.4.04-2.4 2.36v9.24S7.5 22 12.09 22zm2.82-1.63a.85.85 0 1 1 0-1.7.85.85 0 0 1 0 1.7z"
    />
  </svg>
);

export const SqlIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <ellipse cx="12" cy="5" rx="9" ry="3" fill="#e0f2fe" stroke="#0284c7" />
    <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="#0284c7" />
    <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" stroke="#0284c7" />
  </svg>
);

export const ReactIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" className={className}>
    <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
    <g stroke="#61dafb" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

export const JavaScriptIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <rect width="24" height="24" rx="4" fill="#f7df1e" />
    <path
      d="M6.5 18.5l2.2-1.3c.4.8.9 1.4 1.8 1.4.9 0 1.5-.4 1.5-1.4v-6.7h2.8v6.8c0 2.6-1.5 3.7-4.1 3.7-2.3 0-3.7-1.1-4.2-2.5zm9.3-0.1l2.2-1.3c.6 1 1.4 1.5 2.5 1.5 1.1 0 1.8-.5 1.8-1.3 0-.8-.7-1.1-1.9-1.6l-.7-.3c-1.9-.8-3.1-1.8-3.1-3.9 0-2 1.6-3.6 4-3.6 1.8 0 3 .7 3.8 2.2l-2.1 1.3c-.4-.7-.9-1.1-1.7-1.1s-1.4.5-1.4 1.1c0 .7.5 1 1.6 1.4l.7.3c2.2.9 3.4 1.9 3.4 4.1 0 2.3-1.8 3.8-4.5 3.8-2.6 0-4.1-1.3-4.6-2.9z"
      fill="#000000"
    />
  </svg>
);

export const TypeScriptIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <rect width="24" height="24" rx="4" fill="#3178c6" />
    <path
      d="M13.5 12.3v1.9h2.3v7.8h2.6v-7.8h2.3v-1.9H13.5zm-8.8 6.4l2.1-1.2c.4.7.9 1.2 1.6 1.2.8 0 1.3-.4 1.3-1.1 0-.6-.5-.9-1.5-1.3l-.6-.3c-1.6-.7-2.6-1.5-2.6-3.2 0-1.7 1.4-3 3.3-3 1.5 0 2.5.6 3.2 1.8l-1.8 1.1c-.3-.6-.7-.9-1.4-.9s-1.1.4-1.1.9c0 .5.4.8 1.3 1.1l.6.2c1.8.7 2.8 1.5 2.8 3.3 0 1.9-1.5 3.1-3.7 3.1-2.1 0-3.3-1-3.7-2.3z"
      fill="#ffffff"
    />
  </svg>
);

export const Html5Icon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path fill="#e34f26" d="M3 2l1.8 20.2L12 24l7.2-1.8L21 2H3z" />
    <path fill="#ef652a" d="M12 3.8v18.4l5.6-1.4L19.2 3.8H12z" />
    <path fill="#ffffff" d="M12 7.7H7.7l.3 3.4H12v-3.4zm0 6.6H9.7l-.2-2.1H7.5l.4 4.5H12v-2.4zm0 0" />
    <path fill="#ebebeb" d="M12 7.7v3.4h4l-.4 4.3-3.6 1v2.5l5.8-1.6.7-7.2L12 7.7h6.3l-.2 2.4z" />
  </svg>
);

export const Css3Icon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path fill="#1572b6" d="M3 2l1.8 20.2L12 24l7.2-1.8L21 2H3z" />
    <path fill="#33a9dc" d="M12 3.8v18.4l5.6-1.4L19.2 3.8H12z" />
    <path fill="#ffffff" d="M12 7.7H7.7l.3 3.4H12v-3.4zm0 6.6H9.7l-.2-2.1H7.5l.4 4.5H12v-2.4zm0 0" />
    <path fill="#ebebeb" d="M12 7.7v3.4h4l-.4 4.3-3.6 1v2.5l5.8-1.6.7-7.2L12 7.7h6.3l-.2 2.4z" />
  </svg>
);

export const FlaskIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10 2v7.31a2 2 0 0 1-.37 1.17L4.22 18.4A2 2 0 0 0 5.89 21h12.22a2 2 0 0 0 1.67-2.6l-5.41-7.92A2 2 0 0 1 14 9.31V2" stroke="#000000" />
    <path d="M8.5 2h7" stroke="#000000" />
    <path d="M7 16h10" stroke="#000000" />
  </svg>
);

export const PandasIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <rect x="3" y="3" width="7" height="18" rx="2" fill="#150458" />
    <rect x="14" y="3" width="7" height="8" rx="2" fill="#ff4d5b" />
    <rect x="14" y="13" width="7" height="8" rx="2" fill="#00e5a3" />
  </svg>
);

export const ThreeJsIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M3 3l9 18 9-18L12 6.5 3 3zm9 6.2L16.2 5 12 14.5 7.8 5 12 9.2z" />
  </svg>
);

export const TailwindIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"
      fill="#06b6d4"
    />
  </svg>
);

export const MySqlIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path fill="#00758f" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    <path fill="#f29111" d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
  </svg>
);

export const SQLiteIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <rect width="24" height="24" rx="4" fill="#003b57" />
    <path d="M6 7h12v3H9v2h8v3H9v2h9v3H6V7z" fill="#00adef" />
  </svg>
);

export const GitIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path
      fill="#f05032"
      d="M21.6 10.6L13.4 2.4c-.8-.8-2.1-.8-2.9 0L8.4 4.5l3.7 3.7c.9-.3 1.9 0 2.5.6.7.7.9 1.7.6 2.6l3.6 3.6c.9-.3 1.9 0 2.6.6 1 .1 1.7.9 1.7 2 0 1.1-.9 2-2 2s-2-.9-2-2c0-.3.1-.6.2-.9l-3.3-3.3v4.6c.3.2.6.5.7.8 1 .1 1.7.9 1.7 2 0 1.1-.9 2-2 2s-2-.9-2-2c0-.8.5-1.5 1.2-1.8v-4.8c-.7-.3-1.2-1-1.2-1.8 0-.4.1-.7.3-1L9 11.2V17c.3.2.6.5.7.8 1 .1 1.7.9 1.7 2 0 1.1-.9 2-2 2s-2-.9-2-2c0-.8.5-1.5 1.2-1.8V9.8c-.7-.3-1.2-1-1.2-1.8 0-.5.2-1 .5-1.4L4.5 8.7c-.8.8-.8 2.1 0 2.9l8.2 8.2c.8.8 2.1.8 2.9 0l6-6c.8-.8.8-2.1 0-2.9z"
    />
  </svg>
);

export const VercelIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 1L24 22H0L12 1Z" />
  </svg>
);

export const RenderIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#46e3b7" stroke="#46e3b7" />
  </svg>
);

export const CanvaIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="12" r="11" fill="#00c4cc" />
    <path d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6c1.6 0 3-.6 4.1-1.6l-1.4-1.4c-.7.7-1.7 1.1-2.7 1.1-2.2 0-4-1.8-4-4s1.8-4 4-4c1.1 0 2.1.4 2.8 1.2l1.4-1.4C15.1 6.7 13.6 6 12 6z" fill="#ffffff" />
  </svg>
);

export const FigmaIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path fill="#0acf83" d="M12 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" />
    <path fill="#a259ff" d="M6 12a3 3 0 0 1 3-3h3v6H9a3 3 0 0 1-3-3z" />
    <path fill="#f24e1e" d="M6 6a3 3 0 0 1 3-3h3v6H9a3 3 0 0 1-3-3z" />
    <path fill="#ff7262" d="M12 3h3a3 3 0 0 1 0 6h-3V3z" />
    <path fill="#1abcfe" d="M6 18a3 3 0 0 0 3 3 3 3 0 0 0 3-3v-3H9a3 3 0 0 0-3 3z" />
  </svg>
);

