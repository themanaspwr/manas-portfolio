import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

export const AnimatedGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates tracker
    const mouse = { x: -1000, y: -1000, active: false };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Seed background particles
    const particleCount = Math.min(Math.floor((width * height) / 30000), 28);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.5 + 0.45,
      });
    }

    // Color definitions based on active theme (Architect's Atelier)
    const getColors = () => {
      switch (theme) {
        case 'scientific-notebook':
          return {
            particle: 'rgba(184, 107, 48, 0.55)',
            connection: 'rgba(184, 107, 48, 0.03)',
            gridColor: 'rgba(28, 30, 32, 0.08)',
            annotation: 'rgba(96, 128, 105, 0.18)',
            mathText: 'rgba(28, 30, 32, 0.04)',
          };
        case 'midnight-terminal':
          return {
            particle: 'rgba(244, 239, 230, 0.6)',
            connection: 'rgba(244, 239, 230, 0.03)',
            gridColor: 'rgba(255, 255, 255, 0.05)',
            annotation: 'rgba(143, 149, 158, 0.18)',
            mathText: 'rgba(255, 255, 255, 0.03)',
          };
        case 'laboratory':
        default:
          return {
            particle: 'rgba(198, 123, 61, 0.65)',
            connection: 'rgba(198, 123, 61, 0.03)',
            gridColor: 'rgba(244, 239, 230, 0.07)',
            annotation: 'rgba(149, 179, 156, 0.2)',
            mathText: 'rgba(244, 239, 230, 0.04)',
          };
      }
    };

    // Math symbols for blueprint notebook feel
    const mathSymbols = [
      'f(x) = dx/dy', '∇ × B = μ₀J', 'E = mc²', 'λ = h/p', 
      '∫ e^x dx', 'V = I·R', 'H(ψ) = Eψ', 'PV = nRT',
      'SYS.ALLOC()', 'PORT: 8080', 'AWS_VPC.CORE', 'TF_RUN: 0x0E'
    ];

    const staticTexts = Array.from({ length: 6 }, () => ({
      text: mathSymbols[Math.floor(Math.random() * mathSymbols.length)],
      x: Math.random() * width,
      y: Math.random() * height,
      rotation: (Math.random() - 0.5) * 0.1,
    }));

    const draw = () => {
      if (!ctx || !canvas) return;

      // Clear with background color dynamically set by CSS (or transparent to use body bg)
      ctx.clearRect(0, 0, width, height);
      
      const themeColors = getColors();

      // 1. Draw static math annotations
      ctx.font = '10px monospace';
      ctx.fillStyle = themeColors.mathText;
      staticTexts.forEach((item) => {
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rotation);
        ctx.fillText(item.text, 0, 0);
        ctx.restore();
      });

      // 2. Draw fine grid structure
      const gridSize = 40;
      ctx.strokeStyle = themeColors.gridColor;
      ctx.lineWidth = 0.6;

      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 3. Draw dots at grid intersections for blueprint look
      ctx.fillStyle = themeColors.annotation;
      for (let x = gridSize; x < width; x += gridSize * 4) {
        for (let y = gridSize; y < height; y += gridSize * 4) {
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 4. Draw & animate particles (Precision Ticks/Crosshairs)
      particles.forEach((p) => {
        p.x += p.vx * 0.15; // Extremely slow drift
        p.y += p.vy * 0.15;

        // Bounce check
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse hover interaction: attract gently if close
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            p.x += dx * 0.003;
            p.y += dy * 0.003;
          }
        }

        // Draw precision crosshair '+'
        ctx.strokeStyle = themeColors.particle;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x - 5, p.y);
        ctx.lineTo(p.x + 5, p.y);
        ctx.moveTo(p.x, p.y - 5);
        ctx.lineTo(p.x, p.y + 5);
        ctx.stroke();
      });

      // 5. Draw mouse overlay diagnostic rings
      if (mouse.active) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = themeColors.particle;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 45, 0, Math.PI * 2);
        ctx.strokeStyle = themeColors.annotation;
        ctx.lineWidth = 0.75;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full pointer-events-none"
    />
  );
};
