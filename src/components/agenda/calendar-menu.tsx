"use client";

import { useEffect, useRef, useState } from "react";
import {
  googleCalendarLink,
  icsLink,
  microsoft365Link,
  outlookLink,
  yahooLink,
  type CalendarEvent,
} from "@/lib/calendar-link";
import { buttonStyles, type ButtonKind } from "./block";

export function CalendarMenu({ event, kind = "outline" }: { event: CalendarEvent; kind?: ButtonKind }) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const items = [
    { label: "Google Calendar", icon: "google", href: googleCalendarLink(event) },
    { label: "Outlook", icon: "outlook", href: outlookLink(event) },
    { label: "Microsoft 365", icon: "microsoft365", href: microsoft365Link(event) },
    { label: "Apple Calendar", icon: "apple", href: icsLink(event), download: "casamiento.ics" },
    { label: "Yahoo", icon: "yahoo", href: yahooLink(event) },
  ];

  return (
    <div ref={box} className="relative inline-block">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className={buttonStyles[kind]}
      >
        Agendar evento
        <span
          aria-hidden="true"
          className="ml-1 inline-block border-x-[4px] border-t-[4px] border-x-transparent border-t-current"
        />
      </button>
      {open ? (
        <ul
          role="menu"
          className="bg-card border-line absolute top-full left-1/2 z-20 mt-2 w-60 -translate-x-1/2 overflow-hidden rounded-2xl border py-2 text-left shadow-2xl"
        >
          {items.map((i) => (
            <li key={i.label} role="none">
              <a
                role="menuitem"
                href={i.href}
                download={i.download}
                target={i.download ? undefined : "_blank"}
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="text-moss hover:bg-leaf-soft flex items-center gap-3 px-5 py-3 text-sm"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- ícono SVG estático */}
                <img
                  src={`/brand/calendar/${i.icon}.svg`}
                  alt=""
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 object-contain"
                />
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
