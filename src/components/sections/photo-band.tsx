import { Photo } from "@/components/ui/photo";

/** Foto ancha a todo el ancho, para dar aire entre secciones. */
export function PhotoBand({ photo }: { photo: { src?: string; alt: string } }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/7]">
      <Photo src={photo.src} alt={photo.alt} sizes="100vw" />
    </div>
  );
}
