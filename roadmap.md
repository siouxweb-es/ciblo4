# Roadmap del Proyecto: CibESphere Frontend

Este documento resume el plan de desarrollo, las fases completadas y las tareas pendientes para el frontend de CibESphere.

## Estado Actual

El proyecto se encuentra en un estado funcional avanzado. Utiliza un stack tecnológico moderno (React 19, React Router 7, MUI 7) y opera sobre una API 100% simulada (`apiService.ts`). Se ha completado un extenso trabajo de refactorización y de implementación de características clave, dejando la aplicación estable y lista para las siguientes grandes funcionalidades.

---

## ✅ Fases Completadas

### Fase 1: Fundamentos y Estética de la Landing Page

El objetivo de esta fase fue establecer una base visual sólida, mejorar la UX de la página principal y asegurar un manejo de errores robusto.

- **Manejo de Errores:** Se ha creado y conectado un componente `ErrorPage.tsx` personalizado.
- **Diseño de Filtros:** El panel de filtros (`EventFilters.tsx`) ahora aparece **colapsado por defecto** para una vista más limpia.
- **Unificación de Paleta:** Se han centralizado los colores y gradientes clave en `global.css` (ej. `--gradient-button-primary`).
- **Layout Responsivo:** Se ha ajustado el `maxWidth` de la `LandingPage` a `'lg'` para mejorar la visualización en pantallas anchas.
- **Ajuste del Mapa:** El zoom por defecto de `EventMap.tsx` se ha ajustado para centrarse mejor en España.

### Fase 2: Gestión de Formularios y Lógica del Organizador

Esta fase se centró en mejorar la robustez de los formularios y completar el flujo de gestión de eventos para el rol de "Organizador".

- **Validación de Formularios:** Se ha integrado `react-hook-form` en el formulario `SignUp.tsx`, añadiendo validación de campos (email, contraseña, etc.) y corrigiendo un bug que impedía el login.
- **Formularios Dependientes:** Se ha implementado lógica de dependencia en `Page.tsx` (Crear/Editar Evento) y `EventFilters.tsx`. La selección de "Comunidad Autónoma" filtra la lista de "Ciudades" disponibles, basándose en una nueva estructura de datos centralizada en `src/constants/filters.ts`.
- **CRUD de Eventos (Editar):** Se ha implementado el flujo completo para **Editar Eventos**. Esto incluye una nueva ruta (`eventos/:slug/editar`), una función `updateEvent` en la API simulada y la lógica en `Page.tsx` para rellenar el formulario con los datos cargados.

### Fase 3: Interactividad y Flujo del Asistente

El objetivo fue hacer la aplicación completamente interactiva para el usuario final ("Asistente"), conectando los filtros y los botones de inscripción.

- **Filtros por URL (React Router):** Se refactorizó `EventFilters.tsx` para usar `useSubmit`. El `loader` de la `LandingPage` en `App.tsx` ahora lee los parámetros de la URL para filtrar, convirtiendo la URL en la fuente de verdad.
- **Flujo de Inscripción:** El botón "Inscribirse Ahora" en `Eventos.tsx` es 100% funcional. Llama a una función en `AuthContext` que actualiza el estado `user.FavoriteEvents`, el `localStorage` y la API simulada.
- **Flujo de Desuscripción (Bug Corregido):** Se arregló un bug crítico donde al desuscribirse de un evento (`PanelDeUsuario.tsx`), el contador de asistentes no disminuía. La función `unsubscribeFromEvent` en `apiService.ts` ahora resta `1` al contador `current_attendees`.
- **Popups de Mapa Mejorados:** Se ha diseñado un `<Popup>` personalizado en `EventMap.tsx` con un diseño "tech", fondo blanco, información clave del evento (título, fecha, asistentes, tags) y un botón de navegación a la página de detalles.

### Fase 4 (Parcial): Diseño y Unificación Visual

Se completaron las tareas de unificación de diseño para crear una estética coherente en toda la aplicación.

- **Hero Section:** Se ha implementado el componente `Hero.tsx` en la `LandingPage` usando el `Logo-Vertical.png` y un diseño curvo (`clip-path`).
- **Footer Unificado:** Se ha rediseñado `Footer.tsx` para usar el gradiente cian, el logo `Logo-Solo-Letras.png` y una forma curva (`clip-path`) que hace juego con el Hero.
- **Tarjeta de Login:** Se ha actualizado `SignUp.tsx` para usar el mismo gradiente cian del Hero/Footer, eliminando el color azul anterior y unificando la paleta.
- **Header Estable:** Tras un intento de rediseño que causó inestabilidad (bug de `transition` duplicada en `Layout.tsx`), se ha **revertido el Header a su versión estable**:
  - Fondo transparente sobre el Hero, que se vuelve blanco (`var(--White)`) al hacer scroll o en otras páginas.
  - El bug de Vite en `Layout.tsx` ha sido **corregido**.

---

## 🚀 Próximos Pasos (Pendientes)

Las siguientes tareas están planificadas para futuras fases de desarrollo, una vez que la base actual esté consolidada.

- **Fondo Dinámico (Fase 4.3):**

  - **Tarea:** Investigar e implementar una librería ligera de partículas (como `react-tsparticles` o similar).
  - **Objetivo:** Añadir un fondo sutil de "puntos tecnológicos" en el `Layout.tsx` o `Hero.tsx` para dar más vida a la web sin sacrificar el rendimiento.

- **Sistema de Notificaciones (Fase 4.4):**
  - **Tarea:** Diseñar e implementar el sistema de notificaciones para los usuarios.
  - **Objetivo:** Esta es la funcionalidad más compleja pendiente. Incluye:
    - Un apartado de "Notificaciones Recientes" en el `PanelDeUsuario.tsx`.
    - Configuración para activar/desactivar notificaciones (Push y por correo).
    - (Futuro) Lógica de Webhook o similar para disparar los eventos de notificación.
