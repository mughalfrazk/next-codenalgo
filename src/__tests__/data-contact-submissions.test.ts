import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const mockSend = vi.fn().mockResolvedValue({ error: null })
vi.mock('resend', () => ({
  Resend: class MockResend {
    emails = { send: mockSend }
  },
}))

vi.mock('@/data/siteSettings', () => ({
  fetchSiteSettings: vi.fn().mockResolvedValue({ email: 'hello@codenalgo.com' }),
}))

const mockAddDoc = vi.fn()
const mockUpdateDoc = vi.fn().mockResolvedValue(undefined)
const mockDeleteDoc = vi.fn().mockResolvedValue(undefined)
const mockGetDocs = vi.fn()
const mockCollection = vi.fn().mockReturnValue({})
const mockDoc = vi.fn().mockReturnValue({ id: 'sub-1' })
const mockQuery = vi.fn((...args: unknown[]) => args[0])
const mockOrderBy = vi.fn()

vi.mock('firebase/firestore/lite', () => ({
  addDoc: (...args: unknown[]) => mockAddDoc(...args),
  collection: (...args: unknown[]) => mockCollection(...args),
  deleteDoc: (...args: unknown[]) => mockDeleteDoc(...args),
  doc: (...args: unknown[]) => mockDoc(...args),
  getDocs: (...args: unknown[]) => mockGetDocs(...args),
  orderBy: (...args: unknown[]) => mockOrderBy(...args),
  query: (...args: unknown[]) => mockQuery(...args),
  updateDoc: (...args: unknown[]) => mockUpdateDoc(...args),
}))

let configured = true
vi.mock('@/lib/firebase/client', () => ({
  getFirebaseDb: () => ({}),
  isFirebaseConfigured: () => configured,
}))

import { fetchContactSubmissions, submitContactSubmission } from '@/data/contactSubmissions'

const input = {
  name: 'Abdul Rasheed',
  email: 'a@example.com',
  details: 'I need a custom website built for my business.',
  consent: 'on' as const,
}

describe('contact submissions data layer', () => {
  beforeEach(() => {
    configured = true
    mockAddDoc.mockReset().mockResolvedValue({ id: 'sub-1' })
    mockUpdateDoc.mockClear()
    mockDeleteDoc.mockClear()
    mockGetDocs.mockReset()
    mockSend.mockClear().mockResolvedValue({ error: null })
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  describe('submitContactSubmission', () => {
    it('fails without writing when Firebase is not configured', async () => {
      configured = false
      const result = await submitContactSubmission(input)
      expect(result.ok).toBe(false)
      expect(mockAddDoc).not.toHaveBeenCalled()
    })

    it('fails gracefully when the initial Firestore write is rejected', async () => {
      mockAddDoc.mockRejectedValueOnce(new Error('Missing or insufficient permissions.'))
      const result = await submitContactSubmission(input)
      expect(result.ok).toBe(false)
      expect(mockSend).not.toHaveBeenCalled()
    })

    it('writes the doc and marks it skipped when RESEND_API_KEY is unset', async () => {
      vi.stubEnv('RESEND_API_KEY', '')
      const result = await submitContactSubmission(input)
      expect(result.ok).toBe(true)
      expect(mockAddDoc).toHaveBeenCalled()
      expect(mockUpdateDoc).toHaveBeenCalledWith(expect.anything(), { emailStatus: 'skipped' })
      expect(mockDeleteDoc).not.toHaveBeenCalled()
    })

    it('writes the doc and marks it sent when the email succeeds', async () => {
      vi.stubEnv('RESEND_API_KEY', 're_test_key')
      const result = await submitContactSubmission(input)
      expect(result.ok).toBe(true)
      expect(mockUpdateDoc).toHaveBeenCalledWith(expect.anything(), { emailStatus: 'sent' })
      expect(mockDeleteDoc).not.toHaveBeenCalled()
    })

    it('rolls back the doc when Resend returns an error', async () => {
      vi.stubEnv('RESEND_API_KEY', 're_test_key')
      mockSend.mockResolvedValueOnce({ error: { message: 'Resend failure' } })
      const result = await submitContactSubmission(input)
      expect(result.ok).toBe(false)
      expect(mockDeleteDoc).toHaveBeenCalled()
      expect(mockUpdateDoc).not.toHaveBeenCalled()
    })

    it('rolls back the doc when Resend throws', async () => {
      vi.stubEnv('RESEND_API_KEY', 're_test_key')
      mockSend.mockRejectedValueOnce(new Error('network error'))
      const result = await submitContactSubmission(input)
      expect(result.ok).toBe(false)
      expect(mockDeleteDoc).toHaveBeenCalled()
    })

    it('uses CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL env vars when set', async () => {
      vi.stubEnv('RESEND_API_KEY', 're_test_key')
      vi.stubEnv('CONTACT_FROM_EMAIL', 'from@custom.com')
      vi.stubEnv('CONTACT_TO_EMAIL', 'to@custom.com')
      await submitContactSubmission(input)
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({ from: 'from@custom.com', to: 'to@custom.com' })
      )
    })

    it('includes optional fields in the email subject and body', async () => {
      vi.stubEnv('RESEND_API_KEY', 're_test_key')
      await submitContactSubmission({
        ...input,
        company: 'ACME Ltd',
        phone: '+44 7700 900000',
        service: 'AI/ML Solutions',
        budget: '$25k – $100k',
      })
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: expect.stringContaining('ACME Ltd'),
          text: expect.stringContaining('Service: AI/ML Solutions'),
        })
      )
    })
  })

  describe('fetchContactSubmissions', () => {
    it('returns an empty list when Firebase is not configured', async () => {
      configured = false
      const result = await fetchContactSubmissions()
      expect(result).toEqual([])
    })

    it('parses and returns valid submissions', async () => {
      mockGetDocs.mockResolvedValue({
        docs: [
          {
            id: 'sub-1',
            data: () => ({ ...input, createdAt: 1000, emailStatus: 'sent' }),
          },
        ],
      })
      const result = await fetchContactSubmissions()
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe('sub-1')
    })

    it('skips documents that fail schema validation', async () => {
      mockGetDocs.mockResolvedValue({
        docs: [{ id: 'bad', data: () => ({ bad: true }) }],
      })
      const result = await fetchContactSubmissions()
      expect(result).toEqual([])
    })
  })
})
