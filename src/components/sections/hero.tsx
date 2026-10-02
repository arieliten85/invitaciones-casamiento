import { ButtonLink } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";

type Props = {
  eyebrow: string;
  tagline: string;
  first: string;
  second: string;
  dateLabel: string;
  photo: { src?: string; alt: string };
  cta: { label: string; href: string };
};

export function Hero({ eyebrow, tagline, first, second, dateLabel, photo, cta }: Props) {
  return (
    <header className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-[#2b2724] text-white">
      <Photo src={photo.src} alt={photo.alt} sizes="100vw" priority showLabel={false} className="-z-20" />
      {/* Degradado para que el texto se lea sobre cualquier foto */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/45" />

      <div className="animate-rise mx-auto flex w-full max-w-4xl flex-col items-center px-5 py-20 text-center sm:py-24">
        <p className="text-sm font-light tracking-[0.4em] uppercase sm:text-base">{eyebrow}</p>

        <h1 className="mt-5 flex flex-col items-center font-serif text-7xl leading-[0.95] font-medium sm:text-8xl lg:text-9xl [@media(max-height:500px)]:text-6xl">
          <span>{first}</span>
          <span className="my-1 text-4xl italic opacity-80 sm:text-5xl" aria-hidden="true">
            &amp;
          </span>
          <span className="sr-only"> y </span>
          <span>{second}</span>
        </h1>

        <p className="mt-8 text-lg font-light tracking-[0.3em] lining-nums sm:text-xl">{dateLabel}</p>
        <span aria-hidden="true" className="mt-6 block h-px w-12 bg-white/60" />
        <p className="mt-6 max-w-xs font-serif text-xl text-pretty italic sm:max-w-md sm:text-2xl">
          {tagline}
        </p>

        <ButtonLink href={cta.href} variant="light" className="mt-10">
          {cta.label}
        </ButtonLink>
      </div>
    </header>
  );
}
