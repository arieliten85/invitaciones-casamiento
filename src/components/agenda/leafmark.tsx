/** Ramita mínima de tres hojas, usada como marca del cronograma. */
export function Leafmark({ flip = false }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-6 w-6 ${flip ? "-scale-x-100" : ""}`}>
      <path
        d="M5 20C9 15 13 10 19 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path d="M19 4c-3.6.2-5.6 2-6 5 3.2-.3 5.3-2 6-5Z" fill="currentColor" />
      <path d="M12 11.5c-3-1-5.6-.2-7 2.3 3 .8 5.4 0 7-2.3Z" fill="currentColor" fillOpacity="0.7" />
      <path d="M13.2 10.2c.6-3-.6-5.4-3.2-6.6-.6 3 .5 5.3 3.2 6.6Z" fill="currentColor" fillOpacity="0.55" />
    </svg>
  );
}
