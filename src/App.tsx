import React, { useState } from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { TopProgressBar, ScreenId } from './components/TopProgressBar';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { ApologyScreen } from './components/screens/ApologyScreen';
import { HeartCatchGame } from './components/screens/HeartCatchGame';
import { BrotherSisterQuiz } from './components/screens/BrotherSisterQuiz';
import { SorryHeartMeter } from './components/screens/SorryMeterGame';
import { FinalQuestionScreen } from './components/screens/FinalQuestionScreen';
import { ForgivenCelebrationScreen } from './components/screens/ForgivenCelebrationScreen';
import { BestSisterAwardScreen } from './components/screens/BestSisterAwardScreen';
import { YouTubeBackgroundPlayer } from './components/YouTubeBackgroundPlayer';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('welcome');

  const goTo = (screen: ScreenId) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    goTo('welcome');
  };

  return (
    <div className="relative min-h-screen bg-[#FFFDFB] text-slate-800 antialiased selection:bg-rose-200 selection:text-rose-900 overflow-x-hidden flex flex-col justify-between">
      {/* Animated Floating Hearts, Stars & Flowers Canvas Background */}
      <AnimatedBackground />

      {/* Top Header with Sakura Badge & Stage Indicator */}
      <TopProgressBar
        currentScreen={currentScreen}
        onReset={handleReset}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-2 sm:p-4">
        {currentScreen === 'welcome' && (
          <WelcomeScreen onOpen={() => goTo('apology')} />
        )}

        {currentScreen === 'apology' && (
          <ApologyScreen onStart={() => goTo('game1')} />
        )}

        {currentScreen === 'game1' && (
          <HeartCatchGame onComplete={() => goTo('game2')} />
        )}

        {currentScreen === 'game2' && (
          <BrotherSisterQuiz onComplete={() => goTo('game3')} />
        )}

        {currentScreen === 'game3' && (
          <SorryHeartMeter onComplete={() => goTo('question')} />
        )}

        {currentScreen === 'question' && (
          <FinalQuestionScreen onYesClick={() => goTo('forgiven')} />
        )}

        {currentScreen === 'forgiven' && (
          <ForgivenCelebrationScreen onViewAward={() => goTo('award')} />
        )}

        {currentScreen === 'award' && (
          <BestSisterAwardScreen onPlayAgain={handleReset} />
        )}
      </main>

      {/* YouTube Background Music Player for "Apa Fer Milaange" by Savi Kahlon */}
      <YouTubeBackgroundPlayer />

      {/* Sincere Brother Signoff Footer matching screenshot */}
      <footer className="relative z-10 py-3 px-4 text-center text-xs font-medium text-slate-400 select-none space-y-1">
        <p className="text-rose-900/80 font-semibold">
          For Amna ❤️ — from Abdaal Manzoor
        </p>
        <p className="text-[11px] text-slate-400">
          Strictly sibling love, care, respect and apology.
        </p>
      </footer>
    </div>
  );
}
