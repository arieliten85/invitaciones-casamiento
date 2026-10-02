import { FloralSprig } from "@/components/ui/botanical";

export function Footer({ text, names }: { text: string; names: string }) {
  return (
    <footer className="relative overflow-hidden px-5 pt-12 pb-16 text-center">
      <FloralSprig className="mx-auto w-20" />
      <p className="mt-3 font-serif text-2xl text-pretty italic">{text}</p>
      <p className="font-script text-primary mt-2 text-4xl">{names}</p>
    </footer>
  );
}
