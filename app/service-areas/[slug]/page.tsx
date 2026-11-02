import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ServiceAreaPage } from "@/components/pages/service-area-page"
import { SERVICE_AREAS, serviceAreaCopy } from "@/app/service-areas/data"
import { withHreflang } from "@/lib/locale"

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return SERVICE_AREAS.map((area) => ({ slug: area.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const area = SERVICE_AREAS.find((item) => item.slug === slug)
  if (!area) return {}
  const copy = serviceAreaCopy(area, "en")
  return withHreflang(`/service-areas/${area.slug}`, "en", {
    title: copy.metaTitle,
    description: copy.description,
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const area = SERVICE_AREAS.find((item) => item.slug === slug)
  if (!area) notFound()

  return <ServiceAreaPage area={area} locale="en" />
}
