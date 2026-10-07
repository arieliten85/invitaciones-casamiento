import Image from "next/image";
import { cn } from "@/lib/class-names";

type Props = {
  src?: string;
  alt: string;
  /** Tamaños reales para que Next elija el archivo correcto (ver `sizes` de next/image). */
  sizes: string;
  /** Para la imagen principal: se carga primero. */
  priority?: boolean;
  /** En el espacio vacío, muestra el texto alternativo como rótulo visible. */
  showLabel?: boolean;
  /** Punto de enfoque del recorte (object-position), p. ej. "50% 80%". */
  position?: string;
  className?: string;
};

/**
 * Foto que rellena su contenedor (el padre define el tamaño y debe ser `relative`).
 * Si todavía no hay archivo, muestra un espacio neutro para que el diseño se vea completo.
 */
export function Photo({ src, alt, sizes, priority, showLabel = true, position, className }: Props) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={`${alt} (foto pendiente)`}
        className={cn(
          "from-surface-muted to-primary-soft absolute inset-0 flex items-center justify-center bg-linear-to-br via-[#ece6dc] p-4",
          className,
        )}
      >
        {showLabel ? (
          <span className="text-muted/70 text-center text-[0.65rem] font-medium tracking-[0.3em] uppercase">
            {alt}
          </span>
        ) : null}
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      style={position ? { objectPosition: position } : undefined}
      className={cn("object-cover", className)}
    />
  );
}
