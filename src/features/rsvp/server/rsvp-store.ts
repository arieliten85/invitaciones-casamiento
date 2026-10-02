import "server-only";
import { isDemoMode } from "@/lib/demo-mode";
import type { RsvpData } from "../model/rsvp.schema";

export type SaveStatus = "saved" | "duplicate";

/**
 * Punto único de guardado de confirmaciones.
 * FASE 1: almacenamiento en memoria SOLO para desarrollo local.
 * FASE 2: se reemplaza por Supabase (el resto del código no cambia).
 */
const globalStore = globalThis as unknown as { __rsvpDevStore?: Map<string, RsvpData> };

export async function saveRsvp(data: RsvpData): Promise<SaveStatus> {
  // Demostración: se simula el éxito sin guardar nada (el sitio lo avisa con un cartel).
  if (isDemoMode) return "saved";
  if (process.env.NODE_ENV === "production") {
    throw new Error("RSVP_STORAGE_NOT_CONFIGURED");
  }
  const store = (globalStore.__rsvpDevStore ??= new Map());
  if (store.has(data.whatsapp)) return "duplicate";
  store.set(data.whatsapp, data);
  return "saved";
}
