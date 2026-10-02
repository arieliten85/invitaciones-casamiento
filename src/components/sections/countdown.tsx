"use client";

import { useSyncExternalStore } from "react";
import { Container } from "@/components/ui/container";
import { HourglassIcon } from "@/components/ui/icons";
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
    <section aria-labelledby="cuenta-titulo" className="bg-surface-muted/60 py-20 sm:py-28">
      <Container size="narrow">
        <SectionHeading
          id="cuenta-titulo"
          eyebrow="Cuenta regresiva"
          title="Falta poco"
          icon={<HourglassIcon />}
        />

        {finished ? (
          <p className="text-foreground text-center font-serif text-3xl italic">¡Hoy es el gran día!</p>
        ) : (
          <div role="timer" aria-label="Cuenta regresiva" className="grid grid-cols-4 gap-3 sm:gap-8">
            {tiles.map((t) => (
              <div key={t.label} className="border-border border-t px-1 pt-5 text-center sm:pt-7">
                <span className="text-foreground block font-serif text-4xl font-medium lining-nums tabular-nums sm:text-6xl">
                  {t.value}
                </span>
                <span className="text-muted mt-2 block text-[0.65rem] font-medium tracking-[0.15em] uppercase sm:text-xs sm:tracking-[0.3em]">
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
            className="text-foreground decoration-foreground/40 hover:decoration-foreground text-sm font-medium tracking-[0.18em] uppercase underline underline-offset-8"
          >
            Agregar a mi calendario
          </a>
        </p>
      </Container>
    </section>
  );
}
