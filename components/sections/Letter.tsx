"use client";

import { useState, useEffect } from "react";
import { Mail, MailOpen, Heart, Sparkles } from "lucide-react";
import { letter, person } from "@/data/content";
import { useApp } from "@/lib/store";
import { useReveal } from "@/hooks/useGsap";
import { shootSoftConfetti } from "@/lib/confetti";
import { Sparkle } from "@/components/illustrations/Ornaments";
import { cn } from "@/lib/cn";

export function Letter() {
  const letterOpened = useApp((s) => s.letterOpened);
  const setLetterOpened = useApp((s) => s.setLetterOpened);
  const letterFinished = useApp((s) => s.letterFinished);
  const setLetterFinished = useApp((s) => s.setLetterFinished);
  const unlockAchievement = useApp((s) => s.unlockAchievement);

  const [displayedText, setDisplayedText] = useState("");
  const fullText = letter.body;

  const containerRef = useReveal<HTMLElement>({
    variant: "up",
    duration: 1,
    start: "top 75%",
  });

  const handleOpenEnvelope = () => {
    setLetterOpened(true);
    shootSoftConfetti();
  };

  // Typewriter effect when letter is opened
  useEffect(() => {
    if (!letterOpened) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex += 2;
      if (currentIndex >= fullText.length) {
        setDisplayedText(fullText);
        setLetterFinished(true);
        unlockAchievement("read-the-letter");
        clearInterval(interval);
      } else {
        setDisplayedText(fullText.slice(0, currentIndex));
      }
    }, 25);

    return () => clearInterval(interval);
  }, [letterOpened, fullText, setLetterFinished, unlockAchievement]);

  return (
    <section
      ref={containerRef}
      className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24"
    >
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full glass px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-pink-deep mb-3">
          <Mail className="h-3 w-3" />
          <span>Surat Untukmu</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-foreground">
          Sepucuk <span className="italic holo-text">Surat</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-muted max-w-md mx-auto">
          Kata-kata yang mungkin jarang terucap langsung, tapi selalu ada di hati.
        </p>
      </div>

      {!letterOpened ? (
        /* Envelope Sealed State */
        <div className="flex flex-col items-center">
          <div
            role="button"
            tabIndex={0}
            onClick={handleOpenEnvelope}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpenEnvelope();
              }
            }}
            aria-label="Klik untuk membuka surat"
            className="group relative flex h-52 w-full max-w-md cursor-pointer flex-col items-center justify-center rounded-3xl bg-gradient-to-tr from-pink/30 via-cream/40 to-lavender/30 p-8 text-center shadow-soft transition-all duration-300 hover:scale-105 hover:shadow-glow border border-line"
          >
            {/* Wax Seal Heart */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-deep text-white shadow-lg transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
              <Heart className="h-8 w-8 fill-white" />
            </div>

            <p className="mt-4 font-serif text-lg font-semibold text-foreground">
              {letter.envelopeLabel}
            </p>
            <span className="mt-1 text-xs text-muted">Klik untuk membuka segel amplop</span>
          </div>
        </div>
      ) : (
        /* Unfolded Letter Sheet */
        <div className="relative rounded-3xl bg-background-elevated p-6 sm:p-12 shadow-2xl transition-all duration-500 border border-line toast-in">
          {/* Letter Greeting */}
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mb-6">
            {letter.greeting}
          </h3>

          {/* Typewriter Letter Body */}
          <div className="font-serif text-base sm:text-lg leading-relaxed text-foreground whitespace-pre-wrap font-normal">
            {displayedText}
            {displayedText.length < fullText.length && (
              <span className="inline-block h-5 w-2 ml-1 bg-pink-deep animate-pulse align-middle" />
            )}
          </div>

          {/* Letter Signoff */}
          <div className="mt-10 pt-6 border-t border-line flex flex-col items-end text-right">
            <p className="font-serif text-base italic text-foreground">
              {letter.signoff}
            </p>
            <p className="mt-1 font-serif text-lg font-bold text-pink-deep">
              — {person.senderName}
            </p>
            <Heart className="h-4 w-4 text-pink-deep fill-pink mt-1" />
          </div>
        </div>
      )}
    </section>
  );
}
