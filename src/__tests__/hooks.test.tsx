import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useSaveSiteSettings, useSiteSettings } from '@/hooks/useSiteSettings'
import type { SiteSettings } from '@/models/siteSettings'

vi.mock('@/data/siteSettings', () => ({
  fetchSiteSettings: vi.fn().mockResolvedValue({ name: 'Test' } as SiteSettings),
  saveSiteSettings: vi.fn().mockResolvedValue(undefined),
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
