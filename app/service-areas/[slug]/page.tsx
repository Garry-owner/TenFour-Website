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
  return serviceAreaMetadata('en', area)
}

export default async function ServiceAreaPage({ params }: Props) {
  const { slug } = await params
  if (!SERVICE_AREAS.some((area) => area.slug === slug)) notFound()
  return <ServiceAreaView locale="en" slug={slug} />
}
