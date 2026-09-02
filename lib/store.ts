"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AchievementId, MoodId } from "@/data/content";

export type Theme = "light" | "dark";

interface Toast {
  id: number;
  achievement: AchievementId;
}

interface AppState {
  // theme & mood — persist (project deploy sungguhan, localStorage aman — lihat skills/design-system.md)
  theme: Theme;
  mood: MoodId;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  setMood: (m: MoodId) => void;

  // unlock — hanya untuk sesi (tidak persist)
  unlocked: boolean;
  setUnlocked: (v: boolean) => void;

  // progress interaksi (persist per device)
  openedCards: number[];
  openCard: (i: number) => void;
  allCardsCelebrated: boolean;
  markCardsCelebrated: () => void;

  visitedGalleryTabs: string[];
  visitGalleryTab: (id: string) => void;

  candleBlown: boolean;
  setCandleBlown: (v: boolean) => void;
  bouquetBloomed: boolean;
  setBouquetBloomed: (v: boolean) => void;
  letterOpened: boolean;
  setLetterOpened: (v: boolean) => void;
  letterFinished: boolean;
  setLetterFinished: (v: boolean) => void;
  giftOpened: boolean;
  setGiftOpened: (v: boolean) => void;

  // achievements
  achievements: AchievementId[];
  toasts: Toast[];
  unlockAchievement: (id: AchievementId) => void;
  dismissToast: (id: number) => void;
}

let toastSeq = 0;

export const useApp = create<AppState>()(
  persist(
    (set, get) => ({
      theme: "light",
      mood: "dreamy",
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set({ theme: get().theme === "dark" ? "light" : "dark" }),
      setMood: (mood) => set({ mood }),

      unlocked: false,
      setUnlocked: (unlocked) => set({ unlocked }),

      openedCards: [],
      openCard: (i) =>
        set((s) => (s.openedCards.includes(i) ? s : { openedCards: [...s.openedCards, i] })),
      allCardsCelebrated: false,
      markCardsCelebrated: () => set({ allCardsCelebrated: true }),

      visitedGalleryTabs: [],
      visitGalleryTab: (id) =>
        set((s) =>
          s.visitedGalleryTabs.includes(id) ? s : { visitedGalleryTabs: [...s.visitedGalleryTabs, id] },
        ),

      candleBlown: false,
      setCandleBlown: (candleBlown) => set({ candleBlown }),
      bouquetBloomed: false,
      setBouquetBloomed: (bouquetBloomed) => set({ bouquetBloomed }),
      letterOpened: false,
      setLetterOpened: (letterOpened) => set({ letterOpened }),
      letterFinished: false,
      setLetterFinished: (letterFinished) => set({ letterFinished }),
      giftOpened: false,
      setGiftOpened: (giftOpened) => set({ giftOpened }),

      achievements: [],
      toasts: [],
      unlockAchievement: (id) => {
        if (get().achievements.includes(id)) return;
        const toast: Toast = { id: ++toastSeq, achievement: id };
        set((s) => ({ achievements: [...s.achievements, id], toasts: [...s.toasts, toast] }));
      },
      dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
    }),
    {
      name: "wulan-bday-v1",
      storage: createJSONStorage(() => localStorage),
      // Jangan persist state sesi (unlock, toasts)
      partialize: (s) => ({
        theme: s.theme,
        mood: s.mood,
        openedCards: s.openedCards,
        allCardsCelebrated: s.allCardsCelebrated,
        visitedGalleryTabs: s.visitedGalleryTabs,
        candleBlown: s.candleBlown,
        bouquetBloomed: s.bouquetBloomed,
        letterOpened: s.letterOpened,
        letterFinished: s.letterFinished,
        giftOpened: s.giftOpened,
        achievements: s.achievements,
      }),
    },
  ),
);
