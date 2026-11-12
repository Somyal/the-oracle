// ── The Resonance Field: Multi-Track Soundtrack Engine ──────────────────────────
// Powers the 6 generative tracks created with Hydrogen/Lyria with
// smooth crossfading, loop management, volume control, and tactile acoustic haptics.

export interface AudioTrack {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  frequencyTag: string;
}

export const ORACLE_SOUNDTRACK: AudioTrack[] = [
  {
    id: 'track-1',
    title: 'The Great Unmapped',
    subtitle: 'Deep Cosmic Soundscape',
    src: '/audio/The_Great_Unmapped.mp3',
    frequencyTag: '432 Hz // Continuum-α',
  },
  {
    id: 'track-2',
    title: 'The Weight of Ancient Light',
    subtitle: 'Transdimensional Apparatus',
    src: '/audio/The_Weight_of_Ancient_Light.mp3',
    frequencyTag: '528 Hz // Stellar Decay',
  },
  {
    id: 'track-3',
    title: "The Observatory's Heartbeat",
    subtitle: 'Clockwork Continuum Pulse',
    src: '/audio/The_Observatory_s_Heartbeat.mp3',
    frequencyTag: '108 Hz // Core Rhythm',
  },
  {
    id: 'track-4',
    title: 'Beyond the Unmapped Horizon',
    subtitle: 'Endless Event Horizon Drift',
    src: '/audio/Beyond_the_Unmapped_Horizon.mp3',
    frequencyTag: '216 Hz // Event Horizon',
  },
  {
    id: 'track-5',
    title: 'Cathedral of Long Night',
    subtitle: 'Aether Choral Reverberation',
    src: '/audio/Cathedral_of_Long_Night.mp3',
    frequencyTag: '396 Hz // Monastic Void',
  },
  {
    id: 'track-6',
    title: 'Under the Lead Lining',
    subtitle: 'Quantum Void & Geiger Flux',
    src: '/audio/Under_the_Lead_Lining.mp3',
    frequencyTag: '74 Hz // Sub-Bass Tension',
  },
];

export interface AudioState {
  isPlaying: boolean;
  currentTrackIndex: number;
  currentTrack: AudioTrack;
  volume: number;
}

type AudioListener = (state: AudioState) => void;

class ResonanceEngine {
  private audioCtx: AudioContext | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private currentTrackIndex = 0;
  private isPlaying = false;
  private volume = 0.65;
  private listeners: Set<AudioListener> = new Set();
  private fadeInterval: number | null = null;

  constructor() {
    // Initialized lazily upon first user gesture
  }

  private getAudioContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtx();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((l) => l(state));
  }

  public getState(): AudioState {
    return {
      isPlaying: this.isPlaying,
      currentTrackIndex: this.currentTrackIndex,
      currentTrack: ORACLE_SOUNDTRACK[this.currentTrackIndex] || ORACLE_SOUNDTRACK[0],
      volume: this.volume,
    };
  }

  public get isActive(): boolean {
    return this.isPlaying;
  }

  public get tracks(): AudioTrack[] {
    return ORACLE_SOUNDTRACK;
  }

  /**
   * Toggle between playing and dormant.
   */
  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  /**
   * Start playback of current track with smooth fade-in.
   */
  public play(): void {
    this.getAudioContext();
    const track = ORACLE_SOUNDTRACK[this.currentTrackIndex];
    if (!track) return;

    if (!this.currentAudio) {
      this.currentAudio = new Audio(track.src);
      this.currentAudio.loop = true;
      this.currentAudio.volume = 0;
    } else if (this.currentAudio.src !== window.location.origin + track.src) {
      this.currentAudio.src = track.src;
    }

    this.currentAudio
      .play()
      .then(() => {
        this.isPlaying = true;
        this.fadeIn(this.currentAudio!, this.volume, 1200);
        this.notify();
      })
      .catch(() => {
        this.isPlaying = false;
        this.notify();
      });
  }

  /**
   * Pause playback with smooth fade-out.
   */
  public pause(): void {
    if (!this.currentAudio) {
      this.isPlaying = false;
      this.notify();
      return;
    }

    this.fadeOut(this.currentAudio, 800, () => {
      this.currentAudio?.pause();
      this.isPlaying = false;
      this.notify();
    });
  }

  /**
   * Switch to a specific track index with crossfade.
   */
  public selectTrack(index: number): void {
    if (index < 0 || index >= ORACLE_SOUNDTRACK.length) return;
    if (index === this.currentTrackIndex && this.isPlaying) return;

    this.currentTrackIndex = index;
    const newTrack = ORACLE_SOUNDTRACK[index];

    if (!this.isPlaying) {
      // Just set track without playing
      if (this.currentAudio) {
        this.currentAudio.src = newTrack.src;
      }
      this.notify();
      return;
    }

    // Crossfade between outgoing track and incoming track
    const oldAudio = this.currentAudio;
    const newAudio = new Audio(newTrack.src);
    newAudio.loop = true;
    newAudio.volume = 0;

    newAudio
      .play()
      .then(() => {
        this.currentAudio = newAudio;
        this.fadeIn(newAudio, this.volume, 1500);

        if (oldAudio) {
          this.fadeOut(oldAudio, 1200, () => {
            oldAudio.pause();
            oldAudio.src = '';
          });
        }
        this.notify();
      })
      .catch(() => {
        this.currentAudio = newAudio;
        this.notify();
      });
  }

  public nextTrack(): void {
    const nextIdx = (this.currentTrackIndex + 1) % ORACLE_SOUNDTRACK.length;
    this.selectTrack(nextIdx);
  }

  public prevTrack(): void {
    const prevIdx =
      (this.currentTrackIndex - 1 + ORACLE_SOUNDTRACK.length) % ORACLE_SOUNDTRACK.length;
    this.selectTrack(prevIdx);
  }

  /**
   * Set master soundtrack volume (0 to 1).
   */
  public setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.currentAudio && this.isPlaying) {
      this.currentAudio.volume = this.volume;
    }
    this.notify();
  }

  private fadeIn(audio: HTMLAudioElement, targetVol: number, durationMs: number) {
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    const steps = 30;
    const interval = durationMs / steps;
    const volStep = targetVol / steps;
    let currentVol = 0;
    audio.volume = 0;

    this.fadeInterval = window.setInterval(() => {
      currentVol = Math.min(targetVol, currentVol + volStep);
      audio.volume = currentVol;
      if (currentVol >= targetVol) {
        if (this.fadeInterval) clearInterval(this.fadeInterval);
        this.fadeInterval = null;
      }
    }, interval);
  }

  private fadeOut(audio: HTMLAudioElement, durationMs: number, onComplete?: () => void) {
    const steps = 20;
    const interval = durationMs / steps;
    const currentVol = audio.volume;
    const volStep = currentVol / steps;
    let vol = currentVol;

    const timer = window.setInterval(() => {
      vol = Math.max(0, vol - volStep);
      audio.volume = vol;
      if (vol <= 0) {
        clearInterval(timer);
        onComplete?.();
      }
    }, interval);
  }

  // ── Tactical Audio Haptics (Oscillator clicks, chimes, and sweeps) ────────────

  public playTick(): void {
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.04);

      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // ignore
    }
  }

  public playChime(): void {
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;

      [440, 660, 880].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0.025 / (idx + 1), now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2 + idx * 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + 1.5);
      });
    } catch {
      // ignore
    }
  }

  public playEngage(): void {
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.6);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.05, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.85);
    } catch {
      // ignore
    }
  }
}

export const resonance = new ResonanceEngine();
