// src/components/Layout.tsx
import React, { ReactNode } from 'react'
import { Box } from '@mui/material'
import { Header } from './Header'
import { Footer } from './Footer'
import { Outlet, useNavigation } from 'react-router-dom'

interface LayoutProps {
  children?: ReactNode // Hacemos children opcional ya que usaremos Outlet
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigation = useNavigation()

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
          // Añadimos un efecto de opacidad durante la navegación de carga de datos
          opacity: navigation.state === 'loading' ? 0.7 : 1,
          transition: 'opacity 0.2s ease-in-out'
        }}
      >
        {/* --- CORREGIDO: De '| |' a '||' --- */}
        {children || <Outlet />}
      </Box>
      <Footer />
    </Box>
  )
}
