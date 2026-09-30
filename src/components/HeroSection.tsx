import React from 'react';
import { Heart, ChevronDown } from 'lucide-react';
import { FlowerBouquet } from './FlowerBouquet';
import { CONFIG } from '../config';

interface HeroSectionProps {
  onReadHeartClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onReadHeartClick }) => {
  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] flex-col items-center justify-center px-4 pt-24 pb-16 sm:px-6 md:pt-28 md:pb-20 text-center overflow-hidden"
    >
      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-rose-200/40 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-20 h-72 w-72 rounded-full bg-pink-100/50 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-20 h-72 w-72 rounded-full bg-amber-100/40 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-2xl flex flex-col items-center">
        {/* Small label (clean unboxed text with subtle typographic dot) */}
        <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-rose-800 uppercase">
          <span>A little message from your brother</span>
          <span aria-hidden="true" className="text-rose-400">·</span>
          <span>Dil Se</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:text-6xl text-balance">
          {CONFIG.sisterName}, I’m Truly Sorry.{' '}
          <span className="inline-block text-rose-500 animate-soft-pulse">❤️</span>
        </h1>

        {/* Subheading */}
        <p className="mt-3 text-base font-medium text-rose-900/80 sm:text-lg">
          From {CONFIG.brotherName} — your brother.
        </p>

        {/* Animated Flower Bouquet Element */}
        <div className="my-6 sm:my-8 animate-gentle-float">
          <FlowerBouquet />
        </div>

        {/* Main Paragraph */}
        <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg text-balance">
          I know I hurt you, and I know that a simple ‘sorry’ cannot erase what happened.
          But I want you to know that I genuinely regret my actions and the way I made you feel.
        </p>

        {/* Primary CTA Button */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <button
            onClick={onReadHeartClick}
            className="group relative inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rose-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-rose-500/35 focus:outline-none focus:ring-4 focus:ring-rose-200 active:scale-95"
          >
            <span>Read My Heart</span>
            <span className="text-base transition-transform duration-300 group-hover:translate-x-0.5">💌</span>
          </button>

          {/* Small sincere tagline */}
          <span className="text-xs font-medium text-slate-400">
            Made with sincerity, not just words.
          </span>
        </div>

        {/* Scroll indicator cue */}
        <button
          onClick={onReadHeartClick}
          className="mt-12 inline-flex items-center gap-1.5 text-xs font-medium text-rose-700/60 hover:text-rose-900 transition-colors"
          aria-label="Scroll to letter"
        >
          <span>Scroll to read</span>
          <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
