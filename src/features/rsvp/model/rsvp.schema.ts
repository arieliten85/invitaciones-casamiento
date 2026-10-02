import { z } from "zod";
import { DIETARY_VALUES } from "@/config/config.types";
import { eventConfig } from "@/config/event.config";

const dietarySchema = z
  .array(z.enum(DIETARY_VALUES))
  .min(1, "Elegí al menos una opción.")
  .max(DIETARY_VALUES.length);

function checkDietary(value: { dietary: readonly string[]; dietaryOther: string }, ctx: z.RefinementCtx) {
  if (value.dietary.includes("ninguna") && value.dietary.length > 1) {
    ctx.addIssue({
      code: "custom",
      path: ["dietary"],
      message: "Elegí «Ninguna» o las restricciones, no ambas.",
    });
  }
  if (value.dietary.includes("otra") && value.dietaryOther.length < 2) {
    ctx.addIssue({ code: "custom", path: ["dietaryOther"], message: "Contanos cuál es la restricción." });
  }
}

const personBase = z.object({
  dietary: dietarySchema,
  dietaryOther: z.string().trim().max(120, "Máximo 120 caracteres."),
});

const nameField = (label: string) =>
  z.string().trim().min(2, `Escribí ${label}.`).max(80, "Máximo 80 caracteres.");

const guestSchema = personBase.superRefine(checkDietary);

const companionSchema = personBase
  .extend({ name: nameField("el nombre y apellido del acompañante") })
  .superRefine(checkDietary);

export const rsvpSchema = z
  .object({
    firstName: nameField("tu nombre"),
    lastName: nameField("tu apellido"),
    whatsapp: z
      .string()
      .trim()
      .transform((v) => v.replace(/\D/g, ""))
      .refine((v) => v.length >= 8 && v.length <= 15, "Revisá el número de WhatsApp."),
    attending: z.boolean(),
    guest: guestSchema,
    companions: z.array(companionSchema).max(eventConfig.rsvp.maxCompanions),
    message: z.string().trim().max(400, "Máximo 400 caracteres."),
    /** Campo trampa para bots: las personas lo dejan vacío. */
    website: z.string().max(200),
  })
  .superRefine((value, ctx) => {
    if (!value.attending && value.companions.length > 0) {
      ctx.addIssue({ code: "custom", path: ["companions"], message: "Sin asistencia no hay acompañantes." });
    }
  });

export type RsvpInput = z.input<typeof rsvpSchema>;
export type RsvpData = z.output<typeof rsvpSchema>;

export type RsvpResult =
  | { ok: true; attending: boolean }
  | {
      ok: false;
      code: "closed" | "invalid" | "duplicate" | "unavailable";
      message: string;
      fieldErrors?: Record<string, string>;
    };

/** Convierte los errores de Zod en un mapa «ruta → mensaje» (se queda con el primero de cada ruta). */
export function toFieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}
