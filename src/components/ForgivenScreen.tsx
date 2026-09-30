import React, { useEffect, useState } from 'react';
import { confetti } from '../utils/confetti';
import { downloadAwardCertificate, generateAwardCertificateDataUrl } from '../utils/awardCertificate';
import { Trophy, Download, RotateCcw, Heart, Sparkles, Check, Image as ImageIcon, X, Award } from 'lucide-react';

interface ForgivenScreenProps {
  onPlayAgain: () => void;
}

export const ForgivenScreen: React.FC<ForgivenScreenProps> = ({ onPlayAgain }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  const awardData = {
    sisterName: 'AMNA',
    dateStr: formattedDate,
    brotherTitle: 'Your Annoying Brother',
  };

  useEffect(() => {
    // Grand celebration particle bursts
    confetti.fire('hearts', 90);
    setTimeout(() => {
      confetti.fire('gold', 80);
    }, 350);
    setTimeout(() => {
      confetti.fire('festive', 75);
    }, 700);

    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.([60, 40, 80, 40, 100]);
    }
  }, []);

  const handleDownload = () => {
    confetti.fire('gold', 40);
    const result = downloadAwardCertificate(awardData);
    setPreviewDataUrl(result.dataUrl);

    if (result.success) {
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } else {
      setShowPreviewModal(true);
    }
  };

  const handleOpenPreview = () => {
    const url = generateAwardCertificateDataUrl(awardData);
    setPreviewDataUrl(url);
    setShowPreviewModal(true);
  };

  return (
    <div className="relative mx-auto w-full max-w-xl px-2 sm:px-4 py-8 animate-fade-in text-center">
      {/* Golden Celebration Aura */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-rose-950/10 via-amber-950/10 to-rose-950/15 backdrop-blur-[1px]" />

      <div className="glass-card-elevated relative z-10 overflow-hidden rounded-3xl p-6 sm:p-10 border-4 border-amber-300 shadow-2xl text-center">
        {/* Confetti / Corner stars */}
        <div className="absolute top-4 left-4 text-amber-400 text-lg">★</div>
        <div className="absolute top-4 right-4 text-amber-400 text-lg">★</div>

        {/* Top Celebration Tag */}
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-4 py-1 text-xs font-black uppercase tracking-wider text-emerald-900 border border-emerald-300">
          <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
          <span>Apology Accepted</span>
        </div>

        {/* Big Joyous Headings */}
        <h1 className="font-display text-3xl sm:text-5xl font-black text-rose-950 tracking-tight">
          YAYYYYY! 🥹💗
        </h1>
        <h2 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-slate-800">
          AMNA FORGAVE ME! 🎉
        </h2>
        <div className="mt-2 text-base font-bold text-rose-700">
          “🥹 SHE SAID YES! 🥹”
        </div>
        <p className="mt-1 text-sm sm:text-base font-semibold text-slate-700">
          Thank you for forgiving me, Amna ❤️
        </p>
        <p className="text-xs text-rose-800/80 font-medium">
          From your annoying brother, with lots of love ❤️
        </p>

        {/* Animated Trophy Graphic */}
        <div className="relative my-6 mx-auto flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 shadow-xl shadow-amber-400/40 text-amber-950 animate-gentle-float">
          <Trophy className="h-14 w-14 sm:h-16 sm:w-16 stroke-[1.8] text-amber-950" />
          <div className="absolute -top-2 -right-2 text-2xl animate-bounce">✨</div>
        </div>

        {/* Award Commendation Box */}
        <div className="rounded-2xl bg-[#FFFDF9] p-5 sm:p-7 border-2 border-amber-200 shadow-md">
          <span className="font-cinzel text-xs font-bold tracking-widest text-amber-800 uppercase block">
            OFFICIALLY THE BEST SISTER EVER 🏆💗
          </span>

          <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-rose-950 mt-1">
            🏆 BEST SISTER AWARD 🏆
          </h3>

          <div className="my-3 mx-auto max-w-xs rounded-xl bg-rose-50 py-2 px-3 border border-rose-200">
            <span className="font-display text-xl sm:text-2xl font-black text-rose-900 block">
              AMNA 💖
            </span>
            <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wide block">
              Officially the BEST SISTER EVER
            </span>
          </div>

          <p className="font-display text-sm sm:text-base text-slate-700 italic leading-relaxed text-balance">
            “Presented to Amna for having the biggest heart, forgiving her annoying brother, and having the sweetest heart. 😂❤️”
          </p>

          <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-xs text-slate-400">
            <span>Date: {formattedDate}</span>
            <span className="font-handwriting text-xl text-rose-900 font-bold">
              — Your Annoying Brother ❤️
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-rose-600 to-pink-600 px-7 py-3.5 text-sm sm:text-base font-bold text-white shadow-xl shadow-rose-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            {downloadSuccess ? (
              <>
                <Check className="h-5 w-5 text-white" />
                <span>Downloaded! 🎉</span>
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                <span>📥 Download My Award</span>
              </>
            )}
          </button>

          {/* Fallback View / Save image modal */}
          <button
            onClick={handleOpenPreview}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-5 py-3.5 text-xs font-semibold text-slate-700 border border-slate-200 hover:bg-rose-50 hover:text-rose-900 transition-colors shadow-xs cursor-pointer"
          >
            <ImageIcon className="h-4 w-4 text-rose-500" />
            <span>View Certificate / Save</span>
          </button>

          {/* Play Again Button */}
          <button
            onClick={onPlayAgain}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-rose-50 px-5 py-3.5 text-xs font-semibold text-rose-900 border border-rose-200 hover:bg-rose-100 transition-colors shadow-xs cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>💗 Play Again</span>
          </button>
        </div>

        {/* Mobile / Fallback Modal */}
        {showPreviewModal && previewDataUrl && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowPreviewModal(false)}
          >
            <div
              className="relative w-full max-w-lg rounded-3xl bg-white p-4 sm:p-6 shadow-2xl border border-rose-200 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPreviewModal(false)}
                className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer"
                aria-label="Close preview"
              >
                <X className="h-4 w-4" />
              </button>

              <h4 className="font-cinzel text-lg font-bold text-slate-900 mb-1">
                Amna’s Best Sister Award
              </h4>
              <p className="text-xs text-slate-500 mb-3">
                On mobile: Press and hold the award image below to save it to your Photos!
              </p>

              <div className="overflow-hidden rounded-2xl border-2 border-amber-200 shadow-md">
                <img
                  src={previewDataUrl}
                  alt="Best Sister Award for Amna"
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="mt-4 flex items-center justify-center gap-2">
                <a
                  href={previewDataUrl}
                  download="Best-Sister-Award-Amna.png"
                  className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-rose-700"
                >
                  <Download className="h-4 w-4" />
                  <span>Save Image File</span>
                </a>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="rounded-full bg-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
