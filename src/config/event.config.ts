import type { EventConfig } from "./config.types";

/**
 * DATOS DE EJEMPLO (MOCK) — todo es ficticio.
 * Para el evento real se reemplazan los valores de este archivo y de
 * src/content/invitation.content.ts. Ningún componente tiene datos fijos.
 */
export const eventConfig = {
  slug: "lucia-y-martin",
  locale: "es-AR",
  timeZone: "America/Argentina/Buenos_Aires",
  couple: { first: "Lucía", second: "Martín" },
  date: "2027-03-20T22:00:00-03:00",

  places: [
    {
      id: "fiesta",
      title: "Fiesta",
      icon: "copas",
      time: "22:00 hs",
      name: "Club Ejemplo",
      address: "Av. Siempre Viva 742, Córdoba",
      mapsUrl: "https://maps.google.com/?q=Cordoba+Argentina",
    },
  ],

  rsvp: {
    enabled: true,
    deadline: "2027-03-01T23:59:59-03:00",
    maxCompanions: 3,
    dietaryOptions: [
      { value: "ninguna", label: "Ninguna" },
      { value: "vegetariano", label: "Vegetariano" },
      { value: "vegano", label: "Vegano" },
      { value: "celiaco", label: "Celíaco" },
      { value: "otra", label: "Otra" },
    ],
  },
} satisfies EventConfig;
