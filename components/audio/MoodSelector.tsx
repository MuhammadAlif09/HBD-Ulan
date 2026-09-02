"use client";

import { moods, type MoodId } from "@/data/content";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/cn";
import { Sparkle } from "@/components/illustrations/Ornaments";

export function MoodSelector() {
  const currentMood = useApp((s) => s.mood);
  const setMood = useApp((s) => s.setMood);

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-widest text-muted">
        <Sparkle className="h-3 w-3 text-pink-deep" />
        Pilih Suasana (Mood)
      </p>
      <div className="glass-strong inline-flex items-center gap-1 rounded-full p-1 shadow-soft border border-white/40 dark:border-white/10">
        {moods.map((m) => {
          const active = currentMood === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setMood(m.id as MoodId)}
              title={m.description}
              className={cn(
                "relative rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300",
                active
                  ? "bg-pink-deep text-white shadow-sm font-semibold scale-105"
                  : "text-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5",
              )}
            >
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
