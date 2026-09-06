import { describe, expect, it } from 'vitest'
import { siteSettingsSchema, socialLinkSchema } from '@/models/siteSettings'

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
