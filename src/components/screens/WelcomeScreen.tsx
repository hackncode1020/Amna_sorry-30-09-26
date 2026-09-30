import React, { useState } from 'react';
import { confetti } from '../../utils/confetti';
import { Sparkles } from 'lucide-react';
import { playBackgroundSong } from '../YouTubeBackgroundPlayer';

interface WelcomeScreenProps {
  onOpen: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    // 🎵 Automatically start the song "Apa Fer Milaange" (YouTube: uF3Reht8IPk) on letter click
    playBackgroundSong();

    confetti.fire('hearts', 80);
    confetti.fire('festive', 60);

    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.([40, 60, 40]);
    }

    setTimeout(() => {
      onOpen();
    }, 750);
  };

  return (
    <div className="flex min-h-[82vh] flex-col items-center justify-center px-3 sm:px-4 py-6 text-center animate-fade-in select-none">
      <div className="glass-card-elevated relative mx-auto w-full max-w-lg rounded-3xl p-5 sm:p-9 border-2 border-rose-200/90 shadow-2xl shadow-rose-200/40 text-center overflow-hidden">
        {/* Cute Top Tag */}
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-rose-100/90 px-4 py-1 text-xs font-semibold text-rose-900 border border-rose-200/70 shadow-xs">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span>Special Delivery For Amna</span>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Amnaaa… 🥺💗
        </h1>

        {/* Subtitle */}
        <p className="mt-1.5 text-sm sm:text-base font-semibold text-rose-800/85">
          Your annoying brother has something to say…
        </p>

        {/* 💌 CLEAN, PERFECTLY SYMMETRICAL LUXURY ENVELOPE */}
        <div
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpen();
            }
          }}
          className="group relative mx-auto my-6 flex h-52 w-64 sm:h-56 sm:w-72 cursor-pointer items-center justify-center focus:outline-none"
          aria-label="Open apology letter"
        >
          {/* Ambient Glow Aura */}
          <div className="absolute inset-2 rounded-3xl bg-gradient-to-tr from-rose-300/40 via-pink-200/40 to-amber-200/30 blur-2xl transform scale-105 group-hover:scale-115 transition-transform duration-500" />

          {/* SVG Clean Luxury Envelope Container */}
          <div className={`relative z-10 w-full h-full transition-transform duration-500 group-hover:scale-105 active:scale-95 ${isOpen ? 'scale-110' : ''}`}>
            <svg
              viewBox="0 0 260 175"
              className="w-full h-full drop-shadow-xl"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Envelope Base Gradient */}
                <linearGradient id="envBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF1F2" />
                  <stop offset="50%" stopColor="#FFE4E6" />
                  <stop offset="100%" stopColor="#FECDD3" />
                </linearGradient>

                {/* Envelope Side Folds Gradient */}
                <linearGradient id="sideFoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFE4E6" />
                  <stop offset="100%" stopColor="#FECDD3" />
                </linearGradient>

                {/* Envelope Bottom Pocket Gradient */}
                <linearGradient id="bottomFoldGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#FECDD3" />
                  <stop offset="100%" stopColor="#FFF1F2" />
                </linearGradient>

                {/* Envelope Flap Gradient */}
                <linearGradient id="envFlapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FDA4AF" />
                  <stop offset="100%" stopColor="#F43F5E" />
                </linearGradient>

                {/* Wax Seal Radial Gradient */}
                <radialGradient id="waxGrad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#FB7185" />
                  <stop offset="45%" stopColor="#E11D48" />
                  <stop offset="100%" stopColor="#881337" />
                </radialGradient>

                {/* Gold Trim Gradient */}
                <linearGradient id="goldTrim" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FDE68A" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#FDE68A" />
                </linearGradient>

                {/* Clean Letter Shadow */}
                <filter id="letterShadow" x="-10%" y="-10%" width="120%" height="130%">
                  <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#881337" floodOpacity="0.15" />
                </filter>
              </defs>

              {/* 1. Envelope Back Pocket (Base) */}
              <rect
                x="20"
                y="30"
                width="220"
                height="130"
                rx="14"
                fill="url(#envBodyGrad)"
                stroke="#FDA4AF"
                strokeWidth="2"
              />

              {/* 2. Inner Letter Paper (Slides out smoothly when opened) */}
              <g
                className="transition-all duration-700 ease-out"
                transform={isOpen ? 'translate(0, -44)' : 'translate(0, -8)'}
              >
                <rect
                  x="35"
                  y="22"
                  width="190"
                  height="115"
                  rx="10"
                  fill="#FFFFFF"
                  stroke="#FBCFE8"
                  strokeWidth="1.8"
                  filter="url(#letterShadow)"
                />

                {/* Letter Header: Dear Amna 💗 */}
                <text x="50" y="44" fontFamily="serif" fontSize="13" fontWeight="bold" fill="#881337">
                  Dear Amna 💗
                </text>

                {/* Clean parallel ruled lines */}
                <line x1="50" y1="56" x2="210" y2="56" stroke="#FDA4AF" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="4 3" />
                <line x1="50" y1="70" x2="210" y2="70" stroke="#FDA4AF" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="4 3" />
                <line x1="50" y1="84" x2="185" y2="84" stroke="#FDA4AF" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="4 3" />
                <line x1="50" y1="98" x2="160" y2="98" stroke="#FDA4AF" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="4 3" />

                {/* Cute heart watermark on letter */}
                <path
                  d="M195 95 C190 90 186 86 186 82 C186 78 189 76 192 76 C194 76 195 78 195 78 C195 78 196 76 198 76 C201 76 204 78 204 82 C204 86 200 90 195 95 Z"
                  fill="#FECDD3"
                />
              </g>

              {/* 3. Envelope Side Folds (Clean, symmetrical, meeting at exact center 130, 96) */}
              <path
                d="M 20 30 L 130 96 L 20 160 Z"
                fill="url(#sideFoldGrad)"
                stroke="#FDA4AF"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M 240 30 L 130 96 L 240 160 Z"
                fill="url(#sideFoldGrad)"
                stroke="#FDA4AF"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />

              {/* 4. Envelope Bottom Pocket Triangle (Meets cleanly at 130, 96 with zero crooked lines) */}
              <path
                d="M 20 160 L 130 96 L 240 160 Z"
                fill="url(#bottomFoldGrad)"
                stroke="#FDA4AF"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              {/* 5. Integrated Postage Stamp on Envelope (Clean, properly positioned inside top-right) */}
              <g transform="translate(192, 36)">
                <rect x="0" y="0" width="36" height="42" rx="4" fill="#FFF1F2" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="3 2" />
                <text x="18" y="16" fontSize="11" textAnchor="middle" fill="#E11D48">🌸</text>
                <text x="18" y="27" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#BE123C">AMNA</text>
                <text x="18" y="36" fontSize="6" textAnchor="middle" fill="#E11D48">100%</text>
              </g>

              {/* Cancellation stamp mark */}
              <circle cx="188" cy="56" r="14" fill="none" stroke="#FDA4AF" strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />
              <line x1="176" y1="56" x2="200" y2="56" stroke="#FDA4AF" strokeWidth="1" opacity="0.6" />

              {/* 6. Top Flap (Flips open smoothly in 3D, perfectly symmetrical) */}
              <g
                className="transition-transform duration-700 origin-top"
                style={{
                  transformOrigin: '130px 30px',
                  transform: isOpen ? 'rotateX(170deg) translateY(-2px)' : 'rotateX(0deg)',
                }}
              >
                {/* Flap shape with rounded center tip */}
                <path
                  d="M 20 30 L 122 96 Q 130 102 138 96 L 240 30 Z"
                  fill="url(#envFlapGrad)"
                  stroke="url(#goldTrim)"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />

                {/* Symmetrical golden stitch line inside flap */}
                <path
                  d="M 32 35 L 123 91 Q 130 96 137 91 L 228 35"
                  stroke="#FDE68A"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  fill="none"
                  strokeLinecap="round"
                />
              </g>

              {/* 7. Embossed 3D Wax Seal with Golden Heart (Positioned directly over flap closure) */}
              <g
                transform="translate(130, 98)"
                className={`transition-all duration-500 ${isOpen ? 'opacity-0 scale-75' : 'opacity-100 scale-100 group-hover:scale-110'}`}
              >
                {/* Scalloped outer rim */}
                <circle cx="0" cy="0" r="21" fill="#881337" />
                <circle cx="0" cy="0" r="19" fill="url(#waxGrad)" stroke="#FDE68A" strokeWidth="1.6" />

                {/* Inner dotted ring */}
                <circle cx="0" cy="0" r="15" fill="none" stroke="#FDE68A" strokeWidth="1" strokeDasharray="3 2" />

                {/* Golden Heart Emblem */}
                <path
                  d="M 0 6 C -7 -1 -10 -6 -10 -10 C -10 -14 -6 -16 -2 -16 C 0 -16 0 -14 0 -13 C 0 -14 2 -16 4 -16 C 8 -16 12 -14 12 -10 C 12 -6 9 -1 0 6 Z"
                  fill="#FEF08A"
                  stroke="#D97706"
                  strokeWidth="0.8"
                />

                {/* Sparkle ping */}
                <circle cx="12" cy="-9" r="2" fill="#FEF08A" className="animate-ping" />
              </g>
            </svg>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col items-center gap-2.5">
          <button
            onClick={handleOpen}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 px-8 py-3.5 text-base font-black text-white shadow-xl shadow-rose-500/35 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-rose-500/45 focus:outline-none focus:ring-4 focus:ring-rose-200 active:scale-95 cursor-pointer"
          >
            <span>💌 Open My Sorry</span>
          </button>

          <span className="text-xs text-rose-900/60 font-medium">
            Tap the envelope or button to read
          </span>
        </div>
      </div>
    </div>
  );
};
