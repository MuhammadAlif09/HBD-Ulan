"use client";

import { useGsap } from "@/hooks/useGsap";
import { Sparkle, Star } from "@/components/illustrations/Ornaments";

/**
 * Dynamic cinematic background glow & ambient stars with smooth transitions based on scroll.
 */
export function SceneBackground() {
  const ref = useGsap<HTMLDivElement>(({ gsap, ScrollTrigger, reduced, el }) => {
    if (reduced) return;

    // Smooth subtle lighting shift as user scrolls down the narrative
    gsap.to(el, {
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
      "--candle": "rgba(253, 233, 168, 0.15)",
    });
  });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Subtle Top-Left Pastel Aura */}
      <div
        className="absolute -top-[15%] -left-[10%] h-[55vw] w-[55vw] max-w-[600px] rounded-full blur-3xl opacity-30 animate-float"
        style={{
          background: "radial-gradient(circle, var(--color-pink) 0%, transparent 70%)",
        }}
      />

      {/* Subtle Bottom-Right Lavender Aura */}
      <div
        className="absolute top-[45%] -right-[15%] h-[60vw] w-[60vw] max-w-[650px] rounded-full blur-3xl opacity-25 animate-float"
        style={{
          background: "radial-gradient(circle, var(--color-lavender) 0%, transparent 70%)",
          animationDelay: "3s",
        }}
      />

      {/* Subtle Candle Glow near bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[45vw] w-[80vw] max-w-[800px] rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, var(--color-butter) 0%, transparent 70%)",
        }}
      />

      {/* Subtle Ambient Y2K Sparkles in background */}
      <div className="absolute top-[18%] left-[8%] animate-twinkle opacity-30 text-pink">
        <Star className="h-5 w-5" />
      </div>
      <div className="absolute top-[35%] right-[10%] animate-twinkle opacity-25 text-lavender" style={{ animationDelay: "1.2s" }}>
        <Sparkle className="h-6 w-6" />
      </div>
      <div className="absolute top-[65%] left-[12%] animate-twinkle opacity-30 text-butter" style={{ animationDelay: "2.1s" }}>
        <Star className="h-4 w-4" />
      </div>
      <div className="absolute top-[82%] right-[14%] animate-twinkle opacity-25 text-mint" style={{ animationDelay: "0.7s" }}>
        <Sparkle className="h-5 w-5" />
      </div>
    </div>
  );
}
