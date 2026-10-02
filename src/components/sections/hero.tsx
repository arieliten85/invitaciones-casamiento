import { ButtonLink } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";

type Props = {
  tagline: string;
  first: string;
  second: string;
  dateLabel: string;
  placeLabel: string;
  photo: { src?: string; alt: string };
  cta: { label: string; href: string };
};

export function Hero({ tagline, first, second, dateLabel, placeLabel, photo, cta }: Props) {
  return (
    <header className="relative isolate flex min-h-svh items-end justify-center overflow-hidden bg-[#2b2724] text-white">
      <Photo src={photo.src} alt={photo.alt} sizes="100vw" priority showLabel={false} className="-z-20" />
      {/* Degradado para que el texto se lea sobre cualquier foto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-black/70 via-black/25 to-black/40"
      />

      <div className="animate-rise mx-auto flex w-full max-w-4xl flex-col items-center px-5 pt-24 pb-14 text-center sm:pb-20">
        <p className="max-w-xs text-xs font-light tracking-[0.35em] text-pretty uppercase sm:max-w-md sm:text-sm">
          {tagline}
        </p>

        <h1 className="mt-6 flex flex-col items-center font-serif text-7xl leading-[0.95] font-medium sm:text-8xl lg:text-9xl">
          <span>{first}</span>
          <span className="my-1 text-4xl italic opacity-80 sm:text-5xl" aria-hidden="true">
            &amp;
          </span>
          <span className="sr-only"> y </span>
          <span>{second}</span>
        </h1>

        <p className="mt-8 text-lg font-light tracking-[0.3em] lining-nums sm:text-xl">{dateLabel}</p>
        <p className="mt-2 text-xs font-light tracking-[0.3em] uppercase opacity-85">{placeLabel}</p>

        <ButtonLink href={cta.href} variant="light" className="mt-10">
          {cta.label}
        </ButtonLink>
      </div>
    </header>
  );
}
