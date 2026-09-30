import React, { useEffect, useRef, useState } from 'react';

interface HeartParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  swaySpeed: number;
  swayDistance: number;
  swayOffset: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  type: 'heart' | 'star' | 'flower' | 'sparkle' | 'bubble';
  colorIndex: number;
}

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Gorgeous heart palette: vivid yet soft pinks, roses, coralline, lavender, warm gold
    const heartColorSets = [
      { fill: '#F43F5E', glow: 'rgba(244, 63, 94, 0.4)' },    // Rose 500
      { fill: '#FB7185', glow: 'rgba(251, 113, 133, 0.45)' }, // Rose 400
      { fill: '#FDA4AF', glow: 'rgba(253, 164, 175, 0.5)' },  // Rose 300
      { fill: '#EC4899', glow: 'rgba(236, 72, 153, 0.4)' },   // Pink 500
      { fill: '#F472B6', glow: 'rgba(244, 114, 182, 0.45)' }, // Pink 400
      { fill: '#C084FC', glow: 'rgba(192, 132, 252, 0.35)' }, // Purple 400
      { fill: '#FBBF24', glow: 'rgba(251, 191, 36, 0.35)' },  // Amber/Gold
      { fill: '#F43F5E', glow: 'rgba(244, 63, 94, 0.5)' },    // Vivid rose
    ];

    // Rich count on both mobile and desktop so the screen is lively with hearts
    const particleCount = window.innerWidth < 768 ? 45 : 65;
    const particles: HeartParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const rand = Math.random();
      let type: HeartParticle['type'] = 'heart';
      if (rand > 0.88) type = 'star';
      else if (rand > 0.78) type = 'flower';
      else if (rand > 0.68) type = 'sparkle';
      else if (rand > 0.60) type = 'bubble';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        // Varied sizes: from cute small 12px to prominent 32px glowing hearts
        size: Math.random() * 18 + (type === 'heart' ? 14 : 10),
        speedY: Math.random() * 0.7 + 0.35,
        swaySpeed: Math.random() * 0.025 + 0.012,
        swayDistance: Math.random() * 32 + 15,
        swayOffset: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.55 + 0.35,
        rotation: (Math.random() - 0.5) * 30,
        rotationSpeed: (Math.random() - 0.5) * 0.6,
        type,
        colorIndex: Math.floor(Math.random() * heartColorSets.length),
      });
    }

    const drawHeart = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      const topCurveHeight = size * 0.32;
      c.moveTo(0, topCurveHeight);
      c.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      c.bezierCurveTo(
        -size / 2,
        (size + topCurveHeight) / 2,
        0,
        (size + topCurveHeight) / 2 + size * 0.22,
        0,
        size
      );
      c.bezierCurveTo(
        0,
        (size + topCurveHeight) / 2 + size * 0.22,
        size / 2,
        (size + topCurveHeight) / 2,
        size / 2,
        topCurveHeight
      );
      c.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      c.closePath();
      c.fill();
    };

    const drawFlower = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      const petals = 5;
      for (let i = 0; i < petals; i++) {
        const angle = (i * Math.PI * 2) / petals;
        const px = Math.cos(angle) * (size * 0.42);
        const py = Math.sin(angle) * (size * 0.42);
        c.moveTo(px, py);
        c.arc(px, py, size * 0.28, 0, Math.PI * 2);
      }
      c.fill();
      // Flower center
      c.fillStyle = '#FEF08A';
      c.beginPath();
      c.arc(0, 0, size * 0.2, 0, Math.PI * 2);
      c.fill();
    };

    const drawStar = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      for (let i = 0; i < 4; i++) {
        c.lineTo(
          Math.cos(((i * 90) * Math.PI) / 180) * size,
          Math.sin(((i * 90) * Math.PI) / 180) * size
        );
        c.lineTo(
          Math.cos(((45 + i * 90) * Math.PI) / 180) * (size * 0.28),
          Math.sin(((45 + i * 90) * Math.PI) / 180) * (size * 0.28)
        );
      }
      c.closePath();
      c.fill();
    };

    let time = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.rotation += p.rotationSpeed;
        const currentX = p.x + Math.sin(time * 0.8 + p.swayOffset) * p.swayDistance;

        // Reset if floated above top
        if (p.y < -40) {
          p.y = height + 30;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(currentX, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;

        const palette = heartColorSets[p.colorIndex];
        ctx.fillStyle = palette.fill;

        if (p.type === 'heart') {
          // Draw subtle glowing drop-shadow
          ctx.shadowColor = palette.glow;
          ctx.shadowBlur = 8;
          drawHeart(ctx, p.size);
        } else if (p.type === 'flower') {
          drawFlower(ctx, p.size);
        } else if (p.type === 'star') {
          ctx.shadowColor = 'rgba(251, 191, 36, 0.5)';
          ctx.shadowBlur = 6;
          drawStar(ctx, p.size);
        } else if (p.type === 'bubble') {
          // Soft heart bubble
          ctx.strokeStyle = palette.fill;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          // Tiny diamond sparkle
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.25, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [reducedMotion]);

  return (
    <>
      {/* Soft Pastel Mesh Glows in Background */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-tr from-[#FFF1F2] via-[#FDF2F8] to-[#FFFBEB]" />

      {/* Radiant Glowing Heart Radial Auras */}
      <div className="pointer-events-none fixed top-1/4 left-1/2 -translate-x-1/2 h-[550px] w-[550px] rounded-full bg-gradient-to-r from-rose-300/40 via-pink-300/35 to-amber-200/35 blur-3xl animate-soft-pulse" />
      <div className="pointer-events-none fixed -top-16 -left-16 h-80 w-80 rounded-full bg-pink-300/30 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-16 -right-16 h-96 w-96 rounded-full bg-rose-300/35 blur-3xl" />

      {/* Decorative floating CSS heart bokeh for crisp mobile depth */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none opacity-40">
        <span className="absolute top-[12%] left-[8%] text-2xl animate-gentle-float" style={{ animationDuration: '7s' }}>💖</span>
        <span className="absolute top-[28%] right-[10%] text-3xl animate-gentle-float" style={{ animationDuration: '9s', animationDelay: '1s' }}>💗</span>
        <span className="absolute top-[65%] left-[6%] text-3xl animate-gentle-float" style={{ animationDuration: '8s', animationDelay: '2s' }}>💕</span>
        <span className="absolute top-[75%] right-[12%] text-2xl animate-gentle-float" style={{ animationDuration: '10s', animationDelay: '0.5s' }}>🌸</span>
        <span className="absolute top-[48%] left-[88%] text-xl animate-gentle-float" style={{ animationDuration: '6.5s', animationDelay: '3s' }}>✨</span>
      </div>

      {/* High performance 60fps canvas particle field */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      />
    </>
  );
};
