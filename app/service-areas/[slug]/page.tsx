import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/page-hero'
import { CtaBand } from '@/components/cta-band'
import { SERVICE_AREAS } from '@/app/service-areas/data'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return SERVICE_AREAS.map((area) => ({ slug: area.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const area = SERVICE_AREAS.find((a) => a.slug === slug)
  if (!area) return {}
  return {
    title: `${area.trade} Missed Call Dispatch in ${area.city}, TX. TenFour Systems`,
    description: area.blurb,
  }
}

export default async function ServiceAreaPage({ params }: Props) {
  const { slug } = await params
  const area = SERVICE_AREAS.find((a) => a.slug === slug)
  if (!area) notFound()

  return (
    <main>
      <PageHero
        eyebrow={`${area.trade} in ${area.city}, TX`}
        title={`Never miss another ${area.trade.toLowerCase()} call near ${area.landmark}`}
        description={area.blurb}
      />
      <CtaBand
        title={`Ready to stop losing ${area.city} jobs to voicemail?`}
        subtitle="Book a demo and see how fast Roger catches a missed call."
      />
    </main>
  )
}
