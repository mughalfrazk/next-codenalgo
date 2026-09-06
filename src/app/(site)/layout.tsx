import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { DefaultBlobs } from '@/components/BlobField'
import { fetchSiteSettings } from '@/data/siteSettings'

export const revalidate = 60

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await fetchSiteSettings()

  return (
    <div className="relative flex min-h-full flex-col">
      <DefaultBlobs />
      <Navbar />
      <main className="relative flex-1">{children}</main>
      <Footer settings={settings} />
    </div>
  )
}
