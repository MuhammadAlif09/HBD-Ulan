"use client";

import { Howl, Howler } from "howler";
import { create } from "zustand";
import { tracks, voiceNote, ambient, type Track } from "@/data/content";

/**
 * Audio engine — Howler.js (lihat skills/music-player.md).
 * - Music: auto-loop per track, default volume 0.45, ganti track = crossfade
 * - Voice note: duck music (turunkan volume, bukan pause)
 * - Ambient: volume rendah ~0.15-0.2, music di-duck sedikit saat ambient main
 * - File hilang → onloaderror → track ditandai unavailable, UI tetap jalan
 */

export const MUSIC_VOLUME = 0.45;
const DUCK_VOICE = 0.12;
const DUCK_AMBIENT = 0.3;
const FADE_MS = 900;

interface AudioState {
  currentId: string;
  playing: boolean;
  volume: number; // user-set (0..1)
  progress: number; // 0..1
  duration: number; // detik
  seek: number; // detik
  unavailable: string[]; // track id yang file-nya gagal load
  voicePlaying: boolean;
  voiceUnavailable: boolean;
  started: boolean; // pernah play (untuk autoplay policy)
}

export const useAudio = create<AudioState>(() => ({
  currentId: tracks[0]?.id ?? "",
  playing: false,
  volume: MUSIC_VOLUME,
  progress: 0,
  duration: 0,
  seek: 0,
  unavailable: [],
  voicePlaying: false,
  voiceUnavailable: false,
  started: false,
}));

const set = useAudio.setState;
const get = useAudio.getState;

class Engine {
  private howls = new Map<string, Howl>();
  private current: Howl | null = null;
  private voice: Howl | null = null;
  private ambients = new Map<string, Howl>();
  private raf = 0;
  private duckLevel = 1; // multiplier
  private ambientDucks = new Set<string>();
  private endingFade = false;

  private effectiveVolume(): number {
    return get().volume * this.duckLevel;
  }

  private getHowl(track: Track): Howl {
    const existing = this.howls.get(track.id);
    if (existing) return existing;
    const howl = new Howl({
      src: [track.src],
      html5: true, // streaming; ringan untuk file mp3 besar di HP
      loop: true,
      volume: 0,
      preload: true,
      onloaderror: () => {
        set((s) => (s.unavailable.includes(track.id) ? s : { unavailable: [...s.unavailable, track.id] }));
        if (get().currentId === track.id) set({ playing: false });
      },
      onplayerror: () => {
        // autoplay policy — tunggu interaksi user lalu coba lagi
        howl.once("unlock", () => howl.play());
      },
      onload: () => {
        if (get().currentId === track.id) set({ duration: howl.duration() });
      },
    });
    this.howls.set(track.id, howl);
    return howl;
  }

  private tick = () => {
    const h = this.current;
    if (h && h.playing()) {
      const seek = Number(h.seek()) || 0;
      const duration = h.duration() || 0;
      set({ seek, duration, progress: duration ? seek / duration : 0 });
    }
    this.raf = requestAnimationFrame(this.tick);
  };

  private ensureTicker() {
    if (!this.raf) this.raf = requestAnimationFrame(this.tick);
  }

  /** Mulai / lanjutkan track aktif */
  play() {
    const track = tracks.find((t) => t.id === get().currentId) ?? tracks[0];
    if (!track) return;
    const howl = this.getHowl(track);
    this.current = howl;
    if (!howl.playing()) howl.play();
    howl.fade(howl.volume(), this.effectiveVolume(), FADE_MS);
    set({ playing: true, started: true });
    this.ensureTicker();
  }

  pause() {
    const h = this.current;
    if (!h) return;
    h.fade(h.volume(), 0, 500);
    setTimeout(() => {
      if (!get().playing) h.pause();
    }, 520);
    set({ playing: false });
  }

  toggle() {
    if (get().playing) this.pause();
    else this.play();
  }

