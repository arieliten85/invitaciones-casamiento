<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Invitaciones Casamiento — reglas del repositorio

La estructura y los componentes son código.
Los datos del evento son configuración.

Configuración controla intención.
Componentes controlan implementación.

## Reglas permanentes

- Usar Bun como único gestor de paquetes.
- Usar Next.js App Router.
- Mantener TypeScript en modo estricto.
- Usar Tailwind CSS v4.
- Preferir Server Components por defecto.
- Usar Client Components solo si hay estado, eventos, efectos o APIs del navegador.
- Mantener la configuración del evento separada de los componentes.
- Mantener el contenido (textos) separado de la presentación.
- Usar tokens de diseño semánticos para el tema.
- No escribir colores de marca fijos en los componentes.
- No escribir textos del evento dentro de componentes reutilizables.
- No crear `src/types` como cajón de sastre: los tipos viven junto a su dueño.
- `features` contiene la lógica de dominio. La UI genérica no conoce el negocio.
- No agregar dependencias si Next, React o las APIs web lo resuelven bien.
- No crear abstracciones especulativas.
- No crear page builder, CMS, sistema multi-evento ni monorepo.
- SEO importante renderizado en el servidor.
- La accesibilidad es obligatoria.
- Usar `next/image` para imágenes y `next/font` para fuentes.
- Correr `bun run check` y `bun run build` antes de dar por terminado un cambio estructural.

## Backend (alcance acotado)

El backend existe solo para dos cosas: **confirmaciones (RSVP)** y **panel de administración**.

- Se implementa con Server Actions / Route Handlers de Next y Supabase.
- El navegador **nunca** habla directo con la base de datos.
- Las claves secretas viven solo en variables de entorno del servidor. Nunca en el repo.
- Toda entrada se valida en el servidor con Zod, y además con restricciones en la base.
- Las tablas tienen RLS activado y sin políticas públicas.

## Límite de personalización

Cambiar de evento debería requerir tocar solo:

- `src/config/**`
- `src/content/**`
- `src/theme/**`
- `public/brand/**`
