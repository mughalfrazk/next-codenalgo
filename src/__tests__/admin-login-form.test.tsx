import { MantineProvider } from '@mantine/core'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

const mockReplace = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
}))

const mockSignIn = vi.fn()
vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: (...args: unknown[]) => mockSignIn(...args),
}))
vi.mock('@/lib/firebase/client', () => ({
  getFirebaseAuth: () => ({}),
}))

import { LoginForm } from '@/components/admin/LoginForm'

function renderForm() {
  return render(
    <MantineProvider>
      <LoginForm />
    </MantineProvider>
  )
}

describe('LoginForm', () => {
  it('does not attempt to sign in when the form is invalid', async () => {
    renderForm()
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(mockSignIn).not.toHaveBeenCalled()
  })

  it('does not attempt to sign in with an invalid email and short password', async () => {
    renderForm()
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'not-an-email' } })
    fireEvent.change(screen.getByPlaceholderText(/your password/i), { target: { value: '123' } })
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(mockSignIn).not.toHaveBeenCalled()
  })

  it('signs in and redirects on success', async () => {
    mockSignIn.mockResolvedValueOnce(undefined)
    renderForm()
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'admin@example.com' } })
    fireEvent.change(screen.getByPlaceholderText(/your password/i), {
      target: { value: 'secretpw' },
    })
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))
    await waitFor(() => expect(mockReplace).toHaveBeenCalledWith('/admin'))
  })

  it('shows an error message on failed sign-in', async () => {
    mockSignIn.mockRejectedValueOnce(new Error('bad creds'))
    renderForm()
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'admin@example.com' } })
    fireEvent.change(screen.getByPlaceholderText(/your password/i), {
      target: { value: 'secretpw' },
    })
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))
    expect(await screen.findByText(/sign in failed/i)).toBeTruthy()
  })
})
