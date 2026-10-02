"use client";

import type { DietaryOption } from "@/config/config.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatShortDateTime } from "@/lib/format-date";
import { formatWhatsapp, whatsappLink } from "../lib/whatsapp";
import type { Guest } from "../model/guest.types";
import { PersonDiet } from "./person-diet";

type Props = {
  guests: Guest[];
  options: DietaryOption[];
  timeZone: string;
  onDelete: (guest: Guest) => void;
};

function Attendance({ attending }: { attending: boolean }) {
  return attending ? <Badge tone="success">Asiste</Badge> : <Badge tone="danger">No asiste</Badge>;
}

function WhatsappLink({ digits }: { digits: string }) {
  return (
    <a
      href={whatsappLink(digits)}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary decoration-primary/40 hover:decoration-primary font-medium tabular-nums underline underline-offset-4"
    >
      {formatWhatsapp(digits)}
    </a>
  );
}

function DeleteButton({ guest, onDelete }: { guest: Guest; onDelete: (g: Guest) => void }) {
  return (
    <Button
      variant="quiet"
      size="sm"
      className="text-danger hover:bg-danger-soft"
      onClick={() => onDelete(guest)}
      aria-label={`Eliminar la confirmación de ${guest.firstName} ${guest.lastName}`}
    >
      Eliminar
    </Button>
  );
}

export function GuestList({ guests, options, timeZone, onDelete }: Props) {
  const when = (iso: string) => formatShortDateTime(iso, { timeZone });

  return (
    <>
      {/* Escritorio: tabla */}
      <div className="border-border bg-surface hidden overflow-hidden rounded-2xl border shadow-(--shadow-card) md:block">
        <table className="w-full text-left">
          <caption className="sr-only">Lista de confirmaciones</caption>
          <thead className="bg-surface-muted text-muted text-sm">
            <tr>
              <th scope="col" className="px-5 py-3 font-medium">
                Invitado
              </th>
              <th scope="col" className="px-3 py-3 font-medium">
                Personas y régimen alimentario
              </th>
              <th scope="col" className="px-3 py-3 font-medium">
                Mensaje
              </th>
              <th scope="col" className="px-3 py-3 font-medium">
                Respondió
              </th>
              <th scope="col" className="px-5 py-3">
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {guests.map((g) => (
              <tr key={g.id} className="align-top">
                <th scope="row" className="px-5 py-4 font-normal">
                  <p className="font-medium">
                    {g.firstName} {g.lastName}
                  </p>
                  <p className="mt-0.5">
                    <WhatsappLink digits={g.whatsapp} />
                  </p>
                  <p className="mt-1.5">
                    <Attendance attending={g.attending} />
                  </p>
                </th>
                <td className="px-3 py-4">
                  {g.people.length === 0 ? (
                    <span className="text-muted">—</span>
                  ) : (
                    <ul className="flex flex-col gap-2">
                      {g.people.map((p, i) => (
                        <li key={`${p.name}-${i}`}>
                          <PersonDiet person={p} options={options} />
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
                <td className="max-w-xs px-3 py-4 text-pretty">
                  {g.message ? g.message : <span className="text-muted">—</span>}
                </td>
                <td className="text-muted px-3 py-4 text-sm whitespace-nowrap">{when(g.createdAt)}</td>
                <td className="px-5 py-3 text-right">
                  <DeleteButton guest={g} onDelete={onDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Celular: tarjetas */}
      <ul className="flex flex-col gap-3 md:hidden">
        {guests.map((g) => (
          <li key={g.id} className="border-border bg-surface rounded-2xl border p-4 shadow-(--shadow-card)">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-medium">
                  {g.firstName} {g.lastName}
                </p>
                <p>
                  <WhatsappLink digits={g.whatsapp} />
                </p>
              </div>
              <Attendance attending={g.attending} />
            </div>

            {g.people.length > 0 ? (
              <ul className="border-border mt-3 flex flex-col gap-2 border-t pt-3">
                {g.people.map((p, i) => (
                  <li key={`${p.name}-${i}`}>
                    <PersonDiet person={p} options={options} />
                  </li>
                ))}
              </ul>
            ) : null}

            {g.message ? <p className="text-muted mt-3 text-pretty">“{g.message}”</p> : null}

            <div className="border-border mt-3 flex items-center justify-between border-t pt-3">
              <span className="text-muted text-sm">{when(g.createdAt)}</span>
              <DeleteButton guest={g} onDelete={onDelete} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
