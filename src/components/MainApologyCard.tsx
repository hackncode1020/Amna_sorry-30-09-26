import React, { useState, useRef } from 'react';
import { confetti } from '../utils/confetti';
import { Heart, Gift, ChevronDown, Check, Sparkles } from 'lucide-react';

interface MainApologyCardProps {
  onYesClick: () => void;
}

export const MainApologyCard: React.FC<MainApologyCardProps> = ({ onYesClick }) => {
  const [noAttempts, setNoAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isBooping, setIsBooping] = useState(false);
  const [boopHearts, setBoopHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [showPeaceOfferings, setShowPeaceOfferings] = useState(false);
  const [unlockedHints, setUnlockedHints] = useState<Record<number, boolean>>({
    0: true, // first hint open
  });

  const arenaRef = useRef<HTMLDivElement | null>(null);
  const noButtonRef = useRef<HTMLButtonElement | null>(null);

  // Exact progressive playful messages requested
  const noMessages = [
    '😤 NO',
    'Are you sure, Amna? 🥺',
    'Really? 😭',
    'Amnaaa pleaseee 🥹💗',
    'Okay okay… but think again 😭😂',
    'NO button is getting shy now 😂',
    'Why are you chasing the NO button? 😂',
    'Amna please forgive meee 🥺❤️',
    'Just press YES 😭',
    'Look how cute the YES button is 🥹💗',
  ];

  const currentNoText = noMessages[Math.min(noAttempts, noMessages.length - 1)];

  // 5 Sibling Peace Offerings / Bribes / Hints
  const peaceOfferings = [
    {
      id: 0,
      icon: '🍫',
      title: 'Peace Offering #1: The Sweet Tax',
      promise: 'Brother will buy your favorite chocolate & ice cream anytime you demand it.',
    },
    {
      id: 1,
      icon: '📺',
      title: 'Peace Offering #2: The Remote Control Truce',
      promise: '100% undisputed control of the TV remote for the entire month.',
    },
    {
      id: 2,
      icon: '🧹',
      title: 'Peace Offering #3: The Chore Immunity',
      promise: 'Brother will do your household chore whenever you don’t feel like doing it.',
    },
    {
      id: 3,
      icon: '🤐',
      title: 'Peace Offering #4: The Filter Guarantee',
      promise: 'Brother promises to pause and think before speaking, with zero teasing today.',
    },
    {
      id: 4,
      icon: '🫶',
      title: 'Peace Offering #5: Lifetime Protection',
      promise: 'Unconditional brotherly backup, protection, and love forever through everything.',
    },
  ];

  // Handle runaway dodge
  const handleDodge = (e: React.MouseEvent | React.TouchEvent | React.PointerEvent) => {
    if (e.cancelable) {
      e.preventDefault();
    }

    // Trigger visual boop & shake
    setIsBooping(true);
    setTimeout(() => setIsBooping(false), 350);

    // Spawn 2-3 tiny floating hearts near the button
    const newHearts = [
      { id: Date.now() + 1, x: (Math.random() - 0.5) * 40, y: -25 - Math.random() * 20 },
      { id: Date.now() + 2, x: (Math.random() - 0.5) * 40, y: -30 - Math.random() * 20 },
      { id: Date.now() + 3, x: (Math.random() - 0.5) * 40, y: -35 - Math.random() * 20 },
    ];
    setBoopHearts(newHearts);
    setTimeout(() => setBoopHearts([]), 900);

    // Subtle mobile vibration
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(25);
    }

    setNoAttempts((prev) => prev + 1);

    // Pre-calculated safe anchor slots inside arena to guarantee NO overlap with YES button
    // (YES button sits in center/left)
    const safeSlots = [
      { x: 90, y: -45 },
      { x: -90, y: 50 },
      { x: 100, y: 45 },
      { x: -85, y: -45 },
      { x: 80, y: 10 },
      { x: -95, y: 15 },
      { x: 110, y: -20 },
      { x: 0, y: 65 },
    ];

    const currentIdx = noAttempts % safeSlots.length;
    const nextSlot = safeSlots[(currentIdx + 1 + Math.floor(Math.random() * 3)) % safeSlots.length];
    setNoPosition(nextSlot);
  };

  const toggleHint = (id: number) => {
    setUnlockedHints((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const unlockAllHints = () => {
    const all: Record<number, boolean> = {};
    peaceOfferings.forEach((p) => (all[p.id] = true));
    setUnlockedHints(all);
    setShowPeaceOfferings(true);
    confetti.fire('festive', 30);
  };

  // Slightly smaller after several attempts, but always clearly visible & readable
  const noScale = Math.max(0.85, 1 - noAttempts * 0.015);

  return (
    <div className="relative mx-auto w-full max-w-xl px-2 sm:px-4 py-8 animate-fade-in">
      {/* Central Glass Card */}
      <div className="glass-card-elevated relative overflow-hidden rounded-3xl p-6 sm:p-10 border-2 border-rose-200/90 shadow-2xl shadow-rose-200/40 text-center">
        {/* Subtle floral watermark / gradient glow */}
        <div className="pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full bg-rose-200/40 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-amber-100/40 blur-2xl" />

        {/* Top Letter Icon */}
        <div
          className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-100 to-pink-50 border border-rose-200/70 text-2xl shadow-xs animate-bounce"
          style={{ animationDuration: '3s' }}
        >
          💌
        </div>

        {/* Salutation */}
        <span className="font-handwriting text-2xl sm:text-3xl font-bold text-rose-900 block">
          Dear Amna…
        </span>

        {/* Main Heading */}
        <h1 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
          Amna, I’m Really Sorry 🥺💗
        </h1>

        {/* Subtitle */}
        <p className="mt-1 text-sm sm:text-base font-semibold text-rose-800/80">
          Please forgive your annoying brother? 😭
        </p>

        {/* Letter Body Message */}
        <div className="my-6 rounded-2xl bg-white/75 p-5 sm:p-6 border border-rose-100 text-slate-700 leading-relaxed text-sm sm:text-base shadow-xs space-y-3 text-left">
          <p>
            I know I may have annoyed you,
            <br />
            made you angry,
            <br />
            or hurt your feelings.
          </p>

          <p className="font-semibold text-rose-950">
            But you are my sister and you mean a lot to me. ❤️
          </p>

          <p className="font-display text-base sm:text-lg text-slate-900 font-bold pt-1">
            So… will you forgive me?
          </p>
        </div>

        {/* Interactive Buttons Arena */}
        <div
          ref={arenaRef}
          className="relative min-h-[155px] sm:min-h-[165px] w-full flex flex-col items-center justify-center py-2 select-none"
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

            {/* THE RUNAWAY NO BUTTON */}
            <div
              style={{
                transform: `translate(${noPosition.x}px, ${noPosition.y}px) scale(${noScale})`,
                transition: 'transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
              className="relative inline-block"
            >
              {/* 2-3 Tiny floating boop hearts near the button */}
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
                onMouseEnter={handleDodge}
                onTouchStart={handleDodge}
                onPointerDown={handleDodge}
                onClick={handleDodge}
                className={`inline-flex items-center gap-1.5 rounded-full border-2 border-slate-300 bg-white/95 px-5 py-3 text-xs sm:text-sm font-bold text-slate-600 shadow-md backdrop-blur-xs transition-colors hover:bg-slate-100 hover:text-slate-800 focus:outline-none touch-manipulation cursor-pointer select-none whitespace-nowrap ${
                  isBooping ? 'animate-bounce' : ''
                }`}
                aria-label="No button (playfully moves away)"
              >
                <span>{currentNoText}</span>
              </button>
            </div>
          </div>

          {/* Secret hint after 3+ attempts */}
          {noAttempts >= 3 && (
            <p className="mt-4 text-xs font-semibold text-rose-800/80 animate-fade-in">
              Psst… I think the YES button is waiting for you 👀💗
            </p>
          )}
        </div>

        {/* BROTHER'S 5 PEACE OFFERINGS & BRIBES */}
        <div className="mt-6 pt-5 border-t border-rose-200/60 text-left">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => setShowPeaceOfferings(!showPeaceOfferings)}
              className="flex-1 flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200/80 text-amber-950 font-bold text-xs sm:text-sm transition-all hover:bg-amber-100/60 shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-rose-500" />
                <span>Brother's Official Peace Bribes ({peaceOfferings.length} Guarantees) 🎁</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-amber-700 transition-transform duration-300 ${
                  showPeaceOfferings ? 'rotate-180' : ''
                }`}
              />
            </button>

            <button
              onClick={unlockAllHints}
              className="rounded-2xl border border-rose-200 bg-white px-3 py-3 text-[11px] font-bold text-rose-700 hover:bg-rose-50 transition-colors shadow-xs"
              title="Unlock all promises"
            >
              Open All 5
            </button>
          </div>

          {showPeaceOfferings && (
            <div className="mt-3 space-y-2 animate-fade-in">
              <p className="text-[11px] text-slate-500 italic px-1">
                Tap each promise to inspect the compensation package from your brother:
              </p>

              {peaceOfferings.map((po) => {
                const isOpen = !!unlockedHints[po.id];
                return (
                  <div
                    key={po.id}
                    onClick={() => toggleHint(po.id)}
                    className="p-3 rounded-2xl bg-white/90 border border-rose-100/90 shadow-xs transition-all hover:border-rose-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                        <span className="text-base">{po.icon}</span>
                        <span>{po.title}</span>
                      </div>
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                        {isOpen ? 'Claimed ✓' : 'View'}
                      </span>
                    </div>

                    {isOpen && (
                      <p className="mt-2 text-xs text-slate-600 pl-6 leading-relaxed animate-fade-in font-medium">
                        {po.promise}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Sincere Signoff */}
        <div className="mt-6 pt-4 border-t border-rose-100 flex items-center justify-between text-xs text-slate-400">
          <span>From your brother with love</span>
          <span className="font-handwriting text-xl text-rose-900 font-bold">— Your Brother ❤️</span>
        </div>
      </div>
    </div>
  );
};
