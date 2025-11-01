// src/pages/LandingPage.tsx
import { FunctionComponent, useState } from 'react'
import {
  Box,
  Typography,
  Container,
  Grid,
  CircularProgress
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useLoaderData, useNavigation } from 'react-router-dom'
import { EventMap } from '../components/EventMap'
import { EventCard } from '../components/EventCard'
import { Event, EventFilterParams } from '../types'
// import * as apiService from '../services/apiService' // <-- Ya no es necesario
import { EventFilters } from '../components/EventFilters'

// --- INTERFAZ DEL LOADER MODIFICADA ---
interface LandingLoaderData {
  events: Event[]
  filters: EventFilterParams
}

const LandingPage: FunctionComponent = () => {
  // --- LÓGICA SIMPLIFICADA ---
  const { events, filters } = useLoaderData() as LandingLoaderData
  const navigation = useNavigation()

  // El estado de carga principal lo gestiona React Router
  const isLoading = navigation.state === 'loading'
  // --- FIN LÓGICA SIMPLIFICADA ---

  // Ya no necesitamos handleFilterChange ni isLoadingFilters

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant='h2'
          component='h1'
          gutterBottom
          align='center'
          fontWeight='bold'
        >
          Próximos Eventos de Ciberseguridad
        </Typography>

        {/* Filtros: ahora recibe los filtros iniciales desde el loader */}
        <EventFilters initialFilters={filters} />

        {/* Mapa Interactivo */}
        <Box sx={{ my: 5, display: 'flex', justifyContent: 'center' }}>
          <EventMap events={events} />
        </Box>

        {/* La carga es gestionada por React Router */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4} justifyContent='center'>
            {events.length > 0 ? (
              events.map((event) => <EventCard key={event.id} event={event} />)
            ) : (
              <Grid item size={{ xs: 12 }}>
                {' '}
                {/* 'item' añadido */}
                <Typography align='center' sx={{ mt: 5 }}>
                  No se encontraron eventos que coincidan con los filtros
                  seleccionados.
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Container>
    </LocalizationProvider>
  )
}

export default LandingPage
