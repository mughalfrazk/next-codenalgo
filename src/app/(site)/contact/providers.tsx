'use client'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

import { createTheme, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

const contactTheme = createTheme({
  fontFamily: 'var(--font-jakarta), sans-serif',
  primaryColor: 'accent',
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

/** Scoped to the contact page only — the rest of the public site stays Tailwind/Mantine-free. */
export function ContactProviders({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={contactTheme} defaultColorScheme="light">
      <Notifications position="top-right" />
      {children}
    </MantineProvider>
  )
}
