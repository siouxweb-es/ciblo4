# CibESphere (Frontend)

![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![React Router](https://img.shields.io/badge/React%20Router-7.9.5-red?logo=reactrouter)
![MUI](https://img.shields.io/badge/MUI-v7.3.4-blue?logo=mui)
![Vite](https://img.shields.io/badge/Vite-5.3.1-purple?logo=vite)

## Introducción

Este repositorio contiene el frontend del proyecto **CibESphere**, una plataforma sin ánimo de lucro diseñada para unificar y centralizar todos los eventos de ciberseguridad en España, fomentando la comunidad y la visibilidad.

Esta aplicación ha sido recientemente modernizada para utilizar las últimas tecnologías del ecosistema React, garantizando un rendimiento óptimo y una base de código mantenible.

## 🚀 Funcionalidades Implementadas

Este proyecto es una aplicación frontend completamente funcional que opera en un **modo de API simulada (mock)**.

- **Autenticación Completa:** Sistema de **Login** y **Registro** con manejo de estado global (React Context).
- **Roles de Usuario:** Diferenciación entre `Asistente` y `Organizador`, con formularios y campos condicionales.
- **Rutas Protegidas:** Los paneles de usuario y organizador son privados y solo accesibles tras iniciar sesión.
- **Carga de Datos Optimizada:** Uso de la arquitectura "Data Routers" de React Router v7 para cargar datos a nivel de ruta.
- **Mapa Interactivo:** Implementación de **React Leaflet** (v5) con marcadores de eventos.
- **Sistema de Filtros Completo:** Filtrado de eventos por rango de fechas, localización, tags y nivel.
- **Página de Detalles de Evento:** Vista detallada para cada evento.
- **Paneles de Usuario y Organizador:** Paneles dedicados para la gestión de suscripciones y eventos.
- **Diseño Responsive:** La aplicación se adapta a formatos de móvil, tablet y escritorio.

## 🛠️ Stack Tecnológico (Modernizado)

| Categoría            | Tecnología                                     | Versión   |
| :------------------- | :--------------------------------------------- | :-------- |
| **Framework**        | [React](https://react.dev/)                    | `~19.2.0` |
| **Lenguaje**         | [TypeScript](https://www.typescriptlang.org/)  | `~5.2.2`  |
| **Build Tool**       | [Vite](https://vitejs.dev/)                    | `~5.3.1`  |
| **Componentes UI**   | [Material-UI (MUI)](https://mui.com/)          | `~7.3.4`  |
| **Routing**          | [React Router](https://reactrouter.com/)       | `~7.9.5`  |
| **Mapas**            | [React Leaflet](https://react-leaflet.js.org/) | `~5.0.0`  |
| **Manejo de Estado** | React Context (API nativa)                     | N/A       |

## 🏁 Cómo Empezar

### Prerrequisitos

- [Node.js](https://nodejs.org/en) (versión 20.x o superior recomendada).
- `npm` (v7 o superior).

### Instalación y Ejecución

1.  **Clonar el repositorio:**

    ```bash
    git clone <tu-repo-url>
    cd ciblo3
    ```

2.  **Instalar dependencias:**
    Este paso instalará todas las librerías necesarias. (Nota: Ya no se requiere el flag `--legacy-peer-deps`).

    ```bash
    npm install
    ```

3.  **Ejecutar el proyecto:**
    Esto iniciará el servidor de desarrollo de Vite.

    ```bash
    npm start
    ```

4.  Abre [http://localhost:5173](http://localhost:5173) (o el puerto que indique la terminal) en tu navegador para ver la aplicación.

## ⚙️ Modo de API Simulada (Mock)

Actualmente, este proyecto **no necesita un backend** para funcionar. Toda la lógica del servidor (autenticación, obtención de datos, creación de eventos) está simulada localmente.

- **API Simulada:** La lógica se encuentra en `src/services/apiService.ts`.
- **Base de Datos Falsa:** Los datos de prueba (usuarios y eventos) están en `src/mocks/db.ts`.

#### Cuentas de Demostración

- **Rol Asistente:** `attendee@cybesphere.local` / `Attendee123!`
- **Rol Organizador:** `organizer@cybesphere.local` / `Organizer123!`
- **Rol Administrador:** `admin@cybesphere.local` / `Admin123!`
