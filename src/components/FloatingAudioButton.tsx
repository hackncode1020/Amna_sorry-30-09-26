import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Music, ExternalLink, Upload, X, Play, Pause } from 'lucide-react';
import { ambientAudio } from '../utils/ambientAudio';

export const FloatingAudioButton: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [trackName, setTrackName] = useState('Apa Fer Milaange — Savi Kahlon');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const INSTAGRAM_AUDIO_URL =
    'https://www.instagram.com/reels/audio/197826800066109?stkn=MXZhYWszZ3lkdG42NA==';

  const handleToggle = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const newState = ambientAudio.toggle();
    setIsPlaying(newState);

    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(25);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setTrackName(file.name.replace(/\.[^/.]+$/, ''));
      ambientAudio.setCustomAudioTrack(objectUrl);
      setIsPlaying(true);
    }
  };

  return (
    <>
      {/* Floating Speaker / Music Button at bottom-right (matching screenshot) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 select-none">
        {/* Animated Playing Pill Indicator */}
        {isPlaying && (
          <div
            onClick={() => setShowPlayerModal(true)}
            className="flex items-center gap-1.5 rounded-full bg-slate-900/90 py-1 px-3 text-[10px] font-bold text-rose-200 shadow-lg backdrop-blur-xs cursor-pointer hover:bg-slate-900 transition-all border border-rose-500/30 animate-fade-in"
          >
            <span className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-rose-400 rounded-full animate-bounce" style={{ height: '60%' }} />
              <span className="w-0.5 bg-rose-400 rounded-full animate-bounce" style={{ height: '100%', animationDelay: '0.15s' }} />
              <span className="w-0.5 bg-rose-400 rounded-full animate-bounce" style={{ height: '40%', animationDelay: '0.3s' }} />
            </span>
            <span className="truncate max-w-[110px]">Apa Fer Milaange</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* Info / Player popup button */}
          <button
            onClick={() => setShowPlayerModal(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-rose-600 border border-rose-200/90 shadow-md hover:bg-rose-50 transition-all cursor-pointer"
            title="Music Settings"
            aria-label="Music Settings"
          >
            <Music className="h-4 w-4" />
          </button>

          {/* Main Speaker Toggle */}
          <button
            onClick={handleToggle}
            className={`flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none ${
              isPlaying
                ? 'bg-rose-500 text-white border-white shadow-rose-500/40 animate-pulse'
                : 'bg-white/95 text-rose-600 border-rose-200/90 shadow-rose-200/50 hover:bg-rose-50'
            }`}
            aria-label={isPlaying ? 'Mute background music' : 'Play peaceful background music'}
            title={isPlaying ? 'Mute Music' : 'Play Music'}
          >
            {isPlaying ? (
              <Volume2 className="h-5 w-5" />
            ) : (
              <VolumeX className="h-5 w-5 opacity-70" />
            )}
          </button>
        </div>
      </div>

      {/* Music Player Sheet / Modal for "Apa Fer Milaange" */}
      {showPlayerModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowPlayerModal(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-3xl bg-white p-5 sm:p-6 shadow-2xl border-2 border-rose-200 text-center animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPlayerModal(false)}
              className="absolute top-3.5 right-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer"
              aria-label="Close music panel"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Song Cover Graphic */}
            <div className="mx-auto my-3 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 text-white shadow-lg shadow-rose-500/30">
              <Music className="h-10 w-10 animate-gentle-float" />
            </div>

            <h3 className="font-display text-lg font-bold text-slate-900 leading-tight">
              Apa Fer Milaange
            </h3>
            <p className="text-xs text-rose-800 font-semibold mt-0.5">
              Savi Kahlon & The Masterz
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Background Apology Song for Sister Amna 🌸
            </p>

            {/* Playback Controls */}
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={handleToggle}
                className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-rose-700 active:scale-95 transition-all cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-4 w-4" />
                    <span>Pause Music</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    <span>Play Music</span>
                  </>
                )}
              </button>
            </div>

            {/* Instagram Audio Link Button */}
            <div className="mt-4 pt-3 border-t border-rose-100 flex flex-col gap-2">
              <a
                href={INSTAGRAM_AUDIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:opacity-95 transition-opacity"
              >
                <span>Open on Instagram Reels</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              {/* Upload Custom Audio option */}
              <input
                type="file"
                ref={fileInputRef}
                accept="audio/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-rose-50 px-4 py-1.5 text-[11px] font-semibold text-rose-900 hover:bg-rose-100 transition-colors border border-rose-200"
              >
                <Upload className="h-3 w-3" />
                <span>Choose Custom Audio (.mp3)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
