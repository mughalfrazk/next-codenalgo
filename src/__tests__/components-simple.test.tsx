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

import { BlobField, DefaultBlobs } from '@/components/BlobField'
import { Card } from '@/components/Card'
import { Eyebrow } from '@/components/Eyebrow'
import { Container, Section } from '@/components/Section'
import { GradientButton } from '@/components/GradientButton'
import { PageHero } from '@/components/PageHero'
import { CtaBand } from '@/components/CtaBand'

describe('BlobField', () => {
  it('renders blobs with animation classes', () => {
    const { container } = render(
      <BlobField
        blobs={[
          { color: 'red', top: '10px', left: '10px', size: 100, anim: 'a' },
          { color: 'blue', top: '20px', right: '10px', size: 100, anim: 'b' },
        ]}
      />
    )
    const wrapper = container.querySelector("[aria-hidden='true']")
    expect(wrapper?.children.length).toBe(2)
  })

  it('renders DefaultBlobs with three blobs', () => {
    const { container } = render(<DefaultBlobs />)
    const wrapper = container.querySelector("[aria-hidden='true']")
    expect(wrapper?.children.length).toBe(3)
  })
})

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Hello</Card>)
    expect(screen.getByText('Hello')).toBeDefined()
  })

  it('renders without shadow when shadow=false', () => {
    const { container } = render(<Card shadow={false}>Content</Card>)
    expect(container.firstChild).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(<Card className="custom">Content</Card>)
    expect((container.firstChild as HTMLElement).className).toContain('custom')
  })
})

describe('Eyebrow', () => {
  it('renders children', () => {
    render(<Eyebrow>Label</Eyebrow>)
    expect(screen.getByText('Label')).toBeDefined()
  })

  it('wraps with brackets when bracket=true', () => {
    render(<Eyebrow bracket>Section</Eyebrow>)
    expect(screen.getByText(/Section/)).toBeDefined()
    // bracket variant uses fragment with "[ " and " ]"
    expect(screen.getByText(/\[/).textContent).toContain('Section')
  })
})

describe('Container', () => {
  it('renders children', () => {
    render(<Container>Inner</Container>)
    expect(screen.getByText('Inner')).toBeDefined()
  })

  it('applies className', () => {
    const { container } = render(<Container className="extra">x</Container>)
    expect((container.firstChild as HTMLElement).className).toContain('extra')
  })
})

describe('Section', () => {
  it('renders children inside a section element', () => {
    render(<Section>Body</Section>)
    expect(screen.getByText('Body')).toBeDefined()
  })

  it('applies id and className', () => {
    const { container } = render(
      <Section id="my-section" className="pt-0">
        x
      </Section>
    )
    const section = container.querySelector('section')
    expect(section?.id).toBe('my-section')
    expect(section?.className).toContain('pt-0')
  })
})

describe('GradientButton', () => {
  it('renders a link with the correct href', () => {
    render(<GradientButton href="/contact">Click</GradientButton>)
    const link = screen.getByRole('link', { name: 'Click' })
    expect(link.getAttribute('href')).toBe('/contact')
  })

  it('renders the ghost variant', () => {
    const { container } = render(
      <GradientButton href="/" variant="ghost">
        Ghost
      </GradientButton>
    )
    expect(container.querySelector('a')?.className).toContain('glass')
  })
})

describe('PageHero', () => {
  it('renders eyebrow, title and subtitle', () => {
    render(<PageHero eyebrow="About" title="Our Story" subtitle="Who we are" />)
    expect(screen.getByText('About')).toBeDefined()
    expect(screen.getByRole('heading', { level: 1 })).toBeDefined()
    expect(screen.getByText('Who we are')).toBeDefined()
  })
})

describe('CtaBand', () => {
  it('renders title and CTA button', () => {
    render(<CtaBand title="Ready?" ctaLabel="Talk to Us" />)
    expect(screen.getByText('Ready?')).toBeDefined()
    expect(screen.getByRole('link', { name: 'Talk to Us' })).toBeDefined()
  })

  it('renders subtitle when provided', () => {
    render(<CtaBand title="Go" subtitle="Details here" ctaLabel="Start" />)
    expect(screen.getByText('Details here')).toBeDefined()
  })

  it('uses custom ctaHref', () => {
    render(<CtaBand title="Go" ctaLabel="Go" ctaHref="/book" />)
    expect(screen.getByRole('link', { name: 'Go' }).getAttribute('href')).toBe('/book')
  })
})
