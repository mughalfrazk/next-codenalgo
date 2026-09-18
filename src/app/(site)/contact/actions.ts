'use server'

import { contactSubmissionInputSchema } from '@/models/contactSubmission'
import { submitContactSubmission } from '@/data/contactSubmissions'
import type { ContactState } from './schema'

/**
 * Handle a contact-form submission.
 *
 * Validates on the server (source of truth), then delegates persistence and
 * email delivery to the data layer.
 */
export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = Object.fromEntries(formData.entries())
  const parsed = contactSubmissionInputSchema.safeParse(raw)

  if (!parsed.success) {
    const errors: ContactState['errors'] = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof typeof errors
      /* v8 ignore next -- path[0] always present for field-level Zod errors */
      if (key && !errors[key]) errors[key] = issue.message
    }
    return { ok: false, message: 'Please fix the highlighted fields.', errors }
  }

  const result = await submitContactSubmission(parsed.data)

  if (!result.ok) return { ok: false, message: result.message }
  return { ok: true, message: 'Message Sent ✓' }
}
