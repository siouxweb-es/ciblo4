// src/App.tsx
import {
  createBrowserRouter,
  Outlet,
  RouteObject,
  useLocation,
  useNavigationType,
  redirect,
  RouterProvider // Importa RouterProvider aquí
} from 'react-router-dom'
import React, { useEffect } from 'react' // Importa React
import { AuthProvider, useAuth } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Layout } from './components/Layout'
import { Role, User } from './types' // Importa User
import * as apiService from './services/apiService'

// Importación de todas las páginas
import LandingPage from './pages/LandingPage'
import SignUp from './pages/SignUp'
import Eventos from './pages/Eventos'
import PanelDeUsuario from './pages/PanelDeUsuario'
import PanelDeOrganizador from './pages/PanelDeOrganizador'
import Page from './pages/Page' // Página de creación de eventos
import ErrorPage from './pages/ErrorPage'

// Importaciones de MUI (necesarias para index.tsx si lo fusionamos)
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  StyledEngineProvider
} from '@mui/material'

// Importación de CSS global
import './global.css'

// Componente Wrapper para efectos de scroll y título
const AppWrapper = () => {
  const location = useLocation()
  const pathname = location.pathname
  const action = useNavigationType()

  useEffect(() => {
    if (action !== 'POP') {
      window.scrollTo(0, 0)
    }
  }, [action, pathname])

  useEffect(() => {
    let title = 'CibESphere'
    let metaDescription =
      'Plataforma central de eventos de ciberseguridad en España.'

    if (pathname.startsWith('/eventos/')) {
      title = 'Detalle del Evento - CibESphere'
    } else if (pathname === '/panel-de-usuario') {
      title = 'Mi Panel - CibESphere'
    } else if (pathname === '/panel-de-organizador') {
      title = 'Panel de Organizador - CibESphere'
    } else if (pathname === '/crear-evento') {
      title = 'Crear Evento - CibESphere'
    } else if (pathname === '/loginsign-up') {
      title = 'Acceso / Registro - CibESphere'
    }

    document.title = title

    const metaDescriptionTag = document.querySelector(
      'head > meta[name="description"]'
    )
    if (metaDescriptionTag) {
      metaDescriptionTag.setAttribute('content', metaDescription)
    }
  }, [pathname])

  // El AuthProvider y Layout ahora envuelven el Outlet aquí
  return (
    <AuthProvider>
      <Layout>
        <Outlet />
      </Layout>
    </AuthProvider>
  )
}

// --- DEFINICIÓN DE RUTAS CORREGIDA ---
const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppWrapper />, // AppWrapper es el layout raíz que incluye AuthProvider y Layout
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
        loader: () =>
          apiService.getEvents({
            startDate: null,
            endDate: null,
            tags: [],
            locations: [],
            levels: []
          })
      },
      {
        path: 'loginsign-up',
        element: <SignUp />
      },
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

      // --- Rutas Protegidas para Asistentes (y Admin) ---
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
              // Devolvemos los eventos favoritos directamente desde el objeto User
              return user.FavoriteEvents || []
            }
          }
        ]
      },

      // --- Rutas Protegidas para Organizadores y Admins ---
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
                // Si un organizador no tiene org (caso raro), devuelve datos vacíos
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
          }
        ]
      }
    ]
  }
]

// Creación de la instancia del router que se exportará
export const router = createBrowserRouter(routes)

// El componente App ahora solo renderiza el RouterProvider
// (fusionando la lógica de index.tsx aquí para simplificar)
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
