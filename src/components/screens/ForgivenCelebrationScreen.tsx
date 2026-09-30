import React, { useEffect, useState } from 'react';
import { confetti } from '../../utils/confetti';
import { Trophy, Sparkles, Heart, ArrowRight, Gift } from 'lucide-react';
import { FinalSurpriseModal } from '../FinalSurpriseModal';

interface ForgivenCelebrationScreenProps {
  onViewAward: () => void;
}

export const ForgivenCelebrationScreen: React.FC<ForgivenCelebrationScreenProps> = ({
  onViewAward,
}) => {
  const [showFinalSurprise, setShowFinalSurprise] = useState(false);

  useEffect(() => {
    // Huge celebration cascade
    confetti.fire('hearts', 100);
    setTimeout(() => {
      confetti.fire('gold', 80);
    }, 350);
    setTimeout(() => {
      confetti.fire('festive', 80);
    }, 700);

    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.([60, 40, 80, 40, 120]);
    }
  }, []);

  return (
    <div className="relative flex min-h-[82vh] flex-col items-center justify-center px-4 py-8 text-center animate-fade-in">
      <div className="glass-card-elevated relative z-10 mx-auto w-full max-w-lg overflow-hidden rounded-3xl p-6 sm:p-10 border-4 border-amber-300 shadow-2xl text-center">
        {/* Corner Stars */}
        <div className="absolute top-4 left-4 text-amber-400 text-lg">★</div>
        <div className="absolute top-4 right-4 text-amber-400 text-lg">★</div>

        {/* Celebration Tag */}
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-4 py-1 text-xs font-black uppercase tracking-wider text-emerald-900 border border-emerald-300">
          <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
          <span>Apology Accepted</span>
        </div>

        {/* Big Joyous Headings */}
        <h1 className="font-display text-3xl sm:text-5xl font-black text-rose-950 tracking-tight">
          🥹 SHE SAID YES! 🥹
        </h1>
        <h2 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-slate-800">
          AMNA FORGAVE HER BROTHER! ❤️
        </h2>

        {/* Sweet Gratitude */}
        <p className="mt-3 font-display text-lg sm:text-xl font-bold text-rose-700">
          Thank you, Amna. 🥺💗
        </p>
        <p className="mt-1 text-base font-semibold text-slate-700">
          You really are the BEST SISTER.
        </p>

        {/* Animated Golden Trophy Icon */}
        <div className="relative my-6 mx-auto flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 shadow-xl shadow-amber-400/40 text-amber-950 animate-gentle-float">
          <Trophy className="h-14 w-14 sm:h-16 sm:w-16 stroke-[1.8] text-amber-950" />
          <div className="absolute -top-2 -right-2 text-2xl animate-bounce">✨</div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-col items-center gap-3">
          <button
            onClick={onViewAward}
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-amber-500 via-rose-600 to-pink-600 px-8 py-4 text-base font-black text-white shadow-xl shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Trophy className="h-5 w-5" />
            <span>🏆 Claim Best Sister Award</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => setShowFinalSurprise(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-900 to-rose-900 px-6 py-3 text-xs sm:text-sm font-bold text-rose-200 border border-rose-400/40 hover:bg-rose-900/90 transition-all shadow-md cursor-pointer"
          >
            <Gift className="h-4 w-4 text-amber-400" />
            <span>✨ Continue To The Final Surprise 💌</span>
          </button>

          <span className="text-xs text-rose-900/70 font-medium">
            From your brother Abdaal with all his heart ❤️
          </span>
        </div>

        {/* 🎬 FINAL SURPRISE MODAL POPUP */}
        <FinalSurpriseModal
          isOpen={showFinalSurprise}
          onClose={() => setShowFinalSurprise(false)}
        />
      </div>
    </div>
  );
};
