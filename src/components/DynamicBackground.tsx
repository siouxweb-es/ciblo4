// src/components/DynamicBackground.tsx
import React, { useMemo, useCallback } from 'react'
// --- CAMBIO IMPORTANTE ---
import { Particles } from '@tsparticles/react'
// --- FIN CAMBIO ---
import { type Engine } from 'tsparticles-engine'
// --- CAMBIO IMPORTANTE ---
import { loadSlim } from '@tsparticles/slim'
// --- FIN CAMBIO ---
import { type ISourceOptions } from 'tsparticles-engine'

export const DynamicBackground: React.FunctionComponent = () => {
  // Memoizamos la configuración para no recalcularla en cada render
  const options: ISourceOptions = useMemo(
    () => ({
      // Lo configuramos para que ocupe toda la pantalla
      fullScreen: {
        enable: true,
        zIndex: -1 // <-- ¡Clave! Lo pone por detrás del contenido
      },
      // El fondo del canvas en sí es transparente
      background: {
        color: {
          value: 'transparent'
        }
      },
      // Partículas (los "puntos")
      particles: {
        // Usamos el color cian de tu proyecto (var(--color-cadetblue))
        color: {
          value: '#4fbac8'
        },
        // Las líneas que conectan los puntos
        links: {
          color: '#d5d7da', // (var(--Gray-300))
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
          speed: 1, // Velocidad de movimiento
          straight: false
        },
        number: {
          density: {
            enable: true
          },
          value: 80 // Cantidad de partículas
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
      // Desactivamos la interactividad para que sea sutil y eficiente
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

  // Usamos useCallback para la función de inicialización
  const init = useCallback(async (engine: Engine) => {
    // Cargamos el preset "slim"
    await loadSlim(engine)
  }, [])

  return <Particles id='tsparticles' init={init} options={options} />
}
