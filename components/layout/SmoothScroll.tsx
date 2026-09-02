"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap, ScrollTrigger } from "@/hooks/useGsap";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { useApp } from "@/lib/store";

let lenisInstance: Lenis | null = null;
export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Lenis smooth scroll + sinkron ke GSAP ScrollTrigger (lihat skills/scroll-cinematics.md).
 * - Reduced motion → Lenis tidak diaktifkan (scroll native).
 * - Saat unlock screen aktif → Lenis di-stop supaya konten di belakang tidak ikut scroll.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const unlocked = useApp((s) => s.unlocked);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });
    lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisInstance;
    if (!lenis) return;
    if (unlocked) lenis.start();
    else lenis.stop();
  }, [unlocked]);

  return <>{children}</>;
}
