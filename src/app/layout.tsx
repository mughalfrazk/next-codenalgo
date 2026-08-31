import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { DefaultBlobs } from '@/components/BlobField'
import { site } from '@/content/site'

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Custom Software, AI & IT Consultancy`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    title: `${site.name} — Custom Software, AI & IT Consultancy`,
    description: site.tagline,
    url: site.url,
    siteName: site.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Custom Software, AI & IT Consultancy`,
    description: site.tagline,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-hidden bg-canvas">
        <div className="relative flex min-h-full flex-col overflow-hidden">
          <DefaultBlobs />
          <Navbar />
          <main className="relative flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
