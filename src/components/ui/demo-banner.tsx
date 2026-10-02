export function DemoBanner({ text }: { text: string }) {
  return (
    <div role="note" className="bg-foreground text-on-primary px-4 py-2 text-center text-sm font-semibold">
      {text}
    </div>
  );
}
