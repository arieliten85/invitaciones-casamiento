"use server";

import { isDemoMode } from "@/lib/demo-mode";

export type DeleteGuestResult = { ok: true } | { ok: false; message: string };

/**
 * Elimina una confirmación.
 * DEMO: no hay base de datos; devolvemos «ok» y el panel quita la fila en pantalla.
 * BACK (fase siguiente): exige sesión de administrador y borra en Supabase.
 */
export async function deleteGuest(id: string): Promise<DeleteGuestResult> {
  if (typeof id !== "string" || id.length === 0 || id.length > 64) {
    return { ok: false, message: "Identificador inválido." };
  }
  if (isDemoMode) return { ok: true };
  return { ok: false, message: "El panel todavía no está conectado a la base de datos." };
}
