import { CITIES, EMERGENCY_PHONE_DISPLAY, MAIN_PHONE_DISPLAY } from './content'

export type Lead = {
  name?: string
  phone?: string
}

export type ChatResult = {
  replies: string[]
  lead: Lead
}

const PASS_ALONG = 'I pass your details to Barney. I do not book the visit.'

function answerFor(topic: string): string {
  switch (topic) {
    case 'schedule':
      return `I cannot book an appointment from this chat. Barney sets his own visits. Call ${MAIN_PHONE_DISPLAY}, or send your name and phone number and he will call you to pick a time.`
    case 'emergency':
      return `For emergency service, call ${EMERGENCY_PHONE_DISPLAY}. That line is answered 24 hours. Daytime estimates go to ${MAIN_PHONE_DISPLAY}, Monday to Friday, 7:00 AM to 5:00 PM. Saturday is by appointment. I can pass your name and number to Barney. I do not dispatch or book the truck from this chat.`
    case 'ev':
      return `Barney installs 220v charging outlets and high-speed charger circuits, including the plug and the breaker. Call ${MAIN_PHONE_DISPLAY} for a free estimate, or send your name and phone number and he will call you. I do not book the install from this chat.`
    case 'panel':
      return `A breaker that keeps tripping usually means an overloaded circuit, a worn breaker, or a wiring fault. Barney finds the cause and fixes that, including older fuse panels. Call ${MAIN_PHONE_DISPLAY} for a free estimate. If the panel is hot, buzzing, or you smell burning, call ${EMERGENCY_PHONE_DISPLAY}. Send your name and number if you want a callback. I do not book the visit.`
    case 'lighting':
      return `Barney designs and installs interior lighting, landscape lighting, security lighting, track and accent lighting, and ceiling fans. Estimates are free at ${MAIN_PHONE_DISPLAY}. Leave your name and number if you want him to call. I do not book the visit.`
    case 'generator':
      return `Barney installs generators, transfer switches, and other backup power for homes and commercial buildings. Estimates are free. Call ${MAIN_PHONE_DISPLAY}, or send your name and phone number for a callback. I do not book the visit.`
    case 'commercial':
      return `Yes. Barney's Electric does retail, office, and other commercial work: new construction, remodels, lighting, motor controls, generators, and repairs. Call ${MAIN_PHONE_DISPLAY} and ask for Barney. I can take your name and number for a callback. I do not book the job.`
    case 'area':
      return `Barney is based in Rockwall and serves Rockwall, Collin, Dallas, and Kaufman counties. That includes Heath, Rowlett, Royse City, Fate, Forney, Terrell, Garland, Mesquite, Sunnyvale, Wylie, Sachse, Murphy, Plano, Richardson, Dallas, Lavon, Josephine, and Nevada. Call ${MAIN_PHONE_DISPLAY} to confirm your address.`
    case 'hours':
      return `Shop hours are Monday to Friday, 7:00 AM to 5:00 PM. Saturday is by appointment. For an emergency any time, call ${EMERGENCY_PHONE_DISPLAY}. For a free estimate, call ${MAIN_PHONE_DISPLAY}.`
    case 'creds':
      return "Barney's Electric, LLC holds Texas license TECL #21974. The company is insured, veteran owned, and BBB accredited. Barney Messenger has served Rockwall since 1998, and he oversees every job."
    case 'reviews':
      return `The Google listing shows 4.9 stars from 287 reviews. People mention fast callbacks, fair prices, and Barney showing up when he said he would. Call him at ${MAIN_PHONE_DISPLAY}.`
    case 'services':
      return `Barney handles repairs, panel upgrades, rewires, remodels, lighting, ceiling fans, EV chargers, generators, surge protection, meter bases, CSST bonding, infrared inspections, and water heaters. If you do not see the job, call ${MAIN_PHONE_DISPLAY}. He will tell you straight.`
    case 'assistant':
      return `I am Roger, in demo mode for this concept preview. I answer questions and pass your name and number to Barney Messenger. I do not book appointments. Barney is the owner, and he has served Rockwall since 1998. Call him at ${MAIN_PHONE_DISPLAY}.`
    case 'owner':
      return `The owner is Barney Messenger. He has worked in Rockwall since 1998, and he personally oversees every project. Call him at ${MAIN_PHONE_DISPLAY}.`
    case 'estimate':
      return `Yes. Estimates are free, and Barney gives you the price before any work starts. Call ${MAIN_PHONE_DISPLAY}, or send your name and phone number and he will call you back. ${PASS_ALONG}`
    default:
      return `I can help with free estimates, 24-hour emergency service, EV chargers, panels, lighting, and the towns around Rockwall. Call ${MAIN_PHONE_DISPLAY} for an estimate, or ${EMERGENCY_PHONE_DISPLAY} if it is an emergency. You can also send your name and phone number and Barney will call you back. I do not book appointments from this chat.`
  }
}

