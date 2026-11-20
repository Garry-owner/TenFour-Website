import type { MetadataRoute } from 'next'
import { SERVICE_AREAS } from '@/app/service-areas/data'
import { absoluteUrl } from '@/lib/locale'

const PAGES: { path: string; priority: number }[] = [
  { path: '/', priority: 1 },
  { path: '/how-it-works', priority: 0.8 },
  { path: '/pricing', priority: 0.8 },
  { path: '/about', priority: 0.6 },
  { path: '/roger', priority: 0.6 },
  { path: '/faq', priority: 0.5 },
  { path: '/contact', priority: 0.6 },
  { path: '/privacy', priority: 0.3 },
  { path: '/terms', priority: 0.3 },
  { path: '/service-areas', priority: 0.6 },
  ...SERVICE_AREAS.map((area) => ({ path: `/service-areas/${area.slug}`, priority: 0.5 })),
]

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(({ path, priority }) => {
    const en = absoluteUrl('en', path)
    const es = absoluteUrl('es', path)
    const languages = { en, es, 'x-default': en }
    const shared = {
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority,
      alternates: { languages },
    }
    return [
      { url: en, ...shared },
      { url: es, ...shared },
    ]
  })
}
