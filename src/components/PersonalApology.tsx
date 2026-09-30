import React from 'react';
import { Heart, ShieldCheck, Sparkles } from 'lucide-react';
import { CONFIG } from '../config';

export const PersonalApology: React.FC = () => {
  return (
    <section id="sorry" className="relative py-16 sm:py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-800 mb-2">
            <span>From Brother To Sister</span>
            <span aria-hidden="true" className="text-rose-400">·</span>
            <span>A Sincere Promise</span>
          </div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl text-balance">
            I Owe You A Real Apology
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-lg mx-auto">
            No defenses. No justifications. Just the honest truth between us.
          </p>
        </div>

        {/* Heartfelt Letter Container */}
        <div className="glass-card-elevated rounded-3xl p-6 sm:p-10 relative overflow-hidden border border-rose-200/60 shadow-xl shadow-rose-100/50">
          {/* Subtle floral watermark background */}
          <div className="pointer-events-none absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-rose-100/40 blur-2xl" />

          {/* Letter Content */}
          <div className="space-y-5 text-base sm:text-lg leading-relaxed text-slate-700">
            <p className="font-medium text-rose-950">
              {CONFIG.sisterName}, I know I was wrong.
            </p>

            <p>
              I know that the way I treated you was disrespectful and hurtful.
              I am not here to make excuses or justify what I did. I accept my mistake completely.
            </p>

            <p>
              You did not deserve to be spoken to or treated that way.
              You are my sister, and I should have treated you with more respect, patience, and understanding.
            </p>

            <p className="font-medium text-slate-800">
              I genuinely regret hurting you.
            </p>

            <p>
              I cannot change what already happened, but I can learn from it and make sure my actions are better from here forward.
            </p>

            <p className="font-display text-xl text-rose-900 font-semibold pt-2">
              I am truly sorry, {CONFIG.sisterName}.
            </p>
          </div>

          {/* Golden Highlight Card */}
          <div className="mt-8 rounded-2xl bg-gradient-to-r from-rose-50 via-pink-50/80 to-amber-50/80 p-5 sm:p-6 border border-rose-200/70">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-rose-500 mt-1 shrink-0" />
              <div>
                <blockquote className="font-display text-lg sm:text-xl font-medium text-rose-950 italic">
                  “I’m not asking you to forget what happened. I’m only asking for the chance to make things right.”
                </blockquote>
                <p className="mt-2 text-xs font-medium text-rose-800/80">
                  Take all the time you need. True apologies don’t demand instant forgiveness, and I respect your space.
                </p>
              </div>
            </div>
          </div>

          {/* Brother's signature */}
          <div className="mt-8 pt-6 border-t border-rose-100/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Written directly by your brother with unconditional respect</span>
            </div>

            <div className="text-right">
              <span className="font-handwriting text-2xl text-rose-900 block font-bold">
                — {CONFIG.brotherName}
              </span>
              <span className="text-xs text-slate-400">Your brother always</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
