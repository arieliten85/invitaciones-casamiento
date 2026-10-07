import type { Metadata, Viewport } from "next";
import { agenda } from "@/content/agenda.content";
import { fontVariables } from "@/theme/fonts";
import "./globals.css";

const { first, second } = agenda.couple;

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${first} & ${second} · Nuestra boda`,
  description:
    "Invitación de boda de ejemplo (datos ficticios): fecha, lugar, cronograma, confirmación de asistencia, galería y playlist.",
  // Es una invitación privada con datos de personas: no debe aparecer en buscadores.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f4f5ef",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${fontVariables} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
