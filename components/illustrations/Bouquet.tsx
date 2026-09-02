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
 * Virtual Flower Bouquet dengan 3 Bunga Cerbera (Gerbera Daisy) Mewah Kawaii SVG
 * - 3 Bunga Cerbera Daisy mekar berlapis dengan putik piringan khas yang anggun:
 *   1. Cerbera Sunset Peach / Apricot (Pusat / Tengah)
 *   2. Cerbera Sweet Coral Pink (Kiri)
 *   3. Cerbera Warm Vanilla Cream / Blush (Kanan)
 * - Didampingi daun eucalyptus, baby's breath (gypsophila), dan kuncup mekar
 * - Kertas pembungkus buket Korea aesthetic Y2K glossy + pita satin & cat charm emas
 * - Interaksi bloom: tap untuk mekarkan ketiga cerbera dengan animasi mekar & sebaran sparkle
 */
export function Bouquet({ bloomed, onBloom, className }: BouquetProps) {
  const id = useId();

  // Helper untuk generate kelopak bunga Gerbera (Cerbera Daisy) berlapis
  const renderCerberaPetals = (
    petalCount: number,
    rx: number,
    ry: number,
    dist: number,
    colorClass: string,
    strokeColor = "#ffffff"
  ) => {
    return Array.from({ length: petalCount }).map((_, i) => {
      const angle = (360 / petalCount) * i;
      return (
        <ellipse
          key={i}
          cx="0"
          cy={-dist}
          rx={rx}
          ry={ry}
          transform={`rotate(${angle})`}
          fill={colorClass}
          stroke={strokeColor}
          strokeWidth="0.8"
          opacity="0.95"
        />
      );
    });
  };

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
      aria-label={bloomed ? "3 Bunga Cerbera mekar sempurna" : "Klik untuk membuka dan mekarkan 3 bunga cerbera"}
      className={cn(
        "group relative mx-auto block cursor-pointer select-none transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-deep",
        className
      )}
    >
      <svg
        viewBox="0 0 340 380"
        className="h-auto w-full max-w-[300px] sm:max-w-[340px] drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients Pembungkus Buket (Korean aesthetic multi-tone) */}
          <linearGradient id={`${id}-wrap-back`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffaf7" />
            <stop offset="40%" stopColor="#fbeef1" />
            <stop offset="100%" stopColor="#f3d7e2" />
          </linearGradient>

          <linearGradient id={`${id}-wrap-fold1`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffdce5" />
            <stop offset="100%" stopColor="#f7b7cb" />
          </linearGradient>

          <linearGradient id={`${id}-wrap-fold2`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8deff" />
            <stop offset="100%" stopColor="#cdbff0" />
          </linearGradient>

          {/* Gradients Cerbera 1: Sunset Peach / Apricot */}
          <linearGradient id={`${id}-cerbera-peach-outer`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffe3d8" />
            <stop offset="100%" stopColor="#fba38d" />
          </linearGradient>
          <linearGradient id={`${id}-cerbera-peach-inner`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff0e6" />
            <stop offset="100%" stopColor="#f78d74" />
          </linearGradient>

          {/* Gradients Cerbera 2: Sweet Blush Pink */}
          <linearGradient id={`${id}-cerbera-pink-outer`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffe6ee" />
            <stop offset="100%" stopColor="#f39bb4" />
          </linearGradient>
          <linearGradient id={`${id}-cerbera-pink-inner`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff2f6" />
            <stop offset="100%" stopColor="#e87698" />
          </linearGradient>

          {/* Gradients Cerbera 3: Soft Butter & Coral */}
          <linearGradient id={`${id}-cerbera-cream-outer`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff8e8" />
            <stop offset="100%" stopColor="#f9cca3" />
          </linearGradient>
          <linearGradient id={`${id}-cerbera-cream-inner`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fffdf7" />
            <stop offset="100%" stopColor="#f2b485" />
          </linearGradient>

          {/* Eye / Disc Center Gradient */}
          <radialGradient id={`${id}-cerbera-eye`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5a3d31" />
            <stop offset="45%" stopColor="#7a4e3c" />
            <stop offset="70%" stopColor="#b47b52" />
            <stop offset="90%" stopColor="#e6a457" />
            <stop offset="100%" stopColor="#ffd88b" />
          </radialGradient>

          {/* Pita / Ribbon Gradient */}
          <linearGradient id={`${id}-ribbon`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f6b9c9" />
            <stop offset="50%" stopColor="#e8a3b8" />
            <stop offset="100%" stopColor="#cdbff0" />
          </linearGradient>
        </defs>

        {/* ─── KERTAS PEMBUNGKUS BELAKANG (Back Wrapping) ─── */}
        <path
          d="M60 140 Q40 80 170 65 Q300 80 280 140 L220 345 L120 345 Z"
          fill={`url(#${id}-wrap-back)`}
          stroke="var(--color-line, #ecdcdc)"
          strokeWidth="2"
        />

        {/* Lipatan Kertas Kiri & Kanan (Layering) */}
        <path
          d="M50 135 Q110 180 170 345 L110 260 Z"
          fill={`url(#${id}-wrap-fold1)`}
          opacity="0.38"
        />
        <path
          d="M290 135 Q230 180 170 345 L230 260 Z"
          fill={`url(#${id}-wrap-fold2)`}
          opacity="0.38"
        />

        {/* ─── DAUN & TANGKAI HIJAU (Eucalyptus & Stems) ─── */}
        <g className="transition-all duration-700 ease-out">
          {/* Stems */}
          <path d="M140 190 Q160 260 170 330" stroke="#87c7b0" strokeWidth="4" strokeLinecap="round" />
          <path d="M170 170 Q170 250 170 330" stroke="#71b89f" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M200 190 Q180 260 170 330" stroke="#87c7b0" strokeWidth="4" strokeLinecap="round" />

          {/* Daun Eucalyptus Kiri */}
          <ellipse cx="95" cy="155" rx="18" ry="11" transform="rotate(-35 95 155)" fill="#b8e4d4" stroke="#90cbb5" strokeWidth="1" />
          <ellipse cx="78" cy="180" rx="14" ry="9" transform="rotate(-45 78 180)" fill="#c9ede0" />

          {/* Daun Eucalyptus Kanan */}
          <ellipse cx="245" cy="155" rx="18" ry="11" transform="rotate(35 245 155)" fill="#b8e4d4" stroke="#90cbb5" strokeWidth="1" />
          <ellipse cx="262" cy="180" rx="14" ry="9" transform="rotate(45 262 180)" fill="#c9ede0" />

          {/* Daun Aksen Tengah */}
          <ellipse cx="170" cy="195" rx="12" ry="7" transform="rotate(10 170 195)" fill="#b0e0cf" />
        </g>

        {/* ─── GYPSOPHILA / BABY'S BREATH (Bunga Kecil Putih Lembut) ─── */}
        <g opacity="0.95" className="transition-opacity duration-500">
          <circle cx="85" cy="115" r="4.5" fill="#ffffff" stroke="#f6b9c9" strokeWidth="1.2" />
          <circle cx="98" cy="95" r="4" fill="#ffffff" stroke="#f6b9c9" strokeWidth="1.2" />
          <circle cx="112" cy="78" r="3.5" fill="#ffffff" stroke="#fde9a8" strokeWidth="1" />

          <circle cx="228" cy="78" r="3.5" fill="#ffffff" stroke="#fde9a8" strokeWidth="1" />
          <circle cx="242" cy="95" r="4" fill="#ffffff" stroke="#cdbff0" strokeWidth="1.2" />
          <circle cx="255" cy="115" r="4.5" fill="#ffffff" stroke="#cdbff0" strokeWidth="1.2" />

          <circle cx="170" cy="55" r="4" fill="#ffffff" stroke="#ffd88b" strokeWidth="1" />
          <circle cx="155" cy="62" r="3" fill="#ffffff" stroke="#f6b9c9" strokeWidth="0.8" />
          <circle cx="185" cy="62" r="3" fill="#ffffff" stroke="#cdbff0" strokeWidth="0.8" />
        </g>

        {/* ─── 3 BUNGA CERBERA (GERBERA DAISY) MEKAR ─── */}
        <g
          className={cn(
            "transition-all duration-700 ease-out origin-bottom",
            bloomed ? "scale-100 opacity-100" : "scale-95 opacity-90"
          )}
        >
          {/* ════ BUNGA 1: CERBERA SUNSET PEACH (Tengah Atas, Paling Megah) ════ */}
          <g
            transform="translate(170, 105)"
            className={cn(
              "transition-all duration-700 ease-out origin-center delay-100",
              bloomed ? "scale-110 -translate-y-1 rotate-[3deg]" : "scale-100"
            )}
          >
            {/* Outer Petals (20 Kelopak Panjang) */}
            {renderCerberaPetals(20, 5, 26, 17, `url(#${id}-cerbera-peach-outer)`)}

            {/* Inner Petals Layer (20 Kelopak Lebih Rapat) */}
            {renderCerberaPetals(20, 4.2, 20, 13, `url(#${id}-cerbera-peach-inner)`)}

            {/* Micro Florets Ring (Pinggiran Putik) */}
            <circle cx="0" cy="0" r="14" fill="#ffd19a" stroke="#f89a6d" strokeWidth="1" />

            {/* Cerbera Disc Eye (Pusat Khas Bunga Gerbera/Cerbera) */}
            <circle cx="0" cy="0" r="11" fill={`url(#${id}-cerbera-eye)`} />
            <circle cx="0" cy="0" r="7" fill="#4a2f24" opacity="0.9" />

            {/* Golden Pollen Specks */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <circle
                key={deg}
                cx={Math.cos((deg * Math.PI) / 180) * 8.5}
                cy={Math.sin((deg * Math.PI) / 180) * 8.5}
                r="1.2"
                fill="#ffea9f"
              />
            ))}
          </g>

          {/* ════ BUNGA 2: CERBERA SWEET BLUSH PINK (Kiri) ════ */}
          <g
            transform="translate(115, 145)"
            className={cn(
              "transition-all duration-700 ease-out origin-center delay-150",
              bloomed ? "scale-110 -rotate-[8deg]" : "scale-100"
            )}
          >
            {/* Outer Petals */}
            {renderCerberaPetals(18, 4.8, 23, 15, `url(#${id}-cerbera-pink-outer)`)}

            {/* Inner Petals */}
            {renderCerberaPetals(18, 3.8, 17, 11, `url(#${id}-cerbera-pink-inner)`)}

            {/* Center Disc */}
            <circle cx="0" cy="0" r="12" fill="#ffb4cc" stroke="#e87698" strokeWidth="1" />
            <circle cx="0" cy="0" r="9.5" fill={`url(#${id}-cerbera-eye)`} />
            <circle cx="0" cy="0" r="6" fill="#4a2f24" opacity="0.88" />

            {/* Pollen ring */}
            {[20, 65, 110, 155, 200, 245, 290, 335].map((deg) => (
              <circle
                key={deg}
                cx={Math.cos((deg * Math.PI) / 180) * 7.5}
                cy={Math.sin((deg * Math.PI) / 180) * 7.5}
                r="1"
                fill="#fff2a8"
              />
            ))}
          </g>

          {/* ════ BUNGA 3: CERBERA WARM CORAL & CREAM (Kanan) ════ */}
          <g
            transform="translate(225, 145)"
            className={cn(
              "transition-all duration-700 ease-out origin-center delay-200",
              bloomed ? "scale-110 rotate-[8deg]" : "scale-100"
            )}
          >
            {/* Outer Petals */}
            {renderCerberaPetals(18, 4.8, 23, 15, `url(#${id}-cerbera-cream-outer)`)}

            {/* Inner Petals */}
            {renderCerberaPetals(18, 3.8, 17, 11, `url(#${id}-cerbera-cream-inner)`)}

            {/* Center Disc */}
            <circle cx="0" cy="0" r="12" fill="#fed6a6" stroke="#f49b6b" strokeWidth="1" />
            <circle cx="0" cy="0" r="9.5" fill={`url(#${id}-cerbera-eye)`} />
            <circle cx="0" cy="0" r="6" fill="#4a2f24" opacity="0.88" />

            {/* Pollen ring */}
            {[10, 55, 100, 145, 190, 235, 280, 325].map((deg) => (
              <circle
                key={deg}
                cx={Math.cos((deg * Math.PI) / 180) * 7.5}
                cy={Math.sin((deg * Math.PI) / 180) * 7.5}
                r="1"
                fill="#ffea9f"
              />
            ))}
          </g>
        </g>

        {/* ─── KERTAS PEMBUNGKUS DEPAN (Front Cellophane Wrapper) ─── */}
        <path
          d="M85 190 L170 345 L255 190 Q170 215 85 190 Z"
          fill="var(--color-bg-elevated, #fffaf7)"
          stroke="var(--color-line, #ecdcdc)"
          strokeWidth="1.5"
          opacity="0.92"
        />
        {/* Gloss highlight stripe pada kertas */}
        <path
          d="M98 198 L168 335"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.75"
        />

        {/* Label Badge "For Wulan 19" di Kertas Buket */}
        <g transform="translate(170, 240)">
          <rect x="-42" y="-11" width="84" height="22" rx="11" fill="#fff" stroke="#f6b9c9" strokeWidth="1.2" />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fill="#e87698"
            fontSize="9"
            fontWeight="bold"
            fontFamily="sans-serif"
            letterSpacing="0.8"
          >
            3 CERBERA • 19TH
          </text>
        </g>

        {/* ─── PITA & BOW BESAR + CHARM KUCING EMAS ─── */}
        <g transform="translate(170, 295)">
          {/* Ribbon Loops */}
          <ellipse cx="-22" cy="-2" rx="20" ry="12" transform="rotate(-15 -22 -2)" fill={`url(#${id}-ribbon)`} stroke="#fff" strokeWidth="1.5" />
          <ellipse cx="22" cy="-2" rx="20" ry="12" transform="rotate(15 22 -2)" fill={`url(#${id}-ribbon)`} stroke="#fff" strokeWidth="1.5" />
          {/* Ribbon Tails */}
          <path d="M-8 4 Q-18 26 -28 35 Q-14 26 -4 10 Z" fill="#f6b9c9" />
          <path d="M8 4 Q18 26 28 35 Q14 26 4 10 Z" fill="#cdbff0" />
          {/* Bow Knot */}
          <circle cx="0" cy="0" r="9" fill="#e88fa9" stroke="#fff" strokeWidth="1.5" />

          {/* Charm Kucing Emas Menggantung */}
          <g transform="translate(-10, 10) scale(0.9)">
            <circle cx="11" cy="11" r="9" fill="#fde9a8" stroke="#e88fa9" strokeWidth="1.5" />
            {/* Telinga Kucing pada Charm */}
            <polygon points="4,6 6,0 10,6" fill="#fde9a8" stroke="#e88fa9" strokeWidth="1" />
            <polygon points="12,6 16,0 18,6" fill="#fde9a8" stroke="#e88fa9" strokeWidth="1" />
            {/* Hidung & Mata Lucu */}
            <circle cx="8" cy="10" r="0.9" fill="#8a614d" />
            <circle cx="14" cy="10" r="0.9" fill="#8a614d" />
            <path d="M10 13 Q11 14.5 12 13" stroke="#8a614d" strokeWidth="0.8" fill="none" />
          </g>
        </g>

        {/* ─── FLOATING SPARKLES KETIKA MEKAR ─── */}
        {bloomed && (
          <g className="animate-twinkle">
            <Sparkle className="text-pink-deep" width="18" height="18" x="45" y="65" />
            <Sparkle className="text-butter" width="20" height="20" x="270" y="75" />
            <Sparkle className="text-lavender-deep" width="16" height="16" x="162" y="20" />
            <Sparkle className="text-pink" width="14" height="14" x="105" y="195" />
            <Sparkle className="text-butter" width="14" height="14" x="225" y="195" />
          </g>
        )}
      </svg>
    </div>
  );
}
