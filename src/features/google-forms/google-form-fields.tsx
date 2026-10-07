"use client";

import { useActionState } from "react";
import { sendGoogleForm } from "./actions";
import type { FormField, FormKey, SendState } from "./model";

const input =
  "w-full rounded-2xl border border-line bg-paper px-4 py-3.5 text-moss placeholder:text-moss-soft/60 outline-none transition focus:border-leaf focus:bg-card";

type Props = {
  formKey: FormKey;
  fields: readonly FormField[];
  submitLabel: string;
  thanks: string;
  buttonClass: string;
};

/** Campos del formulario de Google dibujados con el estilo de la invitación. */
export function GoogleFormFields({ formKey, fields, submitLabel, thanks, buttonClass }: Props) {
  const [state, action, pending] = useActionState<SendState, FormData>(sendGoogleForm.bind(null, formKey), {
    status: "idle",
  });

  if (state.status === "ok") {
    return (
      <p role="status" className="text-leaf-deep py-6 text-center font-serif text-2xl">
        {thanks}
      </p>
    );
  }

  return (
    <form action={action} className="space-y-4 text-left">
      {fields.map((f) =>
        f.kind === "choice" ? (
          <fieldset key={f.name}>
            <legend className="text-moss mb-2 text-center text-sm">{f.label}</legend>
            <div className="grid grid-cols-2 gap-2">
              {f.options?.map((o) => (
                <label key={o} className="cursor-pointer">
                  <input
                    type="radio"
                    name={f.name}
                    value={o}
                    required={f.required}
                    className="peer sr-only"
                  />
                  <span className="border-line text-moss peer-checked:bg-leaf peer-checked:border-leaf peer-focus-visible:ring-leaf block rounded-full border px-3 py-3 text-center text-sm transition peer-checked:text-white peer-focus-visible:ring-2">
                    {o}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ) : (
          <label key={f.name} className="block">
            <span className="sr-only">{f.label}</span>
            <input
              name={f.name}
              required={f.required}
              maxLength={300}
              placeholder={`${f.placeholder ?? f.label}${f.required ? " *" : ""}`}
              className={input}
            />
          </label>
        ),
      )}
      <button type="submit" disabled={pending} className={`${buttonClass} w-full disabled:opacity-60`}>
        {pending ? "Enviando…" : submitLabel}
      </button>
      <p role="status" className="text-danger min-h-5 text-center text-sm">
        {state.status === "error" ? state.message : ""}
      </p>
    </form>
  );
}
