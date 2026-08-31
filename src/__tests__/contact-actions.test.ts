import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { submitContact } from '@/app/contact/actions'
import type { ContactState } from '@/app/contact/schema'

const mockSend = vi.fn().mockResolvedValue({ error: null })

vi.mock('resend', () => {
  return {
    Resend: class MockResend {
      emails = { send: mockSend }
    },
  }
})

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
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  describe('validation failures', () => {
    it('returns errors for invalid fields', async () => {
      const fd = validFormData({ name: 'A', email: 'bad' })
      const result = await submitContact(initialState, fd)
      expect(result.ok).toBe(false)
      expect(result.message).toBe('Please fix the highlighted fields.')
      expect(result.errors?.name).toBeDefined()
      expect(result.errors?.email).toBeDefined()
    })

    it('returns first error per field only', async () => {
      const fd = validFormData({ name: 'A' })
      const result = await submitContact(initialState, fd)
      expect(Object.keys(result.errors ?? {}).length).toBeGreaterThan(0)
    })
  })

  describe('without RESEND_API_KEY', () => {
    beforeEach(() => {
      vi.stubEnv('RESEND_API_KEY', '')
    })

    it('succeeds silently and returns ok:true', async () => {
      const result = await submitContact(initialState, validFormData())
      expect(result.ok).toBe(true)
      expect(result.message).toBe('Message Sent ✓')
    })

    it('includes optional fields in the logged summary', async () => {
      const fd = validFormData({
        company: 'ACME',
        phone: '+44 7700 900000',
        service: 'AI/ML',
        budget: '£10k',
      })
      const result = await submitContact(initialState, fd)
      expect(result.ok).toBe(true)
    })
  })

  describe('with RESEND_API_KEY', () => {
    beforeEach(() => {
      vi.stubEnv('RESEND_API_KEY', 're_test_key')
    })

    it('sends email and returns ok:true on success', async () => {
      const result = await submitContact(initialState, validFormData())
      expect(result.ok).toBe(true)
      expect(result.message).toBe('Message Sent ✓')
    })

    it('uses CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL env vars when set', async () => {
      vi.stubEnv('CONTACT_FROM_EMAIL', 'from@custom.com')
      vi.stubEnv('CONTACT_TO_EMAIL', 'to@custom.com')
      const result = await submitContact(initialState, validFormData())
      expect(result.ok).toBe(true)
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'from@custom.com',
          to: 'to@custom.com',
        })
      )
    })

    it('includes company name in email subject when provided', async () => {
      const fd = validFormData({ company: 'ACME Ltd' })
      await submitContact(initialState, fd)
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: expect.stringContaining('ACME Ltd'),
        })
      )
    })

    it('returns error state when Resend returns an error', async () => {
      mockSend.mockResolvedValueOnce({ error: { message: 'Resend failure' } })
      const result = await submitContact(initialState, validFormData())
      expect(result.ok).toBe(false)
      expect(result.message).toMatch(/something went wrong/i)
    })

    it('returns error state when Resend throws', async () => {
      mockSend.mockRejectedValueOnce(new Error('network error'))
      const result = await submitContact(initialState, validFormData())
      expect(result.ok).toBe(false)
      expect(result.message).toMatch(/something went wrong/i)
    })
  })
})
