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
