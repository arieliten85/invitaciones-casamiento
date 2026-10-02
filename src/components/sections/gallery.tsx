import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { HeartIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";

export function Gallery({ photos }: { photos: Array<{ src?: string; alt: string }> }) {
  if (photos.length === 0) return null;
  return (
    <section aria-labelledby="galeria-titulo" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="galeria-titulo"
          eyebrow="Nuestra historia"
          title="Un recuerdo"
          icon={<HeartIcon />}
        />
        <ul className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3">
          {photos.map((p, i) => (
            <li
              key={`${p.alt}-${i}`}
              className={
                i === 0
                  ? "relative col-span-2 aspect-[4/3] overflow-hidden md:col-span-1 md:aspect-[4/5]"
                  : "relative aspect-[4/5] overflow-hidden"
              }
            >
              <Photo src={p.src} alt={p.alt} sizes="(min-width: 768px) 33vw, 50vw" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
