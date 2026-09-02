"use client";

import { useState } from "react";
import { X, Sparkles, Gift, Heart, Check, RefreshCw, Star, Trophy, Sparkle as LucideSparkle } from "lucide-react";
import { ending, person } from "@/data/content";
import { Sparkle, CatEars } from "@/components/illustrations/Ornaments";
import { shootCelebrationBurst, shootSoftConfetti } from "@/lib/confetti";
import { cn } from "@/lib/cn";

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Interactive Luxury Gift Opening Modal
 * - Kotak Kado 3D interaktif yang bisa diketuk untuk membuka pita & tutupnya
 * - Hadiah Voucher VIP Ulang Tahun ke-19 bertema kartu emas holografik
 * - Petunjuk kado fisik di dunia nyata
 * - Tombol klaim voucher & bungkus ulang
 */
export function GiftModal({ isOpen, onClose }: GiftModalProps) {
  const [isUnboxed, setIsUnboxed] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);

  if (!isOpen) return null;

  const handleTapBox = () => {
    if (!isUnboxed) {
      setIsUnboxed(true);
      shootCelebrationBurst();
    }
  };

  const handleClaim = () => {
    setIsClaimed(true);
    shootCelebrationBurst();
  };

  const handleRebox = () => {
    setIsUnboxed(false);
    setIsClaimed(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg rounded-3xl bg-background-elevated p-5 sm:p-8 shadow-2xl border border-white/40 dark:border-white/10 z-10 toast-in max-h-[92vh] overflow-y-auto flex flex-col text-center">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup kado"
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-muted hover:text-foreground transition z-20"
        >
          <X className="h-5 w-5" />
        </button>

        {/* ════ STAGE 1: KOTAK KADO TERTUTUP (Ketik untuk Buka) ════ */}
        {!isUnboxed ? (
          <div className="py-6 flex flex-col items-center">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-pink/20 px-3.5 py-1 text-xs font-bold text-pink-deep mb-4">
              <Sparkle className="h-3.5 w-3.5" />
              <span>Kado Spesial Ulang Tahun ke-19</span>
              <Sparkle className="h-3.5 w-3.5" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Ada Kado Buat Wulan! 🎁
            </h3>
            <p className="text-xs sm:text-sm text-muted mb-6">
              Ketuk kotak kado di bawah untuk membuka pita dan melihat isinya.
            </p>

            {/* Interactive SVG Gift Box */}
            <div
              role="button"
              tabIndex={0}
              onClick={handleTapBox}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleTapBox();
                }
              }}
              className="group cursor-pointer relative transition-transform duration-300 hover:scale-105 active:scale-95 my-2"
              aria-label="Ketuk untuk membuka kotak hadiah"
            >
              <svg
                viewBox="0 0 220 220"
                className="w-48 h-48 sm:w-56 sm:h-56 drop-shadow-xl"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="box-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fca7c2" />
                    <stop offset="50%" stopColor="#f472b6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                  <linearGradient id="lid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffd4e3" />
                    <stop offset="60%" stopColor="#fca7c2" />
                    <stop offset="100%" stopColor="#e87698" />
                  </linearGradient>
                  <linearGradient id="gold-ribbon" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fff2a8" />
                    <stop offset="50%" stopColor="#ffd269" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>

                {/* Box Base Shadow */}
                <ellipse cx="110" cy="205" rx="80" ry="12" fill="#000000" opacity="0.12" />

                {/* Main Box Body */}
                <rect x="35" y="85" width="150" height="110" rx="14" fill="url(#box-grad)" stroke="#ffffff" strokeWidth="2" />

                {/* Vertical Ribbon */}
                <rect x="95" y="85" width="30" height="110" fill="url(#gold-ribbon)" stroke="#ffffff" strokeWidth="1.5" />
                {/* Horizontal Ribbon */}
                <rect x="35" y="130" width="150" height="26" fill="url(#gold-ribbon)" stroke="#ffffff" strokeWidth="1.5" />

                {/* Box Lid */}
                <g className="transition-transform duration-300 group-hover:-translate-y-2">
                  <rect x="25" y="58" width="170" height="34" rx="10" fill="url(#lid-grad)" stroke="#ffffff" strokeWidth="2" />
                  <rect x="95" y="58" width="30" height="34" fill="url(#gold-ribbon)" stroke="#ffffff" strokeWidth="1.5" />

                  {/* Ribbon Bow on Lid */}
                  {/* Left Bow */}
                  <ellipse cx="80" cy="45" rx="28" ry="16" transform="rotate(-25 80 45)" fill="url(#gold-ribbon)" stroke="#ffffff" strokeWidth="2" />
                  {/* Right Bow */}
                  <ellipse cx="140" cy="45" rx="28" ry="16" transform="rotate(25 140 45)" fill="url(#gold-ribbon)" stroke="#ffffff" strokeWidth="2" />
                  {/* Center Knot */}
                  <circle cx="110" cy="48" r="12" fill="#ffd269" stroke="#ffffff" strokeWidth="2" />
                  {/* Little Cat Ear silhouette on ribbon center */}
                  <polygon points="103,42 107,35 111,42" fill="#ffffff" />
                  <polygon points="109,42 113,35 117,42" fill="#ffffff" />
                </g>

                {/* Sparkles around box */}
                <g className="animate-twinkle">
                  <circle cx="25" cy="50" r="3" fill="#ffd269" />
                  <circle cx="195" cy="70" r="3.5" fill="#f472b6" />
                  <circle cx="30" cy="170" r="2.5" fill="#ffd269" />
                  <circle cx="190" cy="180" r="3" fill="#ffd269" />
                </g>
              </svg>

              {/* Pulsing Tap Badge */}
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-pink-deep px-4 py-1.5 text-xs font-bold text-white shadow-glow animate-bounce">
                <span>Ketuk Kotak Untuk Buka 🎀</span>
              </div>
            </div>
          </div>
        ) : (
          /* ════ STAGE 2: KADO TERBUKA & VOUCHER KENCAN VIP ════ */
          <div className="py-2 text-left animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center mb-5">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-pink/20 text-pink-deep shadow-soft">
                <Sparkle className="h-6 w-6 animate-twinkle" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground">
                {ending.finalTitle}
              </h3>
              <p className="text-xs text-muted">
                {ending.finalMessage}
              </p>
            </div>

            {/* ════ VOUCHER CARD (Golden VIP Pass) ════ */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/15 via-pink-500/10 to-purple-500/15 p-5 sm:p-6 border-2 border-amber-400/60 shadow-glow">
              {/* Holographic light reflection */}
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br from-amber-300/40 to-pink-300/20 blur-xl pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-amber-300/40 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-amber-950 font-bold text-xs shadow-xs">
                    👑
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600 dark:text-amber-300 block">
                      GOLDEN VIP PASS
                    </span>
                    <h4 className="font-serif text-sm sm:text-base font-bold text-foreground leading-tight">
                      Voucher Kencan Spesial 19 Tahun
                    </h4>
                  </div>
                </div>
                <span className="rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300 border border-amber-400/40">
                  Resmi Aktif ✨
                </span>
              </div>

              {/* Beneficiary Name */}
              <div className="mb-3">
                <span className="text-[11px] text-muted">Dipersembahkan khusus untuk:</span>
                <p className="font-serif text-lg font-bold text-pink-deep">
                  {person.name} 💖
                </p>
              </div>

              {/* Voucher Privileges List */}
              <div className="space-y-2 text-xs sm:text-sm text-foreground/90 font-light mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">✦</span>
                  <span><strong>1 Hari Jadi Ratu:</strong> Bebas tentukan mau jalan ke mana aja, jam berapa aja.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">✦</span>
                  <span><strong>Wisata Manis & Es Krim:</strong> Boleh jajan dessert & es krim favorit sepuasnya!</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">✦</span>
                  <span><strong>Layanan VIP & Senderan:</strong> Siap dengerin cerita, nemenin ngobrol, & peluk hangat.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">✦</span>
                  <span><strong>Anti-Ngambek Guarantee:</strong> Gak ada penolakan & selalu disenyumin seharian!</span>
                </div>
              </div>

              {/* Footer Code & Validity */}
              <div className="flex flex-wrap items-center justify-between pt-3 border-t border-amber-300/40 text-[11px] text-muted gap-2">
                <div className="font-mono font-bold text-foreground tracking-wider">
                  KODE: #WULAN19-SWEETEST-QUEEN
                </div>
                <div className="italic text-pink-deep font-medium">
                  Validitas: Berlaku Selamanya
                </div>
              </div>
            </div>

            {/* Kado Fisik Hint Card */}
            <div className="mt-3.5 rounded-2xl bg-background p-3.5 border border-line flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lavender/30 text-lavender-deep">
                <Gift className="h-5 w-5" />
              </div>
              <p className="text-xs text-foreground/80 leading-relaxed font-light">
                <strong>Catatan Kado Fisik:</strong> Hadiah nyata yang sudah dibungkus rapi sudah menunggu kamu di tempat spesial. Jangan lupa dicek yaa! 💝
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 space-y-2 text-center">
              <button
                type="button"
                onClick={handleClaim}
                disabled={isClaimed}
                className={cn(
                  "w-full rounded-full py-3 text-xs sm:text-sm font-bold text-white shadow-glow transition-all duration-300 flex items-center justify-center gap-2",
                  isClaimed
                    ? "bg-emerald-600 hover:bg-emerald-600 cursor-default"
                    : "bg-pink-deep hover:scale-[1.02] active:scale-95"
                )}
              >
                {isClaimed ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Voucher Berhasil Diklaim! Sampai Ketemu di Kencan Nanti 💖</span>
                  </>
                ) : (
                  <>
                    <Heart className="h-4 w-4 fill-white" />
                    <span>Klaim Voucher Sekarang</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleRebox}
                  className="text-xs text-muted hover:text-foreground inline-flex items-center gap-1.5 transition"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>Bungkus Ulang Kado</span>
                </button>

                <span className="text-muted/40">•</span>

                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-semibold text-pink-deep hover:underline"
                >
                  Selesai
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
