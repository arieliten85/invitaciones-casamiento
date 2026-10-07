/**
 * VERSIÓN DEMO (rama feat/v3): todos los datos son FICTICIOS (fecha, lugares, civil, banco, alias).
 * Los formularios de Google son los propios del autor (no tienen relación con la pareja).
 * Las fotos son de stock libre (Pexels), de una misma sesión de pareja.
 */
type Photo = { src: string; alt: string; ratio: number; frame?: number; focus?: string };
type PhotoSet = { strip: Photo[]; gallery: Photo[]; more: Photo[] };

export const agenda = {
  couple: { first: "Florencia", second: "Matías" },
  /** Frase corta debajo de «Nuestra Boda» en la portada. */
  tagline: "Una noche para celebrar y bailar",
  /** Sábado 20 de marzo de 2027, 21:00 (hora de Argentina); termina a las 04:00. Fecha ficticia. */
  date: "2027-03-20T21:00:00-03:00",
  timeZone: "America/Argentina/Buenos_Aires",
  durationHours: 7,

  /**
   * Fotos de stock libre (Pexels, uso libre sin atribución), todas de la misma sesión de pareja.
   * `strip` va en la bienvenida; `gallery` en la galería; `more` se suma al tocar «Ver todas las fotos».
   */
  photos: {
    strip: [
      {
        src: "https://images.pexels.com/photos/31107090/pexels-photo-31107090.jpeg?auto=compress&cs=tinysrgb&w=1000",
        alt: "La pareja abrazada con un ramo de flores",
        ratio: 0.6667,
      },
      {
        src: "https://images.pexels.com/photos/31107091/pexels-photo-31107091.jpeg?auto=compress&cs=tinysrgb&w=1000",
        alt: "La pareja posando entre flores",
        ratio: 0.6667,
      },
      {
        src: "https://images.pexels.com/photos/31107092/pexels-photo-31107092.jpeg?auto=compress&cs=tinysrgb&w=1000",
        alt: "La pareja en una sesión al aire libre",
        ratio: 0.6667,
      },
    ],
    gallery: [
      {
        src: "https://images.pexels.com/photos/31107093/pexels-photo-31107093.jpeg?auto=compress&cs=tinysrgb&w=1000",
        alt: "La pareja posando con flores",
        ratio: 0.6667,
      },
      {
        src: "https://images.pexels.com/photos/31107094/pexels-photo-31107094.jpeg?auto=compress&cs=tinysrgb&w=1000",
        alt: "La pareja con un girasol",
        ratio: 0.6667,
      },
      {
        src: "https://images.pexels.com/photos/31107091/pexels-photo-31107091.jpeg?auto=compress&cs=tinysrgb&w=1000",
        alt: "La pareja posando entre flores",
        ratio: 0.6667,
      },
      {
        src: "https://images.pexels.com/photos/31107092/pexels-photo-31107092.jpeg?auto=compress&cs=tinysrgb&w=1000",
        alt: "La pareja en una sesión al aire libre",
        ratio: 0.6667,
      },
    ],
    more: [],
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
    day: "Sábado 20 de marzo",
    time: "10:30 hs",
    name: "Registro Civil de Ejemplo",
    address: "Calle Ejemplo 123, Ciudad Ejemplo",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Calle+Ejemplo+123%2C+Ciudad+Ejemplo",
  },

  place: {
    title: "Festejo",
    tag: "En un salón · noche informal y de mucho baile",
    name: "Salón Jardín de Ejemplo",
    address: "Av. Siempre Viva 742, Ciudad Ejemplo",
    locality: "Ciudad Ejemplo",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Av.+Siempre+Viva+742%2C+Ciudad+Ejemplo",
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
      "https://docs.google.com/forms/d/e/1FAIpQLSfcZEiWRrTFsv_O5DJ0RmS_f-q64q_zc1yRimT1Y8J_PdcfOg/viewform",
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
    holder: "Titular de Ejemplo",
    alias: "EJEMPLO.BODA.27",
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
      "https://docs.google.com/forms/d/e/1FAIpQLSfdtmBohj5qbCYqTHMoKBQw7QHg-qN5RPogetck4j4Pq6c8kA/viewform",
  },

  footer: "¡Gracias por acompañarnos en este momento tan importante!",
} as const;
