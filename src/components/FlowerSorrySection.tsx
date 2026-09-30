import React, { useState } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { CONFIG } from '../config';

interface FlowerItem {
  id: string;
  emoji: string;
  name: string;
  meaning: string;
  message: string;
  color: string;
  bgGradient: string;
  borderColor: string;
}

export const FlowerSorrySection: React.FC = () => {
  const [bloomedFlowers, setBloomedFlowers] = useState<Record<string, boolean>>({
    'flower-1': true, // initial first one open
  });
  const [activeMessage, setActiveMessage] = useState<FlowerItem | null>(null);

  const flowers: FlowerItem[] = [
    {
      id: 'flower-1',
      emoji: '🌷',
      name: 'Respect',
      meaning: 'Honoring who you are',
      message: 'Because you deserve respect and dignity, always.',
      color: 'text-rose-600',
      bgGradient: 'from-rose-50 to-pink-50',
      borderColor: 'border-rose-200',
    },
    {
      id: 'flower-2',
      emoji: '🌸',
      name: 'Family',
      meaning: 'Unbreakable sibling bond',
      message: 'Because family matters more than any silly pride.',
      color: 'text-pink-600',
      bgGradient: 'from-pink-50 to-fuchsia-50',
      borderColor: 'border-pink-200',
    },
    {
      id: 'flower-3',
      emoji: '🌼',
      name: 'Memories',
      meaning: 'The smiles we have shared',
      message: 'Because our memories matter and deserve to be protected.',
      color: 'text-amber-600',
      bgGradient: 'from-amber-50 to-yellow-50',
      borderColor: 'border-amber-200',
    },
    {
      id: 'flower-4',
      emoji: '🌻',
      name: 'Trust',
      meaning: 'Earning your safe haven',
      message: 'Because I value you and want you to feel completely safe around me.',
      color: 'text-yellow-600',
      bgGradient: 'from-yellow-50 to-orange-50',
      borderColor: 'border-yellow-200',
    },
    {
      id: 'flower-5',
      emoji: '🌺',
      name: 'Kindness',
      meaning: 'Patience & gentleness',
      message: 'Because your kindness has always deserved better from your brother.',
      color: 'text-red-600',
      bgGradient: 'from-red-50 to-rose-50',
      borderColor: 'border-red-200',
    },
    {
      id: 'flower-6',
      emoji: '🌹',
      name: 'Forgiveness',
      meaning: 'Hope for our future',
      message: 'Because I want to earn back your smile and warmth in your own time.',
      color: 'text-rose-700',
      bgGradient: 'from-rose-50 to-pink-100',
      borderColor: 'border-rose-300',
    },
  ];

  const handleFlowerClick = (flower: FlowerItem) => {
    setBloomedFlowers((prev) => ({ ...prev, [flower.id]: true }));
    setActiveMessage(flower);
  };

  const handleBloomAll = () => {
    const all: Record<string, boolean> = {};
    flowers.forEach((f) => (all[f.id] = true));
    setBloomedFlowers(all);
    setActiveMessage(flowers[flowers.length - 1]);
  };

  const allBloomed = flowers.every((f) => bloomedFlowers[f.id]);

  return (
    <section id="flowers" className="relative py-16 sm:py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-800 mb-2">
            <span>A Garden Of Sincerity</span>
            <span aria-hidden="true" className="text-rose-400">·</span>
            <span>Tap Each Blossom</span>
          </div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl text-balance">
            If Every Sorry Could Become A Flower…
          </h2>
          <p className="mt-2 text-base text-rose-900/80 font-medium max-w-xl mx-auto text-balance">
            I would fill this entire page with flowers for you, {CONFIG.sisterName}.
          </p>

          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={handleBloomAll}
              disabled={allBloomed}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                allBloomed
                  ? 'bg-rose-100 text-rose-800 cursor-default'
                  : 'bg-white border border-rose-200 text-rose-700 hover:bg-rose-50 shadow-xs active:scale-95'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-rose-400" />
              <span>{allBloomed ? 'All Flowers In Full Bloom 🌸' : 'Bloom All Flowers At Once 🌸'}</span>
            </button>
          </div>
        </div>

        {/* Flower Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {flowers.map((flower) => {
            const isBloomed = !!bloomedFlowers[flower.id];
            const isSelected = activeMessage?.id === flower.id;

            return (
              <button
                key={flower.id}
                onClick={() => handleFlowerClick(flower)}
                className={`relative flex flex-col items-center justify-between rounded-2xl p-4 sm:p-5 text-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-300 ${
                  isBloomed
                    ? `bg-gradient-to-b ${flower.bgGradient} border ${flower.borderColor} shadow-sm hover:-translate-y-1 hover:shadow-md`
                    : 'bg-white/80 border border-slate-200/80 hover:border-rose-200 opacity-90'
                } ${isSelected ? 'ring-2 ring-rose-400 shadow-md' : ''}`}
              >
                {/* Flower Icon & Bloom Animation */}
                <div
                  className={`text-4xl sm:text-5xl transition-transform duration-500 my-2 ${
                    isBloomed ? 'scale-100 rotate-0' : 'scale-75 -rotate-12 filter grayscale contrast-75'
                  }`}
                >
                  {flower.emoji}
                </div>

                {/* Name */}
                <div className="mt-2 w-full">
                  <span className="font-display text-sm font-semibold text-slate-800 block truncate">
                    {flower.name}
                  </span>
                  <span className="text-[11px] text-slate-500 block truncate mt-0.5">
                    {isBloomed ? flower.meaning : 'Tap to bloom'}
                  </span>
                </div>

                {/* Status Dot */}
                <div className="mt-3 flex items-center justify-center">
                  {isBloomed ? (
                    <span className="flex items-center gap-1 text-[10px] font-medium text-rose-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                      <span>Bloomed</span>
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-medium">Unopened</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Flower Revelation Box */}
        {activeMessage && (
          <div className="mt-8 rounded-2xl bg-white/95 p-6 border border-rose-200 shadow-lg text-center max-w-xl mx-auto transition-all animate-gentle-float">
            <div className="text-3xl mb-2">{activeMessage.emoji}</div>
            <h4 className="font-display text-lg font-semibold text-rose-950">
              For {activeMessage.name}
            </h4>
            <p className="mt-1 text-sm sm:text-base text-slate-700 font-medium">
              “{activeMessage.message}”
            </p>
            <span className="mt-2 text-xs text-rose-800/70 block">
              — Your brother {CONFIG.brotherName.split(' ')[0]}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
