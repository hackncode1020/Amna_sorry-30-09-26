import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Pause, Play } from 'lucide-react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  petalType: number;
}

export const PetalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setIsPaused(true);
    }

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) setIsPaused(true);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(244, 185, 193, 0.65)', // blush pink
      'rgba(251, 213, 218, 0.6)',  // light rose
      'rgba(235, 206, 235, 0.55)', // soft lavender
      'rgba(254, 233, 218, 0.65)', // soft peach
      'rgba(255, 240, 243, 0.7)',  // cream rose
      'rgba(253, 224, 171, 0.45)', // subtle warm gold floret
    ];

    // Moderate number of particles so it never slows down mobile
    const petalCount = window.innerWidth < 768 ? 16 : 28;
    const petals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 9 + 6,
        speedY: Math.random() * 0.75 + 0.35,
        speedX: Math.sin(Math.random() * Math.PI) * 0.5 - 0.25,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.2,
        opacity: Math.random() * 0.55 + 0.35,
        color: colors[Math.floor(Math.random() * colors.length)],
        petalType: Math.floor(Math.random() * 3),
      });
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.beginPath();

      if (p.petalType === 0) {
        // Oval rose petal
        ctx.moveTo(0, -p.size);
        ctx.quadraticCurveTo(p.size * 0.8, -p.size * 0.3, 0, p.size);
        ctx.quadraticCurveTo(-p.size * 0.8, -p.size * 0.3, 0, -p.size);
      } else if (p.petalType === 1) {
        // Cherry blossom petal with tiny notch
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.7, -p.size * 0.8, p.size * 0.8, p.size * 0.5, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.5, -p.size * 0.7, -p.size * 0.8, 0, -p.size);
      } else {
        // Small floating petal droplet
        ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
      }

      ctx.fill();
      ctx.restore();
    };

    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 0.015;

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(tick + p.y * 0.01) * 0.6 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isPaused]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      />
      {/* Floating control button at bottom right (compact & accessible) */}
      <button
        onClick={() => setIsPaused((prev) => !prev)}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-rose-900/80 shadow-md backdrop-blur-md transition-all hover:bg-rose-50 hover:text-rose-950 focus:outline-none focus:ring-2 focus:ring-rose-300"
        title={isPaused ? 'Resume floating flower petals' : 'Pause floating flower petals'}
        aria-label={isPaused ? 'Resume floating petals' : 'Pause floating petals'}
      >
        <Sparkles className="h-3.5 w-3.5 text-rose-400" />
        <span className="hidden sm:inline">{isPaused ? 'Play Petals' : 'Pause Petals'}</span>
        {isPaused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
      </button>
    </>
  );
};
