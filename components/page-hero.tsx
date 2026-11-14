import { HomeEyebrow } from '@/components/home/home-heading'

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: React.ReactNode
  description: string
}) {
  return (
    <section id="page-hero" className="border-b-2 border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-14 sm:px-6 sm:py-20">
        <HomeEyebrow>{eyebrow}</HomeEyebrow>
        <h1 className="max-w-4xl text-balance font-stencil text-4xl font-black uppercase leading-[0.95] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </section>
  )
}
