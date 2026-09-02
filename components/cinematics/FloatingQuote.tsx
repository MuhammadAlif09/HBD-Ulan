"use client";

import { useReveal } from "@/hooks/useGsap";
import { Sparkle } from "@/components/illustrations/Ornaments";

interface FloatingQuoteProps {
  quote: string;
  className?: string;
  align?: "left" | "right" | "center";
}

export function FloatingQuote({ quote, className = "", align = "center" }: FloatingQuoteProps) {
  const ref = useReveal<HTMLDivElement>({
    variant: "blur",
    duration: 1,
    start: "top 80%",
  });

  const alignStyles = {
    left: "items-start text-left ml-4 sm:ml-12",
    right: "items-end text-right mr-4 sm:mr-12",
    center: "items-center text-center mx-auto",
  }[align];

  return (
    <div
      ref={ref}
      className={`my-12 flex max-w-lg flex-col px-4 ${alignStyles} ${className}`}
    >
      <div className="glass-strong flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-medium text-foreground/80 shadow-soft">
        <Sparkle className="h-3 w-3 text-pink-deep" />
        <span className="italic">{quote}</span>
      </div>
    </div>
  );
}
