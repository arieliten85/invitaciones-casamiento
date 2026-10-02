import { Container } from "@/components/ui/container";

export function Welcome({ text }: { text: string }) {
  return (
    <section aria-label="Bienvenida" className="py-16 sm:py-24">
      <Container size="narrow" className="text-center">
        <p className="text-foreground font-serif text-2xl leading-relaxed text-pretty italic sm:text-3xl">
          {text}
        </p>
      </Container>
    </section>
  );
}
