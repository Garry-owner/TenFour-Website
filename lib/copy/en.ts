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
    live: 'Live',
    bookDemo: 'Book a Demo',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    footerBlurb:
      'The 24/7 AI dispatcher for home service businesses. We catch every missed call and text back so no lead goes cold.',
    footerTagline: "We work the second shift so you don't have to.",
    navigate: 'Navigate',
    coverage: 'Featured Coverage',
    coverageNote: 'Serving every trade across the full DFW metroplex.',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    rights: 'All rights reserved.',
    status: 'Status:',
    operational: 'Operational',
    homeLabel: 'TenFour Systems home',
    logoAlt: 'TenFour Systems logo',
    theme: 'Toggle theme',
    tradeIn: (trade: string, city: string) => `${trade} in ${city}`,
  },
  cta: {
    title: 'Stop losing jobs to voicemail.',
    subtitle:
      'See how fast Roger catches a missed call and texts your next customer back, before your competitor does.',
    book: 'Book a Demo',
    pricing: 'View Pricing',
  },
  hero: {
    badge: 'Watching for missed calls',
    titleBefore: 'We work the ',
    titleEmphasis: 'second shift',
    titleAfter: " so you don't have to.",
    body: "TenFour Systems catches every missed call for home-service businesses. The moment you can't pick up, Roger texts that caller back within seconds, before they can call the next name on their list.",
    rogerAlt: 'Roger',
    roger:
      "The name comes from an old radio callsign, ten-four, message received. That's Roger's whole job. He doesn't sleep, doesn't take lunch, and doesn't let a call go unanswered.",
    primary: 'Book a Demo',
    secondary: 'See How It Works',
    stats: [
      { k: '24/7', v: 'Always watching' },
      { k: 'Seconds', v: 'Text-back speed' },
      { k: '0', v: 'Missed leads' },
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
    note: 'Industry figures based on published missed-call and home-service revenue studies.',
    cards: [
      {
        stat: '62%',
        label: 'of calls to small businesses go unanswered',
        body: 'Every ring that rolls to voicemail is a customer who calls the next name on the list.',
      },
      {
        stat: '27%',
        label: 'of home-service calls are never picked up',
        body: 'Storms, leaks, and outages do not keep business hours, and neither should your phone.',
      },
      {
        stat: '$1,200+',
        label: 'average value of a missed home-service call',
        body: 'A single missed emergency call can walk thousands of dollars straight to a competitor.',
      },
    ],
  },
  capabilities: {
    eyebrow: 'The System',
    title: 'A full dispatch desk, running on autopilot',
    description:
      'TenFour handles the entire front-of-house call flow so your crew stays on the roof, not on the phone.',
    items: [
      {
        title: 'Catches every missed call',
        body: 'The moment your phone goes unanswered, Roger texts that caller back within seconds, 24/7/365. No hold music, no dead-end voicemail, no missed opportunity.',
      },
      {
        title: 'Qualifies the lead',
        body: 'Asks the right questions for your trade, including service type, location, and urgency, and filters out tire kickers.',
      },
      {
        title: 'Delivers a ready lead',
        body: 'Qualifies the caller and texts your booking link when you have one. Otherwise you get what you need to book the job.',
      },
      {
        title: 'Confirms the request',
        body: 'Sends the caller an instant text confirming their request was received and someone will follow up.',
      },
      {
        title: 'Notifies your team',
        body: 'Every qualified lead is pushed to you in real time with a full transcript and the details that matter.',
      },
      {
        title: 'Sounds like your brand',
        body: 'Custom text-back script and tone tuned to your business, so callers get a seamless experience.',
      },
    ],
  },
  proof: {
    items: [
      { k: 'Captured', v: 'Every after-hours call', note: 'nights, weekends, holidays' },
      { k: 'Faster', v: 'Seconds, not hours', note: 'texted back before they call a competitor' },
      { k: 'Qualified', v: 'Ready to book', note: 'your link, or a lead your team can book' },
    ],
  },
  steps: {
    eyebrow: 'How It Works',
    title: 'Live in a day. Answering forever.',
    description: 'No apps to babysit, no scripts to memorize. We handle the wiring, you get your evenings back.',
    items: [
      {
        title: 'We watch your line',
        body: 'Roger connects to your existing business number and watches for any call that goes unanswered. Setup takes minutes, not weeks.',
      },
      {
        title: 'We tune Roger',
        body: 'We script your text-back message and qualifying questions around your trade, service area, and hours, and add your booking link when you have one.',
      },
      {
        title: 'Missed calls get caught',
        body: 'The moment a call goes unanswered, Roger texts that caller back before they can call the next name on their list.',
      },
      {
        title: 'You get the lead',
        body: 'If you have a booking link, Roger texts it so the customer can book themselves. Otherwise a ready to book lead, transcript, and callback details land with your team.',
      },
    ],
  },
  calculator: {
    eyebrow: 'Free tool',
    heading: 'What are missed calls costing you?',
    trade: 'Trade',
    calls: 'Missed calls per week',
    value: 'Average job value',
    rate: 'Estimated close rate',
    month: 'Estimated / month',
    year: 'Estimated / year',
    formula:
      'formula: (missed calls per week × 4.33 weeks) × close rate × average job value.',
    sources:
      'Job value estimates based on 2026 national and Texas-regional pricing data from Angi, HomeAdvisor, and Consumer Affairs. Your actual job values may differ, adjust the sliders to match your business.',
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
    ready: 'Ready to book.',
    caption: 'Time since the call was missed',
    sequence: 'Incident response sequence',
    avoided: 'AVOIDED',
    steps: [
      'Missed call',
      'Customer hangs up',
      'Roger texts back',
      'Calls a competitor',
      'Lead ready to book',
    ],
  },
  about: {
    eyebrow: 'About',
    title: 'No job lost to a missed call. Ever.',
    description:
      "TenFour Systems was built for the owner who's up on the roof, under the sink, or asleep after a 14 hour day, and can't get to the phone.",
    storyEyebrow: 'Our Story',
    storyTitle: "I work the second shift so you don't have to",
    storyDescription:
      "Home service owners are the hardest working people I know. But there are only so many hours in a day, and the calls never stop coming.",
    paragraphs: [
      'I started TenFour Systems after watching great local contractors lose real money to something completely fixable: a phone that rang when nobody could pick it up. A leak at midnight, a storm on a Saturday, a customer who simply calls the next name on the list.',
      'With over 35 years in IT, plus a background in commercial insurance, I built a system that never clocks out. The moment a call goes unanswered, it texts that caller back in your business name, qualifies them over text, and gets them ready to book, then hands you the lead with everything you need to show up ready.',
      "I'm proud to be based in Terrell, Texas, serving home-service businesses that refuse to let a ringing phone go to waste.",
    ],
    valuesEyebrow: 'What I Believe',
    valuesTitle: 'The principles behind the dispatcher',
    values: [
      {
        title: 'Always on the air',
        body: '"Ten-four" means message received. That is the promise: every call gets received, acknowledged, and handled.',
      },
      {
        title: '35 plus years in IT',
        body: 'Decades building and running technical systems, plus a background in commercial insurance, mean this is built by someone who understands both the automation and the risk.',
      },
      {
        title: 'Speed wins jobs',
        body: 'The first business to answer usually wins the work. TenFour makes sure that business is always yours.',
      },
    ],
    location: 'Proudly based in Terrell, Texas',
    ctaTitle: "Let's make sure you never miss another one.",
    ctaSubtitle:
      'See how fast Roger catches a missed call and texts your next customer back. Book a demo today.',
  },
  how: {
    eyebrow: 'How It Works',
    title: 'Your second shift, fully automated',
    description:
      'TenFour watches for missed calls on your line. Roger qualifies each one, sends your booking link when you have one, and otherwise hands your team a ready to book lead.',
    flowEyebrow: 'The Call Flow',
    flowTitle: 'What happens on every missed call',
    flowDescription:
      "Here's the exact path a caller takes from a missed call to your booking link, or a lead your team can book.",
    flow: [
      {
        title: 'A call goes unanswered',
        body: 'A homeowner calls after hours with a leak. Nobody picks up, and the call goes unanswered.',
      },
      {
        title: 'Roger texts back instantly',
        body: 'Within seconds, Roger sends that caller a text, before they can call the next name on their list.',
      },
      {
        title: 'The lead is qualified',
        body: 'Over text, it captures service type, address, urgency, and budget signals using your custom script.',
      },
      {
        title: 'The lead is sent to you',
        body: 'If you have a booking link, Roger texts it so the customer can book. Otherwise a ready to book lead and full transcript land with your team.',
      },
    ],
    includedEyebrow: "What's Included",
    includedTitle: 'Everything a front desk hire would do, minus the payroll',
    includedDescription: 'One flat system that replaces missed calls, voicemail tag, and after-hours chaos.',
    included: [
      'Custom text-back script for your trade',
      'Lead qualification tuned to your service area',
      'Instant confirmation text that a request was received',
      'Real-time lead alerts with full transcripts',
      "Responds automatically in the lead's language",
    ],
  },
  pricing: {
    eyebrow: 'Pricing',
    title: 'Flat pricing. No missed-call math.',
    description:
      'One booked job usually covers the month. Every plan includes setup, tuning, and a dispatcher that never sleeps.',
    plans: [
      {
        name: 'Base Dispatch',
        tag: 'Get started',
        price: '$299',
        cadence: '/mo',
        setup: '$699 one time setup fee',
        blurb: 'Instant automated response to every missed call and web inquiry, with full CRM tracking.',
        features: [
          'Instant automated text response to every missed call and web inquiry',
          'Full lead and CRM tracking',
          'Standard monthly message quota',
          'One dedicated phone number',
        ],
        cta: 'Start with Base Dispatch',
      },
      {
        name: 'Pro Dispatch',
        tag: 'Most popular',
        price: '$499',
        cadence: '/mo',
        setup: '$899 one time setup fee',
        blurb: 'Everything in Base Dispatch, plus storm reactive follow up for weather driven trades.',
        features: [
          'Everything in Base Dispatch',
          'Storm reactive re engagement for weather driven trades',
          'Higher message quota',
          'Priority support',
        ],
        cta: 'Start with Pro Dispatch',
      },
      {
        name: 'Elite Full Stack',
        tag: 'Full coverage',
        price: '$799',
        cadence: '/mo',
        setup: '$1,199 one time setup fee',
        blurb: 'Everything in Pro Dispatch, plus an emergency phone alert for your most urgent leads.',
        features: [
          'Everything in Pro Dispatch',
          'Emergency phone call alert for urgent leads',
          'Highest quota ceiling',
          'Dedicated onboarding',
        ],
        cta: 'Start with Elite Full Stack',
      },
    ],
    overageTitle: 'Overage billing',
    overageBody:
      "Messages beyond your plan's monthly quota are billed at 5 cents per message, logged automatically and billed at month end. No surprise overages, no service gaps.",
    offerTitle: 'New client offer',
    offerBody:
      'Your first month is billed at 50 percent off. After three full paid months, your fourth month is completely free. A one time welcome, not a recurring discount.',
    contracts: 'No long term contracts.',
    questions: 'Questions? Talk to us',
    ctaTitle: 'Not sure which plan fits?',
    ctaSubtitle:
      'Tell us your call volume and trade. We will recommend the right setup and show you a live demo.',
  },
  roger: {
    eyebrow: 'Meet Roger',
    title: 'The one who never misses a call',
    description: "Roger is TenFour's AI dispatcher, on the job 24/7.",
    alt: 'Roger',
    paragraphs: [
      "The name comes from an old radio callsign, ten-four, message received. That's Roger's whole job. He doesn't sleep, doesn't take lunch, and doesn't let a call go unanswered.",
      "The moment a call to your business goes unanswered, Roger texts that caller back within seconds, before they can call the next name on their list. He asks the right questions for your trade, gets the details you need, and hands you a ready lead, all before the phone would've rung a fourth time.",
      "Roger doesn't answer live calls today, that's honest, and it's by design. What he does is faster than voicemail and cheaper than a full-time dispatcher, and he never has an off day.",
    ],
    ctaTitle: 'See Roger catch a missed call',
    ctaSubtitle: 'Book a demo and watch exactly how it works.',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions people actually ask',
    description: 'Straight answers about how Roger works, no hype.',
    items: [
      {
        q: 'Does Roger replace my receptionist?',
        a: "Not entirely. Roger catches the calls nobody could get to, missed calls, after-hours, mid-job, and turns them into qualified, ready-to-book leads over text. It's built for the calls that would have gone to voicemail, not to replace a front desk you already have covered.",
      },
      {
        q: 'Does Roger answer the phone live?',
        a: "No, and we're upfront about that. Roger works entirely over text. The moment a call to your business goes unanswered, Roger texts that customer back within seconds, asks the right questions for your trade, and hands you a ready lead. There's no live voice conversation today.",
      },
      {
        q: 'What happens after hours or on weekends?',
        a: "The same thing that happens during the day. Roger doesn't have hours, he watches for missed calls 24/7/365, including nights, weekends, and holidays.",
      },
      {
        q: 'Do I need to change my phone number?',
        a: 'No. Roger works alongside your existing business number using a standard phone feature called conditional call forwarding, only unanswered calls get forwarded to Roger. Your number stays exactly the same, and answered calls work exactly like they do today.',
      },
      {
        q: 'How fast does Roger actually respond?',
        a: 'Within seconds of a call going unanswered, well before most callers give up and dial the next business on their list.',
      },
      {
        q: 'What if a customer wants pricing right away?',
        a: 'Roger never gives firm pricing or arrival times over text. He qualifies the lead, service type, location, urgency, and gets them ready to book, then hands that lead straight to you with full details so you can follow up with real numbers.',
      },
      {
        q: 'Is there a long-term contract?',
        a: 'No. TenFour runs month to month.',
      },
    ],
    ctaTitle: 'Still have questions?',
    ctaSubtitle: "Book a demo and we'll walk through exactly how it would work for your business.",
  },
  contact: {
    eyebrow: 'Book a Demo',
    title: 'See Roger catch a missed call',
    description:
      "Tell us about your business and we'll set up a live demo tuned to your trade. You'll see exactly how Roger texts your callers back.",
    heading: "Let's get you on the air",
    intro: "Fill out the form and we'll reach out to schedule your demo. Prefer to talk first? Reach us directly below.",
    cards: [
      { label: 'Email', value: 'garry@tenfoursystems.com', href: 'mailto:garry@tenfoursystems.com' },
      { label: 'Phone', value: '(972) 349 5808', href: 'tel:+19723495808' },
      { label: 'Based in', value: 'Terrell, Texas', href: '' },
      { label: 'Dispatcher hours', value: '24 / 7 / 365', href: '' },
    ],
    online: 'Dispatcher online',
    onlineBody:
      "Your future callers never hit voicemail again. The moment you're live, every missed call gets a text back, days, nights, and weekends included.",
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
    submit: 'Request My Demo',
    error:
      'Something went wrong. Please email garry@tenfoursystems.com or call (972) 349 5808 directly.',
    fine: 'No spam. No obligation. We respond fast.',
    doneTitle: 'Message received. Ten four.',
    doneBody:
      "Thanks for reaching out. We'll be in touch shortly to set up your live demo and get your dispatcher on the air.",
    another: 'Submit another request',
    honeypot: 'Company Website',
  },
  notFound: {
    title: 'Looks like this page went missing.',
    body: 'Kind of like a call nobody caught. Unlike this page, Roger would have texted you back already.',
    home: 'Back to home',
    demo: 'Book a Demo',
  },
  serviceArea: {
    ctaSubtitle: 'Book a demo and see how fast Roger catches a missed call.',
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
          'TenFour Systems sends text messages under the program name TenFour Systems / Roger text messages. If you ask for a demo, these messages are responses to that request, regarding your service inquiry, appointment scheduling, and follow-up updates. For client businesses, Roger replies to people who called and missed a connection.',
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
