"use client";

import { useState } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Disc3,
  Sparkles,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { tracks, type Track } from "@/data/content";
import { useAudio, audio } from "@/lib/audio/engine";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/cn";

export function MusicPlayer() {
  const [expanded, setExpanded] = useState(false);
  const currentId = useAudio((s) => s.currentId);
  const playing = useAudio((s) => s.playing);
  const volume = useAudio((s) => s.volume);
  const progress = useAudio((s) => s.progress);
  const seek = useAudio((s) => s.seek);
  const duration = useAudio((s) => s.duration);
  const unavailable = useAudio((s) => s.unavailable);
  const voicePlaying = useAudio((s) => s.voicePlaying);

  const unlockAchievement = useApp((s) => s.unlockAchievement);

  const currentTrack: Track = tracks.find((t) => t.id === currentId) ?? tracks[0]!;
  const isCurrentUnavailable = unavailable.includes(currentId);

  const handleToggle = () => {
    audio().toggle();
  };

  const handleSwitch = (id: string) => {
    audio().switchTo(id);
    unlockAchievement("first-song-change");
  };

  const handleNext = () => {
    const idx = tracks.findIndex((t) => t.id === currentId);
    const nextIdx = (idx + 1) % tracks.length;
    handleSwitch(tracks[nextIdx]!.id);
  };

  const handlePrev = () => {
    const idx = tracks.findIndex((t) => t.id === currentId);
    const prevIdx = (idx - 1 + tracks.length) % tracks.length;
    handleSwitch(tracks[prevIdx]!.id);
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <aside
      aria-label="Music player"
      className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40 max-w-[calc(100vw-1.5rem)] sm:max-w-sm"
    >
      <div className="glass-strong rounded-2xl p-3 shadow-glow transition-all duration-300 border border-white/40 dark:border-white/10">
        {/* Compact Mini Bar */}
        <div className="flex items-center justify-between gap-3">
          <div
            role="button"
            tabIndex={0}
            onClick={() => setExpanded(!expanded)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setExpanded(!expanded);
              }
            }}
            className="flex min-w-0 flex-1 cursor-pointer items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-deep"
          >
            {/* Spinning Disc / Vinyl Icon */}
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-pink to-lavender p-1 shadow-sm">
              <Disc3
                className={cn(
                  "h-6 w-6 text-foreground/80 transition-transform duration-700",
                  playing && "animate-[spin_4s_linear_infinite]",
                )}
              />
              {voicePlaying && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-pink-deep text-[8px] text-white">
                  ●
                </span>
              )}
            </div>

            {/* Track Info */}
            <div className="min-w-0 text-left">
              <p className="truncate text-xs font-semibold text-foreground">
                {currentTrack.title}
              </p>
              <p className="truncate text-[10px] text-muted">{currentTrack.artist}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Equalizer Visualizer Bars */}
            {playing && (
              <div className="flex items-end gap-[2px] h-4 px-1.5 py-0.5">
                <span className="w-[3px] bg-pink-deep rounded-full animate-eq h-full" style={{ animationDelay: "0ms" }} />
                <span className="w-[3px] bg-lavender-deep rounded-full animate-eq h-3/4" style={{ animationDelay: "200ms" }} />
                <span className="w-[3px] bg-pink rounded-full animate-eq h-full" style={{ animationDelay: "400ms" }} />
              </div>
            )}

            <button
              type="button"
              onClick={handleToggle}
              disabled={isCurrentUnavailable}
              aria-label={playing ? "Jeda musik" : "Putar musik"}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-deep text-white shadow-sm transition hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {playing ? <Pause className="h-4 w-4 fill-white" /> : <Play className="h-4 w-4 fill-white ml-0.5" />}
            </button>

            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              aria-label={expanded ? "Tutup playlist" : "Buka playlist"}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Progress Line */}
        <div
          role="slider"
          aria-label="Seek time"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          tabIndex={0}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const ratio = (e.clientX - rect.left) / rect.width;
            audio().seekTo(ratio);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") audio().seekTo(Math.min(1, progress + 0.05));
            if (e.key === "ArrowLeft") audio().seekTo(Math.max(0, progress - 0.05));
          }}
          className="relative mt-2 h-1.5 w-full cursor-pointer rounded-full bg-line overflow-hidden focus-visible:ring-2 focus-visible:ring-pink-deep"
        >
          <div
            className="h-full bg-gradient-to-r from-pink to-lavender-deep transition-all duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Expanded Drawer (Playlist & Detailed Controls) */}
        {expanded && (
          <div className="mt-3 border-t border-line/60 pt-3 space-y-3">
            {/* Time / Duration info */}
            <div className="flex justify-between text-[10px] text-muted px-0.5">
              <span>{formatTime(seek)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            {/* Next / Previous & Volume Buttons */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Lagu sebelumnya"
                  className="p-1 text-muted hover:text-foreground transition"
                >
                  <SkipBack className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Lagu berikutnya"
                  className="p-1 text-muted hover:text-foreground transition"
                >
                  <SkipForward className="h-4 w-4" />
                </button>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => audio().setVolume(volume > 0 ? 0 : 0.45)}
                  aria-label={volume === 0 ? "Bunyikan musik" : "Bisukan musik"}
                  className="text-muted hover:text-foreground"
                >
                  {volume === 0 ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => audio().setVolume(parseFloat(e.target.value))}
                  aria-label="Volume musik"
                  className="h-1 w-16 accent-pink-deep"
                />
              </div>
            </div>

            {/* Playlist Track Chips */}
            <div>
              <p className="mb-1.5 text-[10px] uppercase tracking-wider font-semibold text-muted">
                Daftar Lagu (LANY)
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                {tracks.map((t) => {
                  const isSelected = t.id === currentId;
                  const isUnavail = unavailable.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleSwitch(t.id)}
                      disabled={isUnavail}
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[11px] font-medium transition",
                        isSelected
                          ? "bg-pink-deep text-white shadow-sm"
                          : "bg-background-elevated hover:bg-pink/20 text-foreground/80",
                        isUnavail && "opacity-40 line-through cursor-not-allowed",
                      )}
                    >
                      {t.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
