"use client";

import { useRef, useState, useTransition } from "react";
import type { DietaryOption, DietaryValue } from "@/config/config.types";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Field, describedBy, inputClass } from "@/components/ui/field";
import { MailIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { rsvpSchema, type RsvpInput } from "../model/rsvp.schema";
import { submitRsvp } from "../server/submit-rsvp";
import { DietaryPicker } from "./dietary-picker";

type Props = {
  closed: boolean;
  deadlineLabel: string;
  maxCompanions: number;
  dietaryOptions: DietaryOption[];
};

type Person = { dietary: DietaryValue[]; dietaryOther: string };
type Companion = Person & { id: number; name: string };
type Errors = Record<string, string>;

const emptyPerson = (): Person => ({ dietary: ["ninguna"], dietaryOther: "" });

export function RsvpSection({ closed, deadlineLabel, maxCompanions, dietaryOptions }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const nextId = useRef(1);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [attending, setAttending] = useState<"si" | "no" | null>(null);
  const [guest, setGuest] = useState<Person>(emptyPerson);
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [done, setDone] = useState<null | { attending: boolean }>(null);
  const [isPending, startTransition] = useTransition();

  function focusFirstError() {
    setTimeout(() => {
      const form = formRef.current;
      if (!form) return;
      const invalid = form.querySelector<HTMLElement>('[aria-invalid="true"]');
      if (invalid) return invalid.focus();
      form
        .querySelector<HTMLElement>('[role="alert"]')
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
  }

  function addCompanion() {
    if (companions.length >= maxCompanions) return;
    // El id se calcula fuera de la función de estado: esa función debe ser pura.
    const id = nextId.current++;
    setCompanions((list) => [...list, { id, name: "", ...emptyPerson() }]);
  }

  function updateCompanion(id: number, patch: Partial<Companion>) {
    setCompanions((list) => list.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");

    const going = attending === "si";
    const payload: RsvpInput = {
      firstName,
      lastName,
      whatsapp,
      attending: going,
      guest: going ? guest : emptyPerson(),
      companions: going
        ? companions.map(({ name, dietary, dietaryOther }) => ({ name, dietary, dietaryOther }))
        : [],
      message,
      website,
    };

    // Se muestran todos los errores juntos (incluida la asistencia sin elegir).
    const fieldErrors: Errors = {};
    const check = rsvpSchema.safeParse(payload);
    if (!check.success) {
      for (const issue of check.error.issues) {
        const key = issue.path.join(".");
        if (!(key in fieldErrors)) fieldErrors[key] = issue.message;
      }
    }
    if (attending === null) fieldErrors.attending = "Contanos si vas a venir.";
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return focusFirstError();
    }
    setErrors({});

    startTransition(async () => {
      try {
        const result = await submitRsvp(payload);
        if (result.ok) {
          setDone({ attending: result.attending });
          return;
        }
        setErrors(result.fieldErrors ?? {});
        setFormError(result.message);
        focusFirstError();
      } catch {
        setFormError("No pudimos enviar tu confirmación. Revisá tu conexión e intentá de nuevo.");
      }
    });
  }

  return (
    <section id="confirmar" aria-labelledby="confirmar-titulo" className="scroll-mt-4 py-16 sm:py-24">
      <Container size="narrow">
        <SectionHeading
          id="confirmar-titulo"
          icon={<MailIcon />}
          eyebrow="RSVP"
          title="Confirmá tu asistencia"
          description={closed || done ? undefined : `Por favor confirmá antes del ${deadlineLabel}.`}
        />

        {closed ? (
          <p className="border-border bg-surface rounded-(--radius-card) border px-6 py-8 text-center shadow-(--shadow-card)">
            Las confirmaciones online ya cerraron. Si necesitás avisarnos algo, escribinos directamente por
            WhatsApp.
          </p>
        ) : done ? (
          <div
            role="status"
            className="border-success/30 bg-success-soft rounded-(--radius-card) border px-6 py-10 text-center shadow-(--shadow-card)"
          >
            <p
              aria-hidden="true"
              className="bg-success text-on-primary mx-auto flex size-12 items-center justify-center rounded-full text-2xl"
            >
              ✓
            </p>
            <h3 className="mt-4 font-serif text-3xl italic">
              {done.attending ? "¡Gracias por confirmar!" : "Gracias por avisarnos"}
            </h3>
            <p className="mt-2 text-pretty">
              {done.attending
                ? "Ya quedaste anotado/a. ¡Nos vemos en la fiesta!"
                : "Lamentamos que no puedas venir. ¡Te vamos a extrañar!"}
            </p>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            className="border-border bg-surface flex flex-col gap-6 rounded-(--radius-card) border px-5 py-8 shadow-(--shadow-card) sm:px-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="firstName" label="Nombre" error={errors.firstName}>
                <input
                  id="firstName"
                  name="firstName"
                  autoComplete="given-name"
                  maxLength={80}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Tu nombre"
                  aria-invalid={errors.firstName ? true : undefined}
                  aria-describedby={describedBy("firstName", { error: errors.firstName })}
                  className={inputClass}
                />
              </Field>
              <Field id="lastName" label="Apellido" error={errors.lastName}>
                <input
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  maxLength={80}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Tu apellido"
                  aria-invalid={errors.lastName ? true : undefined}
                  aria-describedby={describedBy("lastName", { error: errors.lastName })}
                  className={inputClass}
                />
              </Field>
            </div>

            <Field
              id="whatsapp"
              label="WhatsApp"
              hint="Lo usamos solo para avisarte si hay algún cambio."
              error={errors.whatsapp}
            >
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                maxLength={25}
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="11 2345 6789"
                aria-invalid={errors.whatsapp ? true : undefined}
                aria-describedby={describedBy("whatsapp", { hint: true, error: errors.whatsapp })}
                className={inputClass}
              />
            </Field>

            <fieldset>
              <legend className="mb-2 text-sm font-medium">¿Vas a venir?</legend>
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    { value: "si", label: "Sí, voy" },
                    { value: "no", label: "No puedo" },
                  ] as const
                ).map((opt) => (
                  <span key={opt.value} className="relative">
                    <input
                      id={`attending-${opt.value}`}
                      type="radio"
                      name="attending"
                      value={opt.value}
                      checked={attending === opt.value}
                      onChange={() => {
                        setAttending(opt.value);
                        setErrors((prev) => ({ ...prev, attending: "" }));
                      }}
                      className="peer sr-only"
                    />
                    <label
                      htmlFor={`attending-${opt.value}`}
                      className="border-border bg-surface hover:bg-primary-soft/40 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-on-primary peer-focus-visible:outline-ring flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-4 font-medium transition-colors peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2"
                    >
                      {opt.label}
                    </label>
                  </span>
                ))}
              </div>
              {errors.attending ? (
                <p role="alert" className="text-danger mt-1.5 text-sm font-medium">
                  {errors.attending}
                </p>
              ) : null}
            </fieldset>

            {attending === "si" ? (
              <>
                <DietaryPicker
                  id="guest"
                  legend="Tu restricción alimentaria"
                  options={dietaryOptions}
                  value={guest.dietary}
                  other={guest.dietaryOther}
                  error={errors["guest.dietary"]}
                  otherError={errors["guest.dietaryOther"]}
                  onChange={(next) => setGuest(next)}
                />

                {maxCompanions > 0 ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium">Acompañantes</p>
                        <p className="text-muted text-sm">
                          {companions.length === 0
                            ? `Podés sumar hasta ${maxCompanions}.`
                            : `${companions.length} de ${maxCompanions}`}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addCompanion}
                        disabled={companions.length >= maxCompanions}
                      >
                        + Agregar acompañante
                      </Button>
                    </div>

                    {companions.map((c, index) => {
                      const base = `companions.${index}`;
                      return (
                        <div
                          key={c.id}
                          className="border-border bg-background/60 flex flex-col gap-5 rounded-2xl border p-4 sm:p-5"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-serif text-xl italic lining-nums">Acompañante {index + 1}</p>
                            <Button
                              variant="quiet"
                              size="sm"
                              onClick={() => setCompanions((list) => list.filter((x) => x.id !== c.id))}
                              aria-label={`Quitar acompañante ${index + 1}`}
                            >
                              Quitar
                            </Button>
                          </div>
                          <Field
                            id={`companion-${c.id}-name`}
                            label="Nombre y apellido"
                            error={errors[`${base}.name`]}
                          >
                            <input
                              id={`companion-${c.id}-name`}
                              maxLength={80}
                              value={c.name}
                              onChange={(e) => updateCompanion(c.id, { name: e.target.value })}
                              placeholder="Nombre y apellido"
                              aria-invalid={errors[`${base}.name`] ? true : undefined}
                              aria-describedby={describedBy(`companion-${c.id}-name`, {
                                error: errors[`${base}.name`],
                              })}
                              className={inputClass}
                            />
                          </Field>
                          <DietaryPicker
                            id={`companion-${c.id}`}
                            legend="Restricción alimentaria"
                            options={dietaryOptions}
                            value={c.dietary}
                            other={c.dietaryOther}
                            error={errors[`${base}.dietary`]}
                            otherError={errors[`${base}.dietaryOther`]}
                            onChange={(next) => updateCompanion(c.id, next)}
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </>
            ) : null}

            <Field id="message" label="Mensaje para los novios" optional error={errors.message}>
              <textarea
                id="message"
                name="message"
                rows={3}
                maxLength={400}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Dejales unas palabras…"
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={describedBy("message", { error: errors.message })}
                className={inputClass}
              />
            </Field>

            {/* Campo trampa para bots: fuera de pantalla y fuera del orden de tabulación. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                No completar este campo
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </label>
            </div>

            <p className="text-muted text-sm">
              Usamos tu nombre y tu WhatsApp únicamente para organizar el evento.
            </p>

            {formError ? (
              <p role="alert" className="bg-danger-soft text-danger rounded-xl px-4 py-3 text-sm font-medium">
                {formError}
              </p>
            ) : null}

            <Button type="submit" disabled={isPending} className="w-full sm:w-auto sm:self-center sm:px-12">
              {isPending ? "Enviando…" : "Enviar confirmación"}
            </Button>
          </form>
        )}
      </Container>
    </section>
  );
}
