"use client";

import { useSyncExternalStore } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type Props = {
  /** Instante del evento en ISO 8601. */
  target: string;
  calendarHref: string;
};

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diff(target: number, now: number): Parts | null {
  const total = Math.floor((target - now) / 1000);
  if (total <= 0) return null;
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

const two = (n: number) => String(n).padStart(2, "0");

// Reloj externo: se actualiza cada segundo. En el servidor devuelve null,
// así el HTML inicial coincide con el del navegador (sin errores de hidratación).
function subscribe(onTick: () => void) {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
}
const getNow = () => Math.floor(Date.now() / 1000) * 1000;
const getServerNow = () => null;

export function Countdown({ target, calendarHref }: Props) {
  const now = useSyncExternalStore(subscribe, getNow, getServerNow);

  const targetMs = new Date(target).getTime();
  const parts = now === null ? undefined : diff(targetMs, now);
  const finished = now !== null && parts === null;

  const tiles: Array<{ label: string; value: string }> = [
    { label: "días", value: parts ? String(parts.days) : "--" },
    { label: "horas", value: parts ? two(parts.hours) : "--" },
    { label: "minutos", value: parts ? two(parts.minutes) : "--" },
    { label: "segundos", value: parts ? two(parts.seconds) : "--" },
  ];

  return (
    <section aria-labelledby="cuenta-titulo" className="bg-surface/70 py-16 sm:py-24">
      <Container size="narrow">
        <SectionHeading id="cuenta-titulo" title="Falta poco" />

        {finished ? (
          <p className="text-primary text-center font-serif text-3xl italic">¡Hoy es el gran día!</p>
        ) : (
          <div role="timer" aria-label="Cuenta regresiva" className="grid grid-cols-4 gap-2 sm:gap-5">
            {tiles.map((t) => (
              <div
                key={t.label}
                className="border-border bg-surface rounded-2xl border px-1 py-4 text-center shadow-(--shadow-card) sm:py-7"
              >
                <span className="text-primary block font-serif text-3xl font-medium lining-nums tabular-nums sm:text-5xl">
                  {t.value}
                </span>
                <span className="text-muted mt-1 block text-[0.65rem] font-semibold tracking-widest uppercase sm:text-xs">
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <p className="mt-8 text-center">
          <a
            href={calendarHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary decoration-primary/40 hover:decoration-primary font-semibold underline underline-offset-4"
          >
            Agregar a mi calendario
          </a>
        </p>
      </Container>
    </section>
  );
}
