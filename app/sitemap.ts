import type { MetadataRoute } from "next"
import { SERVICE_AREAS } from "@/app/service-areas/data"
import { absoluteUrl, localizeHref } from "@/lib/locale"

const PATHS: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/how-it-works", priority: 0.8 },
  { path: "/pricing", priority: 0.8 },
  { path: "/about", priority: 0.6 },
  { path: "/contact", priority: 0.6 },
  { path: "/faq", priority: 0.6 },
  { path: "/roger", priority: 0.6 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
  ...SERVICE_AREAS.map((area) => ({
    path: `/service-areas/${area.slug}`,
    priority: 0.5,
  })),
]

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap(({ path, priority }) => {
    const en = absoluteUrl(path)
    const es = absoluteUrl(localizeHref(path, "es"))
    const languages = { en, es }
    return [
      {
        url: en,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority,
        alternates: { languages },
      },
      {
        url: es,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority,
        alternates: { languages },
      },
    ]
  })
}
