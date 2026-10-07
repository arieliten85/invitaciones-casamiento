"use client";

import { useEffect, useRef, useState } from "react";
import { buttonStyles } from "./block";
import { Garland } from "./botanical";

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
      <button type="button" onClick={open} className={`reveal ${buttonStyles.leaf}`}>
        Ver datos bancarios
      </button>
      <dialog
        ref={dialog}
        aria-label="Datos bancarios"
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="bg-paper text-moss backdrop:bg-moss/60 m-auto w-[calc(100%-2.5rem)] max-w-sm rounded-3xl p-0 shadow-2xl backdrop:backdrop-blur-sm"
      >
        <div className="relative px-6 pt-8 pb-9 text-center">
          <Garland className="text-leaf mx-auto h-8 w-48" />
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => dialog.current?.close()}
            className="text-moss-soft hover:text-moss absolute top-3 right-4 text-2xl leading-none"
          >
            ×
          </button>
          <h3 className="text-moss mt-3 font-serif text-3xl">Datos bancarios</h3>
          <p className="text-moss-soft mt-4 text-sm">
            {bank} · {holder}
          </p>
          <div className="bg-card border-line mt-6 rounded-2xl border px-4 py-4">
            <p className="text-leaf-deep text-[0.65rem] tracking-[0.3em] uppercase">Alias</p>
            <p className="text-moss mt-1 font-serif text-2xl tracking-wide select-all">{alias}</p>
          </div>
          <button type="button" onClick={copy} className={`${buttonStyles.leaf} mt-6 w-full`}>
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
