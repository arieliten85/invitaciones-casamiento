import localFont from "next/font/local";

/*
 * Fuentes autoalojadas (licencia SIL OFL), subset latino: cubre tildes, ñ, ¿ y ¡.
 * Se sirven desde el propio sitio: sin pedidos a Google y con build reproducible.
 */

/** Títulos: serif clásica y elegante (nombres, «Cuándo y dónde», horarios). */
export const playfair = localFont({
  variable: "--font-playfair",
  display: "swap",
  src: [
    { path: "./fonts/playfair-display-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/playfair-display-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
});

/** Texto y rótulos en mayúsculas espaciadas. */
export const lato = localFont({
  variable: "--font-lato",
  display: "swap",
  src: [
    { path: "./fonts/lato-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "./fonts/lato-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/lato-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
});

export const fontVariables = `${playfair.variable} ${lato.variable}`;
