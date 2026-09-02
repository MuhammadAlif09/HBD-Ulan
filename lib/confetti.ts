"use client";

import confetti from "canvas-confetti";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Confetti helpers with gentle pastel & Y2K colors.
 * Responds gracefully to prefers-reduced-motion.
 */

const PASTEL_COLORS = ["#f6b9c9", "#cdbff0", "#cdeee3", "#fde9a8", "#fff2e3", "#f2a7bd"];

export function shootSoftConfetti(origin = { x: 0.5, y: 0.6 }) {
  if (prefersReducedMotion()) return;

  confetti({
    particleCount: 45,
    spread: 60,
    origin,
    colors: PASTEL_COLORS,
    ticks: 200,
    gravity: 0.8,
    scalar: 0.9,
    shapes: ["circle"],
    disableForReducedMotion: true,
  });
}

export function shootCelebrationBurst() {
  if (prefersReducedMotion()) return;

  const count = 75;
  const defaults = {
    origin: { y: 0.7 },
    colors: PASTEL_COLORS,
    disableForReducedMotion: true,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 45,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 35,
  });
}

export function shootStarShower() {
  if (prefersReducedMotion()) return;

  confetti({
    particleCount: 30,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.65 },
    colors: ["#f6b9c9", "#fde9a8", "#cdbff0"],
    ticks: 240,
    gravity: 0.7,
  });
  confetti({
    particleCount: 30,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.65 },
    colors: ["#cdeee3", "#f6b9c9", "#cdbff0"],
    ticks: 240,
    gravity: 0.7,
  });
}
