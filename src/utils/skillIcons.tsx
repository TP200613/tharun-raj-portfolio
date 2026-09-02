import React from 'react';
import {
  PythonIcon,
  SqlIcon,
  ReactIcon,
  TypeScriptIcon,
  JavaScriptIcon,
  Html5Icon,
  Css3Icon,
  TailwindIcon,
  FlaskIcon,
  PandasIcon,
  ThreeJsIcon,
  MySqlIcon,
  SQLiteIcon,
  GitIcon,
  GithubIcon,
  VercelIcon,
  RenderIcon,
  CanvaIcon,
  FigmaIcon
} from '../components/Icons';

export const getSkillLogo = (skillName: string, size = 22): React.ReactNode => {
  const norm = skillName.toLowerCase();
  if (norm.includes('python')) return <PythonIcon size={size} />;
  if (norm.includes('sql') && !norm.includes('sqlite') && !norm.includes('mysql')) return <SqlIcon size={size} />;
  if (norm.includes('react') && !norm.includes('three')) return <ReactIcon size={size} />;
  if (norm.includes('typescript')) return <TypeScriptIcon size={size} />;
  if (norm.includes('javascript')) return <JavaScriptIcon size={size} />;
  if (norm.includes('html')) return <Html5Icon size={size} />;
  if (norm.includes('css') && !norm.includes('tailwind')) return <Css3Icon size={size} />;
  if (norm.includes('tailwind')) return <TailwindIcon size={size} />;
  if (norm.includes('flask')) return <FlaskIcon size={size} />;
  if (norm.includes('pandas')) return <PandasIcon size={size} />;
  if (norm.includes('three')) return <ThreeJsIcon size={size} />;
  if (norm.includes('mysql')) return <MySqlIcon size={size} />;
  if (norm.includes('sqlite')) return <SQLiteIcon size={size} />;
  if (norm === 'git') return <GitIcon size={size} />;
  if (norm.includes('github')) return <GithubIcon size={size} />;
  if (norm.includes('vercel')) return <VercelIcon size={size} />;
  if (norm.includes('render')) return <RenderIcon size={size} />;
  if (norm.includes('canva')) return <CanvaIcon size={size} />;
  if (norm.includes('figma') || norm.includes('ui/ux') || norm.includes('ui & ux')) return <FigmaIcon size={size} />;
  return null;
};
