import { describe, expect, it } from 'vitest'
import { contactSchema } from '@/app/contact/schema'

const valid = {
  name: 'Abdul Rasheed',
  email: 'a@example.com',
  details: 'I need a custom website built for my business.',
  consent: 'on' as const,
}

describe('contactSchema', () => {
  it('accepts a minimal valid payload', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })

  it("accepts consent as 'true' string", () => {
    expect(contactSchema.safeParse({ ...valid, consent: 'true' }).success).toBe(true)
  })

  it('accepts consent as boolean true', () => {
    expect(contactSchema.safeParse({ ...valid, consent: true }).success).toBe(true)
  })

  it('accepts optional fields when provided', () => {
    const result = contactSchema.safeParse({
      ...valid,
      company: 'ACME Ltd',
      phone: '+44 7700 900000',
      service: 'AI/ML Solutions',
      budget: '£10k–£25k',
    })
    expect(result.success).toBe(true)
  })

  it('accepts empty string for optional fields', () => {
    const result = contactSchema.safeParse({
      ...valid,
      company: '',
      phone: '',
      service: '',
      budget: '',
    })
    expect(result.success).toBe(true)
  })

  it('rejects name shorter than 2 chars', () => {
    const result = contactSchema.safeParse({ ...valid, name: 'A' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Please enter your name.')
    }
  })

  it('rejects invalid email', () => {
    const result = contactSchema.safeParse({ ...valid, email: 'not-an-email' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Please enter a valid email address.')
    }
  })

  it('rejects details shorter than 10 chars', () => {
    const result = contactSchema.safeParse({ ...valid, details: 'Too short' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Tell us a little about your project (10+ characters).'
      )
    }
  })

  it('rejects consent as false boolean', () => {
    const result = contactSchema.safeParse({ ...valid, consent: false })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Please agree to be contacted.')
    }
  })

  it("rejects consent as 'off' string", () => {
    const result = contactSchema.safeParse({ ...valid, consent: 'off' })
    expect(result.success).toBe(false)
  })

  it('trims whitespace from name', () => {
    const result = contactSchema.safeParse({ ...valid, name: '  AB  ' })
    expect(result.success).toBe(true)
    if (result.success) expect(result.data.name).toBe('AB')
  })
})
