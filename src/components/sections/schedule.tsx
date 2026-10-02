import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type Item = { time: string; label: string };

type Props = {
  items: Item[];
  dressCode: string;
};

export function Schedule({ items, dressCode }: Props) {
  return (
    <section aria-labelledby="cronograma-titulo" className="bg-surface-muted/60 py-20 sm:py-28">
      <Container size="narrow">
        <SectionHeading id="cronograma-titulo" eyebrow="Programa" title="El gran día" />

        <ol className="mx-auto max-w-md text-center">
          {items.map((item) => (
            <li key={item.time + item.label} className="border-border border-t py-6 last:border-b">
              <span className="text-muted block text-sm font-medium tracking-[0.3em] lining-nums">
                {item.time} hs
              </span>
              <span className="mt-1 block font-serif text-3xl">{item.label}</span>
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-16 max-w-md text-center">
          <h3 className="text-muted text-xs font-medium tracking-[0.35em] uppercase">Código de vestimenta</h3>
          <p className="mt-3 font-serif text-2xl text-pretty">{dressCode}</p>
        </div>
      </Container>
    </section>
  );
}
