import React, { useEffect, useState } from 'react';

interface FloatingIcon {
  id: number;
  emoji: string;
  left: number;
  top: number;
  duration: number;
  delay: number;
  size: number;
}

export const FloatingElements: React.FC = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [elements, setElements] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    const icons = ['🌸', '✨', '💖', '⭐', '🎀', '🦋', '🌷', '💕'];
    const generated: FloatingIcon[] = [];

    // Keep it light: 14 elements
    for (let i = 0; i < 14; i++) {
      generated.push({
        id: i,
        emoji: icons[i % icons.length],
        left: Math.random() * 92 + 4, // 4% to 96%
        top: Math.random() * 85 + 5,
        duration: Math.random() * 6 + 6,
        delay: Math.random() * 5,
        size: Math.random() * 8 + 16, // 16px to 24px
      });
    }

    setElements(generated);
  }, []);

  if (reducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {elements.map((el) => (
        <span
          key={el.id}
          className="absolute inline-block animate-gentle-float opacity-35 transition-opacity hover:opacity-75"
          style={{
            left: `${el.left}%`,
            top: `${el.top}%`,
            fontSize: `${el.size}px`,
            animationDuration: `${el.duration}s`,
            animationDelay: `${el.delay}s`,
          }}
        >
          {el.emoji}
        </span>
      ))}
    </div>
  );
};
