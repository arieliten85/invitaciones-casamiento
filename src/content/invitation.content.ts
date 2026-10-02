import type { InvitationContent } from "./content.types";

/** DATOS DE EJEMPLO (MOCK) — textos ficticios, incluido el CBU. */
export const invitationContent = {
  /*
   * Fotos: por ahora son de ejemplo (Unsplash, licencia libre). Para las reales, copiá los
   * archivos a public/brand/photos y poné su ruta en `src` (ej. "/brand/photos/portada.jpg").
   * Recomendado: ~2000 px de ancho, JPG o WebP.
   */
  photos: {
    hero: {
      src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=2000&q=80",
      alt: "Los novios caminando de la mano",
      credit: "Foto Pettine",
    },
    band: {
      src: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?auto=format&fit=crop&w=2000&q=80",
      alt: "Los novios, retrato en blanco y negro",
      credit: "Hisu lee",
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80",
        alt: "Los novios con el ramo, a la luz del atardecer",
        credit: "Nathan Dumlao",
      },
      {
        src: "https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?auto=format&fit=crop&w=2000&q=80",
        alt: "Los novios a punto de besarse en el campo",
        credit: "Elvis Bekmanis",
      },
      {
        src: "https://images.unsplash.com/photo-1563808599481-34a342e44508?auto=format&fit=crop&w=2000&q=80",
        alt: "Los novios en el muelle",
        credit: "Jonathan Borba",
      },
    ],
  },

  heroEyebrow: "¡Nos casamos!",
  tagline: "Con amor y alegría los invitamos a compartir nuestro casamiento",
  welcome:
    "Dos almas que se encontraron en el camino y eligieron recorrerlo juntas para siempre. Queremos que seas parte de este día tan especial.",

  schedule: [
    { time: "22:00", label: "Recepción y brindis" },
    { time: "23:00", label: "Cena" },
    { time: "00:30", label: "Fiesta y baile" },
    { time: "04:00", label: "Cierre" },
  ],

  dressCode: "Elegante sport.",

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
