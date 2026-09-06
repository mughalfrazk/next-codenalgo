import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { getDefaultSiteSettings } from '@/data/siteSettings'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

vi.mock('@/data/siteSettings', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/data/siteSettings')>()
  return {
    ...actual,
    fetchSiteSettings: vi.fn().mockResolvedValue(actual.getDefaultSiteSettings()),
  }
})

import SiteLayout from '@/app/(site)/layout'

describe('SiteLayout', () => {
  it('renders the marketing chrome around its children', async () => {
    const ui = await SiteLayout({ children: <div>page content</div> })
    render(ui)
    expect(screen.getByText('page content')).toBeTruthy()
    expect(screen.getAllByText(getDefaultSiteSettings().legal).length).toBeGreaterThan(0)
  })
})
