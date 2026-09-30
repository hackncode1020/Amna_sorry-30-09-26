import React, { useState } from 'react';
import { downloadAwardCertificate, generateAwardCertificateDataUrl } from '../../utils/awardCertificate';
import { confetti } from '../../utils/confetti';
import { Trophy, Download, RotateCcw, Sparkles, Check, Image as ImageIcon, X, Heart, Gift } from 'lucide-react';
import { FinalSurpriseModal } from '../FinalSurpriseModal';

interface BestSisterAwardScreenProps {
  onPlayAgain: () => void;
}

export const BestSisterAwardScreen: React.FC<BestSisterAwardScreenProps> = ({
  onPlayAgain,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showFinalSurprise, setShowFinalSurprise] = useState(false);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  const awardData = {
    sisterName: 'AMNA 💗',
    dateStr: formattedDate,
  };

  const handleDownload = () => {
    confetti.fire('gold', 50);
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
    <div className="flex min-h-[85vh] flex-col items-center justify-center px-3 sm:px-6 py-8 text-center animate-fade-in">
      <div className="w-full max-w-xl">
        {/* Banner */}
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-4 py-1 text-xs font-black uppercase tracking-wider text-amber-900 border border-amber-300">
          <Sparkles className="h-3.5 w-3.5 text-amber-600" />
          <span>Official Sisterhood Certification</span>
        </div>

        <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-wide">
          The Official Apology Award 🏆
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Earned by Amna for having the biggest heart in the world.
        </p>

        {/* THE AWARD CERTIFICATE CARD (Screen representation) */}
        <div className="relative my-5 rounded-3xl bg-[#FFFDF9] p-6 sm:p-10 shadow-2xl border-4 border-amber-300 text-center overflow-hidden">
          {/* Golden Inner Borders */}
          <div className="pointer-events-none absolute inset-3 rounded-2xl border-2 border-amber-200/90" />
          <div className="pointer-events-none absolute inset-4 rounded-xl border border-amber-300/40" />

          {/* Corner Flourishes */}
          <div className="absolute top-5 left-5 text-amber-500 text-xs sm:text-sm select-none">
            ✦ ✧ ✦
          </div>
          <div className="absolute top-5 right-5 text-amber-500 text-xs sm:text-sm select-none">
            ✦ ✧ ✦
          </div>

          {/* Certificate Trophy Header */}
          <div className="relative z-10 mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 shadow-md">
            <Trophy className="h-8 w-8 stroke-[1.8]" />
          </div>

          <div className="relative z-10 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-800">
            ★ OFFICIAL CERTIFICATE OF SISTERHOOD ★
          </div>

          <h3 className="relative z-10 font-cinzel text-xl sm:text-3xl font-black text-rose-950 tracking-wider mt-1">
            🏆 BEST SISTER AWARD 🏆
          </h3>

          <p className="relative z-10 mt-3 text-xs sm:text-sm text-slate-500 italic">
            This award is proudly presented to
          </p>

          {/* Amna Name Banner */}
          <div className="relative z-10 my-3 mx-auto max-w-sm rounded-2xl bg-rose-50/90 py-2.5 px-4 border border-rose-200">
            <span className="font-display text-2xl sm:text-3xl font-black text-rose-900 block tracking-tight">
              AMNA 💗
            </span>
          </div>

          {/* Commendation citation */}
          <p className="relative z-10 text-xs sm:text-sm text-slate-700 leading-relaxed max-w-md mx-auto">
            For forgiving her annoying brother,
            <br />
            having the biggest heart,
            <br />
            and officially being the <strong className="text-rose-950 font-bold">BEST SISTER EVER</strong>.
          </p>

          {/* Level Pill */}
          <div className="relative z-10 mt-4 inline-flex items-center gap-1 rounded-full bg-rose-50 px-4 py-1 text-xs font-bold text-rose-900 border border-rose-200">
            <span>⭐ Sister Level: LEGENDARY ⭐</span>
          </div>

          {/* Footer of Certificate: Date & Signature */}
          <div className="relative z-10 mt-7 pt-5 border-t border-amber-200/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="text-center sm:text-left">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Conferment Date
              </span>
              <span className="font-semibold text-slate-700">{formattedDate}</span>
            </div>

            <div className="text-center sm:text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Presented by:
              </span>
              <span className="font-handwriting text-2xl font-bold text-rose-900 block leading-none">
                Always Your Brother — Abdaal Manzoor ❤️
              </span>
            </div>
          </div>
        </div>

        {/* 🌟 FINAL SURPRISE FEATURE FROM VIDEO 🌟 */}
        <div className="my-5 rounded-3xl bg-gradient-to-r from-rose-500/10 via-pink-500/15 to-amber-500/10 p-5 border-2 border-rose-300/80 shadow-md">
          <div className="flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-wider text-rose-900 mb-1">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>One Last Emotional Surprise For Amna</span>
          </div>
          <p className="text-xs text-slate-600 mb-3">
            Your brother has prepared a heartfelt message just for you.
          </p>
          <button
            onClick={() => setShowFinalSurprise(true)}
            className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 px-8 py-3.5 text-sm sm:text-base font-black text-white shadow-xl shadow-rose-500/35 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-rose-300"
          >
            <Gift className="h-5 w-5 animate-bounce" />
            <span>Continue To The Final Surprise 💌</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Main Download Button */}
          <button
            onClick={handleDownload}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-rose-600 to-pink-600 px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-rose-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
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

          {/* Fallback View / Mobile Save */}
          <button
            onClick={handleOpenPreview}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-5 py-3.5 text-xs font-semibold text-slate-700 border border-slate-200 hover:bg-rose-50 hover:text-rose-900 transition-colors shadow-xs cursor-pointer"
          >
            <ImageIcon className="h-4 w-4 text-rose-500" />
            <span>View Image / Save</span>
          </button>

          {/* Reset / Play Again */}
          <button
            onClick={onPlayAgain}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-rose-50 px-5 py-3.5 text-xs font-semibold text-rose-900 border border-rose-200 hover:bg-rose-100 transition-colors shadow-xs cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>🔄 Play Again</span>
          </button>
        </div>

        {/* Fallback Preview Modal for Mobile */}
        {showPreviewModal && previewDataUrl && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowPreviewModal(false)}
          >
            <div
              className="relative w-full max-w-xl rounded-3xl bg-white p-4 sm:p-6 shadow-2xl border border-rose-200 text-center"
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
                On mobile: Press and hold the image below to save it directly to your photos!
              </p>

              <div className="overflow-hidden rounded-2xl border-2 border-amber-200 shadow-md">
                <img
                  src={previewDataUrl}
                  alt="Best Sister Award Certificate"
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

        {/* 🎬 FINAL SURPRISE MODAL POPUP */}
        <FinalSurpriseModal
          isOpen={showFinalSurprise}
          onClose={() => setShowFinalSurprise(false)}
        />
      </div>
    </div>
  );
};
