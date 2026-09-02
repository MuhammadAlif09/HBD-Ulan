"use client";

import { useEffect, type ReactNode } from "react";
import { useApp } from "@/lib/store";
import { SmoothScroll } from "./SmoothScroll";
import { AchievementToaster } from "./AchievementToaster";

/**
 * Sinkronkan state theme/mood/locked ke atribut <html> supaya CSS variable ikut berubah
 * (transisi warna 0.35s ada di globals.css — tidak instan/kedip).
 */
function HtmlAttributeSync() {
  const theme = useApp((s) => s.theme);
  const mood = useApp((s) => s.mood);
  const unlocked = useApp((s) => s.unlocked);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    html.setAttribute("data-mood", mood);
    html.setAttribute("data-locked", unlocked ? "false" : "true");
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (meta) meta.content = theme === "dark" ? "#1c1620" : "#fbf5f0";
  }, [theme, mood, unlocked]);

  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <HtmlAttributeSync />
      <SmoothScroll>{children}</SmoothScroll>
      <AchievementToaster />
    </>
  );
}
