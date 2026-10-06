"use client";

import { useSyncExternalStore } from "react";

const two = (n: number) => String(n).padStart(2, "0");
const subscribe = (tick: () => void) => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
};
const getNow = () => Math.floor(Date.now() / 1000) * 1000;
const getServerNow = () => null;

export function CountdownCircles({ target }: { target: string }) {
  const now = useSyncExternalStore(subscribe, getNow, getServerNow);
  const total = now === null ? null : Math.max(0, Math.floor((new Date(target).getTime() - now) / 1000));
  const values =
    total === null
      ? ["--", "--", "--", "--"]
      : [
          String(Math.floor(total / 86400)),
          two(Math.floor((total % 86400) / 3600)),
          two(Math.floor((total % 3600) / 60)),
          two(total % 60),
        ];
  const labels = ["Días", "Hs", "Min", "Seg"];

  return (
    <div role="timer" aria-label="Cuenta regresiva" className="flex justify-center gap-1.5 sm:gap-2.5">
      {labels.map((label, i) => (
        <div
          key={label}
          className="text-ink/80 flex aspect-square w-[21vw] max-w-[10.6rem] flex-col items-center justify-center rounded-full border border-black/50"
        >
          <span className="text-2xl font-light tabular-nums sm:text-3xl">{values[i]}</span>
          <span className="text-sm sm:text-base">{label}</span>
        </div>
      ))}
    </div>
  );
}
