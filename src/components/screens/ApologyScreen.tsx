import React, { useState } from 'react';
import { Gamepad2, Heart, Sparkles, BookOpen } from 'lucide-react';
import { DilSeSorryCard } from '../DilSeSorryCard';

interface ApologyScreenProps {
  onStart: () => void;
}

export const ApologyScreen: React.FC<ApologyScreenProps> = ({ onStart }) => {
  const [activeTab, setActiveTab] = useState<'letter' | 'urdu'>('letter');

  return (
    <div className="flex min-h-[82vh] flex-col items-center justify-center px-3 sm:px-4 py-6 text-center animate-fade-in">
      <div className="w-full max-w-lg">
        {/* Toggle between English Letter and Dil Se Sorry (Urdu) */}
        <div className="mb-4 inline-flex items-center rounded-full bg-white/90 p-1 border border-rose-200 shadow-xs">
          <button
            onClick={() => setActiveTab('letter')}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'letter'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-rose-900'
            }`}
          >
            <span>💌 Dear Amna</span>
          </button>

          <button
            onClick={() => setActiveTab('urdu')}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'urdu'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-rose-900'
            }`}
          >
            <span>🌺 Dil Se Sorry (دلی احساس)</span>
          </button>
        </div>

        {/* Tab 1: English Letter */}
        {activeTab === 'letter' ? (
          <div className="glass-card-elevated relative mx-auto rounded-3xl p-6 sm:p-10 border-2 border-rose-200/90 shadow-2xl shadow-rose-200/40 text-left animate-fade-in">
            {/* Top Tag */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3.5 py-1 text-xs font-semibold text-rose-800">
                <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
                <span>From Brother To Sister</span>
              </div>
            </div>

            {/* Salutation */}
            <h2 className="font-handwriting text-3xl sm:text-4xl font-bold text-rose-900">
              Dear Amna ❤️
            </h2>

            {/* Letter Body */}
            <div className="my-5 rounded-2xl bg-white/75 p-6 border border-rose-100/90 text-slate-700 leading-relaxed text-base sm:text-lg shadow-xs space-y-4">
              <p className="font-display text-xl font-bold text-slate-900">
                Amna, I’m really sorry. 🥺
              </p>

              <p>
                I know your brother can be annoying sometimes,
                <br />
                but I never want to hurt you.
              </p>

              <p className="font-medium text-rose-950">
                So I made a tiny challenge for you…
                <br />
                If you complete it, you’ll discover how sorry I really am. 😭💗
              </p>
            </div>

            {/* Challenge Preview Chips */}
            <div className="mb-6 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-rose-50/80 p-2.5 border border-rose-100">
                <span className="text-lg block">❤️</span>
                <span className="text-[10px] font-bold text-rose-900 block mt-0.5">1. Catch Hearts</span>
              </div>
              <div className="rounded-xl bg-purple-50/80 p-2.5 border border-purple-100">
                <span className="text-lg block">🧠</span>
                <span className="text-[10px] font-bold text-purple-900 block mt-0.5">2. Sister Quiz</span>
              </div>
              <div className="rounded-xl bg-pink-50/80 p-2.5 border border-pink-100">
                <span className="text-lg block">💗</span>
                <span className="text-[10px] font-bold text-pink-900 block mt-0.5">3. Sorry Meter</span>
              </div>
            </div>

            {/* Start Button */}
            <div className="text-center">
              <button
                onClick={onStart}
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 px-8 py-4 text-base font-black text-white shadow-xl shadow-rose-500/35 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-rose-500/45 focus:outline-none focus:ring-4 focus:ring-rose-200 active:scale-95 cursor-pointer"
              >
                <Gamepad2 className="h-5 w-5" />
                <span>🎮 Start Sister Challenge</span>
              </button>
            </div>
          </div>
        ) : (
          /* Tab 2: Dil Se Sorry (Urdu & English) */
          <div>
            <DilSeSorryCard />
            <div className="mt-4 text-center">
              <button
                onClick={onStart}
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 px-8 py-4 text-base font-black text-white shadow-xl shadow-rose-500/35 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-rose-500/45 focus:outline-none focus:ring-4 focus:ring-rose-200 active:scale-95 cursor-pointer"
              >
                <Gamepad2 className="h-5 w-5" />
                <span>🎮 Start Sister Challenge</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
