"use client";

import { Calendar, Clock, Heart, MapPin, Sparkles } from "lucide-react";
import { timeline, relationshipStartISO, person } from "@/data/content";
import { useTimeCounter } from "@/hooks/useTimeCounter";
import { useReveal } from "@/hooks/useGsap";
import { PawPrint, Sparkle, Star } from "@/components/illustrations/Ornaments";

export function Timeline() {
  const time = useTimeCounter(relationshipStartISO);
  const containerRef = useReveal<HTMLElement>({
    variant: "up",
    duration: 1,
    start: "top 75%",
  });

  return (
    <section
      ref={containerRef}
      className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24"
    >
      {/* Header */}
      <div className="mb-14 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full glass px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-pink-deep mb-3">
          <Heart className="h-3 w-3 fill-current" />
          <span>Our Story</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-foreground">
          Cerita <span className="italic holo-text">Kita</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-muted max-w-md mx-auto">
          Momen-momen kecil yang bikin hari-hari bareng kamu selalu berarti.
        </p>

        {/* Realtime Time Counter Badge */}
        <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl glass-strong px-5 py-3 shadow-soft border border-white/40 dark:border-white/10">
          <Clock className="h-4 w-4 text-pink-deep shrink-0" />
          <span className="text-xs sm:text-sm font-medium text-foreground">
            Kita udah kenal selama:
          </span>
          <span
            className="font-mono text-xs sm:text-sm font-bold text-pink-deep"
            suppressHydrationWarning
          >
            {time.days}h {time.hours}j {time.minutes}m {time.seconds}d
          </span>
        </div>
      </div>

      {/* Timeline Vertical Track */}
      <div className="relative pl-6 sm:pl-0">
        {/* Central Vertical Line */}
        <div className="absolute top-0 bottom-0 left-6 sm:left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-pink via-lavender to-butter opacity-60" />

        {/* Timeline Items */}
        <div className="space-y-12 sm:space-y-16">
          {timeline.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={item.id}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                  isEven ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Center Marker Node */}
                <div className="absolute left-0 sm:left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-background-elevated border-2 border-pink-deep shadow-md z-10">
                  {idx % 3 === 0 ? (
                    <Heart className="h-3.5 w-3.5 text-pink-deep fill-pink" />
                  ) : idx % 3 === 1 ? (
                    <PawPrint className="h-3.5 w-3.5 text-lavender-deep fill-lavender" />
                  ) : (
                    <Star className="h-3.5 w-3.5 text-butter fill-butter" />
                  )}
                </div>

                {/* Content Card Container */}
                <div
                  className={`ml-6 sm:ml-0 w-full sm:w-[calc(50%-2rem)] ${
                    isEven ? "sm:pl-0 sm:pr-4 sm:text-right" : "sm:pl-4 sm:pr-0 sm:text-left"
                  }`}
                >
                  <div className="glass-strong rounded-2xl p-5 sm:p-6 shadow-soft transition-all duration-300 hover:shadow-glow hover:-translate-y-1 border border-white/50 dark:border-white/10">
                    {/* Date & Location */}
                    <div
                      className={`flex flex-wrap items-center gap-3 text-xs font-medium text-muted mb-2 ${
                        isEven ? "sm:justify-end" : "sm:justify-start"
                      }`}
                    >
                      <span className="inline-flex items-center gap-1 text-pink-deep">
                        <Calendar className="h-3.5 w-3.5" />
                        {item.date}
                      </span>
                      {item.location && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {item.location}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
