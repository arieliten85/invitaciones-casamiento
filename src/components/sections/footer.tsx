export function Footer({ text, names, credits }: { text: string; names: string; credits?: string[] }) {
  return (
    <footer className="border-border border-t px-5 py-16 text-center">
      <p className="font-serif text-2xl text-pretty">{text}</p>
      <p className="text-muted mt-4 text-xs font-medium tracking-[0.35em] uppercase">{names}</p>
      {credits && credits.length > 0 ? (
        <p className="text-muted/80 mx-auto mt-10 max-w-md text-xs text-pretty">
          Fotos de ejemplo en Unsplash: {credits.join(", ")}.
        </p>
      ) : null}
    </footer>
  );
}
