export const en = {
  chrome: {
    skip: 'Skip to content',
    nav: [
      { path: '/how-it-works', label: 'How It Works' },
      { path: '/pricing', label: 'Pricing' },
      { path: '/about', label: 'About' },
      { path: '/roger', label: 'Meet Roger' },
      { path: '/faq', label: 'FAQ' },
    ],
    bookDemo: 'Join the Waitlist',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    footerBlurb:
      'Missed call text back for home service businesses. When you miss a call, Roger texts the caller back, asks a few questions, and sends the lead to you.',
    footerTagline: "We work the second shift so you don't have to.",
    navigate: 'Navigate',
    coverage: 'Featured Coverage',
    coverageNote: 'Serving home service trades across the DFW metroplex.',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    rights: 'All rights reserved.',
    homeLabel: 'TenFour Systems home',
    logoAlt: 'TenFour Systems logo',
    theme: 'Toggle theme',
    tradeIn: (trade: string, city: string) => `${trade} in ${city}`,
  },
  cta: {
    title: 'Stop losing jobs to voicemail.',
    subtitle:
      'Be one of the first contractors to try Roger.',
    book: 'Join the Waitlist',
    pricing: 'View Pricing',
  },
  hero: {
    badge: 'Watching for missed calls',
    titleBefore: 'We work the ',
    titleEmphasis: 'second shift',
    titleAfter: " so you don't have to.",
    body: 'Missed call text back for home service businesses. When you miss a call, Roger texts the caller back, asks a few questions, and sends the lead to you.',
    rogerAlt: 'Roger',
    roger:
      "The name comes from an old radio callsign, ten-four, message received. That's Roger's whole job. He doesn't sleep, doesn't take lunch, and doesn't let a missed call go cold.",
    primary: 'Join the Waitlist',
    secondary: 'See How It Works',
    stats: [
      { k: 'Nights and weekends', v: 'Covered' },
      { k: 'Fast', v: 'Text-back speed' },
    ],
  },
  industries: {
    eyebrow: 'Built for the trades',
    description: 'Tuned for home-service businesses where a missed call is a missed job.',
    items: [
      'Roofing',
      'HVAC',
      'Plumbing',
      'Electrical',
      'Restoration',
      'Garage Doors',
      'Landscaping',
      'Pest Control',
      'Solar',
      'Foundation Repair',
      'Fencing',
      'Tree Service',
      'General Contracting',
    ],
  },
  problem: {
    eyebrow: 'The Problem',
    title: 'The phone rings after 5 PM. Nobody answers. The job is gone.',
    description:
      "Home service owners can't sit by the phone 24/7, but their customers expect an answer the moment something breaks.",
    note: 'Source for 27%: Invoca research on calls to home services businesses (2024).',
    sourceLabel: 'Read the Invoca article',
    sourceUrl: 'https://invoca.com/blog/how-much-missed-sales-calls-cost-home-services-businesses',
    cards: [
      {
        stat: '27%',
        label: 'of calls to home-service businesses are not answered',
        body: 'Every ring that rolls to voicemail is a customer who may call the next name on the list.',
      },
      {
        stat: 'After 5 PM',
        label: 'is when a lot of trouble starts',
        body: 'Storms, leaks, and outages do not keep business hours, and neither should your phone.',
      },
      {
        stat: 'One call',
        label: 'can be a big job',
        body: 'A single missed emergency call can send a big job straight to a competitor.',
      },
    ],
  },
  capabilities: {
    eyebrow: 'The System',
    title: 'Your missed callers get a text back, automatically',
    description:
      "When you can't get to the phone, TenFour texts the caller back so your crew stays on the roof, not on the phone.",
    items: [
      {
        title: 'Texts back missed calls',
        body: 'When your phone goes unanswered, Roger texts that caller back fast, nights and weekends included. No hold music and no dead-end voicemail.',
      },
      {
        title: 'Qualifies the lead',
        body: 'Asks the right questions for your trade, including service type, location, and urgency.',
      },
      {
        title: 'Delivers a ready lead',
        body: 'Qualifies the caller and texts your booking link when you have one. Otherwise you get what you need to book the job.',
      },
      {
        title: 'Confirms the request',
        body: 'Sends the caller a text confirming their request was received and someone will follow up.',
      },
      {
        title: 'Notifies your team',
        body: 'Each qualified lead is sent to you with the text conversation and the details that matter.',
      },
      {
        title: 'Sounds like your brand',
        body: 'Custom text-back script and tone tuned to your business, so callers get a seamless experience.',
      },
    ],
  },
  proof: {
    items: [
      { k: 'Captured', v: 'After-hours missed calls', note: 'nights, weekends, holidays' },
      { k: 'Faster', v: 'Fast, not hours later', note: 'a text back while the caller is still looking' },
      { k: 'Qualified', v: 'Ready for you', note: 'your link, or a lead your team can book' },
    ],
  },
  steps: {
    eyebrow: 'How It Works',
    title: 'Set up fast. Stop losing leads.',
    description: 'No apps to babysit, no scripts to memorize. We handle the wiring, you get your evenings back.',
    items: [
      {
        title: 'We watch your line',
        body: 'Roger connects to your existing business number and watches for any call that goes unanswered. We handle the setup for you.',
      },
      {
        title: 'We tune Roger',
        body: 'We script your text-back message and qualifying questions around your trade, service area, and hours, and add your booking link when you have one.',
      },
      {
        title: 'Missed callers get a text',
        body: "When a call goes unanswered, Roger texts that caller back fast, so they're less likely to call the next name on their list.",
      },
      {
        title: 'You get the lead',
        body: 'If you have a booking link, Roger texts it so the customer can book themselves. Otherwise the lead, the text conversation, and callback details land with your team.',
      },
    ],
  },
  calculator: {
    eyebrow: 'Free tool',
    heading: 'What are missed calls costing you?',
    trade: 'Trade',
    choose: 'Choose your trade',
    calls: 'Missed calls per week',
    value: 'Average job value',
    rate: 'Estimated close rate',
    month: 'Estimated / month',
    year: 'Estimated / year',
    formula:
      'formula: (missed calls per week × 4.33 weeks) × close rate × average job value.',
    estimate: 'This is a rough estimate, not a promise. Your real numbers will be different.',
    sources:
      'Job values are rough averages. Adjust the sliders to match your business.',
    trades: [
      'Roofing',
      'HVAC',
      'Plumbing',
      'Electrical',
      'Restoration',
      'Garage Doors',
      'Landscaping',
      'Pest Control',
      'Solar',
      'Foundation Repair',
      'Fencing',
      'Tree Service',
      'General Contracting',
    ],
  },
  race: {
    watching: 'WATCHING FOR MISSED CALLS',
    onIt: 'ROGER IS ON IT',
    missed: 'Missed call.',
    money: 'Money on the line.',
    ready: 'Lead sent to you.',
    caption: 'Time since the call was missed',
    example: 'Example',
    sequence: 'Incident response sequence',
    avoided: 'AVOIDED',
    steps: [
      'Missed call',
      'Customer hangs up',
      'Roger texts back',
      'Calls a competitor',
      'Lead sent to you',
    ],
  },
  about: {
    eyebrow: 'About',
    title: 'Stop losing jobs to missed calls.',
    description:
      "TenFour Systems was built for the owner who's up on the roof, under the sink, or asleep after a 14 hour day, and can't get to the phone.",
    storyEyebrow: 'Our Story',
    storyTitle: "I work the second shift so you don't have to",
    storyDescription:
      "Home service owners are the hardest working people I know. But there are only so many hours in a day, and the calls never stop coming.",
    paragraphs: [
      'I started TenFour Systems after watching great local contractors lose real money to something completely fixable: a phone that rang when nobody could pick it up. A leak at midnight, a storm on a Saturday, a customer who simply calls the next name on the list.',
      "With over 35 years in IT, plus a background in commercial insurance, I'm building a system that keeps working after you clock out. When a call goes unanswered, it texts that caller back in your business name, asks a few questions over text, then sends you the lead with what you need to follow up.",
      "I'm proud to be based in Terrell, Texas, serving home-service businesses that refuse to let a ringing phone go to waste.",
    ],
    valuesEyebrow: 'What I Believe',
    valuesTitle: 'The principles behind Roger',
    values: [
      {
        title: 'On the air after hours',
        body: '"Ten-four" means message received. That is the idea: a missed call gets a text back instead of silence.',
      },
      {
        title: '35 plus years in IT',
        body: 'Decades building and running technical systems, plus a background in commercial insurance, mean this is built by someone who understands both the automation and the risk.',
      },
      {
        title: 'Speed wins jobs',
        body: 'The first business to respond often wins the work. TenFour helps make that business yours.',
      },
    ],
    location: 'Proudly based in Terrell, Texas',
    ctaTitle: "Let's stop the next missed call from going cold.",
    ctaSubtitle:
      'Be one of the first contractors to try Roger. Join the waitlist today.',
  },
  how: {
    eyebrow: 'How It Works',
    title: 'Your second shift, fully automated',
    description:
      'TenFour watches for missed calls on your line. Roger texts each caller back, asks a few questions, sends your booking link when you have one, and otherwise sends the lead to your team.',
    flowEyebrow: 'The Call Flow',
    flowTitle: 'What happens on a missed call',
    flowDescription:
      "Here's the exact path a caller takes from a missed call to your booking link, or a lead your team can book.",
    flow: [
      {
        title: 'A call goes unanswered',
        body: 'A homeowner calls after hours with a leak. Nobody picks up, and the call goes unanswered.',
      },
      {
        title: 'Roger texts back fast',
        body: "Roger sends that caller a text right away, so they're less likely to call the next name on their list.",
      },
      {
        title: 'The lead is qualified',
        body: 'Over text, it captures service type, address, urgency, and budget signals using your custom script.',
      },
      {
        title: 'The lead is sent to you',
        body: 'If you have a booking link, Roger texts it so the customer can book. Otherwise the lead and the text conversation land with your team.',
      },
    ],
    includedEyebrow: "What's Included",
    includedTitle: 'Help with missed calls, minus the payroll',
    includedDescription: 'One flat system for missed calls, voicemail tag, and after-hours chaos.',
    included: [
      'Custom text-back script for your trade',
      'Lead qualification tuned to your service area',
      'Confirmation text that a request was received',
      'Lead alerts with the text conversation',
      "Responds automatically in the lead's language",
    ],
  },
  pricing: {
    eyebrow: 'Pricing',
    title: 'Flat pricing. No missed-call math.',
    description:
      'One booked job can cover the month. Every plan includes setup, tuning, and missed call text back on nights and weekends.',
    plans: [
      {
        name: 'Base',
        tag: 'Get started',
        price: '$299',
        cadence: '/mo',
        setup: '$299 one time setup fee',
        blurb: 'Automated text response to missed calls and web inquiries, with full CRM tracking.',
        features: [
          'Automated text response to missed calls and web inquiries',
          'Full lead and CRM tracking',
          'Standard monthly message quota',
          'One dedicated phone number',
        ],
        cta: 'Start with Base',
      },
      {
        name: 'Pro',
        tag: 'Most popular',
        price: '$499',
        cadence: '/mo',
        setup: '$499 one time setup fee',
        blurb: 'Everything in Base, plus storm reactive follow up for weather driven trades.',
        features: [
          'Everything in Base',
          'Storm reactive re engagement for weather driven trades',
          'Higher message quota',
          'Priority support',
        ],
        cta: 'Start with Pro',
      },
      {
        name: 'Elite',
        tag: 'Full coverage',
        price: '$699',
        cadence: '/mo',
        setup: '$699 one time setup fee',
        blurb: 'Everything in Pro, plus an emergency phone alert for your most urgent leads.',
        features: [
          'Everything in Pro',
          'Emergency phone call alert for urgent leads',
          'Highest quota ceiling',
          'Dedicated onboarding',
        ],
        cta: 'Start with Elite',
      },
    ],
    overageTitle: 'Overage billing',
    overageBody:
      "Messages beyond your plan's monthly quota are billed at 5 cents per message, logged automatically and billed at month end. No surprise overages, no service gaps.",
    offerTitle: 'Founding client offer',
    offerBody:
      "We're waiving the setup fee for our first 10 clients. In return, we ask for an honest review and permission to share how many leads Roger saved you. Your monthly plan is full price from day one.",
    contracts: 'Month to month. No contracts.',
    questions: 'Questions? Talk to us',
    ctaTitle: 'Not sure which plan fits?',
    ctaSubtitle:
      'Tell us your call volume and trade. We will recommend the right setup and save your spot on the waitlist.',
  },
  roger: {
    eyebrow: 'Meet Roger',
    title: 'The one who texts back your missed calls',
    description: 'Roger is the one who texts back when your phone goes unanswered.',
    alt: 'Roger',
    paragraphs: [
      "The name comes from an old radio callsign, ten-four, message received. That's Roger's whole job. He doesn't sleep, doesn't take lunch, and doesn't let a missed call go cold.",
      "When a call to your business goes unanswered, Roger texts that caller back fast, so they're less likely to call the next name on their list. He asks a few questions for your trade, gets the details you need, and sends the lead to you.",
      "Roger doesn't answer calls and doesn't book appointments. That's honest, and it's by design. What he does is faster than voicemail and cheaper than a full-time dispatcher.",
    ],
    ctaTitle: 'Be one of the first to try Roger',
    ctaSubtitle: 'Join the waitlist and we will let you know when Roger is ready for your business.',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions people actually ask',
    description: 'Straight answers about how Roger works, no hype.',
    items: [
      {
        q: 'Does Roger replace my receptionist?',
        a: "Not entirely. Roger texts back the calls nobody could get to, after hours or mid-job, asks a few questions, and sends you the lead. It's built for the calls that would have gone to voicemail, not to replace a front desk you already have covered.",
      },
      {
        q: 'Does Roger answer the phone live?',
        a: "No, and we're upfront about that. Roger works entirely over text. When a call to your business goes unanswered, Roger texts that customer back, asks the right questions for your trade, and sends you the lead. He doesn't answer calls and doesn't book appointments.",
      },
      {
        q: 'What happens after hours or on weekends?',
        a: 'The same thing that happens during the day. Roger is built to text back missed calls on nights, weekends, and holidays too.',
      },
      {
        q: 'Do I need to change my phone number?',
        a: 'No. Roger works alongside your existing business number using a standard phone feature called conditional call forwarding, only unanswered calls get forwarded to Roger. Your number stays exactly the same, and answered calls work exactly like they do today.',
      },
      {
        q: 'How fast does Roger actually respond?',
        a: 'Fast. Roger sends the text as soon as the missed call comes through, so the caller hears from you while they are still looking.',
      },
      {
        q: 'What if a customer wants pricing right away?',
        a: "Roger doesn't give firm pricing or arrival times over text. He asks about the service type, location, and urgency, then sends that lead straight to you with the details so you can follow up with real numbers.",
      },
      {
        q: 'Is there a long-term contract?',
        a: 'No. TenFour runs month to month.',
      },
    ],
    ctaTitle: 'Still have questions?',
    ctaSubtitle: "Join the waitlist and we'll walk through exactly how it would work for your business.",
  },
  contact: {
    eyebrow: 'Join the Waitlist',
    title: 'Be one of the first to try Roger',
    description:
      "Roger isn't launched yet. Tell us about your business and we'll save your spot and reach out when he's ready for your trade.",
    heading: "Let's get you on the list",
    intro: "Fill out the form and we'll reach out about early access. Prefer to talk first? Reach us directly below.",
    cards: [
      { label: 'Email', value: 'garry@tenfoursystems.com', href: 'mailto:garry@tenfoursystems.com' },
      { label: 'Phone', value: '(972) 349 5808', href: 'tel:+19723495808' },
      { label: 'Based in', value: 'Terrell, Texas', href: '' },
      { label: 'Built for', value: 'After-hours missed calls', href: '' },
    ],
    online: 'Coming soon',
    onlineBody:
      'Roger is getting ready for launch. Once your line is set up, missed calls get a text back, days, nights, and weekends included.',
  },
  form: {
    first: 'First name',
    firstPlaceholder: 'Jordan',
    last: 'Last name',
    lastPlaceholder: 'Rivera',
    phone: 'Phone',
    phonePlaceholder: '(214) 555 0148',
    email: 'Email',
    emailPlaceholder: 'you@business.com',
    message: 'What are you hoping to fix? (optional)',
    messagePlaceholder: 'We miss a lot of after hours calls during storm season.',
    timezone: 'What time zone are you in?',
    timezonePlaceholder: 'Select your time zone',
    zones: [
      { value: 'Eastern', label: 'Eastern' },
      { value: 'Central', label: 'Central' },
      { value: 'Mountain', label: 'Mountain' },
      { value: 'Pacific', label: 'Pacific' },
    ],
    consent:
      'By checking this box, I agree to receive automated text messages from TenFour Systems at the number provided, regarding my service inquiry, appointment scheduling, and follow-up updates. Message frequency varies. Consent is not a condition of purchase. Msg and data rates may apply. Reply HELP for help or STOP to opt out. See our {{privacy}} and {{terms}}.',
    sending: 'Sending',
    submit: 'Join the Waitlist',
    error:
      'Something went wrong. Please email garry@tenfoursystems.com or call (972) 349 5808 directly.',
    fine: 'No spam. No obligation. We respond fast.',
    doneTitle: 'Message received. Ten four.',
    doneBody:
      "Thanks for reaching out. You're on the list, and we'll be in touch about early access.",
    another: 'Submit another request',
    honeypot: 'Company Website',
  },
  notFound: {
    title: 'Looks like this page went missing.',
    body: 'Kind of like a call nobody caught. Unlike this page, Roger would have texted you back already.',
    home: 'Back to home',
    demo: 'Join the Waitlist',
  },
  serviceArea: {
    ctaSubtitle: 'Join the waitlist and be one of the first contractors to try Roger.',
  },
  privacy: {
    title: 'Privacy Policy',
    updated: 'Last updated: October 29, 2026',
    sections: [
      {
        heading: '1. Who we are',
        paragraphs: [
          'TenFour Systems ("TenFour," "we," "us") operates tenfoursystems.com and provides automated SMS dispatch services to contractor businesses. This policy explains what information we collect through our website and how we use it.',
        ],
      },
      {
        heading: '2. Information we collect',
        paragraphs: [
          'When you submit our contact form, we collect your name, email address, phone number, the message you submit, whether you checked the SMS consent box and when, and the page you submitted the form from. We do not collect payment information through the website directly; billing for signed clients is handled through our payment processor, Stripe.',
        ],
      },
      {
        heading: '3. How we use your information',
        paragraphs: [
          'We use the information you provide to respond to your inquiry, send you automated text messages if you checked the consent box, maintain records of consent as required by the Telephone Consumer Protection Act (TCPA), and improve our services and website.',
        ],
      },
      {
        heading: '4. Text messaging (SMS)',
        paragraphs: [
          'If you check the consent box on our form, you agree to receive automated text messages from TenFour Systems at the number provided. Consent is not a condition of purchase. Message and data rates may apply. Message frequency varies. Reply STOP at any time to opt out, or reply HELP for help.',
        ],
      },
      {
        heading: '5. How we share your information',
        paragraphs: [
          'We use the following third-party service providers to operate our business, and your information may be processed by them: Zoho CRM (record-keeping), Make.com (automation), Twilio (sending text messages), and Stripe (payment processing, for signed clients). We do not sell your personal information to third parties, and we do not share it outside of these service providers except as required by law. Mobile information and SMS opt-in consent will not be shared with third parties or affiliates for marketing or promotional purposes.',
        ],
      },
      {
        heading: '6. Data security',
        paragraphs: [
          'We take reasonable steps to protect the information you provide, including field-level security on sensitive data within our CRM. No method of electronic storage or transmission is completely secure, and we cannot guarantee absolute security.',
        ],
      },
      {
        heading: '7. Data retention',
        paragraphs: [
          "We retain your information for as long as necessary to provide our services and maintain required compliance records, including TCPA consent evidence, or as required by law.",
        ],
      },
      {
        heading: '8. Your rights',
        paragraphs: [
          "You may reply STOP to any text message to opt out of future messages, reply HELP for help, or contact us at {{email}} to ask what information we have about you or to request deletion, subject to any records we're legally required to retain.",
        ],
      },
      {
        heading: "9. Children's privacy",
        paragraphs: [
          'Our website and services are directed at business owners and are not intended for use by anyone under 18. We do not knowingly collect information from children.',
        ],
      },
      {
        heading: '10. Changes to this policy',
        paragraphs: [
          'We may update this policy from time to time. The "Last updated" date above reflects the most recent changes.',
        ],
      },
      {
        heading: '11. Contact us',
        paragraphs: ['Questions about this policy can be directed to {{email}}.'],
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    updated: 'Last updated: October 29, 2026',
    sections: [
      {
        heading: '1. Agreement to terms',
        paragraphs: [
          'These Terms of Service govern your use of the TenFour Systems website and services. By using our website or interacting with our text-messaging service, you agree to these terms.',
        ],
      },
      {
        heading: '2. Our service',
        paragraphs: [
          'TenFour Systems provides an automated missed-call text-back and lead qualification service to home-service businesses. TenFour acts as a communication bridge between a business and its customers and is not itself the provider of home-service work.',
        ],
      },
      {
        heading: '3. Text messages',
        paragraphs: [
          'TenFour Systems sends text messages under the program name TenFour Systems / Roger text messages. If you join the waitlist or ask about early access, these messages are responses to that request, regarding your service inquiry, appointment scheduling, and follow-up updates. For client businesses, Roger replies to people who called and missed a connection.',
          'Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase. Reply STOP to opt out and HELP for help. For support, email {{email}} or call (972) 349 5808. Carriers are not liable for delayed or undelivered messages. See our {{privacy}}.',
          'Client businesses that use Roger are responsible for having proper consent to text their callers and contacts, including any re-engagement or follow-up messages, and agree to comply with the TCPA and carrier rules.',
        ],
      },
      {
        heading: '4. Client accounts',
        paragraphs: [
          'Client businesses may cancel their subscription at any time by contacting us. Setup fees are non-refundable once engineering work on an account has begun. Upon cancellation, we stop billing going forward and handle any remaining data according to our Privacy Policy.',
        ],
      },
      {
        heading: '5. Acceptable use',
        paragraphs: [
          'You agree not to use our service for any unlawful purpose, or to send messages to recipients who have not consented to be contacted.',
        ],
      },
      {
        heading: '6. Limitation of liability',
        paragraphs: [
          'TenFour Systems provides lead qualification and communication services and is not responsible for the quality, timeliness, or outcome of any home-service work performed by a client business. To the fullest extent permitted by law, TenFour is not liable for indirect, incidental, or consequential damages arising from use of our service.',
        ],
      },
      {
        heading: '7. Changes to these terms',
        paragraphs: [
          'We may update these terms from time to time. The "Last updated" date above reflects the most recent changes.',
        ],
      },
      {
        heading: '8. Contact us',
        paragraphs: ['Questions about these terms can be sent to {{email}}.'],
      },
    ],
  },
}
