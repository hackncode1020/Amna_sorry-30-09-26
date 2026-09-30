import React, { useState, useEffect, useRef } from 'react';
import { confetti } from '../../utils/confetti';
import { Sparkles, Heart, Timer, RotateCcw, ArrowRight } from 'lucide-react';

interface LoveMeterGameProps {
  onComplete: () => void;
}

export const LoveMeterGame: React.FC<LoveMeterGameProps> = ({ onComplete }) => {
  const [tapCount, setTapCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [hasStarted, setHasStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const REQUIRED_TAPS = 22; // ~2.2 taps/sec for 10s is very fun and achievable
  const progressPercent = Math.min(100, Math.round((tapCount / REQUIRED_TAPS) * 100));

  // Timer logic
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

  const handleHeartTap = (e: React.MouseEvent | React.TouchEvent) => {
    if (isCompleted || isTimeUp) return;

    if (!hasStarted) {
      setHasStarted(true);
    }

    // Vibration feedback on tap
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(20);
    }

    // Sparkle burst
    let clientX = window.innerWidth / 2;
    let clientY = window.innerHeight * 0.45;
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    confetti.burstAt(clientX, clientY, 6);

    const nextCount = tapCount + 1;
    setTapCount(nextCount);

    if (nextCount >= REQUIRED_TAPS) {
      setIsCompleted(true);
      confetti.fire('hearts', 80);
      confetti.fire('gold', 60);

      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate?.([60, 60, 100]);
      }
    }
  };

  const resetGame = () => {
    setTapCount(0);
    setTimeLeft(10);
    setHasStarted(false);
    setIsCompleted(false);
    setIsTimeUp(false);
  };

  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center px-4 py-6 text-center animate-fade-in">
      <div className="w-full max-w-lg">
        {/* Header Tag */}
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3.5 py-1 text-xs font-semibold text-rose-800 border border-rose-200">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span>Final Challenge · The Grand Trial</span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
          One last thing… 💗
        </h2>
        <p className="mt-1 text-sm text-slate-600 font-medium">
          Tap the heart as fast as you can to fill the Sister Love Meter!
        </p>

        {/* Progress Bar & Timer */}
        <div className="my-5 rounded-2xl bg-white/90 p-4 shadow-sm border border-rose-100">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
            <span>SISTER LOVE METER</span>
            <span className="text-rose-600 font-display text-sm">{progressPercent}%</span>
          </div>

          {/* Meter Bar */}
          <div className="h-5 w-full overflow-hidden rounded-full bg-rose-100/70 p-0.5 border border-rose-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 transition-all duration-150 ease-out shadow-xs"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1 text-rose-800">
              <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
              <span>{tapCount} / {REQUIRED_TAPS} Taps</span>
            </span>

            <span className="flex items-center gap-1">
              <Timer className="h-3.5 w-3.5 text-amber-600" />
              <span className={`font-bold ${timeLeft <= 3 ? 'text-red-600' : 'text-slate-700'}`}>
                {timeLeft}s remaining
              </span>
            </span>
          </div>
        </div>

        {/* Giant Interactive Animated Heart */}
        <div className="relative my-6 flex items-center justify-center">
          {/* Ambient Glow */}
          <div
            className="absolute h-56 w-56 rounded-full bg-gradient-to-tr from-rose-400/30 to-pink-300/30 blur-2xl transition-all duration-300"
            style={{
              transform: `scale(${1 + progressPercent / 150})`,
              opacity: 0.4 + progressPercent / 150,
            }}
          />

          <button
            onMouseDown={handleHeartTap}
            onTouchStart={handleHeartTap}
            disabled={isCompleted || isTimeUp}
            className="group relative z-10 flex h-48 w-48 sm:h-56 sm:w-56 cursor-pointer items-center justify-center rounded-full transition-transform active:scale-90 hover:scale-105 focus:outline-none touch-manipulation select-none"
            aria-label="Tap to fill love meter"
          >
            {/* SVG Heart with dynamic glow scale */}
            <svg
              viewBox="0 0 100 100"
              className="h-full w-full drop-shadow-xl transition-transform duration-100"
              style={{
                transform: `scale(${1 + (tapCount % 3) * 0.05})`,
              }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FB7185" />
                  <stop offset="50%" stopColor="#F43F5E" />
                  <stop offset="100%" stopColor="#BE123C" />
                </linearGradient>
              </defs>

              <path
                d="M50 88 C25 68 8 50 8 32 C8 17 20 8 34 8 C42 8 47 12 50 17 C53 12 58 8 66 8 C80 8 92 17 92 32 C92 50 75 68 50 88 Z"
                fill="url(#heartGrad)"
              />
              <path
                d="M34 16 C25 16 17 22 17 32 C17 38 22 46 30 54"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.45"
              />
            </svg>

            {/* Inner Tap Cue Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none">
              <span className="text-2xl sm:text-3xl font-black filter drop-shadow-sm animate-pulse">
                TAP!
              </span>
              <span className="text-[11px] font-bold tracking-wider uppercase opacity-90">
                {hasStarted ? 'Keep Going!' : 'Tap Here!'}
              </span>
            </div>
          </button>
        </div>

        {/* WIN MODAL */}
        {isCompleted && (
          <div className="mt-4 rounded-3xl bg-white/95 p-6 border-2 border-rose-300 shadow-xl max-w-md mx-auto animate-fade-in">
            <div className="text-5xl mb-2 animate-bounce">💖💖💖</div>
            <h3 className="font-display text-2xl font-black text-rose-950">
              LOVE METER FULL! 💖
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              You did it! You have officially conquered all 4 sister challenges!
            </p>

            <button
              onClick={onComplete}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Unlock My Sister Award! 🏆</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* TIME OUT MODAL */}
        {isTimeUp && !isCompleted && (
          <div className="mt-4 rounded-3xl bg-white/95 p-6 border-2 border-rose-200 shadow-xl max-w-md mx-auto animate-fade-in">
            <div className="text-4xl mb-2">⏱️</div>
            <h3 className="font-display text-xl font-bold text-slate-900">
              Almost there!
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              You reached {progressPercent}%. Tap a little faster this time!
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
