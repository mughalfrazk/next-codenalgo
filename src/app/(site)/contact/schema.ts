import { z } from 'zod'

/** Shared contact-form schema — used by the client for hints and the server for the source of truth. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  service: z.string().trim().optional().or(z.literal('')),
  budget: z.string().trim().optional().or(z.literal('')),
  details: z.string().trim().min(10, 'Tell us a little about your project (10+ characters).'),
  consent: z
    .union([z.literal('on'), z.literal('true'), z.boolean()])
    .refine((v) => v === 'on' || v === 'true' || v === true, {
      message: 'Please agree to be contacted.',
    }),
})

export type ContactInput = z.infer<typeof contactSchema>

export type ContactState = {
  ok: boolean
  message?: string
  errors?: Partial<Record<keyof ContactInput, string>>
}
