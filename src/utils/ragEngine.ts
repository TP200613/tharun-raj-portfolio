import type { PageId } from '../types/theme';

export interface RAGDocument {
  id: string;
  category: 'profile' | 'education' | 'projects' | 'skills' | 'leetcode' | 'certifications' | 'experience' | 'philosophy' | 'contact' | 'recruitment' | 'terminal' | 'hobbies';
  title: string;
  keywords: string[];
  content: string;
  action?: {
    label: string;
    page?: PageId;
    isResume?: boolean;
    externalUrl?: string;
  };
  suggestedFollowUps: string[];
}

export interface RAGResponse {
  answer: string;
  retrievedDocs: { id: string; title: string; score: number }[];
  action?: {
    label: string;
    page?: PageId;
    isResume?: boolean;
    externalUrl?: string;
  };
  suggestedFollowUps: string[];
}

export const KNOWLEDGE_BASE: RAGDocument[] = [
  {
    id: 'bio-overview',
    category: 'profile',
    title: 'Personal Biography & Academic Profile',
    keywords: [
      'who is', 'about', 'tharun', 'raj', 'profile', 'bio', 'biography', 'identity', 'introduce', 'overview',
      'background', 'details', 'tell me about yourself', 'summary'
    ],
    content: `THARUN RAJ T P is an aspiring AI & Data Engineer and Full-Stack Developer currently pursuing his Bachelor of Technology (B.Tech) in Computer Science & Engineering with specialization in Artificial Intelligence and Data Engineering at Lovely Professional University (LPU), Phagwara, Punjab (Aug 2025 - Present), maintaining a strong CGPA of 7.88/10.0.\n\nHe is from Cuddalore, Tamil Nadu. Tharun is a builder who thrives on hands-on project creation—having built GitPulse (a full-stack 3D GitHub profile analytics platform) solo in 5 weeks, maintained a consecutive 30+ day LeetCode daily problem solving streak in July 2026, and earned 8 verified Microsoft certificates through the Microsoft AI Skills Fest.`,
    action: { label: 'Explore Engineering Journey', page: 'about' },
    suggestedFollowUps: [
      'Tell me about his GitPulse flagship project',
      'What are his academic qualifications and CGPA?',
      'What technical skills does Tharun have?'
    ]
  },
  {
    id: 'education-lpu',
    category: 'education',
    title: 'B.Tech Education at Lovely Professional University (LPU)',
    keywords: [
      'lpu', 'education', 'degree', 'university', 'college', 'b.tech', 'cgpa', 'grades', 'score', 'marks',
      'academics', 'academic', 'qualification', 'studies', 'study', 'phagwara', 'punjab', 'coursework'
    ],
    content: `Tharun's formal academic credentials:\n1. 🎓 Lovely Professional University (LPU) — Phagwara, Punjab\n   • Degree: Bachelor of Technology (B.Tech) in Computer Science and Engineering\n   • Specialization: Artificial Intelligence and Data Engineering\n   • Period: Aug 2025 - Present\n   • Academic Standing: CGPA 7.88 / 10.0\n   • Core Focus: Relational Database Systems, Python, SQL, Data Structures & Algorithms, Machine Learning Foundations.\n\n2. 🏫 Sri Valli Vilas Alaya — Cuddalore, Tamil Nadu\n   • Senior School Certificate (Class XII) - CBSE\n   • Period: May 2024\n   • Percentage: 79.6%\n   • Focus: Mathematics, Physics, Chemistry, Computer Science.\n\n3. 🏫 Edify School Vazhappattu Neelikkupam — Cuddalore, Tamil Nadu\n   • Secondary School Examination (Class X) - CBSE\n   • Year: 2022 (Completed with distinction).`,
    action: { label: 'View Academic Timeline', page: 'about' },
    suggestedFollowUps: [
      'What Microsoft certifications has he completed?',
      'View his 30+ days LeetCode daily streak',
      'Open official resume modal'
    ]
  },
  {
    id: 'gitpulse-flagship',
    category: 'projects',
    title: 'GitPulse Flagship 3D GitHub Analytics Platform',
    keywords: [
      'gitpulse', 'flagship', 'project', 'projects', 'three.js', 'flask', '3d', 'github api', 'analytics',
      'commit', 'streak', 'topology', 'sqlite', 'render', 'vercel', 'build', 'architecture', 'webgl'
    ],
    content: `GitPulse is Tharun's flagship full-stack GitHub profile analytics platform designed and built solo in 5 weeks.\n\nKey Architecture & Engineering Highlights:\n• Live Data Ingestion: Connects to GitHub REST API with pagination support to fetch and process large commit histories.\n• SQLite Analytics Engine: Computes 0–100 consistency scores, commit streaks, language distribution, and repo rankings based on stars and forks.\n• 3D WebGL Topology: Interactive 3D commit visualizer using Three.js and React Three Fiber with custom orbit controls and shaders.\n• Multi-User Comparison: Side-by-side developer profile comparison with responsive React analytics charts.\n• Full-Stack Deployment: Python Flask backend deployed as a cloud microservice on Render, and React + Vite frontend deployed on Vercel with environment configuration.`,
    action: { label: 'Explore GitPulse & Projects', page: 'projects' },
    suggestedFollowUps: [
      'What other engineering projects has he built?',
      'What is his Python and React skill level?',
      'Can I see his GitHub repositories?'
    ]
  },
  {
    id: 'ai-data-pipeline',
    category: 'projects',
    title: 'AI & Data Engineering Pipeline Architecture',
    keywords: [
      'data pipeline', 'etl', 'data engineering', 'schema', 'indexing', 'pandas', 'pipeline', 'sql analytics',
      'aggregation', 'mysql', 'sqlite engine'
    ],
    content: `The AI & Data Engineering Pipeline is a structured Python-based ETL and analytical aggregation engine designed by Tharun.\n\nHighlights:\n• Modular data extraction and ingestion with strict schema validation and type integrity checks.\n• Sub-millisecond indexed SQL querying and aggregation in SQLite & MySQL for analytical dashboards.\n• Data cleaning, normalization, and time-series aggregation using Pandas.\n• Designed for scalable integration into backend microservices.`,
    action: { label: 'View Projects Hub', page: 'projects' },
    suggestedFollowUps: [
      'How does he use SQL and Pandas?',
      'View his full skills matrix',
      'Ask about his GitPulse project'
    ]
  },
  {
    id: 'leetcode-streak',
    category: 'leetcode',
    title: 'LeetCode Problem Solving & 30+ Day Consecutive Streak',
    keywords: [
      'leetcode', 'dsa', 'streak', 'daily challenge', 'algorithms', 'data structures', 'problem solving',
      'july 2026', 'two pointers', 'binary search', 'hash table', 'streak days', '30 days', 'coding'
    ],
    content: `In July 2026, Tharun accomplished a 30+ consecutive days daily challenge streak on LeetCode (@_Tharun_13), solving at least one algorithmic problem every single day without missing a day.\n\nProblem Breakdown & Competencies:\n• Total Solved in Streak: 30+ Problems (18 Easy, 12 Medium, 2 Hard)\n• Primary Focus Areas: Array Manipulation, Two Pointers, String Algorithms, Hash Tables, Binary Search, and Basic Recursion.\n• Rigorous Methodology: Every problem was documented with Big-O asymptotic time & space complexity profiling and edge-case validation.\n• Solutions Vault: Maintained in his public GitHub repository (TP200613/Leetcode).`,
    action: { label: 'Explore DSA & LeetCode Hub', page: 'skills' },
    suggestedFollowUps: [
      'Can I view his LeetCode profile?',
      'What are his core algorithmic strengths?',
      'How does he approach problem solving?'
    ]
  },
  {
    id: 'microsoft-certifications',
    category: 'certifications',
    title: 'Microsoft AI Skills Fest Verified Certifications (8x)',
    keywords: [
      'certificate', 'certificates', 'certification', 'microsoft', 'ai fest', 'skills fest', 'credentials',
      'code scanning', 'actions', 'ci/cd', 'github cert', 'copilot', 'security', 'verified'
    ],
    content: `Tharun completed the Microsoft AI Skills Fest (AI & Data Engineering Track, Jun–Jul 2026) and holds 8 verified Microsoft certificate assessments:\n1. Configure code scanning on GitHub (Static Analysis, CodeQL, Vulnerability Triage)\n2. Maintain a secure repository by using GitHub best practices (Branch Protection, Secret Scanning)\n3. Build continuous integration workflows by using GitHub Actions (YAML CI Pipelines, Automated Testing)\n4. Automate development tasks by using GitHub Actions (Scheduled Triggers, Deployment Webhooks)\n5. Introduction to GitHub (Repository Management, PRs, Issue Tracking)\n6. Introduction to GitHub's products (Codespaces, Enterprise, CLI)\n7. Introduction to Git (Distributed VCS, Branching, Rebasing)\n8. Explore prebuilt Microsoft 365 Copilot agents (Generative AI Agents, Workflow Orchestration)`,
    action: { label: 'View Verified Certifications', page: 'about' },
    suggestedFollowUps: [
      'What are his DevOps and CI/CD skills?',
      'Summarize his resume and experience',
      'Why should a team hire Tharun?'
    ]
  },
  {
    id: 'skills-tech-stack',
    category: 'skills',
    title: 'Technical Skills Matrix & Stack Proficiencies (~60% Intermediate)',
    keywords: [
      'skills', 'skill', 'tech stack', 'technologies', 'languages', 'frameworks', 'tools', 'python', 'sql',
      'react', 'flask', 'typescript', 'javascript', 'html', 'css', 'tailwind', 'sqlite', 'mysql', 'git',
      'github', 'pandas', 'three.js', 'proficiency', 'level', 'intermediate', '60%'
    ],
    content: `Tharun has an Intermediate (~60%) proficiency level with hands-on building experience across modern full-stack, data, and cloud engineering:\n\n• Programming Languages: Python (60%), SQL (60%), JavaScript ES6+ (60%), TypeScript (60%), HTML5 & CSS3 (65%)\n• Frameworks & Libraries: React (60%), Flask (60%), Three.js & React Three Fiber (60%), Pandas (60%), Tailwind CSS (65%)\n• Databases: SQLite (60%), MySQL (60%)\n• DevOps & Tools: Git (65%), GitHub & GitHub Actions (65%), Canva (60%), Vercel & Render (60%)\n• Core Practical Usage: RESTful APIs with Flask, reactive components with React, 3D interactive WebGL with Three.js, relational schema indexing in SQLite/MySQL.`,
    action: { label: 'View Technical Skills Grid', page: 'skills' },
    suggestedFollowUps: [
      'What projects has he built with Python and React?',
      'Tell me about his soft skills',
      'View his LeetCode streak and DSA background'
    ]
  },
  {
    id: 'soft-skills-mindset',
    category: 'skills',
    title: 'Soft Skills, Engineering Mindset & Character',
    keywords: [
      'soft skills', 'mindset', 'collaboration', 'problem solving', 'analytical', 'research', 'adaptability',
      'teamwork', 'communication', 'attitude', 'character', 'work ethic', 'learning'
    ],
    content: `Tharun combines technical skill with 5 foundational engineering soft skills (evaluated at ~65% Intermediate level):\n\n1. 🧠 Analytical Thinking (65%): Systematically breaking down complex relational schemas, calculating Big-O asymptotic complexity, and indexing queries.\n2. ⚡ Problem Solving (65%): Root-cause debugging, edge-case tracing, demonstrated by his 30+ consecutive days LeetCode daily streak.\n3. 🤝 Team Collaboration (60%): Agile workflows, thorough markdown documentation, pull-request hygiene, and pair-programming empathy.\n4. 💡 Research Mindset (65%): Continuous curiosity to self-learn new frameworks (like learning Three.js to render 3D commit topologies in 5 weeks).\n5. 🧭 Adaptability & Agility (65%): Seamless context switching between Python Flask backend logic, React UI interfaces, and SQL querying.`,
    action: { label: 'Interactive Soft Skills Avatar', page: 'skills' },
    suggestedFollowUps: [
      'Why is Tharun a strong hire for a team?',
      'How does he collaborate on GitHub?',
      'Tell me about his daily habits'
    ]
  },
  {
    id: 'why-hire-tharun',
    category: 'recruitment',
    title: 'Why Hire Tharun Raj T P? / Value Proposition',
    keywords: [
      'hire', 'why hire', 'candidate', 'recruitment', 'job', 'internship', 'strengths', 'value', 'fit',
      'junior engineer', 'full stack developer', 'data engineer', 'reasons', 'team fit'
    ],
    content: `Why THARUN RAJ T P is an outstanding candidate for engineering teams and internships:\n\n1. 🚀 Proven Hands-On Execution: Built GitPulse—a full-stack platform with Python Flask, React, Three.js 3D visuals, and SQLite analytics—completely solo in 5 weeks.\n2. 🔥 Disciplined Problem-Solving Habit: Solved LeetCode challenges every single day in July 2026 (30+ consecutive days streak) with structured pattern notes.\n3. 📜 Certified in Modern Workflows: Holds 8 verified Microsoft certificates covering Git, GitHub Code Security, and automated GitHub Actions CI/CD pipelines.\n4. 🎓 Strong Academic Foundation: Maintaining a 7.88 CGPA in B.Tech CSE (AI & Data Engineering) at Lovely Professional University.\n5. 🤝 Eager Learner & Team Player: Intermediate proficiency (60%) with strong adaptability, fast learning velocity, and clean documentation habits.`,
    action: { label: 'Contact Tharun Directly', page: 'contact' },
    suggestedFollowUps: [
      'View his official formatted resume',
      'What roles is Tharun targeting?',
      'How do I contact Tharun?'
    ]
  },
  {
    id: 'contact-channels',
    category: 'contact',
    title: 'Contact Information & Social Links',
    keywords: [
      'contact', 'email', 'phone', 'mobile', 'reach', 'message', 'touch', 'linkedin', 'github', 'address',
      'location', 'connect', 'hire me', 'socials'
    ],
    content: `You can reach THARUN RAJ T P through any of these direct channels:\n\n• 📧 Email: TharunRajTP@proton.me\n• 📱 Mobile / Phone: +91-8825872961\n• 💼 LinkedIn: https://www.linkedin.com/in/tharun1306\n• 🐙 GitHub: https://github.com/TP200613\n• ⚡ LeetCode: https://leetcode.com/u/_Tharun_13/\n• 📍 Current Location: Lovely Professional University, Phagwara, Punjab (144411)\n• 🏠 Hometown: Cuddalore, Tamil Nadu`,
    action: { label: 'Open Contact Form', page: 'contact' },
    suggestedFollowUps: [
      'Open official resume modal',
      'Ask about his projects',
      'Why should we hire Tharun?'
    ]
  },
  {
    id: 'resume-cv',
    category: 'profile',
    title: 'Official Resume & Curriculum Vitae (CV)',
    keywords: [
      'resume', 'cv', 'curriculum vitae', 'download resume', 'print resume', 'pdf', 'credentials', 'experience sheet'
    ],
    content: `Tharun's official verified resume is available directly in the portfolio. It highlights:\n• B.Tech in CSE (AI & Data Engineering) @ LPU (CGPA: 7.88)\n• Flagship build: GitPulse (solo 5-week build with Python Flask, React, Three.js 3D topology, SQLite analytics)\n• 30+ days consecutive LeetCode streak (July 2026)\n• 8x verified Microsoft certificates (Git, GitHub Security, Actions CI/CD, Copilot)\n• Technical skill stack (~60% Intermediate level across Python, SQL, React, Flask, Three.js)\n• Senior Secondary (Class XII CBSE: 79.6%) & Class X CBSE education.`,
    action: { label: 'Open Official Resume Modal', isResume: true },
    suggestedFollowUps: [
      'Summarize his education at LPU',
      'Tell me about GitPulse',
      'Contact Tharun directly'
    ]
  },
  {
    id: 'dev-philosophy',
    category: 'philosophy',
    title: 'Developer Philosophy & Core Values',
    keywords: [
      'philosophy', 'principles', 'values', 'coding style', 'approach', 'belief', 'craft', 'quotes'
    ],
    content: `Tharun's core engineering philosophy:\n“Real engineering mastery is born from hands-on building. By connecting APIs, relational databases, analytics layers, and interactive 3D user interfaces, software turns from theoretical concepts into reliable, functional systems.”\n\nCore Principles:\n1. Build to Learn: The fastest way to master a stack is building end-to-end applications.\n2. Respect Edge Cases & Complexity: Write clean O(n) or O(log n) logic and validate memory constraints.\n3. Verify with Data: Use benchmark metrics, schema normalization, and automated testing.`,
    action: { label: 'Explore Engineering Narrative', page: 'about' },
    suggestedFollowUps: [
      'How was GitPulse built in 5 weeks?',
      'View his LeetCode streak',
      'What are his technical skills?'
    ]
  },
  {
    id: 'mainframe-terminal',
    category: 'terminal',
    title: 'Mainframe Terminal OS & Interactive Shell',
    keywords: [
      'terminal', 'shell', 'bash', 'console', 'commands', 'cli', 'unix', 'sudo hire-me', 'matrix'
    ],
    content: `The Mainframe Terminal is an interactive retro-futuristic Unix shell built into the portfolio.\n\nAvailable Commands:\n• 'help' — List all available system commands\n• 'about' — Read Tharun's background and LPU standing (CGPA 7.88)\n• 'gitpulse' — Inspect GitPulse architecture & solo 5-week build\n• 'skills' — List technical & soft competencies (60% Intermediate)\n• 'education' — View LPU, Class XII (79.6%), and Class X details\n• 'certificates' — View 8x Microsoft AI Fest verified certificates\n• 'stats' — View 30+ Days LeetCode daily streak\n• 'contact' — Get direct email & phone channels\n• 'matrix' — Trigger green matrix rain\n• 'sudo hire-me' — Trigger recruitment protocol & confetti!`,
    action: { label: 'Open Mainframe Terminal', page: 'terminal' },
    suggestedFollowUps: [
      'What is GitPulse?',
      'How do I hire Tharun?',
      'View his resume'
    ]
  }
];

