import type { DietaryValue } from "@/config/config.types";

/** Una persona que asiste (el invitado o un acompañante). */
export type GuestPerson = {
  name: string;
  dietary: DietaryValue[];
  dietaryOther: string;
};

/** Una respuesta de confirmación. `people[0]` es quien respondió; vacío si no asiste. */
export type Guest = {
  id: string;
  firstName: string;
  lastName: string;
  whatsapp: string;
  attending: boolean;
  people: GuestPerson[];
  message: string;
  /** ISO 8601. */
  createdAt: string;
};

export type AttendingFilter = "todos" | "si" | "no";

export type GuestFilters = {
  query: string;
  attending: AttendingFilter;
  dietary: DietaryValue[];
};

export type GuestSummary = {
  responses: number;
  attendingResponses: number;
  notAttendingResponses: number;
  /** Personas que asisten (invitados + acompañantes). */
  attendingPeople: number;
  /** Personas por régimen. Una persona con dos restricciones cuenta en ambas. */
  byDietary: Record<DietaryValue, number>;
};
