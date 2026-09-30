import React, { useEffect } from 'react';
import { confetti } from '../../utils/confetti';
import { Trophy, Sparkles, Heart, ArrowRight, Award } from 'lucide-react';

interface AwardUnlockScreenProps {
  sisterName: string;
  onViewCertificate: () => void;
}

export const AwardUnlockScreen: React.FC<AwardUnlockScreenProps> = ({
  sisterName,
  onViewCertificate,
}) => {
  useEffect(() => {
    // Grand celebration confetti burst
    confetti.fire('gold', 100);
    setTimeout(() => {
      confetti.fire('festive', 80);
    }, 400);
    setTimeout(() => {
      confetti.fire('hearts', 60);
    }, 800);

    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.([60, 40, 80, 40, 120]);
    }
  }, []);

  return (
    <div className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 py-8 text-center animate-fade-in overflow-hidden">
      {/* Darkened/Atmospheric Golden Radial Backdrop */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-amber-950/20 via-rose-950/15 to-amber-950/25 backdrop-blur-[2px]" />

      <div className="relative z-10 mx-auto max-w-lg">
        {/* Banner Tag */}
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-100/90 px-5 py-1.5 text-xs font-black uppercase tracking-widest text-amber-900 border border-amber-300 shadow-md">
          <Sparkles className="h-4 w-4 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
          <span>OFFICIAL CONFERMENT</span>
        </div>

        {/* Dramatic Greeting */}
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
          🎉 CONGRATULATIONS! 🎉
        </h1>

        {/* Golden Trophy Card with Floating Ribbon & Stars */}
        <div className="relative my-7 rounded-3xl bg-gradient-to-b from-amber-50/95 via-white/95 to-rose-50/95 p-7 sm:p-10 shadow-2xl border-4 border-amber-300 text-center transform transition-transform hover:scale-[1.01]">
          {/* Ornamental corner star accents */}
          <div className="absolute top-3 left-4 text-amber-400 text-lg">★</div>
          <div className="absolute top-3 right-4 text-amber-400 text-lg">★</div>
          <div className="absolute bottom-3 left-4 text-amber-400 text-lg">★</div>
          <div className="absolute bottom-3 right-4 text-amber-400 text-lg">★</div>

          {/* Golden Animated Trophy SVG / Icon */}
          <div className="relative mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 shadow-lg shadow-amber-400/40 text-amber-950 animate-gentle-float">
            <Trophy className="h-16 w-16 stroke-[1.5] text-amber-950" />
            <div className="absolute -top-2 -right-2 text-2xl animate-bounce">✨</div>
          </div>

          {/* Award Header */}
          <span className="font-cinzel text-xs sm:text-sm font-bold tracking-widest text-amber-800 uppercase block">
            THE SUPREME TITLE
          </span>

          <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-rose-950 tracking-wide mt-1">
            BEST SISTER AWARD
          </h2>

          {/* Awarded to */}
          <div className="my-5 rounded-2xl bg-gradient-to-r from-rose-100/70 via-amber-100/70 to-pink-100/70 py-3 px-4 border border-rose-200">
            <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block">
              Officially awarded to:
            </span>
            <span className="font-display text-xl sm:text-2xl font-black text-rose-950 block mt-0.5">
              {sisterName ? sisterName.toUpperCase() : 'THE BEST SISTER'} 💖
            </span>
          </div>

          {/* Touching & Funny Praise */}
          <p className="font-display text-sm sm:text-base text-slate-700 italic leading-relaxed text-balance">
            “For being caring, supportive, annoying sometimes 😂, but always special. ❤️”
          </p>

          {/* Presented by */}
          <div className="mt-5 pt-4 border-t border-amber-200/60 flex items-center justify-center gap-1.5 text-xs font-semibold text-rose-900/80">
            <span>Presented with love by your brother.</span>
            <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500 inline-block" />
          </div>
        </div>

        {/* CTA Button to View Official Certificate */}
        <button
          onClick={onViewCertificate}
          className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-amber-500 via-rose-600 to-pink-600 px-8 py-4 text-base font-black text-white shadow-xl shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Award className="h-5 w-5" />
          <span>Claim Official Certificate 📜</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
