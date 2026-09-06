import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container, Section } from '@/components/Section'
import { Eyebrow } from '@/components/Eyebrow'
import { GradientButton } from '@/components/GradientButton'
import { Reveal } from '@/components/Reveal'
import { Faq } from '@/components/Faq'
import { CtaBand } from '@/components/CtaBand'
import { getService, relatedServices, services } from '@/content/services'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}
  return {
    title: service.title,
    description: service.heroSubtitle,
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const related = relatedServices(slug)

  return (
    <>
      {/* Hero + breadcrumb */}
      <Container className="pt-[70px] pb-14 sm:pt-[90px] sm:pb-[60px]">
        <nav aria-label="Breadcrumb" className="mb-[22px] text-[13px] font-semibold text-muted-2">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>{' '}
          /{' '}
          <Link href="/services" className="hover:text-ink">
            Services
          </Link>{' '}
          / <span className="text-ink">{service.title}</span>
        </nav>
        <h1 className="mb-5 max-w-[760px] text-[34px] leading-[1.15] font-extrabold text-ink sm:text-[46px]">
          {service.title}
        </h1>
        <p className="mb-[34px] max-w-[560px] text-[17px] leading-[1.6] font-medium text-muted">
          {service.heroSubtitle}
        </p>
        <GradientButton href="/contact">Discuss Your Requirements</GradientButton>
      </Container>

      {/* Overview */}
      <Section className="!pt-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-[50px]">
          <Reveal>
            <p className="text-[15px] leading-[1.8] font-medium text-muted">{service.overview}</p>
          </Reveal>
          <div className="glass relative h-[280px] overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(56,108,234,.18)]">
            <div className="absolute top-[30px] left-[30px] h-20 w-20 rounded-3xl bg-brand-gradient opacity-70" />
            <div className="absolute right-[50px] bottom-10 h-[110px] w-[110px] rounded-full opacity-60 [background:linear-gradient(135deg,#6C8FF5,#386cea)]" />
          </div>
        </div>
      </Section>

      {/* What's included */}
      <Section className="!pt-0">
        <Eyebrow className="mb-4">What&apos;s Included</Eyebrow>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {service.included.map((inc, i) => (
            <Reveal key={inc} delay={(i % 4) * 70} className="glass rounded-[20px] p-[22px]">
              <div className="mb-3.5 h-9 w-9 rounded-full bg-brand-gradient" />
              <div className="text-[14px] font-bold text-ink">{inc}</div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section className="!pt-0">
        <Eyebrow className="mb-4">Our Process</Eyebrow>
        <h2 className="mb-10 text-[24px] leading-[1.25] font-extrabold text-ink sm:text-[28px]">
          {service.processTitle}
        </h2>
        <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute top-5 right-[10%] left-[10%] hidden h-0.5 lg:block [background:linear-gradient(90deg,#386cea,#4A6FD8)]" />
          {service.processSteps.map((ps, i) => (
            <Reveal key={ps.n} delay={(i % 4) * 70} className="relative">
              <div className="relative z-[1] mb-[18px] flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient text-[14px] font-bold text-white">
                {ps.n}
              </div>
              <div className="mb-2 text-[15px] font-bold text-ink">{ps.title}</div>
              <div className="text-[13px] leading-[1.6] font-medium text-muted">{ps.desc}</div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Benefits */}
      <Section className="!pt-0">
        <Eyebrow className="mb-4">Key Benefits</Eyebrow>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {service.benefits.map((bn, i) => (
            <Reveal key={i} delay={(i % 2) * 80} className="glass flex gap-3.5 rounded-[18px] p-5">
              <div className="text-[16px] font-bold text-brand">✓</div>
              <div className="text-[14px] leading-[1.6] font-medium text-ink">{bn}</div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Tech stack */}
      <Section className="!pt-0">
        <Eyebrow className="mb-4">Tech We Work With</Eyebrow>
        <div className="flex flex-wrap gap-2.5">
          {service.techStack.map((tc) => (
            <span
              key={tc}
              className="rounded-full bg-brand-tint px-4 py-2 text-[13px] font-semibold text-muted"
            >
              {tc}
            </span>
          ))}
        </div>
      </Section>

      {/* Case study */}
      <Section className="!pt-0">
        <Eyebrow className="mb-4">Related Case Study</Eyebrow>
        <div className="glass max-w-[640px] rounded-3xl p-8">
          <div className="mb-3.5 text-[11px] font-bold uppercase tracking-[0.06em] text-brand">
            {service.caseStudy.tag}
          </div>
          <div className="mb-2.5 text-[18px] font-bold text-ink">{service.caseStudy.title}</div>
          <div className="mb-4 text-[14px] leading-[1.6] font-medium text-muted">
            {service.caseStudy.desc}
          </div>
          <div className="text-[13px] font-bold text-brand">Read case study →</div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="!pt-0">
        <div className="max-w-[880px]">
          <h2 className="mb-7 text-[24px] font-extrabold text-ink sm:text-[26px]">FAQ</h2>
          <Faq items={service.faq} />
        </div>
      </Section>

      {/* Related services */}
      {related.length > 0 && (
        <Section className="!pt-0">
          <Eyebrow className="mb-4">Related Services</Eyebrow>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {related.map((rs) => (
              <Link
                key={rs.slug}
                href={`/services/${rs.slug}`}
                className="glass block rounded-[20px] p-6 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="mb-2 text-[15px] font-bold text-ink">{rs.title}</div>
                <div className="text-[13px] leading-[1.6] font-medium text-muted">{rs.desc}</div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CtaBand title="Need to Talk It Through?" ctaLabel="Book a Call" />
    </>
  )
}
