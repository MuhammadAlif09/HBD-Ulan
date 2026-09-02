"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";
import { CatEars, Sparkle, Star } from "./Ornaments";

interface CakeProps {
  blown: boolean;
  onBlow?: () => void;
  className?: string;
}

/**
 * Upgraded Luxury Kawaii Birthday Cake (SVG) untuk Wulan ke-19:
 * - 2-Tier Gourmet Celebration Cake dengan piring stand pedestal keramik emas
 * - Drip frosting stroberi & vanila tebal meleleh + hiasan whipped cream scallop
 * - Topping buah stroberi segar mengkilap & ceri kembar menggemaskan
 * - Lilin angka emas "19" dengan api flicker dinamis & efek glow hangat
 * - Cat-ear topper & hiasan pita satin manis
 * - Efek tiup: asap spiral realistis saat padam + percikan bintang
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
      aria-label={blown ? "Lilin angka 19 sudah ditiup! Make a wish." : "Klik lilin angka 19 untuk meniup"}
      className={cn(
        "group relative mx-auto block cursor-pointer select-none transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-deep",
        className
      )}
    >
      <svg
        viewBox="0 0 340 370"
        className="h-auto w-full max-w-[300px] sm:max-w-[340px] drop-shadow-lg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients Base Plate & Pedestal */}
          <linearGradient id={`${id}-plate-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#fff8f2" />
            <stop offset="100%" stopColor="#fae5d8" />
          </linearGradient>
          <linearGradient id={`${id}-gold-rim`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffe49e" />
            <stop offset="50%" stopColor="#ffd269" />
            <stop offset="100%" stopColor="#f5b342" />
          </linearGradient>

          {/* Tier 1 (Bottom Tier) Sponge & Frosting */}
          <linearGradient id={`${id}-tier1-sponge`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff6ee" />
            <stop offset="50%" stopColor="#faece1" />
            <stop offset="100%" stopColor="#f3ddcb" />
          </linearGradient>
          <linearGradient id={`${id}-drip-pink`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fedae5" />
            <stop offset="50%" stopColor="#fca7c2" />
            <stop offset="100%" stopColor="#f28dae" />
          </linearGradient>

          {/* Tier 2 (Top Tier) */}
          <linearGradient id={`${id}-tier2-sponge`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#fff0f5" />
            <stop offset="100%" stopColor="#fde0ea" />
          </linearGradient>
          <linearGradient id={`${id}-drip-lavender`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3eeff" />
            <stop offset="50%" stopColor="#d9caff" />
            <stop offset="100%" stopColor="#bea8f8" />
          </linearGradient>

          {/* Golden Candle Number "19" Gradient */}
          <linearGradient id={`${id}-candle-gold`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff6cc" />
            <stop offset="30%" stopColor="#ffd868" />
            <stop offset="70%" stopColor="#f3b53f" />
            <stop offset="100%" stopColor="#d88e1e" />
          </linearGradient>

          {/* Strawberry & Cherry Gradients */}
          <radialGradient id={`${id}-strawberry`} cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ff859d" />
            <stop offset="40%" stopColor="#f43f6e" />
            <stop offset="100%" stopColor="#b91c49" />
          </radialGradient>
          <radialGradient id={`${id}-cherry`} cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ff7a93" />
            <stop offset="50%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#881337" />
          </radialGradient>

          {/* Flame Gradients & Warm Glow */}
          <radialGradient id={`${id}-flame-warm`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#fff4b8" />
            <stop offset="55%" stopColor="#ffb03a" />
            <stop offset="85%" stopColor="#ff4d6d" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id={`${id}-halo-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe699" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#ff9ebb" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          <filter id={`${id}-glow-filter`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ─── STAND / PEDESTAL PIRING KUE ELEGAN ─── */}
        <g id="cake-stand">
          {/* Base shadow */}
          <ellipse cx="170" cy="342" rx="120" ry="12" fill="#000000" opacity="0.08" />
          {/* Pedestal Foot */}
          <path d="M142 328 L135 342 L205 342 L198 328 Z" fill={`url(#${id}-gold-rim)`} opacity="0.9" />
          <ellipse cx="170" cy="342" rx="35" ry="5" fill="#e6a435" />

          {/* Main Ceramic Plate */}
          <ellipse cx="170" cy="325" rx="145" ry="22" fill={`url(#${id}-plate-grad)`} stroke="var(--color-line, #ecdcdc)" strokeWidth="1.5" />
          {/* Plate Golden Rim */}
          <ellipse cx="170" cy="325" rx="145" ry="22" stroke={`url(#${id}-gold-rim)`} strokeWidth="3" fill="none" />
          <ellipse cx="170" cy="324" rx="136" ry="18" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
        </g>

        {/* ─── TIER 1 (Lapis Bawah, Diameter Besar) ─── */}
        <g id="tier-1">
          {/* Base Sponge */}
          <rect x="55" y="225" width="230" height="90" rx="18" fill={`url(#${id}-tier1-sponge)`} />
          {/* Bottom border shading */}
          <path d="M55 295 Q170 324 285 295 L285 315 Q170 340 55 315 Z" fill="#ecd1be" opacity="0.4" />

          {/* Barisan Whipped Cream Shells / Mutiara Krim di Dasar Tier 1 */}
          {Array.from({ length: 13 }).map((_, i) => {
            const cx = 68 + i * 17;
            return (
              <circle
                key={i}
                cx={cx}
                cy="312"
                r="7"
                fill="#ffffff"
                stroke="#fae0e7"
                strokeWidth="1"
              />
            );
          })}

          {/* Drip Icing Stroberi Meleleh (Tier 1) */}
          <path
            d="M55 225 
               Q70 258 85 235 
               Q100 270 115 240 
               Q130 280 148 242 
               Q168 285 188 245 
               Q205 275 222 238 
               Q240 268 258 232 
               Q272 255 285 225 
               L285 220 L55 220 Z"
            fill={`url(#${id}-drip-pink)`}
          />
          {/* Gloss highlight on drip */}
          <path
            d="M62 225 Q95 222 170 223 Q245 222 278 225"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Sprinkles & Pearls on Tier 1 */}
          <circle cx="85" cy="275" r="3" fill="#ffe49e" />
          <circle cx="120" cy="285" r="3.5" fill="#ffffff" stroke="#f6b9c9" strokeWidth="1" />
          <rect x="155" y="278" width="9" height="4" rx="2" transform="rotate(15 155 278)" fill="#b8e4d4" />
          <circle cx="195" cy="280" r="3" fill="#cdbff0" />
          <rect x="235" y="275" width="9" height="4" rx="2" transform="rotate(-25 235 275)" fill="#ffe49e" />
          <circle cx="260" cy="280" r="3.5" fill="#fca7c2" />
        </g>

        {/* ─── TIER 2 (Lapis Atas, Diameter Lebih Ramping) ─── */}
        <g id="tier-2">
          {/* Base Sponge Tier 2 */}
          <rect x="88" y="148" width="164" height="78" rx="16" fill={`url(#${id}-tier2-sponge)`} />
          {/* Shadow behind Tier 2 */}
          <path d="M88 215 Q170 230 252 215" stroke="#ecc9d4" strokeWidth="3" opacity="0.6" />

          {/* Barisan Whipped Cream Shells di pertemuan Tier 1 & 2 */}
          {Array.from({ length: 11 }).map((_, i) => {
            const cx = 96 + i * 15;
            return (
              <circle
                key={i}
                cx={cx}
                cy="222"
                r="6"
                fill="#ffffff"
                stroke="#fae0e7"
                strokeWidth="1"
              />
            );
          })}

          {/* Drip Icing Lavender Pastel Meleleh (Tier 2) */}
          <path
            d="M88 148 
               Q105 178 120 158 
               Q138 188 155 162 
               Q172 195 190 160 
               Q208 185 225 156 
               Q240 178 252 148 
               L252 144 L88 144 Z"
            fill={`url(#${id}-drip-lavender)`}
          />
          <path
            d="M96 148 Q170 146 244 148"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Sprinkles on Tier 2 */}
          <rect x="110" y="190" width="8" height="3.5" rx="1.8" transform="rotate(-30 110 190)" fill="#f6b9c9" />
          <circle cx="138" cy="195" r="3" fill="#ffe49e" />
          <circle cx="170" cy="190" r="3" fill="#b8e4d4" />
          <rect x="202" y="192" width="8" height="3.5" rx="1.8" transform="rotate(25 202 192)" fill="#ffd269" />
          <circle cx="230" cy="188" r="3" fill="#fca7c2" />
        </g>

        {/* ─── DEKORASI BUAH STROBERI & CERI (Topping) ─── */}
        <g id="fruit-toppings">
          {/* Stroberi Kiri (Tier 2 Top) */}
          <g transform="translate(100, 126)">
            {/* Strawberry body */}
            <path
              d="M12 28 C6 22 2 12 8 4 C14 -2 24 -2 30 4 C36 12 32 22 26 28 C20 34 18 34 12 28 Z"
              fill={`url(#${id}-strawberry)`}
            />
            {/* Seeds */}
            <circle cx="14" cy="10" r="0.9" fill="#fff5ea" />
            <circle cx="22" cy="8" r="0.9" fill="#fff5ea" />
            <circle cx="18" cy="16" r="0.9" fill="#fff5ea" />
            <circle cx="26" cy="18" r="0.9" fill="#fff5ea" />
            <circle cx="19" cy="24" r="0.8" fill="#fff5ea" />
            {/* Green Calyx Leaves */}
            <path d="M19 2 L14 -4 L18 -1 L24 -5 L22 1 L28 -2 L23 3 Z" fill="#52b788" />
            {/* Gloss highlight */}
            <ellipse cx="13" cy="8" rx="2.5" ry="5" transform="rotate(-30 13 8)" fill="#ffffff" opacity="0.65" />
          </g>

          {/* Ceri Kembar Kanan (Tier 2 Top) */}
          <g transform="translate(208, 122)">
            {/* Stems */}
            <path d="M18 -8 Q22 4 14 16" stroke="#40916c" strokeWidth="1.8" fill="none" />
            <path d="M18 -8 Q26 6 28 17" stroke="#40916c" strokeWidth="1.8" fill="none" />
            {/* Tiny Stem Leaf */}
            <ellipse cx="20" cy="-6" rx="5" ry="2.5" transform="rotate(-20 20 -6)" fill="#74c69d" />
            {/* Left Cherry */}
            <circle cx="14" cy="18" r="9" fill={`url(#${id}-cherry)`} />
            <ellipse cx="11" cy="14" rx="2.5" ry="4" transform="rotate(-30 11 14)" fill="#ffffff" opacity="0.7" />
            {/* Right Cherry */}
            <circle cx="28" cy="19" r="8.5" fill={`url(#${id}-cherry)`} />
            <ellipse cx="25" cy="15" rx="2.2" ry="3.5" transform="rotate(-30 25 15)" fill="#ffffff" opacity="0.7" />
          </g>

          {/* Soft-Serve Whipped Swirl Tengah */}
          <path
            d="M152 144 C148 130 162 118 170 110 C178 118 192 130 188 144 C180 148 160 148 152 144 Z"
            fill="#ffffff"
            stroke="#fce7ee"
            strokeWidth="1.5"
          />
        </g>

        {/* ─── PITA & CAT CHARM DI DASAR KUE ─── */}
        <g transform="translate(170, 298)">
          {/* Bow Loops */}
          <ellipse cx="-18" cy="0" rx="16" ry="10" transform="rotate(-15 -18 0)" fill="#fca7c2" stroke="#fff" strokeWidth="1.5" />
          <ellipse cx="18" cy="0" rx="16" ry="10" transform="rotate(15 18 0)" fill="#fca7c2" stroke="#fff" strokeWidth="1.5" />
          {/* Center Knot with Gold Cat Silhouette */}
          <circle cx="0" cy="0" r="7" fill="#e87698" stroke="#fff" strokeWidth="1.5" />
          {/* Bow Tails */}
          <path d="M-6 5 Q-15 22 -22 28 Q-12 20 -3 8 Z" fill="#fca7c2" />
          <path d="M6 5 Q15 22 22 28 Q12 20 3 8 Z" fill="#cdbff0" />
        </g>

        {/* ─── KAWAII CAT EARS TOPPER KUE ─── */}
        <g transform="translate(148, 86)">
          {/* Left Ear */}
          <path d="M0 24 L10 2 L22 20 Z" fill="#fca7c2" stroke="#fff" strokeWidth="2" />
          <path d="M4 22 L10 8 L18 19 Z" fill="#ffffff" opacity="0.85" />
          {/* Right Ear */}
          <path d="M22 20 L34 2 L44 24 Z" fill="#fca7c2" stroke="#fff" strokeWidth="2" />
          <path d="M26 19 L34 8 L40 22 Z" fill="#ffffff" opacity="0.85" />
        </g>

        {/* ─── LILIN ANGKA EMAS "19" DENGAN API FLICKER MEWAH ─── */}
        <g transform="translate(144, 25)">
          {/* Candle Pedestal stick */}
          <rect x="10" y="48" width="4" height="20" fill="#ecdcdc" rx="1" />
          <rect x="38" y="48" width="4" height="20" fill="#ecdcdc" rx="1" />

          {/* ════ ANGKA 1 EMAS ════ */}
          <g transform="translate(4, 16)">
            {/* Shading / 3D Extrusion */}
            <path
              d="M4 14 L12 6 L18 6 L18 36 L10 36 L10 14 Z"
              fill="#b97818"
              transform="translate(1.5, 1.5)"
            />
            {/* Main Number 1 */}
            <path
              d="M4 14 L12 6 L18 6 L18 36 L10 36 L10 14 Z"
              fill={`url(#${id}-candle-gold)`}
              stroke="#ffffff"
              strokeWidth="1.2"
            />
            {/* Highlight */}
            <line x1="12" y1="9" x2="16" y2="7" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="15" y1="9" x2="15" y2="34" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
          </g>

          {/* ════ ANGKA 9 EMAS ════ */}
          <g transform="translate(28, 16)">
            {/* Shading */}
            <path
              d="M20 6 C28 6 32 12 32 20 C32 30 26 36 14 36 C10 36 8 33 10 30 C12 28 16 28 18 28 C24 28 26 24 26 20 C24 23 20 25 15 25 C7 25 4 19 4 13 C4 5 11 6 20 6 Z M18 12 C13 12 10 14 10 17 C10 20 13 21 16 21 C20 21 24 19 24 16 C24 13 21 12 18 12 Z"
              fill="#b97818"
              transform="translate(1.5, 1.5)"
            />
            {/* Main Number 9 */}
            <path
              d="M20 6 C28 6 32 12 32 20 C32 30 26 36 14 36 C10 36 8 33 10 30 C12 28 16 28 18 28 C24 28 26 24 26 20 C24 23 20 25 15 25 C7 25 4 19 4 13 C4 5 11 6 20 6 Z M18 12 C13 12 10 14 10 17 C10 20 13 21 16 21 C20 21 24 19 24 16 C24 13 21 12 18 12 Z"
              fill={`url(#${id}-candle-gold)`}
              stroke="#ffffff"
              strokeWidth="1.2"
            />
            <path d="M12 9 C16 7 24 7 28 12" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" fill="none" />
          </g>

          {/* Sumbu Lilin (Wicks) */}
          <line x1="18" y1="22" x2="18" y2="15" stroke="#4a3728" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="46" y1="22" x2="46" y2="15" stroke="#4a3728" strokeWidth="1.5" strokeLinecap="round" />

          {/* ════ KONDISI API: MENYALA vs DITIUP ════ */}
          {!blown ? (
            <>
              {/* Flame on Number 1 */}
              <g className="animate-flicker origin-bottom" style={{ transformOrigin: "18px 15px" }}>
                <circle cx="18" cy="8" r="15" fill={`url(#${id}-halo-glow)`} />
                <path
                  d="M18 -5 C22 2 24 9 18 16 C12 9 14 2 18 -5 Z"
                  fill={`url(#${id}-flame-warm)`}
                  filter={`url(#${id}-glow-filter)`}
                />
                <path d="M18 1 C20 5 21 10 18 14 C15 10 16 5 18 1 Z" fill="#ffffff" />
              </g>

              {/* Flame on Number 9 */}
              <g
                className="animate-flicker origin-bottom"
                style={{ transformOrigin: "46px 15px", animationDelay: "0.15s" }}
              >
                <circle cx="46" cy="8" r="15" fill={`url(#${id}-halo-glow)`} />
                <path
                  d="M46 -5 C50 2 52 9 46 16 C40 9 42 2 46 -5 Z"
                  fill={`url(#${id}-flame-warm)`}
                  filter={`url(#${id}-glow-filter)`}
                />
                <path d="M46 1 C48 5 49 10 46 14 C43 10 44 5 46 1 Z" fill="#ffffff" />
              </g>

              {/* Sparkle embers floating above candles */}
              <g className="animate-twinkle">
                <circle cx="10" cy="-4" r="1.5" fill="#ffe49e" />
                <circle cx="55" cy="-2" r="1.5" fill="#ffd269" />
                <circle cx="32" cy="-8" r="1.8" fill="#ffffff" />
              </g>
            </>
          ) : (
            /* ════ ASAP SPIRAL & PERCIKAN SAAT DITIUP ════ */
            <g className="transition-opacity duration-500">
              {/* Smoke from Candle 1 */}
              <path
                d="M18 14 Q10 4 20 -4 Q26 -14 16 -22"
                stroke="var(--color-fg-muted, #8a7387)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.65"
                className="animate-float"
              />
              <path
                d="M19 12 Q26 2 16 -8 Q10 -16 22 -24"
                stroke="var(--color-lavender, #cdbff0)"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
                opacity="0.5"
                className="animate-float"
                style={{ animationDelay: "0.2s" }}
              />

              {/* Smoke from Candle 9 */}
              <path
                d="M46 14 Q38 4 48 -4 Q54 -14 44 -22"
                stroke="var(--color-fg-muted, #8a7387)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.65"
                className="animate-float"
                style={{ animationDelay: "0.1s" }}
              />
              <path
                d="M47 12 Q54 2 44 -8 Q38 -16 50 -24"
                stroke="var(--color-pink, #fca7c2)"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
                opacity="0.5"
                className="animate-float"
                style={{ animationDelay: "0.3s" }}
              />

              {/* Extinguished embers */}
              <circle cx="18" cy="15" r="2" fill="#e11d48" />
              <circle cx="46" cy="15" r="2" fill="#e11d48" />

              {/* Celebration Golden Sparkles when blown */}
              <g className="animate-twinkle">
                <Sparkle className="text-butter" width="16" height="16" x="2" y="-12" />
                <Sparkle className="text-pink-deep" width="14" height="14" x="50" y="-10" />
                <Sparkle className="text-lavender-deep" width="16" height="16" x="24" y="-20" />
              </g>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
