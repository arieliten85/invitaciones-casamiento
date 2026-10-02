import type { InvitationContent } from "./content.types";

/** DATOS DE EJEMPLO (MOCK) — textos ficticios, incluido el CBU. */
export const invitationContent = {
  /*
   * Fotos: copiá los archivos a public/brand/photos y poné acá su ruta en `src`
   * (ej. src: "/brand/photos/portada.jpg"). Sin `src` se ve un espacio neutro.
   * Recomendado: portada vertical/horizontal de buena calidad (~2000 px de ancho, JPG o WebP).
   */
  photos: {
    hero: { alt: "Los novios" },
    band: { alt: "Los novios, retrato" },
    gallery: [
      { alt: "Los novios juntos" },
      { alt: "Un momento de la pareja" },
      { alt: "Los novios, detalle" },
    ],
  },

  tagline: "Con amor y alegría los invitamos a compartir",
  welcome:
    "Dos almas que se encontraron en el camino y eligieron recorrerlo juntas para siempre. Queremos que seas parte de este día tan especial.",

  schedule: [
    { time: "18:30", label: "Ceremonia" },
    { time: "20:00", label: "Recepción y brindis" },
    { time: "21:00", label: "Cena" },
    { time: "23:00", label: "Fiesta y baile" },
  ],

  dressCode: "Elegante sport. Los tonos pastel son bienvenidos.",

  gift: {
    enabled: true,
    message:
      "Tu presencia es nuestro mejor regalo. Si querés colaborar con nuestra luna de miel, podés hacerlo con una transferencia:",
    bank: "Banco Ejemplo",
    holder: "Lucía Pérez",
    cbu: "0000000000000000000000",
    alias: "LUCIA.MARTIN.BODA",
  },

  footer: "Los esperamos con mucha ilusión.",
} satisfies InvitationContent;
