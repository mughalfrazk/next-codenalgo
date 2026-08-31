'use client'

import { useState } from 'react'
import type { QA } from '@/content/services'

/** Accordion FAQ — first item open by default, one open at a time. */
export function Faq({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = i === open
        return (
          <div key={i} className="glass rounded-[18px] px-5 py-5 sm:px-6">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
            >
              <span className="text-[15px] font-bold text-ink">{item.q}</span>
              <span
                className={`text-[20px] font-bold ${isOpen ? 'text-brand' : 'text-muted-3'}`}
                aria-hidden
              >
                {isOpen ? '–' : '+'}
              </span>
            </button>
            {isOpen && (
              <p className="mt-3.5 text-[14px] leading-[1.7] font-medium text-muted">{item.a}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}
