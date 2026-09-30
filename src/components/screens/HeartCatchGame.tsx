import React, { useState, useEffect, useRef, useCallback } from 'react';
import { confetti } from '../../utils/confetti';
import { Heart, Timer, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';

interface HeartCatchGameProps {
  onComplete: () => void;
}

interface FallingHeart {
  id: number;
  x: number; // percentage (10% to 85%)
  y: number; // percentage (0% to 105%)
  speed: number;
  size: number;
  emoji: string;
}

interface TrailParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  char: string;
  alpha: number;
}

// Static constants defined outside component to prevent reference re-creation
const EMOJIS = ['❤️', '💖', '💕', '💗', '🌸', '✨'];
const TRAIL_CHARS = ['✨', '💖', '⭐', '💕', '💫'];
const TRAIL_COLORS = ['#F43F5E', '#FB7185', '#FBBF24', '#EC4899', '#C084FC'];
const TARGET_SCORE = 10;

const createInitialHearts = (): FallingHeart[] => [
  { id: 1, x: 22, y: 15, speed: 0.42, size: 44, emoji: '❤️' },
  { id: 2, x: 52, y: 32, speed: 0.38, size: 46, emoji: '💖' },
  { id: 3, x: 76, y: 10, speed: 0.45, size: 42, emoji: '🌸' },
  { id: 4, x: 36, y: 50, speed: 0.40, size: 45, emoji: '💗' },
];

