import { lp, type Locale } from '@/lib/locale'

export function RichText({
  text,
  locale,
  linkClassName = 'text-primary underline',
}: {
  text: string
  locale: Locale
  linkClassName?: string
}) {
  const parts = text.split(/({{email}}|{{privacy}}|{{terms}})/g)
  if (parts.length === 1) return text

  return parts.map((part, index) => {
    if (part === '{{email}}') {
      return (
        <a key={index} href="mailto:garry@tenfoursystems.com" className={linkClassName}>
          garry@tenfoursystems.com
        </a>
      )
    }
    if (part === '{{privacy}}') {
      return (
        <a key={index} href={lp(locale, '/privacy')} className={linkClassName}>
          {locale === 'es' ? 'Política de privacidad' : 'Privacy Policy'}
        </a>
      )
    }
    if (part === '{{terms}}') {
      return (
        <a key={index} href={lp(locale, '/terms')} className={linkClassName}>
          {locale === 'es' ? 'Términos del servicio' : 'Terms of Service'}
        </a>
      )
    }
    return part
  })
}
