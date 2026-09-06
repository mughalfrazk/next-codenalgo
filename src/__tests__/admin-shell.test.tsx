import { MantineProvider } from '@mantine/core'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

const mockReplace = vi.fn()
let pathname = '/admin'
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
  usePathname: () => pathname,
}))

let authState: { user: { uid: string } | null; loading: boolean } = { user: null, loading: true }
vi.mock('@/lib/firebase/AuthProvider', () => ({
  useAuth: () => authState,
}))

const mockSignOut = vi.fn()
vi.mock('firebase/auth', () => ({
  signOut: (...args: unknown[]) => mockSignOut(...args),
}))
vi.mock('@/lib/firebase/client', () => ({
  getFirebaseAuth: () => ({}),
}))

import { AdminShell } from '@/components/admin/AdminShell'

function renderShell() {
  return render(
    <MantineProvider>
      <AdminShell>
        <div>protected content</div>
      </AdminShell>
    </MantineProvider>
  )
}

describe('AdminShell', () => {
  it('renders children directly on the login page', () => {
    pathname = '/admin/login'
    authState = { user: null, loading: false }
    renderShell()
    expect(screen.getByText('protected content')).toBeTruthy()
  })

  it('shows a loader while auth state is resolving', () => {
    pathname = '/admin'
    authState = { user: null, loading: true }
    const { container } = renderShell()
    expect(container.querySelector('.mantine-Loader-root')).toBeTruthy()
  })

  it('redirects to login when unauthenticated', () => {
    pathname = '/admin'
    authState = { user: null, loading: false }
    renderShell()
    expect(mockReplace).toHaveBeenCalledWith('/admin/login')
  })

  it('renders the shell with nav and content when authenticated', () => {
    pathname = '/admin/settings'
    authState = { user: { uid: 'u1' }, loading: false }
    renderShell()
    expect(screen.getByText('protected content')).toBeTruthy()
    expect(screen.getByText('Site Settings')).toBeTruthy()
  })

  it('signs out when the sign out control is clicked', () => {
    pathname = '/admin'
    authState = { user: { uid: 'u1' }, loading: false }
    renderShell()
    fireEvent.click(screen.getByText('Sign out'))
    expect(mockSignOut).toHaveBeenCalled()
  })
})