export const HeartCatchGame: React.FC<HeartCatchGameProps> = ({ onComplete }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isWon, setIsWon] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hearts, setHearts] = useState<FallingHeart[]>(createInitialHearts);

  const requestRef = useRef<number | null>(null);
  const nextHeartId = useRef(10);
  const lastSpawnTime = useRef(Date.now());
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastCaughtId = useRef<number | null>(null);

  // In-memory trail particle pool
  const trailParticles = useRef<TrailParticle[]>([]);

  // Start / Reset game
  const resetGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsWon(false);
    setIsGameOver(false);
    setHearts(createInitialHearts());
    trailParticles.current = [];
    lastSpawnTime.current = Date.now();
  };

  // Timer countdown
  useEffect(() => {
    if (isWon || isGameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isWon, isGameOver]);

  // Fast particle spawner directly in memory (zero React state overhead)
  const addTrailParticle = useCallback((clientX: number, clientY: number, count = 2) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relX = clientX - rect.left;
    const relY = clientY - rect.top;

    if (relX < 0 || relX > rect.width || relY < 0 || relY > rect.height) return;

    for (let i = 0; i < count; i++) {
      trailParticles.current.push({
        x: relX + (Math.random() - 0.5) * 12,
        y: relY + (Math.random() - 0.5) * 12,
        vx: (Math.random() - 0.5) * 2.2,
        vy: -Math.random() * 2.2 - 0.6,
        size: Math.random() * 5 + 13,
        color: TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)],
        char: TRAIL_CHARS[Math.floor(Math.random() * TRAIL_CHARS.length)],
        alpha: 1.0,
      });
    }

    if (trailParticles.current.length > 40) {
      trailParticles.current = trailParticles.current.slice(-40);
    }
  }, []);

  // Resize trail canvas on mount/resize
  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current && canvasRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
      }
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  // Main game animation loop: spawns & moves hearts and animates canvas trail
  useEffect(() => {
    if (isWon || isGameOver) return;

    const gameLoop = () => {
      const now = Date.now();

      // Spawn falling heart every ~650ms if count < 9
      if (now - lastSpawnTime.current > 650) {
        lastSpawnTime.current = now;
        setHearts((prev) => {
          if (prev.length >= 8) return prev;
          const newHeart: FallingHeart = {
            id: nextHeartId.current++,
            x: Math.random() * 75 + 12, // 12% to 87%
            y: -8,
            speed: Math.random() * 0.45 + 0.35,
            size: Math.random() * 10 + 40,
            emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
          };
          return [...prev, newHeart];
        });
      }

      // Move hearts downward
      setHearts((prev) =>
        prev
          .map((h) => ({ ...h, y: h.y + h.speed }))
          .filter((h) => h.y < 105)
      );

      // Render sparkling heart trail to canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const survivingParticles: TrailParticle[] = [];
          for (let i = 0; i < trailParticles.current.length; i++) {
            const p = trailParticles.current[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy -= 0.05;
            p.alpha -= 0.035;

            if (p.alpha > 0) {
              ctx.save();
              ctx.globalAlpha = p.alpha;
              ctx.font = `${p.size}px sans-serif`;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.shadowColor = p.color;
              ctx.shadowBlur = 6;
              ctx.fillText(p.char, p.x, p.y);
              ctx.restore();

              survivingParticles.push(p);
            }
          }
          trailParticles.current = survivingParticles;
        }
      }

      requestRef.current = requestAnimationFrame(gameLoop);
    };

    requestRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isWon, isGameOver]);

  // Touch and pointer move handlers for magic trail (without blocking clicks)
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isWon || isGameOver) return;
    for (let i = 0; i < e.touches.length; i++) {
      addTrailParticle(e.touches[i].clientX, e.touches[i].clientY, 1);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isWon || isGameOver) return;
    if (e.pointerType === 'mouse') {
      addTrailParticle(e.clientX, e.clientY, 1);
    }
  };

  // Instant 0ms catch handler with haptic feedback & particle burst
  const handleCatchHeart = (heartId: number, clientX?: number, clientY?: number) => {
    if (isWon || isGameOver) return;

    // Deduplicate same heart click within single interaction
    if (lastCaughtId.current === heartId) return;
    lastCaughtId.current = heartId;

    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(25);
    }

    const x = clientX ?? window.innerWidth / 2;
    const y = clientY ?? window.innerHeight / 2;

    // Sparkle burst & heart trail burst
    confetti.burstAt(x, y, 8);
    addTrailParticle(x, y, 6);

    // Remove caught heart immediately
    setHearts((prev) => prev.filter((h) => h.id !== heartId));

    // Increase score
    setScore((prev) => {
      const nextScore = prev + 1;
      if (nextScore >= TARGET_SCORE) {
        setIsWon(true);
        confetti.fire('hearts', 70);
        confetti.fire('festive', 50);
      }
      return nextScore;
    });
  };

  return (
    <div className="flex min-h-[82vh] flex-col items-center justify-center px-3 sm:px-4 py-4 animate-fade-in select-none">
      <div className="w-full max-w-xl">
        {/* Game Header Bar */}
        <div className="mb-3 flex items-center justify-between rounded-2xl bg-white/95 p-3.5 sm:p-4 shadow-sm border border-rose-200/80">
          {/* Target Score */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-500 shadow-xs">
              <Heart className="h-5 w-5 fill-rose-500" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Score
              </span>
              <span className="font-display text-base sm:text-lg font-bold text-slate-900">
                Hearts: {score}/10
              </span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center px-1">
            <span className="text-xs sm:text-sm font-bold text-rose-950 block">
              Challenge 1: Catch My Sorry Hearts ❤️
            </span>
            <span className="text-[10px] text-slate-500 flex items-center justify-center gap-1">
              <Sparkles className="h-3 w-3 text-amber-500" />
              <span>Tap falling hearts with your finger!</span>
            </span>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-2">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-xs ${
                timeLeft <= 5 ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-amber-50 text-amber-600'
              }`}
            >
              <Timer className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Time
              </span>
              <span
                className={`font-display text-base sm:text-lg font-bold ${
                  timeLeft <= 5 ? 'text-red-600 font-black' : 'text-slate-900'
                }`}
              >
                {timeLeft}s
              </span>
            </div>
          </div>
        </div>

        {/* Play Area / Canvas Box with CSS touch-action: none (prevents scrolling safely without blocking clicks) */}
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onTouchMove={handleTouchMove}
          style={{ touchAction: 'none' }}
          className="relative h-[440px] sm:h-[480px] w-full overflow-hidden rounded-3xl bg-gradient-to-b from-rose-50/80 via-pink-50/50 to-white border-2 border-rose-200/90 shadow-inner select-none cursor-pointer"
        >
          {/* Subtle clouds/sky guides */}
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 opacity-40">
            <div className="text-xs text-rose-900/70 font-semibold text-center">
              Catch 10 hearts before the timer ends!
            </div>
            <div className="border-b-2 border-dashed border-rose-200/70" />
          </div>

          {/* High-Performance Canvas for Sparkling Heart Trail */}
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 z-10 h-full w-full"
          />

          {/* Falling Hearts */}
          {!isWon &&
            !isGameOver &&
            hearts.map((h) => (
              <button
                key={h.id}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  handleCatchHeart(h.id, e.clientX, e.clientY);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCatchHeart(h.id, e.clientX, e.clientY);
                }}
                style={{
                  left: `${h.x}%`,
                  top: `${h.y}%`,
                  fontSize: `${h.size}px`,
                  minWidth: '58px',
                  minHeight: '58px',
                  touchAction: 'none',
                  WebkitTapHighlightColor: 'transparent',
                }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer flex items-center justify-center transition-transform active:scale-125 focus:outline-none touch-manipulation hover:scale-110 active:opacity-80 select-none"
                aria-label="Catch heart"
              >
                <span className="filter drop-shadow-md select-none animate-pulse pointer-events-none">
                  {h.emoji}
                </span>
              </button>
            ))}

          {/* WIN OVERLAY */}
          {isWon && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/95 p-6 text-center animate-fade-in backdrop-blur-xs">
              <div className="text-5xl mb-3 animate-bounce">🥹❤️</div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                10/10! 🥹❤️
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-700 font-medium max-w-sm">
                Okay Amna… you caught all my sorry hearts!
              </p>

              <button
                onClick={onComplete}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-rose-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Next Challenge</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* TIME OVERLAY */}
          {isGameOver && !isWon && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/95 p-6 text-center animate-fade-in backdrop-blur-xs">
              <div className="text-5xl mb-3">😭</div>
              <h3 className="font-display text-2xl font-bold text-slate-900">
                Oops! 😭 Try again!
              </h3>
              <p className="mt-2 text-sm text-slate-600 max-w-xs">
                You caught {score} out of 10 hearts. Don’t give up, your brother is waiting!
              </p>

              <button
                onClick={resetGame}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-rose-600 px-7 py-3 text-sm font-bold text-white shadow-md hover:bg-rose-700 active:scale-95 transition-all cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Try Again</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
