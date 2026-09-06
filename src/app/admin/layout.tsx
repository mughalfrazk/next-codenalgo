import type { Metadata } from 'next'
import { Archivo_Black, Plus_Jakarta_Sans } from 'next/font/google'
import { AdminShell } from '@/components/admin/AdminShell'
import './admin.css'
import { AdminProviders } from './providers'

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-archivo',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
})

export const metadata: Metadata = {
  title: 'Admin — Code & Algo',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`admin-root ${archivoBlack.variable} ${plusJakartaSans.variable}`}>
      <AdminProviders>
        <AdminShell>{children}</AdminShell>
      </AdminProviders>
    </div>
  )
}
