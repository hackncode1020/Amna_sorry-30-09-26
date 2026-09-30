import React, { useState } from 'react';
import { Mail, Heart, Sparkles, Check, RotateCcw } from 'lucide-react';
import { CONFIG } from '../config';

export const InteractiveEnvelope: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="final-message" className="relative py-16 sm:py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-800 mb-2">
            <span>Special Letter</span>
            <span aria-hidden="true" className="text-rose-400">·</span>
            <span>Sealed With Care</span>
          </div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl text-balance">
            One Last Message For You…
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
            {isOpen ? 'A letter straight from the heart.' : 'Tap the wax seal or button below to open.'}
          </p>
        </div>

        {/* Envelope Container */}
        <div className="relative mx-auto flex flex-col items-center">
          {!isOpen ? (
            /* CLOSED ENVELOPE */
            <div
              onClick={() => setIsOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsOpen(true);
                }
              }}
              className="group relative w-full max-w-lg cursor-pointer rounded-3xl bg-gradient-to-b from-[#FFF5F5] to-[#FDE8E8] p-8 sm:p-12 shadow-xl border-2 border-rose-200 text-center transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-rose-200"
            >
              {/* Envelope Flap Lines */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                <div className="absolute top-0 left-0 right-0 h-28 border-b-2 border-rose-300/60 bg-gradient-to-b from-rose-100/40 to-transparent transform -skew-y-3 origin-top-left" />
              </div>

              {/* Wax Seal */}
              <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 shadow-lg shadow-rose-500/40 border-4 border-rose-200 group-hover:scale-110 transition-transform">
                <Heart className="h-9 w-9 fill-white text-white drop-shadow-xs" />
              </div>

              {/* Envelope Addressed To */}
              <div className="relative z-10 mt-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-rose-800">
                  Private & Confidential For
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  Amna
                </h3>
                <span className="text-xs text-rose-900/60 block mt-1">
                  From: Abdaal Manzoor
                </span>
              </div>

              {/* Open Button Trigger */}
              <div className="relative z-10 mt-8">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-rose-700 transition-colors"
                >
                  <span>Open My Final Message</span>
                  <span className="text-base">💌</span>
                </button>
              </div>
            </div>
          ) : (
            /* OPENED LETTER CARD */
            <div className="relative w-full max-w-xl animate-fade-in">
              <div className="rounded-3xl bg-[#FFFCF9] p-7 sm:p-12 shadow-2xl border border-amber-200/80 relative">
                {/* Vintage Letter Border Accent */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-300 via-amber-200 to-rose-300 rounded-t-3xl" />

                {/* Letter Header */}
                <div className="flex items-center justify-between pb-6 border-b border-amber-100">
                  <div>
                    <span className="font-handwriting text-2xl text-rose-900 font-bold">
                      Dear Amna,
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-700 transition-colors"
                    title="Close letter"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Fold envelope</span>
                  </button>
                </div>

                {/* Letter Body */}
                <div className="space-y-4 py-6 text-base sm:text-lg leading-relaxed text-slate-700 font-normal">
                  <p>
                    I know I made a mistake.
                    <br />
                    I cannot change what happened, but I can change what I do next.
                  </p>

                  <p>
                    I am genuinely sorry for disrespecting you and hurting your feelings.
                  </p>

                  <p className="font-medium text-slate-800">
                    You deserve respect, kindness and a brother who understands your worth.
                  </p>

                  <p>
                    I hope that with time, I can earn your trust again.
                  </p>

                  <p className="text-rose-950 font-medium italic">
                    You don't have to forgive me instantly.
                    <br />
                    Take your time.
                  </p>

                  <p className="pt-2 font-semibold text-slate-900">
                    Just know that this apology is real.
                  </p>
                </div>

                {/* Handwritten Signoff */}
                <div className="mt-6 pt-6 border-t border-amber-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-rose-800">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <span>Always your brother</span>
                  </div>

                  <div className="text-right">
                    <span className="font-handwriting text-3xl sm:text-4xl text-rose-950 font-bold block">
                      — {CONFIG.brotherName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
