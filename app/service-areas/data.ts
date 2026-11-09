export type ServiceArea = {
  slug: string
  city: string
  trade: string
  tradeEs: string
  landmark: string
  blurb: string
  blurbEs: string
  titleEs: string
  eyebrowEs: string
  ctaTitleEs: string
}

export const SERVICE_AREAS: ServiceArea[] = [
  {
    slug: 'rockwall-roofing',
    city: 'Rockwall',
    trade: 'Roofing',
    tradeEs: 'Techos',
    landmark: 'Lake Ray Hubbard',
    blurb:
      'Storm season around Lake Ray Hubbard means the phone rings the second hail hits. Roger texts back your missed calls so fewer Rockwall homeowners end up calling your competitor instead.',
    blurbEs:
      'En temporada de granizo, alrededor del lago Ray Hubbard, el teléfono suena en cuanto cae el hielo. Roger le manda un texto a tus llamadas perdidas para que menos dueños de casa en Rockwall terminen llamando a tu competencia.',
    titleEs: 'Deja de perder llamadas de techos cerca del lago Ray Hubbard',
    eyebrowEs: 'Techos en Rockwall, TX',
    ctaTitleEs: '¿Listo para dejar de perder trabajos en Rockwall por el buzón?',
  },
  {
    slug: 'mckinney-hvac',
    city: 'McKinney',
    trade: 'HVAC',
    tradeEs: 'Aire acondicionado',
    landmark: 'Historic Square',
    blurb:
      'A no-cool call in a McKinney summer cannot wait for a callback. Roger texts that customer back fast, day or night, so the job stays yours.',
    blurbEs:
      'Una llamada de "no hay aire" en el verano de McKinney no puede esperar a que regreses la llamada. Roger le manda un texto rápido a ese cliente, de día o de noche, para que el trabajo se quede contigo.',
    titleEs: 'Deja de perder llamadas de aire acondicionado cerca del Historic Square',
    eyebrowEs: 'Aire acondicionado en McKinney, TX',
    ctaTitleEs: '¿Listo para dejar de perder trabajos en McKinney por el buzón?',
  },
  {
    slug: 'terrell-foundation-repair',
    city: 'Terrell',
    trade: 'Foundation Repair',
    tradeEs: 'Reparación de cimientos',
    landmark: 'the Historic District',
    blurb:
      'Terrell homes built on North Texas clay soil see real foundation movement. When a worried homeowner calls after hours, Roger makes sure that missed call gets a text back.',
    blurbEs:
      'Las casas de Terrell, sobre el suelo arcilloso del norte de Texas, sí se mueven. Cuando un dueño preocupado llama fuera de horario, Roger se encarga de que esa llamada perdida reciba un texto de regreso.',
    titleEs: 'Deja de perder llamadas de reparación de cimientos cerca del distrito histórico',
    eyebrowEs: 'Reparación de cimientos en Terrell, TX',
    ctaTitleEs: '¿Listo para dejar de perder trabajos en Terrell por el buzón?',
  },
]
