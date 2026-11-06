# Alrin Antony Gonsalvez — Software Engineer Portfolio

A stunning, premium, modern, and interactive personal developer portfolio built for **Alrin Antony Gonsalvez**, Software Engineer based in India who is actively seeking job opportunities.

---

## 🌟 Highlights & Key Features

- **Futuristic & Minimal Luxury Aesthetic**: Deep black (`#080808`), dark charcoal surfaces, and vibrant purple (`#8B5CF6`) glowing accents.
- **Interactive 3D Abstract Visual**: Dynamic 3D polyhedral lattice sphere engineered on HTML5 Canvas that rotates in real-time and responds to mouse coordinates with spring physics.
- **Animated Hero Section**:
  - Main heading: *"Hi, I'm Alrin Antony Gonsalvez."*
  - Animated typing reveal for *"Software Engineer"*, *"Full-Stack Developer"*, etc.
  - Tagline: *"Building Digital Experiences Through Code, Creativity & Innovation."*
  - Dual CTAs: *"Explore My Work"* & *"Get In Touch"*.
  - Live Status Pill: *"Open to Roles • India 🇮🇳 & Remote"*.
- **About Me**: Clear professional profile, core values (Maintainability First, Performance Mindset, Collaborative Spirit), and interactive animated capability cards.
- **Categorized Skills**:
  - Programming Languages, Frontend Development, Backend Development, Databases, Frameworks & Libraries, Development Tools, and Engineering Principles.
  - Interactive category filters + live search bar + proficiency progress indicators.
  - Verified core foundational stack with clearly indicated customizable placeholder slots.
- **Featured Projects Showcase**:
  - Filterable by *All*, *Full-Stack*, *Frontend*, and *Backend & API*.
  - Interactive project cards with thumbnails, descriptions, highlights, stack badges, GitHub source code buttons, and live demo buttons.
  - Interactive project detail modal.
- **Education & Experience Timeline**:
  - Vertical timeline design with glowing nodes.
  - Tab filters for *Experience & Internships* and *Education & Certifications*.
  - Clean placeholders ready for custom degrees, internships, and certifications.
- **Personal Interests**: Creative passions (Open Source, UI/UX Craftsmanship, Algorithmic Puzzles, Distributed Systems, Emerging AI Tools).
- **Contact Section**:
  - Heading: *"Let's Build Something Amazing Together."*
  - One-click copy email button with feedback.
  - Interactive message form with client-side validation and confirmation toast.
  - Social profile links (GitHub, LinkedIn, Twitter/X, Email).
- **Interactions & Polish**:
  - Sticky glassmorphic navigation with active section indicator.
  - Custom purple glowing cursor with trailing ring on desktop.
  - Futuristic startup preloader screen with Alrin's monogram.
  - Smooth scrolling and mobile-responsive drawer navigation.

---

## 📁 Project Architecture

```
antigravity/
├── index.html                  # Standalone instant browser-ready application (React 18 + Tailwind)
├── package.json                # Project dependencies and build scripts
├── tsconfig.json               # TypeScript compiler options
├── tailwind.config.js          # Tailwind CSS theme configuration (deep black & vibrant purple)
├── README.md                   # Documentation & customization guide
└── src/
    ├── App.tsx                 # Root React application component
    ├── main.tsx                # Application entry point
    ├── index.css               # Global CSS, scrollbar styles, animations
    ├── types/
    │   └── portfolio.ts        # TypeScript interfaces (Skill, Project, TimelineItem, etc.)
    ├── data/
    │   └── portfolioData.ts    # Centralized data file to customize skills, projects, and bio
    └── components/
        ├── Navbar.tsx          # Sticky glassmorphic navigation bar with mobile drawer
        ├── Hero.tsx            # Full-screen landing section with typing effect
        ├── Canvas3D.tsx        # 3D interactive abstract canvas engine
        ├── About.tsx           # Narrative, core philosophy, and info cards
        ├── Skills.tsx          # Categorized stack with animated bars and search
        ├── Projects.tsx        # Filterable project cards and details modal
        ├── Timeline.tsx        # Vertical timeline for experience, education & certs
        ├── Interests.tsx       # Personal hobbies and passions
        ├── Contact.tsx         # Functional contact form and social channels
        ├── Footer.tsx          # Footer with back-to-top and copyright
        ├── CustomCursor.tsx    # Purple glowing cursor with trailing ring
        └── Preloader.tsx       # Futuristic loading animation screen
```

---

## 🚀 How to Run & View

### 1. Instant Direct Browser View (Zero Build Step)
Simply double-click or open `index.html` in your web browser (Google Chrome, Microsoft Edge, Brave, etc.).
- It bootstraps React 18, Tailwind CSS, and the 3D Canvas engine immediately with no build step required.

### 2. Run with Node.js & Vite (Development Server)
If you have Node.js installed and wish to run the modular TypeScript project:
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build
```

---

## ✏️ How to Personalize Data

All personal information, links, and text are centralized in:
- For modular React: [portfolioData.ts](file:///c:/Users/alrin/Downloads/antigravity/src/data/portfolioData.ts)
- For instant `index.html`: Open [index.html](file:///c:/Users/alrin/Downloads/antigravity/index.html) and edit the `personalInfo`, `skillsData`, `projectsData`, or `timelineData` objects at the top of the script.

### Updating Contact Links:
- Replace `alrin.gonsalvez@example.com` with your actual email address.
- Replace `https://github.com/alrin-antony` with your real GitHub profile.
- Replace `https://linkedin.com/in/alrin-antony-gonsalvez` with your LinkedIn URL.

