import React, { useState, useRef, useEffect } from 'react';
import { confetti } from '../../utils/confetti';
import { HelpCircle, Check, X, ArrowRight } from 'lucide-react';

interface BrotherSisterQuizProps {
  onComplete: () => void;
}

interface Question {
  id: number;
  question: string;
  options: {
    letter: string;
    label: string;
    isCorrect: boolean;
    feedback?: string;
  }[];
  afterCorrectMsg: string;
}

export const BrotherSisterQuiz: React.FC<BrotherSisterQuizProps> = ({ onComplete }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const transitionTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const questions: Question[] = [
    {
      id: 1,
      question: 'When a brother teases his sister or makes a silly mistake, what is in his heart?',
      options: [
        { letter: 'A', label: 'Immense love and affection, even if he acted dumb ❤️', isCorrect: true },
        { letter: 'B', label: 'He wanted to make her mad on purpose', isCorrect: false, feedback: 'No way! He truly cares for Amna, he just messed up! 🥺' },
        { letter: 'C', label: 'He forgot she’s his little sister', isCorrect: false, feedback: 'Never! Amna is his favorite sister in the entire universe! 🌸' },
      ],
      afterCorrectMsg: 'Yes! He may be annoying sometimes, but you mean the world to him 🥺❤️',
    },
    {
      id: 2,
      question: 'What is the golden rule of our brother-sister bond?',
      options: [
        { letter: 'A', label: 'Stay angry forever 😤', isCorrect: false, feedback: 'Brothers and sisters can’t stay angry for long! 🥺' },
        { letter: 'B', label: 'Forgive each other and always stick together through everything 🌸', isCorrect: true },
        { letter: 'C', label: 'Stop talking', isCorrect: false, feedback: 'Without talking to Amna, the house is too quiet and sad! 💔' },
      ],
      afterCorrectMsg: 'A brother and sister’s bond is stronger than any silly argument! 🌸✨',
    },
    {
      id: 3,
      question: 'What does your brother promise to do from now on?',
      options: [
        { letter: 'A', label: 'Listen to you carefully, respect you, and be a gentler brother 🤝', isCorrect: true },
        { letter: 'B', label: 'Steal your snacks again 🍫', isCorrect: false, feedback: 'Haha, maybe snacks, but never intentionally hurt you again! 😂' },
        { letter: 'C', label: 'Nothing at all', isCorrect: false, feedback: 'He genuinely wants to be the best brother for you! 💖' },
      ],
      afterCorrectMsg: '100% promised on my heart. I will always listen to you, Amna. 🤝✨',
    },
    {
      id: 4,
      question: 'Who feels the deepest pain in his heart when he accidentally makes Amna sad?',
      options: [
        { letter: 'A', label: 'Her brother who is genuinely sorry 🥺💔', isCorrect: true },
        { letter: 'B', label: 'Nobody', isCorrect: false, feedback: 'It breaks your brother’s heart to see tears in your eyes! 😭' },
        { letter: 'C', label: 'His mobile phone', isCorrect: false, feedback: 'The phone has no feelings! Your brother loves you deeply! 🥺' },
      ],
      afterCorrectMsg: 'It genuinely breaks my heart when you are upset... I am truly sorry 🥺❤️',
    },
    {
      id: 5,
      question: 'No matter how much we argue or fight, who loves Amna unconditionally as his precious sister?',
      options: [
        { letter: 'A', label: 'Your brother Abdaal with all his heart ❤️', isCorrect: true },
        { letter: 'B', label: 'The internet 😂', isCorrect: false, feedback: 'The internet doesn’t know what true sibling love is! ❤️' },
        { letter: 'C', label: 'Nobody', isCorrect: false, feedback: 'Your brother loves you more than words can say! 🥹💗' },
      ],
      afterCorrectMsg: 'Forever and always. Nothing in this world can ever replace my love for you, Amna! 🥹💗',
    },
  ];

  // Guaranteed safe question reference preventing "undefined (reading 'question')"
  const safeIndex = Math.min(Math.max(0, currentQIndex), questions.length - 1);
  const currentQ: Question = questions[safeIndex] ?? questions[0];

  const handleSelectOption = (index: number) => {
    // Prevent double clicking while an answer is being evaluated
    if (isAnswerCorrect === true || isQuizComplete) return;

    const opt = currentQ.options[index];
    if (!opt) return;

    setSelectedOption(index);

    if (opt.isCorrect) {
      setIsAnswerCorrect(true);
      setFeedback(currentQ.afterCorrectMsg);
      confetti.burstAt(window.innerWidth / 2, window.innerHeight * 0.45, 14);

      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate?.([30, 40]);
      }

      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }

      transitionTimerRef.current = window.setTimeout(() => {
        setCurrentQIndex((prev) => {
          if (prev < questions.length - 1) {
            setSelectedOption(null);
            setFeedback(null);
            setIsAnswerCorrect(null);
            return prev + 1;
          } else {
            setIsQuizComplete(true);
            confetti.fire('festive', 80);
            confetti.fire('hearts', 60);
            return prev;
          }
        });
      }, 1000);
    } else {
      setIsAnswerCorrect(false);
      setFeedback(opt.feedback || 'Oops! Try again! 😂');
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate?.(60);
      }
    }
  };

  return (
    <div className="flex min-h-[82vh] flex-col items-center justify-center px-3 sm:px-4 py-6 animate-fade-in select-none">
      <div className="w-full max-w-lg text-center">
        {/* Tag */}
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3.5 py-1 text-xs font-semibold text-purple-900 border border-purple-200">
          <HelpCircle className="h-3.5 w-3.5 text-purple-600" />
          <span>Challenge 2: Brother-To-Sister Questions 👀</span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
          Remembering A Brother’s Love ❤️
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Your brother asks sister Amna… Question {safeIndex + 1} of {questions.length}
        </p>

        {!isQuizComplete && currentQ ? (
          <div className="mt-5 rounded-3xl bg-white/95 p-5 sm:p-8 border border-rose-200 shadow-xl text-left">
            {/* Question Text */}
            <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 leading-snug">
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
                    disabled={isAnswerCorrect === true}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border text-left font-semibold text-sm sm:text-base transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-300 ${
                      isSelectedCorrect
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-sm scale-[1.01]'
                        : isSelectedWrong
                        ? 'bg-rose-50 border-rose-400 text-rose-950 animate-shake'
                        : 'bg-white hover:bg-rose-50/60 border-slate-200 text-slate-700 hover:border-rose-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-700">
                        {opt.letter}
                      </span>
                      <span>{opt.label}</span>
                    </div>

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

            {/* Feedback alert */}
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
          <div className="mt-5 rounded-3xl bg-white/95 p-8 border-2 border-rose-300 shadow-xl max-w-md mx-auto animate-fade-in">
            <div className="text-5xl mb-3 animate-bounce">🥹💗</div>
            <h3 className="font-display text-2xl font-bold text-slate-900">
              A Sister’s Bond Is Forever 🥹💗
            </h3>
            <p className="mt-2 text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
              Amna knows her brother will always protect and love her, through all mistakes and apologies.
            </p>

            <button
              onClick={onComplete}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 via-rose-600 to-pink-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-rose-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Next Challenge</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
