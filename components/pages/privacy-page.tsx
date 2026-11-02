import { LegalDocument } from "@/components/pages/legal-document"
import type { Locale } from "@/lib/locale"

function mailLink() {
  return (
    <a href="mailto:garry@tenfoursystems.com" className="text-primary underline">
      garry@tenfoursystems.com
    </a>
  )
}

export function PrivacyPage({ locale = "en" }: { locale?: Locale }) {
  if (locale === "es") {
    return (
      <LegalDocument
        title="Política de privacidad"
        updated="Última actualización: 29 de octubre de 2026"
        sections={[
          {
            heading: "1. Quiénes somos",
            paragraphs: [
              `TenFour Systems ("TenFour", "nosotros") opera tenfoursystems.com y ofrece servicios de despacho por SMS automatizado a negocios de contratistas. Esta política explica qué información recopilamos a través de nuestro sitio web y cómo la usamos.`,
            ],
          },
          {
            heading: "2. Información que recopilamos",
            paragraphs: [
              "Cuando envía nuestro formulario de contacto, recopilamos su nombre, correo electrónico, número de teléfono, el mensaje que envía, si marcó la casilla de consentimiento de SMS y cuándo, y la página desde la que envió el formulario. No recopilamos información de pago directamente a través del sitio web. La facturación de los clientes contratados se maneja a través de nuestro procesador de pagos, Stripe.",
            ],
          },
          {
            heading: "3. Cómo usamos su información",
            paragraphs: [
              "Usamos la información que usted proporciona para responder a su consulta, enviarle mensajes de texto automatizados si marcó la casilla de consentimiento, mantener registros de consentimiento según lo exige la Telephone Consumer Protection Act (TCPA) y mejorar nuestros servicios y nuestro sitio web.",
            ],
          },
          {
            heading: "4. Mensajes de texto (SMS)",
            paragraphs: [
              "Si marca la casilla de consentimiento en nuestro formulario, usted acepta recibir mensajes de texto automatizados de TenFour Systems en el número proporcionado. El consentimiento no es una condición de compra. Pueden aplicar tarifas de mensajes y datos. La frecuencia de los mensajes varía. Responda STOP en cualquier momento para cancelar, o responda HELP para ayuda.",
            ],
          },
          {
            heading: "5. Cómo compartimos su información",
            paragraphs: [
              "Usamos los siguientes proveedores de servicios externos para operar nuestro negocio, y ellos pueden procesar su información: Zoho CRM (registros), Make.com (automatización), Twilio (envío de mensajes de texto) y Stripe (procesamiento de pagos, para clientes contratados). No vendemos su información personal a terceros, y no la compartimos fuera de estos proveedores de servicios, excepto cuando la ley lo exige. La información de telefonía móvil y el consentimiento de suscripción por SMS no se compartirán con terceros ni con afiliados para fines de marketing o promoción.",
            ],
          },
          {
            heading: "6. Seguridad de los datos",
            paragraphs: [
              "Tomamos medidas razonables para proteger la información que usted proporciona, incluida la seguridad a nivel de campo para datos sensibles dentro de nuestro CRM. Ningún método de almacenamiento o transmisión electrónica es completamente seguro, y no podemos garantizar una seguridad absoluta.",
            ],
          },
          {
            heading: "7. Conservación de los datos",
            paragraphs: [
              "Conservamos su información durante el tiempo necesario para prestar nuestros servicios y mantener los registros de cumplimiento requeridos, incluida la evidencia de consentimiento de la TCPA, o según lo exija la ley.",
            ],
          },
          {
            heading: "8. Sus derechos",
            paragraphs: [
              <>
                Puede responder STOP a cualquier mensaje de texto para dejar de recibir mensajes
                futuros, responder HELP para ayuda, o escribirnos a {mailLink()} para preguntar qué
                información tenemos sobre usted o para solicitar su eliminación, con la excepción de
                cualquier registro que la ley nos exija conservar.
              </>,
            ],
          },
          {
            heading: "9. Privacidad de los menores",
            paragraphs: [
              "Nuestro sitio web y nuestros servicios están dirigidos a dueños de negocios y no están pensados para el uso de nadie menor de 18 años. No recopilamos información de menores a sabiendas.",
            ],
          },
          {
            heading: "10. Cambios a esta política",
            paragraphs: [
              `Podemos actualizar esta política de vez en cuando. La fecha de "Última actualización" de arriba refleja los cambios más recientes.`,
            ],
          },
          {
            heading: "11. Contáctenos",
            paragraphs: [
              <>
                Las preguntas sobre esta política se pueden enviar a {mailLink()}.
              </>,
            ],
          },
        ]}
      />
    )
  }

  return (
    <LegalDocument
      title="Privacy Policy"
      updated="Last updated: October 29, 2026"
      sections={[
        {
          heading: "1. Who we are",
          paragraphs: [
            `TenFour Systems ("TenFour," "we," "us") operates tenfoursystems.com and provides automated SMS dispatch services to contractor businesses. This policy explains what information we collect through our website and how we use it.`,
          ],
        },
        {
          heading: "2. Information we collect",
          paragraphs: [
            "When you submit our contact form, we collect your name, email address, phone number, the message you submit, whether you checked the SMS consent box and when, and the page you submitted the form from. We do not collect payment information through the website directly; billing for signed clients is handled through our payment processor, Stripe.",
          ],
        },
        {
          heading: "3. How we use your information",
          paragraphs: [
            "We use the information you provide to respond to your inquiry, send you automated text messages if you checked the consent box, maintain records of consent as required by the Telephone Consumer Protection Act (TCPA), and improve our services and website.",
          ],
        },
        {
          heading: "4. Text messaging (SMS)",
          paragraphs: [
            "If you check the consent box on our form, you agree to receive automated text messages from TenFour Systems at the number provided. Consent is not a condition of purchase. Message and data rates may apply. Message frequency varies. Reply STOP at any time to opt out, or reply HELP for help.",
          ],
        },
        {
          heading: "5. How we share your information",
          paragraphs: [
            "We use the following third-party service providers to operate our business, and your information may be processed by them: Zoho CRM (record-keeping), Make.com (automation), Twilio (sending text messages), and Stripe (payment processing, for signed clients). We do not sell your personal information to third parties, and we do not share it outside of these service providers except as required by law. Mobile information and SMS opt-in consent will not be shared with third parties or affiliates for marketing or promotional purposes.",
          ],
        },
        {
          heading: "6. Data security",
          paragraphs: [
            "We take reasonable steps to protect the information you provide, including field-level security on sensitive data within our CRM. No method of electronic storage or transmission is completely secure, and we cannot guarantee absolute security.",
          ],
        },
        {
          heading: "7. Data retention",
          paragraphs: [
            "We retain your information for as long as necessary to provide our services and maintain required compliance records, including TCPA consent evidence, or as required by law.",
          ],
        },
        {
          heading: "8. Your rights",
          paragraphs: [
            <>
              You may reply STOP to any text message to opt out of future messages, reply HELP for
              help, or contact us at {mailLink()} to ask what information we have about you or to
              request deletion, subject to any records we&apos;re legally required to retain.
            </>,
          ],
        },
        {
          heading: "9. Children's privacy",
          paragraphs: [
            "Our website and services are directed at business owners and are not intended for use by anyone under 18. We do not knowingly collect information from children.",
          ],
        },
        {
          heading: "10. Changes to this policy",
          paragraphs: [
            `We may update this policy from time to time. The "Last updated" date above reflects the most recent changes.`,
          ],
        },
        {
          heading: "11. Contact us",
          paragraphs: [
            <>Questions about this policy can be directed to {mailLink()}.</>,
          ],
        },
      ]}
    />
  )
}
