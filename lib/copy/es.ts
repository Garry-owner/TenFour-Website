import { en } from '@/lib/copy/en'

export const es: typeof en = {
  chrome: {
    skip: 'Saltar al contenido',
    nav: [
      { path: '/how-it-works', label: 'Cómo funciona' },
      { path: '/pricing', label: 'Precios' },
      { path: '/about', label: 'Nosotros' },
      { path: '/roger', label: 'Conoce a Roger' },
      { path: '/faq', label: 'Preguntas' },
    ],
    bookDemo: 'Únete a la lista de espera',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    language: 'Idioma',
    footerBlurb:
      'Texto de regreso por llamada perdida para negocios de servicio en el hogar. Cuando no alcanzas a contestar, Roger le escribe a quien llamó, le hace unas preguntas y te pasa el prospecto.',
    footerTagline: 'Nosotros cubrimos el segundo turno para que tú no tengas que hacerlo.',
    navigate: 'Navegación',
    coverage: 'Cobertura destacada',
    coverageNote: 'Para oficios de servicio en el hogar en el metroplex de DFW.',
    contact: 'Contacto',
    privacy: 'Política de privacidad',
    terms: 'Términos del servicio',
    rights: 'Todos los derechos reservados.',
    homeLabel: 'Inicio de TenFour Systems',
    logoAlt: 'Logotipo de TenFour Systems',
    theme: 'Cambiar tema',
    tradeIn: (trade: string, city: string) => `${trade} en ${city}`,
  },
  cta: {
    title: 'Deja de perder trabajos por el buzón.',
    subtitle:
      'Sé de los primeros contratistas en probar a Roger.',
    book: 'Únete a la lista de espera',
    pricing: 'Ver precios',
  },
  hero: {
    badge: 'Pendiente de llamadas perdidas',
    titleBefore: 'Nosotros cubrimos el ',
    titleEmphasis: 'segundo turno',
    titleAfter: ' para que tú no tengas que hacerlo.',
    body: 'Texto de regreso por llamada perdida para negocios de servicio en el hogar. Cuando no alcanzas a contestar, Roger le escribe a quien llamó, le hace unas preguntas y te pasa el prospecto.',
    rogerAlt: 'Roger',
    roger:
      'El nombre viene de un código viejo de radio, ten-four, mensaje recibido. Ese es todo el trabajo de Roger. No duerme, no sale a comer y no deja que una llamada perdida se enfríe.',
    primary: 'Únete a la lista de espera',
    secondary: 'Mira cómo funciona',
    stats: [
      { k: 'Noches y fines de semana', v: 'Cubiertos' },
      { k: 'Rápido', v: 'Velocidad del texto' },
    ],
  },
  industries: {
    eyebrow: 'Hecho para los oficios',
    description:
      'Pensado para negocios de servicio en el hogar, donde una llamada perdida es un trabajo perdido.',
    items: [
      'Techos',
      'HVAC',
      'Plomería',
      'Electricidad',
      'Restauración',
      'Puertas de garaje',
      'Jardinería',
      'Control de plagas',
      'Paneles solares',
      'Reparación de cimientos',
      'Cercas',
      'Servicio de árboles',
      'Contratista general',
    ],
  },
  problem: {
    eyebrow: 'El problema',
    title: 'El teléfono suena después de las 5. Nadie contesta. El trabajo se va.',
    description:
      'El dueño no puede vivir pegado al teléfono, pero el cliente espera que alguien le hable en cuanto algo se descompone.',
    note: 'Fuente del 27%: investigación de Invoca sobre llamadas a negocios de servicio en el hogar (2024, en inglés).',
    sourceLabel: 'Leer el artículo de Invoca',
    sourceUrl: 'https://invoca.com/blog/how-much-missed-sales-calls-cost-home-services-businesses',
    cards: [
      {
        stat: '27%',
        label: 'de las llamadas a negocios de servicio en el hogar no se contestan',
        body: 'Cada timbre que cae en el buzón es un cliente que puede marcar el siguiente nombre de la lista.',
      },
      {
        stat: 'Después de las 5',
        label: 'es cuando empiezan muchos problemas',
        body: 'Las tormentas, las fugas y los apagones no respetan horario de oficina. La llamada perdida tampoco espera.',
      },
      {
        stat: 'Una llamada',
        label: 'puede ser un trabajo grande',
        body: 'Una sola llamada de emergencia que se pierde puede mandar un trabajo grande directo con la competencia.',
      },
    ],
  },
  capabilities: {
    eyebrow: 'El sistema',
    title: 'Quien llamó recibe un texto de regreso, en automático',
    description:
      'Cuando nadie puede tomar el teléfono, TenFour le escribe a quien llamó, para que tu cuadrilla siga en el techo y no en la llamada.',
    items: [
      {
        title: 'Le escribe a tus llamadas perdidas',
        body: 'Cuando tu teléfono se queda sin contestar, Roger le escribe rápido a esa persona, también de noche y en fin de semana. Sin música de espera y sin buzón muerto.',
      },
      {
        title: 'Califica al prospecto',
        body: 'Hace las preguntas de tu oficio: tipo de servicio, ubicación y urgencia.',
      },
      {
        title: 'Te deja un prospecto listo',
        body: 'Califica a quien llamó y le manda tu enlace para agendar cuando lo tienes. Si no, te deja lo que necesitas para agendar el trabajo tú mismo.',
      },
      {
        title: 'Confirma la solicitud',
        body: 'Le manda un texto confirmando que su solicitud llegó y que alguien le va a dar seguimiento.',
      },
      {
        title: 'Avisa a tu equipo',
        body: 'Cada prospecto calificado te llega con la conversación por texto y los datos que importan.',
      },
      {
        title: 'Se siente como tu negocio',
        body: 'El guion y el tono del texto se ajustan a tu negocio, para que quien escribió sienta que habla contigo.',
      },
    ],
  },
  proof: {
    items: [
      {
        k: 'Capturadas',
        v: 'Llamadas perdidas fuera de horario',
        note: 'noches, fines de semana y días festivos',
      },
      {
        k: 'Más rápido',
        v: 'Rápido, no horas después',
        note: 'un texto de regreso mientras quien llamó sigue buscando',
      },
      {
        k: 'Calificados',
        v: 'Listos para ti',
        note: 'tu enlace, o un prospecto que tu equipo puede agendar',
      },
    ],
  },
  steps: {
    eyebrow: 'Cómo funciona',
    title: 'Listo rápido. Deja de perder prospectos.',
    description:
      'Sin aplicaciones que cuidar ni guiones que memorizar. Nosotros hacemos la conexión y tú recuperas tus tardes.',
    items: [
      {
        title: 'Vigilamos tu línea',
        body: 'Roger se conecta a tu número actual y vigila cualquier llamada que se quede sin contestar. Nosotros nos encargamos de la instalación.',
      },
      {
        title: 'Ajustamos a Roger',
        body: 'Armamos tu mensaje de texto y las preguntas según tu oficio, tu zona y tu horario, y agregamos tu enlace para agendar si ya tienes uno.',
      },
      {
        title: 'Quien llamó recibe un texto',
        body: 'Cuando una llamada se queda sin contestar, Roger le escribe rápido a esa persona, para que sea menos probable que marque el siguiente nombre de la lista.',
      },
      {
        title: 'Tú recibes el prospecto',
        body: 'Si tienes un enlace para agendar, Roger se lo manda para que el cliente aparte por su cuenta. Si no, tu equipo recibe el prospecto, la conversación por texto y los datos para devolver la llamada.',
      },
    ],
  },
  calculator: {
    eyebrow: 'Herramienta gratis',
    heading: '¿Cuánto te cuestan las llamadas perdidas?',
    trade: 'Oficio',
    choose: 'Elige tu oficio',
    calls: 'Llamadas perdidas por semana',
    value: 'Valor promedio del trabajo',
    rate: 'Cierre estimado',
    month: 'Estimado / mes',
    year: 'Estimado / año',
    formula:
      'fórmula: (llamadas perdidas por semana × 4.33 semanas) × tasa de cierre × valor promedio del trabajo.',
    estimate: 'Es un cálculo aproximado, no una promesa. Tus números reales van a ser distintos.',
    sources:
      'Los valores de trabajo son promedios aproximados. Mueve las barras para ajustarlas a tu negocio.',
    trades: [
      'Techos',
      'HVAC',
      'Plomería',
      'Electricidad',
      'Restauración',
      'Puertas de garaje',
      'Jardinería',
      'Control de plagas',
      'Paneles solares',
      'Reparación de cimientos',
      'Cercas',
      'Servicio de árboles',
      'Contratista general',
    ],
  },
  race: {
    watching: 'PENDIENTE DE LLAMADAS PERDIDAS',
    onIt: 'ROGER YA LE ESCRIBIÓ',
    missed: 'Llamada perdida.',
    money: 'Hay dinero en juego.',
    ready: 'Prospecto enviado a ti.',
    caption: 'Tiempo desde que se perdió la llamada',
    example: 'Ejemplo',
    sequence: 'Secuencia después de la llamada perdida',
    avoided: 'EVITADO',
    steps: [
      'Llamada perdida',
      'El cliente cuelga',
      'Roger manda el texto',
      'Llama a la competencia',
      'Prospecto enviado a ti',
    ],
  },
  about: {
    eyebrow: 'Nosotros',
    title: 'Deja de perder trabajos por llamadas perdidas.',
    description:
      'TenFour Systems nació para el dueño que está en el techo, debajo del fregadero o dormido después de un día de 14 horas, y no alcanza a contestar.',
    storyEyebrow: 'Nuestra historia',
    storyTitle: 'Yo cubro el segundo turno para que tú no tengas que hacerlo',
    storyDescription:
      'Los dueños de negocios de servicio son de la gente más trabajadora que conozco. Pero el día no alcanza, y las llamadas no paran.',
    paragraphs: [
      'Armé TenFour Systems después de ver a buenos contratistas de aquí perder dinero de verdad por algo que sí tiene arreglo: el teléfono sonaba cuando nadie podía contestar. Una fuga a medianoche, una tormenta en sábado, un cliente que simplemente marca el siguiente nombre de la lista.',
      'Con más de 35 años en sistemas, y experiencia en seguros comerciales, estoy construyendo un sistema que sigue trabajando cuando tú ya cerraste turno. Cuando una llamada se queda sin contestar, le manda un texto a esa persona en el nombre de tu negocio, le hace unas preguntas por mensaje y después te pasa el prospecto con lo que necesitas para dar seguimiento.',
      'Me da orgullo estar en Terrell, Texas, sirviendo a negocios de servicio en el hogar que no quieren que un teléfono sonando se quede en nada.',
    ],
    valuesEyebrow: 'En qué creo',
    valuesTitle: 'Los principios detrás de Roger',
    values: [
      {
        title: 'En el aire fuera de horario',
        body: '«Ten-four» significa mensaje recibido. Esa es la idea: una llamada perdida recibe un texto en vez de silencio.',
      },
      {
        title: 'Más de 35 años en sistemas',
        body: 'Décadas armando y operando sistemas, más experiencia en seguros comerciales. Esto lo hizo alguien que entiende la automatización y también el riesgo.',
      },
      {
        title: 'La rapidez se queda con el trabajo',
        body: 'El primer negocio que le responde al cliente muchas veces se queda con el trabajo. TenFour te ayuda a que ese negocio seas tú.',
      },
    ],
    location: 'Con orgullo desde Terrell, Texas',
    ctaTitle: 'Que la próxima llamada perdida no se enfríe.',
    ctaSubtitle:
      'Sé de los primeros contratistas en probar a Roger. Únete hoy a la lista de espera.',
  },
  how: {
    eyebrow: 'Cómo funciona',
    title: 'Tu segundo turno, en automático',
    description:
      'TenFour vigila las llamadas perdidas en tu línea. Roger le escribe a cada persona, le hace unas preguntas, manda tu enlace para agendar cuando lo tienes, y si no, le pasa el prospecto a tu equipo.',
    flowEyebrow: 'El recorrido de la llamada',
    flowTitle: 'Qué pasa con una llamada perdida',
    flowDescription:
      'Este es el camino, de la llamada perdida a tu enlace para agendar, o a un prospecto que tu equipo puede agendar.',
    flow: [
      {
        title: 'Una llamada se queda sin contestar',
        body: 'Un dueño de casa llama fuera de horario por una fuga. Nadie contesta y la llamada se pierde.',
      },
      {
        title: 'Roger escribe rápido',
        body: 'Roger le manda un texto enseguida, para que sea menos probable que marque el siguiente nombre de la lista.',
      },
      {
        title: 'El prospecto queda calificado',
        body: 'Por texto, junta el tipo de servicio, la dirección, la urgencia y señales de presupuesto, con el guion de tu negocio.',
      },
      {
        title: 'El prospecto te llega a ti',
        body: 'Si tienes un enlace para agendar, Roger se lo manda para que el cliente aparte. Si no, tu equipo recibe el prospecto y la conversación por texto.',
      },
    ],
    includedEyebrow: 'Qué incluye',
    includedTitle: 'Ayuda con las llamadas perdidas, sin la nómina',
    includedDescription:
      'Un solo sistema para la llamada perdida, el ida y vuelta del buzón y el desorden fuera de horario.',
    included: [
      'Guion de texto de regreso a la medida de tu oficio',
      'Calificación según tu zona de servicio',
      'Texto de confirmación de que la solicitud llegó',
      'Avisos del prospecto con la conversación por texto',
      'Responde por texto en el idioma de quien escribió',
    ],
  },
  pricing: {
    eyebrow: 'Precios',
    title: 'Precio fijo. Sin cuentas raras por llamada perdida.',
    description:
      'Con un solo trabajo agendado puede salir el mes. Cada plan incluye la instalación, el ajuste y el texto de regreso por llamada perdida, también de noche y en fin de semana.',
    plans: [
      {
        name: 'Base',
        tag: 'Para empezar',
        price: '$299',
        cadence: '/mes',
        setup: '$699 de instalación, una sola vez',
        blurb:
          'Texto automático para llamadas perdidas y consultas en la web, con seguimiento completo en el CRM.',
        features: [
          'Texto automático para llamadas perdidas y consultas en la web',
          'Seguimiento completo de prospectos y CRM',
          'Cuota mensual estándar de mensajes',
          'Un número de teléfono dedicado',
        ],
        cta: 'Empezar con Base',
      },
      {
        name: 'Pro',
        tag: 'El más pedido',
        price: '$499',
        cadence: '/mes',
        setup: '$899 de instalación, una sola vez',
        blurb:
          'Todo lo de Base, más un seguimiento después de la tormenta para los oficios que dependen del clima.',
        features: [
          'Todo lo de Base',
          'Seguimiento después de la tormenta para oficios que dependen del clima',
          'Cuota de mensajes más alta',
          'Soporte prioritario',
        ],
        cta: 'Empezar con Pro',
      },
      {
        name: 'Elite',
        tag: 'Cobertura completa',
        price: '$799',
        cadence: '/mes',
        setup: '$1,199 de instalación, una sola vez',
        blurb:
          'Todo lo de Pro, más un aviso por teléfono a tu equipo cuando el prospecto es urgente.',
        features: [
          'Todo lo de Pro',
          'Aviso por teléfono a tu equipo cuando el prospecto es urgente',
          'El tope de cuota más alto',
          'Acompañamiento dedicado al empezar',
        ],
        cta: 'Empezar con Elite',
      },
    ],
    overageTitle: 'Mensajes extra',
    overageBody:
      'Los mensajes que pasen de la cuota del mes se cobran a 5 centavos cada uno. Se registran solos y se cobran al cierre del mes. Sin sorpresas y sin que se corte el servicio.',
    offerTitle: 'Oferta para clientes nuevos',
    offerBody:
      'El primer mes va a la mitad de precio. Después de tres meses pagados completos, el cuarto mes es gratis. Es un regalo de bienvenida, de una sola vez, no un descuento de siempre.',
    contracts: 'Sin contratos largos.',
    questions: '¿Dudas? Háblanos',
    ctaTitle: '¿No sabes qué plan te queda?',
    ctaSubtitle:
      'Cuéntanos tu volumen de llamadas y tu oficio. Te recomendamos la configuración correcta y te apartamos un lugar en la lista de espera.',
  },
  roger: {
    eyebrow: 'Conoce a Roger',
    title: 'El que le escribe a tus llamadas perdidas',
    description: 'Roger es quien escribe cuando tu teléfono se queda sin contestar.',
    alt: 'Roger',
    paragraphs: [
      'El nombre viene de un código viejo de radio: ten-four, mensaje recibido. Ese es todo el trabajo de Roger. No duerme, no sale a comer y no deja que una llamada perdida se enfríe.',
      'Cuando una llamada a tu negocio se queda sin contestar, Roger le manda un texto rápido a esa persona, para que sea menos probable que marque el siguiente nombre de la lista. Hace unas preguntas de tu oficio, junta los datos que necesitas y te pasa el prospecto.',
      'Roger no contesta la llamada en vivo y no agenda la cita. Eso es de frente, y así está pensado. Lo que sí hace es escribir más rápido que un buzón de voz, y sale más barato que tener a alguien de tiempo completo en recepción.',
    ],
    ctaTitle: 'Sé de los primeros en probar a Roger',
    ctaSubtitle: 'Únete a la lista de espera y te avisamos cuando Roger esté listo para tu negocio.',
  },
  faq: {
    eyebrow: 'Preguntas',
    title: 'Las preguntas que sí hacen',
    description: 'Respuestas claras de cómo trabaja Roger, sin adorno.',
    items: [
      {
        q: '¿Roger reemplaza a mi recepcionista?',
        a: 'No del todo. Roger le escribe a las llamadas que nadie pudo tomar, fuera de horario o en medio de un trabajo, hace unas preguntas y te pasa el prospecto. Está pensado para lo que se habría ido al buzón, no para reemplazar una recepción que ya tienes cubierta.',
      },
      {
        q: '¿Roger contesta el teléfono en vivo?',
        a: 'No, y lo decimos de frente. Roger trabaja solo por texto. Cuando una llamada a tu negocio se queda sin contestar, le escribe a ese cliente, hace las preguntas de tu oficio y te pasa el prospecto. Hoy no hay una conversación de voz en vivo. Tampoco agenda la cita por ti.',
      },
      {
        q: '¿Qué pasa fuera de horario o en fin de semana?',
        a: 'Lo mismo que en el día. Roger está hecho para escribirle a las llamadas perdidas también de noche, en fin de semana y en días festivos. Lo que hace es escribir. No contesta la llamada.',
      },
      {
        q: '¿Tengo que cambiar mi número?',
        a: 'No. Roger trabaja junto a tu número actual con una función normal del teléfono: el desvío de llamadas condicional. Solo se desvían las llamadas que nadie contesta. Tu número sigue igual, y las llamadas que sí contestas siguen igual que hoy.',
      },
      {
        q: '¿Qué tan rápido escribe Roger?',
        a: 'Rápido. Roger manda el texto en cuanto entra la llamada perdida, para que quien llamó sepa de ti mientras sigue buscando.',
      },
      {
        q: '¿Y si el cliente quiere el precio de una vez?',
        a: 'Roger no da un precio cerrado ni una hora de llegada por texto. Pregunta el tipo de servicio, la ubicación y la urgencia. Después te pasa el prospecto con todos los datos para que tú des seguimiento con números de verdad. La cita la agendas tú, o el cliente, si le mandas tu enlace.',
      },
      {
        q: '¿Hay contrato largo?',
        a: 'No. TenFour va mes a mes.',
      },
    ],
    ctaTitle: '¿Sigues con dudas?',
    ctaSubtitle: 'Únete a la lista de espera y te explicamos, paso a paso, cómo quedaría en tu negocio.',
  },
  contact: {
    eyebrow: 'Únete a la lista de espera',
    title: 'Sé de los primeros en probar a Roger',
    description:
      'Roger todavía no está lanzado. Cuéntanos de tu negocio, te apartamos un lugar y te buscamos cuando esté listo para tu oficio.',
    heading: 'Vamos a ponerte en la lista',
    intro:
      'Llena el formulario y te buscamos para el acceso anticipado. ¿Prefieres hablar primero? Aquí abajo están los datos.',
    cards: [
      { label: 'Correo', value: 'garry@tenfoursystems.com', href: 'mailto:garry@tenfoursystems.com' },
      { label: 'Teléfono', value: '(972) 349 5808', href: 'tel:+19723495808' },
      { label: 'Ubicación', value: 'Terrell, Texas', href: '' },
      { label: 'Hecho para', value: 'Llamadas perdidas fuera de horario', href: '' },
    ],
    online: 'Muy pronto',
    onlineBody:
      'Roger se está preparando para el lanzamiento. Cuando tu línea quede lista, las llamadas perdidas reciben un texto, entre semana, de noche y en fin de semana.',
  },
  form: {
    first: 'Nombre',
    firstPlaceholder: 'Jordan',
    last: 'Apellido',
    lastPlaceholder: 'Rivera',
    phone: 'Teléfono',
    phonePlaceholder: '(214) 555 0148',
    email: 'Correo',
    emailPlaceholder: 'tu@negocio.com',
    message: '¿Qué quieres resolver? (opcional)',
    messagePlaceholder: 'Se nos van muchas llamadas fuera de horario en temporada de tormentas.',
    timezone: '¿En qué zona horaria estás?',
    timezonePlaceholder: 'Elige tu zona horaria',
    zones: [
      { value: 'Eastern', label: 'Este' },
      { value: 'Central', label: 'Centro' },
      { value: 'Mountain', label: 'Montaña' },
      { value: 'Pacific', label: 'Pacífico' },
    ],
    consent:
      'Al marcar esta casilla, acepto recibir mensajes de texto automáticos de TenFour Systems en el número que indiqué, sobre mi consulta de servicio, la programación de citas y actualizaciones de seguimiento. La frecuencia de los mensajes varía. El consentimiento no es condición de compra. Pueden aplicar tarifas de mensajes y datos. Responde HELP para ayuda o STOP para cancelar. Consulta nuestra {{privacy}} y los {{terms}}.',
    sending: 'Enviando',
    submit: 'Únete a la lista de espera',
    error:
      'Algo salió mal. Escríbele a garry@tenfoursystems.com o llama al (972) 349 5808.',
    fine: 'Sin spam. Sin compromiso. Respondemos rápido.',
    doneTitle: 'Mensaje recibido. Ten four.',
    doneBody:
      'Gracias por escribirnos. Ya estás en la lista, y te contactamos para el acceso anticipado.',
    another: 'Enviar otra solicitud',
    honeypot: 'Sitio web de la empresa',
  },
  notFound: {
    title: 'Parece que esta página se perdió.',
    body: 'Algo así como una llamada que nadie alcanzó. A diferencia de esta página, Roger ya te habría mandado un texto.',
    home: 'Volver al inicio',
    demo: 'Únete a la lista de espera',
  },
  serviceArea: {
    ctaSubtitle: 'Únete a la lista de espera y sé de los primeros contratistas en probar a Roger.',
  },
  privacy: {
    title: 'Política de privacidad',
    updated: 'Última actualización: 29 de octubre de 2026',
    sections: [
      {
        heading: '1. Quiénes somos',
        paragraphs: [
          'TenFour Systems («TenFour», «nosotros») opera tenfoursystems.com y ofrece a negocios de contratistas un servicio automático de texto de regreso por llamada perdida. Esta política explica qué información recopilamos en el sitio y cómo la usamos.',
        ],
      },
      {
        heading: '2. Información que recopilamos',
        paragraphs: [
          'Cuando envía nuestro formulario de contacto, recopilamos su nombre, correo, teléfono, el mensaje que escribe, si marcó la casilla de consentimiento para mensajes de texto y en qué momento, y la página desde la que envió el formulario. No cobramos pagos directamente en el sitio. La facturación de los clientes que firman se maneja con nuestro procesador de pagos, Stripe.',
        ],
      },
      {
        heading: '3. Cómo usamos su información',
        paragraphs: [
          'Usamos la información que nos da para responder a su consulta, enviarle mensajes de texto automáticos si marcó la casilla de consentimiento, guardar el registro de ese consentimiento como lo pide la ley de protección al consumidor telefónico (TCPA) y mejorar nuestros servicios y el sitio.',
        ],
      },
      {
        heading: '4. Mensajes de texto (SMS)',
        paragraphs: [
          'Si marca la casilla de consentimiento en el formulario, acepta recibir mensajes de texto automáticos de TenFour Systems en el número que indicó. El consentimiento no es condición de compra. Pueden aplicar tarifas de mensajes y datos. La frecuencia de los mensajes varía. Responda STOP en cualquier momento para cancelar, o HELP para pedir ayuda.',
        ],
      },
      {
        heading: '5. Con quién compartimos su información',
        paragraphs: [
          'Usamos estos proveedores para operar el negocio, y ellos pueden procesar su información: Zoho CRM (registros), Make.com (automatización), Twilio (envío de mensajes de texto) y Stripe (cobros, para clientes que ya firmaron). No vendemos su información personal a terceros y no la compartimos fuera de estos proveedores, salvo que la ley lo exija. La información del celular y el consentimiento para recibir mensajes de texto no se comparten con terceros ni con afiliados para marketing o promociones.',
        ],
      },
      {
        heading: '6. Seguridad de los datos',
        paragraphs: [
          'Tomamos medidas razonables para proteger la información que nos da, incluyendo seguridad a nivel de campo en los datos sensibles dentro de nuestro CRM. Ningún método de almacenamiento o transmisión electrónica es completamente seguro, y no podemos garantizar una seguridad absoluta.',
        ],
      },
      {
        heading: '7. Conservación de los datos',
        paragraphs: [
          'Conservamos su información el tiempo necesario para prestar el servicio y mantener los registros de cumplimiento que nos piden, incluyendo la prueba de consentimiento de la TCPA, o el tiempo que exija la ley.',
        ],
      },
      {
        heading: '8. Sus derechos',
        paragraphs: [
          'Puede responder STOP a cualquier mensaje de texto para no recibir más, responder HELP para pedir ayuda, o escribirnos a {{email}} para preguntar qué información tenemos sobre usted o para pedir que la borremos, salvo los registros que la ley nos obliga a conservar.',
        ],
      },
      {
        heading: '9. Privacidad de los menores',
        paragraphs: [
          'El sitio y los servicios están dirigidos a dueños de negocio y no están pensados para menores de 18 años. No recopilamos información de niños a sabiendas.',
        ],
      },
      {
        heading: '10. Cambios a esta política',
        paragraphs: [
          'Podemos actualizar esta política de vez en cuando. La fecha de «Última actualización» de arriba muestra el cambio más reciente.',
        ],
      },
      {
        heading: '11. Contáctenos',
        paragraphs: ['Las preguntas sobre esta política pueden enviarse a {{email}}.'],
      },
    ],
  },
  terms: {
    title: 'Términos del servicio',
    updated: 'Última actualización: 29 de octubre de 2026',
    sections: [
      {
        heading: '1. Aceptación de los términos',
        paragraphs: [
          'Estos Términos del servicio rigen el uso del sitio y de los servicios de TenFour Systems. Al usar el sitio o al interactuar con nuestro servicio de mensajes de texto, usted acepta estos términos.',
        ],
      },
      {
        heading: '2. Nuestro servicio',
        paragraphs: [
          'TenFour Systems ofrece a negocios de servicio en el hogar un servicio automático de texto de regreso por llamada perdida y de calificación de prospectos. TenFour es un puente de comunicación entre un negocio y sus clientes, y no es quien hace el trabajo de servicio en el hogar.',
        ],
      },
      {
        heading: '3. Mensajes de texto',
        paragraphs: [
          'TenFour Systems envía mensajes de texto bajo el nombre de programa TenFour Systems / mensajes de texto de Roger. Si usted se une a la lista de espera o pregunta por el acceso anticipado, estos mensajes son la respuesta a esa solicitud, sobre su consulta de servicio, la programación de citas y actualizaciones de seguimiento. Para los negocios clientes, Roger le escribe a quien llamó y no logró comunicarse.',
          'La frecuencia de los mensajes varía. Pueden aplicar tarifas de mensajes y datos. El consentimiento no es condición de compra. Responda STOP para cancelar y HELP para pedir ayuda. Para soporte, escriba a {{email}} o llame al (972) 349 5808. Las compañías de teléfono no son responsables de mensajes retrasados o no entregados. Consulte nuestra {{privacy}}.',
          'Los negocios clientes que usan Roger son responsables de tener el consentimiento correcto para escribirle a quien los llamó y a sus contactos, incluyendo mensajes de seguimiento, y aceptan cumplir la TCPA y las reglas de las compañías de teléfono.',
        ],
      },
      {
        heading: '4. Cuentas de clientes',
        paragraphs: [
          'Los negocios clientes pueden cancelar su suscripción en cualquier momento escribiéndonos. La cuota de instalación no se reembolsa una vez que empezó el trabajo técnico de la cuenta. Al cancelar, dejamos de cobrar de ahí en adelante y tratamos los datos que queden según nuestra Política de privacidad.',
        ],
      },
      {
        heading: '5. Uso aceptable',
        paragraphs: [
          'Usted acepta no usar el servicio para nada ilegal, ni enviar mensajes a personas que no hayan aceptado que las contacten.',
        ],
      },
      {
        heading: '6. Límite de responsabilidad',
        paragraphs: [
          'TenFour Systems ofrece calificación de prospectos y servicios de comunicación, y no es responsable de la calidad, los tiempos ni el resultado del trabajo de servicio en el hogar que haga un negocio cliente. Hasta donde la ley lo permite, TenFour no responde por daños indirectos, incidentales o consecuentes que surjan del uso del servicio.',
        ],
      },
      {
        heading: '7. Cambios a estos términos',
        paragraphs: [
          'Podemos actualizar estos términos de vez en cuando. La fecha de «Última actualización» de arriba muestra el cambio más reciente.',
        ],
      },
      {
        heading: '8. Contáctenos',
        paragraphs: ['Las preguntas sobre estos términos pueden enviarse a {{email}}.'],
      },
    ],
  },
}
