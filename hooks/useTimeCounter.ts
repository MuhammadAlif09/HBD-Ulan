"use client";

import { useEffect, useState } from "react";

export interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
}

export function useTimeCounter(startDateISO: string): TimeElapsed {
  const [elapsed, setElapsed] = useState<TimeElapsed>(() => calculateElapsed(startDateISO));

  useEffect(() => {
    // Initial compute on client mount
    setElapsed(calculateElapsed(startDateISO));

    const interval = setInterval(() => {
      setElapsed(calculateElapsed(startDateISO));
    }, 1000);

    return () => clearInterval(interval);
  }, [startDateISO]);

  return elapsed;
}

function calculateElapsed(startDateISO: string): TimeElapsed {
  const start = new Date(startDateISO).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - start);

  const secondsTotal = Math.floor(diff / 1000);
  const minutesTotal = Math.floor(secondsTotal / 60);
  const hoursTotal = Math.floor(minutesTotal / 60);
  const days = Math.floor(hoursTotal / 24);

  const hours = hoursTotal % 24;
  const minutes = minutesTotal % 60;
  const seconds = secondsTotal % 60;

  const formatted = `${days} hari, ${hours} jam, ${minutes} menit, ${seconds} detik`;

  return { days, hours, minutes, seconds, formatted };
}