// Simple stop-word list to filter noise in queries
const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', "aren't",
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', "can't",
  'cannot', 'could', "couldn't", 'did', "didn't", 'do', 'does', "doesn't", 'doing', "don't", 'down', 'during',
  'each', 'few', 'for', 'from', 'further', 'had', "hadn't", 'has', "hasn't", 'have', "haven't", 'having', 'he',
  "he'd", "he'll", "he's", 'her', 'here', "here's", 'hers', 'herself', 'him', 'himself', 'his', 'how', "how's",
  'i', "i'd", "i'll", "i'm", "i've", 'if', 'in', 'into', 'is', "isn't", 'it', "it's", 'its', 'itself', "let's",
  'me', 'more', 'most', "mustn't", 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or',
  'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', "shan't", 'she', "she'd", "she'll",
  "she's", 'should', "shouldn't", 'so', 'some', 'such', 'than', 'that', "that's", 'the', 'their', 'theirs',
  'them', 'themselves', 'then', 'there', "there's", 'these', 'they', "they'd", "they'll", "they're", "they've",
  'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', "wasn't", 'we', "we'd", "we'll",
  "we're", "we've", 'were', "weren't", 'what', "what's", 'when', "when's", 'where', "where's", 'which', 'while',
  'who', "who's", 'whom', 'why', "why's", 'with', "won't", 'would', "wouldn't", 'you', "you'd", "you'll", "you're",
  "you've", 'your', 'yours', 'yourself', 'yourselves'
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

