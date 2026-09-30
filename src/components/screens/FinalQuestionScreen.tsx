import React, { useState, useRef } from 'react';
import { confetti } from '../../utils/confetti';
import { Heart, Sparkles, HelpCircle } from 'lucide-react';

interface FinalQuestionScreenProps {
  onYesClick: () => void;
}

export const FinalQuestionScreen: React.FC<FinalQuestionScreenProps> = ({ onYesClick }) => {
  const [noAttempts, setNoAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isBooping, setIsBooping] = useState(false);
  const [boopHearts, setBoopHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const arenaRef = useRef<HTMLDivElement | null>(null);
  const noButtonRef = useRef<HTMLButtonElement | null>(null);

  // Exact progressive messages requested
  const noMessages = [
    '😤 NO',
    'Are you sure, Amna? 🥺',
    'Really? 😭',
    'Amnaaa pleaseee… 🥹❤️',
    'I already caught 10 hearts for you! 😭😂',
    'Okay okay… I understand… but please forgive me? 🥺',
    'The NO button is getting scared now 😂',
    'Your brother is still waiting for forgiveness 😭❤️',
    'Please press YES, Amnaaa 🥹',
    'Look at the cute hearts! How can you say no? 😂❤️',
  ];

  const currentNoText = noMessages[Math.min(noAttempts, noMessages.length - 1)];

  const lastDodgeTimeRef = useRef(0);

  // Dodge handler
  const handleDodge = (clientX?: number, clientY?: number) => {
    const now = performance.now();
    // Debounce rapid duplicate events within 80ms
    if (now - lastDodgeTimeRef.current < 80) return;
    lastDodgeTimeRef.current = now;

    setIsBooping(true);
    setTimeout(() => setIsBooping(false), 350);

    // Spawn 2-3 tiny floating hearts near button
    const newHearts = [
      { id: Date.now() + 1, x: (Math.random() - 0.5) * 40, y: -25 - Math.random() * 20 },
      { id: Date.now() + 2, x: (Math.random() - 0.5) * 40, y: -30 - Math.random() * 20 },
      { id: Date.now() + 3, x: (Math.random() - 0.5) * 40, y: -35 - Math.random() * 20 },
    ];
    setBoopHearts(newHearts);
    setTimeout(() => setBoopHearts([]), 900);

    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(25);
    }

    setNoAttempts((prev) => prev + 1);

    // Pre-calculated safe anchor slots inside arena to guarantee NO overlap with YES button
    const safeSlots = [
      { x: 90, y: -45 },
      { x: -90, y: 50 },
      { x: 100, y: 45 },
      { x: -85, y: -45 },
      { x: 80, y: 15 },
      { x: -95, y: 15 },
      { x: 110, y: -20 },
      { x: 0, y: 65 },
    ];

    const currentIdx = noAttempts % safeSlots.length;
    const nextSlot = safeSlots[(currentIdx + 1 + Math.floor(Math.random() * 3)) % safeSlots.length];
    setNoPosition(nextSlot);
  };

  const noScale = Math.max(0.85, 1 - noAttempts * 0.015);

  return (
    <div className="flex min-h-[82vh] flex-col items-center justify-center px-4 py-6 animate-fade-in text-center">
      <div className="glass-card-elevated relative mx-auto w-full max-w-lg rounded-3xl p-6 sm:p-10 border-2 border-rose-200/90 shadow-2xl shadow-rose-200/40 text-center overflow-hidden">
        {/* Top Tag */}
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-4 py-1 text-xs font-semibold text-rose-900 border border-rose-200/70">
          <HelpCircle className="h-3.5 w-3.5 text-rose-500" />
          <span>The Most Important Moment</span>
        </div>

        {/* Title */}
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          One Last Question, Amna… 🥺
        </h2>

        {/* Message */}
        <div className="my-6 rounded-2xl bg-white/75 p-6 border border-rose-100/90 text-slate-700 leading-relaxed text-base sm:text-lg shadow-xs space-y-3">
          <p className="font-medium text-slate-800">
            Your brother is genuinely sorry.
          </p>

          <p className="font-display text-xl sm:text-2xl font-black text-rose-900 pt-1">
            Will you forgive him?
          </p>
        </div>

        {/* Interactive Buttons Arena */}
        <div
          ref={arenaRef}
          className="relative min-h-[160px] sm:min-h-[170px] w-full flex flex-col items-center justify-center py-2 select-none"
        >
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 z-10">
            {/* BIG YES BUTTON */}
            <button
              onClick={onYesClick}
              className="group relative inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 px-7 sm:px-9 py-3.5 sm:py-4 text-sm sm:text-base font-black text-white shadow-xl shadow-rose-500/35 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-rose-500/45 focus:outline-none focus:ring-4 focus:ring-rose-200 active:scale-95 cursor-pointer"
            >
              <Heart className="h-5 w-5 fill-white text-white animate-pulse" />
              <span>💗 YES, I FORGIVE YOU</span>
            </button>

            {/* RUNAWAY NO BUTTON */}
            <div
              style={{
                transform: `translate(${noPosition.x}px, ${noPosition.y}px) scale(${noScale})`,
                transition: 'transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
              className="relative inline-block"
            >
              {boopHearts.map((h) => (
                <span
                  key={h.id}
                  style={{
                    transform: `translate(${h.x}px, ${h.y}px)`,
                  }}
                  className="pointer-events-none absolute top-0 left-1/2 text-sm animate-ping select-none"
                >
                  💖
                </span>
              ))}

              <button
                ref={noButtonRef}
                onMouseEnter={(e) => handleDodge(e.clientX, e.clientY)}
                onPointerDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDodge(e.clientX, e.clientY);
                }}
                style={{
                  touchAction: 'none',
                  WebkitTapHighlightColor: 'transparent',
                }}
                className={`inline-flex items-center gap-1.5 rounded-full border-2 border-slate-300 bg-white/95 px-5 py-3 text-xs sm:text-sm font-bold text-slate-600 shadow-md backdrop-blur-xs transition-colors hover:bg-slate-100 hover:text-slate-800 focus:outline-none touch-none cursor-pointer select-none whitespace-nowrap ${
                  isBooping ? 'animate-bounce' : ''
                }`}
                aria-label="No button (playfully moves away)"
              >
                <span>{currentNoText}</span>
              </button>
            </div>
          </div>

          {/* Hint after multiple attempts */}
          {noAttempts >= 3 && (
            <p className="mt-4 text-xs font-semibold text-rose-800/80 animate-fade-in">
              Psst… I think the YES button is waiting for you 👀💗
            </p>
          )}
        </div>

        {/* Footer signoff */}
        <div className="mt-4 pt-4 border-t border-rose-100 flex items-center justify-between text-xs text-slate-400">
          <span>Your brother is counting on you</span>
          <span className="font-handwriting text-xl text-rose-900 font-bold">— Your Brother ❤️</span>
        </div>
      </div>
    </div>
  );
};
