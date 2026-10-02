import { ButtonLink } from "@/components/ui/button";
import { FloralBranch, FloralSprig, WatercolorWashes } from "@/components/ui/botanical";

type Props = {
  tagline: string;
  first: string;
  second: string;
  dateLabel: string;
  timeLabel: string;
  cta: { label: string; href: string };
};

export function Hero({ tagline, first, second, dateLabel, timeLabel, cta }: Props) {
  return (
    <header className="relative isolate flex min-h-svh items-center justify-center overflow-hidden px-5 py-20 text-center">
      <WatercolorWashes />
      <FloralBranch className="absolute top-0 left-0 w-36 -scale-y-100 opacity-95 sm:w-56 lg:w-72 xl:w-80" />
      <FloralBranch className="absolute right-0 bottom-0 w-36 -scale-x-100 opacity-95 sm:w-56 lg:w-72 xl:w-80" />

      <div className="animate-rise relative z-10 mx-auto flex max-w-3xl flex-col items-center">
        <FloralSprig className="mb-2 w-24 sm:w-28" />
        <p className="text-muted max-w-xs text-base text-pretty sm:max-w-md sm:text-lg">{tagline}</p>

        <h1 className="font-script text-foreground mt-5 flex flex-col items-center text-7xl leading-[1.05] sm:text-8xl lg:flex-row lg:gap-6 lg:text-9xl">
          <span>{first}</span>
          <span className="text-gold font-serif text-5xl italic lg:text-6xl" aria-hidden="true">
            &amp;
          </span>
          <span className="sr-only"> y </span>
          <span>{second}</span>
        </h1>

        <p className="text-foreground mt-8 font-serif text-2xl italic lining-nums sm:text-3xl">{dateLabel}</p>
        <p className="text-muted mt-1 text-sm font-semibold tracking-[0.25em] uppercase">{timeLabel}</p>

        <ButtonLink href={cta.href} className="mt-10">
          {cta.label}
        </ButtonLink>
      </div>
    </header>
  );
}
