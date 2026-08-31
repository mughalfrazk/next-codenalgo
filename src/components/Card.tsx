import type { ReactNode } from 'react'

/** Frosted glass card — the design's core surface. */
export function Card({
  children,
  className = '',
  shadow = true,
}: {
  children: ReactNode
  className?: string
  shadow?: boolean
}) {
  return (
    <div
      className={`glass rounded-3xl ${shadow ? 'shadow-[0_12px_30px_rgba(139,124,246,.12)]' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
