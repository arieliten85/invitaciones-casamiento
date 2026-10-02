---
name: frontend-quality
description: Revisar calidad de frontend antes de terminar un cambio (responsive, tokens, performance, accesibilidad, límites cliente/servidor).
---

# Frontend quality

- Verificar comportamiento mobile-first y también escritorio, en 360, 390, 768 y 1440 px.
- Revisar consistencia visual: ritmo de espaciado, tipografía y tokens semánticos.
- Evitar colores de marca o textos del evento dentro de componentes reutilizables.
- Confirmar lo básico de performance: poco JS de cliente, SEO en el servidor, imágenes optimizadas.
- Revisar accesibilidad: landmarks, orden de encabezados, foco, labels y alt.
- Mantener intencionales y chicos los límites Server/Client.
- Reutilizar componentes UI y de sección existentes antes de crear primitivas nuevas.
- Cerrar con `bun run check` y `bun run build`.
