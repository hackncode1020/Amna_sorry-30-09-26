import React from 'react';
import { Heart, RotateCcw } from 'lucide-react';

export type ScreenId =
  | 'welcome'
  | 'apology'
  | 'game1'
  | 'game2'
  | 'game3'
  | 'question'
  | 'forgiven'
  | 'award';

interface TopProgressBarProps {
  currentScreen: ScreenId;
  onReset: () => void;
}

export const TopProgressBar: React.FC<TopProgressBarProps> = ({ currentScreen, onReset }) => {
  const getStageInfo = () => {
    switch (currentScreen) {
      case 'welcome':
        return { label: '🌸 Welcome', progress: 12 };
      case 'apology':
        return { label: '💌 The Apology', progress: 25 };
      case 'game1':
        return { label: '❤️ Challenge 1/3: Catch Hearts', progress: 40 };
      case 'game2':
        return { label: '🧠 Challenge 2/3: Quiz', progress: 55 };
      case 'game3':
        return { label: '💗 Challenge 3/3: Sorry Meter', progress: 70 };
      case 'question':
        return { label: '🥺 Final Question', progress: 85 };
      case 'forgiven':
        return { label: '🎉 SHE SAID YES!', progress: 95 };
      case 'award':
        return { label: '🏆 Best Sister Award', progress: 100 };
    }
  };

  const { label, progress } = getStageInfo();

  return (
    <header className="sticky top-0 z-40 glass-nav border-b border-rose-200/60 backdrop-blur-md bg-white/80">
      {/* Top thin progress line */}
      <div className="h-1.5 w-full bg-rose-100/60 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-rose-400 via-pink-500 to-amber-400 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mx-auto flex max-w-2xl items-center justify-between px-3 py-2 sm:px-6">
        {/* Left: Branding badge with Sakura avatar, exactly matching screenshot */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-100 border border-pink-200 text-lg shadow-xs">
            🌸
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display text-xs sm:text-sm font-bold text-rose-950 flex items-center gap-1 leading-tight">
              <span>For Amna</span>
              <Heart className="h-3 w-3 fill-rose-500 text-rose-500 inline-block" />
            </span>
            <span className="text-[10px] text-rose-800/75 font-medium leading-tight">
              from Abdaal Manzoor
            </span>
          </div>
        </div>

        {/* Center: Stage label */}
        <div className="hidden sm:block text-center">
          <span className="text-xs font-bold text-slate-700 tracking-tight bg-rose-50/80 px-3 py-1 rounded-full border border-rose-100">
            {label}
          </span>
        </div>

        {/* Right: Restart/Menu action */}
        <div>
          <button
            onClick={onReset}
            className="flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[11px] font-semibold text-rose-800 bg-rose-50 hover:bg-rose-100 transition-colors border border-rose-200/70 shadow-xs cursor-pointer"
            title="Start from beginning"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Restart</span>
          </button>
        </div>
      </div>
    </header>
  );
};
