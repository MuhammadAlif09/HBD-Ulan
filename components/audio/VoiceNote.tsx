"use client";

import { Mic, Pause, Play, Sparkles } from "lucide-react";
import { voiceNote } from "@/data/content";
import { useAudio, audio } from "@/lib/audio/engine";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/cn";

export function VoiceNote() {
  const voicePlaying = useAudio((s) => s.voicePlaying);
  const voiceUnavailable = useAudio((s) => s.voiceUnavailable);
  const unlockAchievement = useApp((s) => s.unlockAchievement);

  const handleToggle = () => {
    audio().toggleVoice();
    if (!voicePlaying) {
      unlockAchievement("voice-note");
    }
  };

  return (
    <div className="mx-auto my-8 max-w-sm px-4">
      <div className="glass-strong relative overflow-hidden rounded-2xl p-4 shadow-soft transition-all duration-300 hover:shadow-glow border border-white/50 dark:border-white/10">
        <div className="flex items-center gap-3.5">
          {/* Play / Pause Voice Button */}
          <button
            type="button"
            onClick={handleToggle}
            disabled={voiceUnavailable}
            aria-label={voicePlaying ? "Jeda voice note" : "Putar voice note"}
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-300 shadow-md",
              voicePlaying
                ? "bg-pink-deep text-white scale-105 animate-pulse"
                : "bg-gradient-to-tr from-pink to-lavender text-foreground hover:scale-105 active:scale-95",
              voiceUnavailable && "opacity-50 cursor-not-allowed",
            )}
          >
            {voicePlaying ? (
              <Pause className="h-5 w-5 fill-current" />
            ) : (
              <Play className="h-5 w-5 fill-current ml-0.5" />
            )}
          </button>

          {/* Voice Note Info & Simulated Waveform */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <Mic className="h-3.5 w-3.5 text-pink-deep" />
                {voiceNote.label}
              </span>
              <span className="text-[10px] font-medium text-muted">{voiceNote.duration}</span>
            </div>

            {/* Audio Wave Visualizer */}
            <div className="mt-2 flex items-center gap-[3px] h-5">
              {[6, 12, 18, 10, 16, 22, 14, 8, 16, 20, 12, 18, 10, 14, 6, 16, 20, 12].map((height, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-[3px] rounded-full transition-all duration-200",
                    voicePlaying
                      ? "bg-pink-deep animate-eq"
                      : "bg-muted/40",
                  )}
                  style={{
                    height: `${height}px`,
                    animationDelay: `${(i % 5) * 120}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {voiceUnavailable && (
          <p className="mt-2 text-center text-[10px] text-muted italic">
            File audio voice note belum dimasukkan ke public/assets/audio/
          </p>
        )}
      </div>
    </div>
  );
}
