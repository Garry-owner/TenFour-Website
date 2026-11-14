export const TRADE_SCRIPTS: { trade: string; greeting: string; questions: string }[] = [
  { trade: 'HVAC', greeting: 'Hi, this is Roger with {business}. We missed your call. What is going on with the heat or the air?', questions: 'What is your address?\nIs the system blowing air at all?\nHow soon do you need someone out?' },
  { trade: 'Plumbing', greeting: 'Hi, this is Roger with {business}. We missed your call. Is there a leak, a clog, or no water?', questions: 'What is your address?\nIs water still running?\nHow soon do you need someone out?' },
  { trade: 'Electrical', greeting: 'Hi, this is Roger with {business}. We missed your call. What is happening with the power?', questions: 'What is your address?\nIs a breaker tripped, or is a whole area out?\nHow soon do you need someone out?' },
  { trade: 'Roofing', greeting: 'Hi, this is Roger with {business}. We missed your call. Is the roof leaking, or do you need an inspection?', questions: 'What is your address?\nIs water coming inside right now?\nHow soon do you need someone out?' },
  { trade: 'Restoration', greeting: 'Hi, this is Roger with {business}. We missed your call. What needs to be dried out or cleaned up?', questions: 'What is your address?\nIs the water still coming in?\nHow soon do you need someone out?' },
  { trade: 'Garage Doors', greeting: 'Hi, this is Roger with {business}. We missed your call. Is the door stuck open, stuck shut, or off the track?', questions: 'What is your address?\nCan you still get the car out?\nHow soon do you need someone out?' },
  { trade: 'Landscaping', greeting: 'Hi, this is Roger with {business}. We missed your call. What do you need done outside?', questions: 'What is your address?\nIs this a one-time job or ongoing?\nWhat day works for a look?' },
  { trade: 'Pest Control', greeting: 'Hi, this is Roger with {business}. We missed your call. What pests are you seeing?', questions: 'What is your address?\nWhere in the house are you seeing them?\nHow soon do you need someone out?' },
  { trade: 'Solar', greeting: 'Hi, this is Roger with {business}. We missed your call. Is this about a new system or one that is already on the roof?', questions: 'What is your address?\nIs the system producing power?\nWhat day works for a look?' },
  { trade: 'Foundation Repair', greeting: 'Hi, this is Roger with {business}. We missed your call. Are you seeing cracks, sticking doors, or a slope in the floor?', questions: 'What is your address?\nWhen did you first notice it?\nHow soon do you need someone out?' },
  { trade: 'Fencing', greeting: 'Hi, this is Roger with {business}. We missed your call. Is a fence down, or do you want a new one?', questions: 'What is your address?\nAbout how many feet?\nWhat day works for a look?' },
  { trade: 'Tree Service', greeting: 'Hi, this is Roger with {business}. We missed your call. Is a tree down, or do you need trimming?', questions: 'What is your address?\nIs it touching a house or a line?\nHow soon do you need someone out?' },
  { trade: 'General Contracting', greeting: 'Hi, this is Roger with {business}. We missed your call. What kind of job is this?', questions: 'What is your address?\nIs this a repair or a bigger build?\nWhat day works for a look?' },
  { trade: 'Other trades', greeting: 'Hi, this is Roger with {business}. We missed your call. What do you need help with?', questions: 'What is your address?\nHow urgent is it?\nHow soon do you need someone out?' },
]

export function fillScript(text: string, business: string, booking: string): string {
  return text.replaceAll('{business}', business || 'the shop').replaceAll('{booking}', booking || 'the booking link')
}
