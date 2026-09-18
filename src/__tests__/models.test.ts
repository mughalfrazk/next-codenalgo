import { describe, expect, it } from 'vitest'
import { siteSettingsSchema, socialLinkSchema } from '@/models/siteSettings'
import { contactSubmissionSchema } from '@/models/contactSubmission'

describe('siteSettings model', () => {
  const valid = {
    name: 'Code & Algo',
    tagline: 'tag',
    email: 'a@b.com',
    phone: '+44',
    address: 'addr',
    addressShort: 'short',
    businessHours: 'hours',
    url: 'https://example.com',
    legal: 'legal',
    socials: [{ label: 'LinkedIn', short: 'in', href: 'https://linkedin.com' }],
  }

  it('validates a full SiteSettings object', () => {
    expect(siteSettingsSchema.safeParse(valid).success).toBe(true)
  })

  it('rejects an invalid email', () => {
    expect(siteSettingsSchema.safeParse({ ...valid, email: 'bad' }).success).toBe(false)
  })

  it('rejects an invalid social link href', () => {
    expect(socialLinkSchema.safeParse({ label: 'x', short: 'x', href: 'not-a-url' }).success).toBe(
      false
    )
  })
})

describe('contactSubmission model', () => {
  const validSubmission = {
    id: 'sub-1',
    name: 'Abdul Rasheed',
    email: 'a@example.com',
    details: 'I need a custom website built for my business.',
    consent: 'on' as const,
    createdAt: 1_700_000_000_000,
    emailStatus: 'sent' as const,
  }

  it('validates a full ContactSubmission object', () => {
    expect(contactSubmissionSchema.safeParse(validSubmission).success).toBe(true)
  })

  it('rejects an unknown emailStatus', () => {
    expect(
      contactSubmissionSchema.safeParse({ ...validSubmission, emailStatus: 'archived' }).success
    ).toBe(false)
  })

  it('rejects a missing id', () => {
    const { id: _id, ...rest } = validSubmission
    expect(contactSubmissionSchema.safeParse(rest).success).toBe(false)
  })
})
