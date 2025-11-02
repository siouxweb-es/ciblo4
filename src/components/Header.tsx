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
      // Si el scroll es > 50px, se activa el header
      setIsScrolled(window.scrollY > 50)
    }

    if (isLandingPage) {
      // Si es Landing, escucha el scroll
      window.addEventListener('scroll', handleScroll)
      handleScroll() // Comprobar estado inicial al cargar
    } else {
      // --- ARREGLO IMPORTANTE ---
      // Si NO es Landing, forzamos el estado "scroll"
      // para que SIEMPRE tenga el fondo y la curva.
      setIsScrolled(true)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
    // Se re-ejecuta cada vez que cambiamos de página
  }, [isLandingPage, location.pathname])

  // --- LÓGICA HÍBRIDA ---
  // 1. ¿Es transparente? Solo si es Landing Y no se ha hecho scroll.
  const isTransparent = isLandingPage && !isScrolled

  // 2. Definir estilos basados en si es transparente o no
  const headerBackground = isTransparent
    ? 'transparent'
    : 'var(--gradient-header-footer)'
  const headerShadow = isTransparent ? 'none' : 'var(--shadow-header)'
  const textColor = 'var(--Gray-700)' // Siempre oscuro (fondo claro)
  const buttonColor = 'var(--gradient-button-primary)'

  // 3. La forma curva SÓLO se aplica si NO es transparente
  const clipPathStyle = isTransparent ? 'none' : 'ellipse(100% 60% at 50% 40%)'
  // 4. Padding dinámico: 16px si es plano, más si es curvo
  const paddingBottom = isTransparent ? '16px' : { xs: '24px', md: '40px' }

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
        transition:
          'background-color 0.3s ease, box-shadow 0.3s ease, padding-bottom 0.3s ease, clip-path 0.3s ease',
        // --- ESTILOS DINÁMICOS ---
        clipPath: clipPathStyle,
        pt: '16px', // Padding superior fijo
        pb: paddingBottom // Padding inferior dinámico
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1440,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px', // Padding horizontal
          boxSizing: 'border-box'
        }}
      >
        <img
          style={{
            height: '48px',
            width: '180px',
            objectFit: 'contain',
            cursor: 'pointer'
          }}
          alt='CibESphere Logo'
          src='/cyberLogo-1@2x.png' // Logo con texto
          onClick={onLogoClick}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isLoading ? (
            <CircularProgress size={24} />
          ) : isAuthenticated ? (
            <>
              <Typography sx={{ color: textColor, fontWeight: 500 }}>
                Hola, {user?.first_name || user?.email}
              </Typography>
              <Button
                variant='contained'
                onClick={onPanelClick}
                sx={{
                  borderRadius: '25px',
                  background: 'var(--gradient-button-primary)',
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
                  borderColor: buttonColor,
                  color: buttonColor,
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
