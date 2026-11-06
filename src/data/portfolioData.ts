import { Skill, Project, TimelineItem, Interest, SocialLink } from '../types/portfolio';

export const personalInfo = {
  name: "Alrin Antony Gonsalvez",
  title: "Software Engineer",
  tagline: "Building Digital Experiences Through Code, Creativity & Innovation.",
  location: "India",
  status: "Actively Seeking Opportunities",
  availability: "Available for Full-time Roles (India / Remote)",
  email: "alrin.gonsalvez@example.com", // Customizable placeholder
  github: "https://github.com/alrin-antony", // Customizable placeholder
  linkedin: "https://linkedin.com/in/alrin-antony-gonsalvez", // Customizable placeholder
  twitter: "https://twitter.com/alrin_dev", // Customizable placeholder
  about: {
    bio: "I am a passionate Software Engineer based in India with a strong drive for building scalable, high-performance web applications and intuitive digital experiences. My foundation is built on modern programming paradigms, clean architectural patterns, and a persistent curiosity for emerging technologies.",
    focus: "Currently focused on full-stack web engineering, distributed systems fundamentals, and crafting responsive user interfaces with seamless interactivity.",
    goals: "Eager to contribute to forward-thinking engineering teams, tackle complex technical problems, and continuously evolve as a world-class software engineer."
  }
};

export const skillsData: Skill[] = [
  // Programming Languages
  { name: "JavaScript (ES6+)", category: "languages", proficiency: 90, highlight: true },
  { name: "TypeScript", category: "languages", proficiency: 85, highlight: true },
  { name: "Python", category: "languages", proficiency: 80 },
  { name: "Java", category: "languages", proficiency: 75 },
  { name: "C / C++", category: "languages", proficiency: 70 },
  { name: "HTML5 & Modern CSS3", category: "languages", proficiency: 92, highlight: true },
  { name: "SQL", category: "languages", proficiency: 82 },
  { name: "[+ Your Custom Language]", category: "languages", proficiency: 0, isPlaceholder: true },

  // Frontend Development
  { name: "React.js", category: "frontend", proficiency: 90, highlight: true },
  { name: "Next.js", category: "frontend", proficiency: 82, highlight: true },
  { name: "Tailwind CSS", category: "frontend", proficiency: 94, highlight: true },
  { name: "Redux Toolkit / Zustand", category: "frontend", proficiency: 80 },
  { name: "Responsive & Adaptive UI", category: "frontend", proficiency: 95 },
  { name: "Framer Motion / CSS Animations", category: "frontend", proficiency: 85 },
  { name: "REST Client & Axios", category: "frontend", proficiency: 88 },
  { name: "[+ Your Frontend Framework]", category: "frontend", proficiency: 0, isPlaceholder: true },

  // Backend Development
  { name: "Node.js", category: "backend", proficiency: 85, highlight: true },
  { name: "Express.js", category: "backend", proficiency: 86, highlight: true },
  { name: "RESTful API Architecture", category: "backend", proficiency: 90, highlight: true },
  { name: "Authentication (JWT & OAuth2)", category: "backend", proficiency: 82 },
  { name: "Microservices Fundamentals", category: "backend", proficiency: 74 },
  { name: "WebSockets & Event Streams", category: "backend", proficiency: 72 },
  { name: "[+ Your Backend Service]", category: "backend", proficiency: 0, isPlaceholder: true },

  // Databases
  { name: "PostgreSQL", category: "databases", proficiency: 84, highlight: true },
  { name: "MongoDB", category: "databases", proficiency: 82, highlight: true },
  { name: "MySQL", category: "databases", proficiency: 80 },
  { name: "Redis (In-Memory Caching)", category: "databases", proficiency: 72 },
  { name: "Prisma ORM", category: "databases", proficiency: 78 },
  { name: "[+ Your Database]", category: "databases", proficiency: 0, isPlaceholder: true },

  // Frameworks & Libraries
  { name: "React Router", category: "frameworks", proficiency: 90 },
  { name: "Shadcn UI / Radix Primitives", category: "frameworks", proficiency: 85 },
  { name: "Lucide Icons", category: "frameworks", proficiency: 95 },
  { name: "Zod Schema Validation", category: "frameworks", proficiency: 82 },
  { name: "Vite Build Tool", category: "frameworks", proficiency: 88 },
  { name: "[+ Your Library]", category: "frameworks", proficiency: 0, isPlaceholder: true },

  // Development Tools
  { name: "Git & GitHub Version Control", category: "tools", proficiency: 92, highlight: true },
  { name: "VS Code & Debugging Tools", category: "tools", proficiency: 95 },
  { name: "Postman & API Testing", category: "tools", proficiency: 88 },
  { name: "Docker Containerization", category: "tools", proficiency: 70 },
  { name: "Linux / Bash Shell", category: "tools", proficiency: 78 },
  { name: "npm / pnpm / yarn", category: "tools", proficiency: 90 },
  { name: "[+ Your Tool / Workflow]", category: "tools", proficiency: 0, isPlaceholder: true },

  // Other Technical Skills
  { name: "Data Structures & Algorithms", category: "other", proficiency: 85, highlight: true },
  { name: "Object-Oriented Programming (OOP)", category: "other", proficiency: 88 },
  { name: "Clean Code & Refactoring", category: "other", proficiency: 90 },
  { name: "Agile & Scrum Methodologies", category: "other", proficiency: 85 },
  { name: "Performance Optimization", category: "other", proficiency: 80 },
  { name: "[+ Your Specialized Domain]", category: "other", proficiency: 0, isPlaceholder: true },
];

