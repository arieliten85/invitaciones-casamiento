import localFont from "next/font/local";

/*
 * Fuentes autoalojadas (licencia SIL OFL), subset latino: cubre tildes, ñ, ¿ y ¡.
 * Se sirven desde el propio sitio: sin pedidos a Google y con build reproducible.
 */

export const dancing = localFont({
  variable: "--font-dancing",
  display: "swap",
  src: [
    { path: "./fonts/dancing-script-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/dancing-script-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
});

export const cormorant = localFont({
  variable: "--font-cormorant",
  display: "swap",
  src: [
    { path: "./fonts/cormorant-garamond-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-500-italic.woff2", weight: "500", style: "italic" },
    { path: "./fonts/cormorant-garamond-latin-600-italic.woff2", weight: "600", style: "italic" },
  ],
});

export const quicksand = localFont({
  variable: "--font-quicksand",
  display: "swap",
  src: [
    { path: "./fonts/quicksand-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/quicksand-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/quicksand-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
});

export const fontVariables = `${dancing.variable} ${cormorant.variable} ${quicksand.variable}`;
