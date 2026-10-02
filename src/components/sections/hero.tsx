import { ButtonLink } from "@/components/ui/button";
import { PinIcon } from "@/components/ui/icons";
import { Photo } from "@/components/ui/photo";

type Props = {
  eyebrow: string;
  tagline: string;
  first: string;
  second: string;
  /** Fecha principal, por ejemplo "20 · 03 · 2027". */
  dateLabel: string;
  /** Línea secundaria bajo la fecha, por ejemplo "Sábado · 22:00 hs". */
  dateDetail: string;
  place?: { name: string; href: string };
  photo: { src?: string; alt: string };
  cta: { label: string; href: string };
};

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero({ eyebrow, tagline, first, second, dateLabel, dateDetail, place, photo, cta }: Props) {
  return (
    <header className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-[#2b2724] text-white">
      <Photo
        src={photo.src}
        alt={photo.alt}
        sizes="100vw"
        priority
        showLabel={false}
        className="animate-drift -z-20"
      />
      {/* Velo oscuro para que el texto se lea sobre cualquier foto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-black/50 via-black/35 to-black/60"
      />
      {/* Marco fino */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 -z-10 border border-white/25 sm:inset-6"
      />

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-8 py-24 text-center sm:py-28">
        <p
          className="animate-rise text-xs font-light tracking-[0.45em] uppercase sm:text-sm"
          style={delay(100)}
        >
          {eyebrow}
        </p>

        <h1
          className="animate-rise mt-6 flex flex-col items-center font-serif text-7xl leading-[0.95] font-medium sm:text-8xl lg:text-9xl [@media(max-height:500px)]:text-6xl"
          style={delay(250)}
        >
          <span>{first}</span>
          <span className="my-1 text-4xl italic opacity-80 sm:text-5xl" aria-hidden="true">
            &amp;
          </span>
          <span className="sr-only"> y </span>
          <span>{second}</span>
        </h1>

        <p
          className="animate-rise mt-8 max-w-xs font-serif text-xl text-pretty italic sm:max-w-md sm:text-2xl"
          style={delay(450)}
        >
          {tagline}
        </p>

        <div
          className="animate-rise mt-9 flex flex-col items-center gap-5 sm:flex-row sm:gap-8"
          style={delay(650)}
        >
          <div>
            <p className="text-xl font-light tracking-[0.3em] lining-nums sm:text-2xl">{dateLabel}</p>
            <p className="mt-1 text-xs font-light tracking-[0.3em] uppercase opacity-85">{dateDetail}</p>
          </div>

          {place ? (
            <>
              <span aria-hidden="true" className="hidden h-10 w-px bg-white/40 sm:block" />
              <a
                href={place.href}
                aria-label={`Ver el lugar: ${place.name}`}
                className="group inline-flex items-center gap-2 text-sm font-light tracking-[0.2em] uppercase"
              >
                <PinIcon className="size-5 shrink-0" />
                <span className="underline decoration-white/40 underline-offset-8 transition-colors group-hover:decoration-white">
                  {place.name}
                </span>
              </a>
            </>
          ) : null}
        </div>

        <ButtonLink href={cta.href} variant="light" className="animate-rise mt-10" style={delay(850)}>
          {cta.label}
        </ButtonLink>
      </div>

      <a
        href="#bienvenida"
        aria-label="Bajar"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 opacity-80 [@media(min-height:640px)]:block"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="animate-nudge size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </a>
    </header>
  );
}
