// src/App.tsx
import {
  createBrowserRouter,
  Outlet,
  RouteObject,
  useLocation,
  useNavigationType,
  redirect,
  RouterProvider
} from 'react-router-dom'
import React, { useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Layout } from './components/Layout'
import { Role, User, EventFilterParams } from './types' // Importa EventFilterParams
import * as apiService from './services/apiService'

// Importación de todas las páginas
import LandingPage from './pages/LandingPage'
import SignUp from './pages/SignUp'
import Eventos from './pages/Eventos'
import PanelDeUsuario from './pages/PanelDeUsuario'
import PanelDeOrganizador from './pages/PanelDeOrganizador'
import Page from './pages/Page'
import ErrorPage from './pages/ErrorPage'

// ... (Importaciones de MUI se mantienen) ...
import './global.css'

// ... (Componente AppWrapper se mantiene igual) ...
// ... (Recuerda que AppWrapper gestiona los títulos de las páginas) ...

// --- DEFINICIÓN DE RUTAS CORREGIDA ---
const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppWrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
        // --- LOADER MODIFICADO ---
        // Ahora lee los parámetros de la URL para filtrar
        loader: async ({ request }) => {
          const url = new URL(request.url)
          const searchParams = url.searchParams

          const filters: EventFilterParams = {
            startDate: searchParams.get('startDate')
              ? new Date(searchParams.get('startDate')!)
              : null,
            endDate: searchParams.get('endDate')
              ? new Date(searchParams.get('endDate')!)
              : null,
            tags: searchParams.getAll('tags') || [],
            locations: searchParams.getAll('locations') || [],
            levels: searchParams.getAll('levels') || []
          }

          const events = await apiService.getEvents(filters)
          // Devolvemos tanto los eventos como los filtros aplicados
          return { events, filters }
        }
        // --- FIN LOADER MODIFICADO ---
      },
      {
        path: 'loginsign-up',
        element: <SignUp />
      },
      // ... (Ruta 'eventos/:slug' se mantiene igual) ...
      {
        path: 'eventos/:slug',
        element: <Eventos />,
        loader: async ({ params }) => {
          if (!params.slug) {
            throw new Response('Not Found', { status: 404 })
          }
          return apiService.getEventBySlug(params.slug)
        }
      },

      // ... (Ruta 'panel-de-usuario' se mantiene igual) ...
      {
        element: <ProtectedRoute allowedRoles={[Role.User, Role.Admin]} />,
        children: [
          {
            path: 'panel-de-usuario',
            element: <PanelDeUsuario />,
            loader: async () => {
              const userStr = localStorage.getItem('user')
              if (!userStr) return redirect('/loginsign-up')
              const user = JSON.parse(userStr) as User
              return user.FavoriteEvents || []
            }
          }
        ]
      },

      // ... (Rutas de 'panel-de-organizador', 'crear-evento', 'editar' se mantienen igual) ...
      {
        element: <ProtectedRoute allowedRoles={[Role.Organizer, Role.Admin]} />,
        children: [
          {
            path: 'panel-de-organizador',
            element: <PanelDeOrganizador />,
            loader: async () => {
              const userStr = localStorage.getItem('user')
              if (!userStr) return redirect('/loginsign-up')
              const user = JSON.parse(userStr) as User
              if (!user.organization) {
                return {
                  stats: {
                    total_events: 0,
                    total_attendees: 0,
                    total_cities: 0,
                    published_events: 0
                  },
                  events: []
                }
              }
              const orgId = user.organization.id
              const statsPromise = apiService.getOrganizerDashboard(orgId)
              const eventsPromise = apiService.getOrganizationEvents(orgId)
              const [stats, events] = await Promise.all([
                statsPromise,
                eventsPromise
              ])
              return { stats, events }
            }
          },
          {
            path: 'crear-evento',
            element: <Page />
          },
          {
            path: 'eventos/:slug/editar',
            element: <Page />,
            loader: async ({ params }) => {
              if (!params.slug) {
                throw new Response('Not Found', { status: 404 })
              }
              return apiService.getEventBySlug(params.slug)
            }
          }
        ]
      }
    ]
  }
]

// ... (Resto del archivo 'App.tsx' se mantiene igual) ...
export const router = createBrowserRouter(routes)
const muiTheme = createTheme()

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App
