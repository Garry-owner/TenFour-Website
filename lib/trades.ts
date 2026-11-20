import { en } from '@/lib/copy/en'

// Trade values the contact form sends to Make.com. These are always the
// English names from the homepage calculator list, plus Other, whatever
// language the visitor is reading in.
export const TRADE_VALUES: string[] = [...en.calculator.trades]
export const TRADE_OTHER = 'Other'
export const ALLOWED_TRADES: string[] = [...TRADE_VALUES, TRADE_OTHER]
