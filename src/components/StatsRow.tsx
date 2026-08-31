import { CountUp } from './CountUp'
import { Reveal } from './Reveal'
import type { Stat } from '@/content/home'

/** Row of glass stat cards with animated count-up numbers. */
export function StatsRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row">
      {stats.map((s, i) => (
        <Reveal
          key={i}
          delay={i * 80}
          className="glass flex-1 rounded-3xl px-5 py-8 text-center shadow-[0_12px_30px_rgba(139,124,246,.12)]"
        >
          <div className="text-brand-gradient text-[34px] font-extrabold sm:text-[40px]">
            <CountUp value={s.value} suffix={s.suffix} />
          </div>
          <div className="mt-2 text-[12px] font-semibold text-muted">{s.label}</div>
        </Reveal>
      ))}
    </div>
  )
}
