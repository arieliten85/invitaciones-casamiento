/* Íconos ilustrativos propios (public/brand/icons). Tienen su color embebido. */
const FILES = {
  frase: "icono-frase.svg",
  calendario: "icono-calendar.svg",
  regalo: "icono-regalo.svg",
  dresscode: "icono-dresscode.svg",
  boda: "icono-nuestraboda.svg",
  instagram: "icono-instagram.svg",
} as const;

export function Icon({ name, className = "h-24 w-24" }: { name: keyof typeof FILES; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG estático, no necesita optimización
    <img src={`/brand/icons/${FILES[name]}`} alt="" aria-hidden="true" className={`mx-auto ${className}`} />
  );
}
