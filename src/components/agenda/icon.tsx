/* Íconos ilustrativos propios, en verde salvia (también hay versiones azul noche y dorado). */
const FILES = {
  frase: "icono-frase.svg",
  calendario: "icono-calendar.svg",
  regalo: "icono-regalo.svg",
  dresscode: "icono-dresscode.svg",
  boda: "icono-nuestraboda.svg",
} as const;

export type IconName = keyof typeof FILES;

type Props = { name: IconName; tone?: "leaf" | "night" | "gold"; className?: string };

export function Icon({ name, tone = "leaf", className = "h-24 w-24" }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG estático, no necesita optimización
    <img
      src={`/brand/icons/${tone}/${FILES[name]}`}
      alt=""
      aria-hidden="true"
      className={`reveal-zoom mx-auto ${className}`}
    />
  );
}
