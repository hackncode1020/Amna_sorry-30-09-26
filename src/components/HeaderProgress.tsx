import React from 'react';
import { ScreenStep, SisterLevel } from '../types';
import { Sparkles, Trophy, RotateCcw } from 'lucide-react';

interface HeaderProgressProps {
  currentScreen: ScreenStep;
  sisterLevel: SisterLevel;
  onReset: () => void;
}

export const HeaderProgress: React.FC<HeaderProgressProps> = ({
  currentScreen,
  sisterLevel,
  onReset,
}) => {
  const getStepInfo = () => {
    switch (currentScreen) {
      case 'welcome':
      case 'intro':
        return { label: 'Intro', progress: 10, isGame: false };
      case 'game1':
        return { label: 'Challenge 1/4 · Hearts', progress: 28, isGame: true };
      case 'game2':
        return { label: 'Challenge 2/4 · Memory', progress: 50, isGame: true };
      case 'game3':
        return { label: 'Challenge 3/4 · Quiz', progress: 72, isGame: true };
      case 'game4':
        return { label: 'Final Challenge · Love Meter', progress: 90, isGame: true };
      case 'unlock':
      case 'certificate':
        return { label: '🏆 Challenge Completed!', progress: 100, isGame: false };
    }
  };

  const { label, progress } = getStepInfo();

  return (
    <header className="sticky top-0 z-40 glass-nav border-b border-rose-200/50 backdrop-blur-md">
      {/* Top thin progress fill line */}
      <div className="h-1.5 w-full bg-rose-100/60 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-rose-400 via-pink-500 to-amber-400 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-2.5 sm:px-6">
        {/* Left: Sister Level Badge */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-900 border border-rose-200/70 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span className="hidden xs:inline">Level:</span>
            <span>{sisterLevel}</span>
          </div>
        </div>

        {/* Center: Current Challenge Stage */}
        <div className="text-center">
          <span className="text-xs sm:text-sm font-semibold text-slate-700 tracking-tight">
            {label}
          </span>
        </div>

        {/* Right: Reset Action (Discreet & accessible) */}
        <div>
          <button
            onClick={onReset}
            className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium text-slate-500 hover:bg-rose-50 hover:text-rose-900 transition-colors"
            title="Start from beginning"
          >
            <RotateCcw className="h-3 w-3" />
            <span className="hidden sm:inline">Restart</span>
          </button>
        </div>
      </div>
    </header>
  );
};
