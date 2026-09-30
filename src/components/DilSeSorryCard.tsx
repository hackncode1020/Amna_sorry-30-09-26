import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export const DilSeSorryCard: React.FC = () => {
  return (
    <div className="relative mx-auto my-6 w-full max-w-lg overflow-hidden rounded-3xl bg-white/95 p-6 sm:p-9 shadow-xl border-2 border-rose-200/90 text-center animate-fade-in">
      {/* Corner cute flourishes */}
      <div className="pointer-events-none absolute top-4 left-4 text-rose-300 text-sm select-none">
        ❦
      </div>
      <div className="pointer-events-none absolute top-4 right-4 text-rose-300 text-sm select-none">
        ❦
      </div>

      {/* Pill: "دلی احساس • From The Soul" (From Screenshot 1) */}
      <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-4 py-1.5 text-xs font-bold text-rose-900 border border-rose-200 shadow-xs">
        <span className="font-serif text-sm">دلی احساس</span>
        <span className="text-rose-400">•</span>
        <span>From The Soul</span>
      </div>

      {/* Heading: "Dil Se Sorry 💗" (From Screenshot 1) */}
      <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
        <span>Dil Se Sorry</span>
        <span className="text-rose-500">💗</span>
      </h2>

      {/* Floral Emblem: 🌺 in round soft badge (From Screenshot 1) */}
      <div className="mx-auto my-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-pink-100 to-rose-100 border border-rose-200 text-3xl shadow-sm">
        🌺
      </div>

      {/* Beautiful Urdu Script Body (From Screenshots 1 & 2) */}
      <div
        dir="rtl"
        className="my-5 rounded-2xl bg-[#FFFDFB] p-5 sm:p-7 border border-rose-100/80 text-rose-950 font-serif text-xl sm:text-2xl leading-[2.4] tracking-wide shadow-xs text-center space-y-3"
        style={{ fontFamily: "'Noto Nastaliq Urdu', 'Scheherazade New', 'Amiri', serif" }}
      >
        <p className="font-bold">
          Amna، مجھے دل سے افسوس ہے کہ میری وجہ سے تمہیں دکھ پہنچا۔
        </p>

        <p>
          میں اپنی غلطی کو سمجھتا ہوں اور دل سے معافی مانگتا ہوں۔
        </p>

        <p className="text-rose-900 font-semibold pt-1">
          تم میرے لیے بہت قیمتی ہو، اور میں ہمارے رشتے کی دل سے عزت کرتا ہوں۔
        </p>
      </div>

      {/* Golden Star Divider ✨ (From Screenshot 2) */}
      <div className="my-5 flex items-center justify-center gap-3">
        <div className="h-[1px] w-16 bg-rose-200" />
        <span className="text-amber-500 text-base">✨</span>
        <div className="h-[1px] w-16 bg-rose-200" />
      </div>

      {/* English Quote (From Screenshot 2) */}
      <blockquote className="italic text-sm sm:text-base text-rose-950/90 font-display leading-relaxed max-w-md mx-auto">
        “I’m truly sorry from my heart.
        <br />
        I understand my mistake, and I deeply respect our bond as brother and sister.”
      </blockquote>

      {/* Signature: "— Abdaal Manzoor" (From Screenshot 2) */}
      <div className="mt-5 pt-3 text-center">
        <span className="font-handwriting text-2xl sm:text-3xl font-bold text-rose-900 block">
          — Abdaal Manzoor
        </span>
      </div>
    </div>
  );
};
