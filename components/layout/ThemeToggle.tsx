"use client";

import { Moon, Sun } from "lucide-react";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useApp((s) => s.theme);
  const toggle = useApp((s) => s.toggleTheme);
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
      aria-pressed={isDark}
      className={cn(
        "glossy relative flex h-11 w-11 items-center justify-center rounded-full",
        "focus-visible:outline-2",
        className,
      )}
    >
      <span className="relative block h-5 w-5">
        <Sun
          className={cn(
            "absolute inset-0 h-5 w-5 transition-all duration-400 ease-out",
            isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
          )}
          aria-hidden
        />
        <Moon
          className={cn(
            "absolute inset-0 h-5 w-5 transition-all duration-400 ease-out",
            isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0",
          )}
          aria-hidden
        />
      </span>
    </button>
  );
}
