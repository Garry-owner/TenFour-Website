export const TRADES = [
  { id: "Roofing", en: "Roofing", es: "Techado", value: 9000 },
  { id: "HVAC", en: "HVAC", es: "Aire acondicionado", value: 8000 },
  { id: "Plumbing", en: "Plumbing", es: "Plomería", value: 350 },
  { id: "Electrical", en: "Electrical", es: "Electricidad", value: 350 },
  { id: "Restoration", en: "Restoration", es: "Restauración", value: 3900 },
  { id: "Garage Doors", en: "Garage Doors", es: "Puertas de garaje", value: 350 },
  { id: "Landscaping", en: "Landscaping", es: "Jardinería", value: 1500 },
  { id: "Pest Control", en: "Pest Control", es: "Control de plagas", value: 180 },
  { id: "Solar", en: "Solar", es: "Solar", value: 22000 },
  { id: "Foundation Repair", en: "Foundation Repair", es: "Reparación de cimientos", value: 6000 },
  { id: "Fencing", en: "Fencing", es: "Cercas", value: 3200 },
  { id: "Tree Service", en: "Tree Service", es: "Servicio de árboles", value: 850 },
  { id: "General Contracting", en: "General Contracting", es: "Contratista general", value: 5000 },
] as const

export type TradeId = (typeof TRADES)[number]["id"]

export function tradeLabel(id: TradeId) {
  const trade = TRADES.find((item) => item.id === id)
  if (!trade) throw new Error(`Unknown trade: ${id}`)
  return { en: trade.en, es: trade.es }
}
