export function Footer({ text, names, credits }: { text: string; names: string; credits?: string[] }) {
  return (
    <footer className="bg-foreground text-background px-5 py-20 text-center">
      <p className="mx-auto max-w-md font-serif text-2xl text-pretty italic sm:text-3xl">{text}</p>
      <p className="text-background/70 mt-6 text-xs font-medium tracking-[0.35em] uppercase">{names}</p>
      {credits && credits.length > 0 ? (
        <p className="text-background/50 mx-auto mt-12 max-w-md text-xs text-pretty">
          Fotos de ejemplo en Unsplash: {credits.join(", ")}.
        </p>
      ) : null}
    </footer>
  );
}
