import React, { useState } from 'react';
import { confetti } from '../../utils/confetti';
import { HelpCircle, Check, X, ArrowRight, Sparkles, Heart } from 'lucide-react';

interface SisterQuizProps {
  onComplete: () => void;
}

interface Question {
  id: number;
  question: string;
  options: {
    label: string;
    isCorrect: boolean;
    funnyFeedback?: string;
  }[];
}

export const SisterQuiz: React.FC<SisterQuizProps> = ({ onComplete }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: 'Who is always there when you need help?',
      options: [
        { label: 'My sister ❤️', isCorrect: true },
        { label: 'Google 😂', isCorrect: false, funnyFeedback: 'Google knows everything, but it can’t make fun of your brother like you do! Try again 😂' },
        { label: 'A random stranger 😭', isCorrect: false, funnyFeedback: 'Stranger danger! Definitely NOT the stranger! Pick again 😭' },
      ],
    },
    {
      id: 2,
      question: 'Who deserves the Best Sister Award?',
      options: [
        { label: 'My sister 🥰', isCorrect: true },
        { label: 'Nobody 😭', isCorrect: false, funnyFeedback: 'Nobody?! After all the challenges you just did?! Try again! 😭' },
        { label: 'The cat 🐱', isCorrect: false, funnyFeedback: 'The cat purred "meow" but agrees YOU deserve it more! Try again 🐱' },
      ],
    },
    {
      id: 3,
      question: 'What happens when my sister completes this challenge?',
      options: [
        { label: 'She gets the Best Sister Award 🏆', isCorrect: true },
        { label: 'Nothing 😂', isCorrect: false, funnyFeedback: 'Your brother would never do that to you! Guess again 😂' },
        { label: 'She has to start again 😱', isCorrect: false, funnyFeedback: 'That would be cruel! Pick the real glory option! 🏆' },
      ],
    },
  ];

  const safeIndex = Math.min(Math.max(0, currentQIndex), questions.length - 1);
  const currentQ = questions[safeIndex] ?? questions[0];

  const handleSelectOption = (index: number) => {
    if (isAnswerCorrect === true || isQuizComplete) return;
    const opt = currentQ.options[index];
    if (!opt) return;
    setSelectedOption(index);

    if (opt.isCorrect) {
      setIsAnswerCorrect(true);
      setFeedback('Correct! Absolutely 100% true! 💖');
      confetti.burstAt(window.innerWidth / 2, window.innerHeight * 0.45, 15);

      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate?.([30, 40]);
      }

      setTimeout(() => {
        if (currentQIndex < questions.length - 1) {
          setCurrentQIndex((prev) => prev + 1);
          setSelectedOption(null);
          setFeedback(null);
          setIsAnswerCorrect(null);
        } else {
          setIsQuizComplete(true);
          confetti.fire('festive', 70);
        }
      }, 1000);
    } else {
      setIsAnswerCorrect(false);
      setFeedback(opt.funnyFeedback || 'Oops! Try the sister answer! 😂');
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate?.(60);
      }
    }
  };

  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center px-4 py-6 animate-fade-in">
      <div className="w-full max-w-lg text-center">
        {/* Tag */}
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-pink-50 px-3.5 py-1 text-xs font-semibold text-pink-800 border border-pink-200">
          <HelpCircle className="h-3.5 w-3.5 text-pink-600" />
          <span>Trial 3 · Sister Trivia</span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
          Choose The Right Answer 💗
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Question {currentQIndex + 1} of {questions.length}
        </p>

        {!isQuizComplete ? (
          <div className="mt-6 rounded-3xl bg-white/95 p-6 sm:p-8 border border-rose-200 shadow-xl text-left">
            {/* Question Text */}
            <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              “{currentQ.question}”
            </h3>

            {/* Options List */}
            <div className="mt-5 space-y-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isSelectedCorrect = isSelected && isAnswerCorrect;
                const isSelectedWrong = isSelected && isAnswerCorrect === false;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left font-semibold text-sm sm:text-base transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-300 ${
                      isSelectedCorrect
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-sm scale-[1.01]'
                        : isSelectedWrong
                        ? 'bg-rose-50 border-rose-400 text-rose-950 animate-shake'
                        : 'bg-white hover:bg-rose-50/60 border-slate-200 text-slate-700 hover:border-rose-300'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelectedCorrect && (
                      <Check className="h-5 w-5 text-emerald-600 shrink-0" />
                    )}
                    {isSelectedWrong && (
                      <X className="h-5 w-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback alert if wrong/right */}
            {feedback && (
              <div
                className={`mt-4 rounded-xl p-3 text-xs sm:text-sm font-medium animate-fade-in ${
                  isAnswerCorrect
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-amber-50 text-amber-900 border border-amber-200'
                }`}
              >
                {feedback}
              </div>
            )}
          </div>
        ) : (
          /* COMPLETION CARD */
          <div className="mt-6 rounded-3xl bg-white/95 p-8 border-2 border-rose-300 shadow-xl max-w-md mx-auto animate-fade-in">
            <div className="text-5xl mb-3 animate-bounce">💕✨</div>
            <h3 className="font-display text-2xl font-bold text-slate-900">
              100% Sister Approved! 💕
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Every single answer passed the brother-sister accuracy test with flying colors!
            </p>

            <button
              onClick={onComplete}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-rose-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Final Challenge Ahead</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
