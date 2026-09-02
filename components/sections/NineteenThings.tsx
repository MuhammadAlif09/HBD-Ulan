"use client";

import { useState } from "react";
import { Check, Heart, Sparkles, Smile, Star as StarIcon } from "lucide-react";
import { nineteenThings, thingsComplete, secretButton } from "@/data/content";
import { useApp } from "@/lib/store";
import { useReveal } from "@/hooks/useGsap";
import { shootSoftConfetti, shootCelebrationBurst } from "@/lib/confetti";
import { CatEars, PawPrint, Sparkle, Star } from "@/components/illustrations/Ornaments";
import { cn } from "@/lib/cn";

export function NineteenThings() {
  const openedCards = useApp((s) => s.openedCards);
  const openCard = useApp((s) => s.openCard);
  const allCardsCelebrated = useApp((s) => s.allCardsCelebrated);
  const markCardsCelebrated = useApp((s) => s.markCardsCelebrated);
  const unlockAchievement = useApp((s) => s.unlockAchievement);

  const [secretSticker, setSecretSticker] = useState<string | null>(null);

  const containerRef = useReveal<HTMLElement>({
    variant: "up",
    duration: 1,
    start: "top 75%",
  });

  const handleCardClick = (index: number) => {
    openCard(index);
    shootSoftConfetti();

    // Check if opening this makes it all 19
    const newOpenedCount = openedCards.includes(index) ? openedCards.length : openedCards.length + 1;
    if (newOpenedCount >= 19 && !allCardsCelebrated) {
      markCardsCelebrated();
      unlockAchievement("read-every-card");
      shootCelebrationBurst();
    }
  };

  const handleSecretClick = () => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate([80, 40, 80]);
      } catch {
        // Safe ignore
      }
    }
    const stickers = ["🍬", "🐱", "✨", "🍦", "💖", "🍓"];
    const randomSticker = stickers[Math.floor(Math.random() * stickers.length)]!;
    setSecretSticker(randomSticker);
    unlockAchievement("secret-found");
    shootSoftConfetti();

    setTimeout(() => {
      setSecretSticker(null);
    }, 2800);
  };

  const cardIcons = [Heart, Sparkle, PawPrint, Star, Smile];

  return (
    <section
      ref={containerRef}
      className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24"
    >
      {/* Section Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full glass px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-pink-deep mb-3">
          <Sparkle className="h-3 w-3" />
          <span>19 Things</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-foreground">
          19 Hal yang Bikin Aku <span className="italic holo-text">Sayang Kamu</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-muted max-w-md mx-auto">
          Tap tiap kartu satu per satu untuk membuka alasannya.
        </p>

        {/* Progress Tracker */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full glass-strong px-4 py-1.5 text-xs font-medium text-foreground shadow-soft border border-white/40 dark:border-white/10">
          <span>Progress:</span>
          <span className="font-bold text-pink-deep">{openedCards.length} / 19 dibuka</span>
          {openedCards.length === 19 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-pink-deep text-white text-[10px]">
              ✓
            </span>
          )}
        </div>
      </div>

      {/* 19 Flip Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {nineteenThings.map((text, idx) => {
          const isOpened = openedCards.includes(idx);
          const Icon = cardIcons[idx % cardIcons.length]!;

          return (
            <div
              key={idx}
              role="button"
              tabIndex={0}
              onClick={() => handleCardClick(idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(idx);
                }
              }}
              aria-label={`Kartu #${idx + 1}: ${isOpened ? text : "Tertutup, klik untuk buka"}`}
              className="group relative h-40 sm:h-44 w-full cursor-pointer [perspective:1000px] focus-visible:outline-none"
            >
              <div
                className={cn(
                  "relative h-full w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] shadow-soft group-hover:shadow-glow",
                  isOpened && "[transform:rotateY(180deg)]",
                )}
              >
                {/* Front of Card (Cover) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-background-elevated p-3 text-center [backface-visibility:hidden] border border-white/60 dark:border-white/10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink/20 text-pink-deep mb-2 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-serif text-lg font-bold text-foreground">
                    #{idx + 1}
                  </span>
                  <span className="mt-1 text-[10px] uppercase tracking-wider text-muted">
                    Tap untuk buka
                  </span>
                </div>

                {/* Back of Card (Revealed Reason) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-tr from-pink/25 via-lavender/20 to-cream/30 p-3 text-center [backface-visibility:hidden] [transform:rotateY(180deg)] border border-pink/40">
                  <span className="text-[10px] font-semibold text-pink-deep uppercase tracking-wider mb-1">
                    #{idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-foreground leading-snug line-clamp-4">
                    {text}
                  </p>
                  <Sparkle className="h-3 w-3 text-pink-deep/60 mt-2" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Message when all 19 cards are opened */}
      {openedCards.length === 19 && (
        <div className="mt-12 mx-auto max-w-lg rounded-3xl glass-strong p-6 text-center shadow-glow border border-pink/40 toast-in">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-pink-deep text-white shadow-md">
            <Heart className="h-6 w-6 fill-white animate-pulse" />
          </div>
          <h3 className="font-serif text-xl font-bold text-foreground">
            {thingsComplete.title}
          </h3>
          <p className="mt-2 text-sm text-foreground/85 leading-relaxed font-light">
            {thingsComplete.message}
          </p>
        </div>
      )}

      {/* Secret Inside-Joke Button */}
      <div className="mt-16 text-center">
        <button
          type="button"
          onClick={handleSecretClick}
          className="group relative inline-flex items-center gap-2 rounded-full bg-background-elevated px-4 py-2 text-xs font-semibold text-muted shadow-soft transition-all duration-300 hover:scale-105 hover:text-pink-deep hover:shadow-glow border border-line"
        >
          <Sparkle className="h-3.5 w-3.5 text-pink-deep transition-transform duration-300 group-hover:rotate-45" />
          <span>{secretButton.label}</span>
          <Sparkle className="h-3.5 w-3.5 text-lavender-deep transition-transform duration-300 group-hover:-rotate-45" />
        </button>

        {/* Floating Sticker Popup */}
        {secretSticker && (
          <div className="mt-4 flex flex-col items-center gap-1 toast-in">
            <span className="text-3xl sm:text-4xl animate-bounce">{secretSticker}</span>
            <p className="text-xs font-medium text-pink-deep italic">
              {secretButton.reaction}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
