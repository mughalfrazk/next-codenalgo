import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SiteSettingsForm } from '@/components/admin/SiteSettingsForm'
import type { SiteSettings } from '@/models/siteSettings'

const settings: SiteSettings = {
  name: 'Code & Algo',
  tagline: 'tag',
  email: 'a@b.com',
  phone: '+44',
  address: 'addr',
  addressShort: 'short',
  businessHours: 'hours',
  url: 'https://example.com',
  legal: 'legal',
  socials: [{ label: 'LinkedIn', short: 'in', href: 'https://linkedin.com/company/codenalgo' }],
}

const mockFetch = vi.fn().mockResolvedValue(settings)
const mockSave = vi.fn().mockResolvedValue(undefined)

vi.mock('@/data/siteSettings', () => ({
  fetchSiteSettings: (...args: unknown[]) => mockFetch(...args),
  saveSiteSettings: (...args: unknown[]) => mockSave(...args),
}))

function renderForm() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <MantineProvider>
      <Notifications />
      <QueryClientProvider client={queryClient}>
        <SiteSettingsForm />
      </QueryClientProvider>
    </MantineProvider>
  )
}

describe('SiteSettingsForm', () => {
  it('loads and displays current settings, then saves changes', async () => {
    renderForm()
    const nameInput = await screen.findByDisplayValue('Code & Algo')
    fireEvent.change(nameInput, { target: { value: 'New Name' } })
    fireEvent.click(screen.getByRole('button', { name: /save changes/i }))
    await waitFor(() =>
      expect(mockSave).toHaveBeenCalledWith(expect.objectContaining({ name: 'New Name' }))
    )
    expect(await screen.findByText(/site settings updated/i)).toBeTruthy()
  })

  it('shows an error notification when saving fails', async () => {
    mockSave.mockRejectedValueOnce(new Error('fail'))
    renderForm()
    await screen.findByDisplayValue('Code & Algo')
    fireEvent.click(screen.getByRole('button', { name: /save changes/i }))
    expect(await screen.findByText(/could not save settings/i)).toBeTruthy()
  })

  it('shows a retry alert when loading settings fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('permission-denied'))
    renderForm()
    expect(await screen.findByText(/could not load site settings/i)).toBeTruthy()
    mockFetch.mockResolvedValueOnce(settings)
    fireEvent.click(screen.getByRole('button', { name: /retry/i }))
    expect(await screen.findByDisplayValue('Code & Algo')).toBeTruthy()
  })

  it('shows a generic message when the load failure is not an Error instance', async () => {
    mockFetch.mockRejectedValueOnce('offline')
    renderForm()
    expect(await screen.findByText(/something went wrong/i)).toBeTruthy()
  })

  it('builds social hrefs, prefixing bare handles and keeping full URLs as-is', async () => {
    renderForm()
    await screen.findByDisplayValue('Code & Algo')
    fireEvent.change(screen.getByLabelText('LinkedIn'), {
      target: { value: 'linkedin.com/company/codenalgo' },
    })
    fireEvent.change(screen.getByLabelText('Facebook'), {
      target: { value: 'https://facebook.com/codenalgo' },
    })
    fireEvent.click(screen.getByRole('button', { name: /save changes/i }))
    await waitFor(() =>
      expect(mockSave).toHaveBeenCalledWith(
        expect.objectContaining({
          socials: [
            {
              label: 'LinkedIn',
              short: 'in',
              href: 'https://linkedin.com/company/codenalgo',
            },
            { label: 'Facebook', short: 'fb', href: 'https://facebook.com/codenalgo' },
          ],
        })
      )
    )
  })
})
