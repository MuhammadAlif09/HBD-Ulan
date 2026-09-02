"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";
import { Lock, Sparkles } from "lucide-react";
import { useApp } from "@/lib/store";
import { audio } from "@/lib/audio/engine";
import { useGsap } from "@/hooks/useGsap";
import { unlock } from "@/data/content";
import { cn } from "@/lib/cn";
import { CatEars, Star } from "@/components/illustrations/Ornaments";

function normalize(v: string) {
  return v.replace(/\s+/g, "").toLowerCase();
}

/**
 * Unlock screen — momen ritual pertama (klik dengan niat).
 * Saat benar: overlay "tirai" naik seperti film dimulai, musik default mulai (user gesture = aman
 * untuk autoplay policy), achievement "Film Dimulai".
 */
export function Unlock() {
  const unlocked = useApp((s) => s.unlocked);
  const setUnlocked = useApp((s) => s.setUnlocked);
  const achieve = useApp((s) => s.unlockAchievement);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const ref = useGsap<HTMLDivElement>(({ gsap, el, reduced }) => {
    const items = el.querySelectorAll<HTMLElement>("[data-in]");
    gsap.from(items, {
      autoAlpha: 0,
      y: reduced ? 0 : 18,
      duration: reduced ? 0.4 : 0.9,
      stagger: 0.09,
      ease: "power3.out",
      delay: 0.15,
    });
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (normalize(value) !== normalize(unlock.password)) {
      setError(true);
      if ("vibrate" in navigator) navigator.vibrate?.(60);
      return;
    }
    setError(false);
    setLeaving(true);
    audio().play();
    // Tirai naik → baru lepas overlay dari DOM
    window.setTimeout(() => {
      setUnlocked(true);
      achieve("unlocked");
    }, 1000);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && (e.nativeEvent.isComposing || e.keyCode === 229)) e.preventDefault();
  };

  if (unlocked) return null;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-labelledby="unlock-title"
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background px-6",
        "transition-transform duration-[1000ms] ease-[cubic-bezier(0.7,0,0.2,1)]",
        leaving && "-translate-y-full",
      )}
    >
      {/* Ornamen tipis — bintang Y2K */}
      <Star className="absolute left-[12%] top-[18%] h-5 w-5 text-lavender-deep animate-twinkle" />
      <Star className="absolute right-[14%] top-[28%] h-3 w-3 text-pink-deep animate-twinkle [animation-delay:0.8s]" />
      <Star className="absolute bottom-[22%] left-[22%] h-3 w-3 text-butter animate-twinkle [animation-delay:1.4s]" />
      <Star className="absolute bottom-[16%] right-[20%] h-6 w-6 text-pink animate-twinkle [animation-delay:0.4s]" />

      <form onSubmit={submit} className="glass-strong relative w-full max-w-sm rounded-[2rem] p-8 shadow-soft">
        <div data-in className="glossy mx-auto -mt-16 flex h-16 w-16 items-center justify-center rounded-full">
          <span className="relative">
            <CatEars className="absolute -top-4 left-1/2 h-4 w-8 -translate-x-1/2 text-pink-deep" />
            <Lock className="h-6 w-6" aria-hidden />
          </span>
        </div>

        <h1 id="unlock-title" data-in className="mt-6 text-balance text-center font-serif text-2xl leading-snug">
          {unlock.title}
        </h1>
        <p data-in className="mt-2 text-center text-sm text-muted">
          {unlock.subtitle}
        </p>

        <label data-in className="mt-6 block">
          <span className="sr-only">Kata kunci</span>
          <input
            type="password"
            inputMode="text"
            autoComplete="off"
            autoFocus
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(false);
            }}
            onKeyDown={onKeyDown}
            aria-invalid={error}
            aria-describedby="unlock-hint"
            placeholder="••••••••"
            className={cn(
              "w-full rounded-2xl border bg-background-elevated px-4 py-3 text-center text-lg tracking-[0.35em]",
              "border-line outline-none transition focus:border-pink-deep",
              error && "animate-[shake_0.4s_ease] border-pink-deep",
            )}
          />
        </label>
        <p id="unlock-hint" data-in className="mt-2 text-center text-xs text-muted">
          {error ? "Belum pas. Coba lagi, pelan-pelan." : unlock.hint}
        </p>

        <button data-in type="submit" className="glossy mt-6 flex w-full items-center justify-center gap-2 rounded-2xl py-3 font-medium">
          <Sparkles className="h-4 w-4" aria-hidden />
          Mulai
        </button>
      </form>
    </div>
  );
}
