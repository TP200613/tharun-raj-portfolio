export type PageId = 'home' | 'about' | 'projects' | 'skills' | 'terminal' | 'contact';

export interface AccentTheme {
  id: string;
  name: string;
  color: string;
  tag: string;
  previewClass: string;
}

export const ACCENT_THEMES: AccentTheme[] = [
  {
    id: 'burgundy',
    name: 'Deep Burgundy & Gold Sand',
    color: '#4A0E17',
    tag: 'Imperial Burgundy & Gold Sand',
    previewClass: 'from-[#4A0E17] via-[#6E1A27] to-[#C8A464]'
  },
  {
    id: 'datapacket',
    name: 'Data Packet Stream',
    color: '#06b6d4',
    tag: 'Data Engineering & Pipeline',
    previewClass: 'from-[#06b6d4] via-[#3b82f6] to-[#10b981]'
  },
  {
    id: 'sandal',
    name: 'Sandalwood Gold',
    color: '#b8860b',
    tag: 'Signature Luxury',
    previewClass: 'from-[#b8860b] via-[#d4af37] to-[#8c6721]'
  },
  {
    id: 'rosegold',
    name: 'Rose Gold & Noir',
    color: '#e11d48',
    tag: 'Haute Prestige',
    previewClass: 'from-[#e11d48] via-[#fb7185] to-[#9f1239]'
  },
  {
    id: 'emerald',
    name: 'Imperial Emerald',
    color: '#059669',
    tag: 'Royal Tech & Data',
    previewClass: 'from-[#059669] via-[#10b981] to-[#047857]'
  },
  {
    id: 'sapphire',
    name: 'Monaco Sapphire',
    color: '#2563eb',
    tag: 'Executive Cobalt',
    previewClass: 'from-[#2563eb] via-[#3b82f6] to-[#1d4ed8]'
  },
  {
    id: 'amethyst',
    name: 'Cyber Amethyst',
    color: '#7c3aed',
    tag: 'AI Intelligence',
    previewClass: 'from-[#7c3aed] via-[#8b5cf6] to-[#6d28d9]'
  },
  {
    id: 'amber',
    name: 'Solar Amber',
    color: '#ea580c',
    tag: 'Warm Radiant',
    previewClass: 'from-[#ea580c] via-[#f97316] to-[#c2410c]'
  },
  {
    id: 'cyan',
    name: 'Glacier Cyan',
    color: '#0891b2',
    tag: 'Arctic Modern',
    previewClass: 'from-[#0891b2] via-[#06b6d4] to-[#0e7490]'
  },
  {
    id: 'cognac',
    name: 'Monaco Cognac',
    color: '#b45309',
    tag: 'Vintage Bronze',
    previewClass: 'from-[#b45309] via-[#d97706] to-[#92400e]'
  },
  {
    id: 'slate',
    name: 'Titanium Slate',
    color: '#475569',
    tag: 'Architectural Steel',
    previewClass: 'from-[#475569] via-[#64748b] to-[#1e293b]'
  },
  {
    id: 'bordeaux',
    name: 'Bordeaux Velvet',
    color: '#9f1239',
    tag: 'Deep Parisian Wine',
    previewClass: 'from-[#9f1239] via-[#be123c] to-[#881337]'
  }
];
