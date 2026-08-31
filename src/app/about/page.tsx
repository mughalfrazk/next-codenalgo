import type { Metadata } from 'next'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { PageHero } from '@/components/PageHero'
import { Eyebrow } from '@/components/Eyebrow'
import { StatsRow } from '@/components/StatsRow'
import { Reveal } from '@/components/Reveal'
import { CtaBand } from '@/components/CtaBand'
import {
  aboutHero,
  aboutIntro,
  aboutStats,
  milestones,
  missionVision,
  team,
  values,
  valuePills,
} from '@/content/about'

export const metadata: Metadata = {
  title: 'About Us',
  description: aboutHero.subtitle,
}

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={aboutHero.eyebrow} title={aboutHero.title} subtitle={aboutHero.subtitle} />

      {/* Who We Are */}
      <Section className="!pt-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-[50px]">
          <Reveal>
            <Eyebrow bracket className="mb-4">
              Who We Are
            </Eyebrow>
            <h2 className="mb-5 text-[28px] leading-[1.25] font-extrabold text-ink sm:text-[32px]">
              Building The Future With Cutting-Edge IT Solutions
            </h2>
            <p className="mb-[26px] text-[15px] leading-[1.75] font-medium text-muted">
              {aboutIntro}
            </p>
            <div className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {valuePills.map((vp) => (
                <div
                  key={vp}
                  className="glass rounded-2xl px-[18px] py-4 text-[13px] font-bold text-ink"
                >
                  {vp}
                </div>
              ))}
            </div>
            <Link href="/contact" className="text-[14px] font-bold text-brand">
              Contact Us →
            </Link>
          </Reveal>
          <div className="glass relative h-[400px] overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(139,124,246,.18)]">
            <div className="absolute top-9 left-9 h-[100px] w-[100px] rounded-[28px] bg-brand-gradient opacity-70" />
            <div className="absolute right-[50px] bottom-[60px] h-[140px] w-[140px] rounded-full opacity-60 [background:linear-gradient(135deg,#FF9EC4,#8B7CF6)]" />
            <div className="absolute top-[180px] right-[120px] h-[60px] w-[60px] rounded-2xl opacity-50 [background:linear-gradient(135deg,#6EC6FF,#8B7CF6)]" />
          </div>
        </div>
      </Section>

      {/* Stats */}
      <Section className="!pt-0">
        <StatsRow stats={aboutStats} />
      </Section>

      {/* Mission & Vision */}
      <Section className="!pt-0">
        <Eyebrow bracket className="mb-4 text-center">
          Mission &amp; Vision
        </Eyebrow>
        <h2 className="mb-11 text-center text-[28px] leading-[1.25] font-extrabold text-ink sm:text-[32px]">
          We&apos;re Not Just Building — We&apos;re Driving Your Outcomes
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {missionVision.map((mv) => (
            <Reveal key={mv.title} className="glass rounded-3xl p-9">
              <div className="mb-5 h-11 w-11 rounded-[14px]" style={{ background: mv.gradient }} />
              <div className="mb-3 text-[20px] font-bold text-ink">{mv.title}</div>
              <div className="text-[15px] leading-[1.75] font-medium text-muted">{mv.desc}</div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Journey */}
      <Section className="!pt-0">
        <Eyebrow bracket className="mb-4">
          Our Journey
        </Eyebrow>
        <h2 className="mb-[50px] text-[26px] leading-[1.25] font-extrabold text-ink sm:text-[30px]">
          Milestones Along The Way
        </h2>
        <div className="relative pl-7">
          <div className="absolute top-1.5 bottom-1.5 left-[5px] w-0.5 [background:linear-gradient(180deg,#8B7CF6,#6EC6FF)]" />
          {milestones.map((ms) => (
            <Reveal key={ms.year} className="relative pb-[34px]">
              <div className="absolute top-0.5 left-[-28px] h-3 w-3 rounded-full bg-brand-gradient" />
              <div className="mb-1.5 text-[13px] font-bold text-brand">{ms.year}</div>
              <div className="mb-1.5 text-[17px] font-bold text-ink">{ms.title}</div>
              <div className="max-w-[600px] text-[14px] leading-[1.6] font-medium text-muted">
                {ms.desc}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section className="!pt-0">
        <Eyebrow bracket className="mb-4">
          Our Values
        </Eyebrow>
        <h2 className="mb-10 text-[26px] leading-[1.25] font-extrabold text-ink sm:text-[30px]">
          More Than Just Code: Our Core Values
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {values.map((vl, i) => (
            <Reveal key={vl.title} delay={(i % 5) * 60} className="glass rounded-[20px] p-[22px]">
              <div className="mb-4 h-9 w-9 rounded-full bg-brand-gradient" />
              <div className="mb-2 text-[14px] font-bold text-ink">{vl.title}</div>
              <div className="text-[13px] leading-[1.6] font-medium text-muted">{vl.desc}</div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section className="!pt-0">
        <Eyebrow bracket className="mb-4">
          The Team
        </Eyebrow>
        <h2 className="mb-10 text-[26px] leading-[1.25] font-extrabold text-ink sm:text-[30px]">
          The People Behind The Code
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((tm, i) => (
            <Reveal key={i} delay={(i % 4) * 70} className="glass rounded-3xl p-6 text-center">
              <div className="mx-auto mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-brand-gradient text-[22px] font-bold text-white">
                {tm.initials}
              </div>
              <div className="mb-1 text-[15px] font-bold text-ink">{tm.name}</div>
              <div className="mb-2.5 text-[12px] font-semibold text-brand">{tm.role}</div>
              <div className="text-[12px] leading-[1.5] font-medium text-muted">{tm.bio}</div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Partner With a Team That's Built to Deliver"
        subtitle="Whether you're launching a product or scaling your infrastructure, we're ready when you are."
        ctaLabel="Get In Touch Now"
      />
    </>
  )
}
