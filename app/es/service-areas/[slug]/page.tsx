import { notFound } from 'next/navigation'
import { SERVICE_AREAS } from '@/app/service-areas/data'
import { ServiceAreaView, serviceAreaMetadata } from '@/components/views/service-area-view'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return SERVICE_AREAS.map((area) => ({ slug: area.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const area = SERVICE_AREAS.find((item) => item.slug === slug)
  if (!area) return {}
  return serviceAreaMetadata('es', area)
}

export default async function SpanishServiceAreaPage({ params }: Props) {
  const { slug } = await params
  if (!SERVICE_AREAS.some((area) => area.slug === slug)) notFound()
  return <ServiceAreaView locale="es" slug={slug} />
}
