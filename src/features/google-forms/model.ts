/** Un campo de un formulario de Google, tal como se configura en el contenido. */
export type FormField = {
  /** Número de `entry.NNN` del formulario (del «vínculo prellenado»). Vacío = sin configurar. */
  readonly entry: string;
  readonly name: string;
  readonly label: string;
  readonly kind: "text" | "choice";
  readonly required: boolean;
  readonly options?: readonly string[];
  readonly placeholder?: string;
};

export type FormKey = "rsvp" | "songs";

export type SendState = { status: "idle" | "ok" | "error"; message?: string };

/** El formulario se puede completar dentro de la invitación solo si todos los campos tienen entry. */
export const isInline = (fields: readonly FormField[]) => fields.every((f) => /^\d+$/.test(f.entry));

/** De ".../viewform" a ".../formResponse" (adonde Google recibe las respuestas). */
export const responseUrl = (formUrl: string) => formUrl.replace(/\/viewform.*$/, "/formResponse");
