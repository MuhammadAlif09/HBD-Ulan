"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

interface CakeProps {
  blown: boolean;
  onBlow?: () => void;
  className?: string;
}

/**
 * Ilustrasi Kue Ulang Tahun Kawaii (SVG/flat) — lihat skills/cake-letter-ending.md.
 * - Topping ice-cream soft-serve swirl + drip icing meleleh
 * - Cat-ear cake topper / aksen kucing
 * - Lilin bentuk bintang berkilau dengan animasi flame flicker / smoke saat padam
 * - Aksen pita / bow di dasar
 */
export function Cake({ blown, onBlow, className }: CakeProps) {
  const id = useId();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onBlow}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onBlow?.();
        }
      }}
      aria-label={blown ? "Lilin sudah ditiup" : "Klik untuk meniup lilin"}
      className={cn(
        "group relative mx-auto block cursor-pointer select-none transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-deep",
        className,
      )}
    >
      <svg
        viewBox="0 0 320 340"
        className="h-auto w-full max-w-[280px] sm:max-w-[320px] drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id={`${id}-cake-top`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffaf7" />
            <stop offset="100%" stopColor="#fbeef1" />
          </linearGradient>

          <linearGradient id={`${id}-frosting-pink`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbd3de" />
            <stop offset="100%" stopColor="#f6b9c9" />
          </linearGradient>

          <linearGradient id={`${id}-cake-tier2`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff4e6" />
            <stop offset="100%" stopColor="#f8e5d0" />
          </linearGradient>

          <linearGradient id={`${id}-candle`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fde9a8" />
            <stop offset="50%" stopColor="#cdbff0" />
            <stop offset="100%" stopColor="#f6b9c9" />
          </linearGradient>

          <radialGradient id={`${id}-flame`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#fde9a8" />
            <stop offset="70%" stopColor="#f2a7bd" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <filter id={`${id}-glow`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
        </defs>

        {/* Plate / Stand */}
        <ellipse cx="160" cy="305" rx="140" ry="20" fill="var(--color-bg-elevated, #fffaf7)" />
        <ellipse cx="160" cy="305" rx="140" ry="20" stroke="var(--color-line, #ecdcdc)" strokeWidth="3" />
        <path d="M50 305 Q160 325 270 305" stroke="#f6b9c9" strokeWidth="2" fill="none" opacity="0.4" />

        {/* Bottom Tier (Tier 1) */}
        <rect x="55" y="210" width="210" height="85" rx="16" fill={`url(#${id}-cake-tier2)`} />
        {/* Tier 1 Side shading */}
        <path d="M55 275 Q160 300 265 275 L265 295 Q160 320 55 295 Z" fill="#edd0b7" opacity="0.5" />

        {/* Drip Icing (Bottom Tier) */}
        <path
          d="M55 210 Q70 235 85 215 Q100 240 115 220 Q130 248 150 220 Q170 245 190 220 Q210 240 225 215 Q245 235 265 210 L265 205 L55 205 Z"
          fill={`url(#${id}-frosting-pink)`}
        />

        {/* Middle / Top Tier (Tier 2) */}
        <rect x="85" y="140" width="150" height="70" rx="14" fill={`url(#${id}-cake-top)`} />
        {/* Drip Icing (Top Tier) */}
        <path
          d="M85 140 Q100 160 115 145 Q130 165 145 150 Q160 170 175 148 Q190 162 205 145 Q220 160 235 140 L235 135 L85 135 Z"
          fill="#cdbff0"
          opacity="0.9"
        />

        {/* Soft-Serve Ice Cream Swirl on Top */}
        <path
          d="M135 135 C130 115 150 100 160 90 C170 100 190 115 185 135 C175 142 145 142 135 135 Z"
          fill="#fbeef1"
        />
        <path
          d="M142 125 C146 112 156 102 160 96 C164 102 174 112 178 125"
          stroke="#f6b9c9"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Kawaii Cat Ears Topper */}
        <g transform="translate(136, 68)">
          {/* Left Ear */}
          <path d="M0 24 L10 0 L20 20 Z" fill="#f6b9c9" stroke="#fff" strokeWidth="1.5" />
          <path d="M4 22 L10 6 L16 19 Z" fill="#fff" opacity="0.8" />
          {/* Right Ear */}
          <path d="M28 20 L38 0 L48 24 Z" fill="#f6b9c9" stroke="#fff" strokeWidth="1.5" />
          <path d="M32 19 L38 6 L44 22 Z" fill="#fff" opacity="0.8" />
        </g>

        {/* Cute Bow Ribbon on Bottom Tier */}
        <g transform="translate(160, 270)">
          {/* Left loop */}
          <ellipse cx="-16" cy="0" rx="14" ry="10" transform="rotate(-15 -16 0)" fill="#f6b9c9" stroke="#fff" strokeWidth="1.5" />
          {/* Right loop */}
          <ellipse cx="16" cy="0" rx="14" ry="10" transform="rotate(15 16 0)" fill="#f6b9c9" stroke="#fff" strokeWidth="1.5" />
          {/* Center knot */}
          <circle cx="0" cy="0" r="6" fill="#ef8fae" stroke="#fff" strokeWidth="1.5" />
          {/* Tails */}
          <path d="M-4 5 Q-12 20 -18 24 Q-10 18 -2 8 Z" fill="#f6b9c9" />
          <path d="M4 5 Q12 20 18 24 Q10 18 2 8 Z" fill="#f6b9c9" />
        </g>

        {/* Y2K Sprinkles */}
        <circle cx="105" cy="180" r="3" fill="#fde9a8" />
        <rect x="195" y="175" width="8" height="4" rx="2" transform="rotate(25 195 175)" fill="#cdeee3" />
        <rect x="130" y="170" width="8" height="4" rx="2" transform="rotate(-30 130 170)" fill="#f6b9c9" />
        <circle cx="170" cy="185" r="3.5" fill="#cdbff0" />
        <rect x="80" y="245" width="10" height="4" rx="2" transform="rotate(15 80 245)" fill="#fde9a8" />
        <circle cx="120" cy="250" r="3.5" fill="#cdeee3" />
        <rect x="200" y="240" width="9" height="4" rx="2" transform="rotate(-20 200 240)" fill="#cdbff0" />
        <circle cx="235" cy="255" r="3" fill="#f6b9c9" />

        {/* Birthday Candle: Shimmering Star Candle (Center) */}
        <g transform="translate(152, 28)">
          {/* Candle Body */}
          <rect x="5" y="28" width="6" height="36" rx="3" fill={`url(#${id}-candle)`} stroke="#fff" strokeWidth="1" />
          <line x1="8" y1="28" x2="8" y2="20" stroke="#8a7387" strokeWidth="1.5" strokeLinecap="round" />

          {/* Candle Star Charm on stick */}
          <path
            d="M8 32 C8 36 4 40 4 40 C4 40 8 44 8 48 C8 44 12 40 12 40 C12 40 8 36 8 32 Z"
            fill="#fde9a8"
            opacity="0.8"
          />

          {!blown ? (
            /* Animated Candle Flame */
            <g className="animate-flicker origin-bottom" style={{ transformOrigin: "8px 20px" }}>
              {/* Outer glow */}
              <circle cx="8" cy="12" r="14" fill={`url(#${id}-flame)`} filter={`url(#${id}-glow)`} />
              {/* Main Flame teardrop */}
              <path
                d="M8 0 C12 7 14 13 8 20 C2 13 4 7 8 0 Z"
                fill="#fde9a8"
              />
              {/* Inner core */}
              <path
                d="M8 6 C10 11 11 15 8 19 C5 15 6 11 8 6 Z"
                fill="#ffffff"
              />
            </g>
          ) : (
            /* Smoke trails when blown */
            <g className="opacity-75 transition-opacity duration-500">
              <path
                d="M8 18 Q4 10 10 4 Q14 -2 8 -8"
                stroke="var(--color-fg-muted, #8a7387)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
                className="animate-float"
              />
              <path
                d="M9 16 Q14 8 8 0 Q4 -6 11 -12"
                stroke="var(--color-lavender, #cdbff0)"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.4"
                className="animate-float"
                style={{ animationDelay: "0.2s" }}
              />
              {/* Extinguished spark */}
              <circle cx="8" cy="20" r="1.5" fill="#ef8fae" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
