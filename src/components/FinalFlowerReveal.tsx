import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { CONFIG } from '../config';

export const FinalFlowerReveal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-20 sm:py-28 px-4 sm:px-6 text-center overflow-hidden bg-gradient-to-b from-transparent via-rose-50/60 to-pink-100/50"
    >
      {/* Radiant glow behind blooming flower */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-gradient-to-tr from-rose-200/50 to-amber-200/40 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-xl flex flex-col items-center">
        {/* Blooming Rose SVG animation */}
        <div
          className={`transition-all duration-1000 transform ${
            isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-8'
          }`}
        >
          <div className="relative flex items-center justify-center">
            {/* Pulsing ring */}
            <div className="absolute h-32 w-32 rounded-full border border-rose-300/40 animate-ping opacity-30" />

            <svg
              viewBox="0 0 160 160"
              className="h-32 w-32 drop-shadow-md"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="A glowing blooming rose for Amna"
            >
              <defs>
                <linearGradient id="finalRose" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FB7185" />
                  <stop offset="50%" stopColor="#F43F5E" />
                  <stop offset="100%" stopColor="#BE123C" />
                </linearGradient>
                <linearGradient id="finalStem" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4ADE80" />
                  <stop offset="100%" stopColor="#15803D" />
                </linearGradient>
              </defs>

              {/* Stem */}
              <path d="M80 95 Q80 130 75 150" stroke="url(#finalStem)" strokeWidth="4" strokeLinecap="round" />
              <path d="M80 120 C95 110 100 125 80 130 Z" fill="#22C55E" />
              <path d="M78 135 C60 130 65 145 76 142 Z" fill="#16A34A" />

              {/* Petals blooming */}
              <g transform="translate(80, 75)">
                {/* Layer 1: Outer Petals */}
                <ellipse cx="-20" cy="-6" rx="20" ry="15" fill="url(#finalRose)" opacity="0.9" transform="rotate(-15)" />
                <ellipse cx="20" cy="-6" rx="20" ry="15" fill="url(#finalRose)" opacity="0.9" transform="rotate(15)" />
                <ellipse cx="0" cy="-22" rx="22" ry="16" fill="url(#finalRose)" opacity="0.95" />
                <ellipse cx="-12" cy="12" rx="18" ry="14" fill="url(#finalRose)" opacity="0.9" />
                <ellipse cx="12" cy="12" rx="18" ry="14" fill="url(#finalRose)" opacity="0.9" />

                {/* Layer 2: Core buds */}
                <circle cx="0" cy="0" r="16" fill="url(#finalRose)" />
                <path
                  d="M-8 -4 C-10 -10 6 -12 8 -5 C10 2 -3 8 -6 3"
                  stroke="#FFE4E6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="0" cy="0" r="4" fill="#FFE4E6" />
              </g>
            </svg>
          </div>
        </div>

        {/* Text Sequence */}
        <div
          className={`mt-6 transition-all duration-1000 delay-300 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5 font-display text-2xl sm:text-3xl font-bold text-rose-950">
            <span>For {CONFIG.sisterName}</span>
            <Heart className="h-6 w-6 fill-rose-500 text-rose-500 inline-block animate-soft-pulse" />
          </div>
        </div>

        <div
          className={`mt-4 transition-all duration-1000 delay-500 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="font-display text-lg sm:text-xl text-slate-700 italic max-w-md mx-auto leading-relaxed">
            “Some apologies are too important to say in just one message.”
          </p>
        </div>

        <div
          className={`mt-4 transition-all duration-1000 delay-700 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-xl sm:text-2xl font-bold text-rose-900 tracking-tight">
            I’m truly sorry.
          </p>
        </div>

        <div
          className={`mt-4 transition-all duration-1000 delay-900 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="font-handwriting text-3xl sm:text-4xl text-rose-950 font-bold block">
            — {CONFIG.brotherName.split(' ')[0]}
          </span>
          <span className="text-xs text-rose-900/60 block mt-1">
            Always your brother, through everything.
          </span>
        </div>
      </div>
    </section>
  );
};
