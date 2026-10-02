"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GiftIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";

type Props = {
  message: string;
  bank: string;
  holder: string;
  cbu: string;
  alias: string;
};

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Respaldo para navegadores sin permiso de portapapeles.
      const area = document.createElement("textarea");
      area.value = value;
      area.setAttribute("readonly", "");
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
    <div className="border-border flex flex-col items-stretch gap-3 border-t py-4 first:border-t-0 min-[400px]:flex-row min-[400px]:items-center min-[400px]:justify-between min-[400px]:gap-4">
      <div className="min-w-0 text-left">
        <p className="text-muted text-xs font-medium tracking-[0.25em] uppercase">{label}</p>
        <p className="text-base font-normal tabular-nums">{value}</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={copy}
        aria-label={`Copiar ${label}`}
        className="min-w-24 shrink-0 min-[400px]:w-auto"
      >
        {copied ? "Copiado ✓" : "Copiar"}
      </Button>
      <span className="sr-only" role="status">
        {copied ? `${label} copiado` : ""}
      </span>
    </div>
  );
}

export function Gifts({ message, bank, holder, cbu, alias }: Props) {
  return (
    <section aria-labelledby="regalos-titulo" className="py-20 sm:py-28">
      <Container size="narrow">
        <SectionHeading
          id="regalos-titulo"
          eyebrow="Con cariño"
          title="Regalos"
          icon={<GiftIcon />}
          description={message}
        />
        <div className="border-border bg-surface mx-auto max-w-md rounded-(--radius-card) border px-6 py-7 shadow-(--shadow-card)">
          <div className="pb-4 text-center">
            <p className="font-serif text-3xl">{bank}</p>
            <p className="text-muted">{holder}</p>
          </div>
          <CopyRow label="CBU" value={cbu} />
          <CopyRow label="Alias" value={alias} />
        </div>
      </Container>
    </section>
  );
}
