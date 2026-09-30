import React from 'react';
import { CONFIG } from '../config';

interface SiblingDuty {
  emoji: string;
  title: string;
  humor: string;
  bgGrad: string;
  borderCol: string;
}

export const CuteSiblingSection: React.FC = () => {
  const duties: SiblingDuty[] = [
    {
      emoji: '😂',
      title: 'Annoy you occasionally',
      humor: 'It is written in the sacred brother handbook. Completely non-negotiable.',
      bgGrad: 'from-amber-50 to-orange-50/70',
      borderCol: 'border-amber-200',
    },
    {
      emoji: '🫶',
      title: 'Protect you when it matters',
      humor: 'Whenever the world gets heavy or difficult, I will always stand by you.',
      bgGrad: 'from-emerald-50 to-teal-50/70',
      borderCol: 'border-emerald-200',
    },
    {
      emoji: '🌸',
      title: 'Make you laugh when you’re upset',
      humor: 'Even if it means making the most ridiculous jokes until you crack a smile.',
      bgGrad: 'from-pink-50 to-rose-50/70',
      borderCol: 'border-pink-200',
    },
    {
      emoji: '😭',
      title: 'Argue over silly things',
      humor: 'TV remotes, snacks, who ate the last treat—the universal sibling traditions.',
      bgGrad: 'from-purple-50 to-indigo-50/70',
      borderCol: 'border-purple-200',
    },
    {
      emoji: '❤️',
      title: 'And still be there because you’re my sister',
      humor: 'At the end of every day, no matter what happens, family comes first.',
      bgGrad: 'from-rose-50 to-pink-100',
      borderCol: 'border-rose-300',
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-transparent via-pink-50/30 to-transparent">
      <div className="mx-auto max-w-5xl">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-800 mb-2">
            <span>Brother-Sister Dynamic</span>
            <span aria-hidden="true" className="text-rose-400">·</span>
            <span>Unbreakable Code</span>
          </div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl text-balance">
            Being Your Brother Comes With A Few Responsibilities…
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
            Some duties are silly, some are solemn, but every single one is because you’re my sister.
          </p>
        </div>

        {/* 5 Cards Row/Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {duties.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-between rounded-2xl p-5 bg-gradient-to-b ${item.bgGrad} border ${item.borderCol} shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-1`}
            >
              <div>
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-display text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {item.humor}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-rose-200/50 text-[10px] text-slate-400 font-medium">
                Duty #{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
