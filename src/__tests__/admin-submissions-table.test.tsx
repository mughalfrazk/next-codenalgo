import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SubmissionsTable } from '@/components/admin/SubmissionsTable'
import type { ContactSubmission } from '@/models/contactSubmission'

const submissions: ContactSubmission[] = [
  {
    id: 'sub-1',
    name: 'Maria Fenn',
    email: 'maria@fennlabs.io',
    details: 'Interested in a staff-augmentation engagement for our platform team next quarter.',
    consent: 'on',
    company: 'Fenn Labs',
    phone: '+1 415 555 0100',
    service: 'Staff Augmentation',
    budget: '$25k – $100k',
    createdAt: Date.now() - 2 * 60 * 60 * 1000,
    emailStatus: 'sent',
  },
  {
    id: 'sub-2',
    name: 'Tom Reyes',
    email: 'tom@reyesdigital.com',
    details: 'Website looks great, do you also do audits?',
    consent: 'on',
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    emailStatus: 'skipped',
  },
  {
    id: 'sub-3',
    name: 'Lena Voss',
    email: 'lena@vossmedia.co',
    details: 'Reaching out about a long-term retainer.',
    consent: 'on',
    createdAt: Date.now(),
    emailStatus: 'sent',
  },
  {
    id: 'sub-4',
    name: 'Derek Chu',
    email: 'derek@chuventures.com',
    details: 'Following up on our call last week.',
    consent: 'on',
    createdAt: Date.now() - 15 * 60 * 1000,
    emailStatus: 'sent',
  },
  {
    id: 'sub-5',
    name: 'Aisha Patel',
    email: 'aisha@patelco.com',
    details: 'Can you share pricing for a discovery sprint?',
    consent: 'on',
    createdAt: Date.now() - 20 * 24 * 60 * 60 * 1000,
    emailStatus: 'sent',
  },
  {
    id: 'sub-6',
    name: 'Jordan Blake',
    email: 'jordan@northbridge.co',
    details: 'Mid-write submission with no resolved delivery status yet.',
    consent: 'on',
    createdAt: Date.now(),
    emailStatus: 'pending',
  },
  {
    id: 'sub-7',
    name: 'Madonna',
    email: 'madonna@example.com',
    details: 'Single-word name, to exercise the initials fallback.',
    consent: 'on',
    createdAt: Date.now(),
    emailStatus: 'sent',
  },
]

const mockFetch = vi.fn().mockResolvedValue(submissions)
vi.mock('@/data/contactSubmissions', () => ({
  fetchContactSubmissions: (...args: unknown[]) => mockFetch(...args),
}))

function renderTable() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <SubmissionsTable />
      </QueryClientProvider>
    </MantineProvider>
  )
}

describe('SubmissionsTable', () => {
  it('lists submissions with name, email, truncated message, and email status', async () => {
    renderTable()
    expect(await screen.findByText('Maria Fenn')).toBeTruthy()
    expect(screen.getByText('maria@fennlabs.io')).toBeTruthy()
    expect(screen.getAllByText('Sent').length).toBeGreaterThan(0)
    expect(screen.getByText('Skipped')).toBeTruthy()
  })

  it('opens a modal with full details when a row is clicked, and closes it', async () => {
    renderTable()
    const row = await screen.findByText('Maria Fenn')
    fireEvent.click(row)
    expect(await screen.findByText('Fenn Labs')).toBeTruthy()
    expect(screen.getByText('Staff Augmentation')).toBeTruthy()
    expect(screen.getByText('$25k – $100k')).toBeTruthy()
    expect(screen.getByText('MF')).toBeTruthy()
    expect(screen.getByRole('link', { name: /reply/i }).getAttribute('href')).toBe(
      'mailto:maria@fennlabs.io'
    )

    const closeButton = document.querySelector('.mantine-Modal-close') as HTMLButtonElement
    fireEvent.click(closeButton)
    expect(screen.queryByText('Fenn Labs')).toBeNull()
  })

  it('renders a modal without company/phone/service/budget for a minimal submission', async () => {
    renderTable()
    const row = await screen.findByText('Tom Reyes')
    fireEvent.click(row)
    expect(await screen.findByText('TR')).toBeTruthy()
    expect(screen.queryByText('Company')).toBeNull()
    expect(screen.queryByText('Phone')).toBeNull()
  })

  it('falls back to a single-letter initial for a one-word name', async () => {
    renderTable()
    const row = await screen.findByText('Madonna')
    fireEvent.click(row)
    expect(await screen.findByText('M')).toBeTruthy()
  })

  it('shows relative times across minutes, hours, days, and weeks', async () => {
    renderTable()
    expect((await screen.findAllByText('just now')).length).toBeGreaterThan(0)
    expect(screen.getByText('15m ago')).toBeTruthy()
    expect(screen.getByText('2h ago')).toBeTruthy()
    expect(screen.getByText('5d ago')).toBeTruthy()
    expect(screen.getByText('3w ago')).toBeTruthy()
  })

  it('renders no badge for a submission with an unresolved email status', async () => {
    renderTable()
    expect(await screen.findByText('Jordan Blake')).toBeTruthy()
    const row = screen.getByText('Jordan Blake').closest('tr') as HTMLElement
    expect(row.querySelector('.mantine-Badge-root')).toBeNull()
  })

  it('shows a retry alert when loading fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('permission-denied'))
    renderTable()
    expect(await screen.findByText(/could not load submissions/i)).toBeTruthy()
    mockFetch.mockResolvedValueOnce(submissions)
    fireEvent.click(screen.getByRole('button', { name: /retry/i }))
    expect(await screen.findByText('Maria Fenn')).toBeTruthy()
  })

  it('renders an empty table when there are no submissions', async () => {
    mockFetch.mockResolvedValueOnce([])
    renderTable()
    expect(await screen.findByText('Submissions')).toBeTruthy()
    expect(screen.queryByText('Maria Fenn')).toBeNull()
  })

  it('shows a generic message when the load failure is not an Error instance', async () => {
    mockFetch.mockRejectedValueOnce('offline')
    renderTable()
    expect(await screen.findByText('Something went wrong.')).toBeTruthy()
  })
})
