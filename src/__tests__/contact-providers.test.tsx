import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ContactProviders } from '@/app/(site)/contact/providers'

describe('ContactProviders', () => {
  it('renders children within Mantine + notifications context', () => {
    render(
      <ContactProviders>
        <div>contact form</div>
      </ContactProviders>
    )
    expect(screen.getByText('contact form')).toBeDefined()
  })
})
