"use client";

import { useEffect } from "react";
import { Sparkles } from "lucide-react";
import { useApp } from "@/lib/store";
import { achievements } from "@/data/content";

/**
 * Toast kecil non-blocking di pojok layar (lihat skills/interactive-cards.md).
 * Auto-hilang ~3 detik, tidak pernah butuh ditutup manual.
 */
export function AchievementToaster() {
  const toasts = useApp((s) => s.toasts);
  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[90] flex flex-col items-center gap-2 px-4 sm:items-end sm:pr-6"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} id={t.id} achievementId={t.achievement} />
      ))}
    </div>
  );
}

function ToastItem({ id, achievementId }: { id: number; achievementId: keyof typeof achievements }) {
  const dismiss = useApp((s) => s.dismissToast);
  const a = achievements[achievementId];

  useEffect(() => {
    const timer = setTimeout(() => dismiss(id), 3200);
    return () => clearTimeout(timer);
  }, [id, dismiss]);

  return (
    <div
      role="status"
      className="glass-strong toast-in flex w-full max-w-xs items-center gap-3 rounded-2xl px-4 py-3 shadow-soft"
    >
      <span className="glossy flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
        <Sparkles className="h-4 w-4" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">Achievement</p>
        <p className="truncate text-sm font-semibold">{a.title}</p>
        <p className="truncate text-xs text-muted">{a.detail}</p>
      </div>
    </div>
  );
}
