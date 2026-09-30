import React from 'react';
import { Brain, Heart, Ear, BookCheck, ShieldAlert, Footprints, CheckCircle2 } from 'lucide-react';
import { CONFIG } from '../config';

interface PromiseCard {
  id?: string;
  title: string;
  detail: string;
  icon: React.ReactNode;
}

export const ThingsIDoBetter: React.FC = () => {
  const promises: PromiseCard[] = [
    {
      title: 'I’ll think before I speak.',
      detail: 'Pausing before letting careless words slip, knowing that harsh words hurt deep.',
      icon: <Brain className="h-5 w-5 text-indigo-500" />,
    },
    {
      id: 'p2',
      title: 'I’ll respect your feelings.',
      detail: 'Never dismissing what you feel as “too sensitive” or insignificant.',
      icon: <Heart className="h-5 w-5 text-rose-500" />,
    },
    {
      id: 'p3',
      title: 'I’ll listen instead of reacting.',
      detail: 'Giving you my full attention without getting defensive or argumentative.',
      icon: <Ear className="h-5 w-5 text-amber-500" />,
    },
    {
      id: 'p4',
      title: 'I’ll learn from my mistakes.',
      detail: 'Treating this moment as a genuine wake-up call to grow into a better brother.',
      icon: <BookCheck className="h-5 w-5 text-emerald-500" />,
    },
    {
      id: 'p5',
      title: 'I’ll never take our bond for granted.',
      detail: 'Remembering that having a sister like you is a blessing that deserves daily care.',
      icon: <ShieldAlert className="h-5 w-5 text-purple-500" />,
    },
    {
      id: 'p6',
      title: 'I’ll show my apology through my actions.',
      detail: 'Backing up every word on this page with patience, gentleness, and respect.',
      icon: <Footprints className="h-5 w-5 text-teal-500" />,
    },
  ];

  return (
    <section id="promises" className="relative py-16 sm:py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-800 mb-2">
            <span>Brother’s Commitment</span>
            <span aria-hidden="true" className="text-rose-400">·</span>
            <span>Real Actions</span>
          </div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl text-balance">
            What I’ll Do Better From Now On
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
            Grounded, honest commitments. Not empty words, but changes in how I treat you.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {promises.map((item, index) => (
            <div
              key={index}
              className="relative rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80 transition-all duration-300 hover:shadow-md hover:border-rose-200 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 border border-slate-100">
                  {item.icon}
                </div>
                <span className="text-[11px] font-semibold text-slate-400">
                  0{index + 1}
                </span>
              </div>

              <h3 className="mt-4 font-display text-base font-bold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.detail}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Pledged to {CONFIG.sisterName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
