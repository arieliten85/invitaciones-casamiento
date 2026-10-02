---
name: nextjs-best-practices
description: Aplicar los estándares de Next.js App Router de este repo (Server Components, límites de cliente, metadata, fuentes, imágenes).
---

# Next.js best practices

- Leer antes la documentación de `node_modules/next/dist/docs/` (Next 16 difiere de lo conocido).
- Usar App Router y componer las rutas en `src/app`.
- Preferir Server Components. Agregar `"use client"` solo para estado, eventos, efectos o APIs del navegador.
- Mantener los límites de cliente chicos; el contenido estático y el SEO van en el servidor.
- Usar la Metadata API y los archivos de metadata de App Router.
- Usar `next/image` para imágenes reales y `next/font` para fuentes.
- Componer rutas con config, content y secciones tipadas.
- Evitar JavaScript de cliente, providers y dependencias innecesarias.
- Mutaciones con Server Actions; validar siempre con Zod en el servidor.
- Nunca exponer claves secretas al cliente (sin prefijo `NEXT_PUBLIC_`).
