import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy. TenFour Systems',
  description: 'How TenFour Systems collects, uses, and protects your information.',
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: September 6, 2026</p>

      <div className="mt-10 space-y-8 text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Who we are</h2>
          <p className="mt-2 leading-relaxed">
            TenFour Systems ("TenFour," "we," "us") operates tenfoursystems.com and provides
            automated SMS dispatch services to contractor businesses. This policy explains what
            information we collect through our website and how we use it.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Information we collect</h2>
          <p className="mt-2 leading-relaxed">
            When you submit our contact form, we collect your name, email address, phone number,
            the message you submit, whether you checked the SMS consent box and when, and the
            page you submitted the form from. We do not collect payment information through the
            website directly; billing for signed clients is handled through our payment
            processor, Stripe.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. How we use your information</h2>
          <p className="mt-2 leading-relaxed">
            We use the information you provide to respond to your inquiry, send you automated
            text messages if you checked the consent box, maintain records of consent as required
            by the Telephone Consumer Protection Act (TCPA), and improve our services and website.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Text messaging (SMS)</h2>
          <p className="mt-2 leading-relaxed">
            If you check the consent box on our form, you agree to receive automated text
            messages from TenFour Systems at the number provided. Consent is not a condition of
            purchase. Message and data rates may apply. Message frequency varies. Reply STOP at
            any time to opt out.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. How we share your information</h2>
          <p className="mt-2 leading-relaxed">
            We use the following third-party service providers to operate our business, and your
            information may be processed by them: Zoho CRM (record-keeping), Make.com
            (automation), Twilio (sending text messages), and Stripe (payment processing, for
            signed clients). We do not sell your personal information to third parties, and we do
            not share it outside of these service providers except as required by law.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Data security</h2>
          <p className="mt-2 leading-relaxed">
            We take reasonable steps to protect the information you provide, including
            field-level security on sensitive data within our CRM. No method of electronic
            storage or transmission is completely secure, and we cannot guarantee absolute
            security.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">7. Data retention</h2>
          <p className="mt-2 leading-relaxed">
            We retain your information for as long as necessary to provide our services and
            maintain required compliance records, including TCPA consent evidence, or as required
            by law.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">8. Your rights</h2>
          <p className="mt-2 leading-relaxed">
            You may reply STOP to any text message to opt out of future messages, or contact us
            at garry@tenfoursystems.com to ask what information we have about you or to request
            deletion, subject to any records we're legally required to retain.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">9. Children's privacy</h2>
          <p className="mt-2 leading-relaxed">
            Our website and services are directed at business owners and are not intended for use
            by anyone under 18. We do not knowingly collect information from children.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">10. Changes to this policy</h2>
          <p className="mt-2 leading-relaxed">
            We may update this policy from time to time. The "Last updated" date above reflects
            the most recent changes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">11. Contact us</h2>
          <p className="mt-2 leading-relaxed">
            Questions about this policy can be directed to{' '}
            <a href="mailto:garry@tenfoursystems.com" className="text-primary underline">
              garry@tenfoursystems.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  )
}
