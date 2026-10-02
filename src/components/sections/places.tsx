import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type Place = {
  id: string;
  title: string;
  time: string;
  name: string;
  address: string;
  mapsUrl: string;
};

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="text-primary size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 1 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

export function Places({ places, title = "Dónde y cuándo" }: { places: Place[]; title?: string }) {
  return (
    <section aria-labelledby="lugares-titulo" className="py-16 sm:py-24">
      <Container>
        <SectionHeading id="lugares-titulo" title={title} />
        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2 lg:max-w-4xl lg:gap-8">
          {places.map((p) => (
            <article
              key={p.id}
              className="border-border bg-surface flex flex-col items-center rounded-(--radius-card) border px-6 py-9 text-center shadow-(--shadow-card)"
            >
              <span className="bg-primary-soft/60 flex size-12 items-center justify-center rounded-full">
                <PinIcon />
              </span>
              <h3 className="mt-4 font-serif text-3xl font-medium italic">{p.title}</h3>
              <p className="text-primary mt-1 text-sm font-semibold tracking-[0.2em] uppercase">{p.time}</p>
              <p className="mt-4 font-semibold">{p.name}</p>
              <p className="text-muted mt-1 text-pretty">{p.address}</p>
              <ButtonLink
                href={p.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                className="mt-6"
                aria-label={`Cómo llegar a ${p.name} (se abre en una pestaña nueva)`}
              >
                Cómo llegar
              </ButtonLink>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
