import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AuthProvider, useAuth } from '@/lib/firebase/AuthProvider'

const mockOnAuthStateChanged = vi.fn()
let configured = true

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: (...args: unknown[]) => mockOnAuthStateChanged(...args),
}))
vi.mock('@/lib/firebase/client', () => ({
  getFirebaseAuth: () => ({}),
  isFirebaseConfigured: () => configured,
}))

function Probe() {
  const { user, loading } = useAuth()
  return <div>{loading ? 'loading' : user ? `user:${user.uid}` : 'no-user'}</div>
}

describe('AuthProvider', () => {
  it('reports no user immediately when Firebase is not configured', async () => {
    configured = false
    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>
    )
    await waitFor(() => expect(screen.getByText('no-user')).toBeTruthy())
  })

  it('subscribes to auth state changes and exposes the signed-in user', async () => {
    configured = true
    let callback: (user: unknown) => void = () => {}
    mockOnAuthStateChanged.mockImplementation((_auth, cb) => {
      callback = cb
      return vi.fn()
    })

    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>
    )

    callback({ uid: 'u1' })
    await waitFor(() => expect(screen.getByText('user:u1')).toBeTruthy())
  })

  it('returns the default context outside a provider', () => {
    function Bare() {
      const { user, loading } = useAuth()
      return <div>{loading ? 'loading' : String(user)}</div>
    }
    render(<Bare />)
    expect(screen.getByText('loading')).toBeTruthy()
  })
})
