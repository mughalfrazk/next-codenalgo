'use client'

import { type User, onAuthStateChanged } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { getFirebaseAuth, isFirebaseConfigured } from './client'

type AuthState = {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthState>({ user: null, loading: true })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const configured = isFirebaseConfigured()
  const [state, setState] = useState<AuthState>({ user: null, loading: configured })

  useEffect(() => {
    if (!configured) return
    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), (user) => {
      setState({ user, loading: false })
    })
    return unsubscribe
  }, [configured])

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthState {
  return useContext(AuthContext)
}
