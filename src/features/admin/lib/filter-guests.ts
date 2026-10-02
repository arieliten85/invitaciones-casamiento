import type { Guest, GuestFilters } from "../model/guest.types";
import { normalizeText } from "./text";

export const emptyFilters: GuestFilters = { query: "", attending: "todos", dietary: [] };

export function hasActiveFilters(f: GuestFilters): boolean {
  return f.query.trim() !== "" || f.attending !== "todos" || f.dietary.length > 0;
}

/**
 * Filtra respuestas.
 * - Búsqueda: nombre o apellido de quien respondió, o nombre de algún acompañante.
 * - Asistencia: todos / sí / no.
 * - Dieta: la respuesta se muestra si alguna de sus personas tiene alguna de las dietas elegidas.
 */
export function filterGuests(guests: Guest[], filters: GuestFilters): Guest[] {
  const q = normalizeText(filters.query);

  return guests.filter((g) => {
    if (filters.attending === "si" && !g.attending) return false;
    if (filters.attending === "no" && g.attending) return false;

    if (q) {
      const haystack = [
        g.firstName,
        g.lastName,
        `${g.firstName} ${g.lastName}`,
        ...g.people.map((p) => p.name),
      ]
        .map(normalizeText)
        .join(" | ");
      if (!haystack.includes(q)) return false;
    }

    if (filters.dietary.length > 0) {
      const match = g.people.some((p) => p.dietary.some((d) => filters.dietary.includes(d)));
      if (!match) return false;
    }

    return true;
  });
}
