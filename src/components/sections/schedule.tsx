import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type Item = { time: string; label: string };

type Props = {
  items: Item[];
  dressCode: string;
};

export function Schedule({ items, dressCode }: Props) {
  return (
    <section aria-labelledby="cronograma-titulo" className="bg-surface/70 py-16 sm:py-24">
      <Container size="narrow">
        <SectionHeading id="cronograma-titulo" title="El gran día" />

        <ol className="border-gold/50 relative mx-auto max-w-md border-l pl-8">
          {items.map((item) => (
            <li key={item.time + item.label} className="relative pb-9 last:pb-0">
              <span
                aria-hidden="true"
                className="border-gold bg-surface absolute top-1.5 -left-[2.45rem] size-3 rounded-full border-2"
              />
              <span className="text-primary block text-sm font-semibold tracking-[0.2em]">
                {item.time} hs
              </span>
              <span className="block font-serif text-2xl italic">{item.label}</span>
            </li>
          ))}
        </ol>

        <div className="border-border bg-surface mx-auto mt-14 max-w-md rounded-(--radius-card) border px-6 py-7 text-center shadow-(--shadow-card)">
          <h3 className="text-muted text-sm font-semibold tracking-[0.25em] uppercase">
            Código de vestimenta
          </h3>
          <p className="mt-2 font-serif text-xl text-pretty italic">{dressCode}</p>
        </div>
      </Container>
    </section>
  );
}
