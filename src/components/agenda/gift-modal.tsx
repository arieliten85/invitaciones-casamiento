"use client";

import { useEffect, useRef, useState } from "react";
import { lightButton, sageButton } from "./block";

type Props = { bank: string; holder: string; alias: string };

export function GiftModal({ bank, holder, alias }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onClose = () => {
      document.documentElement.style.overflow = "";
    };
    el.addEventListener("close", onClose);
    return () => {
      el.removeEventListener("close", onClose);
      document.documentElement.style.overflow = "";
    };
  }, []);

  function open() {
    document.documentElement.style.overflow = "hidden";
    dialog.current?.showModal();
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(alias);
    } catch {
      const area = document.createElement("textarea");
      area.value = alias;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.append(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <button type="button" onClick={open} className={`${lightButton} mt-7`}>
        Ver más
      </button>
      <dialog
        ref={dialog}
        aria-label="Datos bancarios"
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="bg-background text-ink m-auto w-[calc(100%-2.5rem)] max-w-sm rounded-md p-0 shadow-2xl backdrop:bg-black/50"
      >
        <div className="relative px-6 py-9 text-center">
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => dialog.current?.close()}
            className="text-ink/60 hover:text-ink absolute top-3 right-4 text-2xl leading-none"
          >
            ×
          </button>
          <h3 className="font-serif text-2xl tracking-[0.2em] uppercase">Datos bancarios</h3>
          <p className="text-ink/70 mt-5 text-sm font-light">
            {bank} · {holder}
          </p>
          <p className="mt-5 text-xs font-medium tracking-[0.25em] uppercase">Alias</p>
          <p className="mt-1 text-xl font-medium tracking-wide select-all">{alias}</p>
          <button type="button" onClick={copy} className={`${sageButton} mt-6`}>
            {copied ? "Copiado ✓" : "Copiar alias"}
          </button>
          <span className="sr-only" role="status">
            {copied ? "Alias copiado" : ""}
          </span>
        </div>
      </dialog>
    </>
  );
}
