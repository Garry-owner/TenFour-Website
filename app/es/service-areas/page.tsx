import { ServiceAreasIndexView, serviceAreasIndexMetadata } from '@/components/views/service-area-view'

export const metadata = serviceAreasIndexMetadata('es')

export default function SpanishServiceAreasPage() {
  return <ServiceAreasIndexView locale="es" />
}
