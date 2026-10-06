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

export const montserrat = localFont({
  variable: "--font-montserrat",
  display: "swap",
  src: [
    { path: "./fonts/montserrat-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "./fonts/montserrat-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/montserrat-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/montserrat-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
});

export const baskerville = localFont({
  variable: "--font-baskerville",
  display: "swap",
  src: [{ path: "./fonts/libre-baskerville-latin-400-normal.woff2", weight: "400", style: "normal" }],
});

export const jost = localFont({
  variable: "--font-jost",
  display: "swap",
  src: [{ path: "./fonts/jost-latin-400-normal.woff2", weight: "400", style: "normal" }],
});

export const fontVariables = `${cormorant.variable} ${montserrat.variable} ${baskerville.variable} ${jost.variable}`;
