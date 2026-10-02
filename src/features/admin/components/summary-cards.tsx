import type { DietaryOption } from "@/config/config.types";
import { DIETARY_VALUES } from "@/config/config.types";
import type { GuestSummary } from "../model/guest.types";
import { dietLabel } from "./person-diet";

function Stat({ label, value, hint }: { label: string; value: number; hint?: string }) {
  return (
    <div className="border-border bg-surface rounded-2xl border p-4 shadow-(--shadow-card) sm:p-5">
      <dt className="text-muted text-sm font-semibold">{label}</dt>
      <dd className="text-foreground mt-1 font-serif text-4xl font-medium lining-nums">{value}</dd>
      {hint ? <p className="text-muted mt-1 text-sm">{hint}</p> : null}
    </div>
  );
}

export function SummaryCards({ summary, options }: { summary: GuestSummary; options: DietaryOption[] }) {
  return (
    <section aria-label="Resumen" className="flex flex-col gap-4">
      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <Stat label="Respuestas" value={summary.responses} />
        <Stat
          label="Personas que asisten"
          value={summary.attendingPeople}
          hint={`en ${summary.attendingResponses} respuestas`}
        />
        <Stat label="No asisten" value={summary.notAttendingResponses} hint="respuestas" />
        <Stat
          label="Con restricción"
          value={summary.attendingPeople - summary.byDietary.ninguna}
          hint="personas (vegano, celíaco…)"
        />
      </dl>

      <div className="border-border bg-surface rounded-2xl border p-4 shadow-(--shadow-card) sm:p-5">
        <h2 className="text-muted text-sm font-semibold">Personas por régimen alimentario</h2>
        <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-5">
          {DIETARY_VALUES.map((d) => (
            <li
              key={d}
              className="border-border/70 flex items-baseline justify-between gap-3 border-b pb-1.5"
            >
              <span>{dietLabel(d, options)}</span>
              <span className="font-semibold tabular-nums">{summary.byDietary[d]}</span>
            </li>
          ))}
        </ul>
        <p className="text-muted mt-3 text-sm">
          Una persona con dos restricciones (por ejemplo vegetariana y celíaca) se cuenta en ambas.
        </p>
      </div>
    </section>
  );
}
