// src/pages/Page.tsx
import { FunctionComponent, useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
  Container,
  Paper,
  Grid,
  CircularProgress,
  Switch,
  FormControlLabel,
  Autocomplete,
  Alert,
  Collapse
} from '@mui/material'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useNavigate, useLoaderData } from 'react-router-dom' // <-- AÑADIDO useLoaderData
import { useAuth } from '../context/AuthContext'
import * as apiService from '../services/apiService'
import { CreateEventDTO, Event } from '../types' // <-- AÑADIDO Event
import {
  CYBERSECURITY_TAGS,
  EVENT_LEVELS,
  PROVINCIAL_CAPITALS,
  AUTONOMOUS_COMMUNITIES
} from '../constants/filters'

const Page: FunctionComponent = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const loadedEvent = useLoaderData() as Event | null // <-- OBTENER DATOS DEL LOADER
  const isEditMode = !!loadedEvent // <-- DETERMINAR MODO

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // --- MODIFICADO: El estado se inicializa con los datos del loader si existen ---
  const [formData, setFormData] = useState<Partial<CreateEventDTO>>({
    title: loadedEvent?.title || '',
    description: loadedEvent?.description || '',
    short_desc: loadedEvent?.short_desc || '',
    type: loadedEvent?.type || 'conference',
    category: loadedEvent?.category || '',
    level: loadedEvent?.level || 'intermediate',
    // Convertir fechas de string (del loader) a objetos Date
    start_date: loadedEvent ? new Date(loadedEvent.start_date) : new Date(),
    end_date: loadedEvent ? new Date(loadedEvent.end_date) : new Date(),
    is_online: loadedEvent?.is_online || false,
    is_free: loadedEvent?.is_free || true,
    tags: loadedEvent?.tags || [],
    venue_name: loadedEvent?.venue_name || '',
    venue_address: loadedEvent?.venue_address || '',
    venue_city: loadedEvent?.venue_city || '',
    venue_community: loadedEvent?.venue_community || '',
    online_url: loadedEvent?.online_url || '',
    price: loadedEvent?.price || 0
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleDateChange =
    (field: 'start_date' | 'end_date') => (date: Date | null) => {
      if (date) {
        setFormData((prev) => ({ ...prev, [field]: date }))
      }
    }

  const handleAutocompleteChange =
    (field: 'tags') => (event: any, value: string[]) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }

  const handleSingleAutocompleteChange =
    (field: 'venue_city' | 'venue_community') =>
    (event: any, value: string | null) => {
      setFormData((prev) => ({ ...prev, [field]: value || '' }))
    }

  // --- MODIFICADO: handleSubmit ahora maneja ambos casos (Crear y Editar) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !user.organization) {
      setError(
        'Debes ser un organizador verificado para ' +
          (isEditMode ? 'editar' : 'crear') +
          ' un evento.'
      )
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const eventData: CreateEventDTO = {
        ...formData,
        organization_id: user.organization.id,
        venue_country: 'España'
      } as CreateEventDTO

      if (isEditMode) {
        // --- MODO EDICIÓN ---
        await apiService.updateEvent(loadedEvent.id, eventData)
      } else {
        // --- MODO CREACIÓN ---
        await apiService.createEvent(eventData, user.organization)
      }

      // Navegar al panel de organizador después de la acción
      navigate('/panel-de-organizador')
    } catch (err: any) {
      setError(
        err.message ||
          `Error al ${isEditMode ? 'actualizar' : 'crear'} el evento.`
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth='md' sx={{ my: 5 }}>
        <Paper sx={{ p: 4, borderRadius: '16px' }}>
          <Typography
            variant='h4'
            component='h1'
            fontWeight='bold'
            gutterBottom
          >
            {/* --- TÍTULO DINÁMICO --- */}
            {isEditMode ? 'Editar Evento' : 'Crear Nuevo Evento'}
          </Typography>
          <Box component='form' onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* --- TODOS LOS CAMPOS DEL FORMULARIO --- */}
              {/* (Usan 'value' de formData, por lo que se rellenan automáticamente) */}

              <Grid item size={{ xs: 12 }}>
                <TextField
                  name='title'
                  label='Título del Evento'
                  fullWidth
                  required
                  value={formData.title}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item size={{ xs: 12 }}>
                <TextField
                  name='short_desc'
                  label='Descripción Corta (máx 200 caracteres)'
                  fullWidth
                  required
                  value={formData.short_desc}
                  onChange={handleChange}
                  inputProps={{ maxLength: 200 }}
                />
              </Grid>
              <Grid item size={{ xs: 12 }}>
                <TextField
                  name='description'
                  label='Descripción Completa'
                  fullWidth
                  required
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item size={{ xs: 12, sm: 6 }}>
                <TextField
                  name='type'
                  label='Tipo de Evento'
                  select
                  fullWidth
                  value={formData.type}
                  onChange={handleChange}
                >
                  <MenuItem value='conference'>Conferencia</MenuItem>
                  <MenuItem value='workshop'>Taller</MenuItem>
                  <MenuItem value='meetup'>Meetup</MenuItem>
                  <MenuItem value='webinar'>Webinar</MenuItem>
                </TextField>
              </Grid>
              <Grid item size={{ xs: 12, sm: 6 }}>
                <TextField
                  name='level'
                  label='Nivel'
                  select
                  fullWidth
                  value={formData.level}
                  onChange={handleChange}
                >
                  {EVENT_LEVELS.map((level) => (
                    <MenuItem key={level} value={level.toLowerCase()}>
                      {level}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item size={{ xs: 12 }}>
                <Autocomplete
                  multiple
                  options={CYBERSECURITY_TAGS}
                  value={formData.tags}
                  onChange={handleAutocompleteChange('tags')}
                  freeSolo
                  renderInput={(params) => (
                    <TextField {...params} label='Tags' />
                  )}
                />
              </Grid>
              <Grid item size={{ xs: 12, sm: 6 }}>
                <DateTimePicker
                  label='Fecha y Hora de Inicio'
                  value={formData.start_date}
                  onChange={handleDateChange('start_date')}
                />
              </Grid>
              <Grid item size={{ xs: 12, sm: 6 }}>
                <DateTimePicker
                  label='Fecha y Hora de Fin'
                  value={formData.end_date}
                  onChange={handleDateChange('end_date')}
                />
              </Grid>
              <Grid item size={{ xs: 12 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.is_online}
                      onChange={handleChange}
                      name='is_online'
                    />
                  }
                  label='Evento Online'
                />
              </Grid>
              <Collapse in={!formData.is_online} sx={{ width: '100%' }}>
                <Grid container spacing={3} sx={{ p: 2, pt: 0 }}>
                  <Grid item size={{ xs: 12 }}>
                    <TextField
                      name='venue_name'
                      label='Nombre del Lugar (Ej: IFEMA, Palacio Euskalduna...)'
                      fullWidth
                      value={formData.venue_name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item size={{ xs: 12 }}>
                    <TextField
                      name='venue_address'
                      label='Dirección (Ej: Av. del Partenón, 5)'
                      fullWidth
                      value={formData.venue_address}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item size={{ xs: 12, sm: 6 }}>
                    <Autocomplete
                      options={AUTONOMOUS_COMMUNITIES}
                      value={formData.venue_community || null}
                      onChange={handleSingleAutocompleteChange(
                        'venue_community'
                      )}
                      renderInput={(params) => (
                        <TextField {...params} label='Comunidad Autónoma' />
                      )}
                    />
                  </Grid>
                  <Grid item size={{ xs: 12, sm: 6 }}>
                    <Autocomplete
                      options={PROVINCIAL_CAPITALS}
                      value={formData.venue_city || null}
                      onChange={handleSingleAutocompleteChange('venue_city')}
                      freeSolo
                      renderInput={(params) => (
                        <TextField {...params} label='Ciudad' />
                      )}
                    />
                  </Grid>
                </Grid>
              </Collapse>
              <Collapse in={formData.is_online} sx={{ width: '100%', px: 2 }}>
                <TextField
                  name='online_url'
                  label='URL del Evento Online'
                  fullWidth
                  value={formData.online_url}
                  onChange={handleChange}
                />
              </Collapse>
              <Grid item size={{ xs: 12 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.is_free}
                      onChange={handleChange}
                      name='is_free'
                    />
                  }
                  label='Evento Gratuito'
                />
              </Grid>
              <Collapse in={!formData.is_free} sx={{ width: '100%', px: 2 }}>
                <TextField
                  name='price'
                  label='Precio'
                  type='number'
                  fullWidth
                  value={formData.price}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>€</InputAdornment>
                    )
                  }}
                />
              </Collapse>
              {error && (
                <Grid item size={{ xs: 12 }}>
                  <Alert severity='error'>{error}</Alert>
                </Grid>
              )}
              <Grid
                item
                size={{ xs: 12 }}
                sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}
              >
                <Button
                  type='submit'
                  variant='contained'
                  size='large'
                  disabled={isLoading}
                  sx={{
                    borderRadius: '25px',
                    background: 'var(--gradient-button-primary)',
                    '&:hover': {
                      background: 'var(--gradient-button-primary-hover)'
                    }
                  }}
                >
                  {/* --- TEXTO DE BOTÓN DINÁMICO --- */}
                  {isLoading ? (
                    <CircularProgress size={24} />
                  ) : isEditMode ? (
                    'Guardar Cambios'
                  ) : (
                    'Crear Evento'
                  )}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </LocalizationProvider>
  )
}

export default Page
