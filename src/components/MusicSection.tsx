import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, ExternalLink, Music, Sparkles } from 'lucide-react';
import { CONFIG } from '../config';
import { ambientAudio } from '../utils/audioHelper';

interface MusicSectionProps {
  onPlaybackChange?: (isPlaying: boolean) => void;
}

export const MusicSection: React.FC<MusicSectionProps> = ({ onPlaybackChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState('0:00');
  const [durationStr, setDurationStr] = useState('2:30');
  const [audioError, setAudioError] = useState(false);
  const [isSynthesizerMode, setIsSynthesizerMode] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthTimerRef = useRef<number | null>(null);
  const synthElapsedRef = useRef<number>(0);

  const rawUrl = CONFIG.songUrl?.trim() || '';
  const isPlaceholder = !rawUrl || rawUrl === 'SONG_URL_HERE';
  const isExternalYouTube = rawUrl.includes('youtube.com') || rawUrl.includes('youtu.be');

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  useEffect(() => {
    if (onPlaybackChange) {
      onPlaybackChange(isPlaying);
    }
  }, [isPlaying, onPlaybackChange]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (isPlaying) {
      // Pause
      if (isSynthesizerMode) {
        ambientAudio.stop();
        if (synthTimerRef.current) clearInterval(synthTimerRef.current);
      } else if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      // Play
      if (isPlaceholder || audioError) {
        // Fallback to calming soft piano lullaby synthesizer
        setIsSynthesizerMode(true);
        ambientAudio.start(isMuted ? 0 : volume);
        setIsPlaying(true);

        // Advance simulated progress for peaceful chime loop
        if (synthTimerRef.current) clearInterval(synthTimerRef.current);
        synthTimerRef.current = window.setInterval(() => {
          synthElapsedRef.current = (synthElapsedRef.current + 1) % 150;
          setProgress((synthElapsedRef.current / 150) * 100);
          setCurrentTimeStr(formatTime(synthElapsedRef.current));
        }, 1000);
      } else if (audioRef.current) {
        setIsSynthesizerMode(false);
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {
              // Fallback to synth if autoplay or audio decode fails
              setAudioError(true);
              setIsSynthesizerMode(true);
              ambientAudio.start(isMuted ? 0 : volume);
              setIsPlaying(true);
            });
        }
      }
    }
  };

  // Handle Volume Change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
    if (isSynthesizerMode) {
      ambientAudio.setVolume(newVol);
    }
  };

  // Handle Mute Toggle
  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.volume = volume;
      if (isSynthesizerMode) ambientAudio.setVolume(volume);
    } else {
      setIsMuted(true);
      if (audioRef.current) audioRef.current.volume = 0;
      if (isSynthesizerMode) ambientAudio.setVolume(0);
    }
  };

  // Handle Audio Progress & End
  const handleTimeUpdate = () => {
    if (audioRef.current && !isSynthesizerMode) {
      const curr = audioRef.current.currentTime;
      const dur = audioRef.current.duration || 1;
      setProgress((curr / dur) * 100);
      setCurrentTimeStr(formatTime(curr));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const dur = audioRef.current.duration;
      if (!isNaN(dur) && dur > 0) {
        setDurationStr(formatTime(dur));
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setProgress(val);
    if (audioRef.current && !isSynthesizerMode && audioRef.current.duration) {
      audioRef.current.currentTime = (val / 100) * audioRef.current.duration;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      ambientAudio.stop();
      if (synthTimerRef.current) clearInterval(synthTimerRef.current);
    };
  }, []);

  return (
    <section id="music" className="relative py-16 sm:py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-xl">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-800 mb-2">
            <span>Peaceful Melodies</span>
            <span aria-hidden="true" className="text-rose-400">·</span>
            <span>A Moment Of Calm</span>
          </div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl text-balance">
            A Song For This Moment 🎵
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
            Soft, gentle background music to accompany your reading.
          </p>
        </div>

        {/* Music Player Glass Container */}
        <div className="glass-card-elevated rounded-3xl p-6 sm:p-8 border border-rose-200/80 shadow-xl shadow-rose-100/40">
          {/* Cover / Vinyl graphic */}
          <div className="flex items-center gap-4 pb-6 border-b border-rose-100">
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-400 via-pink-400 to-amber-300 text-white shadow-md shadow-rose-300/40 overflow-hidden">
              <Music className={`h-8 w-8 ${isPlaying ? 'animate-pulse' : ''}`} />
              <div className="absolute inset-0 bg-white/10" />
            </div>

            <div className="min-w-0 flex-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-700">
                {isSynthesizerMode || isPlaceholder ? 'Acoustic Music Box Lullaby' : 'Selected Sibling Song'}
              </span>
              <h3 className="font-display text-lg font-bold text-slate-900 truncate">
                {CONFIG.songTitle}
              </h3>
              <p className="text-xs text-slate-500 truncate">
                Dedicated to {CONFIG.sisterName} by {CONFIG.brotherName.split(' ')[0]}
              </p>
            </div>
          </div>

          {/* Progress Bar & Timestamps */}
          <div className="pt-6">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-rose-100 accent-rose-500 focus:outline-none"
              aria-label="Audio progress bar"
            />
            <div className="mt-2 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>{currentTimeStr}</span>
              <span>{durationStr}</span>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="mt-6 flex items-center justify-between gap-4">
            {/* Volume controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="h-9 w-9 rounded-full bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-900 flex items-center justify-center transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="h-1.5 w-16 sm:w-20 cursor-pointer appearance-none rounded-lg bg-slate-200 accent-rose-500"
                aria-label="Volume slider"
              />
            </div>

            {/* Central Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-rose-200"
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6 fill-white" />
              ) : (
                <Play className="h-6 w-6 fill-white ml-0.5" />
              )}
            </button>

            {/* External link fallback or note */}
            <div>
              {isExternalYouTube ? (
                <a
                  href={rawUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-800 hover:bg-rose-100 transition-colors"
                >
                  <span>Open Song</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <div className="flex items-center gap-1 text-[11px] text-rose-800/80 font-medium">
                  <Sparkles className="h-3 w-3 text-rose-500" />
                  <span className="hidden sm:inline">Gentle Chimes</span>
                </div>
              )}
            </div>
          </div>

          {/* Autoplay & Audio Note */}
          <div className="mt-6 pt-4 border-t border-rose-100/70 text-center">
            <span className="text-[11px] text-slate-400">
              {isPlaceholder
                ? 'Plays a gentle soft piano lullaby. (You can customize with any MP3/YouTube link in config)'
                : 'Click play whenever you are ready.'}
            </span>
          </div>

          {/* Hidden HTML Audio element for custom direct audio URL */}
          {!isPlaceholder && !isExternalYouTube && (
            <audio
              ref={audioRef}
              src={rawUrl}
              preload="metadata"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              onError={() => setAudioError(true)}
            />
          )}
        </div>
      </div>
    </section>
  );
};