  /** Crossfade ke track lain */
  switchTo(id: string) {
    if (id === get().currentId) return;
    const next = tracks.find((t) => t.id === id);
    if (!next) return;
    const prev = this.current;
    const wasPlaying = get().playing;
    set({ currentId: id, progress: 0, seek: 0 });

    if (prev) {
      prev.fade(prev.volume(), 0, FADE_MS);
      setTimeout(() => prev.stop(), FADE_MS + 40);
    }

    const howl = this.getHowl(next);
    this.current = howl;
    set({ duration: howl.duration() || 0 });
    if (wasPlaying || get().started) {
      howl.volume(0);
      howl.play();
      howl.fade(0, this.effectiveVolume(), FADE_MS);
      set({ playing: true, started: true });
      this.ensureTicker();
    }
  }

  setVolume(v: number) {
    const volume = Math.min(1, Math.max(0, v));
    set({ volume });
    this.current?.volume(volume * this.duckLevel);
  }

  seekTo(ratio: number) {
    const h = this.current;
    if (!h) return;
    const d = h.duration();
    if (!d) return;
    h.seek(Math.max(0, Math.min(d, ratio * d)));
  }

  private applyDuck(level: number) {
    this.duckLevel = level;
    const h = this.current;
    if (h && get().playing) h.fade(h.volume(), this.effectiveVolume(), 400);
  }

  private recomputeDuck() {
    if (this.endingFade) return;
    if (get().voicePlaying) this.applyDuck(DUCK_VOICE);
    else if (this.ambientDucks.size) this.applyDuck(DUCK_AMBIENT);
    else this.applyDuck(1);
  }

  /** Voice note — duck musik, jangan pause total */
  toggleVoice() {
    if (!this.voice) {
      this.voice = new Howl({
        src: [voiceNote.src],
        html5: true,
        volume: 0.9,
        onend: () => {
          set({ voicePlaying: false });
          this.recomputeDuck();
        },
        onloaderror: () => {
          set({ voiceUnavailable: true, voicePlaying: false });
          this.recomputeDuck();
        },
      });
    }
    if (get().voicePlaying) {
      this.voice.stop();
      set({ voicePlaying: false });
    } else {
      this.voice.play();
      set({ voicePlaying: true });
    }
    this.recomputeDuck();
  }

  /** Ambient sound per section — lazy, volume rendah, di-stop otomatis via stopAmbient */
  playAmbient(key: keyof typeof ambient, volume = 0.18) {
    if (this.ambients.has(key)) return;
    const src = ambient[key];
    const howl = new Howl({
      src: [src],
      html5: true,
      loop: key === "hero" || key === "cake",
      volume: 0,
      onloaderror: () => this.stopAmbient(key),
      onend: () => {
        if (!howl.loop()) this.stopAmbient(key);
      },
    });
    this.ambients.set(key, howl);
    howl.play();
    howl.fade(0, volume, 600);
    this.ambientDucks.add(key);
    this.recomputeDuck();
  }

  stopAmbient(key: keyof typeof ambient) {
    const h = this.ambients.get(key);
    if (h) {
      h.fade(h.volume(), 0, 500);
      setTimeout(() => {
        h.stop();
        h.unload();
      }, 520);
      this.ambients.delete(key);
    }
    this.ambientDucks.delete(key);
    this.recomputeDuck();
  }

  /** Ending: musik fade out perlahan (bukan berhenti mendadak) */
  fadeOutForEnding(ms = 6000) {
    const h = this.current;
    this.endingFade = true;
    if (!h) return;
    h.fade(h.volume(), 0.06, ms);
  }
  restoreFromEnding() {
    this.endingFade = false;
    this.recomputeDuck();
  }

  muteAll(muted: boolean) {
    Howler.mute(muted);
  }
}

let engine: Engine | null = null;
export function audio(): Engine {
  if (!engine) engine = new Engine();
  return engine;
}
