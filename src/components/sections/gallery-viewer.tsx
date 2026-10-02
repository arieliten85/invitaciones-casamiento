"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";

type Img = { src?: string; alt: string };

/**
 * Botón «Ver todas las fotos» + ventana con todas las fotos.
 * Usa <dialog>: el navegador atrapa el foco, bloquea el fondo y cierra con Escape.
 * Las fotos solo se cargan cuando la ventana está abierta.
 */
export function GalleryViewer({ photos }: { photos: Img[] }) {
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
      <Button variant="outline" onClick={() => setOpen(true)} aria-haspopup="dialog">
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
          <ul className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3 sm:gap-3 sm:p-4">
            {photos.map((p, i) => (
              <li key={`${p.alt}-${i}`} className="relative aspect-[4/5] overflow-hidden">
                <Photo src={p.src} alt={p.alt} sizes="(min-width: 640px) 33vw, 50vw" />
              </li>
            ))}
          </ul>
        ) : null}
      </dialog>
    </>
  );
}
