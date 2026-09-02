"use client";

import { useReveal } from "@/hooks/useGsap";
import { Sparkle } from "@/components/illustrations/Ornaments";

interface NarrativeLineProps {
  text: string;
  className?: string;
}

/**
 * Kalimat pendek (1-2 baris) yang muncul fade-in di antara section-section besar.
 * Inti dari feel "film pendek" interaktif — lihat skills/scroll-cinematics.md.
 */
export function NarrativeLine({ text, className = "" }: NarrativeLineProps) {
  const ref = useReveal<HTMLDivElement>({
    variant: "blur",
    duration: 1.1,
    start: "top 78%",
  });

  return (
    <div
      ref={ref}
      className={`my-16 flex flex-col items-center justify-center px-6 text-center sm:my-24 ${className}`}
    >
      <div className="flex items-center gap-3 text-pink-deep/60">
        <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-pink-deep/40" />
        <Sparkle className="h-3.5 w-3.5" />
        <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-pink-deep/40" />
      </div>
      <p className="mt-4 max-w-xl font-serif text-xl italic leading-relaxed text-foreground/85 sm:text-2xl md:text-3xl">
        &ldquo;{text}&rdquo;
      </p>
    </div>
  );
}
