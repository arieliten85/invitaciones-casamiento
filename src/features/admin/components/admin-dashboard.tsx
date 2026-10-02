"use client";

import { useMemo, useState, useTransition } from "react";
import type { DietaryOption } from "@/config/config.types";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { deleteGuest } from "../server/delete-guest";
import { emptyFilters, filterGuests, hasActiveFilters } from "../lib/filter-guests";
import { guestsToCsv } from "../lib/guests-csv";
import { summarizeGuests } from "../lib/summarize";
import type { Guest, GuestFilters as Filters } from "../model/guest.types";
import { GuestFilters } from "./guest-filters";
import { GuestList } from "./guest-list";
import { SummaryCards } from "./summary-cards";

type Props = {
  initialGuests: Guest[];
  options: DietaryOption[];
  timeZone: string;
  slug: string;
  coupleNames: string;
  demo: boolean;
};

function downloadCsv(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function AdminDashboard({ initialGuests, options, timeZone, slug, coupleNames, demo }: Props) {
  const [guests, setGuests] = useState(initialGuests);
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [target, setTarget] = useState<Guest | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const summary = useMemo(() => summarizeGuests(guests), [guests]);
  const visible = useMemo(() => filterGuests(guests, filters), [guests, filters]);

  function confirmDelete() {
    if (!target) return;
    const guest = target;
    startTransition(async () => {
      const result = await deleteGuest(guest.id);
      if (result.ok) {
        setGuests((current) => current.filter((g) => g.id !== guest.id));
        setNotice(`Se eliminó la confirmación de ${guest.firstName} ${guest.lastName}.`);
        setError(null);
        setTarget(null);
      } else {
        setError(result.message);
        setTarget(null);
      }
    });
  }

  function exportCsv() {
    const date = new Date().toISOString().slice(0, 10);
    downloadCsv(guestsToCsv(visible, options, timeZone), `invitados-${slug}-${date}.csv`);
  }

  const extra = target && target.people.length > 1 ? target.people.length - 1 : 0;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-muted text-sm font-semibold tracking-widest uppercase">
            Panel de administración
          </p>
          <h1 className="mt-1 flex flex-wrap items-center gap-3 font-serif text-3xl font-medium sm:text-4xl">
            {coupleNames}
            {demo ? <Badge tone="brand">Datos de ejemplo</Badge> : null}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={exportCsv} disabled={visible.length === 0}>
            Exportar a Excel ({visible.length})
          </Button>
          <ButtonLink variant="quiet" size="sm" href="/admin/ingresar">
            Salir
          </ButtonLink>
        </div>
      </header>

      <SummaryCards summary={summary} options={options} />

      <GuestFilters
        filters={filters}
        options={options}
        onChange={setFilters}
        onClear={() => setFilters(emptyFilters)}
      />

      <div aria-live="polite" className="flex flex-col gap-2">
        <p className="text-muted text-sm">
          Mostrando {visible.length} de {guests.length} respuestas
        </p>
        {notice ? (
          <p role="status" className="bg-success-soft text-success rounded-xl px-4 py-3">
            {notice}
          </p>
        ) : null}
        {error ? (
          <p role="alert" className="bg-danger-soft text-danger rounded-xl px-4 py-3">
            {error}
          </p>
        ) : null}
      </div>

      {visible.length === 0 ? (
        <div className="border-border bg-surface rounded-2xl border border-dashed p-8 text-center">
          <p className="font-semibold">
            {guests.length === 0 ? "Todavía no hay confirmaciones." : "No hay resultados para esa búsqueda."}
          </p>
          {hasActiveFilters(filters) ? (
            <Button variant="quiet" size="sm" className="mt-3" onClick={() => setFilters(emptyFilters)}>
              Limpiar filtros
            </Button>
          ) : null}
        </div>
      ) : (
        <GuestList guests={visible} options={options} timeZone={timeZone} onDelete={setTarget} />
      )}

      <ConfirmDialog
        open={target !== null}
        title="Eliminar confirmación"
        confirmLabel="Sí, eliminar"
        pending={pending}
        onConfirm={confirmDelete}
        onCancel={() => setTarget(null)}
      >
        {target ? (
          <>
            ¿Eliminar la confirmación de{" "}
            <strong>
              {target.firstName} {target.lastName}
            </strong>
            {extra > 0 ? ` y ${extra === 1 ? "su acompañante" : `sus ${extra} acompañantes`}` : ""}? Esta
            acción no se puede deshacer.
          </>
        ) : null}
      </ConfirmDialog>
    </div>
  );
}
