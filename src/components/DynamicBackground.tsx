// src/components/DynamicBackground.tsx
import React, { useMemo, useCallback } from 'react'
import { Particles } from '@tsparticles/react'
import { type Engine } from 'tsparticles-engine'
import { loadSlim } from '@tsparticles/slim'
import { type ISourceOptions } from 'tsparticles-engine'

export const DynamicBackground: React.FunctionComponent = () => {
  const options: ISourceOptions = useMemo(
    () => ({
      // Esta es la configuración correcta
      fullScreen: {
        enable: true,
        zIndex: 0 // Se renderizará en la base
      },
      // Le decimos que dibuje su propio fondo blanco
      background: {
        color: {
          value: '#ffffff' // var(--White)
        }
      },
      // Y las partículas con colores visibles
      particles: {
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

  // El componente se renderiza SIN 'style'
  return <Particles id='tsparticles' init={init} options={options} />
}
