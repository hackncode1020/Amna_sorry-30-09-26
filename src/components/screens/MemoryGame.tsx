import React, { useState, useEffect } from 'react';
import { confetti } from '../../utils/confetti';
import { Sparkles, ArrowRight, Brain, RotateCcw } from 'lucide-react';

interface MemoryGameProps {
  onComplete: () => void;
}

interface CardItem {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MemoryGame: React.FC<MemoryGameProps> = ({ onComplete }) => {
  const symbols = ['❤️', '💕', '🌸', '⭐', '🦋', '🎀', '🎁'];

  const createShuffledDeck = (): CardItem[] => {
    // 7 pairs = 14 cards
    const deck = [...symbols, ...symbols].map((symbol, idx) => ({
      id: idx,
      symbol,
      isFlipped: false,
      isMatched: false,
    }));

    // Fisher-Yates shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  };

  const [cards, setCards] = useState<CardItem[]>(createShuffledDeck);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const resetGame = () => {
    setCards(createShuffledDeck());
    setFlippedIndices([]);
    setIsLocked(false);
    setMoves(0);
    setIsCompleted(false);
  };

  const handleCardClick = (index: number) => {
    if (isLocked || isCompleted) return;

    const clickedCard = cards[index];
    if (clickedCard.isFlipped || clickedCard.isMatched) return;

    // Vibration on tap
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(20);
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = newCards[firstIdx];
      const secondCard = newCards[secondIdx];

      if (firstCard.symbol === secondCard.symbol) {
        // MATCH!
        setTimeout(() => {
          setCards((prev) => {
            const updated = [...prev];
            updated[firstIdx].isMatched = true;
            updated[secondIdx].isMatched = true;

            const allMatched = updated.every((c) => c.isMatched);
            if (allMatched) {
              setIsCompleted(true);
              confetti.fire('festive', 80);
            }
            return updated;
          });
          setFlippedIndices([]);
        }, 300);
      } else {
        // MISMATCH -> flip back after 750ms
        setIsLocked(true);
        setTimeout(() => {
          setCards((prev) => {
            const updated = [...prev];
            updated[firstIdx].isFlipped = false;
            updated[secondIdx].isFlipped = false;
            return updated;
          });
          setFlippedIndices([]);
          setIsLocked(false);
        }, 750);
      }
    }
  };

  const matchedPairsCount = cards.filter((c) => c.isMatched).length / 2;

  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center px-4 py-6 animate-fade-in">
      <div className="w-full max-w-xl text-center">
        {/* Header Tag */}
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3.5 py-1 text-xs font-semibold text-purple-800 border border-purple-200">
          <Brain className="h-3.5 w-3.5 text-purple-600" />
          <span>Trial 2 · Memory Challenge</span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
          Let’s see how good your memory is! 👀
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Match all 7 sister symbol pairs to advance!
        </p>

        {/* Status Bar */}
        <div className="my-4 flex items-center justify-between rounded-2xl bg-white/90 p-3 shadow-xs border border-rose-100 max-w-md mx-auto">
          <div className="text-left">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Pairs Found</span>
            <span className="font-display text-base font-bold text-rose-600">
              {matchedPairsCount} / 7
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Moves</span>
            <span className="font-display text-base font-bold text-slate-700">{moves}</span>
          </div>
        </div>

        {/* 14 Card Grid (responsive layout) */}
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5 sm:gap-3 p-3 rounded-3xl bg-white/70 border border-rose-100/80 shadow-md">
          {cards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              disabled={card.isMatched || isLocked}
              className={`relative aspect-[3/4] w-full rounded-2xl p-1 text-center transition-all duration-300 transform perspective-1000 flex items-center justify-center cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-rose-300 ${
                card.isMatched
                  ? 'bg-gradient-to-tr from-emerald-50 to-teal-50 border-2 border-emerald-300 shadow-xs scale-95 opacity-90'
                  : card.isFlipped
                  ? 'bg-gradient-to-tr from-rose-50 to-pink-50 border-2 border-rose-300 shadow-md rotate-y-180'
                  : 'bg-gradient-to-br from-rose-400 via-pink-400 to-rose-500 border border-rose-300 text-white shadow-sm hover:scale-105 active:scale-95'
              }`}
              aria-label={`Card ${index + 1}`}
            >
              {card.isFlipped || card.isMatched ? (
                <span className="text-2xl sm:text-3xl filter drop-shadow-xs animate-fade-in">
                  {card.symbol}
                </span>
              ) : (
                <span className="text-sm sm:text-base font-bold text-white/90">
                  ✨
                </span>
              )}
            </button>
          ))}
        </div>

        {/* COMPLETION MODAL */}
        {isCompleted && (
          <div className="mt-6 rounded-3xl bg-white/95 p-6 border-2 border-rose-300 shadow-xl max-w-md mx-auto animate-fade-in">
            <div className="text-4xl mb-2 animate-bounce">🥹✨</div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
              WOW! 🥹 Your sister skills are officially LEGENDARY!
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              You cleared all 7 pairs in only {moves} moves!
            </p>

            <button
              onClick={onComplete}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Next Challenge</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
