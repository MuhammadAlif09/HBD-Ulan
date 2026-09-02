"use client";

import { useState } from "react";
import { Gift, Heart, Sparkles, Box, Gamepad2, X } from "lucide-react";
import { ending, person } from "@/data/content";
import { useApp } from "@/lib/store";
import { useReveal } from "@/hooks/useGsap";
import { useKonami } from "@/hooks/useKonami";
import { shootCelebrationBurst } from "@/lib/confetti";
import { audio } from "@/lib/audio/engine";
import { CatEars, Sparkle, Star } from "@/components/illustrations/Ornaments";
import { MemoryBoxModal } from "./MemoryBoxModal";
import { cn } from "@/lib/cn";

export function Ending() {
  const giftOpened = useApp((s) => s.giftOpened);
  const setGiftOpened = useApp((s) => s.setGiftOpened);
  const unlockAchievement = useApp((s) => s.unlockAchievement);

  const [showFinalModal, setShowFinalModal] = useState(false);
  const [showMemoryBox, setShowMemoryBox] = useState(false);
  const [showKonamiModal, setShowKonamiModal] = useState(false);

  useKonami(() => {
    setShowKonamiModal(true);
    shootCelebrationBurst();
  });

  const containerRef = useReveal<HTMLElement>({
    variant: "up",
    duration: 1.2,
    start: "top 70%",
  });

  const handleOpenGift = () => {
    setGiftOpened(true);
    setShowFinalModal(true);
    unlockAchievement("opened-the-gift");
    audio().fadeOutForEnding(5000);
    shootCelebrationBurst();
  };

  return (
    <footer
      ref={containerRef}
      className="relative mx-auto max-w-4xl px-4 pt-16 pb-32 sm:px-6 sm:py-24 text-center"
    >
      {/* Cat Ears Topper */}
      <div className="mb-4 text-pink-deep animate-float">
        <CatEars className="h-6 w-12 sm:h-8 sm:w-16 mx-auto opacity-80" />
      </div>

      {/* Main Closing Title */}
      <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-foreground">
        {ending.title}
      </h2>

      {/* Message */}
      <p className="mt-6 max-w-xl mx-auto text-base sm:text-lg text-muted font-light leading-relaxed">
        {ending.message}
      </p>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={handleOpenGift}
          className="inline-flex items-center gap-2 rounded-full bg-pink-deep px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-glow transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <Gift className="h-4 w-4" />
          <span>{ending.giftButton}</span>
        </button>

        <button
          type="button"
          onClick={() => setShowMemoryBox(true)}
          className="inline-flex items-center gap-2 rounded-full bg-background-elevated px-5 py-3.5 text-xs sm:text-sm font-semibold text-foreground/80 shadow-soft transition-all duration-300 hover:scale-105 active:scale-95 border border-line"
        >
          <Box className="h-4 w-4 text-lavender-deep" />
          <span>Buka Kotak Kenangan</span>
        </button>
      </div>

      {/* Constellation / Love Hearts Signoff */}
      <div className="mt-16 flex items-center justify-center gap-2 text-pink-deep">
        <Sparkle className="h-3 w-3" />
        <Heart className="h-4 w-4 fill-pink" />
        <span className="font-serif text-xs italic text-muted">
          Dibuat dengan segenap rasa sayang untuk {person.name}
        </span>
        <Heart className="h-4 w-4 fill-pink" />
        <Sparkle className="h-3 w-3" />
      </div>

      {/* Memory Box Modal */}
      <MemoryBoxModal
        isOpen={showMemoryBox}
        onClose={() => setShowMemoryBox(false)}
      />

      {/* Final Gift Modal */}
      {showFinalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowFinalModal(false)}
          />
          <div className="relative w-full max-w-md rounded-3xl bg-background-elevated p-8 text-center shadow-2xl border border-pink/40 z-10 toast-in">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-pink to-lavender text-white shadow-md">
              <Sparkle className="h-7 w-7 animate-twinkle" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-foreground">
              {ending.finalTitle}
            </h3>

            <p className="mt-3 text-sm text-foreground/90 font-light leading-relaxed">
              {ending.finalMessage}
            </p>

            <button
              type="button"
              onClick={() => setShowFinalModal(false)}
              className="mt-6 w-full rounded-full bg-pink-deep py-3 text-xs font-bold text-white shadow-md transition hover:scale-[1.02] active:scale-95"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Konami Code Secret Modal */}
      {showKonamiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowKonamiModal(false)}
          />
          <div className="relative w-full max-w-md rounded-3xl bg-background-elevated p-8 text-center shadow-2xl border border-lavender/50 z-10 toast-in">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-lavender text-lavender-deep shadow-md">
              <Gamepad2 className="h-6 w-6" />
            </div>

            <h3 className="font-serif text-xl font-bold text-foreground">
              Secret Gamer Girl Easter Egg! 🎮
            </h3>

            <p className="mt-3 text-xs text-foreground/90 font-light leading-relaxed">
              {ending.konamiMessage}
            </p>

            <button
              type="button"
              onClick={() => setShowKonamiModal(false)}
              className="mt-6 w-full rounded-full bg-lavender-deep py-2.5 text-xs font-bold text-white shadow-md transition hover:scale-[1.02] active:scale-95"
            >
              Keren Banget!
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
