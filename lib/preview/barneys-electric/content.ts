export const MAIN_PHONE_DISPLAY = '(972) 771-9464'
export const MAIN_PHONE_TEL = 'tel:9727719464'
export const EMERGENCY_PHONE_DISPLAY = '(214) 282-5842'
export const EMERGENCY_PHONE_TEL = 'tel:2142825842'

export const OWNER_QUOTE =
  "At Barney's Electric our owner, Barney Messenger, personally oversees every project we earn. If you ever have any questions or concerns, Barney will gladly be at your service."

export const CITIES = [
  'Dallas',
  'Fate',
  'Forney',
  'Garland',
  'Heath',
  'Josephine',
  'Lavon',
  'Mesquite',
  'Murphy',
  'Nevada',
  'Plano',
  'Richardson',
  'Rockwall',
  'Rowlett',
  'Royse City',
  'Sachse',
  'Sunnyvale',
  'Terrell',
  'Wylie',
] as const

export type ServiceItem = {
  id: string
  title: string
  text: string
}

export const RESIDENTIAL: ServiceItem[] = [
  {
    id: 'repair',
    title: 'Troubleshooting and repairs',
    text: 'Find the fault and fix it, from a dead outlet to a repair that has been waiting.',
  },
  {
    id: 'panel',
    title: 'Panels, breakers, and fuses',
    text: 'Upgrade a service panel, replace a fuse box, or change the breaker that will not hold.',
  },
  {
    id: 'outlets',
    title: 'Outlets and appliance circuits',
    text: 'Add outlets, run dedicated appliance circuits, and correct wiring that does not meet city code.',
  },
  {
    id: 'lighting',
    title: 'Lighting',
    text: 'Design and install interior, landscape, security, track, and accent lighting.',
  },
  {
    id: 'fans',
    title: 'Ceiling fans',
    text: 'Install ceiling fans, including the circuit and the support the fan needs.',
  },
  {
    id: 'generators',
    title: 'Generators and transfer switches',
    text: 'Set up home generators, transfer switches, and other backup power.',
  },
  {
    id: 'ev',
    title: 'EV charging',
    text: 'Install a 220v charging outlet or a high-speed electric car charger circuit.',
  },
  {
    id: 'rewire',
    title: 'Rewires and remodels',
    text: 'Rewire a house or wire a remodel to current code.',
  },
  {
    id: 'surge',
    title: 'Surge protection and safety outlets',
    text: 'Add whole-home surge protection, GFCI outlets, and AFCI protection where code requires it.',
  },
]

export const COMMERCIAL: ServiceItem[] = [
  {
    id: 'construction',
    title: 'New construction and additions',
    text: 'Wire new buildings and additions from the service to the last device.',
  },
  {
    id: 'remodel',
    title: 'Remodels and office work',
    text: 'Handle remodels, office renovations, and retail build-outs.',
  },
  {
    id: 'repairs',
    title: 'Repairs and code corrections',
    text: 'Make electrical repairs, replace breakers, and correct work that does not meet city code.',
  },
  {
    id: 'lighting',
    title: 'Shop and lot lighting',
    text: 'Install HID lighting, sign lighting, and outdoor and parking lot lighting.',
  },
  {
    id: 'motors',
    title: 'Motor controls',
    text: 'Install and repair motor controls for commercial equipment.',
  },
  {
    id: 'generators',
    title: 'Generators',
    text: 'Provide commercial and industrial generators and alternate power.',
  },
  {
    id: 'hoods',
    title: 'Kitchen hood vents',
    text: 'Power commercial kitchen hood vents and the circuits that feed them.',
  },
  {
    id: 'network',
    title: 'Network and computer circuits',
    text: 'Run structured network wiring and dedicated computer circuits.',
  },
  {
    id: 'phase',
    title: 'Phase power and receptacles',
    text: 'Add single-phase and three-phase circuits, plus specialty receptacles.',
  },
]

export const RESIDENTIAL_CALLOUT =
  'Also on the residential list: infrared inspection, CSST bonding and grounding, digital meter bases, electric water heaters, hot tub and spa lighting, and computer and telephone cabling. If you still do not see it, call. Barney will tell you whether he can do it.'

export const COMMERCIAL_CALLOUT =
  'Also on the commercial list: ballast and lamp replacement, fuse surge protectors, and sign lighting. If you do not see the job, call. Barney will tell you whether he can do it.'

export const REVIEWS = [
  {
    name: 'Linda',
    text: 'Early this morning I submitted an online Service Request and Barney called almost immediately. He and his worker came over immediately, noted that the wrong switch-type was installed, installed the correct switch, and the AC has been working great!',
  },
  {
    name: 'Laura',
    text: "Barney and Steve were on time, efficient, and their work was excellent. They were in and out in an hour and the charges were very reasonable. These guys are now MY electricians....ya'll don't go making them too busy for me now! :)",
  },
  {
    name: 'Laytwan',
    text: 'I called Barney to add a plug and breaker for my EV charger. He did a great job was in and out with no inconvenience. He was professional, knowledgeable and reasonably priced.',
  },
  {
    name: 'Janet',
    text: "We called and left a voicemail for Barney on Memorial Day weekend and he called almost immediately... The work looks great and he was incredibly professional and kind. Do yourself a favor and call Barney's for your electrical needs!",
  },
  {
    name: 'Cindy',
    text: "Called Barney's Electric and they worked us in quickly. Great communication and service. Barney and Steve showed up when they said they would and quickly fixed the problem.",
  },
] as const

export const SERVICE_OPTIONS = [
  'Troubleshooting or repair',
  'Panel, breaker, or fuse work',
  'Lighting',
  'Ceiling fan',
  'EV charger',
  'Generator or transfer switch',
  'Rewire or remodel',
  'Commercial or retail',
  'New construction',
  '24-hour emergency',
  'Something else',
] as const

export const QUICK_QUESTIONS = [
  'Do you give free estimates?',
  'Breaker keeps tripping',
  'EV charger installation',
  '24-hour emergency help',
] as const

export const OPENING_MESSAGE =
  "Hi. This is a demo of Roger, the assistant for Barney's Electric. Ask about a free estimate, a tripping breaker, an EV charger, or 24-hour help. I can also take your name and number so Barney can call you. I do not book appointments."
