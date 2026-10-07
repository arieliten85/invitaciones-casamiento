"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { IconCircle, glyphs } from "./block";

export type EventInfo = {
  key: string;
  tab: string;
  glyph: string;
  label: string;
  time: string;
  day: string;
  name: string;
  address: string;
  note: string;
  url: string;
};

/**
 * Selector Civil / Fiesta con una pastilla que se desliza, y debajo la tarjeta del evento elegido.
 * Las dos tarjetas ocupan la misma celda: el alto no salta al cambiar.
 */
export function EventSwitch({ events, initial = 0 }: { events: readonly EventInfo[]; initial?: number }) {
  const [active, setActive] = useState(initial);
  const id = useId();

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : events.length - 1)) % events.length;
    setActive(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  }

  return (
    <div className="reveal-lg mx-auto max-w-md">
      <div
        role="tablist"
        aria-label="Elegí el evento"
        onKeyDown={onKey}
        className="bg-card/80 border-line relative grid grid-cols-2 rounded-full border p-1 shadow-[0_10px_24px_-18px_rgb(54_65_47/0.5)]"
      >
        <span
          aria-hidden="true"
          className="bg-leaf absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full shadow-[0_8px_18px_-10px_rgb(91_117_80/0.9)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(${active * 100}%)` }}
        />
        {events.map((e, i) => (
          <button
            key={e.key}
            id={`${id}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={`relative z-10 rounded-full py-3 text-[0.7rem] tracking-[0.3em] uppercase transition-colors duration-300 ${
              active === i ? "text-white" : "text-moss-soft hover:text-moss"
            }`}
          >
            {e.tab}
          </button>
        ))}
      </div>

      <div className="mt-5 grid">
        {events.map((e, i) => (
          <article
            key={e.key}
            id={`${id}-panel-${i}`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${i}`}
            inert={active !== i}
            className={`bg-card flex flex-col items-center rounded-[1.75rem] px-7 py-9 text-center shadow-[0_22px_44px_-30px_rgb(54_65_47/0.5)] transition-[opacity,transform] duration-500 [grid-area:1/1] ${
              active === i ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"
            }`}
          >
            <IconCircle path={e.glyph} />
            <p className="text-leaf-deep mt-5 text-[0.68rem] tracking-[0.35em] uppercase">{e.label}</p>
            <h3 className="text-moss mt-3 font-serif text-[1.75rem] leading-tight">{e.time}</h3>
            <p className="text-moss-soft text-sm first-letter:uppercase">{e.day}</p>
            <p className="text-moss mt-4 font-serif text-xl">{e.name}</p>
            <p className="text-moss-soft mt-1 text-sm">{e.address}</p>
            <p className="text-moss-soft/80 mt-3 flex-1 font-serif text-[0.95rem] italic">{e.note}</p>
            <a
              href={e.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-leaf-deep hover:text-moss mt-6 inline-flex items-center gap-2 text-[0.68rem] tracking-[0.3em] uppercase transition"
            >
              Ver en el mapa
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d={glyphs.pin} />
              </svg>
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