export const projectsData: Project[] = [
  {
    id: "project-1",
    title: "PulseCloud - Task & Workflow Engine",
    tagline: "Collaborative project management platform with real-time updates and analytics.",
    description: "A high-performance full-stack workflow management platform featuring real-time kanban boards, optimistic UI updates, and role-based permissions.",
    category: "Full-Stack",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop",
    githubUrl: "https://github.com/alrin-antony/pulsecloud-showcase",
    liveUrl: "https://pulsecloud-demo.example.com",
    featured: true,
    isPlaceholder: true,
    highlights: [
      "Optimized query caching reducing API response latency by 40%",
      "Engineered real-time collaboration using WebSockets",
      "Designed fully responsive dark-mode UI with fluid drag-and-drop"
    ]
  },
  {
    id: "project-2",
    title: "NovaCart - Headless E-Commerce Suite",
    tagline: "Ultra-fast headless commerce storefront with dynamic cart and checkout.",
    description: "Modern e-commerce platform built with Next.js and Tailwind CSS, featuring instant search indexing, persistent state management, and animated checkout flows.",
    category: "Frontend",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand"],
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900&auto=format&fit=crop",
    githubUrl: "https://github.com/alrin-antony/novacart-storefront",
    liveUrl: "https://novacart-demo.example.com",
    featured: true,
    isPlaceholder: true,
    highlights: [
      "Sub-second page load times with Next.js ISR (Incremental Static Regeneration)",
      "Accessible design adhering strictly to WCAG 2.1 AA standards",
      "Custom micro-interactions built with Framer Motion"
    ]
  },
  {
    id: "project-3",
    title: "DevSync - Real-Time Code Collaboration",
    tagline: "Browser-based concurrent code editor and collaborative execution room.",
    description: "A developer collaboration hub allowing developers to write, inspect, and share code snippets simultaneously with synchronized cursor broadcasting.",
    category: "Full-Stack",
    tags: ["TypeScript", "React", "Node.js", "Socket.io", "Monaco Editor"],
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=900&auto=format&fit=crop",
    githubUrl: "https://github.com/alrin-antony/devsync-editor",
    liveUrl: "https://devsync-demo.example.com",
    featured: true,
    isPlaceholder: true,
    highlights: [
      "Conflict-free replicated data sync for real-time document editing",
      "Integrated Monaco code editor with multi-language syntax highlighting",
      "JWT-secured multi-tenant workspaces"
    ]
  },
  {
    id: "project-4",
    title: "ApexFlow - Microservices & Gateway API",
    tagline: "Scalable backend service architecture with JWT auth and rate limiting.",
    description: "Resilient backend gateway orchestrating microservices with token authentication, Redis-backed rate limiting, and centralized structured error logging.",
    category: "Backend & API",
    tags: ["Node.js", "Express", "Redis", "Docker", "MongoDB"],
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=900&auto=format&fit=crop",
    githubUrl: "https://github.com/alrin-antony/apexflow-gateway",
    liveUrl: "https://apexflow-demo.example.com",
    featured: false,
    isPlaceholder: true,
    highlights: [
      "Configurable sliding-window rate limiter utilizing Redis hashes",
      "Automated Swagger/OpenAPI interactive API documentation",
      "Containerized deployment configuration with Docker Compose"
    ]
  }
];

