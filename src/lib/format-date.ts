const LOCALE = "es-AR";

type Zone = { timeZone: string };

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function formatLongDate(iso: string, { timeZone }: Zone) {
  return capitalize(
    new Intl.DateTimeFormat(LOCALE, {
      timeZone,
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso)),
  );
}

export function formatDayMonth(iso: string, { timeZone }: Zone) {
  return new Intl.DateTimeFormat(LOCALE, {
    timeZone,
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function formatTime(iso: string, { timeZone }: Zone) {
  return `${new Intl.DateTimeFormat(LOCALE, {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso))} hs`;
}

export function formatShortDateTime(iso: string, { timeZone }: Zone) {
  return new Intl.DateTimeFormat(LOCALE, {
    timeZone,
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));
}

/** Fecha compacta tipo "20 · 03 · 2027". */
export function formatNumericDate(iso: string, { timeZone }: Zone) {
  const parts = new Intl.DateTimeFormat(LOCALE, {
    timeZone,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(new Date(iso));
  const pick = (type: string) => parts.find((x) => x.type === type)?.value ?? "";
  return `${pick("day")} · ${pick("month")} · ${pick("year")}`;
}

/** Día de la semana, por ejemplo "Sábado". */
export function formatWeekday(iso: string, { timeZone }: Zone) {
  return capitalize(new Intl.DateTimeFormat(LOCALE, { timeZone, weekday: "long" }).format(new Date(iso)));
}
