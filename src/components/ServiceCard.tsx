import Link from 'next/link'
import { Reveal } from './Reveal'
import type { Service } from '@/content/services'

/** Compact service card used in the Home services grid. */
export function ServiceCard({ service, delay = 0 }: { service: Service; delay?: number }) {
  return (
    <Reveal
      delay={delay}
      className="glass rounded-3xl p-7 shadow-[0_12px_26px_rgba(139,124,246,.1)]"
    >
      <Link href={`/services/${service.slug}`} className="block">
        <div className="mb-[18px] flex h-11 w-11 items-center justify-center rounded-[14px] bg-brand-gradient text-[11px] font-bold text-white">
          {service.code}
        </div>
        <div className="mb-2.5 text-[17px] font-bold text-ink">{service.title}</div>
        <div className="mb-[18px] text-[14px] leading-[1.6] font-medium text-muted">
          {service.desc}
        </div>
        <div className="flex flex-wrap gap-2">
          {service.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-[rgba(139,124,246,.12)] px-3 py-1.5 text-[11px] font-semibold text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </Link>
    </Reveal>
  )
}
