"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";

type Img = { src?: string; alt: string; ratio?: number };

/** Reparte las fotos en dos columnas de altura casi igual (la diferencia la absorben las fotos con un recorte mínimo). */
function splitColumns(photos: Img[]): [Img[], Img[]] {
  const h = photos.map((p) => 1 / (p.ratio ?? 0.8));
  const total = h.reduce((a, b) => a + b, 0);
  let best = 0;
  let bestDiff = Infinity;
  const n = Math.min(photos.length, 14);
  for (let mask = 0; mask < 1 << n; mask++) {
    let left = 0;
    for (let i = 0; i < n; i++) if (mask & (1 << i)) left += h[i];
    const diff = Math.abs(total - 2 * left);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = mask;
    }
  }
  const cols: [Img[], Img[]] = [[], []];
  photos.forEach((p, i) => cols[i < n && best & (1 << i) ? 0 : 1].push(p));
  return cols;
}

/**
 * Botón «Ver todas las fotos» + ventana con todas las fotos.
 * Usa <dialog>: el navegador atrapa el foco, bloquea el fondo y cierra con Escape.
 * Las fotos solo se cargan cuando la ventana está abierta.
 */
export function GalleryViewer({ photos, className }: { photos: Img[]; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Evita que la página de fondo se desplace mientras la galería está abierta.
  useEffect(() => {
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)} aria-haspopup="dialog" className={className}>
        Ver todas las fotos
      </Button>

      <dialog
        ref={ref}
        aria-label="Galería de fotos"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          // Clic en el fondo oscuro.
          if (e.target === e.currentTarget) setOpen(false);
        }}
        className="bg-background text-foreground m-auto h-[calc(100svh-1.5rem)] w-[calc(100%-1.5rem)] max-w-5xl overflow-y-auto rounded-sm p-0 backdrop:bg-black/80 sm:h-[calc(100svh-3rem)]"
      >
        <div className="bg-background/90 sticky top-0 z-10 flex items-center justify-between px-4 py-3 backdrop-blur sm:px-6">
          <p className="text-muted text-xs font-medium tracking-[0.35em] uppercase">
            Galería · {photos.length} fotos
          </p>
          <Button
            variant="quiet"
            size="sm"
            onClick={() => setOpen(false)}
            aria-label="Cerrar galería"
            autoFocus
          >
            Cerrar ✕
          </Button>
        </div>

        {open ? (
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-2 p-2 sm:gap-3 sm:p-4">
            {splitColumns(photos).map((col, c) => (
              <ul key={c} className="flex flex-col gap-2 sm:gap-3">
                {col.map((p, i) => (
                  <li
                    key={`${p.alt}-${i}`}
                    className="relative grow overflow-hidden rounded-2xl"
                    style={{ aspectRatio: p.ratio ?? 0.8 }}
                  >
                    <Photo src={p.src} alt={p.alt} sizes="(min-width: 768px) 24rem, 50vw" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        ) : null}
      </dialog>
    </>
  );
}
