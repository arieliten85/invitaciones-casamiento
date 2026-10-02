import localFont from "next/font/local";

/*
 * Fuentes autoalojadas (licencia SIL OFL), subset latino: cubre tildes, ñ, ¿ y ¡.
 * Se sirven desde el propio sitio: sin pedidos a Google y con build reproducible.
 */

export const cormorant = localFont({
  variable: "--font-cormorant",
  display: "swap",
  src: [
    { path: "./fonts/cormorant-garamond-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-500-italic.woff2", weight: "500", style: "italic" },
  ],
});

export const jost = localFont({
  variable: "--font-jost",
  display: "swap",
  src: [
    { path: "./fonts/jost-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "./fonts/jost-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/jost-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
});

export const fontVariables = `${cormorant.variable} ${jost.variable}`;
