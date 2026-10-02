/** Minúsculas y sin tildes, para buscar «maria» y encontrar «María». */
export function normalizeText(value: string): string {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}
