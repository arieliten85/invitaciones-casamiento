import type { RsvpConfig } from "@/config/config.types";

/** ¿Ya no se aceptan confirmaciones? Se usa en el servidor (página y acción). */
export function isRsvpClosed({ enabled, deadline }: Pick<RsvpConfig, "enabled" | "deadline">): boolean {
  return !enabled || Date.now() > new Date(deadline).getTime();
}
