import Link from 'next/link'
import Image from 'next/image'
import { Container } from './Section'
import { footerCompany, site } from '@/content/site'
import { services } from '@/content/services'

export function Footer() {
  return (
    <footer className="bg-dark-gradient relative z-10 mt-5 pt-[60px] pb-[34px]">
      <Container>
        <div className="mb-9 grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3 flex items-center gap-[10px]">
              <Image
                src="/logo-icon.jpg"
                alt=""
                width={30}
                height={30}
                className="h-[30px] w-[30px] rounded-[8px] object-cover"
              />
              <span
                className="text-[15px] text-white"
                style={{
                  fontFamily: 'var(--font-archivo-black), sans-serif',
                  letterSpacing: '0.005em',
                }}
              >
                CODE &amp; ALGO
              </span>
            </div>
            <div className="max-w-xs text-[14px] leading-[1.6] font-medium text-white/72">
              {site.tagline}
            </div>
          </div>

          <div>
            <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.04em] text-white">
              Services
            </div>
            {services.slice(0, 4).map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="mb-2.5 block text-[13px] font-medium text-white/72 hover:text-white"
              >
                {s.title}
              </Link>
            ))}
          </div>

          <div>
            <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.04em] text-white">
              Company
            </div>
            {footerCompany.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="mb-2.5 block text-[13px] font-medium text-white/72 hover:text-white"
              >
                {c.label}
              </Link>
            ))}
          </div>

          <div>
            <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.04em] text-white">
              Contact
            </div>
            <a
              href={`mailto:${site.email}`}
              className="mb-2.5 block text-[13px] font-medium text-white/72 hover:text-white"
            >
              {site.email}
            </a>
            <a
              href={`tel:${site.phone.replace(/\s/g, '')}`}
              className="mb-2.5 block text-[13px] font-medium text-white/72 hover:text-white"
            >
              {site.phone}
            </a>
            <div className="text-[13px] font-medium text-white/72">{site.addressShort}</div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/16 pt-6 text-[12px] font-medium text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <div>{site.legal}</div>
          <div className="flex gap-5">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
