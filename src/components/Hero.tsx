// src/components/Hero.tsx
import { FunctionComponent } from 'react'
import { Box, Typography, Container, Grid, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
// Esta es la imagen del logo grande que tienes en /public
import logoVertical from '/cyberLogo-gigapixel-art-scale-2-00x-godpix-1@2x.png'

export const Hero: FunctionComponent = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        width: '100%',
        pt: { xs: 8, md: 16 }, // Padding superior para dejar espacio al Header transparente
        pb: { xs: 8, md: 16 }, // Padding inferior
        // Este es el degradado de fondo de tu diseño de Figma
        background: 'var(--gradient-header-footer)',
        // Efecto de onda sutil en la parte inferior
        clipPath: 'ellipse(100% 60% at 50% 40%)'
      }}
    >
      <Container maxWidth='lg'>
        <Grid container spacing={4} alignItems='center' justifyContent='center'>
          {/* Columna Izquierda: Logo */}
          <Grid
            item
            size={{ xs: 12, md: 5 }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            <Box
              component='img'
              src={logoVertical}
              alt='CibESphere Logo'
              sx={{
                width: '100%',
                maxWidth: { xs: 250, md: 350 },
                height: 'auto'
              }}
            />
          </Grid>

          {/* Columna Derecha: Texto */}
          <Grid
            item
            size={{ xs: 12, md: 7 }}
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >
            <Typography
              variant='h2'
              component='h1'
              fontWeight='bold'
              sx={{ color: 'var(--Gray-700)', mb: 2 }}
            >
              La web de referencia para eventos y congresos de Ciberseguridad
              más grande de España.
            </Typography>
            <Typography
              variant='h6'
              component='p'
              sx={{ color: 'var(--Gray-500)', mb: 4 }}
            >
              Descubre eventos, conferencias, talleres y meetups de
              ciberseguridad en toda España. Conecta con profesionales, haz
              nuevos contactos e incluso amigos y mantente actualizado.
            </Typography>
            <Button
              variant='contained'
              size='large'
              onClick={() =>
                document
                  .getElementById('filtros')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              sx={{
                borderRadius: '25px',
                background: 'var(--gradient-button-primary)',
                color: 'var(--White)',
                '&:hover': {
                  background: 'var(--gradient-button-primary-hover)'
                },
                px: 4,
                py: 1.5
              }}
            >
              Explorar Eventos
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
