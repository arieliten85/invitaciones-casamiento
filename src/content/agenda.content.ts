/**
 * Datos reales de la invitación (novios, fecha, lugar, dress code, textos de la tarjeta y la dinámica
 * de la noche que contó Florencia) y los dos formularios de Google.
 * Siguen siendo DE EJEMPLO o A CONFIRMAR: datos del civil, alias y datos bancarios.
 */
export const agenda = {
  couple: { first: "Florencia", second: "Matías" },
  /** Frase corta debajo de «Nuestra Boda» en la portada. */
  tagline: "Una noche para celebrar y bailar",
  /** Viernes 11 de diciembre de 2026, 21:00 (hora de Argentina). */
  date: "2026-12-11T21:00:00-03:00",
  timeZone: "America/Argentina/Buenos_Aires",
  durationHours: 8,

  /**
   * Fotos DE EJEMPLO (libres de uso). Para las reales: copiarlas a public/brand/photos
   * y poner acá su ruta, por ejemplo "/brand/photos/portada.jpg".
   */
  photos: {
    strip: [
      {
        src: "https://images.unsplash.com/photo-1505428215601-90f0007b9e83?auto=format&fit=crop&w=900&q=80",
        alt: "La pareja abrazada",
      },
      {
        src: "https://images.unsplash.com/photo-1524650448000-02d0a2aeb6cb?auto=format&fit=crop&w=900&q=80",
        alt: "La pareja en blanco y negro",
      },
      {
        src: "https://images.unsplash.com/photo-1530779333071-8c0386cd1fdf?auto=format&fit=crop&w=900&q=80",
        alt: "La pareja dándose un beso",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1606569371439-56b1e393a06b?auto=format&fit=crop&w=1000&q=80",
        alt: "La pareja abrazada",
      },
      {
        src: "https://images.unsplash.com/photo-1758523981334-4b7d5e179efa?auto=format&fit=crop&w=1000&q=80",
        alt: "Amigos con bengalas al atardecer",
      },
      {
        src: "https://images.unsplash.com/photo-1611075099808-e3af7993333a?auto=format&fit=crop&w=1000&q=80",
        alt: "Un beso",
      },
      {
        src: "https://images.unsplash.com/photo-1520975408777-d189f6edc46d?auto=format&fit=crop&w=1000&q=80",
        alt: "La pareja abrazada",
      },
    ],
    more: [
      {
        src: "https://images.unsplash.com/photo-1708569176813-746f00614012?auto=format&fit=crop&w=1000&q=80",
        alt: "Los novios riéndose",
      },
      {
        src: "https://images.unsplash.com/photo-1580657274234-7339717f4541?auto=format&fit=crop&w=1000&q=80",
        alt: "Brindis con champagne",
      },
      {
        src: "https://images.unsplash.com/photo-1503238774835-1e800884d53b?auto=format&fit=crop&w=1000&q=80",
        alt: "Bengala encendida",
      },
    ],
  },

  welcome: {
    title: "¡Nos casamos!",
    text: "Y queremos celebrarlo rodeados de las personas que queremos.\nTe invitamos a compartir con nosotros una noche muy especial, llena de brindis, música, baile y festejo.",
  },

  /** Civil: opcional. Mientras `confirmed` sea false se muestra «a confirmar». */
  civil: {
    title: "Civil",
    note: "Opcional · para quien quiera acompañarnos",
    confirmed: false,
    /* DATOS DE EJEMPLO: actualizar cuando los novios confirmen. */
    day: "Viernes 11 de diciembre",
    time: "18:00 hs",
    name: "Registro Civil de Lomas de Zamora",
    address: "Manuel Castro 220, Lomas de Zamora",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Registro+Civil+Lomas+de+Zamora",
  },

  place: {
    title: "Festejo",
    tag: "En un boliche · noche informal y de mucho baile",
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
      { title: "Bandejeo", text: "Comida circulando para picar, brindar y charlar." },
      { title: "¡A bailar!", text: "Pista toda la noche, con la mesa dulce en el medio." },
      { title: "Cierre", text: "Terminamos la noche con cerveza y pizza." },
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
    holder: "Titular de ejemplo",
    alias: "FLOR.MATI.2026",
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
