# Arquitectura

Invitación web de casamiento con confirmación de asistencia y panel de administración. No es un page builder, ni un CMS, ni una plataforma multi-evento.

> La estructura y los componentes son código. Los datos del evento son configuración.

## Responsabilidades por carpeta

### `src/app`

Rutas, layouts, metadata y composición a nivel de ruta. Importa config/content/theme y pasa los datos a las secciones por props. No contiene lógica reutilizable.

### `src/components/ui`

Primitivas sin conocimiento del negocio (botón, input, diálogo, chip). No importan `features`, `content` ni `config`.

### `src/components/sections`

Secciones de la invitación (portada, cuenta regresiva, lugares, cronograma, regalos, footer). Reciben contenido y configuración por props; no importan el contenido global.

### `src/features`

Lógica de dominio y flujos interactivos.

- `rsvp`: formulario de confirmación, schema Zod, server action.
- `admin`: autenticación, lista, filtros, búsqueda, eliminación, exportación CSV.

### `src/config`

Configuración del evento: fecha, plazo de confirmación, tope de acompañantes, lugares, opciones de dieta. Expresa intención; no guarda clases de Tailwind.

### `src/content`

Textos tipados del evento (bienvenida, cronograma, regalos, pie). TypeScript plano con `satisfies`.

### `src/theme`

Tokens de diseño (CSS), fuentes y valores del tema para imágenes OG. Los componentes usan tokens semánticos (`primary`, `surface`, `foreground`).

### `src/lib`

Utilidades chicas con dueño claro (merge de clases, formato de fechas, cliente de Supabase solo-servidor).

### `public/brand`

Activos propios del evento (ilustraciones, fotos).

## Dirección de dependencias

- `ui` no depende de `features`, `content` ni `config`.
- `sections` reciben contenido por props.
- `features` contienen la lógica interactiva y de dominio.
- `app` solo compone rutas, layout y metadata.

## Datos de ejemplo (mock)

`src/config/event.config.ts` y `src/content/invitation.content.ts` contienen datos **ficticios** (novios, fecha, lugares, CBU). Para un evento real se reemplazan solo esos archivos.
