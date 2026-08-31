import type { Metadata } from 'next'
import { Container, Section } from '@/components/Section'
import { PageHero } from '@/components/PageHero'
import { Eyebrow } from '@/components/Eyebrow'
import { Faq } from '@/components/Faq'
import { ContactForm } from '@/components/ContactForm'
import { contactFaq, contactHero } from '@/content/contact'
import { site, socials } from '@/content/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: contactHero.subtitle,
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={contactHero.eyebrow}
        title={contactHero.title}
        subtitle={contactHero.subtitle}
      />

      <Container className="!pt-5 pb-14 sm:pb-[90px]">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.3fr_1fr]">
          {/* Form */}
          <div className="glass rounded-3xl p-6 sm:p-9">
            <Eyebrow bracket className="mb-3">
              Any Query
            </Eyebrow>
            <div className="mb-6 text-[24px] font-extrabold text-ink">Get in Touch Today</div>
            <ContactForm />
          </div>

          {/* Side rail */}
          <div className="flex flex-col gap-5">
            <div className="glass rounded-3xl p-8">
              <div className="mb-4 text-[15px] font-bold text-ink">
                Head Office — United Kingdom
              </div>
              <a
                href={`mailto:${site.email}`}
                className="mb-2.5 block text-[14px] font-medium text-muted hover:text-ink"
              >
                {site.email}
              </a>
              <a
                href={`tel:${site.phone.replace(/\s/g, '')}`}
                className="mb-2.5 block text-[14px] font-medium text-muted hover:text-ink"
              >
                {site.phone}
              </a>
              <div className="mb-4 text-[14px] font-medium text-muted">{site.address}</div>
              <div className="mb-1.5 text-[12px] font-semibold text-ink">Business Hours</div>
              <div className="mb-4 text-[13px] font-medium text-muted">{site.businessHours}</div>
              <div className="flex gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-brand-tint text-[12px] font-bold text-brand"
                  >
                    {s.short}
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="glass relative h-40 overflow-hidden rounded-3xl">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(56,108,234,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(56,108,234,.12) 1px,transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
              <div className="absolute top-1/2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gradient shadow-[0_0_0_8px_rgba(56,108,234,.2)]" />
            </div>

            <div className="rounded-3xl bg-brand-gradient p-6 text-white">
              <div className="mb-1.5 text-[15px] font-bold">Prefer to talk?</div>
              <div className="mb-3.5 text-[13px] leading-[1.5] font-medium opacity-90">
                Book a 30-minute call and we&apos;ll walk through your project together.
              </div>
              <div className="text-[13px] font-bold">Book a call →</div>
            </div>
          </div>
        </div>
      </Container>

      <Section className="!pt-0">
        <div className="mx-auto max-w-[880px]">
          <h2 className="mb-7 text-[24px] font-extrabold text-ink sm:text-[26px]">Quick FAQ</h2>
          <Faq items={contactFaq} />
        </div>
      </Section>
    </>
  )
}
