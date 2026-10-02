import { describe, expect, test } from "bun:test";
import { eventConfig } from "@/config/event.config";
import { mockGuests } from "../data/mock-guests";
import { emptyFilters, filterGuests, hasActiveFilters } from "./filter-guests";
import { guestsToCsv } from "./guests-csv";
import { summarizeGuests } from "./summarize";
import { normalizeText } from "./text";

describe("normalizeText", () => {
  test("quita tildes y pasa a minúsculas", () => {
    expect(normalizeText("  María José ÁLVAREZ ")).toBe("maria jose alvarez");
  });
});

describe("filterGuests", () => {
  test("sin filtros devuelve todo", () => {
    expect(filterGuests(mockGuests, emptyFilters)).toHaveLength(mockGuests.length);
    expect(hasActiveFilters(emptyFilters)).toBe(false);
  });

  test("busca por nombre sin importar tildes ni mayúsculas", () => {
    const r = filterGuests(mockGuests, { ...emptyFilters, query: "BENITEZ" });
    expect(r.map((g) => g.id)).toEqual(["g02"]);
  });

  test("busca por apellido y también por nombre de acompañante", () => {
    expect(filterGuests(mockGuests, { ...emptyFilters, query: "ortiz" }).map((g) => g.id)).toEqual(["g03"]);
    expect(filterGuests(mockGuests, { ...emptyFilters, query: "lucrecia" }).map((g) => g.id)).toEqual([
      "g02",
    ]);
  });

  test("filtra por asistencia", () => {
    const no = filterGuests(mockGuests, { ...emptyFilters, attending: "no" });
    expect(no.map((g) => g.id)).toEqual(["g04", "g09"]);
    const si = filterGuests(mockGuests, { ...emptyFilters, attending: "si" });
    expect(si.every((g) => g.attending)).toBe(true);
  });

  test("filtra por dieta (alguna persona de la respuesta)", () => {
    const vegano = filterGuests(mockGuests, { ...emptyFilters, dietary: ["vegano"] });
    expect(vegano.map((g) => g.id)).toEqual(["g02", "g08"]);
    const celiaco = filterGuests(mockGuests, { ...emptyFilters, dietary: ["celiaco"] });
    expect(celiaco.map((g) => g.id)).toEqual(["g03", "g05", "g10"]);
  });

  test("dietas combinadas se suman (o) y se pueden combinar con búsqueda", () => {
    const r = filterGuests(mockGuests, { ...emptyFilters, dietary: ["vegano", "celiaco"] });
    expect(r.map((g) => g.id)).toEqual(["g02", "g03", "g05", "g08", "g10"]);
    const q = filterGuests(mockGuests, { query: "sofia", attending: "si", dietary: ["celiaco"] });
    expect(q.map((g) => g.id)).toEqual(["g05"]);
  });

  test("los que no asisten no aparecen al filtrar por dieta", () => {
    const r = filterGuests(mockGuests, { ...emptyFilters, dietary: ["ninguna"] });
    expect(r.some((g) => !g.attending)).toBe(false);
  });
});

describe("summarizeGuests", () => {
  const s = summarizeGuests(mockGuests);

  test("cuenta respuestas y personas", () => {
    expect(s.responses).toBe(12);
    expect(s.notAttendingResponses).toBe(2);
    expect(s.attendingResponses).toBe(10);
    // 2 + 3 + 1 + 2 + 1 + 4 + 1 + 2 + 1 + 2 = 19
    expect(s.attendingPeople).toBe(19);
  });

  test("cuenta personas por régimen (una persona con dos restricciones cuenta en ambas)", () => {
    expect(s.byDietary.vegano).toBe(3);
    expect(s.byDietary.celiaco).toBe(3); // Valentina, Sofía (también vegetariana) y María José
    expect(s.byDietary.vegetariano).toBe(3);
    expect(s.byDietary.otra).toBe(2);
    expect(s.byDietary.ninguna).toBe(9);
  });
});

describe("guestsToCsv", () => {
  const csv = guestsToCsv(mockGuests, eventConfig.rsvp.dietaryOptions, eventConfig.timeZone);

  test("empieza con BOM y usa «;» como separador", () => {
    expect(csv.startsWith("﻿")).toBe(true);
    expect(csv.split("\r\n")[0]).toContain('"Invitado";"WhatsApp"');
  });

  test("una fila por persona que asiste y una por quien no asiste", () => {
    const lines = csv.split("\r\n");
    // encabezado + 19 personas + 2 que no asisten
    expect(lines).toHaveLength(1 + 19 + 2);
  });

  test("escapa comillas y neutraliza fórmulas", () => {
    const csv2 = guestsToCsv(
      [
        {
          id: "x",
          firstName: "=SUMA(1;1)",
          lastName: 'Dice "hola"',
          whatsapp: "1",
          attending: false,
          people: [],
          message: "",
          createdAt: "2026-10-01T10:00:00-03:00",
        },
      ],
      eventConfig.rsvp.dietaryOptions,
      eventConfig.timeZone,
    );
    expect(csv2).toContain(`"'=SUMA(1;1) Dice ""hola"""`);
  });
});
