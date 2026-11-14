import { ServiceAreasIndexView, serviceAreasIndexMetadata } from '@/components/views/service-area-view'

export const metadata = serviceAreasIndexMetadata('en')

export default function ServiceAreasPage() {
  return <ServiceAreasIndexView locale="en" />
}
