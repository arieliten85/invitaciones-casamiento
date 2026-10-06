import type { ReactNode } from "react";
import { Icon } from "./icon";

const BG = { white: "bg-white", blush: "bg-blush", paper: "paper" } as const;

type SectionProps = {
  id?: string;
  bg?: keyof typeof BG;
  className?: string;
  children: ReactNode;
};

/** Franja a todo el ancho con el contenido centrado. */
export function Section({ id, bg = "white", className = "", children }: SectionProps) {
  return (
    <section id={id} className={`${BG[bg]} px-6 py-16 text-center sm:py-20 ${className}`}>
      <div className="mx-auto max-w-3xl">{children}</div>
    </section>
  );
}

export function Heading({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      id={id}
      className={`text-ink font-display text-2xl tracking-[0.3em] uppercase sm:text-[1.75rem] ${className}`}
    >
      {children}
    </h2>
  );
}

export function IconTop({ name }: { name: Parameters<typeof Icon>[0]["name"] }) {
  return <Icon name={name} className="mb-8 h-32 w-32 sm:mb-10 sm:h-40 sm:w-40" />;
}

export const Text = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <p className={`text-ink mt-6 leading-relaxed ${className}`}>{children}</p>
);

export const sageButton =
  "bg-sage hover:bg-sage-hover inline-flex min-h-11 items-center justify-center gap-2 px-5 text-base text-white transition-colors select-none";

export const lightButton =
  "inline-flex min-h-11 items-center justify-center border border-black/5 bg-[#f3f3f0] px-5 text-base text-ink transition-colors hover:bg-white select-none";

export function SageLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${sageButton} mt-7`}>
      {children}
    </a>
  );
}
