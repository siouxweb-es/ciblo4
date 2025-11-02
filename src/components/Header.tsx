// src/components/Header.tsx
import { FunctionComponent, useCallback } from 'react' // <-- Imports simplificados
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom' // <-- No necesitamos useLocation
import { useAuth } from '../context/AuthContext'
import { Role } from '../types'

export const Header: FunctionComponent = () => {
  const navigate = useNavigate()
  const { isAuthenticated, user, logout, isLoading } = useAuth()

  // --- LÓGICA DE HEADER SIMPLIFICADA ---
  // El header ahora es fijo, curvo y siempre tiene el gradiente
  const headerBackground = 'var(--gradient-header-footer)'
  const headerShadow = 'var(--shadow-header)'
  const textColor = 'var(--Gray-700)' // Siempre texto oscuro
  const buttonColor = 'var(--gradient-button-primary)'
  // --- FIN LÓGICA ---

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
        backgroundColor: headerBackground, // <-- Fondo de gradiente
        boxShadow: headerShadow, // <-- Sombra
        position: 'fixed',
        top: 0,
        zIndex: 1100,
        display: 'flex',
        justifyContent: 'center',
        // --- NUEVA FORMA ---
        clipPath: 'ellipse(100% 60% at 50% 40%)', // Misma curva que el Hero
        pb: 4 // Padding inferior para dar espacio a la curva
        // --- FIN NUEVA FORMA ---
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1440,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 32px 0', // Padding inferior quitado (se usa pb en el Box padre)
          boxSizing: 'border-box'
        }}
      >
        {/* --- LOGO RESTAURADO --- */}
        <img
          style={{
            height: '48px',
            width: '180px',
            objectFit: 'contain',
            cursor: 'pointer'
          }}
          alt='CibESphere Logo'
          src='/cyberLogo-1@2x.png' // <-- El logo que pediste
          onClick={onLogoClick}
        />
        {/* --- FIN LOGO RESTAURADO --- */}

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
