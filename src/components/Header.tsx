// src/components/Header.tsx
import { FunctionComponent, useCallback, useState, useEffect } from 'react' // <-- Añadido useState y useEffect
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom' // <-- Añadido useLocation
import { useAuth } from '../context/AuthContext'
import { Role } from '../types'

export const Header: FunctionComponent = () => {
  const navigate = useNavigate()
  const location = useLocation() // Para saber en qué página estamos
  const { isAuthenticated, user, logout, isLoading } = useAuth()

  // --- LÓGICA DE HEADER TRANSPARENTE ---
  const [isScrolled, setIsScrolled] = useState(false)

  // Solo queremos que el header sea transparente en la Landing Page ('/')
  const isLandingPage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      // Si el scroll es > 50px, ponemos el fondo blanco
      setIsScrolled(window.scrollY > 50)
    }

    if (isLandingPage) {
      // Solo escucha el scroll si estamos en la Landing
      window.addEventListener('scroll', handleScroll)
      // Comprobación inicial por si la página carga con scroll
      handleScroll()
    }

    // Limpieza del listener
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isLandingPage]) // Se re-ejecuta si cambiamos de página

  // Determinamos el fondo:
  // - Si NO es la landing, fondo blanco siempre.
  // - Si ES la landing, fondo transparente HASTA hacer scroll.
  const headerBackground =
    !isLandingPage || isScrolled ? 'var(--White)' : 'transparent'
  const headerShadow =
    !isLandingPage || isScrolled ? 'var(--shadow-header)' : 'none'
  // --- FIN LÓGICA ---

  const onLogoClick = useCallback(() => {
    navigate('/')
  }, [navigate])

  const onLoginClick = useCallback(() => {
    navigate('/loginsign-up')
  }, [navigate])

  // ... (onPanelClick se mantiene igual) ...
  const onPanelClick = useCallback(() => {
    if (user?.role === Role.Organizer || user?.role === Role.Admin) {
      navigate('/panel-de-organizador')
    } else {
      navigate('/panel-de-usuario')
    }
  }, [navigate, user])

  return (
    <Box
      component='header'
      sx={{
        width: '100%',
        // --- ESTILOS MODIFICADOS ---
        backgroundColor: headerBackground,
        boxShadow: headerShadow,
        position: 'fixed', // <-- CAMBIO: De 'sticky' a 'fixed' para la transparencia
        // --- FIN ESTILOS MODIFICADOS ---
        top: 0,
        zIndex: 1100,
        display: 'flex',
        justifyContent: 'center',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease' // Animación suave
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1440,
          // ... (resto de estilos del Box interno se mantienen) ...
          padding: '16px 32px',
          boxSizing: 'border-box'
        }}
      >
        <img
        // ... (img del logo se mantiene igual) ...
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isLoading ? (
            <CircularProgress size={24} />
          ) : isAuthenticated ? (
            <>
              {/* --- ESTILO MODIFICADO --- */}
              <Typography
                sx={{
                  // Color de texto: Blanco si es transparente, Negro si tiene fondo
                  color:
                    headerBackground === 'transparent'
                      ? 'var(--White)'
                      : 'var(--Black)',
                  fontWeight: 500,
                  transition: 'color 0.3s ease'
                }}
              >
                Hola, {user?.first_name || user?.email}
              </Typography>
              {/* --- FIN ESTILO MODIFICADO --- */}
              <Button
                variant='contained'
                onClick={onPanelClick}
                // ... (estilos del botón Mi Panel se mantienen) ...
              >
                Mi Panel
              </Button>
              <Button
                variant='outlined'
                onClick={logout}
                sx={{
                  borderRadius: '25px',
                  // --- ESTILO MODIFICADO ---
                  // Estilo del botón "Cerrar Sesión" (Outlined)
                  borderColor:
                    headerBackground === 'transparent'
                      ? 'var(--White)'
                      : 'var(--color-cadetblue)',
                  color:
                    headerBackground === 'transparent'
                      ? 'var(--White)'
                      : 'var(--color-cadetblue)',
                  '&:hover': {
                    borderColor:
                      headerBackground === 'transparent'
                        ? 'var(--White)'
                        : 'var(--color-cadetblue)',
                    backgroundColor:
                      headerBackground === 'transparent'
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(79, 186, 200, 0.1)'
                  }
                  // --- FIN ESTILO MODIFICADO ---
                }}
              >
                Cerrar Sesión
              </Button>
            </>
          ) : (
            // El botón de "Login / Sign Up" (Contained) se mantiene igual
            <Button
              variant='contained'
              onClick={onLoginClick}
              // ... (estilos del botón Login se mantienen) ...
            >
              Login / Sign Up
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  )
}
