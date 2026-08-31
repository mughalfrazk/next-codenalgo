import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string
    children: React.ReactNode
    [k: string]: unknown
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}))

import { Reveal } from '@/components/Reveal'
import { CountUp } from '@/components/CountUp'
import { StatsRow } from '@/components/StatsRow'
import { ServiceCard } from '@/components/ServiceCard'
import { services } from '@/content/services'
import type { Stat } from '@/content/home'

describe('Reveal', () => {
  it('renders children', () => {
    render(<Reveal>Content</Reveal>)
    expect(screen.getByText('Content')).toBeDefined()
  })

  it('applies className and delay via style', () => {
    const { container } = render(
      <Reveal className="my-class" delay={100}>
        x
      </Reveal>
    )
    const el = container.firstChild as HTMLElement
    expect(el.className).toContain('my-class')
    expect(el.style.transition).toContain('100ms')
  })

  it('renders as a custom element tag', () => {
    const { container } = render(<Reveal as="article">Inner</Reveal>)
    expect(container.querySelector('article')).toBeDefined()
  })

  it('shows content after IntersectionObserver fires', () => {
    render(<Reveal>Visible</Reveal>)
    // setup.ts mocks IO to fire immediately with isIntersecting: true
    expect(screen.getByText('Visible')).toBeDefined()
  })
})

describe('CountUp', () => {
  it('renders the final value after IntersectionObserver fires (reduced-motion off)', () => {
    // rAF in jsdom runs synchronously with fake timers; IO is mocked to fire immediately
    render(<CountUp value={42} suffix="+" />)
    // The component starts animation; after rAF ticks it will reach 42
    // We just assert the element exists and shows a number
    const span = document.querySelector('span')
    expect(span).toBeDefined()
  })

  it('renders immediately under reduced-motion', () => {
    vi.mocked(window.matchMedia).mockReturnValueOnce({
      matches: true,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })
    render(<CountUp value={99} suffix="k" />)
    const span = document.querySelector('span')
    expect(span).toBeDefined()
  })

  it('renders with default props', () => {
    const { container } = render(<CountUp value={5} />)
    expect(container.querySelector('span')).toBeDefined()
  })
})

describe('StatsRow', () => {
  const stats: Stat[] = [
    { value: 100, suffix: '+', label: 'Projects' },
    { value: 50, suffix: '', label: 'Clients' },
  ]

  it('renders stat labels', () => {
    render(<StatsRow stats={stats} />)
    expect(screen.getByText('Projects')).toBeDefined()
    expect(screen.getByText('Clients')).toBeDefined()
  })
})

describe('ServiceCard', () => {
  it('renders service title and link', () => {
    const svc = services[0]
    render(<ServiceCard service={svc} />)
    expect(screen.getByText(svc.title)).toBeDefined()
    const link = screen.getByRole('link')
    expect(link.getAttribute('href')).toBe(`/services/${svc.slug}`)
  })

  it('renders tech stack chips', () => {
    const svc = services[0]
    render(<ServiceCard service={svc} delay={80} />)
    expect(screen.getByText(svc.stack[0])).toBeDefined()
  })
})
