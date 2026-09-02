"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/lib/store";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useKonami(onSuccess?: () => void) {
  const [triggered, setTriggered] = useState(false);
  const unlockAchievement = useApp((s) => s.unlockAchievement);

  useEffect(() => {
    let index = 0;

    function handleKeyDown(e: KeyboardEvent) {
      // Ignore if inside an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      const currentCode = KONAMI_CODE[index];
      if (!currentCode) {
        index = 0;
        return;
      }

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expectedKey = currentCode.length === 1 ? currentCode.toLowerCase() : currentCode;

      if (key === expectedKey) {
        index++;
        if (index === KONAMI_CODE.length) {
          setTriggered(true);
          unlockAchievement("konami");
          onSuccess?.();
          index = 0;
        }
      } else {
        index = 0;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [unlockAchievement, onSuccess]);

  return { triggered, reset: () => setTriggered(false) };
}