/**
 * Client-Side RAG Retrieval & Synthesis Engine
 */
export function queryTharunRAG(userQuery: string): RAGResponse {
  const cleanQuery = userQuery.trim();
  const lowerQuery = cleanQuery.toLowerCase();
  const tokens = tokenize(cleanQuery);

  // Fallback greeting check
  if (
    tokens.length === 0 ||
    lowerQuery === 'hi' ||
    lowerQuery === 'hello' ||
    lowerQuery === 'hey' ||
    lowerQuery.startsWith('hi ') ||
    lowerQuery.startsWith('hello ')
  ) {
    return {
      answer: `Hello! 👋 I am Tharun AI, the intelligent RAG-powered copilot for THARUN RAJ T P. I have complete indexed knowledge of his academic record at LPU (CGPA 7.88), his GitPulse 3D analytics platform, LeetCode 30+ day streak, 8x Microsoft certificates, technical skill set (~60% Intermediate), and official resume. What would you like to know?`,
      retrievedDocs: [{ id: 'bio-overview', title: 'Personal Biography & Academic Profile', score: 1.0 }],
      action: { label: 'Explore GitPulse & Projects', page: 'projects' },
      suggestedFollowUps: [
        'Why should a team hire Tharun?',
        'How was GitPulse built?',
        'View official formatted resume',
        'Tell me about his 30+ days LeetCode streak'
      ]
    };
  }

  // Calculate semantic relevance scores across all documents in knowledge base
  const scoredDocs = KNOWLEDGE_BASE.map((doc) => {
    let score = 0;
    const docTextLower = (doc.title + ' ' + doc.keywords.join(' ') + ' ' + doc.content).toLowerCase();

    // 1. Exact phrase matching bonus
    if (docTextLower.includes(lowerQuery)) {
      score += 12;
    }

    // 2. Keyword exact / partial matches
    for (const kw of doc.keywords) {
      if (lowerQuery.includes(kw)) {
        score += 8 + kw.length * 0.5;
      }
    }

    // 3. Token-based TF-IDF style term frequency
    for (const token of tokens) {
      if (doc.title.toLowerCase().includes(token)) {
        score += 6;
      }
      if (doc.keywords.some((k) => k.includes(token))) {
        score += 4;
      }
      const occurrences = (docTextLower.match(new RegExp(`\\b${token}`, 'g')) || []).length;
      score += Math.min(occurrences * 1.5, 6);
    }

    return { doc, score };
  });

  // Sort descending by relevance score
  scoredDocs.sort((a, b) => b.score - a.score);

  const topMatch = scoredDocs[0];
  const secondaryMatch = scoredDocs[1];

  // If match score is sufficient, formulate grounded RAG synthesis
  if (topMatch && topMatch.score > 2) {
    const retrieved = [
      { id: topMatch.doc.id, title: topMatch.doc.title, score: Math.round(topMatch.score * 10) / 10 },
      ...(secondaryMatch && secondaryMatch.score > 4
        ? [{ id: secondaryMatch.doc.id, title: secondaryMatch.doc.title, score: Math.round(secondaryMatch.score * 10) / 10 }]
        : [])
    ];

    let synthesizedAnswer = topMatch.doc.content;

    // If secondary match is also strongly relevant and complementary, add contextual summary
    if (secondaryMatch && secondaryMatch.score > 8 && secondaryMatch.doc.id !== topMatch.doc.id) {
      synthesizedAnswer += `\n\n📌 Related Highlight (${secondaryMatch.doc.title}):\n${secondaryMatch.doc.content.split('\n')[0]}`;
    }

    return {
      answer: synthesizedAnswer,
      retrievedDocs: retrieved,
      action: topMatch.doc.action,
      suggestedFollowUps: topMatch.doc.suggestedFollowUps || [
        'View official formatted resume',
        'Tell me about GitPulse 3D architecture',
        'How to contact Tharun?'
      ]
    };
  }

  // Fallback synthesis with full overview
  return {
    answer: `THARUN RAJ T P is an AI & Data Engineering undergraduate at Lovely Professional University (CGPA: 7.88), creator of GitPulse (full-stack 3D GitHub analytics platform built solo in 5 weeks), and holds 8 verified Microsoft certificates. His technical skills are at an Intermediate level (~60%) across Python, SQL, React, Flask, Three.js, and SQLite.\n\nI couldn't find a direct exact match for "${cleanQuery}", but you can ask me about his projects, LeetCode streak, education, skills, or contact channels!`,
    retrievedDocs: [{ id: 'bio-overview', title: 'Personal Biography & Academic Profile', score: 1.0 }],
    action: { label: 'Contact Tharun', page: 'contact' },
    suggestedFollowUps: [
      'Tell me about his GitPulse flagship project',
      'What are his academic qualifications and CGPA?',
      'Why should our team hire Tharun Raj?'
    ]
  };
}
