import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { CONFIG } from '../config';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-rose-100 bg-[#FFFDFB] py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-1.5 font-display text-base font-semibold text-slate-900">
            <span>For {CONFIG.sisterName}</span>
            <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500 inline-block" />
            <span className="text-xs font-normal text-slate-400 font-sans">
              · Created by {CONFIG.brotherName}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            A heartfelt apology from an older brother learning to do better every day.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-xs hover:bg-rose-50 hover:text-rose-900 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5 text-rose-500" />
          </button>
        </div>
      </div>
    </footer>
  );
};
