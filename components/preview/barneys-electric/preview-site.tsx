'use client'

import { useEffect, useState } from 'react'
import {
  BadgeCheck,
  Building2,
  Cable,
  Car,
  CircuitBoard,
  Clock,
  Cog,
  Fan,
  HardHat,
  Home,
  Lamp,
  Lightbulb,
  Medal,
  Zap,
  Menu,
  Network,
  Phone,
  Plug,
  Receipt,
  Shield,
  ShieldCheck,
  Star,
  Utensils,
  Wrench,
  X,
  type LucideIcon,
} from 'lucide-react'
import { ChatWidget } from '@/components/preview/barneys-electric/chat-widget'
import { EstimateForm } from '@/components/preview/barneys-electric/estimate-form'
import {
  CITIES,
  COMMERCIAL,
  COMMERCIAL_CALLOUT,
  EMERGENCY_PHONE_DISPLAY,
  EMERGENCY_PHONE_TEL,
  MAIN_PHONE_DISPLAY,
  MAIN_PHONE_TEL,
  OWNER_QUOTE,
  RESIDENTIAL,
  RESIDENTIAL_CALLOUT,
  REVIEWS,
  type ServiceItem,
} from '@/lib/preview/barneys-electric/content'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'Meet Barney' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#areas', label: 'Areas' },
]

const CREDIBILITY: { label: string; icon: LucideIcon }[] = [
  { label: 'In Business Since 1998', icon: Clock },
  { label: 'Owner Works Every Job', icon: HardHat },
  { label: 'Free Estimates', icon: BadgeCheck },
  { label: 'Upfront Pricing', icon: Receipt },
  { label: '24-Hour Emergency', icon: Phone },
  { label: 'Veteran Owned', icon: Medal },
]

const RESIDENTIAL_ICONS: Record<string, LucideIcon> = {
  repair: Wrench,
  panel: CircuitBoard,
  outlets: Plug,
  lighting: Lightbulb,
  fans: Fan,
  generators: Zap,
  ev: Car,
  rewire: Home,
  surge: ShieldCheck,
}

const COMMERCIAL_ICONS: Record<string, LucideIcon> = {
  construction: HardHat,
  remodel: Building2,
  repairs: Wrench,
  lighting: Lamp,
  motors: Cog,
  generators: Zap,
  hoods: Utensils,
  network: Network,
  phase: Cable,
}

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2340]'

const primaryBtn = `inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#D97706] px-5 text-base font-semibold text-white transition hover:bg-[#B45309] ${focusRing}`

const navyBtn = `inline-flex h-12 items-center justify-center rounded-lg border border-[#0F2340] bg-white px-5 text-base font-semibold text-[#0F2340] transition hover:bg-[#0F2340] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B45309]`

function Photo({
  src,
  alt,
  width,
  height,
  priority = false,
  caption,
}: {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  caption?: string
}) {
  return (
    <figure>
      <div className="overflow-hidden rounded-2xl bg-[#EEECE7] shadow-[0_18px_40px_-28px_rgba(15,35,64,0.7)] ring-1 ring-[#0F2340]/10">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding={priority ? 'sync' : 'async'}
          className="h-auto w-full"
        />
      </div>
      {caption ? <figcaption className="mt-3 text-sm leading-relaxed text-[#64748B]">{caption}</figcaption> : null}
    </figure>
  )
}

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="size-4 fill-[#D97706] text-[#D97706]" aria-hidden />
      ))}
    </div>
  )
}