export const timelineData: TimelineItem[] = [
  // Work Experience / Internships
  {
    id: "exp-1",
    type: "experience",
    title: "Software Engineer / Developer Intern",
    organization: "[Your Company / Organization Placeholder]",
    location: "India (or Remote)",
    period: "2024 - Present",
    description: [
      "Developed and maintained full-stack web features using modern JavaScript/TypeScript frameworks.",
      "Collaborated with cross-functional team members to design and deploy RESTful microservices.",
      "Participated in peer code reviews, sprint planning, and performance optimization cycles."
    ],
    skills: ["React", "TypeScript", "Node.js", "Git", "REST APIs"],
    isPlaceholder: true
  },
  {
    id: "exp-2",
    type: "internship",
    title: "Full-Stack Web Development Trainee / Intern",
    organization: "[Technology Firm / Startup Placeholder]",
    location: "India",
    period: "2023 - 2024",
    description: [
      "Built responsive, accessible user interfaces following Figma prototypes and design specifications.",
      "Assisted in database schema modeling, queries optimization, and backend service integration.",
      "Authored unit tests and documentation to ensure high codebase reliability."
    ],
    skills: ["JavaScript", "React", "SQL", "Tailwind CSS"],
    isPlaceholder: true
  },

  // Education
  {
    id: "edu-1",
    type: "education",
    title: "Bachelor of Technology / Engineering in Computer Science",
    organization: "[Your University / College Name Placeholder]",
    location: "India",
    period: "2020 - 2024",
    description: [
      "Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks, Software Engineering.",
      "Active participant in technical symposiums, coding competitions, and academic software projects."
    ],
    skills: ["Algorithms", "Database Systems", "Software Architecture", "OOP"],
    isPlaceholder: true
  },
  {
    id: "edu-2",
    type: "education",
    title: "Higher Secondary Certificate (Science & Mathematics)",
    organization: "[Your High School / Junior College Placeholder]",
    location: "India",
    period: "2018 - 2020",
    description: [
      "Focused on Mathematics, Physics, Chemistry, and Computer Science fundamentals."
    ],
    isPlaceholder: true
  },

  // Certifications
  {
    id: "cert-1",
    type: "certification",
    title: "Full-Stack Web Development Specialization",
    organization: "[Recognized Platform / Institution Placeholder]",
    location: "Online",
    period: "2024",
    description: [
      "Comprehensive certification covering modern frontend architectures, asynchronous backend systems, database modeling, and cloud deployments."
    ],
    credentialId: "CERT-VERIFIED-XXXX",
    isPlaceholder: true
  },
  {
    id: "cert-2",
    type: "certification",
    title: "Data Structures & Algorithms in Depth",
    organization: "[Recognized Platform / Institution Placeholder]",
    location: "Online",
    period: "2023",
    description: [
      "Mastery in algorithm analysis, asymptotic complexity, dynamic programming, tree traversals, and graph algorithms."
    ],
    credentialId: "CERT-DSA-XXXX",
    isPlaceholder: true
  },

  // Achievements
  {
    id: "ach-1",
    type: "achievement",
    title: "National / State Hackathon Finalist",
    organization: "[Hackathon / Competition Name Placeholder]",
    location: "India",
    period: "2023",
    description: [
      "Developed a rapid working prototype addressing real-world problem statements under a 36-hour sprint."
    ],
    isPlaceholder: true
  }
];

export const interestsData: Interest[] = [
  {
    title: "Open Source Ecosystems",
    description: "Passionate about contributing to and learning from developer-first open source tools, frameworks, and modern libraries.",
    icon: "GitBranch",
    tags: ["GitHub", "Collaboration", "Community"]
  },
  {
    title: "UI/UX & Micro-Interactions",
    description: "Deep appreciation for fluid 60fps animations, thoughtful tactile feedback, pixel-perfect typography, and accessible design.",
    icon: "Sparkles",
    tags: ["Framer Motion", "Design Systems", "Accessibility"]
  },
  {
    title: "Algorithmic Problem Solving",
    description: "Enjoying the intellectual thrill of dissecting edge-cases, optimizing time-space complexities, and writing elegant code.",
    icon: "Cpu",
    tags: ["LeetCode", "DSA", "Logic"]
  },
  {
    title: "Distributed Systems & Cloud",
    description: "Continually studying resilient architecture, eventual consistency, containerization, and modern deployment pipelines.",
    icon: "Layers",
    tags: ["Docker", "Microservices", "Cloud"]
  },
  {
    title: "Emerging Tech & AI Tools",
    description: "Integrating intelligent developer tools, LLM APIs, and automated workflows into everyday engineering practices.",
    icon: "BrainCircuit",
    tags: ["AI Tools", "Automation", "Innovation"]
  },
  {
    title: "Continuous Learning & Reading",
    description: "Avid reader of engineering blogs, system architecture whitepapers, tech books, and open web standards.",
    icon: "BookOpen",
    tags: ["Tech Blogs", "Whitepapers", "Growth"]
  }
];

export const socialLinks: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com/alrin-antony", icon: "Github", label: "alrin-antony" },
  { platform: "LinkedIn", url: "https://linkedin.com/in/alrin-antony-gonsalvez", icon: "Linkedin", label: "Alrin Antony Gonsalvez" },
  { platform: "Email", url: "mailto:alrin.gonsalvez@example.com", icon: "Mail", label: "alrin.gonsalvez@example.com" },
  { platform: "Location", url: "#contact", icon: "MapPin", label: "India 🇮🇳 (Open to Relocation)" }
];

