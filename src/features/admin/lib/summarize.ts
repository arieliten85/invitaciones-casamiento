import { DIETARY_VALUES, type DietaryValue } from "@/config/config.types";
import type { Guest, GuestSummary } from "../model/guest.types";

export function summarizeGuests(guests: Guest[]): GuestSummary {
  const byDietary = Object.fromEntries(DIETARY_VALUES.map((d) => [d, 0])) as Record<DietaryValue, number>;
  let attendingResponses = 0;
  let attendingPeople = 0;

  for (const g of guests) {
    if (!g.attending) continue;
    attendingResponses += 1;
    attendingPeople += g.people.length;
    for (const person of g.people) {
      for (const d of new Set(person.dietary)) byDietary[d] += 1;
    }
  }

  return {
    responses: guests.length,
    attendingResponses,
    notAttendingResponses: guests.length - attendingResponses,
    attendingPeople,
    byDietary,
  };
}
