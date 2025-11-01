// src/components/Footer.tsx
// Sin cambios significativos en la lógica. Se mantiene el código original,
// pero se refactoriza para usar componentes y `sx` prop de MUI para mayor consistencia.
import { FunctionComponent } from 'react'
import { Box, Typography, Link, Divider } from '@mui/material'

export const Footer: FunctionComponent = () => {
  return (
    <Box
      component='footer'
      sx={{
        width: '100%',
        backgroundColor: 'var(--color-gray-100)',
        color: 'var(--Gray-500)',
        fontFamily: 'Inter, sans-serif',
        mt: 'auto', // Empuja el footer al fondo
        pt: 8,
        pb: 6,
        px: 3,
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 1280 }}>
        <Divider sx={{ mb: 4 }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant='body2' color='text.secondary'>
            © {new Date().getFullYear()} CibESphere. Todos los derechos
            reservados.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href='#' color='inherit' underline='hover'>
              Política de Privacidad
            </Link>
            <Link href='#' color='inherit' underline='hover'>
              Términos de Servicio
            </Link>
            <Link href='#' color='inherit' underline='hover'>
              Contacto
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
