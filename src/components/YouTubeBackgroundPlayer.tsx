import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, ExternalLink } from 'lucide-react';
import { ambientAudio } from '../utils/ambientAudio';

// Global singleton controller so any component (e.g. WelcomeScreen letter tap) can play the song
let globalPlaySong: (() => void) | null = null;
let globalPauseSong: (() => void) | null = null;
let globalIsPlaying = false;

export const playBackgroundSong = () => {
  if (globalPlaySong) {
    globalPlaySong();
  }
};

export const pauseBackgroundSong = () => {
  if (globalPauseSong) {
    globalPauseSong();
  }
};

export const getIsSongPlaying = () => globalIsPlaying;

const YOUTUBE_VIDEO_ID = 'uF3Reht8IPk'; // Apa Fer Milaange - Savi Kahlon
const START_TIME_SECONDS = 120; // Starts from 2 minutes (2:00 / 120s) as requested

export const YouTubeBackgroundPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const isLoadedRef = useRef(false);
  const hasSeekedRef = useRef(false);

  // Send command to YouTube iframe
  const sendCommand = (func: string, args: unknown = '') => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        '*'
      );
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    globalIsPlaying = true;

    // Seek to 2:00 (120s) on initial play
    if (!hasSeekedRef.current) {
      sendCommand('seekTo', [START_TIME_SECONDS, true]);
      hasSeekedRef.current = true;
    }

    sendCommand('playVideo');
    // Also trigger ambientAudio as smooth fallback
    ambientAudio.start();

    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(25);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    globalIsPlaying = false;
    sendCommand('pauseVideo');
    ambientAudio.stop();
  };

  const handleToggle = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  useEffect(() => {
    globalPlaySong = handlePlay;
    globalPauseSong = handlePause;
    return () => {
      globalPlaySong = null;
      globalPauseSong = null;
    };
  }, []);

  return (
    <>
      {/* Hidden YouTube Iframe Player set to start at 120 seconds (2:00) */}
      <div className="fixed -top-[9999px] -left-[9999px] opacity-0 pointer-events-none w-1 h-1 overflow-hidden">
        <iframe
          ref={iframeRef}
          id="yt-audio-player"
          title="Apa Fer Milaange Background Song"
          src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&start=${START_TIME_SECONDS}&playsinline=1&controls=0&loop=1&playlist=${YOUTUBE_VIDEO_ID}&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
          allow="autoplay"
          onLoad={() => {
            isLoadedRef.current = true;
            // Prime seek to 120s
            sendCommand('seekTo', [START_TIME_SECONDS, true]);
          }}
        />
      </div>

      {/* Floating Speaker / Music Player Button on bottom-right */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 select-none">
        {/* Animated Song Badge when playing */}
        {isPlaying && (
          <div
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 rounded-full bg-slate-900/90 py-1 px-3 text-[10px] font-bold text-rose-200 shadow-lg backdrop-blur-xs cursor-pointer hover:bg-slate-900 transition-all border border-rose-500/30 animate-fade-in"
          >
            <span className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-rose-400 rounded-full animate-bounce" style={{ height: '60%' }} />
              <span className="w-0.5 bg-rose-400 rounded-full animate-bounce" style={{ height: '100%', animationDelay: '0.15s' }} />
              <span className="w-0.5 bg-rose-400 rounded-full animate-bounce" style={{ height: '40%', animationDelay: '0.3s' }} />
            </span>
            <span className="truncate max-w-[125px]">Apa Fer Milaange 🎵 (2:00)</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* Mini info / modal button */}
          <button
            onClick={() => setShowModal(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-rose-600 border border-rose-200/90 shadow-md hover:bg-rose-50 transition-all cursor-pointer"
            title="Song Info"
            aria-label="Song Info"
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
            aria-label={isPlaying ? 'Mute background music' : 'Play background song'}
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

      {/* Music Card Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-3xl bg-white p-5 sm:p-6 shadow-2xl border-2 border-rose-200 text-center animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3.5 right-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer"
              aria-label="Close music panel"
            >
              ✕
            </button>

            {/* Song Cover Graphic */}
            <div className="mx-auto my-3 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 text-white shadow-lg shadow-rose-500/30">
              <Music className="h-10 w-10 animate-gentle-float" />
            </div>

            <h3 className="font-display text-lg font-bold text-slate-900 leading-tight">
              Apa Fer Milaange
            </h3>
            <p className="text-xs text-rose-800 font-semibold mt-0.5">
              Savi Kahlon | The Masterz
            </p>
            <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-[10px] font-semibold text-rose-700">
              <span>▶️ Starts from 2:00 (Chorus)</span>
            </div>

            {/* Play / Pause Toggle Button */}
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={handleToggle}
                className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-rose-700 active:scale-95 transition-all cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-4 w-4" />
                    <span>Pause Song</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    <span>Play Song (from 2:00) 🎵</span>
                  </>
                )}
              </button>
            </div>

            {/* YouTube Link */}
            <div className="mt-4 pt-3 border-t border-rose-100 flex flex-col gap-2">
              <a
                href={`https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}&t=120s`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-red-700 transition-colors"
              >
                <span>Watch on YouTube (at 2:00)</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
