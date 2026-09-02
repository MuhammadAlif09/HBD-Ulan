"use client";

import { useEffect, useLayoutEffect, useRef, type DependencyList, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Jalankan setup GSAP dalam gsap.context() yang otomatis di-revert saat unmount / deps berubah.
 * `scope` membatasi selector di dalam callback ke elemen ref.
 */
export function useGsap<T extends HTMLElement>(
  setup: (ctx: { gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger; reduced: boolean; el: T }) => void | (() => void),
  deps: DependencyList = [],
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cleanup: void | (() => void);
    const ctx = gsap.context(() => {
      cleanup = setup({ gsap, ScrollTrigger, reduced: prefersReducedMotion(), el });
    }, el);
    return () => {
      cleanup?.();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

export type RevealVariant = "fade" | "up" | "left" | "right" | "scale" | "blur";

interface RevealOptions {
  variant?: RevealVariant;
  /** selector anak yang di-stagger; kalau kosong, elemen itu sendiri yang dianimasi */
  targets?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  start?: string;
  once?: boolean;
}

const FROM: Record<RevealVariant, gsap.TweenVars> = {
  fade: { autoAlpha: 0 },
  up: { autoAlpha: 0, y: 40 },
  left: { autoAlpha: 0, x: -40 },
  right: { autoAlpha: 0, x: 40 },
  scale: { autoAlpha: 0, scale: 0.92 },
  blur: { autoAlpha: 0, filter: "blur(10px)", y: 16 },
};

/**
 * Reveal saat masuk viewport (ScrollTrigger). Pilih variant berbeda per konten
 * (lihat skills/scroll-cinematics.md — jangan semua sama).
 * Reduced motion → fade sederhana saja.
 */
export function useReveal<T extends HTMLElement>(opts: RevealOptions = {}, deps: DependencyList = []) {
  const {
    variant = "up",
    targets,
    stagger = 0.08,
    duration = 0.9,
    delay = 0,
    start = "top 82%",
    once = true,
  } = opts;

  return useGsap<T>(
    ({ gsap, reduced, el }) => {
      const items = targets ? Array.from(el.querySelectorAll<HTMLElement>(targets)) : [el];
      if (!items.length) return;
      const from = reduced ? FROM.fade : FROM[variant];
      gsap.set(items, { ...from });
      gsap.to(items, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: reduced ? 0.5 : duration,
        delay,
        ease: "power3.out",
        stagger: reduced ? 0.03 : stagger,
        scrollTrigger: {
          trigger: el,
          start,
          once,
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
      });
    },
    deps,
  );
}
