"use server";

import { eventConfig } from "@/config/event.config";
import { isRsvpClosed } from "../lib/is-rsvp-closed";
import { rsvpSchema, toFieldErrors, type RsvpResult } from "../model/rsvp.schema";
import { saveRsvp } from "./rsvp-store";

export async function submitRsvp(input: unknown): Promise<RsvpResult> {
  // El plazo se valida siempre en el servidor, no solo en el navegador.
  if (isRsvpClosed(eventConfig.rsvp)) {
    return { ok: false, code: "closed", message: "Las confirmaciones ya cerraron." };
  }

  const parsed = rsvpSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: "invalid",
      message: "Revisá los datos marcados e intentá de nuevo.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  const data = parsed.data;

  // Campo trampa completado: es un bot. Respondemos «ok» sin guardar nada.
  if (data.website.trim() !== "") return { ok: true, attending: data.attending };

  try {
    const status = await saveRsvp(data);
    if (status === "duplicate") {
      return {
        ok: false,
        code: "duplicate",
        message: "Ya confirmaste con este número. Si querés cambiar algo, avisales a los novios.",
      };
    }
    return { ok: true, attending: data.attending };
  } catch (error) {
    console.error("[rsvp] no se pudo guardar", error);
    return {
      ok: false,
      code: "unavailable",
      message: "No pudimos guardar tu confirmación. Probá de nuevo en unos minutos.",
    };
  }
}
