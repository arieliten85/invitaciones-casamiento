"use client";

import { useSyncExternalStore } from "react";

const two = (n: number) => String(n).padStart(2, "0");
const subscribe = (tick: () => void) => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
};
const getNow = () => Math.floor(Date.now() / 1000) * 1000;
const getServerNow = () => null;

/** Cuenta regresiva en cajitas blancas, para la tarjeta «Falta poco». */
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
  const labels = ["Días", "Horas", "Min", "Seg"];

  return (
    <div
      role="timer"
      aria-label="Cuenta regresiva"
      className="reveal-stagger mx-auto grid max-w-md grid-cols-4 gap-2.5 sm:gap-4"
    >
      {labels.map((label, i) => (
        <div key={label} className="flex flex-col items-center">
          <span className="bg-card text-leaf flex aspect-square w-full items-center justify-center rounded-2xl font-serif text-2xl tabular-nums shadow-[0_10px_24px_-18px_rgb(54_65_47/0.5)] sm:text-[2rem]">
            {values[i]}
          </span>
          <span className="text-moss-soft mt-3 text-[0.62rem] tracking-[0.2em] uppercase">{label}</span>
        </div>
      ))}
    </div>
  );
}
