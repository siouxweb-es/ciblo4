# CONTEXTO DEL PROYECTO: CibESphere Frontend (Post-Refactorización)

## Resumen del Proyecto

Este repositorio (`ciblo3`) contiene el frontend de la aplicación CibESphere. Es una aplicación React construida con Vite y TypeScript. Su propósito es servir como interfaz de usuario para una plataforma de eventos de ciberseguridad.

Actualmente, el frontend opera en un **modo de API 100% simulada**, con toda la lógica de backend mockeada en `src/services/apiService.ts`. El backend real (repositorio `cibesphere/backend`) existe y sirve como contrato de API, pero aún no está conectado.

## Proceso de Modernización (Noviembre 2025)

El proyecto ha sido sometido a una refactorización y actualización masiva para modernizar su stack tecnológico.

### Estado Inicial (Pre-Refactorización)

- **React:** v18
- **React Router:** v6
- **Material-UI (MUI):** v5
- **React Leaflet:** v4
- **Arquitectura de datos:** Carga de datos dentro de los componentes mediante `useEffect`.
- **Estilos:** Variables CSS de Figma inyectadas mediante `@emotion/css` en un archivo `global.tsx`.

### Cambios Arquitectónicos Implementados

1.  **Migración de React Router v6 a v7:** Se adoptó la arquitectura de **Data Routers** (`createBrowserRouter`) para mover la carga de datos a las funciones `loader` de las rutas, eliminando la lógica de `useEffect` en las páginas.
2.  **Migración de React v18 a v19:** Se actualizaron las dependencias principales a `react@19.2.0`.
3.  **Migración de Material-UI (MUI) v5 a v7:** Se actualizaron todos los paquetes de `@mui`.
4.  **Migración de React Leaflet v4 a v5:** Se actualizó `react-leaflet` a `^5.0.0` para obtener compatibilidad nativa con React 19, eliminando la necesidad de `npm install --legacy-peer-deps`.

## Estado Actual (Post-Refactorización)

- **Stack:** React 19, React Router 7, MUI v7, React Leaflet v5.
- **Arquitectura:** Enrutamiento y carga de datos centralizados en `src/App.tsx`.
- **Estado:** El proyecto es funcional en modo simulado tras una sesión de depuración intensiva.

## Contexto Crítico y Correcciones Implementadas

Cualquier IA que trabaje en este proyecto DEBE conocer las siguientes correcciones, ya que son vitales para el arranque y el estilo visual:

1.  **Restauración de Estilos Globales (global.css):**

    - **Problema:** Un refactor anterior eliminó un archivo `global.tsx` (que contenía todas las variables CSS de Figma) pensando que eran redundantes.
    - **Efecto:** Los componentes (ej. `EventCard.tsx`, `Header.tsx`) SÍ dependen de estas variables (ej. `var(--shadow-drop)`). Su eliminación rompía todo el diseño visual.
    - **Solución:** Se ha creado un archivo `src/global.css`. El contenido del `global.tsx` original se ha copiado en este archivo como CSS estándar. Este archivo es importado por `src/App.tsx` y es **ESENCIAL**. No debe ser borrado.

2.  **Estructura de Ficheros de Vite:**

    - **Problema:** `index.html` estaba ubicado en `/public`, causando un error 404 al arrancar Vite.
    - **Solución:** Se ha movido `index.html` a la **raíz del proyecto** (`ciblo3/index.html`), que es donde Vite espera encontrarlo por defecto. La carpeta `/public` solo contiene assets estáticos (imágenes).

3.  **Importación de Estilos de Leaflet:**

    - **Problema:** Los estilos de Leaflet se cargaban desde un CDN en el `index.html`.
    - **Solución:** Tras migrar a `react-leaflet` v5, la etiqueta `<link>` se eliminó del `index.html`. Los estilos ahora se importan directamente en la aplicación en `src/index.tsx` ( `import 'leaflet/dist/leaflet.css';` ).

4.  **Adaptador de Fechas de MUI:**
    - **Problema:** Las importaciones de `AdapterDateFnsV3` daban error.
    - **Solución:** Se corrigió en `LandingPage.tsx` y `Page.tsx` para usar `import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'`, que es la importación correcta para MUI v7+ y date-fns v3.
