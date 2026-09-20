import { act, fireEvent, render, screen } from '@testing-library/react'
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
vi.mock('@/app/(site)/contact/actions', () => ({
  submitContact: vi.fn(),
}))

// Provide a controllable useActionState so we can test error + success states
let mockFormState: import('@/app/(site)/contact/schema').ContactState = { ok: false }
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
import { getDefaultSiteSettings } from '@/data/siteSettings'

const settings = getDefaultSiteSettings()

describe('Footer', () => {
  it('renders the site name and tagline', () => {
    render(<Footer settings={settings} />)
    expect(screen.getAllByText('CODE & ALGO').length).toBeGreaterThan(0)
    expect(screen.getByText(settings.tagline)).toBeDefined()
  })

  it('renders contact email and phone links', () => {
    render(<Footer settings={settings} />)
    expect(screen.getAllByRole('link', { name: settings.email }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: settings.phone }).length).toBeGreaterThan(0)
  })

  it('renders service links from the services array', () => {
    render(<Footer settings={settings} />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('renders legal text', () => {
    render(<Footer settings={settings} />)
    expect(screen.getAllByText(settings.legal).length).toBeGreaterThan(0)
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

  it('clears local validation state on the success transition and skips it once already cleared', () => {
    mockFormState = { ok: false }
    const { rerender } = render(<ContactForm />)
    mockFormState = { ok: true, message: 'Message Sent ✓' }
    rerender(<ContactForm />)
    expect(screen.getByRole('button', { name: /message sent/i })).toBeDefined()
    mockFormState = { ok: false }
    rerender(<ContactForm />)
    expect(screen.getByRole('button', { name: /send message/i })).toBeDefined()
  })

  it('shows pending state while submitting', () => {
    mockFormState = { ok: false }
    mockPending = true
    render(<ContactForm />)
    expect(screen.getByRole('button', { name: /sending/i })).toBeDefined()
    mockPending = false
  })

  it('shows a client-side error after a field is touched and left invalid', () => {
    mockFormState = { ok: false }
    render(<ContactForm />)
    const name = screen.getByPlaceholderText('Full Name')
    fireEvent.change(name, { target: { value: 'A' } })
    fireEvent.blur(name)
    expect(screen.getByText('Please enter your name.')).toBeDefined()
  })

  it('clears a client-side error once the field becomes valid', () => {
    mockFormState = { ok: false }
    render(<ContactForm />)
    const name = screen.getByPlaceholderText('Full Name')
    fireEvent.change(name, { target: { value: 'A' } })
    fireEvent.blur(name)
    expect(screen.getByText('Please enter your name.')).toBeDefined()
    fireEvent.change(name, { target: { value: 'Abdul' } })
    expect(screen.queryByText('Please enter your name.')).toBeNull()
  })

  it('validates the consent checkbox and the details textarea on blur', () => {
    mockFormState = { ok: false }
    render(<ContactForm />)
    const consent = screen.getByRole('checkbox')
    fireEvent.click(consent)
    fireEvent.blur(consent)
    fireEvent.click(consent)
    expect(screen.getByText('Please agree to be contacted.')).toBeDefined()

    const details = screen.getByPlaceholderText('Project Details')
    fireEvent.change(details, { target: { value: 'short' } })
    fireEvent.blur(details)
    expect(screen.getByText(/tell us a little/i)).toBeDefined()
  })

  it('validates email on blur', () => {
    mockFormState = { ok: false }
    render(<ContactForm />)
    const email = screen.getByPlaceholderText('Email')
    fireEvent.change(email, { target: { value: 'bad' } })
    fireEvent.blur(email)
    expect(screen.getByText('Please enter a valid email address.')).toBeDefined()
  })

  it('handles a generic server error state without throwing', () => {
    mockFormState = {
      ok: false,
      message: 'Something went wrong sending your message. Please email us directly.',
    }
    render(<ContactForm />)
    expect(screen.getByRole('button', { name: /send message/i })).toBeDefined()
  })

  it('prevents submission and marks all validated fields touched when the form is invalid', () => {
    mockFormState = { ok: false }
    const { container } = render(<ContactForm />)
    const form = container.querySelector('form') as HTMLFormElement
    fireEvent.submit(form)
    expect(screen.getByText('Please enter your name.')).toBeDefined()
    expect(screen.getByText('Please enter a valid email address.')).toBeDefined()
    expect(screen.getByText('Please agree to be contacted.')).toBeDefined()
  })

  it('reverts to the send state after the success timeout elapses', () => {
    vi.useFakeTimers()
    mockFormState = { ok: false }
    const { rerender } = render(<ContactForm />)
    mockFormState = { ok: true, message: 'Message Sent ✓' }
    rerender(<ContactForm />)
    expect(screen.getByRole('button', { name: /message sent/i })).toBeDefined()

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(screen.getByRole('button', { name: /send message/i })).toBeDefined()
    vi.useRealTimers()
  })

  it('allows submission through when every validated field is valid', () => {
    mockFormState = { ok: false }
    const { container } = render(<ContactForm />)
    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'Abdul' } })
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'a@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('Project Details'), {
      target: { value: 'I need a custom website built for my business.' },
    })
    fireEvent.click(screen.getByRole('checkbox'))
    const form = container.querySelector('form') as HTMLFormElement
    fireEvent.submit(form)
    expect(screen.queryByText('Please enter your name.')).toBeNull()
    expect(screen.queryByText('Please enter a valid email address.')).toBeNull()
    expect(screen.queryByText('Please agree to be contacted.')).toBeNull()
  })
})
