// src/components/Layout.tsx
import React, { ReactNode } from 'react'
import { Box } from '@mui/material'
import { Header } from './Header'
import { Footer } from './Footer'
import { Outlet, useNavigation, useLocation } from 'react-router-dom'

interface LayoutProps {
  children?: ReactNode
}

// Altura calculada del Header: 80px (base) + 32px (pb: 4) = 112px
const HEADER_HEIGHT = '112px'

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigation = useNavigation()
  const location = useLocation()
  const isLandingPage = location.pathname === '/'

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
          // --- MODIFICADO: ---
          // Si es la Landing, el Hero maneja el padding (mt: 0)
          // Si es otra página, empujamos el contenido hacia abajo
          mt: isLandingPage ? 0 : HEADER_HEIGHT
        }}
      >
        {children || <Outlet />}
      </Box>
      <Footer />
    </Box>
  )
}
