import type { Metadata, Viewport } from "next";
import { DemoBanner } from "@/components/ui/demo-banner";
import { eventConfig } from "@/config/event.config";
import { isDemoMode } from "@/lib/demo-mode";
import { fontVariables } from "@/theme/fonts";
import "./globals.css";

const { first, second } = eventConfig.couple;

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${first} & ${second} · Nuestro casamiento`,
  description: `Estás invitado al casamiento de ${first} y ${second}. Confirmá tu asistencia desde acá.`,
  // Es una invitación privada con datos de personas: no debe aparecer en buscadores.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f6f1ea",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${fontVariables} h-full`}>
      <body className="min-h-full">
        {children}
      </body>
    </html>
  );
}
