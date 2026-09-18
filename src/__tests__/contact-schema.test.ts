import { describe, expect, it } from 'vitest'
import { contactSubmissionInputSchema } from '@/models/contactSubmission'

const valid = {
  name: 'Abdul Rasheed',
  email: 'a@example.com',
  details: 'I need a custom website built for my business.',
  consent: 'on' as const,
}

describe('contactSubmissionInputSchema', () => {
  it('accepts a minimal valid payload', () => {
    expect(contactSubmissionInputSchema.safeParse(valid).success).toBe(true)
  })

  it("accepts consent as 'true' string", () => {
    expect(contactSubmissionInputSchema.safeParse({ ...valid, consent: 'true' }).success).toBe(true)
  })

  it('accepts consent as boolean true', () => {
    expect(contactSubmissionInputSchema.safeParse({ ...valid, consent: true }).success).toBe(true)
  })

  it('accepts optional fields when provided', () => {
    const result = contactSubmissionInputSchema.safeParse({
      ...valid,
      company: 'ACME Ltd',
      phone: '+44 7700 900000',
      service: 'AI/ML Solutions',
      budget: '£10k–£25k',
    })
    expect(result.success).toBe(true)
  })

  it('accepts empty string for optional fields', () => {
    const result = contactSubmissionInputSchema.safeParse({
      ...valid,
      company: '',
      phone: '',
      service: '',
      budget: '',
    })
    expect(result.success).toBe(true)
  })

  it('rejects name shorter than 2 chars', () => {
    const result = contactSubmissionInputSchema.safeParse({ ...valid, name: 'A' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Please enter your name.')
    }
  })

  it('rejects invalid email', () => {
    const result = contactSubmissionInputSchema.safeParse({ ...valid, email: 'not-an-email' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Please enter a valid email address.')
    }
  })

  it('rejects details shorter than 10 chars', () => {
    const result = contactSubmissionInputSchema.safeParse({ ...valid, details: 'Too short' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Tell us a little about your project (10+ characters).'
      )
    }
  })

  it('rejects consent as false boolean', () => {
    const result = contactSubmissionInputSchema.safeParse({ ...valid, consent: false })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Please agree to be contacted.')
    }
  })

  it("rejects consent as 'off' string", () => {
    const result = contactSubmissionInputSchema.safeParse({ ...valid, consent: 'off' })
    expect(result.success).toBe(false)
  })

  it('trims whitespace from name', () => {
    const result = contactSubmissionInputSchema.safeParse({ ...valid, name: '  AB  ' })
    expect(result.success).toBe(true)
    if (result.success) expect(result.data.name).toBe('AB')
  })
})
