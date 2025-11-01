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
  Collapse // Importar Collapse
} from '@mui/material'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import * as apiService from '../services/apiService'
import { CreateEventDTO } from '../types'
import { CYBERSECURITY_TAGS, EVENT_LEVELS } from '../constants/filters'

const Page: FunctionComponent = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // --- CORREGIDO ---
  const [formData, setFormData] = useState<Partial<CreateEventDTO>>({
    // --- FIN CORREGIDO ---
    title: '',
    description: '',
    short_desc: '',
    type: 'conference',
    category: '',
    level: 'intermediate',
    start_date: new Date(),
    end_date: new Date(),
    is_online: false,
    is_free: true,
    tags: [] // <-- CORREGIDO: Inicializar como array vacío
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

  // --- CORREGIDO: 'value' ahora es string[] ---
  const handleAutocompleteChange =
    (field: 'tags') => (event: any, value: string[]) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  // --- FIN CORREGIDO ---

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !user.organization) {
      setError('Debes ser un organizador verificado para crear un evento.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const eventData: CreateEventDTO = {
        ...formData,
        organization_id: user.organization.id
      } as CreateEventDTO // Asumimos que el formulario está completo

      await apiService.createEvent(eventData, user.organization) // Pasamos la organización
      navigate('/panel-de-organizador')
    } catch (err: any) {
      setError(err.message || 'Error al crear el evento.')
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
            Crear Nuevo Evento
          </Typography>
          <Box component='form' onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item size={{ xs: 12 }}>
                {' '}
                {/* 'item' añadido */}
                <TextField
                  name='title'
                  label='Título del Evento'
                  fullWidth
                  required
                  onChange={handleChange}
                />
              </Grid>
              <Grid item size={{ xs: 12 }}>
                <TextField
                  name='short_desc'
                  label='Descripción Corta (máx 200 caracteres)'
                  fullWidth
                  required
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
                  {' '}
                  {/* Ajustado padding */}
                  <Grid item size={{ xs: 12 }}>
                    <TextField
                      name='venue_name'
                      label='Nombre del Lugar'
                      fullWidth
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item size={{ xs: 12 }}>
                    <TextField
                      name='venue_address'
                      label='Dirección'
                      fullWidth
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item size={{ xs: 12, sm: 6 }}>
                    <TextField
                      name='venue_city'
                      label='Ciudad'
                      fullWidth
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item size={{ xs: 12, sm: 6 }}>
                    <TextField
                      name='venue_country'
                      label='País'
                      fullWidth
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </Collapse>
              <Collapse in={formData.is_online} sx={{ width: '100%', px: 2 }}>
                <TextField
                  name='online_url'
                  label='URL del Evento Online'
                  fullWidth
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
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Crear Evento'}
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
