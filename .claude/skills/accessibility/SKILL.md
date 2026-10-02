---
name: accessibility
description: Revisar lo básico de accesibilidad en la interfaz (semántica, foco, formularios, contraste, movimiento).
---

# Accessibility

- Preferir HTML semántico: landmarks, encabezados ordenados, listas, botones y links.
- Cumplir WCAG AA en contraste, foco y acceso por teclado.
- Botones para acciones y links para navegación.
- Mantener el foco visible; nunca quitar un outline sin reemplazarlo.
- Formularios con labels, ayudas y mensajes de error claros, asociados con `aria-describedby`.
- Diálogos con foco administrado (foco inicial seguro, atrapar foco, cerrar con Escape, devolver el foco).
- Texto alternativo útil en imágenes con significado; `alt=""` solo en decorativas.
- Respetar `prefers-reduced-motion` en toda animación.
