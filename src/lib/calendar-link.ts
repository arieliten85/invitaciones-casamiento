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
