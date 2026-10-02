"use client";

import type { DietaryOption, DietaryValue } from "@/config/config.types";
import { Button } from "@/components/ui/button";
import { inputClass } from "@/components/ui/field";
import { hasActiveFilters } from "../lib/filter-guests";
import type { AttendingFilter, GuestFilters } from "../model/guest.types";
import { dietLabel } from "./person-diet";

type Props = {
  filters: GuestFilters;
  options: DietaryOption[];
  onChange: (next: GuestFilters) => void;
  onClear: () => void;
};

const ATTENDING: Array<{ value: AttendingFilter; label: string }> = [
  { value: "todos", label: "Todos" },
  { value: "si", label: "Asisten" },
  { value: "no", label: "No asisten" },
];

const chip =
  "inline-flex min-h-10 cursor-pointer select-none items-center rounded-full border border-border bg-surface px-4 text-sm font-semibold transition-colors hover:bg-primary-soft/40 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-on-primary peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring";

export function GuestFilters({ filters, options, onChange, onClear }: Props) {
  function toggleDiet(value: DietaryValue, checked: boolean) {
    const dietary = checked ? [...filters.dietary, value] : filters.dietary.filter((d) => d !== value);
    onChange({ ...filters, dietary });
  }

  return (
    <section
      aria-label="Buscar y filtrar"
      className="border-border bg-surface flex flex-col gap-5 rounded-2xl border p-4 shadow-(--shadow-card) sm:p-5"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="search" className="text-sm font-semibold">
          Buscar por nombre o apellido
        </label>
        <input
          id="search"
          type="search"
          value={filters.query}
          onChange={(e) => onChange({ ...filters, query: e.target.value })}
          placeholder="Ej: Benítez, María, Lucrecia…"
          autoComplete="off"
          className={inputClass}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">Asistencia</legend>
          <div className="flex flex-wrap gap-2">
            {ATTENDING.map((opt) => (
              <span key={opt.value} className="relative">
                <input
                  id={`att-${opt.value}`}
                  type="radio"
                  name="attending-filter"
                  checked={filters.attending === opt.value}
                  onChange={() => onChange({ ...filters, attending: opt.value })}
                  className="peer sr-only"
                />
                <label htmlFor={`att-${opt.value}`} className={chip}>
                  {opt.label}
                </label>
              </span>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold">Régimen alimentario</legend>
          <div className="flex flex-wrap gap-2">
            {options.map((opt) => (
              <span key={opt.value} className="relative">
                <input
                  id={`diet-${opt.value}`}
                  type="checkbox"
                  checked={filters.dietary.includes(opt.value)}
                  onChange={(e) => toggleDiet(opt.value, e.target.checked)}
                  className="peer sr-only"
                />
                <label htmlFor={`diet-${opt.value}`} className={chip}>
                  {dietLabel(opt.value, options)}
                </label>
              </span>
            ))}
          </div>
        </fieldset>
      </div>

      {hasActiveFilters(filters) ? (
        <div>
          <Button variant="quiet" size="sm" onClick={onClear}>
            Limpiar filtros
          </Button>
        </div>
      ) : null}
    </section>
  );
}
