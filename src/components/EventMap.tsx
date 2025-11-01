// src/components/EventMap.tsx
import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Box, Typography } from '@mui/material'
import { Event } from '../types'

interface EventMapProps {
  events: Event[]
}

export const EventMap: React.FC<EventMapProps> = ({ events }) => {
  // Centramos el mapa en España
  const mapCenter: [number, number] = [40.416775, -3.70379]

  return (
    <Box
      sx={{
        height: '936px',
        width: '100%',
        maxWidth: '1340px',
        borderRadius: '25px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: 'var(--shadow-drop)'
      }}
    >
      <MapContainer
        center={mapCenter}
        zoom={7}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {/* Iteramos sobre los eventos y creamos un marcador para cada uno */}
        {events.map((event) => {
          // Solo mostramos eventos con coordenadas (no online)
          if (event.latitude && event.longitude) {
            return (
              <Marker
                key={event.id}
                position={[event.latitude, event.longitude]}
              >
                <Popup>
                  <Box sx={{ padding: '8px' }}>
                    <Typography
                      variant='h6'
                      component='div'
                      sx={{ fontWeight: 700 }}
                    >
                      {event.title}
                    </Typography>
                    <Typography variant='body2' sx={{ mt: 1 }}>
                      {event.venue_city}
                    </Typography>
                    <Typography variant='body2' sx={{ mt: 1 }}>
                      {new Date(event.start_date).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'long'
                      })}
                    </Typography>
                  </Box>
                </Popup>
              </Marker>
            )
          }
          return null // No renderizar marcador para eventos online
        })}
      </MapContainer>
    </Box>
  )
}
