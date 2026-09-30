import React from 'react';

export const FlowerBouquet: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Soft radiant ambient glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-200/50 via-pink-100/40 to-amber-100/40 blur-2xl transform scale-110" />

      {/* SVG Bouquet */}
      <svg
        viewBox="0 0 280 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full max-w-[240px] sm:max-w-[280px] drop-shadow-sm transition-transform duration-500 hover:scale-105"
        role="img"
        aria-label="A bouquet of pastel flowers for Amna"
      >
        <defs>
          <linearGradient id="roseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDA4AF" />
            <stop offset="100%" stopColor="#F43F5E" />
          </linearGradient>
          <linearGradient id="peachGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="100%" stopColor="#FB923C" />
          </linearGradient>
          <linearGradient id="pinkSoftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCE7F3" />
            <stop offset="100%" stopColor="#F472B6" />
          </linearGradient>
          <linearGradient id="stemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#EAB308" />
          </linearGradient>
        </defs>

        {/* Stems */}
        <g stroke="url(#stemGrad)" strokeWidth="4" strokeLinecap="round" opacity="0.85">
          <path d="M140 180 Q130 220 120 250" />
          <path d="M140 180 Q145 220 150 252" />
          <path d="M140 180 Q140 215 135 255" />
          <path d="M110 130 Q125 160 140 180" />
          <path d="M170 130 Q155 160 140 180" />
          <path d="M85 115 Q115 150 140 180" />
          <path d="M195 115 Q165 150 140 180" />
        </g>

        {/* Leaves */}
        <g fill="#86EFAC" opacity="0.9">
          <path d="M125 195 C110 190 95 200 100 215 C115 210 125 200 125 195 Z" fill="#4ADE80" />
          <path d="M155 195 C170 190 185 200 180 215 C165 210 155 200 155 195 Z" fill="#22C55E" />
          <path d="M100 160 C80 155 75 170 90 175 C102 170 105 162 100 160 Z" fill="#4ADE80" />
          <path d="M180 160 C200 155 205 170 190 175 C178 170 175 162 180 160 Z" fill="#4ADE80" />
        </g>

        {/* Left Peach Flower */}
        <g transform="translate(85, 110)">
          <circle cx="-12" cy="0" r="10" fill="url(#peachGrad)" opacity="0.9" />
          <circle cx="12" cy="0" r="10" fill="url(#peachGrad)" opacity="0.9" />
          <circle cx="0" cy="-12" r="10" fill="url(#peachGrad)" opacity="0.9" />
          <circle cx="0" cy="12" r="10" fill="url(#peachGrad)" opacity="0.9" />
          <circle cx="0" cy="0" r="8" fill="#FEF08A" />
          <circle cx="0" cy="0" r="4" fill="#F59E0B" />
        </g>

        {/* Right Lavender/Soft Pink Flower */}
        <g transform="translate(195, 110)">
          <circle cx="-11" cy="0" r="10" fill="#E9D5FF" />
          <circle cx="11" cy="0" r="10" fill="#DDD6FE" />
          <circle cx="0" cy="-11" r="10" fill="#E9D5FF" />
          <circle cx="0" cy="11" r="10" fill="#DDD6FE" />
          <circle cx="-8" cy="-8" r="9" fill="#C084FC" opacity="0.8" />
          <circle cx="8" cy="8" r="9" fill="#C084FC" opacity="0.8" />
          <circle cx="0" cy="0" r="7" fill="#FEF08A" />
        </g>

        {/* Center Main Blush Rose */}
        <g transform="translate(140, 115)">
          {/* Outer Petals */}
          <path
            d="M-22 0 C-30 -20 0 -35 0 -35 C0 -35 30 -20 22 0 C30 20 0 35 0 35 C0 35 -30 20 -22 0 Z"
            fill="url(#roseGrad)"
            opacity="0.85"
          />
          <circle cx="0" cy="0" r="18" fill="url(#roseGrad)" />
          {/* Inner Swirl */}
          <path
            d="M-10 -5 C-12 -12 8 -14 10 -6 C12 2 -4 10 -8 4"
            stroke="#FFE4E6"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="0" cy="0" r="5" fill="#FFE4E6" />
        </g>

        {/* Top Delphinium / Forget-Me-Not Blossoms */}
        <g transform="translate(140, 58)">
          <circle cx="-10" cy="0" r="7" fill="url(#pinkSoftGrad)" />
          <circle cx="10" cy="0" r="7" fill="url(#pinkSoftGrad)" />
          <circle cx="0" cy="-10" r="7" fill="url(#pinkSoftGrad)" />
          <circle cx="0" cy="10" r="7" fill="url(#pinkSoftGrad)" />
          <circle cx="0" cy="0" r="4" fill="#FDE047" />
        </g>

        {/* Small Accent Buds */}
        <circle cx="105" cy="70" r="5" fill="#FDA4AF" />
        <circle cx="175" cy="70" r="5" fill="#FDA4AF" />
        <circle cx="120" cy="40" r="4" fill="#FED7AA" />
        <circle cx="160" cy="40" r="4" fill="#E9D5FF" />

        {/* Ribbon Bow on Stems */}
        <g transform="translate(140, 195)">
          <ellipse cx="-12" cy="-4" rx="12" ry="7" fill="url(#ribbonGrad)" transform="rotate(-20 -12 -4)" />
          <ellipse cx="12" cy="-4" rx="12" ry="7" fill="url(#ribbonGrad)" transform="rotate(20 12 -4)" />
          <circle cx="0" cy="-2" r="5" fill="#CA8A04" />
          <path d="M-3 2 Q-10 16 -16 26" stroke="#EAB308" strokeWidth="3" strokeLinecap="round" />
          <path d="M3 2 Q10 16 16 26" stroke="#EAB308" strokeWidth="3" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};
