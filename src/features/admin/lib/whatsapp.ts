/**
 * Link de WhatsApp a partir del número guardado (solo dígitos).
 * Es una ayuda: si el número ya trae 54 se usa tal cual; si no, se asume celular argentino (549…).
 */
export function whatsappLink(digits: string): string {
  const clean = digits.replace(/\D/g, "").replace(/^0+/, "");
  const full = clean.startsWith("54") ? clean : `549${clean}`;
  return `https://wa.me/${full}`;
}

/** Muestra el número con espacios: 3515550101 → 351 555 0101. */
export function formatWhatsapp(digits: string): string {
  const d = digits.replace(/\D/g, "");
  if (d.length === 10) return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
  return d;
}
