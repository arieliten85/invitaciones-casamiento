"use client";

import type { DietaryOption, DietaryValue } from "@/config/config.types";
import { inputClass } from "@/components/ui/field";

type Props = {
  /** Prefijo único para ids (varias personas en la misma página). */
  id: string;
  legend: string;
  options: DietaryOption[];
  value: DietaryValue[];
  other: string;
  error?: string;
  otherError?: string;
  onChange: (next: { dietary: DietaryValue[]; dietaryOther: string }) => void;
};

export function DietaryPicker({ id, legend, options, value, other, error, otherError, onChange }: Props) {
  function toggle(v: DietaryValue, checked: boolean) {
    let next: DietaryValue[];
    if (v === "ninguna") {
      next = checked ? ["ninguna"] : value.filter((x) => x !== "ninguna");
    } else {
      next = checked ? [...value.filter((x) => x !== "ninguna"), v] : value.filter((x) => x !== v);
    }
    // Siempre queda algo elegido: sin restricciones = «Ninguna».
    if (next.length === 0) next = ["ninguna"];
    onChange({ dietary: next, dietaryOther: next.includes("otra") ? other : "" });
  }

  const showOther = value.includes("otra");

  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 text-sm font-semibold">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const inputId = `${id}-${opt.value}`;
          return (
            <span key={opt.value} className="relative">
              <input
                id={inputId}
                type="checkbox"
                checked={value.includes(opt.value)}
                onChange={(e) => toggle(opt.value, e.target.checked)}
                className="peer sr-only"
              />
              <label
                htmlFor={inputId}
                className="border-border bg-surface hover:bg-primary-soft/40 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-on-primary peer-focus-visible:outline-ring inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm font-semibold transition-colors select-none peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2"
              >
                {opt.label}
              </label>
            </span>
          );
        })}
      </div>

      {showOther ? (
        <div className="mt-3">
          <label htmlFor={`${id}-other`} className="sr-only">
            Contanos cuál es la restricción
          </label>
          <input
            id={`${id}-other`}
            type="text"
            maxLength={120}
            value={other}
            onChange={(e) => onChange({ dietary: value, dietaryOther: e.target.value })}
            placeholder="Contanos cuál"
            aria-invalid={otherError ? true : undefined}
            aria-describedby={otherError ? `${id}-other-error` : undefined}
            className={inputClass}
          />
          {otherError ? (
            <p id={`${id}-other-error`} role="alert" className="text-danger mt-1.5 text-sm font-semibold">
              {otherError}
            </p>
          ) : null}
        </div>
      ) : null}

      {error ? (
        <p role="alert" className="text-danger mt-1.5 text-sm font-semibold">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
