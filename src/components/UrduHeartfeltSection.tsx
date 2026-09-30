import React, { useState } from 'react';
import { Heart, Volume2, Check } from 'lucide-react';
import { CONFIG } from '../config';

export const UrduHeartfeltSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const urduText = `امنا، مجھے دل سے افسوس ہے کہ میری وجہ سے تمہیں دکھ پہنچا۔
میں اپنی غلطی کو سمجھتا ہوں اور دل سے معافی مانگتا ہوں۔
تم میرے لیے بہت قیمتی ہو، اور میں ہمارے رشتے کی دل سے عزت کرتا ہوں۔`;

  const copyText = () => {
    navigator.clipboard.writeText(urduText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <div className="relative rounded-3xl bg-gradient-to-b from-rose-50/90 via-white to-pink-50/80 p-6 sm:p-10 border border-rose-200/80 shadow-lg shadow-rose-200/30 text-center overflow-hidden">
          {/* Decorative Corner Flourishes */}
          <div className="absolute top-3 left-4 text-xs font-handwriting text-rose-300 select-none">
            ✿ ❀ ✿
          </div>
          <div className="absolute top-3 right-4 text-xs font-handwriting text-rose-300 select-none">
            ✿ ❀ ✿
          </div>

          {/* Heading */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-rose-950">
              Dil Se…
            </h3>
            <Heart className="h-5 w-5 fill-rose-500 text-rose-500 inline-block animate-soft-pulse" />
          </div>

          {/* Urdu Content */}
          <div className="py-2 px-2 sm:px-4">
            <p className="font-urdu text-xl sm:text-2xl md:text-3xl text-slate-800 leading-[2.4] font-normal" lang="ur">
              {CONFIG.sisterName}، مجھے دل سے افسوس ہے کہ میری وجہ سے تمہیں دکھ پہنچا۔
              <br />
              میں اپنی غلطی کو سمجھتا ہوں اور دل سے معافی مانگتا ہوں۔
              <br />
              تم میرے لیے بہت قیمتی ہو، اور میں ہمارے رشتے کی دل سے عزت کرتا ہوں۔
            </p>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center justify-center gap-3">
            <div className="h-[1px] w-16 bg-rose-200" />
            <span className="text-xs font-medium text-rose-400">English Translation</span>
            <div className="h-[1px] w-16 bg-rose-200" />
          </div>

          {/* English Translation */}
          <p className="text-sm sm:text-base text-slate-600 italic max-w-lg mx-auto leading-relaxed">
            “I’m truly sorry from my heart. I understand my mistake, and I deeply respect our bond as brother and sister.”
          </p>

          {/* Sincere brother note */}
          <div className="mt-6 pt-4 border-t border-rose-100 flex items-center justify-between text-xs text-rose-900/70">
            <span className="font-medium">— {CONFIG.brotherName}</span>
            <button
              onClick={copyText}
              className="text-xs text-rose-600 hover:text-rose-800 underline underline-offset-2 flex items-center gap-1 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-600" />
                  <span>Copied message</span>
                </>
              ) : (
                <span>Copy Urdu text</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
