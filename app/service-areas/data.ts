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
  /** Short local pages (city x trade). Featured pages leave these out. */
  local?: LocalPage
}

export type LocalPage = {
  cityKey: string
  tradeKey: TradeKey
  title: string
  how: string
  howEs: string
  cityLine: string
  cityLineEs: string
}

type TradeKey = 'hvac' | 'plumbing' | 'electrical'

type Trade = {
  key: TradeKey
  name: string
  nameEs: string
  who: string
  whoEs: string
  why: string
  whyEs: string
}

type City = {
  key: string
  name: string
  line: string
  lineEs: string
}

export const LOCAL_TRADES: Trade[] = [
  {
    key: 'hvac',
    name: 'HVAC',
    nameEs: 'Aire acondicionado',
    who: 'HVAC companies',
    whoEs: 'empresas de aire acondicionado',
    why: "When the AC quits in a Texas summer or the heat goes out on a cold night, the homeowner wants help now. If your phone goes to voicemail, the next company on the list is one tap away.",
    whyEs:
      'Cuando el aire se descompone en pleno verano de Texas o la calefacción falla en una noche fría, el cliente quiere ayuda ya. Si tu teléfono se va al buzón, la siguiente empresa de la lista está a un toque de distancia.',
  },
  {
    key: 'plumbing',
    name: 'Plumbing',
    nameEs: 'Plomería',
    who: 'plumbers',
    whoEs: 'plomeros',
    why: "A burst pipe or a backed up drain can't wait for business hours. If the call goes to voicemail, the next plumber on the list is one tap away.",
    whyEs:
      'Un tubo reventado o un drenaje tapado no esperan al horario de oficina. Si la llamada se va al buzón, el siguiente plomero de la lista está a un toque de distancia.',
  },
  {
    key: 'electrical',
    name: 'Electrical',
    nameEs: 'Electricidad',
    who: 'electricians',
    whoEs: 'electricistas',
    why: "When the power is out or a breaker keeps tripping, people want an answer now. If you're in an attic or up a ladder when the phone rings, that call can slip away.",
    whyEs:
      'Cuando se va la luz o un breaker se dispara una y otra vez, la gente quiere una respuesta ya. Si estás en el ático o arriba de una escalera cuando suena el teléfono, esa llamada se te puede ir.',
  },
]

export const LOCAL_CITIES: City[] = [
  {
    key: 'terrell',
    name: 'Terrell',
    line: 'TenFour Systems is based right here in Terrell, so this is our home turf.',
    lineEs: 'TenFour Systems tiene su base aquí mismo en Terrell, así que esta es nuestra casa.',
  },
  {
    key: 'forney',
    name: 'Forney',
    line: 'Forney is just down US 80 from our home base in Terrell.',
    lineEs: 'Forney queda por la US 80, muy cerca de nuestra base en Terrell.',
  },
  {
    key: 'rockwall',
    name: 'Rockwall',
    line: 'Rockwall sits on the east shore of Lake Ray Hubbard, a short drive northwest of our home base in Terrell.',
    lineEs:
      'Rockwall está en la orilla este del lago Ray Hubbard, un poco al noroeste de nuestra base en Terrell.',
  },
  {
    key: 'mesquite',
    name: 'Mesquite',
    line: 'Mesquite sits on the east side of Dallas County, a short drive from our home base in Terrell.',
    lineEs: 'Mesquite está en el lado este del condado de Dallas, a poca distancia de nuestra base en Terrell.',
  },
  {
    key: 'garland',
    name: 'Garland',
    line: 'Garland sits in northeast Dallas County, a short drive from our home base in Terrell.',
    lineEs: 'Garland está en el noreste del condado de Dallas, a poca distancia de nuestra base en Terrell.',
  },
  {
    key: 'dallas',
    name: 'Dallas',
    line: 'Our home base in Terrell is about 30 miles east of downtown Dallas.',
    lineEs: 'Nuestra base en Terrell está a unas 30 millas al este del centro de Dallas.',
  },
]

const HOW =
  "Here's the idea. You miss a call, Roger texts the caller back, asks a few questions about the job, and sends the lead to you. You call back with the details already in hand."
const HOW_ES =
  'La idea es sencilla. Pierdes una llamada, Roger le manda un texto a quien llamó, le hace unas preguntas sobre el trabajo y te pasa el prospecto. Tú regresas la llamada ya con los detalles en la mano.'

function localPage(city: City, trade: Trade): ServiceArea {
  return {
    slug: `${city.key}-${trade.key}`,
    city: city.name,
    trade: trade.name,
    tradeEs: trade.nameEs,
    landmark: city.name,
    blurb: trade.why,
    blurbEs: trade.whyEs,
    titleEs: `Texto de regreso por llamada perdida para ${trade.whoEs} en ${city.name}`,
    eyebrowEs: `${trade.nameEs} en ${city.name}, TX`,
    ctaTitleEs: `¿Listo para dejar de perder trabajos en ${city.name} por el buzón?`,
    local: {
      cityKey: city.key,
      tradeKey: trade.key,
      title: `Missed call text back for ${city.name} ${trade.who}`,
      how: HOW,
      howEs: HOW_ES,
      cityLine: city.line,
      cityLineEs: city.lineEs,
    },
  }
}

/** The original hand written pages, shown in the footer. */
export const FEATURED_AREAS: ServiceArea[] = [
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

export const LOCAL_AREAS: ServiceArea[] = LOCAL_CITIES.flatMap((city) =>
  LOCAL_TRADES.map((trade) => localPage(city, trade)),
)

export const SERVICE_AREAS: ServiceArea[] = [...FEATURED_AREAS, ...LOCAL_AREAS]

/** Cities shown on the service areas page, in order, with every page for each. */
export function areasByCity(): { city: string; areas: ServiceArea[] }[] {
  const order: string[] = []
  for (const area of SERVICE_AREAS) {
    if (!order.includes(area.city)) order.push(area.city)
  }
  const local = LOCAL_CITIES.map((city) => city.name)
  order.sort((a, b) => {
    const ia = local.indexOf(a)
    const ib = local.indexOf(b)
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
  })
  return order.map((city) => ({
    city,
    areas: SERVICE_AREAS.filter((area) => area.city === city),
  }))
}
