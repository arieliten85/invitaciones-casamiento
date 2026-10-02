export function Footer({ text, names }: { text: string; names: string }) {
  return (
    <footer className="border-border border-t px-5 py-16 text-center">
      <p className="font-serif text-2xl text-pretty">{text}</p>
      <p className="text-muted mt-4 text-xs font-medium tracking-[0.35em] uppercase">{names}</p>
    </footer>
  );
}
