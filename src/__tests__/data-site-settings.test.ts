import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockGetDoc = vi.fn()
const mockSetDoc = vi.fn().mockResolvedValue(undefined)
const mockDoc = vi.fn().mockReturnValue({ id: 'default' })

vi.mock('firebase/firestore/lite', () => ({
  doc: (...args: unknown[]) => mockDoc(...args),
  getDoc: (...args: unknown[]) => mockGetDoc(...args),
  setDoc: (...args: unknown[]) => mockSetDoc(...args),
}))

let configured = true
vi.mock('@/lib/firebase/client', () => ({
  getFirebaseDb: () => ({}),
  isFirebaseConfigured: () => configured,
}))

import { fetchSiteSettings, getDefaultSiteSettings, saveSiteSettings } from '@/data/siteSettings'

describe('site settings data layer', () => {
  beforeEach(() => {
    configured = true
    mockGetDoc.mockReset()
    mockSetDoc.mockClear()
  })

  it('falls back to defaults when Firebase is not configured', async () => {
    configured = false
    const result = await fetchSiteSettings()
    expect(result).toEqual(getDefaultSiteSettings())
  })

  it('falls back to defaults when the document does not exist', async () => {
    mockGetDoc.mockResolvedValue({ exists: () => false })
    const result = await fetchSiteSettings()
    expect(result).toEqual(getDefaultSiteSettings())
  })

  it('falls back to defaults when the stored document fails validation', async () => {
    mockGetDoc.mockResolvedValue({ exists: () => true, data: () => ({ bad: true }) })
    const result = await fetchSiteSettings()
    expect(result).toEqual(getDefaultSiteSettings())
  })

  it('returns the parsed document when valid', async () => {
    const settings = { ...getDefaultSiteSettings(), name: 'Custom Name' }
    mockGetDoc.mockResolvedValue({ exists: () => true, data: () => settings })
    const result = await fetchSiteSettings()
    expect(result.name).toBe('Custom Name')
  })

  it('validates and writes settings on save', async () => {
    await saveSiteSettings(getDefaultSiteSettings())
    expect(mockSetDoc).toHaveBeenCalledWith(
      { id: 'default' },
      expect.objectContaining({
        name: getDefaultSiteSettings().name,
        updatedAt: expect.any(Number),
      })
    )
  })

  it('throws when saving an invalid settings object', async () => {
    await expect(saveSiteSettings({ ...getDefaultSiteSettings(), email: 'bad' })).rejects.toThrow()
  })
})
