/**
 * DATOS DE EJEMPLO (MOCK) — todo es ficticio salvo los nombres de los novios y los
 * dos formularios de Google. Para el evento real se reemplazan los valores de este archivo.
 */
export const agenda = {
  couple: { first: "Matías", second: "Florencia" },
  /** 20 de marzo de 2027, 18:00 (hora de Argentina). */
  date: "2027-03-20T18:00:00-03:00",
  timeZone: "America/Argentina/Buenos_Aires",
  durationHours: 8,

  quote: {
    title: "Llegó el gran día",
    text: "Andábamos sin buscarnos, pero sabiendo que andábamos para encontrarnos.",
    author: "Julio Cortázar",
  },

  place: {
    title: "Fiesta",
    name: "Quinta Los Aromos,",
    address: "Pilar, Buenos Aires.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pilar%2C+Buenos+Aires",
  },

  rsvp: {
    message: "Esperamos que puedas acompañarnos. ¡Confirmanos tu asistencia!",
    note: "Solo adultos",
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSfcZEiWRrTFsv_O5DJ0RmS_f-q64q_zc1yRimT1Y8J_PdcfOg/viewform",
  },

  dressCode: "Estilo libre, ¡calzado cómodo para bailar!",
  calendarText: "¡Agendá la fecha en tu calendario!",

  instagram: {
    handle: "@MatiYFlor2027",
    url: "https://www.instagram.com/matiyflor2027",
    text: "¡Preparate para nuestro casamiento!\nYa podés seguirnos en nuestra cuenta para ver todas las novedades del casamiento y etiquetarnos en tus fotos y videos.",
  },

  gallery: {
    title: "Nosotros",
    text: "Cada historia de amor es diferente, ¡pero la nuestra es única!",
    /** Cantidad de fotos; por ahora son espacios reservados. */
    count: 6,
  },

  gift: {
    message: "¡El mejor regalo es tu presencia!\nSi deseas realizarnos un regalo...",
    bank: "Banco Ejemplo",
    holder: "Florencia Ejemplo",
    alias: "MATI.FLOR.2027",
  },

  songs: {
    title: "¡Fiesta!",
    text: "¿Qué canciones no pueden faltar en la fiesta?\n¡Queremos crear una lista inolvidable!",
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSfdtmBohj5qbCYqTHMoKBQw7QHg-qN5RPogetck4j4Pq6c8kA/viewform",
  },

  footer: "¡Gracias por acompañarnos en este momento tan importante!",
} as const;
