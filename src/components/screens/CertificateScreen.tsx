import React, { useState, useEffect, useRef } from 'react';
import { downloadCertificate, generateCertificateDataUrl } from '../../utils/certificateGenerator';
import { confetti } from '../../utils/confetti';
import { Download, RotateCcw, Sparkles, Heart, Award, Check, Image as ImageIcon, X, Edit3, Trophy } from 'lucide-react';

interface CertificateScreenProps {
  sisterName: string;
  onUpdateSisterName: (name: string) => void;
  onPlayAgain: () => void;
}

export const CertificateScreen: React.FC<CertificateScreenProps> = ({
  sisterName,
  onUpdateSisterName,
  onPlayAgain,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(sisterName || 'THE BEST SISTER');

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  const certificateData = {
    sisterName: sisterName.trim() || 'THE BEST SISTER',
    dateStr: formattedDate,
    level: 'LEGENDARY SISTER 🏆',
  };

  const handleDownload = () => {
    // Fire festive sparkles
    confetti.fire('gold', 50);

    const result = downloadCertificate(certificateData);
    setPreviewDataUrl(result.dataUrl);

    if (result.success) {
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } else {
      // Direct download might have been blocked by sandbox iframe: open fallback view
      setShowPreviewModal(true);
    }
  };

  const handleOpenPreview = () => {
    const url = generateCertificateDataUrl(certificateData);
    setPreviewDataUrl(url);
    setShowPreviewModal(true);
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSisterName(nameInput.trim() || 'THE BEST SISTER');
    setIsEditingName(false);
  };

  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center px-3 sm:px-6 py-8 text-center animate-fade-in">
      <div className="w-full max-w-2xl">
        {/* Banner */}
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-4 py-1 text-xs font-black uppercase tracking-wider text-amber-900 border border-amber-300">
          <Sparkles className="h-3.5 w-3.5 text-amber-600" />
          <span>Official Award Certificate</span>
        </div>

        <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-wide">
          The Best Sister in the World 🏆
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Earned through love, laughter, and conquering every sibling challenge.
        </p>

        {/* Name Customization Trigger (Discreet & helpful) */}
        <div className="my-3 flex items-center justify-center gap-2">
          {!isEditingName ? (
            <button
              onClick={() => setIsEditingName(true)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 hover:text-rose-900 hover:underline"
            >
              <Edit3 className="h-3 w-3" />
              <span>Personalize Name on Award: <strong>{sisterName || 'THE BEST SISTER'}</strong></span>
            </button>
          ) : (
            <form onSubmit={handleSaveName} className="flex items-center gap-2">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Enter sister's name"
                className="rounded-full border border-rose-300 px-3 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-300"
                autoFocus
              />
              <button
                type="submit"
                className="rounded-full bg-rose-600 px-3 py-1 text-xs font-bold text-white shadow-xs hover:bg-rose-700"
              >
                Save
              </button>
            </form>
          )}
        </div>

        {/* DIGITAL AWARD CERTIFICATE (Visual Screen Representation) */}
        <div className="relative my-4 rounded-3xl bg-[#FFFDF9] p-6 sm:p-10 shadow-2xl border-4 border-amber-300 text-center overflow-hidden">
          {/* Subtle Golden Inner Border */}
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
            ★ OFFICIAL CERTIFICATE OF RECOGNITION ★
          </div>

          <h3 className="relative z-10 font-cinzel text-xl sm:text-3xl font-black text-rose-950 tracking-wider mt-1">
            🏆 BEST SISTER AWARD 🏆
          </h3>

          <p className="relative z-10 mt-3 text-xs sm:text-sm text-slate-500 italic">
            This certificate is proudly presented to
          </p>

          {/* Sister Name Banner */}
          <div className="relative z-10 my-3 mx-auto max-w-md rounded-2xl bg-amber-50/80 py-2.5 px-4 border border-amber-200/80">
            <span className="font-display text-xl sm:text-3xl font-extrabold text-rose-900 block tracking-tight">
              {sisterName.trim() || 'THE BEST SISTER'}
            </span>
          </div>

          {/* Citation Body */}
          <p className="relative z-10 text-xs sm:text-sm text-slate-700 leading-relaxed max-w-lg mx-auto">
            For successfully completing the Sister Challenge and proving that she deserves the title of{' '}
            <strong className="text-rose-950 font-bold">BEST SISTER</strong>.
          </p>

          {/* Level Pill */}
          <div className="relative z-10 mt-4 inline-flex items-center gap-1 rounded-full bg-rose-50 px-4 py-1 text-xs font-bold text-rose-900 border border-rose-200">
            <span>⭐ Sister Level: LEGENDARY ⭐</span>
          </div>

          {/* Wax Seal Graphic & Signatures */}
          <div className="relative z-10 mt-8 pt-6 border-t border-amber-200/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            {/* Date */}
            <div className="text-center sm:text-left">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Conferment Date
              </span>
              <span className="font-semibold text-slate-700">{formattedDate}</span>
            </div>

            {/* Seal Graphic */}
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 border-2 border-amber-200 text-amber-950 shadow-md">
                <Award className="h-6 w-6" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-wider text-amber-800 mt-1">
                SEALED & VERIFIED
              </span>
            </div>

            {/* Signature */}
            <div className="text-center sm:text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Presented by
              </span>
              <span className="font-handwriting text-2xl font-bold text-rose-900 block leading-none">
                Your Brother ❤️
              </span>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
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

          {/* View / Fallback Preview Button */}
          <button
            onClick={handleOpenPreview}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-5 py-3.5 text-xs font-semibold text-slate-700 border border-slate-200 hover:bg-rose-50 hover:text-rose-900 transition-colors shadow-xs"
          >
            <ImageIcon className="h-4 w-4 text-rose-500" />
            <span>View Image / Mobile Save</span>
          </button>

          {/* Play Again Button */}
          <button
            onClick={onPlayAgain}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-rose-50 px-5 py-3.5 text-xs font-semibold text-rose-900 border border-rose-200 hover:bg-rose-100 transition-colors shadow-xs"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>🔄 Play Again</span>
          </button>
        </div>

        <p className="mt-3 text-[11px] text-slate-400">
          Generated as a crisp high-res image directly in your browser. No sign-up or backend required.
        </p>

        {/* Mobile / Fallback Preview Modal */}
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
                className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                aria-label="Close preview"
              >
                <X className="h-4 w-4" />
              </button>

              <h4 className="font-cinzel text-lg font-bold text-slate-900 mb-1">
                Your Official Award Image
              </h4>
              <p className="text-xs text-slate-500 mb-3">
                On mobile browsers: Press and hold the image to save it directly to your photos.
              </p>

              {/* Rendered Image Preview */}
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
                  download={`Best-Sister-Award-${certificateData.sisterName.replace(/\s+/g, '-')}.png`}
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
