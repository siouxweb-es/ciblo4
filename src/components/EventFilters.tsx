// src/components/EventFilters.tsx
import React, { useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Collapse,
  IconButton,
  TextField,
  Autocomplete // Importado desde @mui/material
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { EventFilterParams } from '../types'
import {
  LOCATION_OPTIONS,
  CYBERSECURITY_TAGS,
  EVENT_LEVELS
} from '../constants/filters'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import FilterListIcon from '@mui/icons-material/FilterList'

interface EventFiltersProps {
  onFilterChange: (filters: EventFilterParams) => void
  initialFilters: EventFilterParams
}

export const EventFilters: React.FC<EventFiltersProps> = ({
  onFilterChange,
  initialFilters
}) => {
  const [isOpen, setIsOpen] = useState(true)
  const [filters, setFilters] = useState<EventFilterParams>(initialFilters)

  const handleToggle = () => setIsOpen(!isOpen)

  const handleDateChange =
    (field: 'startDate' | 'endDate') => (date: Date | null) => {
      setFilters((prev) => ({ ...prev, [field]: date }))
    }

  const handleMultiSelectChange =
    (field: 'tags' | 'locations' | 'levels') =>
    (event: React.SyntheticEvent, value: string[]) => {
      // Corregido a string[]
      setFilters((prev) => ({ ...prev, [field]: value }))
    }

  const handleApplyFilters = () => {
    onFilterChange(filters)
  }

  const handleClearFilters = () => {
    // --- CORREGIDO: Añadido '[]' a los arrays ---
    const clearedFilters: EventFilterParams = {
      startDate: null,
      endDate: null,
      tags: [],
      locations: [],
      levels: []
    }
    // --- FIN CORREGIDO ---
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        mb: 4,
        borderRadius: '25px',
        background: 'var(--White)',
        boxShadow: 'var(--shadow-drop)'
      }}
    >
      <Box
        onClick={handleToggle}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterListIcon sx={{ color: 'var(--color-cadetblue)' }} />
          <Typography variant='h6' sx={{ color: 'var(--color-cadetblue)' }}>
            Filtros
          </Typography>
        </Box>
        <IconButton>{isOpen ? <ExpandLess /> : <ExpandMore />}</IconButton>
      </Box>

      <Collapse in={isOpen}>
        <Box sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            {/* Filtro de Fechas */}
            <Grid item size={{ xs: 12, md: 6 }}>
              {' '}
              {/* 'item' añadido */}
              <DatePicker
                label='Desde'
                value={filters.startDate}
                onChange={handleDateChange('startDate')}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <DatePicker
                label='Hasta'
                value={filters.endDate}
                onChange={handleDateChange('endDate')}
                sx={{ width: '100%' }}
              />
            </Grid>

            {/* Filtro de Localización */}
            <Grid item size={{ xs: 12 }}>
              <Autocomplete
                multiple
                options={LOCATION_OPTIONS}
                value={filters.locations}
                onChange={handleMultiSelectChange('locations')}
                renderInput={(params) => (
                  <TextField {...params} label='Localización' />
                )}
              />
            </Grid>

            {/* Filtro de Tags */}
            <Grid item size={{ xs: 12 }}>
              <Autocomplete
                multiple
                options={CYBERSECURITY_TAGS}
                value={filters.tags}
                onChange={handleMultiSelectChange('tags')}
                renderInput={(params) => (
                  <TextField {...params} label='Categorías / Tags' />
                )}
              />
            </Grid>

            {/* Filtro de Nivel */}
            <Grid item size={{ xs: 12 }}>
              <Autocomplete
                multiple
                options={EVENT_LEVELS}
                value={filters.levels}
                onChange={handleMultiSelectChange('levels')}
                renderInput={(params) => (
                  <TextField {...params} label='Nivel del Evento' />
                )}
              />
            </Grid>

            {/* Botones de Acción */}
            <Grid
              item
              size={{ xs: 12 }}
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
                mt: 2
              }}
            >
              <Button variant='outlined' onClick={handleClearFilters}>
                Limpiar Filtros
              </Button>
              <Button variant='contained' onClick={handleApplyFilters}>
                Aplicar Filtros
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Collapse>
    </Paper>
  )
}
