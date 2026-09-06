import { z } from 'zod'

export const socialLinkSchema = z.object({
  label: z.string().min(1),
  short: z.string().min(1),
  href: z.url(),
})
export type SocialLink = z.infer<typeof socialLinkSchema>

/** Singleton document — the editable equivalent of src/content/site.ts. */
export const siteSettingsSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  email: z.email(),
  phone: z.string().min(1),
  address: z.string().min(1),
  addressShort: z.string().min(1),
  businessHours: z.string().min(1),
  url: z.url(),
  legal: z.string().min(1),
  socials: z.array(socialLinkSchema),
  updatedAt: z.number().optional(),
})
export type SiteSettings = z.infer<typeof siteSettingsSchema>

export const SITE_SETTINGS_DOC_ID = 'default'
