import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { isDemoMode } from "@/lib/demo-mode";
import { LoginForm } from "./login-form";

export default function AdminLoginPage() {
  if (!isDemoMode) notFound();

  return (
    <Container size="narrow">
      <div className="border-border bg-surface mx-auto max-w-md rounded-3xl border p-6 shadow-(--shadow-card) sm:p-8">
        <h1 className="font-serif text-3xl font-medium">Administración</h1>
        <p className="text-muted mt-2 mb-6">
          Demo: ingresá cualquier contraseña para ver el panel con datos de ejemplo.
        </p>
        <LoginForm />
      </div>
    </Container>
  );
}
