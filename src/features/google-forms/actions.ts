"use server";

import { z } from "zod";
import { agenda } from "@/content/agenda.content";
import { isInline, responseUrl, type FormField, type FormKey, type SendState } from "./model";

const ALLOWED = /^https:\/\/docs\.google\.com\/forms\/d\/e\/[\w-]+\/viewform$/;

/**
 * Envía las respuestas al formulario de Google desde el servidor.
 * El navegador nunca elige la URL: sale de la configuración del evento.
 */
export async function sendGoogleForm(key: FormKey, _prev: SendState, data: FormData): Promise<SendState> {
  const form = agenda[key];
  const fields: readonly FormField[] = form.fields;
  if (!ALLOWED.test(form.formUrl) || !isInline(fields)) {
    return { status: "error", message: "Este formulario no está disponible." };
  }

  const body = new URLSearchParams();
  for (const field of fields) {
    const schema = z
      .string()
      .trim()
      .max(field.kind === "choice" ? 80 : 300);
    const parsed = schema.safeParse(data.get(field.name) ?? "");
    const value = parsed.success ? parsed.data : "";
    if (field.required && !value) return { status: "error", message: `Completá «${field.label}».` };
    if (field.kind === "choice" && value && !field.options?.includes(value)) {
      return { status: "error", message: "Elegí una de las opciones." };
    }
    if (value) body.append(`entry.${field.entry}`, value);
  }

  try {
    const res = await fetch(responseUrl(form.formUrl), {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    });
    if (!res.ok) throw new Error(String(res.status));
    return { status: "ok" };
  } catch {
    return { status: "error", message: "No pudimos enviarlo. Probá de nuevo en un ratito." };
  }
}
