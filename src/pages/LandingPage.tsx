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
import * as apiService from '../services/apiService'
import { EventFilters } from '../components/EventFilters'

const LandingPage: FunctionComponent = () => {
  // --- CORREGIDO: Tipado a Event[] ---
  const initialEvents = useLoaderData() as Event[]
  const navigation = useNavigation()

  const [filteredEvents, setFilteredEvents] = useState<Event[]>(initialEvents)
  // --- FIN CORREGIDO ---

  const [isLoadingFilters, setIsLoadingFilters] = useState(false)
  const [currentFilters, setCurrentFilters] = useState<EventFilterParams>({
    startDate: null,
    endDate: null,
    tags: [],
    locations: [],
    levels: []
  })

  const handleFilterChange = async (filters: EventFilterParams) => {
    setIsLoadingFilters(true)
    setCurrentFilters(filters)
    try {
      const events = await apiService.getEvents(filters)
      setFilteredEvents(events)
    } catch (error) {
      console.error('Error al filtrar eventos:', error)
      // Aquí se podría mostrar una notificación al usuario
    } finally {
      setIsLoadingFilters(false)
    }
  }

  // El estado de carga principal lo gestiona React Router
  if (navigation.state === 'loading' && !isLoadingFilters) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh'
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

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

        {/* Filtros y Listado de Eventos */}
        <EventFilters
          onFilterChange={handleFilterChange}
          initialFilters={currentFilters}
        />

        {/* Mapa Interactivo */}
        <Box sx={{ my: 5, display: 'flex', justifyContent: 'center' }}>
          <EventMap events={filteredEvents} />
        </Box>

        {isLoadingFilters ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4} justifyContent='center'>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
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
