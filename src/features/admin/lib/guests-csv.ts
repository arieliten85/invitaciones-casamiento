import type { DietaryOption } from "@/config/config.types";
import type { Guest } from "../model/guest.types";

/** Excel en español (Argentina) usa «;» como separador de columnas. */
const SEPARATOR = ";";
const BOM = "﻿"; // para que Excel muestre bien tildes y ñ

function cell(value: string | number): string {
  let text = String(value);
  // Evita que Excel interprete el texto como una fórmula (inyección de CSV).
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

/**
 * CSV con una fila por persona (pensado para pasarle al catering).
 * Quien no asiste aparece en una sola fila con «No».
 */
export function guestsToCsv(guests: Guest[], dietaryOptions: DietaryOption[], timeZone: string): string {
  const label = new Map(dietaryOptions.map((o) => [o.value, o.label]));
  const date = new Intl.DateTimeFormat("es-AR", { timeZone, dateStyle: "short", timeStyle: "short" });

  const header = [
    "Invitado",
    "WhatsApp",
    "Asiste",
    "Persona",
    "Tipo",
    "Régimen alimentario",
    "Otra restricción",
    "Mensaje",
    "Fecha de respuesta",
  ];

  const rows: string[][] = [];
  for (const g of guests) {
    const who = `${g.firstName} ${g.lastName}`;
    const when = date.format(new Date(g.createdAt));
    if (!g.attending || g.people.length === 0) {
      rows.push([who, g.whatsapp, "No", who, "Invitado", "", "", g.message, when]);
      continue;
    }
    g.people.forEach((p, index) => {
      rows.push([
        who,
        g.whatsapp,
        "Sí",
        p.name,
        index === 0 ? "Invitado" : "Acompañante",
        p.dietary.map((d) => label.get(d) ?? d).join(", "),
        p.dietaryOther,
        index === 0 ? g.message : "",
        when,
      ]);
    });
  }

  return BOM + [header, ...rows].map((r) => r.map(cell).join(SEPARATOR)).join("\r\n");
}
