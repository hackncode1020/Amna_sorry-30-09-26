/**
 * Ambient Audio Helper
 * Provides a gentle, calming Web Audio synthesizer lullaby fallback
 * when no custom audio URL is configured.
 */

class AmbientLullabyEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;
  private gainNode: GainNode | null = null;

  // Gentle pentatonic scale in C major / A minor
  private readonly notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
  private currentStep = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public start(volume: number = 0.5) {
    try {
      this.initContext();
      if (!this.ctx) return;
      this.isPlaying = true;

      // Master gain
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(volume * 0.25, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);

      // Play soft soothing chimes every 1.4 seconds
      const pattern = [0, 2, 4, 3, 5, 4, 2, 1, 0, 3, 5, 7, 5, 4, 2, 0];
      
      const playChime = () => {
        if (!this.ctx || !this.isPlaying || !this.gainNode) return;
        const noteIdx = pattern[this.currentStep % pattern.length];
        const freq = this.notes[noteIdx % this.notes.length];
        this.currentStep++;

        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        // Soft sine wave with subtle triangle harmonic for warm acoustic music box feel
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        const now = this.ctx.currentTime;
        noteGain.gain.setValueAtTime(0, now);
        noteGain.gain.linearRampToValueAtTime(0.4, now + 0.1);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

        osc.connect(noteGain);
        noteGain.connect(this.gainNode);

        osc.start(now);
        osc.stop(now + 2.3);
      };

      playChime();
      this.intervalId = window.setInterval(playChime, 1400);
    } catch {
      // Audio autoplay or web audio restriction handled gracefully
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.gainNode && this.ctx) {
      try {
        this.gainNode.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
      } catch {
        // Safe catch
      }
    }
  }

  public setVolume(volume: number) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(volume * 0.25, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const ambientAudio = new AmbientLullabyEngine();
