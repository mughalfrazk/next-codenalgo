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

// Mock the server action so ContactForm doesn't hit the network
vi.mock('@/app/contact/actions', () => ({
  submitContact: vi.fn(),
}))

// Provide a controllable useActionState so we can test error + success states
let mockFormState: import('@/app/contact/schema').ContactState = { ok: false }
let mockPending = false
vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react')>()
  return {
    ...actual,
    useActionState: (_action: unknown, _initial: unknown) => [mockFormState, vi.fn(), false],
  }
})
vi.mock('react-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-dom')>()
  return {
    ...actual,
    useFormStatus: () => ({ pending: mockPending }),
  }
})

import { Footer } from '@/components/Footer'
import { ContactForm } from '@/components/ContactForm'
import { site } from '@/content/site'

describe('Footer', () => {
  it('renders the site name and tagline', () => {
    render(<Footer />)
    expect(screen.getAllByText(site.name).length).toBeGreaterThan(0)
    expect(screen.getByText(site.tagline)).toBeDefined()
  })

  it('renders contact email and phone links', () => {
    render(<Footer />)
    expect(screen.getAllByRole('link', { name: site.email }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: site.phone }).length).toBeGreaterThan(0)
  })

  it('renders service links from the services array', () => {
    render(<Footer />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('renders legal text', () => {
    render(<Footer />)
    expect(screen.getAllByText(site.legal).length).toBeGreaterThan(0)
  })
})

describe('ContactForm', () => {
  it('renders all form fields', () => {
    mockFormState = { ok: false }
    render(<ContactForm />)
    expect(screen.getByPlaceholderText('Full Name')).toBeDefined()
    expect(screen.getByPlaceholderText('Email')).toBeDefined()
    expect(screen.getByPlaceholderText('Company')).toBeDefined()
    expect(screen.getByPlaceholderText('Phone (optional)')).toBeDefined()
    expect(screen.getByPlaceholderText('Project Details')).toBeDefined()
  })

  it('renders service and budget selects', () => {
    mockFormState = { ok: false }
    render(<ContactForm />)
    expect(screen.getByLabelText(/service interested in/i)).toBeDefined()
    expect(screen.getByLabelText(/budget range/i)).toBeDefined()
  })

  it('renders the submit button', () => {
    mockFormState = { ok: false }
    render(<ContactForm />)
    expect(screen.getByRole('button', { name: /send message/i })).toBeDefined()
  })

  it('renders the consent checkbox', () => {
    mockFormState = { ok: false }
    render(<ContactForm />)
    expect(screen.getByRole('checkbox')).toBeDefined()
  })

  it('displays field-level error messages when state has errors', () => {
    mockFormState = {
      ok: false,
      message: 'Please fix the highlighted fields.',
      errors: {
        name: 'Please enter your name.',
        email: 'Please enter a valid email address.',
        details: 'Tell us a little about your project (10+ characters).',
        consent: 'Please agree to be contacted.',
      },
    }
    render(<ContactForm />)
    expect(screen.getByText('Please enter your name.')).toBeDefined()
    expect(screen.getByText('Please enter a valid email address.')).toBeDefined()
    expect(screen.getByText(/tell us a little/i)).toBeDefined()
    expect(screen.getByText('Please agree to be contacted.')).toBeDefined()
  })

  it('shows success state when ok=true', () => {
    mockFormState = { ok: true, message: 'Message Sent ✓' }
    mockPending = false
    render(<ContactForm />)
    expect(screen.getByRole('button', { name: /message sent/i })).toBeDefined()
  })

  it('shows pending state while submitting', () => {
    mockFormState = { ok: false }
    mockPending = true
    render(<ContactForm />)
    expect(screen.getByRole('button', { name: /sending/i })).toBeDefined()
    mockPending = false
  })
})
