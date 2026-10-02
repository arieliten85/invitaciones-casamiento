"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Field, describedBy, inputClass } from "@/components/ui/field";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!password.trim()) {
      setError("Ingresá la contraseña.");
      return;
    }
    // Demo: cualquier contraseña entra. El acceso real se agrega con el backend.
    router.push("/admin");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <Field id="password" label="Contraseña" error={error ?? undefined}>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy("password", { error: error ?? undefined })}
          className={inputClass}
        />
      </Field>
      <Button type="submit">Ingresar</Button>
    </form>
  );
}
