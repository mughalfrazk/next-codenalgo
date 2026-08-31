'use client'

import { useState } from 'react'
import type { ProcessGroup } from '@/content/home'

/**
 * The Home "Our Process" accordion — numbered steps that expand to reveal a
 * grid of sub-items. First step open by default.
 */
export function ProcessAccordion({ groups }: { groups: ProcessGroup[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="flex flex-col gap-3.5">
      {groups.map((group, i) => {
        const isOpen = i === open
        return (
          <div key={i} className="glass rounded-3xl px-6 py-6 sm:px-[30px] sm:py-[26px]">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
            >
              <span className="flex items-center gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-[13px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-[19px] font-bold text-ink">{group.title}</span>
              </span>
              <span
                className={`text-[20px] font-bold ${isOpen ? 'text-brand' : 'text-muted-3'}`}
                aria-hidden
              >
                {isOpen ? '–' : '+'}
              </span>
            </button>
            {isOpen && (
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {group.items.map((it, j) => (
                  <div key={j}>
                    <div className="mb-2 text-[14px] font-bold text-ink">{it.t}</div>
                    <div className="text-[13px] leading-[1.6] font-medium text-muted">{it.d}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
