/**
 * ALEXANDER VANCE | Generative Interactive Art Canvas
 * Luxury ambient fluid flow & particle constellation
 * 60 FPS performance-optimized with spring physics & mouse interaction
 */

(function () {
  'use strict';

  const canvas = document.getElementById('webgl-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, dpr;
  let particles = [];
  let mouse = { x: null, y: null, targetX: null, targetY: null, radius: 180, isMoving: false };
  let mouseTimer = null;
  let animationFrameId = null;
  let isVisible = true;
  let scrollY = 0;
  let lastScrollY = 0;
  let scrollSpeed = 0;

  // Particle configuration
  const PARTICLE_COUNT = window.innerWidth < 768 ? 45 : 90;
  const CONNECTION_DIST = 140;

  function initDimensions() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.scale(dpr, dpr);
  }

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = initial ? Math.random() * width : (Math.random() > 0.5 ? 0 : width);
      this.y = initial ? Math.random() * height : Math.random() * height;
      this.baseX = this.x;
      this.baseY = this.y;
      this.size = Math.random() * 2 + 0.8;
      this.speedX = (Math.random() - 0.5) * 0.45;
      this.speedY = (Math.random() - 0.5) * 0.45;
      this.alpha = Math.random() * 0.45 + 0.15;
      this.baseAlpha = this.alpha;
      this.color = Math.random() > 0.85 ? 'rgba(212, 255, 63, ' : 'rgba(240, 240, 248, ';
      this.angle = Math.random() * Math.PI * 2;
      this.spinSpeed = (Math.random() - 0.5) * 0.015;
    }

    update() {
      // Natural organic drift
      this.angle += this.spinSpeed;
      this.x += this.speedX + Math.sin(this.angle) * 0.3;
      this.y += this.speedY + Math.cos(this.angle) * 0.3 - (scrollSpeed * 0.05);

      // Edge wrap
      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.y = height + 20;
      if (this.y > height + 20) this.y = -20;

      // Mouse interactive force
      if (mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const pushX = (dx / dist) * force * 3.5;
          const pushY = (dy / dist) * force * 3.5;

          this.x -= pushX;
          this.y -= pushY;
          this.alpha = Math.min(this.baseAlpha + 0.4, 0.9);
        } else {
          if (this.alpha > this.baseAlpha) {
            this.alpha -= 0.01;
          }
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.12;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(212, 255, 63, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  // Fluid ambient glow orb in hero center
  function drawAmbientHalo() {
    const targetX = mouse.x !== null ? mouse.x : width * 0.5;
    const targetY = mouse.y !== null ? mouse.y : height * 0.38;

    const gradient = ctx.createRadialGradient(
      targetX, targetY, 0,
      targetX, targetY, width * 0.45
    );
    gradient.addColorStop(0, 'rgba(212, 255, 63, 0.045)');
    gradient.addColorStop(0.5, 'rgba(56, 239, 125, 0.018)');
    gradient.addColorStop(1, 'rgba(7, 7, 9, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  function render() {
    if (!isVisible) return;

    ctx.clearRect(0, 0, width, height);

    // Smooth mouse interpolation
    if (mouse.targetX !== null) {
      if (mouse.x === null) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      } else {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      }
    }

    // Scroll speed damping
    scrollY = window.pageYOffset || document.documentElement.scrollTop;
    scrollSpeed = (scrollY - lastScrollY) * 0.6;
    lastScrollY = scrollY;

    drawAmbientHalo();

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    drawConnections();

    animationFrameId = requestAnimationFrame(render);
  }

  // Event Listeners
  window.addEventListener('resize', () => {
    initDimensions();
    createParticles();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.isMoving = true;
    clearTimeout(mouseTimer);
    mouseTimer = setTimeout(() => {
      mouse.isMoving = false;
    }, 2000);
  });

  window.addEventListener('mouseleave', () => {
    mouse.targetX = null;
    mouse.targetY = null;
    mouse.x = null;
    mouse.y = null;
  });

  // Shockwave burst on click
  window.addEventListener('click', (e) => {
    for (let i = 0; i < particles.length; i++) {
      const dx = e.clientX - particles[i].x;
      const dy = e.clientY - particles[i].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 260) {
        const force = (260 - dist) / 260;
        particles[i].x -= (dx / (dist || 1)) * force * 35;
        particles[i].y -= (dy / (dist || 1)) * force * 35;
      }
    }
  });

  // Visibility optimization: stop drawing if page is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isVisible = false;
      cancelAnimationFrame(animationFrameId);
    } else {
      isVisible = true;
      animationFrameId = requestAnimationFrame(render);
    }
  });

  // Initialize
  initDimensions();
  createParticles();
  animationFrameId = requestAnimationFrame(render);
})();
