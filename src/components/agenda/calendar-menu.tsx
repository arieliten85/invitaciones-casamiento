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
import { sageButton } from "./block";

export function CalendarMenu({ event }: { event: CalendarEvent }) {
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
    { label: "Google", href: googleCalendarLink(event) },
    { label: "Outlook", href: outlookLink(event) },
    { label: "Microsoft 365", href: microsoft365Link(event) },
    { label: "Apple", href: icsLink(event), download: "casamiento.ics" },
    { label: "Yahoo", href: yahooLink(event) },
  ];

  return (
    <div ref={box} className="relative inline-block">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className={`${sageButton} mt-7`}
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
          className="bg-ink absolute top-full left-1/2 z-20 mt-1 w-56 -translate-x-1/2 overflow-hidden rounded-md text-left shadow-xl"
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
                className="flex items-center gap-3 px-5 py-3 text-sm text-white/90 hover:bg-white/10"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-white/70">
                  <rect
                    x="3.5"
                    y="5"
                    width="17"
                    height="15"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M3.5 10h17M8 3v4M16 3v4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
