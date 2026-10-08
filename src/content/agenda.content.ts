/**
 * Datos reales de la invitación (novios, fecha, lugar, dress code, textos de la tarjeta y la dinámica
 * de la noche que contó Florencia) y los dos formularios de Google.
 * Siguen siendo DE EJEMPLO o A CONFIRMAR: banco y titular.
 */
type Photo = { src: string; alt: string; ratio: number; frame?: number; focus?: string };
type PhotoSet = { strip: readonly Photo[]; gallery: readonly Photo[]; more: readonly Photo[] };

export const agenda = {
  couple: { first: "Florencia", second: "Matías" },
  /** Frase corta debajo de «Nuestra Boda» en la portada. */
  tagline: "Una noche para celebrar y bailar",
  /** Viernes 11 de diciembre de 2026, 21:00 (hora de Argentina); termina a las 04:00. */
  date: "2026-12-11T21:00:00-03:00",
  timeZone: "America/Argentina/Buenos_Aires",
  durationHours: 7,

  /** Fotos reales en public/brand/photos. `gallery` se ve en la página; `more` se suma al tocar «Ver todas las fotos». */
  photos: {
    strip: [
      { src: "/brand/photos/lago.webp", alt: "Florencia y Matías junto al lago", ratio: 0.9593 },
      {
        src: "/brand/photos/abrazo-vinedo.webp",
        alt: "Florencia y Matías abrazados en el viñedo",
        ratio: 0.7521,
      },
      {
        src: "/brand/photos/pergola.webp",
        alt: "Florencia y Matías bajo la pérgola iluminada",
        ratio: 0.6373,
      },
    ],
    /*
     * Galería en dos columnas (índices pares a la izquierda, impares a la derecha).
     * `frame` y `focus` (opcionales) recortan la foto SOLO en la página para que las dos columnas
     * terminen a la misma altura; en «Ver todas las fotos» se ve siempre completa.
     */
    gallery: [
      {
        src: "/brand/photos/playa-acostados.webp",
        alt: "Florencia y Matías acostados en la arena",
        ratio: 1.028,
      },
      {
        src: "/brand/photos/vuelo-playa.webp",
        alt: "Matías levantando a Florencia en la playa",
        ratio: 0.87,
      },
      { src: "/brand/photos/familia.webp", alt: "Florencia, Matías y sus hijos", ratio: 0.7623 },
      {
        src: "/brand/photos/selfie-playa.webp",
        alt: "Selfie de Florencia y Matías en la playa",
        ratio: 0.862,
      },
    ],
    more: [{ src: "/brand/photos/mirador.webp", alt: "Florencia y Matías en un mirador", ratio: 1.3538 }],
  } as PhotoSet,

  welcome: {
    title: "¡Nos casamos!",
    text: "Y queremos celebrarlo rodeados de las personas que queremos.\nTe invitamos a compartir con nosotros una noche muy especial, llena de brindis, música, baile y festejo.",
  },

  /** Civil: opcional. Mientras `confirmed` sea false se muestra «a confirmar». */
  civil: {
    title: "Civil",
    note: "Opcional · para quien quiera acompañarnos",
    confirmed: false,
    day: "Viernes 11 de diciembre",
    time: "9:15 hs",
    name: "Registro Civil de Lomas de Zamora",
    address: "Liniers 155, Lomas de Zamora",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Liniers+155%2C+Lomas+de+Zamora",
  },

  place: {
    title: "Festejo",
    tag: "Noche informal y de mucho baile",
    name: "Night club Beliving",
    address: "Gral. Bartolomé Mitre 376, Lomas de Zamora",
    locality: "Lomas de Zamora",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Night+club+Beliving%2C+Gral.+Bartolom%C3%A9+Mitre+376%2C+Lomas+de+Zamora",
  },

  /** Cómo va a ser la noche. Solo la llegada tiene hora fija. */
  timeline: {
    items: [
      { time: "21:00 hs", title: "Llegada", text: "Los esperamos para arrancar la noche juntos." },
      { title: "Entrada de los novios", text: "Cuando estemos todos, hacemos nuestra entrada." },
      { time: "22:00 hs", title: "Bandejeo", text: "Comida circulando para picar, brindar y charlar." },
      { time: "00:00 hs", title: "¡A bailar!", text: "Pista toda la noche, con la mesa dulce en el medio." },
      { time: "04:00 hs", title: "Cierre", text: "Terminamos la noche con cerveza y pizza." },
    ],
    note: "¡Vení con ganas de bailar!",
  },

  /*
   * Formularios de Google: las respuestas siguen llegando a la planilla del formulario.
   * Si cada campo tiene su `entry` (sale del «vínculo prellenado» del formulario),
   * se completa ahí mismo en la invitación. Si falta alguno, se muestra un botón
   * que abre el formulario de Google.
   */
  rsvp: {
    message: "Esperamos que puedas acompañarnos.",
    note: "La confirmación es para el festejo de la noche",
    fields: [
      { entry: "", name: "nombre", label: "Nombre y apellido", kind: "text", required: true },
      {
        entry: "",
        name: "asistencia",
        label: "¿Podés venir?",
        kind: "choice",
        required: true,
        options: ["Sí, confirmo", "No podré asistir"],
      },
      {
        entry: "",
        name: "acompanante",
        label: "Tu acompañante (si venís con uno)",
        kind: "text",
        required: false,
      },
    ],
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSd5WDEnNmM6uUZETFGT50PeWALPuCiRk2QaMztwsb5LVJ7wlg/viewform",
  },

  dressCode: "Elegante sport.",
  calendarText: "¡Agendá la fecha en tu calendario!",

  gallery: {
    title: "Nuestra historia",
    text: "Cada historia de amor es diferente, ¡pero la nuestra es única!",
  },

  gift: {
    eyebrow: "Si querés regalarnos algo",
    message: "¡El mejor regalo es tu presencia!\nSi deseas realizarnos un regalo...",
    bank: "Banco Ejemplo",
    holder: "Titular de ejemplo",
    alias: "matias.florrr",
  },

  songs: {
    eyebrow: "La playlist",
    title: "Pedí tu canción",
    text: "¿Qué temas no pueden faltar en la pista?\nSumalos y armamos juntos una lista inolvidable.",
    fields: [
      {
        entry: "",
        name: "tema",
        label: "Tema o artista",
        kind: "text",
        required: true,
        placeholder: "Ej.: Soda Stereo – De música ligera",
      },
      { entry: "", name: "nombre", label: "Tu nombre", kind: "text", required: false },
    ],
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSdOc_s0FWXOiBbMAbDvvM2dLJWkGsBtDpS5Wwe4nOAJxOZh2g/viewform",
  },

  footer: "¡Gracias por acompañarnos en este momento tan importante!",
} as const;
