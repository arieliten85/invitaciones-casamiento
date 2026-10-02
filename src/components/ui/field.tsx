import type { ReactNode } from "react";
import { cn } from "@/lib/class-names";

export const inputClass =
  "w-full min-h-12 rounded-xl border border-border bg-surface px-4 py-2.5 text-base text-foreground placeholder:text-muted/70 transition-colors focus-visible:border-ring aria-[invalid=true]:border-danger aria-[invalid=true]:bg-danger-soft/40";

type Props = {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

/** Etiqueta + control + ayuda + error. El control debe usar `describedBy(id, …)`. */
export function Field({ id, label, optional, hint, error, className, children }: Props) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {optional ? <span className="text-muted font-normal"> (opcional)</span> : null}
      </label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="text-muted text-sm">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-danger text-sm font-medium">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function describedBy(id: string, { hint, error }: { hint?: boolean; error?: string }) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
}
