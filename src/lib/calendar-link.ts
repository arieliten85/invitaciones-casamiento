const pad = (n: number) => String(n).padStart(2, "0");

const toUtcStamp = (d: Date) =>
  `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

/** Link de «agregar a Google Calendar». */
export function googleCalendarLink({
  title,
  startIso,
  durationHours,
  location,
}: {
  title: string;
  startIso: string;
  durationHours: number;
  location: string;
}) {
  const start = new Date(startIso);
  const end = new Date(start.getTime() + durationHours * 3600 * 1000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${toUtcStamp(start)}/${toUtcStamp(end)}`,
    location,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

type CalendarEvent = {
  title: string;
  startIso: string;
  durationHours: number;
  location: string;
  description?: string;
};

const range = ({ startIso, durationHours }: CalendarEvent) => {
  const start = new Date(startIso);
  return { start, end: new Date(start.getTime() + durationHours * 3600 * 1000) };
};

function microsoftLink(base: string, event: CalendarEvent) {
  const { start, end } = range(event);
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: event.title,
    startdt: start.toISOString(),
    enddt: end.toISOString(),
    location: event.location,
    body: event.description ?? "",
  });
  return `${base}/calendar/0/deeplink/compose?${params}`;
}

export const outlookLink = (event: CalendarEvent) => microsoftLink("https://outlook.live.com", event);
export const microsoft365Link = (event: CalendarEvent) => microsoftLink("https://outlook.office.com", event);

export function yahooLink(event: CalendarEvent) {
  const { start } = range(event);
  const params = new URLSearchParams({
    v: "60",
    title: event.title,
    st: toUtcStamp(start),
    dur: `${pad(event.durationHours)}00`,
    in_loc: event.location,
  });
  return `https://calendar.yahoo.com/?${params}`;
}

/** Archivo .ics (Apple Calendar y cualquier otra app) como enlace de descarga. */
export function icsLink(event: CalendarEvent) {
  const { start, end } = range(event);
  const esc = (t: string) => t.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Invitacion//ES",
    "BEGIN:VEVENT",
    `UID:${toUtcStamp(start)}@invitacion`,
    `DTSTAMP:${toUtcStamp(new Date())}`,
    `DTSTART:${toUtcStamp(start)}`,
    `DTEND:${toUtcStamp(end)}`,
    `SUMMARY:${esc(event.title)}`,
    `LOCATION:${esc(event.location)}`,
    `DESCRIPTION:${esc(event.description ?? "")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}

export type { CalendarEvent };
