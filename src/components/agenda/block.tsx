import type { ReactNode } from "react";
import { Divider } from "./botanical";

/* Piezas de diseño de la invitación «Jardín». */

/** Rótulo chico en mayúsculas espaciadas. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`eyebrow reveal text-moss-soft text-[0.68rem] font-normal tracking-[0.42em] uppercase sm:text-xs ${className}`}
    >
      {children}
    </p>
  );
}

/** Título de sección en serif. */
export function Title({
  children,
  as: Tag = "h2",
  className = "",
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
}) {
  return (
    <Tag
      className={`reveal-blur text-moss font-serif text-[2.1rem] leading-tight font-normal sm:text-5xl ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Encabezado completo de sección: rótulo, título y ramita separadora. */
export function Heading({
  eyebrow,
  title,
  id,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div className={`text-center ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Title className="mt-3">
        <span id={id}>{title}</span>
      </Title>
      <Divider className="mt-4" />
    </div>
  );
}

export const Text = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <p className={`reveal text-moss-soft text-[1.02rem] leading-relaxed font-light ${className}`}>{children}</p>
);

const pill =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-[0.92rem] font-normal transition-[background-color,color,box-shadow,border-color] duration-300 select-none";

/** Botones como los del ejemplo: verde salvia relleno o con borde. */
export const buttonStyles = {
  leaf: `${pill} bg-leaf text-white shadow-[0_12px_24px_-14px_rgb(91_117_80/0.9)] hover:bg-leaf-deep`,
  outline: `${pill} border border-leaf/60 bg-card/70 text-leaf-deep hover:border-leaf hover:bg-leaf-soft`,
} as const;

export type ButtonKind = keyof typeof buttonStyles;

export function ButtonLink({
  href,
  kind = "leaf",
  className = "",
  children,
}: {
  href: string;
  kind?: ButtonKind;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`reveal ${buttonStyles[kind]} ${className}`}
    >
      {children}
    </a>
  );
}

/** Ícono de línea dentro de un círculo verde claro (como en las tarjetas del ejemplo). */
export function IconCircle({ path, className = "" }: { path: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`bg-leaf-soft text-leaf-deep mx-auto flex h-12 w-12 items-center justify-center rounded-full ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={path} />
      </svg>
    </span>
  );
}

/** Íconos de línea chicos. */
export const glyphs = {
  civil: "M3 10h18M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18M12 3 3.5 8h17L12 3Z",
  party: "M8 21h8M12 15v6M6 3h12l-1 6a5 5 0 0 1-10 0L6 3ZM6.5 7h11",
  pin: "M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Zm0-9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  mail: "M3.5 6.5h17v11h-17zM3.5 7l8.5 6.5L20.5 7",
  music: "M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm11-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  gift: "M4 11h16v9H4zM3 7h18v4H3zM12 7v13M12 7S10.5 3 8 3.6 7.5 7 12 7Zm0 0s1.5-4 4-3.4.5 3.4-4 3.4Z",
  copy: "M9 9h11v11H9zM5 15H4V4h11v1",
  check: "m5 12.5 4.5 4.5L19 7.5",
  route: "M3 11 21 3l-8 18-2-8-8-2Z",
} as const;

/** Fecha al estilo de la tarjeta impresa: 11 | DIC | 26 */
export function CardDate({ parts }: { parts: [string, string, string] }) {
  const bar = "h-10 w-px bg-leaf/50";
  return (
    <p className="text-moss flex items-center justify-center gap-5 font-serif text-3xl tracking-[0.2em] sm:gap-7 sm:text-4xl">
      <span>{parts[0]}</span>
      <span aria-hidden="true" className={bar} />
      <span>{parts[1]}</span>
      <span aria-hidden="true" className={bar} />
      <span>{parts[2]}</span>
    </p>
  );
}
