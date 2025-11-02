// src/components/Footer.tsx
import { FunctionComponent } from 'react'
import { Box, Typography, Link as MuiLink, Container } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom' // Para enlaces internos

export const Footer: FunctionComponent = () => {
  return (
    <Box
      component='footer'
      sx={{
        width: '100%',
        background: 'var(--gradient-header-footer)', // <-- NUEVO GRADIENTE
        color: 'var(--Gray-700)', // Texto oscuro sobre fondo claro
        fontFamily: 'Inter, sans-serif',
        mt: 'auto', // Empuja el footer al fondo
        pt: 6,
        pb: 6
      }}
    >
      <Container
        maxWidth='lg'
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 3
        }}
      >
        {/* 1. Logo (el mismo del header) */}
        <img
          style={{
            height: '48px',
            width: '180px',
            objectFit: 'contain'
          }}
          alt='CibESphere Logo'
          src='/cyberLogo-1@2x.png'
        />

        {/* 2. Enlaces (como en tu imagen) */}
        <Box
          sx={{
            display: 'flex',
            gap: 4,
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          <MuiLink
            component={RouterLink}
            to='/#sobre-nosotros' // Placeholder
            color='inherit'
            underline='hover'
            sx={{ fontWeight: 500 }}
          >
            Sobre nosotros
          </MuiLink>
          <MuiLink
            component={RouterLink}
            to='/' // Enlace a Eventos (Landing)
            color='inherit'
            underline='hover'
            sx={{ fontWeight: 500 }}
          >
            Eventos
          </MuiLink>
        </Box>

        {/* 3. Copyright (como en tu imagen) */}
        <Typography
          variant='body2'
          color='var(--Gray-700)'
          sx={{ textAlign: { xs: 'center', md: 'right' } }}
        >
          © {new Date().getFullYear()} CibESphere. Todos los derechos
          reservados.
        </Typography>
      </Container>
    </Box>
  )
}