function ServiceCard({ item, icon: Icon }: { item: ServiceItem; icon: LucideIcon }) {
  return (
    <article className="flex h-full gap-3.5 rounded-xl border border-[#E6E8EC] bg-white p-4 sm:p-5">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#F7F7F5] text-[#0F2340]">
        <Icon className="size-5" aria-hidden />
      </span>
      <div>
        <h3 className="text-[15px] font-semibold leading-snug text-[#0F2340]">{item.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-[#334155]">{item.text}</p>
      </div>
    </article>
  )
}

export function PreviewSite() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [serviceTab, setServiceTab] = useState<'residential' | 'commercial'>('residential')

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)')
    const onChange = () => {
      if (media.matches) setMenuOpen(false)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const services = serviceTab === 'residential' ? RESIDENTIAL : COMMERCIAL
  const icons = serviceTab === 'residential' ? RESIDENTIAL_ICONS : COMMERCIAL_ICONS
  const callout = serviceTab === 'residential' ? RESIDENTIAL_CALLOUT : COMMERCIAL_CALLOUT
  const featured = REVIEWS[0]
  const rest = REVIEWS.slice(1)

  return (
    <div id="top" className="bg-white text-[#334155] pb-[calc(8.75rem+env(safe-area-inset-bottom))] lg:pb-0">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#0F2340]"
      >
        Skip to content
      </a>

      <p className="bg-[#F7F7F5] px-4 py-2 text-center text-[12.5px] leading-snug text-[#64748B] sm:text-[13px]">
        Concept preview by TenFour Systems for Barney&apos;s Electric. Not the official site.
      </p>

      <header className="sticky top-0 z-40 border-b border-[#E6E8EC] bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 sm:px-8">
          <a href="#top" className="min-w-0" onClick={() => setMenuOpen(false)}>
            <span className="block whitespace-nowrap text-[1.05rem] font-semibold leading-none tracking-[-0.02em] text-[#0F2340] sm:text-lg">
              Barney&apos;s Electric
            </span>
            <span className="mt-1 block text-xs font-medium text-[#64748B]">TECL #21974</span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Page">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[15px] font-semibold text-[#334155] hover:text-[#0F2340]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={MAIN_PHONE_TEL}
              className={`hidden items-center gap-2 text-[15px] font-semibold text-[#0F2340] hover:underline lg:inline-flex ${focusRing}`}
            >
              <Phone className="size-4" aria-hidden />
              {MAIN_PHONE_DISPLAY}
            </a>
            <a
              href="#estimate"
              className={`hidden h-12 items-center justify-center rounded-lg bg-[#D97706] px-5 text-base font-semibold text-white transition hover:bg-[#B45309] lg:inline-flex ${focusRing}`}
            >
              Free Estimate
            </a>
            <a
              href={MAIN_PHONE_TEL}
              className={`inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-[#0F2340] hover:bg-[#F3F5F8] lg:hidden ${focusRing}`}
              aria-label={`Call ${MAIN_PHONE_DISPLAY}`}
            >
              <Phone className="size-5" />
            </a>
            <button
              type="button"
              className={`inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-[#0F2340] hover:bg-[#F3F5F8] lg:hidden ${focusRing}`}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav
            id="mobile-nav"
            className="absolute inset-x-0 top-full border-b border-[#E6E8EC] bg-white px-5 py-2 shadow-[0_18px_30px_-24px_rgba(15,35,64,0.6)] lg:hidden"
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-12 items-center border-b border-[#F1F2F4] text-base font-semibold text-[#0F2340]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#estimate"
              onClick={() => setMenuOpen(false)}
              className="flex min-h-12 items-center text-base font-semibold text-[#0F2340]"
            >
              Free Estimate
            </a>
          </nav>
        ) : null}
      </header>

      <main id="content">
        <section className="bg-white">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:py-16">
            <div>
              <p className="text-sm font-semibold leading-relaxed text-[#B45309]">
                Rockwall, Texas · Since 1998 · TECL #21974
              </p>
              <h1 className="mt-3 max-w-xl text-balance text-[1.85rem] font-semibold leading-[1.15] tracking-[-0.025em] text-[#0F2340] sm:text-5xl lg:text-[3.15rem]">
                Rockwall&apos;s Trusted Electrician. Owner Works Every Job.
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#334155] sm:text-lg">
                Residential and commercial electrical work across Rockwall, Kaufman, Dallas, and Collin
                counties. Free estimates, upfront pricing, and 24-hour emergency service.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={MAIN_PHONE_TEL} className={`${primaryBtn} w-full sm:w-auto`}>
                  <Phone className="size-[18px]" aria-hidden />
                  Call {MAIN_PHONE_DISPLAY}
                </a>
                <a href="#estimate" className={`${navyBtn} w-full sm:w-auto`}>
                  Request a Free Estimate
                </a>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-[#334155] sm:text-[15px]">
                24-Hour Emergency:{' '}
                <a
                  href={EMERGENCY_PHONE_TEL}
                  className="font-semibold text-[#0F2340] underline decoration-[#D97706] decoration-2 underline-offset-4"
                >
                  {EMERGENCY_PHONE_DISPLAY}
                </a>
              </p>
              <p className="mt-3 max-w-xl text-sm font-semibold leading-relaxed text-[#0F2340] sm:text-[15px]">
                4.9 <span className="text-[#D97706]">★</span> (287 Google Reviews) · Veteran Owned · Licensed
                & Insured
              </p>
            </div>
            <Photo
              src="/mockups/barneys-electric/barney-by-truck.jpg"
              alt="Barney Messenger smiling beside his white Barney's Electric service truck."
              width={882}
              height={739}
              priority
              caption="Barney Messenger, owner, with his service truck."
            />
          </div>
        </section>

        <section aria-label="Why people call Barney" className="border-y border-[#E6E4DF] bg-[#F7F7F5]">
          <ul className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-6">
            {CREDIBILITY.map((item, index) => (
              <li
                key={item.label}
                className={cn(
                  'flex items-center gap-3 px-4 py-4 sm:px-5',
                  index % 2 === 0 && 'border-r border-[#E6E4DF] lg:border-r-0',
                  index < 4 && 'border-b border-[#E6E4DF] lg:border-b-0',
                  index < CREDIBILITY.length - 1 && 'lg:border-r lg:border-[#E6E4DF]',
                )}
              >
                <item.icon className="size-5 shrink-0 text-[#B45309]" aria-hidden />
                <span className="text-balance text-sm font-semibold leading-snug text-[#0F2340]">{item.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="services" className="scroll-mt-24 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-[#B45309]">Services</p>
              <h2 className="mt-2 text-balance text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] text-[#0F2340] sm:text-4xl">
                Work for the house and the job site.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#334155] sm:text-lg">
                Pick the list that fits the property. These are jobs Barney&apos;s Electric already does.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-1 rounded-xl bg-[#F3F5F8] p-1 sm:inline-grid sm:w-auto" role="tablist" aria-label="Service lists">
              {(
                [
                  ['residential', 'Residential'],
                  ['commercial', 'Commercial & Retail'],
                ] as const
              ).map(([id, label]) => {
                const selected = serviceTab === id
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    id={`tab-${id}`}
                    aria-selected={selected}
                    aria-controls={`panel-${id}`}
                    onClick={() => setServiceTab(id)}
                    className={cn(
                      'min-h-11 rounded-lg px-3 text-sm font-semibold sm:px-5',
                      selected ? 'bg-[#0F2340] text-white' : 'text-[#334155] hover:text-[#0F2340]',
                      focusRing,
                    )}
                  >
                    {label}
                  </button>
                )
              })}
            </div>

            <div
              role="tabpanel"
              id={`panel-${serviceTab}`}
              aria-labelledby={`tab-${serviceTab}`}
              className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3"
            >
              {services.map((item, index) => (
                <div key={item.id} className={index === services.length - 1 ? 'md:col-span-2 xl:col-span-1' : undefined}>
                  <ServiceCard item={item} icon={icons[item.id] ?? Wrench} />
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-[#F7F7F5] px-5 py-6 sm:px-7 sm:py-7">
              <h3 className="text-lg font-semibold text-[#0F2340]">Do not see the job?</h3>
              <p className="mt-2 max-w-3xl text-base leading-relaxed text-[#334155]">{callout}</p>
              <a
                href={MAIN_PHONE_TEL}
                className="mt-4 inline-flex min-h-11 items-center font-semibold text-[#0F2340] underline decoration-[#D97706] decoration-2 underline-offset-4"
              >
                Call {MAIN_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 bg-[#F3F5F8]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-[#B45309]">Meet Barney</p>
              <h2 className="mt-2 text-balance text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] text-[#0F2340] sm:text-4xl">
                Barney Messenger works the jobs he sells.
              </h2>
            </div>
            <div className="mt-8 grid items-start gap-8 lg:mt-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <Photo
                  src="/mockups/barneys-electric/barney-portrait.jpg"
                  alt="Barney Messenger in his blue Barney's Electric shirt, holding a yellow Fluke tester in a kitchen."
                  width={692}
                  height={790}
                  caption="Barney Messenger, owner."
                />
              </div>
              <div className="lg:col-span-7">
                <blockquote className="text-xl font-medium italic leading-relaxed text-[#0F2340] sm:text-2xl">
                  “{OWNER_QUOTE}”
                </blockquote>
                <p className="mt-4 text-sm font-semibold text-[#334155]">
                  Barney Messenger, owner, on barneyselectric.com
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    'Serving Rockwall and the Dallas metroplex since 1998.',
                    'Hands-on owner. You will find Barney on the job site.',
                    'Barney Messenger personally oversees every job.',
                    'Free estimates, and the price is set before the work starts.',
                  ].map((point) => (
                    <li key={point} className="flex gap-3 text-base leading-relaxed text-[#334155]">
                      <BadgeCheck className="mt-0.5 size-5 shrink-0 text-[#B45309]" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {[
                    ['TECL #21974', BadgeCheck],
                    ['Veteran Owned', Medal],
                    ['A+ BBB Rating', Shield],
                    ['Licensed & Insured', ShieldCheck],
                  ].map(([label, Icon]) => (
                    <li
                      key={label as string}
                      className="inline-flex items-center gap-2 rounded-full border border-[#0F2340]/15 bg-white px-3 py-1.5 text-sm font-semibold text-[#0F2340]"
                    >
                      <Icon className="size-4 text-[#B45309]" aria-hidden />
                      {label as string}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="scroll-mt-24 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <p className="text-sm font-semibold text-[#B45309]">Google reviews</p>
                <h2 className="mt-2 text-balance text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] text-[#0F2340] sm:text-4xl">
                  What customers wrote.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#334155] sm:text-lg">
                  4.9 stars from 287 Google reviews. Five of them are below.
                </p>
              </div>
              <div className="flex items-center gap-4 self-start rounded-2xl border border-[#E6E8EC] bg-[#F7F7F5] px-5 py-4">
                <p className="text-5xl font-semibold tracking-[-0.03em] text-[#0F2340]">4.9</p>
                <div>
                  <Stars />
                  <p className="mt-1 text-sm font-medium text-[#334155]">287 Google reviews</p>
                </div>
              </div>
            </div>

            <figure className="mt-8 rounded-2xl border border-[#E6E8EC] bg-[#FFFBF6] p-6 sm:p-8">
              <Stars />
              <blockquote className="mt-4 text-lg leading-relaxed text-[#0F2340] sm:text-xl">
                “{featured.text}”
              </blockquote>
              <figcaption className="mt-5 text-sm font-semibold text-[#0F2340]">
                {featured.name}
                <span className="font-medium text-[#64748B]"> · Google review</span>
              </figcaption>
            </figure>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {rest.map((review) => (
                <figure key={review.name} className="flex h-full flex-col rounded-2xl border border-[#E6E8EC] bg-white p-6">
                  <Stars />
                  <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-[#334155]">
                    “{review.text}”
                  </blockquote>
                  <figcaption className="mt-5 text-sm font-semibold text-[#0F2340]">
                    {review.name}
                    <span className="font-medium text-[#64748B]"> · Google review</span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className="mt-6 text-sm leading-relaxed text-[#64748B]">
              These reviews are from the Barney&apos;s Electric Google listing. The 4.9 rating and the count of
              287 reviews come from that same listing.
            </p>
          </div>
        </section>

        <section id="areas" className="scroll-mt-24 bg-[#F7F7F5]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-x-14 lg:gap-y-8">
              <div className="lg:col-start-2">
                <p className="text-sm font-semibold text-[#B45309]">Service area</p>
                <h2 className="mt-2 text-balance text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] text-[#0F2340] sm:text-4xl">
                  Look for the white service truck.
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-[#334155]">TECL #21974 is right on the door.</p>
              </div>
              <div className="lg:col-start-1 lg:row-span-2 lg:row-start-1">
                <Photo
                  src="/mockups/barneys-electric/barney-truck-door.jpg"
                  alt="Door of Barney's white work truck, lettered Barney's Electric, 972-771-9464, and TECL 21974."
                  width={700}
                  height={679}
                  caption="The phone number and license are right on the door."
                />
              </div>
              <div className="lg:col-start-2">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#E6E4DF] bg-white px-4 py-4">
                    <p className="text-sm font-semibold text-[#0F2340]">Free estimates</p>
                    <a
                      href={MAIN_PHONE_TEL}
                      className="mt-1 inline-flex min-h-11 items-center text-xl font-semibold tracking-tight text-[#0F2340] underline decoration-[#D97706] decoration-2 underline-offset-4"
                    >
                      {MAIN_PHONE_DISPLAY}
                    </a>
                  </div>
                  <div className="rounded-xl border border-[#E6E4DF] bg-white px-4 py-4">
                    <p className="text-sm font-semibold text-[#0F2340]">24-hour emergency</p>
                    <a
                      href={EMERGENCY_PHONE_TEL}
                      className="mt-1 inline-flex min-h-11 items-center text-xl font-semibold tracking-tight text-[#0F2340] underline decoration-[#D97706] decoration-2 underline-offset-4"
                    >
                      {EMERGENCY_PHONE_DISPLAY}
                    </a>
                  </div>
                </div>
                <div className="mt-3 rounded-xl border border-[#E6E4DF] bg-white px-4 py-4">
                  <p className="text-sm font-semibold text-[#0F2340]">Hours</p>
                  <p className="mt-1 text-base leading-relaxed text-[#334155]">
                    Monday to Friday, 7:00 AM to 5:00 PM.
                    <br />
                    Saturday by appointment.
                  </p>
                </div>
                <div className="mt-8">
                  <h3 className="text-base font-semibold text-[#0F2340]">
                    Rockwall, Collin, Dallas, and Kaufman counties
                  </h3>
                  <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
                    {CITIES.map((city) => (
                      <li key={city} className="flex items-center gap-2 text-[15px] font-medium text-[#0F2340]">
                        <span className="size-1.5 shrink-0 rounded-full bg-[#D97706]" aria-hidden />
                        {city}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="estimate" className="scroll-mt-24 bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:py-24">
            <div className="order-1 lg:col-span-5">
              <p className="text-sm font-semibold text-[#B45309]">Free estimate</p>
              <h2 className="mt-2 text-balance text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] text-[#0F2340] sm:text-4xl">
                Tell Barney what you need.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#334155] sm:text-lg">
                A short form. He calls you back. Estimates are free, and the price is set before the work starts.
              </p>
            </div>
            <div className="order-3 lg:col-span-5">
              <ul className="space-y-3 lg:mt-2">
                {[
                  'Owner works every job.',
                  'Upfront pricing, before anyone picks up a tool.',
                  `24-hour emergency line ${EMERGENCY_PHONE_DISPLAY} if it cannot wait.`,
                ].map((point) => (
                  <li key={point} className="flex gap-3 text-base leading-relaxed text-[#334155]">
                    <BadgeCheck className="mt-0.5 size-5 shrink-0 text-[#B45309]" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-[#64748B]">
                Monday to Friday, 7:00 AM to 5:00 PM. Saturday by appointment.
              </p>
            </div>
            <div className="order-2 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
              <EstimateForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#E6E4DF] bg-[#F7F7F5] text-[#334155]">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <p className="text-xl font-semibold tracking-[-0.02em] text-[#0F2340]">Barney&apos;s Electric, LLC</p>
              <p className="mt-2 text-sm leading-relaxed text-[#334155]">Rockwall, Texas</p>
              <p className="mt-1 text-sm font-semibold text-[#334155]">TECL #21974</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0F2340]">Call</p>
              <a href={MAIN_PHONE_TEL} className="mt-2 inline-flex min-h-11 items-center text-lg font-semibold text-[#0F2340] hover:underline">
                {MAIN_PHONE_DISPLAY}
              </a>
              <p className="text-sm text-[#64748B]">Free estimates</p>
              <a
                href={EMERGENCY_PHONE_TEL}
                className="mt-3 inline-flex min-h-11 items-center text-lg font-semibold text-[#0F2340] hover:underline"
              >
                {EMERGENCY_PHONE_DISPLAY}
              </a>
              <p className="text-sm text-[#64748B]">24-hour emergency</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0F2340]">Hours</p>
              <p className="mt-3 text-sm leading-relaxed text-[#334155]">
                Monday to Friday
                <br />
                7:00 AM to 5:00 PM
              </p>
              <p className="mt-2 text-sm text-[#334155]">Saturday by appointment</p>
              <p className="mt-4 text-sm leading-relaxed text-[#334155]">
                Serving Rockwall, Collin, Dallas, and Kaufman counties.
              </p>
            </div>
          </div>
          <div className="mt-12 border-t border-[#E6E4DF] pt-6">
            <p className="max-w-3xl text-sm leading-relaxed text-[#64748B]">
              Concept preview by TenFour Systems. Details and photos come from barneyselectric.com and
              the Barney&apos;s Electric Google listing. Not an official live site.
            </p>
          </div>
        </div>
      </footer>

      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E6E8EC] bg-white lg:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="grid grid-cols-[1.25fr_0.75fr] gap-2 px-3 py-2.5">
          <a
            href={MAIN_PHONE_TEL}
            className="inline-flex h-12 items-center justify-center gap-1.5 rounded-lg border border-[#0F2340] bg-white px-2 text-[13px] font-semibold text-[#0F2340]"
          >
            <Phone className="size-4 shrink-0" aria-hidden />
            <span className="whitespace-nowrap">Call {MAIN_PHONE_DISPLAY}</span>
          </a>
          <a
            href="#estimate"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-[#D97706] px-2 text-[13px] font-semibold text-white hover:bg-[#B45309]"
          >
            Free Estimate
          </a>
        </div>
      </div>

      <ChatWidget />
    </div>
  )
}
