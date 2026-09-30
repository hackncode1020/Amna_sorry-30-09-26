import React, { useState, useEffect } from 'react';
import { confetti } from '../utils/confetti';
import { X, Heart, Sparkles, Gift } from 'lucide-react';

interface FinalSurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FinalSurpriseModal: React.FC<FinalSurpriseModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [showSecretMessage, setShowSecretMessage] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      setShowSecretMessage(false);
      return;
    }

    // Launch gentle dark-mode star/heart confetti
    confetti.fire('hearts', 50);

    // Staggered text animation as seen in the video
    const timers = [
      setTimeout(() => setStep(1), 300),   // Amna...
      setTimeout(() => setStep(2), 1000),  // "One last thing..."
      setTimeout(() => setStep(3), 1800),  // I'm Sorry.
      setTimeout(() => setStep(4), 2600),  // I Was Wrong.
      setTimeout(() => setStep(5), 3400),  // I genuinely regret hurting you.
      setTimeout(() => setStep(6), 4200),  // You don't have to forgive me right away.
      setTimeout(() => setStep(7), 5000),  // But I hope one day I can make things right.
      setTimeout(() => setStep(8), 5800),  // You'll Always Be My Sister box
    ];

    return () => timers.forEach(clearTimeout);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOpenSecret = () => {
    setShowSecretMessage(true);
    confetti.fire('hearts', 80);
    confetti.fire('gold', 60);
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.([50, 50, 80]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative my-auto w-full max-w-lg overflow-hidden rounded-3xl bg-gradient-to-b from-[#180A1A] via-[#100713] to-[#0A040C] border-2 border-rose-500/40 p-6 sm:p-9 text-center text-white shadow-2xl shadow-rose-950/80"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
          aria-label="Close surprise"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Ambient Glowing Flora (Cherry Blossom, Hibiscus, Lotus) as in the reference video */}
        <div className="pointer-events-none absolute top-4 left-4 text-3xl animate-soft-pulse opacity-90 filter drop-shadow-[0_0_12px_rgba(244,114,182,0.8)]">
          🌸
        </div>
        <div className="pointer-events-none absolute top-4 right-14 text-2xl animate-soft-pulse opacity-85 filter drop-shadow-[0_0_12px_rgba(251,113,133,0.8)]">
          🌺
        </div>
        <div className="pointer-events-none absolute bottom-5 left-5 text-2xl opacity-75 filter drop-shadow-[0_0_10px_rgba(244,63,94,0.6)]">
          🪷
        </div>
        <div className="pointer-events-none absolute bottom-5 right-5 text-2xl opacity-75 filter drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]">
          🌻
        </div>

        {/* Pulsing Neon Glowing Heart in Center */}
        <div className="relative mx-auto my-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-rose-500/30 to-pink-500/20 blur-sm animate-soft-pulse">
          <Heart className="h-12 w-12 fill-rose-500 text-rose-400 drop-shadow-[0_0_18px_rgba(244,63,94,0.9)] animate-pulse" />
        </div>

        {/* Sequential Emotional Dialogue */}
        <div className="space-y-3.5 my-4 min-h-[290px] flex flex-col justify-center">
          {step >= 1 && (
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-wide text-rose-100 drop-shadow-md animate-fade-in">
              Amna… ❤️
            </h2>
          )}

          {step >= 2 && (
            <p className="font-display text-base sm:text-lg italic text-rose-200/80 animate-fade-in">
              “One last thing…”
            </p>
          )}

          {step >= 3 && (
            <p className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-sm animate-fade-in">
              I’m Sorry.
            </p>
          )}

          {step >= 4 && (
            <p className="font-display text-xl sm:text-2xl font-bold text-rose-300 drop-shadow-sm animate-fade-in">
              I Was Wrong.
            </p>
          )}

          {step >= 5 && (
            <p className="text-sm sm:text-base font-medium text-rose-100/90 animate-fade-in max-w-sm mx-auto">
              I genuinely regret hurting you.
            </p>
          )}

          {step >= 6 && (
            <p className="text-xs sm:text-sm text-white/70 italic animate-fade-in max-w-xs mx-auto">
              You don’t have to forgive me right away.
            </p>
          )}

          {step >= 7 && (
            <p className="text-xs sm:text-sm text-rose-200/80 animate-fade-in max-w-xs mx-auto">
              But I hope one day I can make things right.
            </p>
          )}

          {/* Highlight Box from Video: "You'll Always Be My Sister. ❤️ — Abdaal Manzoor" */}
          {step >= 8 && (
            <div className="my-3 rounded-2xl bg-gradient-to-r from-rose-950/60 via-purple-950/50 to-rose-950/60 p-4 border border-rose-400/40 shadow-lg shadow-rose-950/70 animate-fade-in">
              <span className="font-display text-lg sm:text-xl font-extrabold text-rose-200 block">
                You’ll Always Be My Sister. ❤️
              </span>
              <span className="font-handwriting text-xl sm:text-2xl text-rose-300 block mt-1">
                — Abdaal Manzoor
              </span>
            </div>
          )}
        </div>

        {/* Action Button: "Open One Last Surprise 💌" */}
        {step >= 8 && !showSecretMessage && (
          <div className="mt-4 animate-fade-in">
            <button
              onClick={handleOpenSecret}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-rose-500 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-rose-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-rose-300/40"
            >
              <Gift className="h-4 w-4" />
              <span>Open One Last Surprise 💌</span>
            </button>
          </div>
        )}

        {/* Secret Touchingly Sweet Promise Card */}
        {showSecretMessage && (
          <div className="mt-4 rounded-2xl bg-white/95 p-5 text-slate-800 border-2 border-rose-300 shadow-2xl animate-fade-in text-center">
            <div className="text-3xl mb-1">🌸💌✨</div>
            <h4 className="font-display text-lg font-bold text-rose-950">
              A Brother’s Lifelong Promise
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              “No matter how much we argue or where life takes us, you will always be my precious little sister. I promise to listen to you, protect you, and cherish you every single day.”
            </p>
            <p
              dir="rtl"
              className="mt-3 font-serif text-base text-rose-900 font-semibold leading-relaxed border-t border-rose-100 pt-2"
            >
              تم میرے لیے بہت قیمتی ہو، اور میں ہمارے رشتے کی دل سے عزت کرتا ہوں۔
            </p>
            <p className="mt-2 font-handwriting text-xl font-bold text-rose-900">
              With all my love, Abdaal ❤️
            </p>
          </div>
        )}

        {/* Replay or Done */}
        <div className="mt-5 flex items-center justify-center gap-2">
          <button
            onClick={onClose}
            className="rounded-full bg-white/10 px-5 py-2 text-xs font-semibold text-white/80 hover:bg-white/20 transition-colors"
          >
            Close Surprise
          </button>
        </div>
      </div>
    </div>
  );
};
