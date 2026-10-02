export const DIETARY_VALUES = ["ninguna", "vegetariano", "vegano", "celiaco", "otra"] as const;

export type DietaryValue = (typeof DIETARY_VALUES)[number];

export type DietaryOption = {
  value: DietaryValue;
  label: string;
};

export type EventPlace = {
  id: string;
  title: string;
  /** Hora legible, por ejemplo "18:30 hs". */
  time: string;
  name: string;
  address: string;
  mapsUrl: string;
  /** Ícono de la tarjeta: "copas" para fiestas, "pin" por defecto. */
  icon?: "copas" | "pin";
};

export type RsvpConfig = {
  enabled: boolean;
  /** ISO 8601 con zona horaria. Pasado este instante el formulario se cierra solo. */
  deadline: string;
  /** Máximo de acompañantes por invitado (sin contar al invitado). */
  maxCompanions: number;
  dietaryOptions: DietaryOption[];
};

export type EventConfig = {
  /** Identificador estable del evento. */
  slug: string;
  locale: "es-AR";
  timeZone: "America/Argentina/Buenos_Aires";
  couple: { first: string; second: string };
  /** Fecha y hora de la ceremonia, ISO 8601 con zona horaria. */
  date: string;
  places: EventPlace[];
  rsvp: RsvpConfig;
};
