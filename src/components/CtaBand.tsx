import Link from 'next/link'
import { Section } from './Section'

/** The recurring centered "ready to…" call-to-action card — dark brand gradient surface. */
export function CtaBand({
  title,
  subtitle,
  ctaLabel,
  ctaHref = '/contact',
}: {
  title: string
  subtitle?: string
  ctaLabel: string
  ctaHref?: string
}) {
  return (
    <Section className="text-center">
      <div
        className="bg-dark-gradient mx-auto max-w-[640px] rounded-[32px] px-8 py-12 sm:px-10 sm:py-[60px]"
        style={{
          border: '1px solid var(--color-dark-border)',
          boxShadow: 'var(--shadow-dark)',
        }}
      >
        <h2 className="mb-4 text-[28px] leading-[1.25] font-extrabold text-white sm:text-[34px]">
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mb-[30px] max-w-md text-[15px] leading-[1.7] font-medium text-white/78">
            {subtitle}
          </p>
        )}
        <Link
          href={ctaHref}
          className="inline-flex items-center justify-center rounded-full px-7 py-[15px] text-[14px] font-bold transition-transform duration-200 hover:-translate-y-0.5"
          style={{
            background: '#fff',
            color: '#2B2070',
            boxShadow: '0 10px 26px rgba(0,0,0,.22)',
          }}
        >
          {ctaLabel}
        </Link>
      </div>
    </Section>
  )
}
