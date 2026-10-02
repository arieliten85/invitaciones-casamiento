/**
 * Modo demostración: se activa con NEXT_PUBLIC_DEMO_MODE=true.
 * - El formulario muestra el flujo completo pero NO guarda nada.
 * - El panel admin usa invitados ficticios y es accesible sin contraseña real.
 * Sin esta variable, el sitio se comporta como producción (y no inventa éxitos).
 */
export const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
