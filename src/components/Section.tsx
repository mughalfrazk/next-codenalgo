import type { ReactNode } from 'react'

/** Horizontal-gutter container matching the design's 64px desktop padding. */
export function Container({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`relative mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  )
}

/** A vertical page section with sensible default block spacing. */
export function Section({
  children,
  className = '',
  id,
}: {
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={`relative py-14 sm:py-16 lg:py-[90px] ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}
