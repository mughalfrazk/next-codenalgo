'use client'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

import { createTheme, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { AuthProvider } from '@/lib/firebase/AuthProvider'

const adminTheme = createTheme({
  fontFamily: 'var(--font-jakarta), sans-serif',
  headings: { fontFamily: 'var(--font-jakarta), sans-serif' },
  primaryColor: 'accent',
  defaultRadius: 'md',
  radius: { xs: '6px', sm: '9px', md: '10px', lg: '14px', xl: '16px' },
  colors: {
    accent: [
      '#eaf1fd',
      '#d3e2fa',
      '#a7c5f5',
      '#7aa8f0',
      '#5690ec',
      '#386cea',
      '#2d58c4',
      '#22449e',
      '#183278',
      '#0e2052',
    ],
  },
})

export function AdminProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <MantineProvider theme={adminTheme} defaultColorScheme="auto">
      <Notifications />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  )
}
