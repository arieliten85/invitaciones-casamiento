import type { ReactNode } from "react";
import { cn } from "@/lib/class-names";

type Props = {
  id?: string;
  title: string;
  /** Rótulo corto sobre el título, en mayúsculas. */
  /** Ícono decorativo sobre el rótulo. */
  icon?: ReactNode;
  eyebrow?: string;
  description?: string;
  className?: string;
};

export function SectionHeading({ id, title, icon, eyebrow, description, className }: Props) {
  return (
    <div className={cn("mb-10 text-center sm:mb-14", className)}>
      {icon ? <div className="text-foreground/70 mb-4 flex justify-center">{icon}</div> : null}
      {eyebrow ? (
        <p className="text-muted mb-3 text-xs font-medium tracking-[0.35em] uppercase">{eyebrow}</p>
      ) : null}
      <h2 id={id} className="text-foreground font-serif text-4xl font-medium sm:text-5xl">
        {title}
      </h2>
      <span aria-hidden="true" className="bg-foreground/40 mx-auto mt-5 block h-px w-12" />
      {description ? (
        <p className="text-muted mx-auto mt-6 max-w-xl font-light text-pretty">{description}</p>
      ) : null}
    </div>
  );
}
