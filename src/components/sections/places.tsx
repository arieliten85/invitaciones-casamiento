import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ICONS, type PlaceIconName } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";

type Place = {
  id: string;
  title: string;
  time: string;
  name: string;
  address: string;
  mapsUrl: string;
  icon?: PlaceIconName;
};

export function Places({ places, title = "Dónde y cuándo" }: { places: Place[]; title?: string }) {
  return (
    <section aria-labelledby="lugares-titulo" className="py-20 sm:py-28">
      <Container>
        <SectionHeading id="lugares-titulo" eyebrow="El lugar" title={title} />
        <div
          className={
            "mx-auto grid gap-12 sm:gap-0 " + (places.length > 1 ? "max-w-4xl sm:grid-cols-2" : "max-w-xl")
          }
        >
          {places.map((p, i) => (
            <article
              key={p.id}
              className={
                "flex flex-col items-center px-4 text-center sm:px-10 " +
                (i > 0 ? "sm:border-border sm:border-l" : "")
              }
            >
              {(() => {
                const PlaceIcon = ICONS[p.icon ?? "pin"];
                return <PlaceIcon className="text-foreground/70 mb-4 size-11" />;
              })()}
              <h3 className="text-muted text-xs font-medium tracking-[0.35em] uppercase">{p.title}</h3>
              <p className="mt-4 font-serif text-5xl font-medium lining-nums">{p.time}</p>
              <p className="mt-6 text-lg">{p.name}</p>
              <p className="text-muted mt-1 font-light text-pretty">{p.address}</p>
              <ButtonLink
                href={p.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                className="mt-7"
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
