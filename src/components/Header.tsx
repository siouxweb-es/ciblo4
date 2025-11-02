// src/components/Header.tsx
import { FunctionComponent, useCallback, useState, useEffect } from 'react'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Role } from '../types'

export const Header: FunctionComponent = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, user, logout, isLoading } = useAuth()

  const [isScrolled, setIsScrolled] = useState(false)
  const isLandingPage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    if (isLandingPage) {
      window.addEventListener('scroll', handleScroll)
      handleScroll()
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isLandingPage])

  // --- LÓGICA DE FONDO MODIFICADA ---
  // Ahora usa el gradiente en lugar de blanco
  const headerBackground =
    !isLandingPage || isScrolled
      ? 'var(--gradient-header-footer)'
      : 'transparent'
  const headerShadow =
    !isLandingPage || isScrolled ? 'var(--shadow-header)' : 'none'

  // --- LÓGICA DE COLOR CORREGIDA ---
  // El texto siempre es oscuro, ya que ambos fondos (transparente sobre hero claro, y gradiente claro) son claros.
  const textColor = 'var(--Gray-700)' // Siempre texto oscuro
  const buttonBorderColor = 'var(--gradient-button-primary)'
  const buttonColor = 'var(--gradient-button-primary)'
  // --- FIN LÓGICA DE COLOR ---

  const onLogoClick = useCallback(() => {
    navigate('/')
  }, [navigate])

  const onLoginClick = useCallback(() => {
    navigate('/loginsign-up')
  }, [navigate])

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
        backgroundColor: headerBackground,
        boxShadow: headerShadow,
        position: 'fixed',
        top: 0,
        zIndex: 1100,
        display: 'flex',
        justifyContent: 'center',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1440,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 32px',
          boxSizing: 'border-box'
        }}
      >
        {/* --- LOGO AÑADIDO (EL QUE PEDISTE) --- */}
        <img
          style={{
            height: '48px',
            width: '180px',
            objectFit: 'contain',
            cursor: 'pointer'
          }}
          alt='CibESphere Logo'
          src='/cyberLogo-1@2x.png' // <-- Usando el logo de globe + text
          onClick={onLogoClick}
        />
        {/* --- FIN LOGO AÑADIDO --- */}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isLoading ? (
            <CircularProgress size={24} />
          ) : isAuthenticated ? (
            <>
              <Typography
                sx={{
                  color: textColor, // Color oscuro
                  fontWeight: 500,
                  transition: 'color 0.3s ease'
                }}
              >
                Hola, {user?.first_name || user?.email}
              </Typography>
              <Button
                variant='contained'
                onClick={onPanelClick}
                sx={{
                  borderRadius: '25px',
                  background: 'var(--gradient-button-primary)', // Botón principal siempre azul
                  color: 'var(--White)',
                  '&:hover': {
                    background: 'var(--gradient-button-primary-hover)'
                  }
                }}
              >
                Mi Panel
              </Button>
              <Button
                variant='outlined'
                onClick={logout}
                sx={{
                  borderRadius: '25px',
                  borderColor: buttonBorderColor, // Color de borde oscuro
                  color: buttonColor, // Color de texto oscuro
                  '&:hover': {
                    borderColor: buttonColor,
                    backgroundColor: 'rgba(79, 186, 200, 0.1)'
                  }
                }}
              >
                Cerrar Sesión
              </Button>
            </>
          ) : (
            // Botón de "Login / Sign Up" (Contained)
            <Button
              variant='contained'
              onClick={onLoginClick}
              sx={{
                borderRadius: '25px',
                background: 'var(--gradient-button-primary)',
                color: 'var(--White)',
                '&:hover': {
                  background: 'var(--gradient-button-primary-hover)'
                }
              }}
            >
              Login / Sign Up
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  )
}
