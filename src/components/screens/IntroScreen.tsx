import React from 'react';
import { Sparkles, Heart, Brain, HelpCircle, Trophy } from 'lucide-react';

interface IntroScreenProps {
  onStartChallenges: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStartChallenges }) => {
  const challenges = [
    {
      num: '1',
      title: 'Catch the Hearts',
      icon: <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />,
      desc: 'Test your quick reflexes',
    },
    {
      num: '2',
      title: 'Sister Memory Match',
      icon: <Brain className="h-5 w-5 text-purple-500" />,
      desc: 'Pair up the cute symbols',
    },
    {
      num: '3',
      title: 'Sister Trivia Quiz',
      icon: <HelpCircle className="h-5 w-5 text-amber-500" />,
      desc: 'Answer hilarious sibling truths',
    },
    {
      num: '4',
      title: 'Love Meter Tap Rush',
      icon: <Sparkles className="h-5 w-5 text-pink-500" />,
      desc: 'Fill the heart meter to 100%',
    },
  ];

  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center px-4 py-8 text-center animate-fade-in">
      <div className="mx-auto max-w-lg">
        {/* Animated Greeting */}
        <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-800">
          <span>Official Sibling Notice</span>
          <span aria-hidden="true" className="text-rose-400">·</span>
          <span>Top Priority</span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Hey Sis! 💕
        </h2>

        {/* Intro Card */}
        <div className="glass-card-elevated my-6 rounded-3xl p-6 sm:p-7 text-left border border-rose-200/80 shadow-lg shadow-rose-100/50">
          <p className="text-base sm:text-lg leading-relaxed text-slate-700 font-medium">
            This is not an ordinary website...
            <br />
            You have to complete a few tiny challenges to unlock something special. 👀✨
          </p>

          <div className="mt-5 space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-900/70 block">
              Your 4 Sisterhood Trials:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {challenges.map((c) => (
                <div
                  key={c.num}
                  className="flex items-center gap-3 rounded-2xl bg-white/90 p-3 border border-rose-100/80 shadow-xs"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-50">
                    {c.icon}
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-900 block truncate">
                      {c.title}
                    </span>
                    <span className="text-[11px] text-slate-500 block truncate">
                      {c.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-gradient-to-r from-amber-50 to-rose-50 p-3.5 border border-amber-200/60 flex items-center gap-3">
            <Trophy className="h-6 w-6 text-amber-500 shrink-0" />
            <span className="text-xs font-medium text-amber-900">
              Pass all 4 trials to unlock your official <strong>Best Sister Award & Certificate</strong>!
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStartChallenges}
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-rose-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-rose-500/35 focus:outline-none focus:ring-4 focus:ring-rose-200 active:scale-95 cursor-pointer"
        >
          <span>✨ I’m Ready!</span>
        </button>
      </div>
    </div>
  );
};
