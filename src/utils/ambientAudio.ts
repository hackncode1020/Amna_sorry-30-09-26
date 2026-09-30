/**
 * Ambient & Music Player for Amna's Apology Experience
 * Features:
 * - Direct playback of the Instagram song "Apa Fer Milaange" (Savi Kahlon & The Masterz)
 * - Custom user MP3 audio playback
 * - Built-in zero-latency soothing Web Audio melody generator fallback
 */

class AmbientAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;
  private gainNode: GainNode | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private customAudioUrl: string | null = null;

  // Emotional harmonic notes (Apa Fer Milaange melody theme)
  private chords = [
    [261.63, 329.63, 392.0, 523.25], // C maj
    [220.0, 261.63, 329.63, 440.0],  // A min
    [174.61, 261.63, 329.63, 392.0], // F maj
    [196.0, 246.94, 293.66, 392.0],  // G maj
  ];

  private currentChord = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      const savedAudio = localStorage.getItem('amna_custom_song_url');
      if (savedAudio) {
        this.customAudioUrl = savedAudio;
      }
    }
  }

  public init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(0.14, this.ctx.currentTime);
        this.gainNode.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setCustomAudioTrack(url: string) {
    this.customAudioUrl = url;
    localStorage.setItem('amna_custom_song_url', url);
    if (this.isPlaying) {
      this.stop();
      this.start();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.init();
    this.isPlaying = true;

    // Check if custom audio URL exists or try local audio
    const trackUrl = this.customAudioUrl || '/audio/apa-fer-milaange.mp3';

    if (!this.audioElement && typeof window !== 'undefined') {
      this.audioElement = new Audio();
      this.audioElement.loop = true;
      this.audioElement.volume = 0.65;
    }

    if (this.audioElement) {
      this.audioElement.src = trackUrl;
      const playPromise = this.audioElement.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If external file fails or isn't present, smoothly fall back to Web Audio melody
          this.startWebAudioMelody();
        });
        return;
      }
    }

    this.startWebAudioMelody();
  }

  private startWebAudioMelody() {
    if (!this.ctx || !this.gainNode) return;
    this.playChordNotes();

    if (this.intervalId === null) {
      this.intervalId = window.setInterval(() => {
        this.playChordNotes();
      }, 2400);
    }
  }

  private playChordNotes() {
    if (!this.ctx || !this.gainNode) return;

    const chord = this.chords[this.currentChord];
    this.currentChord = (this.currentChord + 1) % this.chords.length;

    chord.forEach((freq, idx) => {
      const noteDelay = idx * 0.28;
      this.playSingleNote(freq, noteDelay);
    });
  }

  private playSingleNote(freq: number, delay: number) {
    if (!this.ctx || !this.gainNode) return;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);

    const now = this.ctx.currentTime + delay;
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.18, now + 0.08);
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

    osc.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc.start(now);
    osc.stop(now + 2.3);
  }

  public stop() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCustomAudioUrl(): string | null {
    return this.customAudioUrl;
  }
}

export const ambientAudio = new AmbientAudioPlayer();
