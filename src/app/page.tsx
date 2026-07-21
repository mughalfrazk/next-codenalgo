import Link from "next/link";
import { Container, Section } from "@/components/Section";
import { Eyebrow } from "@/components/Eyebrow";
import { GradientButton } from "@/components/GradientButton";
import { StatsRow } from "@/components/StatsRow";
import { ServiceCard } from "@/components/ServiceCard";
import { Reveal } from "@/components/Reveal";
import { ProcessAccordion } from "@/components/ProcessAccordion";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { services } from "@/content/services";
import {
  caseStudies,
  clientLogos,
  homeFaq,
  homeHero,
  homeStats,
  processSteps,
  testimonials,
  whyChoose,
} from "@/content/home";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Container className="pt-[70px] pb-14 text-center sm:pt-[110px] sm:pb-[90px]">
        <Eyebrow className="mb-[22px]">{homeHero.eyebrow}</Eyebrow>
        <h1 className="mx-auto mb-[26px] max-w-[840px] text-[42px] leading-[1.1] font-extrabold tracking-[-0.02em] text-ink sm:text-[62px]">
          {homeHero.title}
        </h1>
        <p className="mx-auto mb-10 max-w-[560px] text-[18px] leading-[1.6] font-medium text-muted">
          {homeHero.subtitle}
        </p>
        <div className="mb-[60px] flex flex-wrap justify-center gap-3.5">
          <GradientButton href="/contact">Start a Project</GradientButton>
          <GradientButton href="/services" variant="ghost">
            View Our Work
          </GradientButton>
        </div>
        <div className="mb-[18px] text-[12px] font-semibold text-muted-2">
          Trusted by teams building with
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {clientLogos.map((logo) => (
            <div key={logo} className="text-[13px] font-bold text-muted-3">
              {logo}
            </div>
          ))}
        </div>
      </Container>

      {/* Stats */}
      <Section className="!py-0 !pb-14 sm:!pb-[90px]">
        <StatsRow stats={homeStats} />
      </Section>

      {/* Who We Are */}
      <Section>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-[50px]">
          <Reveal>
            <Eyebrow className="mb-4">Who We Are</Eyebrow>
            <h2 className="mb-5 text-[28px] leading-[1.25] font-extrabold text-ink sm:text-[32px]">
              Creating Smarter Solutions to Shape the Future
            </h2>
            <p className="mb-[26px] text-[15px] leading-[1.75] font-medium text-muted">
              We&apos;re a team of thinkers, creators, and tech experts crafting intuitive
              software, streamlining infrastructure, and fueling business evolution. Technology
              is more than tools and code — it&apos;s the backbone of sustainable growth. Our
              services are agile, customer-focused, and built to scale as your needs evolve.
            </p>
            <Link href="/about" className="text-[14px] font-bold text-brand">
              Discover More →
            </Link>
          </Reveal>
          <div className="glass relative h-[320px] overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(139,124,246,.18)]">
            <div className="absolute top-10 left-10 h-20 w-20 rounded-3xl bg-brand-gradient opacity-70" />
            <div className="absolute right-[60px] bottom-[50px] h-[120px] w-[120px] rounded-full opacity-60 [background:linear-gradient(135deg,#FF9EC4,#8B7CF6)]" />
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section>
        <div className="mb-11 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow className="mb-4">Our Services</Eyebrow>
            <h2 className="max-w-[560px] text-[26px] leading-[1.25] font-extrabold text-ink sm:text-[30px]">
              End-to-End Custom IT Solutions &amp; Services
            </h2>
          </div>
          <Link href="/services" className="shrink-0 text-[14px] font-bold text-brand">
            View All Services →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} delay={(i % 3) * 80} />
          ))}
        </div>
      </Section>

      {/* Selected Work */}
      <Section className="!pt-0">
        <Eyebrow className="mb-4">Selected Work</Eyebrow>
        <h2 className="mb-11 text-[26px] leading-[1.25] font-extrabold text-ink sm:text-[30px]">
          Results, Not Just Deliverables
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.title} delay={(i % 3) * 80} className="glass rounded-3xl p-[26px]">
              <div className="mb-3.5 text-[11px] font-bold uppercase tracking-[0.06em] text-brand">
                {cs.tag}
              </div>
              <div className="mb-2.5 text-[18px] font-bold text-ink">{cs.title}</div>
              <div className="mb-4 text-[14px] leading-[1.6] font-medium text-muted">{cs.result}</div>
              <div className="text-[13px] font-bold text-brand">Read case study →</div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section className="!pt-0">
        <Eyebrow className="mb-4">Why Choose Us</Eyebrow>
        <h2 className="mb-4 max-w-[640px] text-[26px] leading-[1.25] font-extrabold text-ink sm:text-[30px]">
          Transforming Your Business with End-to-End, Tailored Technology
        </h2>
        <p className="mb-11 max-w-[560px] text-[15px] leading-[1.7] font-medium text-muted">
          A full range of software development and technology services, all designed to deliver
          tangible results for your business.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {whyChoose.map((wc, i) => (
            <Reveal key={wc.code} delay={(i % 5) * 60} className="glass rounded-[20px] p-[22px]">
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-[12px] font-bold text-white">
                {wc.code}
              </div>
              <div className="mb-2 text-[14px] font-bold text-ink">{wc.title}</div>
              <div className="text-[13px] leading-[1.6] font-medium text-muted">{wc.desc}</div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section className="!pt-0">
        <Eyebrow className="mb-4">Our Process</Eyebrow>
        <h2 className="mb-10 text-[26px] leading-[1.25] font-extrabold text-ink sm:text-[30px]">
          From Vision to Launch — Our Proven 3-Step Process
        </h2>
        <ProcessAccordion groups={processSteps} />
      </Section>

      {/* Testimonials */}
      <Section className="!pt-0">
        <h2 className="mb-11 text-center text-[26px] font-extrabold text-ink sm:text-[30px]">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((tm, i) => (
            <Reveal key={tm.name} delay={(i % 3) * 80} className="glass rounded-3xl p-[26px]">
              <div className="mb-5 text-[15px] leading-[1.7] font-medium text-ink">{tm.quote}</div>
              <div className="text-[13px] font-bold text-ink">{tm.name}</div>
              <div className="text-[12px] font-medium text-muted-2">{tm.role}</div>
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
          <Faq items={homeFaq} />
        </div>
      </Section>

      <CtaBand
        title="Ready to Take Your Project to the Next Level?"
        subtitle="Imagine the possibilities. Let's create something incredible together — we'll be with you every step of the way."
        ctaLabel="Get a Free Consultation"
      />
    </>
  );
}
