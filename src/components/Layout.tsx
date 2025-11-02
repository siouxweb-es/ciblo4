// src/components/Layout.tsx
import React, { ReactNode, useState, useEffect } from 'react' // Añadidos
import { Box } from '@mui/material'
import { Header } from './Header'
import { Footer } from './Footer'
import { Outlet, useNavigation, useLocation } from 'react-router-dom'

interface LayoutProps {
  children?: ReactNode
}

// Alturas del Header
const HEADER_HEIGHT_CURVED = '112px' // 80px + 32px pb
const HEADER_HEIGHT_FLAT = '80px' // 80px + 0 pb

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigation = useNavigation()
  const location = useLocation()

  // --- LÓGICA DE ALTURA DINÁMICA ---
  const [headerHeight, setHeaderHeight] = useState(HEADER_HEIGHT_FLAT)
  const isLandingPage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      // Si es la landing y hacemos scroll, la altura cambia
      if (isLandingPage) {
        setHeaderHeight(
          window.scrollY > 50 ? HEADER_HEIGHT_CURVED : HEADER_HEIGHT_FLAT
        )
      } else {
        // En otras páginas, siempre es curvo
        setHeaderHeight(HEADER_HEIGHT_CURVED)
      }
    }

    // Ejecutar la lógica al cargar y al cambiar de ruta
    handleScroll()

    // Escuchar el scroll SOLO en la landing
    if (isLandingPage) {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isLandingPage, location.pathname])
  // --- FIN LÓGICA DE ALTURA ---

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        backgroundColor: 'var(--White)',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        lineHeight: 'normal',
        letterSpacing: 'normal'
      }}
    >
      <Header />
      <Box
        component='main'
        sx={{
          width: '100%',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: navigation.state === 'loading' ? 0.7 : 1,
          transition: 'opacity 0.2s ease-in-out',
          // --- MODIFICADO: mt dinámico ---
          // Si es la landing, el Hero maneja su propio padding (mt: 0)
          // Si es otra página, empujamos el contenido con la altura CURVA
          mt: isLandingPage ? 0 : headerHeight
        }}
      >
        {children || <Outlet />}
      </Box>
      <Footer />
    </Box>
  )
}
