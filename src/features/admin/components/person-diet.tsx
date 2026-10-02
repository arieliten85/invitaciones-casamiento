import type { DietaryOption, DietaryValue } from "@/config/config.types";
import { Badge } from "@/components/ui/badge";
import type { GuestPerson } from "../model/guest.types";

const TONE: Record<DietaryValue, "neutral" | "sage" | "brand"> = {
  ninguna: "neutral",
  vegetariano: "sage",
  vegano: "sage",
  celiaco: "brand",
  otra: "brand",
};

export function dietLabel(value: DietaryValue, options: DietaryOption[]): string {
  if (value === "ninguna") return "Sin restricción";
  return options.find((o) => o.value === value)?.label ?? value;
}

/** Nombre de una persona con sus etiquetas de régimen alimentario. */
export function PersonDiet({ person, options }: { person: GuestPerson; options: DietaryOption[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <span className="font-semibold">{person.name}</span>
      {person.dietary.map((d) => (
        <Badge key={d} tone={TONE[d]}>
          {d === "otra" && person.dietaryOther ? `Otra: ${person.dietaryOther}` : dietLabel(d, options)}
        </Badge>
      ))}
    </div>
  );
}
