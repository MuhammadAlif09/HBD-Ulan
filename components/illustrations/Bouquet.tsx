"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";
import { CatEars, Sparkle } from "./Ornaments";

interface BouquetProps {
  bloomed: boolean;
  onBloom?: () => void;
  className?: string;
}

/**
 * Virtual Flower Bouquet (Buket Bunga) Kawaii SVG — lihat skills/cake-letter-ending.md.
 * - Cellophane wrapper Y2K glossy + pita/bow dengan cat charm
 * - Bunga pastel: soft pink roses, sprigs of lavender, gypsophila baby's breath, sweet daisy
 * - Interaksi bloom: tap to unfold & bloom flowers
 */
export function Bouquet({ bloomed, onBloom, className }: BouquetProps) {
  const id = useId();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onBloom}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onBloom?.();
        }
      }}
      aria-label={bloomed ? "Buket bunga sudah mekar" : "Klik untuk membuka buket bunga"}
      className={cn(
        "group relative mx-auto block cursor-pointer select-none transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-deep",
        className,
      )}
    >
      <svg
        viewBox="0 0 320 360"
        className="h-auto w-full max-w-[280px] sm:max-w-[320px] drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`${id}-wrap`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffaf7" />
            <stop offset="50%" stopColor="#fbeef1" />
            <stop offset="100%" stopColor="#f5e0e7" />
          </linearGradient>

          <linearGradient id={`${id}-rose`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbd3de" />
            <stop offset="100%" stopColor="#e88fa9" />
          </linearGradient>

          <linearGradient id={`${id}-lavender`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dfd5f7" />
            <stop offset="100%" stopColor="#a993e6" />
          </linearGradient>

          <linearGradient id={`${id}-ribbon`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f6b9c9" />
            <stop offset="100%" stopColor="#cdbff0" />
          </linearGradient>
        </defs>

        {/* Wrapper Cone (Back / Base) */}
        <path
          d="M75 140 L160 325 L245 140 Q160 170 75 140 Z"
          fill={`url(#${id}-wrap)`}
          stroke="var(--color-line, #ecdcdc)"
          strokeWidth="2"
        />

        {/* Wrapper Left Fold */}
        <path
          d="M70 135 Q120 180 160 325 L100 240 Z"
          fill="#f6b9c9"
          opacity="0.35"
        />

        {/* Wrapper Right Fold */}
        <path
          d="M250 135 Q200 180 160 325 L220 240 Z"
          fill="#cdbff0"
          opacity="0.35"
        />

        {/* Flowers Layer (Behind Front Wrapper) */}
        <g
          className={cn(
            "transition-all duration-700 ease-out origin-bottom",
            bloomed ? "scale-100 opacity-100" : "scale-90 opacity-90",
          )}
        >
          {/* Stems & Leaves */}
          <path d="M140 180 Q155 240 160 300" stroke="#b9e3d5" strokeWidth="4" strokeLinecap="round" />
          <path d="M160 170 Q160 235 160 300" stroke="#9edac6" strokeWidth="4" strokeLinecap="round" />
          <path d="M180 180 Q165 240 160 300" stroke="#b9e3d5" strokeWidth="4" strokeLinecap="round" />
          {/* Eucalyptus Leaf */}
          <ellipse cx="115" cy="155" rx="14" ry="8" transform="rotate(-30 115 155)" fill="#cdeee3" />
          <ellipse cx="205" cy="155" rx="14" ry="8" transform="rotate(30 205 155)" fill="#cdeee3" />

          {/* Lavender Sprig (Left) */}
          <g
            transform="translate(85, 80)"
            className={cn("transition-transform duration-500", bloomed && "rotate-[-6deg]")}
          >
            <line x1="20" y1="20" x2="45" y2="90" stroke="#9edac6" strokeWidth="2.5" />
            <circle cx="18" cy="20" r="5" fill={`url(#${id}-lavender)`} />
            <circle cx="23" cy="28" r="5.5" fill={`url(#${id}-lavender)`} />
            <circle cx="17" cy="38" r="6" fill={`url(#${id}-lavender)`} />
            <circle cx="25" cy="46" r="6" fill={`url(#${id}-lavender)`} />
            <circle cx="20" cy="56" r="5.5" fill={`url(#${id}-lavender)`} />
          </g>

          {/* Lavender Sprig (Right) */}
          <g
            transform="translate(195, 75)"
            className={cn("transition-transform duration-500", bloomed && "rotate-[8deg]")}
          >
            <line x1="25" y1="20" x2="5" y2="95" stroke="#9edac6" strokeWidth="2.5" />
            <circle cx="25" cy="20" r="5" fill={`url(#${id}-lavender)`} />
            <circle cx="19" cy="29" r="5.5" fill={`url(#${id}-lavender)`} />
            <circle cx="27" cy="39" r="6" fill={`url(#${id}-lavender)`} />
            <circle cx="18" cy="48" r="6" fill={`url(#${id}-lavender)`} />
            <circle cx="24" cy="58" r="5.5" fill={`url(#${id}-lavender)`} />
          </g>

          {/* Baby's Breath / Gypsophila (Dots & tiny stars) */}
          <g opacity="0.9">
            <circle cx="100" cy="115" r="4" fill="#ffffff" stroke="#f6b9c9" strokeWidth="1" />
            <circle cx="110" cy="98" r="3.5" fill="#ffffff" stroke="#f6b9c9" strokeWidth="1" />
            <circle cx="210" cy="110" r="4" fill="#ffffff" stroke="#cdbff0" strokeWidth="1" />
            <circle cx="225" cy="95" r="3.5" fill="#ffffff" stroke="#cdbff0" strokeWidth="1" />
            <circle cx="158" cy="65" r="4" fill="#ffffff" stroke="#fde9a8" strokeWidth="1" />
          </g>

          {/* Main Kawaii Rose (Center-Left) */}
          <g
            transform="translate(105, 95)"
            className={cn(
              "transition-all duration-700 ease-out origin-center",
              bloomed ? "scale-110 rotate-[-4deg]" : "scale-100",
            )}
          >
            <circle cx="30" cy="30" r="26" fill={`url(#${id}-rose)`} />
            {/* Rose Swirl Petals */}
            <path
              d="M18 24 Q30 12 42 24 Q46 36 34 42 Q20 44 18 30 Q16 22 28 20 Q36 20 36 28 Q36 34 30 34"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
          </g>

          {/* Secondary Rose (Center-Right) */}
          <g
            transform="translate(155, 95)"
            className={cn(
              "transition-all duration-700 ease-out origin-center delay-100",
              bloomed ? "scale-110 rotate-[5deg]" : "scale-100",
            )}
          >
            <circle cx="30" cy="30" r="26" fill={`url(#${id}-rose)`} />
            <path
              d="M42 24 Q30 12 18 24 Q14 36 26 42 Q40 44 42 30 Q44 22 32 20 Q24 20 24 28 Q24 34 30 34"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
          </g>

          {/* Sweet Yellow Daisy (Top Center) */}
          <g
            transform="translate(136, 50)"
            className={cn(
              "transition-all duration-700 ease-out origin-center delay-150",
              bloomed ? "scale-120 -translate-y-2" : "scale-100",
            )}
          >
            {/* Daisy Petals */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <ellipse
                key={deg}
                cx="24"
                cy="12"
                rx="6"
                ry="12"
                transform={`rotate(${deg} 24 24)`}
                fill="#ffffff"
                stroke="#fff4e6"
                strokeWidth="1"
              />
            ))}
            {/* Daisy Core */}
            <circle cx="24" cy="24" r="9" fill="#fde9a8" stroke="#f6b9c9" strokeWidth="1.5" />
          </g>
        </g>

        {/* Front Wrapper Overlay with Gloss / Cellophane Sheen */}
        <path
          d="M95 160 L160 325 L225 160 Q160 185 95 160 Z"
          fill="var(--color-bg-elevated, #fffaf7)"
          opacity="0.9"
        />
        <path
          d="M100 165 L160 320"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Ribbon & Bow + Cat Charm */}
        <g transform="translate(160, 275)">
          {/* Ribbon Loops */}
          <ellipse cx="-18" cy="-2" rx="16" ry="10" transform="rotate(-15 -18 -2)" fill={`url(#${id}-ribbon)`} stroke="#fff" strokeWidth="1.5" />
          <ellipse cx="18" cy="-2" rx="16" ry="10" transform="rotate(15 18 -2)" fill={`url(#${id}-ribbon)`} stroke="#fff" strokeWidth="1.5" />
          {/* Ribbon Tails */}
          <path d="M-6 4 Q-14 24 -22 30 Q-12 22 -4 8 Z" fill="#f6b9c9" />
          <path d="M6 4 Q14 24 22 30 Q12 22 4 8 Z" fill="#cdbff0" />
          {/* Bow Knot */}
          <circle cx="0" cy="0" r="7" fill="#e88fa9" stroke="#fff" strokeWidth="1.5" />
          {/* Mini Gold Cat Charm hanging from bow */}
          <g transform="translate(-8, 8) scale(0.7)">
            <circle cx="11" cy="11" r="8" fill="#fde9a8" stroke="#e88fa9" strokeWidth="1.5" />
            {/* Cat Ears on charm */}
            <polygon points="5,6 7,1 10,6" fill="#fde9a8" stroke="#e88fa9" strokeWidth="1" />
            <polygon points="12,6 15,1 17,6" fill="#fde9a8" stroke="#e88fa9" strokeWidth="1" />
          </g>
        </g>

        {/* Floating Sparkles when bloomed */}
        {bloomed && (
          <g className="animate-twinkle">
            <Sparkle className="text-pink-deep" width="16" height="16" x="50" y="70" />
            <Sparkle className="text-butter" width="18" height="18" x="250" y="80" />
            <Sparkle className="text-lavender-deep" width="14" height="14" x="150" y="25" />
          </g>
        )}
      </svg>
    </div>
  );
}
