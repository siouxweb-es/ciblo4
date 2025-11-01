// src/constants/filters.ts
// Aquí definimos todas las opciones de filtro para que sea fácil editarlas en el futuro.

export const AUTONOMOUS_COMMUNITIES = [
  'Andalucía',
  'Aragón',
  'Asturias, Principado de',
  'Balears, Illes',
  'Canarias',
  'Cantabria',
  'Castilla y León',
  'Castilla - La Mancha',
  'Cataluña',
  'Comunitat Valenciana',
  'Extremadura',
  'Galicia',
  'Madrid, Comunidad de',
  'Murcia, Región de',
  'Navarra, Comunidad Foral de',
  'País Vasco',
  'Rioja, La',
  'Ceuta',
  'Melilla'
]

export const PROVINCIAL_CAPITALS = [
  'A Coruña',
  'Álava',
  'Albacete',
  'Alicante',
  'Almería',
  'Asturias',
  'Ávila',
  'Badajoz',
  'Barcelona',
  'Burgos',
  'Cáceres',
  'Cádiz',
  'Cantabria',
  'Castellón',
  'Ciudad Real',
  'Córdoba',
  'Cuenca',
  'Girona',
  'Granada',
  'Guadalajara',
  'Gipuzkoa',
  'Huelva',
  'Huesca',
  'Illes Balears',
  'Jaén',
  'La Rioja',
  'Las Palmas',
  'León',
  'Lleida',
  'Lugo',
  'Madrid',
  'Málaga',
  'Murcia',
  'Navarra',
  'Ourense',
  'Palencia',
  'Pontevedra',
  'Salamanca',
  'Santa Cruz de Tenerife',
  'Segovia',
  'Sevilla',
  'Soria',
  'Tarragona',
  'Teruel',
  'Toledo',
  'Valencia',
  'Valladolid',
  'Bizkaia',
  'Zamora',
  'Zaragoza'
]

// Unimos ambas listas para el filtro de localización, eliminando duplicados
export const LOCATION_OPTIONS = [
  ...new Set([...AUTONOMOUS_COMMUNITIES, ...PROVINCIAL_CAPITALS])
].sort()

export const CYBERSECURITY_TAGS = [
  // Tipos de Evento
  'Conferencia',
  'Taller',
  'Bootcamp',
  'Meetup',
  'Competición',
  'CTF (Capture The Flag)',
  'Webinar',
  'Curso',

  // Áreas Técnicas
  'Pentesting',
  'Hacking Ético',
  'Red Team',
  'Blue Team',
  'Purple Team',
  'Análisis de Malware',
  'DFIR (Forense y Respuesta a Incidentes)',
  'Reversing',
  'Criptografía',
  'Seguridad en la Nube (Cloud Security)',
  'Seguridad Ofensiva',
  'Seguridad Defensiva',

  // Plataformas y Tecnologías
  'Seguridad AWS',
  'Seguridad Azure',
  'Seguridad GCP',
  'Seguridad de Redes',
  'Seguridad IoT',
  'Seguridad Móvil (Android/iOS)',
  'Seguridad OT / SCADA',
  'Contenedores (Docker, Kubernetes)',
  'Blockchain',
  'Inteligencia Artificial (IA)',

  // Roles y Conceptos
  'Gobernanza (GRC)',
  'Cumplimiento (Compliance)',
  'Hacking',
  'Ciberinteligencia',
  'OSINT',
  'DevSecOps',
  'Networking',
  'Privacidad de Datos'
]

export const EVENT_LEVELS = [
  'Principiante',
  'Intermedio',
  'Avanzado',
  'Experto' // Para ponentes o temas muy específicos
]
