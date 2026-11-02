import { LegalDocument } from "@/components/pages/legal-document"
import { localizeHref, type Locale } from "@/lib/locale"

function mailLink() {
  return (
    <a href="mailto:garry@tenfoursystems.com" className="text-primary underline">
      garry@tenfoursystems.com
    </a>
  )
}

function privacyLink(locale: Locale, label: string) {
  return (
    <a href={localizeHref("/privacy", locale)} className="text-primary underline">
      {label}
    </a>
  )
}

export function TermsPage({ locale = "en" }: { locale?: Locale }) {
  if (locale === "es") {
    return (
      <LegalDocument
        title="Términos de servicio"
        updated="Última actualización: 29 de octubre de 2026"
        sections={[
          {
            heading: "1. Aceptación de los términos",
            paragraphs: [
              "Estos Términos de servicio rigen su uso del sitio web y de los servicios de TenFour Systems. Al usar nuestro sitio web o interactuar con nuestro servicio de mensajes de texto, usted acepta estos términos.",
            ],
          },
          {
            heading: "2. Nuestro servicio",
            paragraphs: [
              "TenFour Systems ofrece un servicio automatizado de respuesta por texto a llamadas perdidas y de calificación de prospectos para negocios de servicios del hogar. TenFour actúa como un puente de comunicación entre un negocio y sus clientes, y no es en sí mismo el proveedor del trabajo de servicios del hogar.",
            ],
          },
          {
            heading: "3. Mensajes de texto",
            paragraphs: [
              "TenFour Systems envía mensajes de texto bajo el nombre de programa TenFour Systems / Roger text messages. Si usted pide una demo, estos mensajes son respuestas a esa solicitud, sobre su consulta de servicio, la programación de citas y las actualizaciones de seguimiento. Para los negocios clientes, Roger responde a las personas que llamaron y no lograron comunicarse.",
              <>
                La frecuencia de los mensajes varía. Pueden aplicar tarifas de mensajes y datos. El
                consentimiento no es una condición de compra. Responda STOP para cancelar y HELP
                para ayuda. Para soporte, escriba a {mailLink()} o llame al (972) 349 5808. Las
                compañías de telefonía no son responsables de los mensajes retrasados o no
                entregados. Consulte nuestra {privacyLink(locale, "Política de privacidad")}.
              </>,
              "Los negocios clientes que usan Roger son responsables de tener el consentimiento adecuado para enviar textos a quienes los llaman y a sus contactos, incluidos los mensajes de recontacto o de seguimiento, y aceptan cumplir con la TCPA y las reglas de las compañías de telefonía.",
            ],
          },
          {
            heading: "4. Cuentas de clientes",
            paragraphs: [
              "Los negocios clientes pueden cancelar su suscripción en cualquier momento al contactarnos. Las tarifas de configuración no son reembolsables una vez que ha comenzado el trabajo de ingeniería en una cuenta. Al cancelar, dejamos de facturar de ahí en adelante y manejamos cualquier dato restante de acuerdo con nuestra Política de privacidad.",
            ],
          },
          {
            heading: "5. Uso aceptable",
            paragraphs: [
              "Usted acepta no usar nuestro servicio para ningún fin ilegal, ni enviar mensajes a destinatarios que no hayan consentido ser contactados.",
            ],
          },
          {
            heading: "6. Limitación de responsabilidad",
            paragraphs: [
              "TenFour Systems ofrece servicios de calificación de prospectos y de comunicación, y no es responsable de la calidad, la puntualidad ni el resultado de ningún trabajo de servicios del hogar realizado por un negocio cliente. En la medida máxima permitida por la ley, TenFour no es responsable de daños indirectos, incidentales o consecuentes que surjan del uso de nuestro servicio.",
            ],
          },
          {
            heading: "7. Cambios a estos términos",
            paragraphs: [
              `Podemos actualizar estos términos de vez en cuando. La fecha de "Última actualización" de arriba refleja los cambios más recientes.`,
            ],
          },
          {
            heading: "8. Contáctenos",
            paragraphs: [
              <>Las preguntas sobre estos términos se pueden enviar a {mailLink()}.</>,
            ],
          },
        ]}
      />
    )
  }

  return (
    <LegalDocument
      title="Terms of Service"
      updated="Last updated: October 29, 2026"
      sections={[
        {
          heading: "1. Agreement to terms",
          paragraphs: [
            "These Terms of Service govern your use of the TenFour Systems website and services. By using our website or interacting with our text-messaging service, you agree to these terms.",
          ],
        },
        {
          heading: "2. Our service",
          paragraphs: [
            "TenFour Systems provides an automated missed-call text-back and lead qualification service to home-service businesses. TenFour acts as a communication bridge between a business and its customers and is not itself the provider of home-service work.",
          ],
        },
        {
          heading: "3. Text messages",
          paragraphs: [
            "TenFour Systems sends text messages under the program name TenFour Systems / Roger text messages. If you ask for a demo, these messages are responses to that request, regarding your service inquiry, appointment scheduling, and follow-up updates. For client businesses, Roger replies to people who called and missed a connection.",
            <>
              Message frequency varies. Message and data rates may apply. Consent is not a
              condition of purchase. Reply STOP to opt out and HELP for help. For support, email{" "}
              {mailLink()} or call (972) 349 5808. Carriers are not liable for delayed or
              undelivered messages. See our {privacyLink(locale, "Privacy Policy")}.
            </>,
            "Client businesses that use Roger are responsible for having proper consent to text their callers and contacts, including any re-engagement or follow-up messages, and agree to comply with the TCPA and carrier rules.",
          ],
        },
        {
          heading: "4. Client accounts",
          paragraphs: [
            "Client businesses may cancel their subscription at any time by contacting us. Setup fees are non-refundable once engineering work on an account has begun. Upon cancellation, we stop billing going forward and handle any remaining data according to our Privacy Policy.",
          ],
        },
        {
          heading: "5. Acceptable use",
          paragraphs: [
            "You agree not to use our service for any unlawful purpose, or to send messages to recipients who have not consented to be contacted.",
          ],
        },
        {
          heading: "6. Limitation of liability",
          paragraphs: [
            "TenFour Systems provides lead qualification and communication services and is not responsible for the quality, timeliness, or outcome of any home-service work performed by a client business. To the fullest extent permitted by law, TenFour is not liable for indirect, incidental, or consequential damages arising from use of our service.",
          ],
        },
        {
          heading: "7. Changes to these terms",
          paragraphs: [
            `We may update these terms from time to time. The "Last updated" date above reflects the most recent changes.`,
          ],
        },
        {
          heading: "8. Contact us",
          paragraphs: [<>Questions about these terms can be sent to {mailLink()}.</>],
        },
      ]}
    />
  )
}
