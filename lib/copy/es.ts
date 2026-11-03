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
    live: 'En vivo',
    bookDemo: 'Agenda una demo',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    language: 'Idioma',
    footerBlurb:
      'Texto de regreso por llamada perdida para negocios de servicio en el hogar. Atrapamos cada llamada que nadie contesta y escribimos de vuelta para que ningún prospecto se enfríe.',
    footerTagline: 'Nosotros cubrimos el segundo turno para que tú no tengas que hacerlo.',
    navigate: 'Navegación',
    coverage: 'Cobertura destacada',
    coverageNote: 'Para todos los oficios en todo el metroplex de DFW.',
    contact: 'Contacto',
    privacy: 'Política de privacidad',
    terms: 'Términos del servicio',
    rights: 'Todos los derechos reservados.',
    status: 'Estado:',
    operational: 'Operativo',
    homeLabel: 'Inicio de TenFour Systems',
    logoAlt: 'Logotipo de TenFour Systems',
    theme: 'Cambiar tema',
    tradeIn: (trade: string, city: string) => `${trade} en ${city}`,
  },
  cta: {
    title: 'Deja de perder trabajos por el buzón.',
    subtitle:
      'Mira qué tan rápido Roger atrapa una llamada perdida y le escribe a tu siguiente cliente, antes de que lo haga tu competencia.',
    book: 'Agenda una demo',
    pricing: 'Ver precios',
  },
  hero: {
    badge: 'Pendiente de llamadas perdidas',
    titleBefore: 'Nosotros cubrimos el ',
    titleEmphasis: 'segundo turno',
    titleAfter: ' para que tú no tengas que hacerlo.',
    body: 'TenFour Systems atrapa cada llamada perdida de los negocios de servicio en el hogar. En el momento en que no puedes contestar, Roger le manda un texto a esa persona en segundos, antes de que marque el siguiente nombre de la lista.',
    rogerAlt: 'Roger',
    roger:
      'El nombre viene de un código viejo de radio, ten-four, mensaje recibido. Ese es todo el trabajo de Roger. No duerme, no sale a comer y no deja una llamada perdida sin texto de regreso.',
    primary: 'Agenda una demo',
    secondary: 'Mira cómo funciona',
    stats: [
      { k: '24/7', v: 'Siempre pendiente' },
      { k: 'Segundos', v: 'Velocidad del texto' },
      { k: '0', v: 'Prospectos perdidos' },
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
    note: 'Cifras del sector, tomadas de estudios publicados sobre llamadas perdidas e ingresos en servicios del hogar.',
    cards: [
      {
        stat: '62%',
        label: 'de las llamadas a negocios pequeños se quedan sin contestar',
        body: 'Cada timbre que cae en el buzón es un cliente que marca el siguiente nombre de la lista.',
      },
      {
        stat: '27%',
        label: 'de las llamadas de servicio en el hogar nadie las contesta',
        body: 'Las tormentas, las fugas y los apagones no respetan horario de oficina. La llamada perdida tampoco espera.',
      },
      {
        stat: '$1,200+',
        label: 'valor promedio de una llamada perdida en servicio del hogar',
        body: 'Una sola llamada de emergencia que se pierde puede llevarse miles de dólares directo con la competencia.',
      },
    ],
  },
  capabilities: {
    eyebrow: 'El sistema',
    title: 'Toda la recepción, trabajando sola',
    description:
      'TenFour se encarga del frente cuando nadie puede tomar el teléfono, para que tu cuadrilla siga en el techo y no en la llamada.',
    items: [
      {
        title: 'Atrapa cada llamada perdida',
        body: 'En cuanto tu teléfono se queda sin contestar, Roger le escribe a esa persona en segundos, los 365 días del año. Sin música de espera, sin buzón muerto y sin perder la oportunidad.',
      },
      {
        title: 'Califica al prospecto',
        body: 'Hace las preguntas de tu oficio: tipo de servicio, ubicación y urgencia, y aparta a quien solo está mirando.',
      },
      {
        title: 'Te deja un prospecto listo',
        body: 'Califica a quien llamó y le manda tu enlace para agendar cuando lo tienes. Si no, te deja lo que necesitas para agendar el trabajo tú mismo.',
      },
      {
        title: 'Confirma la solicitud',
        body: 'Le manda un texto al instante confirmando que su solicitud llegó y que alguien le va a dar seguimiento.',
      },
      {
        title: 'Avisa a tu equipo',
        body: 'Cada prospecto calificado te llega al momento, con la conversación completa y los datos que importan.',
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
        v: 'Cada llamada fuera de horario',
        note: 'noches, fines de semana y días festivos',
      },
      {
        k: 'Más rápido',
        v: 'Segundos, no horas',
        note: 'texto de regreso antes de que llamen a la competencia',
      },
      {
        k: 'Calificados',
        v: 'Listos para agendar',
        note: 'tu enlace, o un prospecto que tu equipo puede agendar',
      },
    ],
  },
  steps: {
    eyebrow: 'Cómo funciona',
    title: 'Listo en un día. Pendiente de ahí en adelante.',
    description:
      'Sin aplicaciones que cuidar ni guiones que memorizar. Nosotros hacemos la conexión y tú recuperas tus tardes.',
    items: [
      {
        title: 'Vigilamos tu línea',
        body: 'Roger se conecta a tu número actual y vigila cualquier llamada que se quede sin contestar. La instalación toma minutos, no semanas.',
      },
      {
        title: 'Ajustamos a Roger',
        body: 'Armamos tu mensaje de texto y las preguntas según tu oficio, tu zona y tu horario, y agregamos tu enlace para agendar si ya tienes uno.',
      },
      {
        title: 'Las llamadas perdidas no se escapan',
        body: 'En cuanto una llamada se queda sin contestar, Roger le escribe a esa persona antes de que marque el siguiente nombre de la lista.',
      },
      {
        title: 'Tú recibes el prospecto',
        body: 'Si tienes un enlace para agendar, Roger se lo manda para que el cliente aparte por su cuenta. Si no, tu equipo recibe un prospecto listo para agendar, la conversación y los datos para devolver la llamada.',
      },
    ],
  },
  calculator: {
    eyebrow: 'Herramienta gratis',
    heading: '¿Cuánto te cuestan las llamadas perdidas?',
    trade: 'Oficio',
    calls: 'Llamadas perdidas por semana',
    value: 'Valor promedio del trabajo',
    rate: 'Cierre estimado',
    month: 'Estimado / mes',
    year: 'Estimado / año',
    formula:
      'fórmula: (llamadas perdidas por semana × 4.33 semanas) × tasa de cierre × valor promedio del trabajo.',
    sources:
      'Los valores de trabajo son estimados con datos de precios de 2026, nacionales y de la región de Texas, de Angi, HomeAdvisor y Consumer Affairs. Tus trabajos reales pueden ser distintos. Mueve las barras para ajustarlas a tu negocio.',
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
    ready: 'Listo para agendar.',
    caption: 'Tiempo desde que se perdió la llamada',
    sequence: 'Secuencia después de la llamada perdida',
    avoided: 'EVITADO',
    steps: [
      'Llamada perdida',
      'El cliente cuelga',
      'Roger manda el texto',
      'Llama a la competencia',
      'Prospecto listo para agendar',
    ],
  },
  about: {
    eyebrow: 'Nosotros',
    title: 'Ningún trabajo perdido por una llamada. Nunca.',
    description:
      'TenFour Systems nació para el dueño que está en el techo, debajo del fregadero o dormido después de un día de 14 horas, y no alcanza a contestar.',
    storyEyebrow: 'Nuestra historia',
    storyTitle: 'Yo cubro el segundo turno para que tú no tengas que hacerlo',
    storyDescription:
      'Los dueños de negocios de servicio son de la gente más trabajadora que conozco. Pero el día no alcanza, y las llamadas no paran.',
    paragraphs: [
      'Armé TenFour Systems después de ver a buenos contratistas de aquí perder dinero de verdad por algo que sí tiene arreglo: el teléfono sonaba cuando nadie podía contestar. Una fuga a medianoche, una tormenta en sábado, un cliente que simplemente marca el siguiente nombre de la lista.',
      'Con más de 35 años en sistemas, y experiencia en seguros comerciales, construí un sistema que no cierra turno. En cuanto una llamada se queda sin contestar, le manda un texto a esa persona en el nombre de tu negocio, la califica por mensaje y la deja lista para agendar. Después te entrega el prospecto con todo lo que necesitas para llegar preparado.',
      'Me da orgullo estar en Terrell, Texas, sirviendo a negocios de servicio en el hogar que no quieren que un teléfono sonando se quede en nada.',
    ],
    valuesEyebrow: 'En qué creo',
    valuesTitle: 'Los principios detrás del texto de regreso',
    values: [
      {
        title: 'Siempre en el aire',
        body: '«Ten-four» significa mensaje recibido. Esa es la promesa: cada llamada perdida se confirma y se atiende por texto.',
      },
      {
        title: 'Más de 35 años en sistemas',
        body: 'Décadas armando y operando sistemas, más experiencia en seguros comerciales. Esto lo hizo alguien que entiende la automatización y también el riesgo.',
      },
      {
        title: 'La rapidez se queda con el trabajo',
        body: 'El primer negocio que le habla al cliente suele quedarse con el trabajo. TenFour hace que ese negocio seas tú.',
      },
    ],
    location: 'Con orgullo desde Terrell, Texas',
    ctaTitle: 'Vamos a cuidar que no se te vaya otra.',
    ctaSubtitle:
      'Mira qué tan rápido Roger atrapa una llamada perdida y le escribe a tu siguiente cliente. Agenda una demo hoy.',
  },
  how: {
    eyebrow: 'Cómo funciona',
    title: 'Tu segundo turno, en automático',
    description:
      'TenFour vigila las llamadas perdidas en tu línea. Roger califica cada una, manda tu enlace para agendar cuando lo tienes, y si no, le deja a tu equipo un prospecto listo para agendar.',
    flowEyebrow: 'El recorrido de la llamada',
    flowTitle: 'Qué pasa en cada llamada perdida',
    flowDescription:
      'Este es el camino, de la llamada perdida a tu enlace para agendar, o a un prospecto que tu equipo puede agendar.',
    flow: [
      {
        title: 'Una llamada se queda sin contestar',
        body: 'Un dueño de casa llama fuera de horario por una fuga. Nadie contesta y la llamada se pierde.',
      },
      {
        title: 'Roger escribe al momento',
        body: 'En segundos, Roger le manda un texto, antes de que pueda marcar el siguiente nombre de la lista.',
      },
      {
        title: 'El prospecto queda calificado',
        body: 'Por texto, junta el tipo de servicio, la dirección, la urgencia y señales de presupuesto, con el guion de tu negocio.',
      },
      {
        title: 'El prospecto te llega a ti',
        body: 'Si tienes un enlace para agendar, Roger se lo manda para que el cliente aparte. Si no, tu equipo recibe un prospecto listo para agendar y la conversación completa.',
      },
    ],
    includedEyebrow: 'Qué incluye',
    includedTitle: 'Lo que haría alguien en recepción, sin la nómina',
    includedDescription:
      'Un solo sistema que acaba con la llamada perdida, el ida y vuelta del buzón y el desorden fuera de horario.',
    included: [
      'Guion de texto de regreso a la medida de tu oficio',
      'Calificación según tu zona de servicio',
      'Texto de confirmación al momento de que la solicitud llegó',
      'Avisos al momento con la conversación completa',
      'Responde por texto en el idioma de quien escribió',
    ],
  },
  pricing: {
    eyebrow: 'Precios',
    title: 'Precio fijo. Sin cuentas raras por llamada perdida.',
    description:
      'Con un solo trabajo agendado suele salir el mes. Cada plan incluye la instalación, el ajuste y el texto de regreso, pendiente de día y de noche.',
    plans: [
      {
        name: 'Base Dispatch',
        tag: 'Para empezar',
        price: '$299',
        cadence: '/mes',
        setup: '$699 de instalación, una sola vez',
        blurb:
          'Texto automático al momento por cada llamada perdida y cada consulta en la web, con seguimiento completo en el CRM.',
        features: [
          'Texto automático al momento por cada llamada perdida y cada consulta en la web',
          'Seguimiento completo de prospectos y CRM',
          'Cuota mensual estándar de mensajes',
          'Un número de teléfono dedicado',
        ],
        cta: 'Empezar con Base Dispatch',
      },
      {
        name: 'Pro Dispatch',
        tag: 'El más pedido',
        price: '$499',
        cadence: '/mes',
        setup: '$899 de instalación, una sola vez',
        blurb:
          'Todo lo de Base Dispatch, más un seguimiento después de la tormenta para los oficios que dependen del clima.',
        features: [
          'Todo lo de Base Dispatch',
          'Seguimiento después de la tormenta para oficios que dependen del clima',
          'Cuota de mensajes más alta',
          'Soporte prioritario',
        ],
        cta: 'Empezar con Pro Dispatch',
      },
      {
        name: 'Elite Full Stack',
        tag: 'Cobertura completa',
        price: '$799',
        cadence: '/mes',
        setup: '$1,199 de instalación, una sola vez',
        blurb:
          'Todo lo de Pro Dispatch, más un aviso por teléfono a tu equipo cuando el prospecto es urgente.',
        features: [
          'Todo lo de Pro Dispatch',
          'Aviso por teléfono a tu equipo cuando el prospecto es urgente',
          'El tope de cuota más alto',
          'Acompañamiento dedicado al empezar',
        ],
        cta: 'Empezar con Elite Full Stack',
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
      'Cuéntanos tu volumen de llamadas y tu oficio. Te recomendamos la configuración correcta y te enseñamos una demo en vivo.',
  },
  roger: {
    eyebrow: 'Conoce a Roger',
    title: 'El que no deja ir una llamada perdida',
    description: 'Roger es quien escribe cuando tu teléfono se queda sin contestar.',
    alt: 'Roger',
    paragraphs: [
      'El nombre viene de un código viejo de radio: ten-four, mensaje recibido. Ese es todo el trabajo de Roger. No duerme, no sale a comer y no deja una llamada perdida sin un texto de regreso.',
      'En cuanto una llamada a tu negocio se queda sin contestar, Roger le manda un texto a esa persona en segundos, antes de que marque el siguiente nombre de la lista. Hace las preguntas de tu oficio, junta los datos que necesitas y te entrega el prospecto, todo antes de que el teléfono hubiera sonado una cuarta vez.',
      'Roger no contesta la llamada en vivo y no agenda la cita. Eso es de frente, y así está pensado. Lo que sí hace es escribir más rápido que un buzón de voz, y sale más barato que tener a alguien de tiempo completo en recepción. No tiene día libre.',
    ],
    ctaTitle: 'Mira a Roger atrapar una llamada perdida',
    ctaSubtitle: 'Agenda una demo y ve exactamente cómo funciona.',
  },
  faq: {
    eyebrow: 'Preguntas',
    title: 'Las preguntas que sí hacen',
    description: 'Respuestas claras de cómo trabaja Roger, sin adorno.',
    items: [
      {
        q: '¿Roger reemplaza a mi recepcionista?',
        a: 'No del todo. Roger se encarga, por texto, de las llamadas que nadie pudo tomar: fuera de horario o en medio de un trabajo. Las convierte en prospectos listos para que tú agendes. Está pensado para lo que se habría ido al buzón, no para reemplazar una recepción que ya tienes cubierta.',
      },
      {
        q: '¿Roger contesta el teléfono en vivo?',
        a: 'No, y lo decimos de frente. Roger trabaja solo por texto. En cuanto una llamada a tu negocio se queda sin contestar, le escribe a ese cliente en segundos, hace las preguntas de tu oficio y te deja el prospecto. Hoy no hay una conversación de voz en vivo. Tampoco agenda la cita por ti.',
      },
      {
        q: '¿Qué pasa fuera de horario o en fin de semana?',
        a: 'Lo mismo que en el día. Roger no tiene horario de oficina. Está pendiente de las llamadas perdidas las 24 horas, los 365 días, incluyendo noches, fines de semana y días festivos. Lo que hace es escribir. No contesta la llamada.',
      },
      {
        q: '¿Tengo que cambiar mi número?',
        a: 'No. Roger trabaja junto a tu número actual con una función normal del teléfono: el desvío de llamadas condicional. Solo se desvían las llamadas que nadie contesta. Tu número sigue igual, y las llamadas que sí contestas siguen igual que hoy.',
      },
      {
        q: '¿Qué tan rápido escribe Roger?',
        a: 'En segundos después de que la llamada se queda sin contestar, mucho antes de que la mayoría se rinda y marque el siguiente negocio de la lista.',
      },
      {
        q: '¿Y si el cliente quiere el precio de una vez?',
        a: 'Roger nunca da un precio cerrado ni una hora de llegada por texto. Califica el tipo de servicio, la ubicación y la urgencia, y deja al prospecto listo para agendar. Después te lo pasa con todos los datos para que tú des seguimiento con números de verdad. La cita la agendas tú, o el cliente, si le mandas tu enlace.',
      },
      {
        q: '¿Hay contrato largo?',
        a: 'No. TenFour va mes a mes.',
      },
    ],
    ctaTitle: '¿Sigues con dudas?',
    ctaSubtitle: 'Agenda una demo y te explicamos, paso a paso, cómo quedaría en tu negocio.',
  },
  contact: {
    eyebrow: 'Agenda una demo',
    title: 'Mira a Roger atrapar una llamada perdida',
    description:
      'Cuéntanos de tu negocio y armamos una demo en vivo para tu oficio. Vas a ver exactamente cómo Roger le escribe a quien llamó.',
    heading: 'Vamos a dejarte en el aire',
    intro:
      'Llena el formulario y te buscamos para cuadrar la demo. ¿Prefieres hablar primero? Aquí abajo están los datos.',
    cards: [
      { label: 'Correo', value: 'garry@tenfoursystems.com', href: 'mailto:garry@tenfoursystems.com' },
      { label: 'Teléfono', value: '(972) 349 5808', href: 'tel:+19723495808' },
      { label: 'Ubicación', value: 'Terrell, Texas', href: '' },
      { label: 'Cobertura del texto', value: '24 / 7 / 365', href: '' },
    ],
    online: 'Texto de regreso en línea',
    onlineBody:
      'Quien te llame ya no va a caer en el buzón. Desde el momento en que quedas activo, cada llamada perdida recibe un texto, entre semana, de noche y en fin de semana.',
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
    submit: 'Pedir mi demo',
    error:
      'Algo salió mal. Escríbele a garry@tenfoursystems.com o llama al (972) 349 5808.',
    fine: 'Sin spam. Sin compromiso. Respondemos rápido.',
    doneTitle: 'Mensaje recibido. Ten four.',
    doneBody:
      'Gracias por escribirnos. Te contactamos pronto para armar tu demo en vivo y dejar el texto de regreso pendiente de tus llamadas.',
    another: 'Enviar otra solicitud',
    honeypot: 'Sitio web de la empresa',
  },
  notFound: {
    title: 'Parece que esta página se perdió.',
    body: 'Algo así como una llamada que nadie alcanzó. A diferencia de esta página, Roger ya te habría mandado un texto.',
    home: 'Volver al inicio',
    demo: 'Agenda una demo',
  },
  serviceArea: {
    ctaSubtitle: 'Agenda una demo y mira qué tan rápido Roger atrapa una llamada perdida.',
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
          'TenFour Systems envía mensajes de texto bajo el nombre de programa TenFour Systems / mensajes de texto de Roger. Si usted pide una demo, estos mensajes son la respuesta a esa solicitud, sobre su consulta de servicio, la programación de citas y actualizaciones de seguimiento. Para los negocios clientes, Roger le escribe a quien llamó y no logró comunicarse.',
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
