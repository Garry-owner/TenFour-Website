import { MapPin, Radio, Wrench, Gauge } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { SectionHeading } from "@/components/section-heading"
import { CtaBand } from "@/components/cta-band"
import type { Locale } from "@/lib/locale"

const ICONS = [Radio, Wrench, Gauge]

const COPY: Record<
  Locale,
  {
    eyebrow: string
    title: string
    description: string
    storyEyebrow: string
    storyTitle: string
    storyDescription: string
    paragraphs: string[]
    beliefsEyebrow: string
    beliefsTitle: string
    values: { title: string; body: string }[]
    based: string
    ctaTitle: string
    ctaSubtitle: string
  }
> = {
  en: {
    eyebrow: "About",
    title: "No job lost to a missed call. Ever.",
    description:
      "TenFour Systems was built for the owner who's up on the roof, under the sink, or asleep after a 14 hour day, and can't get to the phone.",
    storyEyebrow: "Our Story",
    storyTitle: "I work the second shift so you don't have to",
    storyDescription:
      "Home service owners are the hardest working people I know. But there are only so many hours in a day, and the calls never stop coming.",
    paragraphs: [
      "I started TenFour Systems after watching great local contractors lose real money to something completely fixable: a phone that rang when nobody could pick it up. A leak at midnight, a storm on a Saturday, a customer who simply calls the next name on the list.",
      "With over 35 years in IT, plus a background in commercial insurance, I built a system that never clocks out. The moment a call goes unanswered, it texts that caller back in your business name, qualifies them over text, and gets them ready to book, then hands you the lead with everything you need to show up ready.",
      "I'm proud to be based in Terrell, Texas, serving home-service businesses that refuse to let a ringing phone go to waste.",
    ],
    beliefsEyebrow: "What I Believe",
    beliefsTitle: "The principles behind the dispatcher",
    values: [
      {
        title: "Always on the air",
        body: `"Ten-four" means message received. That is the promise: every call gets received, acknowledged, and handled.`,
      },
      {
        title: "35 plus years in IT",
        body: "Decades building and running technical systems, plus a background in commercial insurance, mean this is built by someone who understands both the automation and the risk.",
      },
      {
        title: "Speed wins jobs",
        body: "The first business to answer usually wins the work. TenFour makes sure that business is always yours.",
      },
    ],
    based: "Proudly based in Terrell, Texas",
    ctaTitle: "Let's make sure you never miss another one.",
    ctaSubtitle:
      "See how fast Roger catches a missed call and texts your next customer back. Book a demo today.",
  },
  es: {
    eyebrow: "Nosotros",
    title: "Ningún trabajo perdido por una llamada perdida. Nunca.",
    description:
      "TenFour Systems se creó para el dueño que está en el techo, debajo del fregadero o dormido después de un día de 14 horas, y no puede llegar al teléfono.",
    storyEyebrow: "Nuestra historia",
    storyTitle: "Yo trabajo el segundo turno para que tú no tengas que hacerlo",
    storyDescription:
      "Los dueños de servicios del hogar son las personas más trabajadoras que conozco. Pero el día solo tiene ciertas horas, y las llamadas no dejan de llegar.",
    paragraphs: [
      "Empecé TenFour Systems después de ver a excelentes contratistas locales perder dinero de verdad por algo que sí se puede arreglar: un teléfono que sonaba cuando nadie podía contestar. Una fuga a medianoche, una tormenta un sábado, un cliente que simplemente llama al siguiente nombre de la lista.",
      "Con más de 35 años en tecnología, y experiencia en seguros comerciales, construí un sistema que nunca termina su turno. En el momento en que una llamada se queda sin respuesta, le manda un texto a esa persona en el nombre de tu negocio, la califica por texto y la deja lista para agendar. Luego te entrega el prospecto con todo lo que necesitas para llegar preparado.",
      "Me enorgullece estar en Terrell, Texas, sirviendo a negocios de servicios del hogar que se niegan a dejar que un teléfono sonando se desperdicie.",
    ],
    beliefsEyebrow: "En lo que creo",
    beliefsTitle: "Los principios detrás del despachador",
    values: [
      {
        title: "Siempre en el aire",
        body: `"Ten-four" significa mensaje recibido. Esa es la promesa: cada llamada se recibe, se confirma y se atiende.`,
      },
      {
        title: "Más de 35 años en tecnología",
        body: "Décadas construyendo y operando sistemas técnicos, más experiencia en seguros comerciales, significan que esto lo construyó alguien que entiende tanto la automatización como el riesgo.",
      },
      {
        title: "La rapidez gana trabajos",
        body: "El primer negocio que responde casi siempre se queda con el trabajo. TenFour se asegura de que ese negocio siempre seas tú.",
      },
    ],
    based: "Con orgullo desde Terrell, Texas",
    ctaTitle: "Asegurémonos de que no se te vuelva a pasar ninguna.",
    ctaSubtitle:
      "Mira qué tan rápido Roger capta una llamada perdida y le responde por texto a tu próximo cliente. Reserva una demo hoy.",
  },
}

export function AboutPage({ locale = "en" }: { locale?: Locale }) {
  const copy = COPY[locale]

  return (
    <main>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

      <section className="border-b border-border py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow={copy.storyEyebrow}
            title={copy.storyTitle}
            description={copy.storyDescription}
          />
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow={copy.beliefsEyebrow}
            title={copy.beliefsTitle}
            align="center"
            className="mx-auto items-center"
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {copy.values.map(({ title, body }, index) => {
              const Icon = ICONS[index]
              return (
                <div key={title} className="flex flex-col gap-4 rounded-lg border border-border bg-card p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-10 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            {copy.based}
          </div>
        </div>
      </section>

      <CtaBand locale={locale} title={copy.ctaTitle} subtitle={copy.ctaSubtitle} />
    </main>
  )
}
