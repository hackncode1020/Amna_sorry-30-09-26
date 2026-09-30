import React, { useState } from 'react';
import { Award, Trophy, Heart, Sparkles, Check, X } from 'lucide-react';
import { CONFIG } from '../config';

interface AwardItem {
  id: string;
  emoji: string;
  title: string;
  reason: string;
  badge: string;
  bgGrad: string;
  borderColor: string;
}

export const BestSisterAwards: React.FC = () => {
  const [selectedAward, setSelectedAward] = useState<AwardItem | null>(null);
  const [claimedAwards, setClaimedAwards] = useState<Record<string, boolean>>({});

  const awards: AwardItem[] = [
    {
      id: 'award-1',
      emoji: '🏆',
      title: 'BEST SISTER AWARD',
      reason: 'For being someone I’m lucky to call my sister.',
      badge: 'Uncontested First Place',
      bgGrad: 'from-amber-50/90 to-yellow-50/70',
      borderColor: 'border-amber-300',
    },
    {
      id: 'award-2',
      emoji: '💗',
      title: 'MOST PRECIOUS SISTER AWARD',
      reason: 'For being one of the most important people in my life.',
      badge: 'Irreplaceable Value',
      bgGrad: 'from-pink-50/90 to-rose-50/70',
      borderColor: 'border-pink-300',
    },
    {
      id: 'award-3',
      emoji: '😂',
      title: 'MOST ANNOYING-BUT-LOVABLE SISTER AWARD',
      reason: 'Because somehow you can annoy me and still be impossible not to love as my sister.',
      badge: '100% True Fact',
      bgGrad: 'from-orange-50/90 to-amber-50/70',
      borderColor: 'border-orange-300',
    },
    {
      id: 'award-4',
      emoji: '🌸',
      title: 'SWEETEST SISTER AWARD',
      reason: 'For all the little things that make you special.',
      badge: 'Gentle Heart',
      bgGrad: 'from-rose-50/90 to-fuchsia-50/70',
      borderColor: 'border-rose-300',
    },
    {
      id: 'award-5',
      emoji: '🫶',
      title: 'FOREVER FAMILY AWARD',
      reason: 'Because no matter how many silly fights happen, you will always be my sister.',
      badge: 'Lifetime Guarantee',
      bgGrad: 'from-purple-50/90 to-pink-50/70',
      borderColor: 'border-purple-300',
    },
    {
      id: 'award-6',
      emoji: '✨',
      title: 'SPECIAL AMNA AWARD',
      reason: 'Because there is only one Amna.',
      badge: 'One-Of-A-Kind Edition',
      bgGrad: 'from-teal-50/90 to-emerald-50/70',
      borderColor: 'border-teal-300',
    },
  ];

  const handleClaim = (award: AwardItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setClaimedAwards((prev) => ({ ...prev, [award.id]: true }));
    setSelectedAward(award);
  };

  return (
    <section id="awards" className="relative py-16 sm:py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-800 mb-2">
            <span>Special Honors</span>
            <span aria-hidden="true" className="text-rose-400">·</span>
            <span>Award Ceremony</span>
          </div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl text-balance">
            {CONFIG.sisterName}’s Official Sister Awards 🏆
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
            Certified by her brother {CONFIG.brotherName}. No appeals allowed!
          </p>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {awards.map((award) => {
            const isClaimed = !!claimedAwards[award.id];

            return (
              <div
                key={award.id}
                onClick={() => setSelectedAward(award)}
                className={`group relative rounded-2xl p-6 bg-gradient-to-b ${award.bgGrad} border ${award.borderColor} shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl sm:text-4xl filter drop-shadow-xs group-hover:scale-110 transition-transform">
                      {award.emoji}
                    </span>
                    <span className="text-[11px] font-semibold text-rose-900/70 tracking-wide uppercase">
                      {award.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-base font-bold text-slate-900 tracking-tight">
                    {award.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    “{award.reason}”
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-rose-200/50 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Conferred to {CONFIG.sisterName}
                  </span>
                  <button
                    onClick={(e) => handleClaim(award, e)}
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                      isClaimed
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white/90 text-rose-900 hover:bg-rose-600 hover:text-white border border-rose-200 shadow-xs'
                    }`}
                  >
                    {isClaimed ? (
                      <>
                        <Check className="h-3 w-3" />
                        <span>Accepted</span>
                      </>
                    ) : (
                      <>
                        <Trophy className="h-3 w-3" />
                        <span>View Certificate</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certificate Modal */}
        {selectedAward && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedAward(null)}
          >
            <div
              className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border-4 border-amber-200 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedAward(null)}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center"
                aria-label="Close certificate"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="text-4xl mb-2">{selectedAward.emoji}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-1">
                Official Certificate of Honor
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-900">
                {selectedAward.title}
              </h3>

              <div className="my-4 py-4 border-y border-amber-100 bg-amber-50/50 rounded-xl px-4">
                <p className="text-sm sm:text-base text-slate-700 italic">
                  “{selectedAward.reason}”
                </p>
                <div className="mt-3 text-xs font-medium text-amber-900">
                  Presented to the one and only <strong>{CONFIG.sisterName}</strong>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 px-2">
                <div className="text-left">
                  <span className="block text-[10px] text-slate-400">Date</span>
                  <span className="font-medium">Every Single Day</span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] text-slate-400">Signed with Love</span>
                  <span className="font-handwriting text-lg text-rose-900 block font-bold">
                    — {CONFIG.brotherName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
