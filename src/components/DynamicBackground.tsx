// src/components/DynamicBackground.tsx
import React, { useMemo, useCallback } from 'react'
import { Particles } from '@tsparticles/react'
import { type Engine } from 'tsparticles-engine'
import { loadSlim } from '@tsparticles/slim'
import { type ISourceOptions } from 'tsparticles-engine'

export const DynamicBackground: React.FunctionComponent = () => {
  const options: ISourceOptions = useMemo(
    () => ({
      // Mantenemos el fondo blanco que definimos en el paso anterior
      background: {
        color: {
          value: '#ffffff' // var(--White)
        }
      },
      particles: {
        // Mantenemos los colores que se ven sobre blanco
        color: {
          value: '#4fbac8' // var(--color-cadetblue)
        },
        links: {
          color: '#717680', // var(--Gray-500)
          distance: 150,
          enable: true,
          opacity: 0.4,
          width: 1
        },
        // ... (resto de opciones de particles sin cambios) ...
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'out'
          },
          random: false,
          speed: 1,
          straight: false
        },
        number: {
          density: {
            enable: true
          },
          value: 80
        },
        opacity: {
          value: 0.5
        },
        shape: {
          type: 'circle'
        },
        size: {
          value: { min: 1, max: 3 }
        }
      },
      interactivity: {
        events: {
          onHover: {
            enable: false
          },
          onClick: {
            enable: false
          }
        }
      },
      detectRetina: true
    }),
    []
  )

  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  // --- ¡AQUÍ ESTÁ EL CAMBIO! ---
  return (
    <Particles
      id='tsparticles'
      init={init}
      options={options}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%', // 100% del ancho está bien
        height: '100vh', // <-- CAMBIADO DE '100%' A '100vh'
        zIndex: 0
      }}
    />
  )
  // --- FIN DEL CAMBIO ---
}
