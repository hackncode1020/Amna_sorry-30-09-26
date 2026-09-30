import React, { useState } from 'react';
import { Smile, HeartHandshake, Shield, Sparkles, BookOpen, Users2, ChevronRight } from 'lucide-react';
import { CONFIG } from '../config';

interface ReasonItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  accent: string;
}

export const WhyAmnaMatters: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const reasons: ReasonItem[] = [
    {
      id: 'r1',
      title: 'Your happiness matters.',
      icon: <Smile className="h-5 w-5 text-amber-500" />,
      description: 'Seeing you laugh, carefree and comfortable around home, is something I should always protect rather than disrupt.',
      accent: 'from-amber-50/60 to-yellow-50/40 border-amber-200/60',
    },
    {
      id: 'r2',
      title: 'Your feelings matter.',
      icon: <Sparkles className="h-5 w-5 text-rose-500" />,
      description: 'You should never have to bottle up hurt or feel disregarded by someone who is supposed to support you.',
      accent: 'from-rose-50/60 to-pink-50/40 border-rose-200/60',
    },
    {
      id: 'r3',
      title: 'Your trust matters.',
      icon: <Shield className="h-5 w-5 text-emerald-500" />,
      description: 'Trust between siblings is built over years. I broke a piece of it, and I will be patient in earning it back.',
      accent: 'from-emerald-50/60 to-teal-50/40 border-emerald-200/60',
    },
    {
      id: 'r4',
      title: 'Your respect matters.',
      icon: <HeartHandshake className="h-5 w-5 text-purple-500" />,
      description: 'Respect isn’t conditional or optional. As your brother, treating you with dignity should be second nature.',
      accent: 'from-purple-50/60 to-indigo-50/40 border-purple-200/60',
    },
    {
      id: 'r5',
      title: 'Our memories matter.',
      icon: <BookOpen className="h-5 w-5 text-sky-500" />,
      description: 'From growing up under the same roof to every milestone, our story together is something I treasure deeply.',
      accent: 'from-sky-50/60 to-blue-50/40 border-sky-200/60',
    },
    {
      id: 'r6',
      title: 'Our bond matters.',
      icon: <Users2 className="h-5 w-5 text-pink-500" />,
      description: 'Siblings are friends for life given by God. I value our connection far too much to ever let my temper damage it.',
      accent: 'from-pink-50/60 to-rose-50/40 border-pink-200/60',
    },
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-transparent via-rose-50/30 to-transparent">
      <div className="mx-auto max-w-5xl">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-800 mb-2">
            <span>What I Truly Believe</span>
            <span aria-hidden="true" className="text-rose-400">·</span>
            <span>Unconditional Family</span>
          </div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl text-balance">
            Because You’re My Sister
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-lg mx-auto">
            Six truths I never want you to doubt, especially after my mistake.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {reasons.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => toggleExpand(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleExpand(item.id);
                  }
                }}
                className={`group relative rounded-2xl p-5 sm:p-6 bg-white/90 border transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-rose-300 ${item.accent}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-xs border border-slate-100 group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <ChevronRight
                    className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${
                      isExpanded ? 'rotate-90 text-rose-600' : 'group-hover:translate-x-0.5'
                    }`}
                  />
                </div>

                <h3 className="mt-4 font-display text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>For {CONFIG.sisterName}</span>
                  <span className="text-rose-600 font-medium">Always ❤️</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
