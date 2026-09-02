"use client";

import { useState } from "react";
import { Gift, Heart, Mic, Sparkles } from "lucide-react";
import { gift } from "@/data/content";
import { Cake } from "@/components/illustrations/Cake";
import { Bouquet } from "@/components/illustrations/Bouquet";
import { useApp } from "@/lib/store";
import { useReveal } from "@/hooks/useGsap";
import { shootCelebrationBurst, shootStarShower } from "@/lib/confetti";
import { Sparkle, Star } from "@/components/illustrations/Ornaments";
import { cn } from "@/lib/cn";

export function GiftMoment() {
  const candleBlown = useApp((s) => s.candleBlown);
  const setCandleBlown = useApp((s) => s.setCandleBlown);
  const bouquetBloomed = useApp((s) => s.bouquetBloomed);
  const setBouquetBloomed = useApp((s) => s.setBouquetBloomed);
  const unlockAchievement = useApp((s) => s.unlockAchievement);

  const [micListening, setMicListening] = useState(false);
  const [micError, setMicError] = useState(false);

  const containerRef = useReveal<HTMLElement>({
    variant: "up",
    duration: 1,
    start: "top 75%",
  });

  const handleBlowCandle = () => {
    if (candleBlown) return;
    setCandleBlown(true);
    unlockAchievement("blew-the-candle");
    shootCelebrationBurst();
  };

  const handleBloomBouquet = () => {
    if (bouquetBloomed) return;
    setBouquetBloomed(true);
    unlockAchievement("bouquet-bloomed");
    shootStarShower();
  };

  const startMicBlowDetection = async () => {
    try {
      setMicError(false);
      setMicListening(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;

      microphone.connect(analyser);
      analyser.connect(javascriptNode);
      javascriptNode.connect(audioContext.destination);

      javascriptNode.onaudioprocess = () => {
        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        let values = 0;
        const length = array.length;
        for (let i = 0; i < length; i++) {
          values += array[i]!;
        }
        const average = values / length;

        // Threshold for blowing into mic
        if (average > 45) {
          handleBlowCandle();
          // Stop stream
          stream.getTracks().forEach((track) => track.stop());
          javascriptNode.disconnect();
          setMicListening(false);
        }
      };
    } catch {
      setMicError(true);
      setMicListening(false);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24"
    >
      {/* Header */}
      <div className="mb-14 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full glass px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-pink-deep mb-3">
          <Gift className="h-3 w-3" />
          <span>{gift.sectionTitle}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-foreground">
          Kue & <span className="italic holo-text">Buket Bunga</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-muted max-w-md mx-auto">
          Dua hal spesial yang sengaja disiapin buat hari ulang tahunmu.
        </p>
      </div>

      {/* Gift Grid (Cake on Left, Bouquet on Right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-start">
        {/* Virtual Birthday Cake Card */}
        <div className="glass-strong flex flex-col items-center rounded-3xl p-6 sm:p-8 text-center shadow-soft border border-white/50 dark:border-white/10">
          <div className="mb-4">
            <h3 className="font-serif text-2xl font-semibold text-foreground">
              {gift.cakeTitle}
            </h3>
            <p className="mt-1 text-xs text-muted">
              {candleBlown ? "Lilin berhasil ditiup! ✨" : gift.cakeHint}
            </p>
          </div>

          {/* Cake Illustration */}
          <div className="my-4 w-full">
            <Cake blown={candleBlown} onBlow={handleBlowCandle} />
          </div>

          {/* Action Buttons & Message */}
          <div className="mt-4 w-full">
            {!candleBlown ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handleBlowCandle}
                  className="rounded-full bg-pink-deep px-5 py-2.5 text-xs font-semibold text-white shadow-md transition hover:scale-105 active:scale-95"
                >
                  Tiup Lilin (Klik)
                </button>

                <button
                  type="button"
                  onClick={startMicBlowDetection}
                  disabled={micListening}
                  className="inline-flex items-center gap-1.5 rounded-full bg-background-elevated px-4 py-2.5 text-xs font-semibold text-foreground/80 shadow-soft transition hover:scale-105 active:scale-95 border border-line"
                >
                  <Mic className="h-3.5 w-3.5 text-pink-deep" />
                  <span>{micListening ? "Mendengarkan tiupan..." : gift.cakeMicButton}</span>
                </button>
              </div>
            ) : (
              <div className="rounded-2xl bg-pink/15 p-4 toast-in border border-pink/30">
                <p className="font-serif text-sm font-medium italic text-foreground">
                  &ldquo;{gift.cakeWishText}&rdquo;
                </p>
              </div>
            )}

            {micError && (
              <p className="mt-2 text-[11px] text-pink-deep italic">
                {gift.cakeMicDenied}
              </p>
            )}
          </div>
        </div>

        {/* Virtual Bouquet Card */}
        <div className="glass-strong flex flex-col items-center rounded-3xl p-6 sm:p-8 text-center shadow-soft border border-white/50 dark:border-white/10">
          <div className="mb-4">
            <h3 className="font-serif text-2xl font-semibold text-foreground">
              {gift.bouquetTitle}
            </h3>
            <p className="mt-1 text-xs text-muted">
              {bouquetBloomed ? "Buket bunganya mekar cantik! 🌸" : gift.bouquetHint}
            </p>
          </div>

          {/* Bouquet Illustration */}
          <div className="my-4 w-full">
            <Bouquet bloomed={bouquetBloomed} onBloom={handleBloomBouquet} />
          </div>

          {/* Action Buttons & Note */}
          <div className="mt-4 w-full">
            {!bouquetBloomed ? (
              <button
                type="button"
                onClick={handleBloomBouquet}
                className="rounded-full bg-lavender-deep px-6 py-2.5 text-xs font-semibold text-white shadow-md transition hover:scale-105 active:scale-95"
              >
                Mekarkan Buket Bunga
              </button>
            ) : (
              <div className="rounded-2xl bg-lavender/20 p-4 toast-in border border-lavender/40">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-lavender-deep mb-1 block">
                  Pesan Dari Buket
                </span>
                <p className="font-serif text-sm font-medium italic text-foreground">
                  &ldquo;{gift.bouquetCard}&rdquo;
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
