import React, { useEffect, useRef } from 'react';

interface Canvas3DProps {
  className?: string;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
  ox: number;
  oy: number;
  oz: number;
  phase: number;
}

export const Canvas3D: React.FC<Canvas3DProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const dpr = window.devicePixelRatio || 1;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Generate 3D Spherical & Polyhedral Lattice Points
    const numPoints = 140;
    const points: Point3D[] = [];
    const radius = Math.min(width, height) * 0.38;

    for (let i = 0; i < numPoints; i++) {
      // Golden spiral distribution on sphere
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.sqrt(numPoints * Math.PI) * phi;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      points.push({
        x, y, z,
        ox: x, oy: y, oz: z,
        phase: Math.random() * Math.PI * 2
      });
    }

    // Add concentric inner core points
    const innerPoints = 40;
    const innerRadius = radius * 0.45;
    for (let i = 0; i < innerPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / innerPoints);
      const theta = Math.sqrt(innerPoints * Math.PI) * phi;
      const x = innerRadius * Math.cos(theta) * Math.sin(phi);
      const y = innerRadius * Math.sin(theta) * Math.sin(phi);
      const z = innerRadius * Math.cos(phi);
      points.push({
        x, y, z,
        ox: x, oy: y, oz: z,
        phase: Math.random() * Math.PI * 2
      });
    }

    // Interactive Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0.2;
    let rotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX = x / (rect.width / 2);
      mouseY = y / (rect.height / 2);
      targetRotY = mouseX * 0.6;
      targetRotX = -mouseY * 0.6;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.015;

      // Smooth camera interpolation towards target
      rotX += (targetRotX - rotX) * 0.05 + 0.003;
      rotY += (targetRotY - rotY) * 0.05 + 0.007;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const fov = 400;

      // Pre-calculate trigonometric rotations
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      const projectedPoints: { x: number; y: number; z: number; scale: number; alpha: number }[] = [];

      // Transform & Project Points
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        
        // Gentle breathing animation
        const wave = 1 + Math.sin(time * 2 + p.phase) * 0.05;
        let px = p.ox * wave;
        let py = p.oy * wave;
        let pz = p.oz * wave;

        // Rotation around Y
        let x1 = px * cosY - pz * sinY;
        let z1 = pz * cosY + px * sinY;

        // Rotation around X
        let y2 = py * cosX - z1 * sinX;
        let z2 = z1 * cosX + py * sinX;

        // Perspective Projection
        const scale = fov / (fov + z2 + 250);
        const screenX = cx + x1 * scale;
        const screenY = cy + y2 * scale;
        const alpha = Math.max(0.15, Math.min(1, (z2 + radius) / (2 * radius) + 0.2));

        projectedPoints.push({
          x: screenX,
          y: screenY,
          z: z2,
          scale,
          alpha
        });
      }

      // Draw Connections (Neural Graph / Structural Lattice)
      const maxDist = radius * 0.65;
      for (let i = 0; i < projectedPoints.length; i++) {
        const p1 = projectedPoints[i];
        for (let j = i + 1; j < projectedPoints.length; j++) {
          const p2 = projectedPoints[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist * p1.scale) {
            const lineAlpha = (1 - dist / (maxDist * p1.scale)) * 0.35 * Math.min(p1.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw Core Rings
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.4);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 0.85, radius * 0.35, rotX, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 12]);
      ctx.stroke();

      ctx.rotate(-time * 0.7);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 0.95, radius * 0.25, -rotY, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.25)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 16]);
      ctx.stroke();
      ctx.restore();

      // Draw Glowing Nodes
      for (let i = 0; i < projectedPoints.length; i++) {
        const p = projectedPoints[i];
        const dotRadius = Math.max(1.2, 2.5 * p.scale);

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(192, 132, 252, ${p.alpha})`;
        ctx.fill();

        // Subtle glow halo for foreground nodes
        if (p.z > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, dotRadius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139, 92, 246, ${p.alpha * 0.25})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Background radial purple glow */}
      <div className="absolute inset-0 bg-radial-gradient from-purple-600/20 via-purple-900/5 to-transparent blur-3xl pointer-events-none rounded-full" />
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[500px] max-h-[500px] cursor-grab active:cursor-grabbing z-10"
      />
    </div>
  );
};

