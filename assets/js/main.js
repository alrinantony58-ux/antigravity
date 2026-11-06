/**
 * ALEXANDER VANCE | Award-Winning Portfolio Experience Engine
 * Handles custom cursor, Web Audio synthesis, magnetic dynamics,
 * case study modal, live clocks, scroll animations, and interactive forms.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. WEB AUDIO API SYNTHESIZER (Luxury Micro-haptics)
  // =========================================================================
  let audioCtx = null;
  let soundEnabled = false;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Synthesize soft, premium click
  function playTickSound() {
    if (!soundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(850, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (e) {
      // Audio fallback silent
    }
  }

  // Synthesize resonant harmonic chime
  function playChimeSound() {
    if (!soundEnabled || !audioCtx) return;
    try {
      const frequencies = [528, 660, 792];
      frequencies.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.04);

        gain.gain.setValueAtTime(0.03, audioCtx.currentTime + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4 + idx * 0.04);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + idx * 0.04);
        osc.stop(audioCtx.currentTime + 0.45 + idx * 0.04);
      });
    } catch (e) {
      // Audio fallback silent
    }
  }

  // Sound toggle button handling
  const soundToggleBtn = document.getElementById('sound-toggle');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      initAudio();
      soundEnabled = !soundEnabled;
      soundToggleBtn.classList.toggle('active', soundEnabled);
      const soundLabel = soundToggleBtn.querySelector('.sound-label');
      if (soundLabel) {
        soundLabel.textContent = soundEnabled ? 'SOUND: ON' : 'SOUND: OFF';
      }
      if (soundEnabled) {
        playChimeSound();
      }
    });
  }

  // =========================================================================
  // 2. CUSTOM CURSOR WITH MAGNETIC PHYSICS & CONTEXT LABELS
  // =========================================================================
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorFollower = document.querySelector('.cursor-follower');
  const cursorLabel = document.querySelector('.cursor-label');

  let mouseX = -100, mouseY = -100;
  let followerX = -100, followerY = -100;

  if (cursorDot && cursorFollower && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    // Smooth follower interpolation
    function renderCursor() {
      followerX += (mouseX - followerX) * 0.16;
      followerY += (mouseY - followerY) * 0.16;
      cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Contextual hover targets
    const hoverElements = document.querySelectorAll('a, button, .project-card, .pillar-card, .skill-domain-card, .email-copy-pill, .pill-option, [data-cursor]');
    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
        const customText = el.getAttribute('data-cursor') || (el.classList.contains('project-card') ? 'EXPLORE' : 'SELECT');
        if (cursorLabel) cursorLabel.textContent = customText;
        playTickSound();
      });

      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
        if (cursorLabel) cursorLabel.textContent = '';
      });
    });
  }

  // =========================================================================
  // 3. MAGNETIC BUTTON INTERACTION
  // =========================================================================
  const magneticButtons = document.querySelectorAll('.magnetic-btn');
  if (window.matchMedia('(pointer: fine)').matches) {
    magneticButtons.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const btnX = e.clientX - rect.left - rect.width / 2;
        const btnY = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${btnX * 0.28}px, ${btnY * 0.28}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  // =========================================================================
  // 4. KINETIC HERO SKILL TICKER
  // =========================================================================
  const tickerEl = document.getElementById('hero-ticker-text');
  if (tickerEl) {
    const tickerItems = [
      'CREATIVE DIRECTION & 3D',
      'HIGH-PERFORMANCE FRONTEND',
      'WEBGL & SHADER LAB',
      'SPATIAL DESIGN SYSTEMS',
      'ALGORITHMIC SOUND & ART',
      'LUXURY DIGITAL FLAGSHIPS'
    ];
    let tickerIndex = 0;

    setInterval(() => {
      tickerEl.style.opacity = '0';
      tickerEl.style.transform = 'translateY(8px)';

      setTimeout(() => {
        tickerIndex = (tickerIndex + 1) % tickerItems.length;
        tickerEl.textContent = tickerItems[tickerIndex];
        tickerEl.style.opacity = '1';
        tickerEl.style.transform = 'translateY(0)';
      }, 250);
    }, 2800);
  }

  // =========================================================================
  // 5. LIVE WORLD CLOCKS (Zurich / San Francisco / Local)
  // =========================================================================
  const clockEl = document.getElementById('live-time-display');
  function updateWorldTime() {
    if (!clockEl) return;
    const now = new Date();
    const options = {
      timeZone: 'Europe/Zurich',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    try {
      const timeStr = new Intl.DateTimeFormat('en-GB', options).format(now);
      clockEl.textContent = `ZRH ${timeStr} CET`;
    } catch (e) {
      clockEl.textContent = now.toTimeString().split(' ')[0] + ' LOCAL';
    }
  }
  updateWorldTime();
  setInterval(updateWorldTime, 1000);

  // =========================================================================
  // 6. STICKY HEADER & SCROLL BEHAVIOR
  // =========================================================================
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile Menu Drawer
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      mobileDrawer.classList.toggle('active');
      document.body.style.overflow = mobileDrawer.classList.contains('active') ? 'hidden' : '';
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        mobileDrawer.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // =========================================================================
  // 7. SCROLL REVEAL OBSERVER & STATS COUNTER ANIMATION
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal-item');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach((el) => revealObserver.observe(el));

  // Stats Counter Animation
  const statNumbers = document.querySelectorAll('.stat-count');
  let statsTriggered = false;

  const statsSection = document.querySelector('.stats-strip');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsTriggered) {
          statsTriggered = true;
          statNumbers.forEach((num) => {
            const target = parseFloat(num.getAttribute('data-target'));
            const isDecimal = target % 1 !== 0;
            const duration = 1800;
            const startTime = performance.now();

            function updateCount(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease-out expo formula
              const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              const currentVal = easeProgress * target;

              num.textContent = isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal).toString().padStart(2, '0');

              if (progress < 1) {
                requestAnimationFrame(updateCount);
              } else {
                num.textContent = isDecimal ? target.toFixed(1) : target.toString().padStart(2, '0');
              }
            }
            requestAnimationFrame(updateCount);
          });
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  }

  // =========================================================================
  // 8. FEATURED PROJECTS DATA & FILTERING
  // =========================================================================
  const projectsData = {
    'kronos': {
      title: 'Kronos Haute Horlogerie',
      category: 'Luxury E-Commerce & Interactive 3D',
      year: '2025',
      client: 'Kronos Horological Atelier (Geneva)',
      role: 'Principal Creative Technologist & Art Director',
      awards: 'Awwwards Site of the Day, FWA of the Day',
      challenge: 'Traditional Swiss horology relies heavily on tangible physical touch and micro-mechanical fascination. The challenge was translating microscopic escapement physics, light reflection on sapphire crystal, and tactile winding into a frictionless web flagship without sacrificing loading performance.',
      solution: 'Engineered a bespoke Three.js rendering pipeline with physically-based transmission shaders for sapphire crystal, 60fps real-time tourbillon simulation, and an interactive micro-soundscape generated via Web Audio API that lets collectors hear the escapement tick in binaural stereo.',
      metrics: '+240% Time On Site, 68% Increase in Private Inquiries, 99.4/100 Lighthouse Performance.',
      stack: ['Three.js', 'Custom GLSL Shaders', 'Web Audio API', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      liveUrl: 'https://kronos-atelier.example.com',
      image: 'kronos'
    },
    'aura': {
      title: 'Aura Kinetic Sound Engine',
      category: 'Experimental Audio-Visual Web App',
      year: '2025',
      client: 'Aura Sonic Research Lab',
      role: 'Lead Audio-Visual Engineer',
      awards: 'The Webby Awards Honoree, FWA of the Month',
      challenge: 'Modern digital audio workstations are cluttered with hundreds of knobs and skeuomorphic dials. Aura demanded a radical generative interface where physical cursor gestures, velocity, and fluid friction directly sculpt polyphonic FM synthesis and visual harmonic lattices.',
      solution: 'Built a 60fps WebGL particle harmonic visualizer tied directly to custom Web Audio API oscillator nodes with real-time FFT analysis. Gesture paths generate mathematical sound sculptures that users can export directly to lossless audio or dynamic SVG tokens.',
      metrics: 'Over 120,000 active sonic sessions in month one, featured in Wired UK and Fast Company Design.',
      stack: ['Web Audio API', 'Canvas WebGL', 'Web Workers', 'AudioWorklet', 'TypeScript'],
      liveUrl: 'https://aura-sound.example.com',
      image: 'aura'
    },
    'neo-tokyo': {
      title: 'Neo-Tokyo Monolith',
      category: 'Architectural Biennial Virtual Pavilion',
      year: '2024',
      client: 'Tokyo Spatial Architecture Biennial',
      role: 'Digital Architect & Spatial Director',
      awards: 'Awwwards Developer Award, Tokyo TDC Annual Selection',
      challenge: 'Presenting 12 unbuilt brutalist mega-structures in an infinite virtual space that conveys massive monolithic scale, raw poured concrete textures, and atmospheric rain shaders on mobile and desktop without any app installation.',
      solution: 'Developed an atmospheric volumetric fog pipeline with screen-space reflections, dynamic depth-of-field post-processing, and typographic spatial wayfinding based on classic Swiss editorial posters.',
      metrics: '420,000+ virtual pavilion attendees, 0 frame drops across 92% of client GPUs.',
      stack: ['WebGL', 'GLSL Post-Processing', 'GSAP ScrollTrigger', 'Vite', 'Three.js'],
      liveUrl: 'https://neotokyo-monolith.example.com',
      image: 'neo-tokyo'
    },
    'vault': {
      title: 'Vault Cybernetics',
      category: 'Autonomous Bionic Platform & Identity',
      year: '2024',
      client: 'Vault Bionics Inc. (Zurich / SF)',
      role: 'Full-Stack Design Engineer',
      awards: 'Awwwards Site of the Day, Cannes Lions Digital Shortlist',
      challenge: 'Vault was introducing the world’s first carbon-fiber neural interface prosthesis. The platform required communicating cutting-edge bio-mechanical telemetry while maintaining an empathetic, warm, human-first editorial narrative.',
      solution: 'Created an interactive 3D modular limb configurator with live biomechanical stress heatmaps, anatomical motion previews, and an ultra-fast checkout and clinical consultation booking portal.',
      metrics: 'Supported $42M Series B funding round, 310% boost in clinical partner onboarding.',
      stack: ['React', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'Stripe API'],
      liveUrl: 'https://vault-cybernetics.example.com',
      image: 'vault'
    },
    'solaris': {
      title: 'Solaris Biosphere Archive',
      category: 'Generative Botanical Simulation',
      year: '2023',
      client: 'Global Climate Science Foundation',
      role: 'Creative Coder & Information Architect',
      awards: 'Prix Ars Electronica Nominee, FWA of the Day',
      challenge: 'Visualizing multi-terabyte real-time satellite climate telemetry and endangered flora genomics without resorting to dry bar charts or repetitive dashboards.',
      solution: 'Created mathematical phyllotaxis and cellular automata growth simulations driven by live environmental API streams. Each endangered specimen blooms or shifts pigmentation in response to temperature anomalies and carbon metrics.',
      metrics: 'Adopted by 14 international universities, praised for groundbreaking data humanization.',
      stack: ['Mathematical Simulation', 'Canvas 2D/GL', 'D3.js', 'REST Telemetry Stream'],
      liveUrl: 'https://solaris-archive.example.com',
      image: 'solaris'
    },
    'strata': {
      title: 'Atelier Strata',
      category: 'Editorial Luxury Furniture Flagship',
      year: '2023',
      client: 'Strata Architectural Furnishings (Milan)',
      role: 'Brand Architect & Creative Technologist',
      awards: 'Awwwards Mobile Site of the Week, European Design Gold',
      challenge: 'Presenting hand-carved travertine and raw bronze architectural furniture online with the tactile gravity and editorial majesty of a physical collector’s catalogue.',
      solution: 'Implemented bespoke smooth scrolling inertia, asymmetric image pairings, micro-parallax elevation shifts, and seamless high-resolution material macro-inspectors.',
      metrics: 'Average session duration exceeding 4.2 minutes, 92% increase in global interior commissions.',
      stack: ['Custom CSS Architecture', 'JavaScript ES6+', 'Intersection Observer', 'WebP Optimization'],
      liveUrl: 'https://atelier-strata.example.com',
      image: 'strata'
    }
  };

  // Filter Buttons Handling
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      playTickSound();

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cardCat = card.getAttribute('data-category');
        if (filterVal === 'all' || cardCat.includes(filterVal)) {
          card.style.display = '';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 350);
        }
      });
    });
  });

  // =========================================================================
  // 9. CASE STUDY MODAL & INTERACTIVE DRAWER
  // =========================================================================
  const modalOverlay = document.getElementById('case-modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  function openCaseStudy(projectId) {
    const data = projectsData[projectId];
    if (!data || !modalOverlay) return;

    // Populate modal elements
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-year').textContent = data.year;
    document.getElementById('modal-client').textContent = data.client;
    document.getElementById('modal-role').textContent = data.role;
    document.getElementById('modal-awards').textContent = data.awards;
    document.getElementById('modal-challenge').textContent = data.challenge;
    document.getElementById('modal-solution').textContent = data.solution;
    document.getElementById('modal-metrics').textContent = data.metrics;

    // Tech stack pills
    const stackWrap = document.getElementById('modal-stack-wrap');
    if (stackWrap) {
      stackWrap.innerHTML = '';
      data.stack.forEach((tech) => {
        const pill = document.createElement('span');
        pill.className = 'tech-tag';
        pill.textContent = tech;
        stackWrap.appendChild(pill);
      });
    }

    // Hero image SVG update based on project
    const modalImage = document.getElementById('modal-hero-img');
    if (modalImage) {
      modalImage.innerHTML = getProjectSvgVisual(projectId);
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    playChimeSound();
  }

  function closeCaseStudy() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    playTickSound();
  }

  // Bind project card clicks
  projectCards.forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-project');
      openCaseStudy(id);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeCaseStudy);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeCaseStudy();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
      closeCaseStudy();
    }
  });

  // SVG Artwork Generator for Modal & Thumbnails
  function getProjectSvgVisual(projectId) {
    switch (projectId) {
      case 'kronos':
        return `<svg viewBox="0 0 1200 750" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <radialGradient id="kronosBg" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stop-color="#14141d"/>
              <stop offset="100%" stop-color="#07070a"/>
            </radialGradient>
            <linearGradient id="limeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#d4ff3f"/>
              <stop offset="100%" stop-color="#38ef7d"/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#kronosBg)"/>
          <circle cx="600" cy="375" r="260" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
          <circle cx="600" cy="375" r="230" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1" stroke-dasharray="4 8"/>
          <circle cx="600" cy="375" r="170" fill="none" stroke="url(#limeGrad)" stroke-width="2.5" opacity="0.85" filter="url(#glow)"/>
          <!-- Tourbillon Cage & Mechanical Escapement -->
          <g transform="translate(600, 375)">
            <circle cx="0" cy="0" r="95" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
            <path d="M-60,0 L60,0 M0,-60 L0,60 M-45,-45 L45,45 M-45,45 L45,-45" stroke="rgba(212,255,63,0.4)" stroke-width="1.5"/>
            <circle cx="0" cy="0" r="35" fill="#181824" stroke="url(#limeGrad)" stroke-width="2"/>
            <circle cx="0" cy="0" r="12" fill="#d4ff3f"/>
            <!-- Tick Marks -->
            <path d="M0,-245 L0,-225 M245,0 L225,0 M0,245 L0,225 M-245,0 L-225,0" stroke="#d4ff3f" stroke-width="3"/>
          </g>
          <text x="600" y="660" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="16" letter-spacing="8" fill="#d4ff3f">CALIBRE 01 / TOURBILLON ARCHIVE</text>
        </svg>`;

      case 'aura':
        return `<svg viewBox="0 0 1200 750" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <radialGradient id="auraBg" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stop-color="#181412"/>
              <stop offset="100%" stop-color="#080706"/>
            </radialGradient>
            <linearGradient id="amberLime" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#ff9d3b"/>
              <stop offset="50%" stop-color="#d4ff3f"/>
              <stop offset="100%" stop-color="#38ef7d"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#auraBg)"/>
          <g fill="none" stroke="url(#amberLime)" stroke-width="1.5" opacity="0.8">
            <path d="M100,375 Q 250,150 400,375 T 700,375 T 1000,375 T 1100,375" />
            <path d="M100,375 Q 250,220 400,375 T 700,375 T 1000,375 T 1100,375" opacity="0.5"/>
            <path d="M100,375 Q 250,520 400,375 T 700,375 T 1000,375 T 1100,375" opacity="0.4"/>
            <path d="M100,375 Q 350,100 600,375 T 1100,375" stroke="#ff9d3b" opacity="0.7"/>
          </g>
          <!-- Harmonic Frequency Nodes -->
          <circle cx="400" cy="375" r="16" fill="#0b0b10" stroke="#ff9d3b" stroke-width="2"/>
          <circle cx="700" cy="375" r="22" fill="#0b0b10" stroke="#d4ff3f" stroke-width="2"/>
          <circle cx="1000" cy="375" r="12" fill="#0b0b10" stroke="#38ef7d" stroke-width="2"/>
          <text x="600" y="660" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="16" letter-spacing="8" fill="#ff9d3b">HARMONIC RESONANCE 432HZ / GESTURE WORKBENCH</text>
        </svg>`;

      case 'neo-tokyo':
        return `<svg viewBox="0 0 1200 750" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <radialGradient id="tokyoBg" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stop-color="#12131a"/>
              <stop offset="100%" stop-color="#050608"/>
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#tokyoBg)"/>
          <!-- Brutalist Monolithic Geometries -->
          <polygon points="600,120 780,260 780,620 600,500" fill="#181a24" stroke="rgba(255,255,255,0.15)"/>
          <polygon points="600,120 420,260 420,620 600,500" fill="#101118" stroke="rgba(255,255,255,0.12)"/>
          <polygon points="600,120 780,260 600,320 420,260" fill="#242838" stroke="rgba(212,255,63,0.5)"/>
          <!-- Neon Accents -->
          <line x1="600" y1="120" x2="600" y2="500" stroke="#d4ff3f" stroke-width="2"/>
          <text x="600" y="660" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="16" letter-spacing="8" fill="#d4ff3f">SPATIAL PAVILION // TOKYO BIENNIAL 2024</text>
        </svg>`;

      case 'vault':
        return `<svg viewBox="0 0 1200 750" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <radialGradient id="vaultBg" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stop-color="#0e161c"/>
              <stop offset="100%" stop-color="#05080c"/>
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#vaultBg)"/>
          <!-- Cybernetic Schematic Grid -->
          <g stroke="rgba(56, 239, 125, 0.2)" stroke-width="1" stroke-dasharray="6 6">
            <line x1="200" y1="100" x2="200" y2="650"/>
            <line x1="600" y1="100" x2="600" y2="650"/>
            <line x1="1000" y1="100" x2="1000" y2="650"/>
            <line x1="100" y1="375" x2="1100" y2="375"/>
          </g>
          <circle cx="600" cy="375" r="160" fill="none" stroke="#38ef7d" stroke-width="2"/>
          <circle cx="600" cy="375" r="120" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
          <!-- Circuit traces -->
          <polyline points="400,375 520,375 560,330 640,330 680,375 800,375" fill="none" stroke="#d4ff3f" stroke-width="3"/>
          <text x="600" y="660" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="16" letter-spacing="8" fill="#38ef7d">NEURAL PROSTHETICS // SYSTEM TELEMETRY ACTIVE</text>
        </svg>`;

      case 'solaris':
        return `<svg viewBox="0 0 1200 750" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <radialGradient id="solarisBg" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stop-color="#141a14"/>
              <stop offset="100%" stop-color="#050a06"/>
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#solarisBg)"/>
          <!-- Generative phyllotaxis spiral -->
          <g fill="#d4ff3f" opacity="0.65">
            <circle cx="600" cy="375" r="5"/>
            <circle cx="620" cy="365" r="6"/>
            <circle cx="585" cy="350" r="7"/>
            <circle cx="570" cy="390" r="8"/>
            <circle cx="635" cy="405" r="9"/>
            <circle cx="640" cy="335" r="11"/>
            <circle cx="550" cy="335" r="12"/>
            <circle cx="545" cy="425" r="14"/>
            <circle cx="665" cy="440" r="15"/>
            <circle cx="670" cy="300" r="17"/>
            <circle cx="510" cy="305" r="19"/>
          </g>
          <text x="600" y="660" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="16" letter-spacing="8" fill="#d4ff3f">GENERATIVE FLORA DATA ARCHIVE // REAL-TIME SPECIMENS</text>
        </svg>`;

      case 'strata':
      default:
        return `<svg viewBox="0 0 1200 750" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <radialGradient id="strataBg" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stop-color="#1c1917"/>
              <stop offset="100%" stop-color="#0a0807"/>
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#strataBg)"/>
          <!-- Minimalist Architectural Blocks -->
          <rect x="350" y="240" width="500" height="70" fill="#2d2825" stroke="rgba(255,255,255,0.15)"/>
          <rect x="420" y="340" width="360" height="180" fill="#201c1a" stroke="rgba(255,255,255,0.12)"/>
          <line x1="600" y1="180" x2="600" y2="560" stroke="#d4ff3f" stroke-width="1.5"/>
          <text x="600" y="660" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="16" letter-spacing="8" fill="#d4ff3f">TRAVERTINE & RAW BRONZE SCULPTURE // MILAN</text>
        </svg>`;
    }
  }

  // =========================================================================
  // 10. EMAIL COPY INTERACTION WITH TOAST NOTIFICATION
  // =========================================================================
  const emailCopyBtn = document.getElementById('email-copy-btn');
  const toastNotice = document.getElementById('toast-notice');

  if (emailCopyBtn) {
    emailCopyBtn.addEventListener('click', () => {
      const emailText = emailCopyBtn.getAttribute('data-email') || 'alexander@vance.studio';
      navigator.clipboard.writeText(emailText).then(() => {
        playChimeSound();
        if (toastNotice) {
          toastNotice.textContent = `COPIED TO CLIPBOARD: ${emailText}`;
          toastNotice.classList.add('show');
          setTimeout(() => {
            toastNotice.classList.remove('show');
          }, 3200);
        }
      }).catch(() => {
        // Fallback
        alert(`Contact: ${emailText}`);
      });
    });
  }

  // =========================================================================
  // 11. INTERACTIVE COMMISSION INQUIRY FORM
  // =========================================================================
  const inquiryForm = document.getElementById('inquiry-form');
  const formSuccessBanner = document.getElementById('form-success-banner');

  // Service & Budget Pill Selection
  const servicePills = document.querySelectorAll('.service-pill');
  const budgetPills = document.querySelectorAll('.budget-pill');

  servicePills.forEach((pill) => {
    pill.addEventListener('click', () => {
      servicePills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      playTickSound();
    });
  });

  budgetPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      budgetPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      playTickSound();
    });
  });

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      playChimeSound();

      const submitBtn = inquiryForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'TRANSMITTING INQUIRY...';
      }

      setTimeout(() => {
        inquiryForm.style.display = 'none';
        if (formSuccessBanner) {
          formSuccessBanner.classList.add('active');
        }
      }, 800);
    });
  }

  // =========================================================================
  // 12. BACK TO TOP BUTTON
  // =========================================================================
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      playTickSound();
    });
  }
});
