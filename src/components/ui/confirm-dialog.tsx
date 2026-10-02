"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Button } from "./button";

type Props = {
  open: boolean;
  title: string;
  children: ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  pending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

/**
 * Diálogo de confirmación para acciones destructivas.
 * Usa <dialog>: el navegador atrapa el foco, bloquea el fondo y cierra con Escape.
 * El foco inicial va en «Cancelar» para evitar confirmar sin querer.
 */
export function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel,
  cancelLabel = "Cancelar",
  pending = false,
  onConfirm,
  onCancel,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="confirm-title"
      aria-describedby="confirm-desc"
      onCancel={(e) => {
        // Escape: dejamos que el estado de React cierre el diálogo.
        e.preventDefault();
        if (!pending) onCancel();
      }}
      onClick={(e) => {
        // Clic en el fondo oscuro.
        if (e.target === e.currentTarget && !pending) onCancel();
      }}
      className="border-border bg-surface text-foreground backdrop:bg-foreground/50 m-auto w-[calc(100%-2rem)] max-w-md rounded-(--radius-card) border p-0 shadow-(--shadow-card)"
    >
      <div className="flex flex-col gap-4 p-6">
        <h2 id="confirm-title" className="font-serif text-2xl font-medium">
          {title}
        </h2>
        <div id="confirm-desc" className="text-muted text-pretty">
          {children}
        </div>
        <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={onCancel} disabled={pending} autoFocus>
            {cancelLabel}
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={pending}>
            {pending ? "Eliminando…" : confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  );
}
