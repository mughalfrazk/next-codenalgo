import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const mockApp = { name: '[DEFAULT]' }
const mockGetApps = vi.fn().mockReturnValue([])
const mockInitializeApp = vi.fn().mockReturnValue(mockApp)
const mockGetAuth = vi.fn().mockReturnValue({ kind: 'auth' })
const mockGetFirestore = vi.fn().mockReturnValue({ kind: 'db' })

vi.mock('firebase/app', () => ({
  getApps: () => mockGetApps(),
  initializeApp: (...args: unknown[]) => mockInitializeApp(...args),
}))
vi.mock('firebase/auth', () => ({
  getAuth: (...args: unknown[]) => mockGetAuth(...args),
}))
vi.mock('firebase/firestore/lite', () => ({
  getFirestore: (...args: unknown[]) => mockGetFirestore(...args),
}))

describe('firebase client', () => {
  beforeEach(() => {
    vi.resetModules()
    mockGetApps.mockReturnValue([])
    mockInitializeApp.mockClear()
    mockGetAuth.mockClear()
    mockGetFirestore.mockClear()
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('reports not configured when required env vars are missing', async () => {
    vi.stubEnv('NEXT_PUBLIC_FIREBASE_API_KEY', '')
    vi.stubEnv('NEXT_PUBLIC_FIREBASE_PROJECT_ID', '')
    vi.stubEnv('NEXT_PUBLIC_FIREBASE_APP_ID', '')
    const { isFirebaseConfigured } = await import('@/lib/firebase/client')
    expect(isFirebaseConfigured()).toBe(false)
  })

  it('reports configured when required env vars are present', async () => {
    vi.stubEnv('NEXT_PUBLIC_FIREBASE_API_KEY', 'key')
    vi.stubEnv('NEXT_PUBLIC_FIREBASE_PROJECT_ID', 'project')
    vi.stubEnv('NEXT_PUBLIC_FIREBASE_APP_ID', 'app')
    const { isFirebaseConfigured } = await import('@/lib/firebase/client')
    expect(isFirebaseConfigured()).toBe(true)
  })

  it('initializes the app once and reuses it for auth/db', async () => {
    const { getFirebaseAuth, getFirebaseDb } = await import('@/lib/firebase/client')
    getFirebaseAuth()
    getFirebaseDb()
    getFirebaseAuth()
    getFirebaseDb()
    expect(mockInitializeApp).toHaveBeenCalledTimes(1)
    expect(mockGetAuth).toHaveBeenCalledTimes(1)
    expect(mockGetFirestore).toHaveBeenCalledTimes(1)
  })

  it('reuses an existing Firebase app instead of re-initializing', async () => {
    mockGetApps.mockReturnValue([mockApp])
    const { getFirebaseAuth } = await import('@/lib/firebase/client')
    getFirebaseAuth()
    expect(mockInitializeApp).not.toHaveBeenCalled()
  })
})
