import { Container } from "@/components/ui/container";

export function Welcome({ text }: { text: string }) {
  return (
    <section aria-label="Bienvenida" className="py-20 sm:py-28">
      <Container size="narrow" className="text-center">
        <span aria-hidden="true" className="bg-foreground/40 mx-auto mb-10 block h-12 w-px" />
        <p className="text-foreground font-serif text-2xl leading-relaxed text-pretty sm:text-4xl">{text}</p>
      </Container>
    </section>
  );
}
