// src/components/Layout.tsx
import React, { ReactNode, useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { Header } from './Header'
import { Footer } from './Footer'
import { Outlet, useNavigation, useLocation } from 'react-router-dom'

interface LayoutProps {
  children?: ReactNode
}

// Alturas del Header
const HEADER_HEIGHT_CURVED = '112px' // Aprox 80px + 32px pb
const HEADER_HEIGHT_FLAT = '80px' // 80px (16px pt + 48px logo + 16px pb)

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigation = useNavigation()
  const location = useLocation()

  const [headerHeight, setHeaderHeight] = useState(HEADER_HEIGHT_FLAT)
  const isLandingPage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      if (isLandingPage) {
        setHeaderHeight(
          window.scrollY > 50 ? HEADER_HEIGHT_CURVED : HEADER_HEIGHT_FLAT
        )
      } else {
        setHeaderHeight(HEADER_HEIGHT_CURVED)
      }
    }

    // Ejecutar al cargar la ruta
    handleScroll()

    if (isLandingPage) {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isLandingPage, location.pathname]) // Depende del cambio de ruta

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
          // mt dinámico
          // Si es la landing, el Hero maneja su propio padding (mt: 0)
          // Si es otra página, empujamos el contenido con la altura CURVA
          mt: isLandingPage ? 0 : headerHeight,
          // Transición suave para el 'mt' (empujón)
          transition: 'margin-top 0.3s ease'
        }}
      >
        {children || <Outlet />}
      </Box>
      <Footer />
    </Box>
  )
}
