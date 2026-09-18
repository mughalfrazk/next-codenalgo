import { describe, expect, it, vi } from 'vitest'
import { submitContact } from '@/app/(site)/contact/actions'
import type { ContactState } from '@/app/(site)/contact/schema'

const mockSubmitContactSubmission = vi.fn()
vi.mock('@/data/contactSubmissions', () => ({
  submitContactSubmission: (...args: unknown[]) => mockSubmitContactSubmission(...args),
}))

const initialState: ContactState = { ok: false }

const validFormData = (overrides: Record<string, string> = {}): FormData => {
  const fd = new FormData()
  fd.append('name', 'Abdul Rasheed')
  fd.append('email', 'a@example.com')
  fd.append('details', 'I need a custom website built for my business.')
  fd.append('consent', 'on')
  for (const [k, v] of Object.entries(overrides)) fd.set(k, v)
  return fd
}

describe('submitContact', () => {
  describe('validation failures', () => {
    it('returns errors for invalid fields without calling the data layer', async () => {
      const fd = validFormData({ name: 'A', email: 'bad' })
      const result = await submitContact(initialState, fd)
      expect(result.ok).toBe(false)
      expect(result.message).toBe('Please fix the highlighted fields.')
      expect(result.errors?.name).toBeDefined()
      expect(result.errors?.email).toBeDefined()
      expect(mockSubmitContactSubmission).not.toHaveBeenCalled()
    })

    it('returns first error per field only', async () => {
      const fd = validFormData({ name: 'A' })
      const result = await submitContact(initialState, fd)
      expect(Object.keys(result.errors ?? {}).length).toBeGreaterThan(0)
    })
  })

  describe('delegating to the data layer', () => {
    it('returns ok:true when the submission succeeds', async () => {
      mockSubmitContactSubmission.mockResolvedValueOnce({ ok: true })
      const result = await submitContact(initialState, validFormData())
      expect(result.ok).toBe(true)
      expect(result.message).toBe('Message Sent ✓')
      expect(mockSubmitContactSubmission).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Abdul Rasheed', email: 'a@example.com' })
      )
    })

    it('passes through the failure message when the submission fails', async () => {
      mockSubmitContactSubmission.mockResolvedValueOnce({
        ok: false,
        message: 'Something went wrong sending your message. Please email us directly.',
      })
      const result = await submitContact(initialState, validFormData())
      expect(result.ok).toBe(false)
      expect(result.message).toMatch(/something went wrong/i)
    })
  })
})
