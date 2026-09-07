export type ServiceArea = {
  slug: string
  city: string
  trade: string
  landmark: string
  blurb: string
}

export const SERVICE_AREAS: ServiceArea[] = [
  {
    slug: 'rockwall-roofing',
    city: 'Rockwall',
    trade: 'Roofing',
    landmark: 'Lake Ray Hubbard',
    blurb:
      'Storm season around Lake Ray Hubbard means the phone rings the second hail hits. Roger catches every missed call so no Rockwall homeowner ends up calling your competitor instead.',
  },
  {
    slug: 'mckinney-hvac',
    city: 'McKinney',
    trade: 'HVAC',
    landmark: 'Historic Square',
    blurb:
      'A dead air conditioner in a McKinney summer cannot wait for a callback. Roger texts that customer back in seconds, day or night, so the job stays yours.',
  },
  {
    slug: 'terrell-foundation-repair',
    city: 'Terrell',
    trade: 'Foundation Repair',
    landmark: 'the Historic District',
    blurb:
      'Terrell homes built on North Texas clay soil see real foundation movement. When a worried homeowner calls after hours, Roger makes sure that call gets answered.',
  },
]
