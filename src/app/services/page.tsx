import type { Metadata } from 'next'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { PageHero } from '@/components/PageHero'
import { Eyebrow } from '@/components/Eyebrow'
import { Reveal } from '@/components/Reveal'
import { Faq } from '@/components/Faq'
import { CtaBand } from '@/components/CtaBand'
import { engagementModels, services, servicesFaq, servicesWhyChoose } from '@/content/services'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Custom software, enterprise systems, and intelligent automation — delivered end to end.',
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Solving Today's Tech Challenges, Building Tomorrow's Success"
        subtitle="Custom software, enterprise systems, and intelligent automation — delivered end to end."
      />

      {/* Service list */}
      <Section className="!pt-5">
        <Eyebrow bracket className="mb-4">
          Our Services
        </Eyebrow>
        <h2 className="mb-5 text-[26px] leading-[1.25] font-extrabold text-ink sm:text-[30px]">
          Our Comprehensive Suite of Services
        </h2>
        <p className="mb-11 max-w-[760px] text-[16px] leading-[1.7] font-medium text-muted">
          Code &amp; Algo specializes in custom software, enterprise solutions, and intelligent
          automation. From managing infrastructure to embedding AI, we deliver technology that
          solves real problems and fuels growth.
        </p>
        <div className="flex flex-col gap-5">
          {services.map((sv) => (
            <Reveal
              key={sv.slug}
              className="glass grid grid-cols-1 gap-6 rounded-3xl p-8 sm:grid-cols-[56px_1fr]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-[13px] font-bold text-white">
                {sv.code}
              </div>
              <div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
                  <div className="mb-2.5 text-[20px] font-bold text-ink">{sv.title}</div>
                  <Link
                    href={`/services/${sv.slug}`}
                    className="shrink-0 text-[13px] font-bold whitespace-nowrap text-brand"
                  >
                    Learn More →
                  </Link>
                </div>
                <div className="mb-4 max-w-[680px] text-[14px] leading-[1.6] font-medium text-muted">
                  {sv.desc}
                </div>
                <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2">
                  {sv.bullets.map((bl) => (
                    <div key={bl} className="text-[13px] font-semibold text-ink">
                      ✓ {bl}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {sv.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-[rgba(139,124,246,.12)] px-3 py-1.5 text-[11px] font-semibold text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Engagement models */}
      <Section className="!pt-0">
        <Eyebrow bracket className="mb-4">
          How We Work
        </Eyebrow>
        <h2 className="mb-10 text-[26px] leading-[1.25] font-extrabold text-ink sm:text-[30px]">
          Engagement Models That Fit How You Build
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {engagementModels.map((em, i) => (
            <Reveal key={em.title} delay={(i % 3) * 80} className="glass rounded-3xl p-7">
              <div className="mb-2.5 text-[18px] font-bold text-ink">{em.title}</div>
              <div className="mb-4 text-[14px] leading-[1.6] font-medium text-muted">{em.desc}</div>
              <div className="text-[12px] font-semibold text-brand">{em.duration}</div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Why choose */}
      <Section className="!pt-0">
        <Eyebrow bracket className="mb-4">
          Why Choose Us
        </Eyebrow>
        <h2 className="mb-10 max-w-[640px] text-[26px] leading-[1.25] font-extrabold text-ink sm:text-[30px]">
          Why Businesses Trust Code &amp; Algo
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {servicesWhyChoose.map((wc, i) => (
            <Reveal key={wc.title} delay={(i % 3) * 80} className="glass rounded-[20px] p-[26px]">
              <div className="mb-2 text-[15px] font-bold text-ink">{wc.title}</div>
              <div className="text-[13px] leading-[1.6] font-medium text-muted">{wc.desc}</div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="!pt-0">
        <div className="mx-auto max-w-[880px]">
          <h2 className="mb-9 text-[26px] font-extrabold text-ink sm:text-[30px]">
            Frequently Asked Questions
          </h2>
          <Faq items={servicesFaq} />
        </div>
      </Section>

      <CtaBand
        title="Ready to Build What's Next?"
        subtitle="Let's turn your idea into a product, or your system into a growth engine."
        ctaLabel="Talk to an Expert"
      />
    </>
  )
}