function classify(text: string): string {
  const t = text.toLowerCase()
  if (/\b(emergency|24|urgent|no power|outage|spark|burn|smoke|smell|buzz)\b/.test(t)) return 'emergency'
  if (/\b(book|schedule|appointment|come out|set a time|what time)\b/.test(t)) return 'schedule'
  if (/\b(ev|charger|tesla|electric car|220)\b/.test(t)) return 'ev'
  if (/\b(trip|tripping|breaker|fuse|panel)\b/.test(t)) return 'panel'
  if (/\b(light|lighting|fan|fixture)\b/.test(t)) return 'lighting'
  if (/\b(generator|transfer switch|backup power)\b/.test(t)) return 'generator'
  if (/\b(commercial|retail|store|office|restaurant|industrial)\b/.test(t)) return 'commercial'
  if (
    /\b(where|area|city|cities|county|counties|serve|service area|coverage)\b/.test(t) ||
    mentionedCity(t)
  ) {
    return 'area'
  }
  if (/\b(hour|hours|open|saturday|sunday|close|closed)\b/.test(t)) return 'hours'
  if (/\b(license|licensed|insured|insurance|veteran|bbb|tecl)\b/.test(t)) return 'creds'
  if (/\b(review|reviews|google|rating|stars)\b/.test(t)) return 'reviews'
  if (
    /\b(rewire|remodel|outlet|circuit|surge|meter|csst|infrared|water heater|hot tub|spa|solar|gfci|afci)\b/.test(
      t,
    )
  ) {
    return 'services'
  }
  if (/\bwho are you\b/.test(t)) return 'assistant'
  if (/\b(the owner|who is barney|who's barney|about barney)\b/.test(t)) return 'owner'
  if (/\b(estimat|quote|how much|price|pricing|cost|free)\b/.test(t)) return 'estimate'
  return 'fallback'
}

function mentionedCity(text: string): string | undefined {
  return CITIES.find((city) => text.includes(city.toLowerCase()))
}

export function extractPhone(text: string): string | undefined {
  const match = text.match(/(?:\+?1[\s.-]*)?\(?(\d{3})\)?[\s.-]*(\d{3})[\s.-]*(\d{4})/)
  if (!match) return undefined
  return `${match[1]}${match[2]}${match[3]}`
}

export function formatPhone(digits: string): string {
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

const NAME_STOP =
  /^(hi|hello|hey|my|name|is|i|am|im|its|it's|this|the|a|an|please|call|me|at|phone|number|and|thanks|thank|you|can|reach|for|to|of)$/i

function extractName(text: string, phoneFound: boolean, expectingName: boolean): string | undefined {
  const labeled = text.match(/\b(?:my name is|this is|i am|i'm|name:)\s+([A-Za-z][A-Za-z' .-]{0,40})/i)
  if (labeled?.[1]) {
    const cleaned = tidyName(labeled[1].replace(/\b(and|my|phone|number)\b.*$/i, '').trim())
    if (cleaned.length > 1) return cleaned
  }
  if (!phoneFound && !expectingName) return undefined
  const withoutPhone = text.replace(/(?:\+?1[\s.-]*)?\(?\d{3}\)?[\s.-]*\d{3}[\s.-]*\d{4}/g, ' ')
  const words = withoutPhone
    .replace(/[^A-Za-z\s'-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter((word) => word && !NAME_STOP.test(word))
  if (words.length === 0 || words.length > 4) return undefined
  if (words.length === 1 && !expectingName && !phoneFound) return undefined
  return tidyName(words.join(' '))
}

function tidyName(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((word) => (word === word.toLowerCase() ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(' ')
}

export function respond(raw: string, lead: Lead): ChatResult {
  const text = raw.trim()
  if (!text) return { replies: [], lead }

  const phone = extractPhone(text)
  const topic = classify(text)
  const expectingName = Boolean(lead.phone && !lead.name)
  const name = !lead.name ? extractName(text, Boolean(phone), expectingName) : undefined
  const next: Lead = {
    name: lead.name || name,
    phone: lead.phone || phone,
  }

  const replies: string[] = []
  if (topic !== 'fallback') replies.push(answerFor(topic))

  const city = mentionedCity(text.toLowerCase())
  if (topic === 'area' && city) {
    replies[0] = `Yes. ${city} is on Barney's route. He serves Rockwall, Collin, Dallas, and Kaufman counties. Call ${MAIN_PHONE_DISPLAY} for a free estimate, or send your name and number and he will call you back. I do not book the visit.`
  }

  const justFinished = Boolean(next.name && next.phone) && !(lead.name && lead.phone)
  if (justFinished && next.name && next.phone) {
    replies.push(
      `Thanks, ${next.name}. I have ${formatPhone(next.phone)} for Barney. He will call you back. I do not book the visit from here. If this is an emergency, call ${EMERGENCY_PHONE_DISPLAY} now.`,
    )
  } else if (phone && !next.name && phone !== lead.phone) {
    replies.push(`I have ${formatPhone(phone)}. What name should Barney ask for?`)
  } else if (name && !next.phone && name !== lead.name) {
    replies.push(`Thanks, ${name}. What number should Barney call?`)
  } else if (topic === 'fallback') {
    replies.push(answerFor('fallback'))
  }

  return { replies, lead: next }
}
