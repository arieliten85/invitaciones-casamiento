import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { Branch } from "@/components/agenda/botanical";
import { agenda } from "@/content/agenda.content";

/* Imagen que muestran WhatsApp, Instagram, etc. al compartir el link (mismo estilo que la portada). */
export const alt = `${agenda.couple.first} & ${agenda.couple.second} · Nuestra boda`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (file: string) => readFile(join(process.cwd(), "src/app/_og", file));

export default async function OpengraphImage() {
  const [script, italic, sans] = await Promise.all([
    font("playfair-display-latin-400-normal.woff"),
    font("playfair-display-latin-400-italic.woff"),
    font("lato-latin-400-normal.woff"),
  ]);
  const { couple, date, timeZone, place } = agenda;
  const parts = new Intl.DateTimeFormat("es-AR", {
    timeZone,
    day: "2-digit",
    month: "short",
    year: "2-digit",
  })
    .formatToParts(new Date(date))
    .reduce<Record<string, string>>((acc, p) => ({ ...acc, [p.type]: p.value }), {});
  const bar = <div style={{ width: 2, height: 46, background: "rgba(123,150,112,0.6)", margin: "0 34px" }} />;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at 50% 45%, #fbfbf8 0%, #eef0e8 70%)",
        color: "#36412f",
        fontFamily: "Lato",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          width: 300,
          height: 300,
          color: "#7b9670",
        }}
      >
        {Branch({ flipY: true })}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          display: "flex",
          width: 280,
          height: 280,
          color: "#7b9670",
        }}
      >
        {Branch({ flipX: true })}
      </div>
      <div style={{ fontSize: 26, letterSpacing: 14, color: "#5f6858" }}>NOS CASAMOS</div>
      <div
        style={{
          fontFamily: "Playfair Display",
          fontSize: 104,
          color: "#36412f",
          lineHeight: 1,
          marginTop: 18,
          display: "flex",
          alignItems: "center",
        }}
      >
        <span>{couple.first}</span>
        <span style={{ fontStyle: "italic", color: "#7b9670", fontSize: 60, margin: "0 28px" }}>&</span>
        <span>{couple.second}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", fontSize: 44, letterSpacing: 10, marginTop: 20 }}>
        <span>{parts.day}</span>
        {bar}
        <span>{(parts.month ?? "").replace(".", "").toUpperCase()}</span>
        {bar}
        <span>{parts.year}</span>
      </div>
      <div style={{ fontSize: 18, letterSpacing: 10, marginTop: 28, color: "#5b7550" }}>
        {place.locality.toUpperCase()}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Playfair Display", data: script, style: "normal", weight: 400 },
        { name: "Playfair Display", data: italic, style: "italic", weight: 400 },
        { name: "Lato", data: sans, style: "normal", weight: 400 },
      ],
    },
  );
}
