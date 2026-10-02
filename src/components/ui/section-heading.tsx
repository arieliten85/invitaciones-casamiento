import { FloralDivider } from "./botanical";
import { cn } from "@/lib/class-names";

type Props = {
  id?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({ id, title, description, className }: Props) {
  return (
    <div className={cn("mb-10 text-center sm:mb-14", className)}>
      <h2 id={id} className="text-foreground font-serif text-4xl font-medium italic sm:text-5xl">
        {title}
      </h2>
      <FloralDivider className="mt-4" />
      {description ? <p className="text-muted mx-auto mt-5 max-w-xl text-pretty">{description}</p> : null}
    </div>
  );
}
