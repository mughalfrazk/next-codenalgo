import type { ContactSubmissionInput } from '@/models/contactSubmission'

export type ContactState = {
  ok: boolean
  message?: string
  errors?: Partial<Record<keyof ContactSubmissionInput, string>>
}
