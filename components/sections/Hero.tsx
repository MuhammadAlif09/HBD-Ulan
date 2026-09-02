"use client";

import { ChevronDown, Heart } from "lucide-react";
import { hero, person } from "@/data/content";
import { useReveal } from "@/hooks/useGsap";
import { CatEars, Sparkle, Star } from "@/components/illustrations/Ornaments";
import { VoiceNote } from "@/components/audio/VoiceNote";
import { MoodSelector } from "@/components/audio/MoodSelector";

export function Hero() {
  const ref = useReveal<HTMLElement>({
    variant: "up",
    duration: 1.2,
    stagger: 0.15,
  });

  return (
    <header
      ref={ref}
      className="relative flex min-h-dvh flex-col items-center justify-center px-4 pt-16 pb-20 text-center"
    >
      {/* Decorative Top Ears */}
      <div className="mb-3 text-pink-deep animate-float">
        <CatEars className="h-6 w-12 sm:h-8 sm:w-16 mx-auto opacity-80" />
      </div>

      {/* Eyebrow Date */}
      <div className="inline-flex items-center gap-2 rounded-full glass-strong px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-muted shadow-soft">
        <Sparkle className="h-3.5 w-3.5 text-pink-deep" />
        <span>{hero.eyebrow}</span>
        <Sparkle className="h-3.5 w-3.5 text-lavender-deep" />
      </div>

      {/* Main Title */}
      <h1 className="mt-6 max-w-4xl font-serif text-4xl font-normal tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
        {hero.title}{" "}
        <span className="holo-text block sm:inline font-semibold italic">
          {hero.highlight}
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-6 max-w-xl text-pretty text-base text-muted sm:text-lg md:text-xl font-light leading-relaxed">
        {hero.subtitle}
      </p>

      {/* Voice Note Player */}
      <div className="w-full max-w-md mt-2">
        <VoiceNote />
      </div>

      {/* Mood Selector */}
      <div className="mt-3">
        <MoodSelector />
      </div>

      {/* Scroll Cue */}
      <div className="mt-12 flex flex-col items-center gap-2 text-muted animate-bounce">
        <span className="text-xs uppercase tracking-widest font-medium">
          {hero.scrollCue}
        </span>
        <ChevronDown className="h-4 w-4 text-pink-deep" />
      </div>
    </header>
  );
}
