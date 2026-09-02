export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Full Stack' | 'Data & Analytics' | 'AI & 3D' | 'Algorithms & Systems';
  description: string;
  longDescription: string;
  architecture: string[];
  metrics: string[];
  tags: string[];
  github: string;
  demo: string;
  featured: boolean;
  accent: string;
  image?: string;
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    level: number; // 0-100
    experience: string;
    icon?: string;
  }[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  track?: string;
  category: 'CI/CD & Automation' | 'Security & Scanning' | 'Git & Version Control' | 'AI & Copilot';
  status: string;
  skills: string[];
  verification?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  location: string;
  period: string;
  score: string;
  scoreType: 'CGPA' | 'Percentage' | 'Completion';
  highlights?: string[];
}

export interface TimelineItem {
  year: string;
  title: string;
  organization: string;
  location: string;
  type: 'Education' | 'Experience' | 'Achievement' | 'Milestone' | 'Certification';
  description: string;
  highlights: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'THARUN RAJ T P',
    handle: 'TP200613',
    role: 'B.Tech CSE (AI and Data Engineering)',
    secondaryRoles: [
      'Full-Stack Developer (React & Flask)',
      'AI & Data Engineering Student',
      'Python & SQL Specialist',
      'Hands-On Project Builder'
    ],
    status: 'B.Tech CSE (AI & Data) @ Lovely Professional University | CGPA: 7.88',
    location: 'Lovely Professional University, Phagwara, Punjab',
    hometown: 'Cuddalore, Tamil Nadu',
    email: 'TharunRajTP@proton.me',
    phone: '+91-8825872961',
    github: 'https://github.com/TP200613/TP200613',
    githubProfile: 'https://github.com/TP200613',
    linkedin: 'https://www.linkedin.com/in/tharun1306',
    leetcode: 'https://leetcode.com/u/_Tharun_13/',
    bio: 'B.Tech Computer Science and Engineering student specializing in Artificial Intelligence and Data Engineering at Lovely Professional University (CGPA: 7.88). Passionate about connecting software, data, and intelligent systems to build practical, real-world solutions through hands-on development.',
    philosophy: 'I believe true mastery comes from hands-on building. By connecting APIs, relational databases, analytics layers, and interactive 3D user interfaces, software turns from theoretical ideas into powerful functional systems.',
    stats: {
      leetcodeSolved: '30+ Days',
      leetcodeSubtext: 'Consecutive Streak',
      projectsCompleted: 'Flagship & Systems',
      commitsThisYear: 'Active GitHub',
      contestPercentile: 'CGPA 7.88'
    }
  },

  education: [
    {
      institution: 'Lovely Professional University',
      degree: 'Bachelor of Technology - CSE (AI and Data Engineering)',
      location: 'Phagwara, Punjab',
      period: 'Aug 2025 - Present',
      score: '7.88',
      scoreType: 'CGPA',
      highlights: [
        'Specialization in Artificial Intelligence and Data Engineering',
        'Strong academic foundation in Database Systems, Data Structures, Python, and SQL',
        'Hands-on project building: full-stack systems, 3D web visualizations, and data pipelines'
      ]
    },
    {
      institution: 'Sri Valli Vilas Alaya',
      degree: 'Senior School Certificate (Class XII) - CBSE',
      location: 'Cuddalore, Tamil Nadu',
      period: 'May 2024',
      score: '79.6%',
      scoreType: 'Percentage',
      highlights: [
        'Central Board of Secondary Education (CBSE) Senior Secondary Curriculum',
        'Comprehensive focus on Mathematics, Science, and Analytical Problem Solving'
      ]
    },
    {
      institution: 'Edify School Vazhappattu Neelikkupam',
      degree: 'Secondary School Examination (Class X) - CBSE',
      location: 'Cuddalore, Tamil Nadu',
      period: '2022',
      score: 'Completed',
      scoreType: 'Completion',
      highlights: [
        'Central Board of Secondary Education (CBSE) Secondary Curriculum',
        'Foundational academic excellence and early computer science interest'
      ]
    }
  ] as EducationItem[],

  training: {
    title: 'Microsoft AI Skills Fest',
    role: 'Attended / Completed',
    organization: 'Microsoft — Virtual Global Event',
    track: 'AI & Data Engineering Track',
    period: 'Jun 2026 – Jul 2026',
    highlights: [
      'Completed modules covering Git and GitHub fundamentals, including GitHub products and repository management.',
      'Learned secure repository practices, including GitHub code scanning and GitHub best practices.',
      'Gained hands-on exposure to GitHub Actions for continuous integration and development-task automation, along with prebuilt Microsoft 365 Copilot agents.'
    ]
  },

  certificates: [
    {
      id: 'ms-code-scanning',
      title: 'Configure code scanning on GitHub',
      issuer: 'Microsoft Learn / Microsoft AI Skills Fest',
      date: 'Completed on 6/6/2026',
      track: 'AI & Data Engineering Track',
      category: 'Security & Scanning',
      status: 'Module assessment passed',
      skills: ['CodeQL', 'Static Analysis', 'Vulnerability Triage', 'Security Scanning']
    },
    {
      id: 'ms-secure-repo',
      title: 'Maintain a secure repository by using GitHub best practices',
      issuer: 'Microsoft Learn / Microsoft AI Skills Fest',
      date: 'Completed on 6/6/2026',
      track: 'AI & Data Engineering Track',
      category: 'Security & Scanning',
      status: 'Module assessment passed',
      skills: ['Branch Protection', 'Secret Scanning', 'Security Policies', 'Repository Hardening']
    },
    {
      id: 'ms-ci-actions',
      title: 'Build continuous integration workflows by using GitHub Actions',
      issuer: 'Microsoft Learn / Microsoft AI Skills Fest',
      date: 'Completed on 6/6/2026',
      track: 'AI & Data Engineering Track',
      category: 'CI/CD & Automation',
      status: 'Module assessment passed',
      skills: ['GitHub Actions', 'YAML Pipelines', 'Automated Testing', 'CI Workflows']
    },
    {
      id: 'ms-automate-tasks',
      title: 'Automate development tasks by using GitHub Actions',
      issuer: 'Microsoft Learn / Microsoft AI Skills Fest',
      date: 'Completed on 6/5/2026',
      track: 'AI & Data Engineering Track',
      category: 'CI/CD & Automation',
      status: 'Module assessment passed',
      skills: ['Task Automation', 'Scheduled Triggers', 'Deployment Jobs', 'Event Webhooks']
    },
    {
      id: 'ms-intro-github',
      title: 'Introduction to GitHub',
      issuer: 'Microsoft Learn / Microsoft AI Skills Fest',
      date: 'Completed on 6/6/2026',
      track: 'AI & Data Engineering Track',
      category: 'Git & Version Control',
      status: 'Module assessment passed',
      skills: ['Repository Management', 'Pull Requests', 'Code Reviews', 'Issue Tracking']
    },
    {
      id: 'ms-github-products',
      title: 'Introduction to GitHub\'s products',
      issuer: 'Microsoft Learn / Microsoft AI Skills Fest',
      date: 'Completed on 6/6/2026',
      track: 'AI & Data Engineering Track',
      category: 'Git & Version Control',
      status: 'Module assessment passed',
      skills: ['GitHub Enterprise', 'Codespaces', 'GitHub CLI', 'Project Boards']
    },
    {
      id: 'ms-intro-git',
      title: 'Introduction to Git',
      issuer: 'Microsoft Learn / Microsoft AI Skills Fest',
      date: 'Completed on 6/6/2026',
      track: 'AI & Data Engineering Track',
      category: 'Git & Version Control',
      status: 'Module assessment passed',
      skills: ['Distributed VCS', 'Branching & Merging', 'Commit Staging', 'Rebase & History']
    },
    {
      id: 'ms-copilot-agents',
      title: 'Explore prebuilt Microsoft 365 Copilot agents',
      issuer: 'Microsoft Learn / Microsoft AI Skills Fest',
      date: 'Completed on 6/5/2026',
      track: 'AI & Data Engineering Track',
      category: 'AI & Copilot',
      status: 'Module assessment passed',
      skills: ['Microsoft Copilot', 'Generative AI Agents', 'Workflow Orchestration', 'Prompt Integration']
    }
  ] as CertificateItem[],

  achievements: [
    {
      title: '30+ Days Consecutive LeetCode Daily Challenge Streak',
      period: 'July 2026',
      description: 'Solved 30+ LeetCode problems consecutively, solving at least one problem every day throughout July 2026, with a focus on data structures and algorithms.'
    }
  ],

  leetcodeStats: {
    totalSolved: '30+',
    streakDays: 30,
    monthBadge: 'July 2026 Daily Streak',
    description: 'Solved 30+ LeetCode problems consecutively, solving at least one problem every day throughout July 2026, with a focus on data structures and algorithms.',
    breakdown: {
      easy: { solved: 18, total: 30, color: '#34d399' },
      medium: { solved: 12, total: 30, color: '#fbbf24' },
      hard: { solved: 2, total: 10, color: '#f87171' }
    },
    topCategories: [
      { name: 'Array Manipulation & Two Pointers', count: 'Core', level: 'Strong Focus' },
      { name: 'Strings & Hash Tables', count: 'Daily', level: 'Proficient' },
      { name: 'Binary Search & Math', count: 'Applied', level: 'Practiced' },
      { name: 'Recursion & Basic Trees', count: 'Structured', level: 'Active Practice' }
    ]
  },

  skillCategories: [
    {
      category: 'Languages',
      skills: [
        { name: 'Python', level: 60, experience: 'Intermediate' },
        { name: 'SQL', level: 60, experience: 'Intermediate' },
        { name: 'JavaScript (ES6+)', level: 60, experience: 'Intermediate' },
        { name: 'TypeScript', level: 60, experience: 'Intermediate' },
        { name: 'HTML5 & CSS3', level: 65, experience: 'Intermediate' }
      ]
    },
    {
      category: 'Technologies & Frameworks',
      skills: [
        { name: 'Pandas', level: 60, experience: 'Intermediate' },
        { name: 'React', level: 60, experience: 'Intermediate' },
        { name: 'Flask', level: 60, experience: 'Intermediate' },
        { name: 'Three.js & React Three Fiber', level: 60, experience: 'Intermediate' },
        { name: 'Tailwind CSS', level: 65, experience: 'Intermediate' }
      ]
    },
    {
      category: 'Databases & Tools',
      skills: [
        { name: 'MySQL', level: 60, experience: 'Intermediate' },
        { name: 'SQLite', level: 60, experience: 'Intermediate' },
        { name: 'Git', level: 65, experience: 'Intermediate' },
        { name: 'GitHub & GitHub Actions', level: 65, experience: 'Intermediate' },
        { name: 'Canva', level: 60, experience: 'Intermediate' },
        { name: 'Vercel & Render', level: 60, experience: 'Intermediate' }
      ]
    },
    {
      category: 'Soft Skills',
      skills: [
        { name: 'Analytical Thinking', level: 65, experience: 'Intermediate' },
        { name: 'Problem Solving', level: 65, experience: 'Intermediate' },
        { name: 'Team Collaboration', level: 60, experience: 'Intermediate' },
        { name: 'Research Mindset', level: 65, experience: 'Intermediate' },
        { name: 'Adaptability', level: 65, experience: 'Intermediate' }
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: 'gitpulse',
      title: 'GitPulse | 3D GitHub Intelligence',
      tagline: 'Full-stack developer intelligence platform with 3D Three.js commit topology visualization and SQLite analytics',
      category: 'Full Stack',
      description: 'Built a full-stack GitHub profile analytics platform solo in 5 weeks, fetching live data through the GitHub API with pagination support for large commit histories.',
      longDescription: 'GitPulse is a full-stack GitHub profile analytics platform built solo in 5 weeks. It fetches live data through the GitHub API with pagination support for large commit histories. Designed a SQLite analytics layer to calculate commit streaks, consistency scores (0–100), language detection, and repository rankings based on stars and forks. Implemented multi-user side-by-side comparison with interactive React charts and a 3D interface using Three.js and React Three Fiber, deployed with a Flask backend on Render and React + Vite frontend on Vercel with environment configuration.',
      architecture: [
        'Built a full-stack GitHub profile analytics platform solo in 5 weeks, fetching live data through the GitHub API with pagination support for large commit histories.',
        'Designed a SQLite analytics layer to calculate commit streaks, consistency scores (0–100), language detection, and repository rankings based on stars and forks.',
        'Implemented multi-user side-by-side comparison with interactive React charts and a 3D interface using Three.js and React Three Fiber, and deployed the complete application with a Flask backend on Render and React + Vite frontend on Vercel with environment configuration.'
      ],
      metrics: [
        'Solo 5-Week Build',
        '0–100 Consistency Metric',
        'Live 3D Three.js Visuals',
        'Vercel + Render Deployed'
      ],
      tags: ['React', 'TypeScript', 'Python', 'Flask', 'SQLite', 'Tailwind CSS', 'Three.js', 'GitHub API', 'Vercel', 'Render'],
      github: 'https://github.com/TP200613/TP200613',
      demo: 'https://github.com/TP200613/TP200613',
      featured: true,
      accent: 'from-cyan-500 via-blue-600 to-purple-600',
      image: './gitpulse_graphic.jpg'
    },
    {
      id: 'data-analytics-engine',
      title: 'AI & Data Engineering Pipeline',
      tagline: 'High-performance structured data processing engine with automated schema aggregation',
      category: 'Data & Analytics',
      description: 'Engineered automated ETL extraction and SQL analytics pipelines in Python for structured data aggregation and indexing.',
      longDescription: 'Designed and built a modular data pipeline system leveraging Python and SQLite/MySQL. Processes structured datasets, validates relational schemas, executes analytical queries, and generates automated insights for fast dashboard consumption.',
      architecture: [
        'Modular Python data ingestion with schema validation and type integrity checks',
        'Optimized SQL query indexing and aggregation for sub-millisecond execution',
        'Structured automated metrics generation and telemetry exports'
      ],
      metrics: ['Sub-ms Query Indexing', 'Automated ETL Pipelines', 'SQLite & Python Architecture'],
      tags: ['Python', 'SQL', 'SQLite', 'Pandas', 'Data Engineering'],
      github: 'https://github.com/TP200613',
      demo: 'https://github.com/TP200613',
      featured: true,
      accent: 'from-emerald-500 via-teal-600 to-cyan-600',
      image: './ai_pipeline_graphic.jpg'
    },
    {
      id: 'leetcode-solutions-vault',
      title: 'LeetCode DSA & Pattern Vault',
      tagline: 'Structured repository of curated Data Structures & Algorithms solutions in Python & SQL',
      category: 'Algorithms & Systems',
      description: 'Documented problem-solving journey containing structured solutions, pattern classifications, time/space complexity notes, and daily solving logs.',
      longDescription: 'Maintained as part of Tharun\'s daily problem-solving regimen. Solved 30+ LeetCode problems consecutively, solving at least one problem every day throughout July 2026, with a focus on data structures and algorithms.',
      architecture: [
        'Structured categorization of problem statements and edge-case validations in Python & SQL',
        'Big-O asymptotic time and space complexity documentation for each solution',
        'Tracking of July 2026 30+ consecutive daily solving streak'
      ],
      metrics: ['30+ Consecutive Days Streak', 'Structured Pattern Notes', 'Daily Problem Logs'],
      tags: ['Python', 'SQL', 'Data Structures', 'Algorithms', 'LeetCode'],
      github: 'https://github.com/TP200613/Leetcode',
      demo: 'https://leetcode.com/u/_Tharun_13/',
      featured: true,
      accent: 'from-amber-500 via-orange-600 to-rose-600',
      image: './leetcode_graphic.jpg'
    },
    {
      id: 'mainframe-terminal-os',
      title: 'Mainframe Terminal OS & Shell',
      tagline: 'Interactive retro-futuristic unix developer shell with simulated filesystems and telemetry',
      category: 'Algorithms & Systems',
      description: 'Engineered an interactive in-browser bash terminal shell supporting Unix navigation commands, live project queries, sound telemetry, and audio speech synthesis.',
      longDescription: 'A fully interactive command-line environment embedded in the portfolio. Implements custom command parsers, autocompletion, execution history, sound feedback, and real-time environment telemetry.',
      architecture: [
        'Stateful command interpreter with history stack and command dispatching',
        'Custom ANSI color formatting and real-time typing simulations',
        'Direct hardware audio feedback integration'
      ],
      metrics: ['Interactive Unix Shell', 'Audio & Speech Telemetry', 'Full Command Suite'],
      tags: ['TypeScript', 'React', 'Web Audio API', 'Terminal CLI', 'Unix'],
      github: 'https://github.com/TP200613',
      demo: 'https://github.com/TP200613',
      featured: true,
      accent: 'from-purple-500 via-indigo-600 to-blue-600',
      image: './terminal_graphic.jpg'
    }
  ] as Project[],

  timeline: [
    {
      year: 'Aug 2025 - Present',
      title: 'B.Tech in Computer Science & Engineering (AI and Data Engineering)',
      organization: 'Lovely Professional University (LPU)',
      location: 'Phagwara, Punjab',
      type: 'Education',
      description: 'Pursuing Bachelor of Technology in CSE with specialization in AI and Data Engineering. Maintaining a CGPA of 7.88.',
      highlights: [
        'Current CGPA: 7.88',
        'Specialization in AI & Data Engineering, Relational Databases, and System Design',
        'Hands-on development of full-stack data applications, API integrations, and 3D web graphics'
      ]
    },
    {
      year: 'July 2026',
      title: '30+ Days Consecutive LeetCode Daily Challenge Streak',
      organization: 'LeetCode & Competitive Problem Solving',
      location: 'Independent Practice',
      type: 'Achievement',
      description: 'Solved 30+ LeetCode problems consecutively, solving at least one problem every day throughout July 2026, with a focus on data structures and algorithms.',
      highlights: [
        'Solved at least 1 problem every day throughout July 2026',
        'Strengthened problem breakdown, pattern recognition, and time/space complexity efficiency',
        'Maintained structured solution logs in GitHub repository (TP200613/Leetcode)'
      ]
    },
    {
      year: 'Jun 2026 – Jul 2026',
      title: 'Microsoft AI Skills Fest (AI & Data Engineering Track)',
      organization: 'Microsoft — Virtual Global Event',
      location: 'Virtual / Global',
      type: 'Certification',
      description: 'Completed comprehensive learning modules in Git/GitHub fundamentals, repository security, GitHub Actions CI/CD automation, and Microsoft 365 Copilot agents.',
      highlights: [
        'Certificate: Introduction to Git (Microsoft AI Skills Fest, Jun 2026)',
        'Certificate: Introduction to GitHub (Microsoft AI Skills Fest, Jun 2026)',
        'Certificate: Build continuous integration workflows by using GitHub Actions (Microsoft AI Skills Fest, Jun 2026)',
        'Learned secure repository practices and GitHub code scanning best practices'
      ]
    },
    {
      year: 'Jun 2026',
      title: 'Built & Deployed GitPulse: GitHub Profile Analytics Platform',
      organization: 'Independent Project Development',
      location: 'Open Source',
      type: 'Milestone',
      description: 'Built a full-stack GitHub profile analytics platform solo in 5 weeks with Python Flask backend, React + Vite frontend, Three.js 3D visuals, and SQLite analytics layer.',
      highlights: [
        'Solo 5-week build with live GitHub API pagination for large commit histories',
        'Designed SQLite analytics layer for commit streaks, 0–100 consistency scores, and repo rankings',
        'Implemented multi-user side-by-side comparison and 3D interface using Three.js and React Three Fiber',
        'Deployed with Flask backend on Render and React + Vite frontend on Vercel'
      ]
    },
    {
      year: 'May 2024',
      title: 'Senior School Certificate (Class XII) - CBSE',
      organization: 'Sri Valli Vilas Alaya',
      location: 'Cuddalore, Tamil Nadu',
      type: 'Education',
      description: 'Completed Senior Secondary Education under the Central Board of Secondary Education (CBSE) with a score of 79.6%.',
      highlights: [
        'Score: 79.6%',
        'Strong focus on Mathematics, Physics, Chemistry, and Computer Science fundamentals'
      ]
    },
    {
      year: '2022',
      title: 'Secondary School Examination (Class X) - CBSE',
      organization: 'Edify School Vazhappattu Neelikkupam',
      location: 'Cuddalore, Tamil Nadu',
      type: 'Education',
      description: 'Completed Secondary School Examination under the Central Board of Secondary Education (CBSE).',
      highlights: [
        'Central Board of Secondary Education (CBSE)',
        'Early excellence in science, mathematics, and foundational computing'
      ]
    }
  ] as TimelineItem[],

  terminalCommands: [
    { cmd: 'help', desc: 'Display all available mainframe commands' },
    { cmd: 'about', desc: 'Read Tharun Raj\'s background at Lovely Professional University' },
    { cmd: 'skills', desc: 'List core technical & soft skills (Python, SQL, React, Flask, etc.)' },
    { cmd: 'gitpulse', desc: 'Inspect GitPulse flagship architecture & solo 5-week build' },
    { cmd: 'projects', desc: 'List all engineering projects and sandboxes' },
    { cmd: 'stats', desc: 'View 30+ Days LeetCode daily streak and academic metrics' },
    { cmd: 'education', desc: 'View LPU (CGPA 7.88), Class XII (79.6%), Class X education details' },
    { cmd: 'certificates', desc: 'View Microsoft AI Skills Fest verified certificates' },
    { cmd: 'microsoft-ai', desc: 'View Microsoft AI Skills Fest training highlights' },
    { cmd: 'contact', desc: 'Get direct contact channels (Email, Mobile, LinkedIn)' },
    { cmd: 'github', desc: 'Open Tharun Raj\'s GitHub profile' },
    { cmd: 'leetcode', desc: 'Open Tharun Raj\'s LeetCode profile' },
    { cmd: 'sudo hire-me', desc: 'Initiate recruitment & internship protocol!' },
    { cmd: 'quote', desc: 'Display an inspiring engineering quote' },
    { cmd: 'matrix', desc: 'Activate green matrix rain animation' },
    { cmd: 'clear', desc: 'Clear the terminal output screen' }
  ]
};
