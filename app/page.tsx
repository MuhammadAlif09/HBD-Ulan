"use client";

import { Unlock } from "@/components/layout/Unlock";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { SceneBackground } from "@/components/cinematics/SceneBackground";
import { NarrativeLine } from "@/components/cinematics/NarrativeLine";
import { FloatingQuote } from "@/components/cinematics/FloatingQuote";
import { MusicPlayer } from "@/components/audio/MusicPlayer";

import { Hero } from "@/components/sections/Hero";
import { Timeline } from "@/components/sections/Timeline";
import { Gallery } from "@/components/sections/Gallery";
import { NineteenThings } from "@/components/sections/NineteenThings";
import { GiftMoment } from "@/components/sections/GiftMoment";
import { Letter } from "@/components/sections/Letter";
import { Ending } from "@/components/sections/Ending";

import { narrative, floatingQuotes } from "@/data/content";

export default function Page() {
  return (
    <div className="relative min-h-screen selection:bg-pink selection:text-foreground">
      {/* Password Unlock Screen (Milestone 2) */}
      <Unlock />

      {/* Ambient Animated Cinematic Background */}
      <SceneBackground />

      {/* Top Floating Controls */}
      <header className="fixed top-4 right-4 z-40 flex items-center gap-2">
        <ThemeToggle />
      </header>

      {/* Main Interactive Flow */}
      <main className="relative z-10 mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Milestone 2: Hero */}
        <Hero />

        {/* Narrative Break 1 */}
        <NarrativeLine text={narrative.beforeTimeline} />

        {/* Milestone 3: Timeline & Story */}
        <Timeline />

        {/* Floating Quote 1 */}
        {floatingQuotes[0] && (
          <FloatingQuote quote={floatingQuotes[0]} align="center" />
        )}

        {/* Narrative Break 2 */}
        <NarrativeLine text={narrative.beforeGallery} />

        {/* Milestone 3: Photo Gallery */}
        <Gallery />

        {/* Floating Quote 2 */}
        {floatingQuotes[1] && (
          <FloatingQuote quote={floatingQuotes[1]} align="center" />
        )}

        {/* Narrative Break 3 */}
        <NarrativeLine text={narrative.beforeThings} />

        {/* Milestone 4: 19 Things Cards & Secret Button */}
        <NineteenThings />

        {/* Narrative Break 4 */}
        <NarrativeLine text={narrative.beforeGift} />

        {/* Milestone 5: Virtual Birthday Cake & Flower Bouquet */}
        <GiftMoment />

        {/* Narrative Break 5 */}
        <NarrativeLine text={narrative.beforeLetter} />

        {/* Milestone 5: Interactive Letter */}
        <Letter />

        {/* Narrative Break 6 */}
        <NarrativeLine text={narrative.beforeEnding} />

        {/* Milestone 5: Ending Section & Easter Eggs */}
        <Ending />
      </main>

      {/* Milestone 2: Floating Music Player */}
      <MusicPlayer />
    </div>
  );
}
