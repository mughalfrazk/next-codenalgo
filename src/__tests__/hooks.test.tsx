import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useSaveSiteSettings, useSiteSettings } from '@/hooks/useSiteSettings'
import { useContactSubmissions } from '@/hooks/useContactSubmissions'
import type { SiteSettings } from '@/models/siteSettings'
import type { ContactSubmission } from '@/models/contactSubmission'

vi.mock('@/data/siteSettings', () => ({
  fetchSiteSettings: vi.fn().mockResolvedValue({ name: 'Test' } as SiteSettings),
  saveSiteSettings: vi.fn().mockResolvedValue(undefined),
}))

vi.mock('@/data/contactSubmissions', () => ({
  fetchContactSubmissions: vi
    .fn()
    .mockResolvedValue([{ id: 'sub-1' }] as unknown as ContactSubmission[]),
}))

function wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

describe('useSiteSettings hooks', () => {
  it('fetches site settings', async () => {
    const { result } = renderHook(() => useSiteSettings(), { wrapper })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data?.name).toBe('Test')
  })

  it('saves site settings', async () => {
    const { result } = renderHook(() => useSaveSiteSettings(), { wrapper })
    result.current.mutate({ name: 'Test' } as SiteSettings)
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
  })
})

describe('useContactSubmissions', () => {
  it('fetches contact submissions', async () => {
    const { result } = renderHook(() => useContactSubmissions(), { wrapper })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data?.[0].id).toBe('sub-1')
  })
})
