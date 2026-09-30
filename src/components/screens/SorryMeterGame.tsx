import React, { useState, useEffect, useRef } from 'react';
import { confetti } from '../../utils/confetti';
import { Sparkles, Heart, Timer, ArrowRight, RotateCcw } from 'lucide-react';

interface SorryHeartMeterProps {
  onComplete: () => void;
}

export const SorryHeartMeter: React.FC<SorryHeartMeterProps> = ({ onComplete }) => {
  const [tapCount, setTapCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [hasStarted, setHasStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  const heartBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastTapTimeRef = useRef(0);

  const REQUIRED_TAPS = 25;
  const percentage = Math.min(100, Math.round((tapCount / REQUIRED_TAPS) * 100));

  // Timer countdown
  useEffect(() => {
    if (!hasStarted || isCompleted || isTimeUp) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (tapCount < REQUIRED_TAPS) {
            setIsTimeUp(true);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, isCompleted, isTimeUp, tapCount]);

  // Non-passive touch listener on button to explicitly kill Android double-tap zoom & scroll
  useEffect(() => {
    const btn = heartBtnRef.current;
    if (!btn) return;

    const handleNativeTouch = (e: TouchEvent) => {
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    btn.addEventListener('touchstart', handleNativeTouch, { passive: false });
    return () => {
      btn.removeEventListener('touchstart', handleNativeTouch);
    };
  }, []);

  // Zero-latency tap handler for mobile & desktop
  const handleHeartTap = (clientX?: number, clientY?: number) => {
    if (isCompleted || isTimeUp) return;

    const now = performance.now();
    // Debounce micro duplicate events within 30ms (prevents dual pointer + touch triggers)
    if (now - lastTapTimeRef.current < 30) return;
    lastTapTimeRef.current = now;

    if (!hasStarted) {
      setHasStarted(true);
    }

    // Trigger visual scale bounce
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 90);

    // Light subtle vibration
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(15);
    }

    // Micro particle burst at tap location
    const x = clientX ?? window.innerWidth / 2;
    const y = clientY ?? window.innerHeight * 0.45;
    confetti.burstAt(x, y, 4);

    const nextCount = tapCount + 1;
    setTapCount(nextCount);

    if (nextCount >= REQUIRED_TAPS) {
      setIsCompleted(true);
      confetti.fire('hearts', 80);
      confetti.fire('festive', 60);

      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate?.([50, 50, 90]);
      }
    }
  };

  const resetGame = () => {
    setTapCount(0);
    setTimeLeft(15);
    setHasStarted(false);
    setIsCompleted(false);
    setIsTimeUp(false);
  };

  return (
    <div className="flex min-h-[82vh] flex-col items-center justify-center px-3 sm:px-4 py-6 text-center animate-fade-in select-none">
      <div className="w-full max-w-lg">
        {/* Tag */}
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-pink-100 px-3.5 py-1 text-xs font-semibold text-pink-900 border border-pink-200">
          <Sparkles className="h-3.5 w-3.5 text-pink-600" />
          <span>Challenge 3: Fill The Sorry Meter 💗</span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
          My sorry is BIG… but can you fill the meter?
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 font-medium">
          Tap the ❤️ as fast as you can! (15-second timer)
        </p>

        {/* Progress Bar & Status */}
        <div className="my-5 rounded-2xl bg-white/90 p-4 shadow-sm border border-rose-100">
          <div className="flex items-center justify-between text-xs font-black text-slate-500 mb-2">
            <span>SORRY LEVEL: {percentage}%</span>
            <span className="text-rose-600 font-display text-sm font-bold">
              {percentage === 100 ? 'MAXED OUT! 💖' : `${tapCount}/${REQUIRED_TAPS} Taps`}
            </span>
          </div>

          {/* Bar */}
          <div className="h-5 w-full overflow-hidden rounded-full bg-rose-100/70 p-0.5 border border-rose-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 transition-all duration-100 ease-out shadow-xs"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1 text-rose-800">
              <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
              <span>Tap the heart repeatedly!</span>
            </span>

            <span className="flex items-center gap-1">
              <Timer className="h-3.5 w-3.5 text-amber-600" />
              <span className={`font-bold ${timeLeft <= 4 ? 'text-red-600 animate-pulse' : 'text-slate-700'}`}>
                {timeLeft}s left
              </span>
            </span>
          </div>
        </div>

        {/* Giant Interactive Animated Heart (Lag-Free & Anti-Scroll) */}
        <div className="relative my-6 flex items-center justify-center">
          {/* Ambient Glow */}
          <div
            className="absolute h-56 w-56 rounded-full bg-gradient-to-tr from-rose-400/30 to-pink-300/30 blur-2xl transition-all duration-200 pointer-events-none"
            style={{
              transform: `scale(${1 + percentage / 160})`,
              opacity: 0.4 + percentage / 160,
            }}
          />

          <button
            ref={heartBtnRef}
            onPointerDown={(e) => {
              e.preventDefault();
              handleHeartTap(e.clientX, e.clientY);
            }}
            disabled={isCompleted || isTimeUp}
            style={{
              touchAction: 'none',
              WebkitTapHighlightColor: 'transparent',
              transform: isBouncing ? 'scale(0.88)' : 'scale(1)',
              transition: 'transform 0.08s ease-out',
            }}
            className="group relative z-10 flex h-48 w-48 sm:h-56 sm:w-56 cursor-pointer items-center justify-center rounded-full focus:outline-none touch-none select-none active:scale-90"
            aria-label="Tap to fill sorry meter"
          >
            {/* SVG Heart */}
            <svg
              viewBox="0 0 100 100"
              className="h-full w-full drop-shadow-xl pointer-events-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="meterHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FB7185" />
                  <stop offset="50%" stopColor="#F43F5E" />
                  <stop offset="100%" stopColor="#BE123C" />
                </linearGradient>
              </defs>

              <path
                d="M50 88 C25 68 8 50 8 32 C8 17 20 8 34 8 C42 8 47 12 50 17 C53 12 58 8 66 8 C80 8 92 17 92 32 C92 50 75 68 50 88 Z"
                fill="url(#meterHeartGrad)"
              />
              <path
                d="M34 16 C25 16 17 22 17 32 C17 38 22 46 30 54"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.45"
              />
            </svg>

            {/* Inner Tap Cue */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none">
              <span className="text-3xl sm:text-4xl font-black filter drop-shadow-sm animate-pulse">
                TAP!
              </span>
              <span className="text-[11px] font-bold tracking-wider uppercase opacity-90">
                {hasStarted ? 'Keep Tapping!' : 'Tap Here!'}
              </span>
            </div>
          </button>
        </div>

        {/* 100% COMPLETE OVERLAY */}
        {isCompleted && (
          <div className="mt-4 rounded-3xl bg-white/95 p-6 border-2 border-rose-300 shadow-xl max-w-md mx-auto animate-fade-in">
            <div className="text-5xl mb-2 animate-bounce">100% 🥹❤️</div>
            <h3 className="font-display text-2xl font-black text-rose-950">
              100% SORRY! 🥹❤️
            </h3>
            <p className="mt-1 text-sm text-slate-700 leading-relaxed font-medium">
              Okay Amna… I think I have officially said sorry enough times now. 😭😂
            </p>

            <button
              onClick={onComplete}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Continue →</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* TIMEOUT OVERLAY */}
        {isTimeUp && !isCompleted && (
          <div className="mt-4 rounded-3xl bg-white/95 p-6 border-2 border-rose-200 shadow-xl max-w-md mx-auto animate-fade-in">
            <div className="text-4xl mb-2">⏱️</div>
            <h3 className="font-display text-xl font-bold text-slate-900">
              Almost reached 100%!
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              You reached {percentage}%. Tap a little faster this time!
            </p>
            <button
              onClick={resetGame}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-rose-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-rose-700 active:scale-95 transition-all cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Retry Challenge</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
