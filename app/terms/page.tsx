import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service. TenFour Systems',
  description: 'The terms that govern your use of TenFour Systems.',
}

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: September 6, 2026</p>

      <div className="mt-10 space-y-8 text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Agreement to terms</h2>
          <p className="mt-2 leading-relaxed">
            These Terms of Service govern your use of the TenFour Systems website and services.
            By using our website or interacting with our text-messaging service, you agree to
            these terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Our service</h2>
          <p className="mt-2 leading-relaxed">
            TenFour Systems provides an automated missed-call text-back and lead qualification
            service to home-service businesses. TenFour acts as a communication bridge between a
            business and its customers and is not itself the provider of home-service work.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Client accounts</h2>
          <p className="mt-2 leading-relaxed">
            Client businesses may cancel their subscription at any time by contacting us. Setup
            fees are non-refundable once engineering work on an account has begun. Upon
            cancellation, we stop billing going forward and handle any remaining data according
            to our Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Acceptable use</h2>
          <p className="mt-2 leading-relaxed">
            You agree not to use our service for any unlawful purpose, or to send messages to
            recipients who have not consented to be contacted.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Limitation of liability</h2>
          <p className="mt-2 leading-relaxed">
            TenFour Systems provides lead qualification and communication services and is not
            responsible for the quality, timeliness, or outcome of any home-service work
            performed by a client business. To the fullest extent permitted by law, TenFour is
            not liable for indirect, incidental, or consequential damages arising from use of our
            service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Changes to these terms</h2>
          <p className="mt-2 leading-relaxed">
            We may update these terms from time to time. The "Last updated" date above reflects
            the most recent changes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">7. Contact us</h2>
          <p className="mt-2 leading-relaxed">
            Questions about these terms can be sent to{' '}
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
