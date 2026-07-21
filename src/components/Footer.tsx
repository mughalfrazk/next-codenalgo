import Link from "next/link";
import { Container } from "./Section";
import { footerCompany, site } from "@/content/site";
import { services } from "@/content/services";

export function Footer() {
  return (
    <footer className="relative z-10 pt-14 pb-8">
      <Container>
        <div className="mb-9 grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3 text-[18px] font-bold text-ink">{site.name}</div>
            <div className="max-w-xs text-[14px] leading-[1.6] font-medium text-muted">
              {site.tagline}
            </div>
          </div>

          <div>
            <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.04em] text-ink">
              Services
            </div>
            {services.slice(0, 4).map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="mb-2.5 block text-[13px] font-medium text-muted hover:text-ink"
              >
                {s.title}
              </Link>
            ))}
          </div>

          <div>
            <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.04em] text-ink">
              Company
            </div>
            {footerCompany.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="mb-2.5 block text-[13px] font-medium text-muted hover:text-ink"
              >
                {c.label}
              </Link>
            ))}
          </div>

          <div>
            <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.04em] text-ink">
              Contact
            </div>
            <a
              href={`mailto:${site.email}`}
              className="mb-2.5 block text-[13px] font-medium text-muted hover:text-ink"
            >
              {site.email}
            </a>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="mb-2.5 block text-[13px] font-medium text-muted hover:text-ink"
            >
              {site.phone}
            </a>
            <div className="text-[13px] font-medium text-muted">{site.addressShort}</div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-black/10 pt-6 text-[12px] font-medium text-muted-2 sm:flex-row sm:items-center sm:justify-between">
          <div>{site.legal}</div>
          <div className="flex gap-5">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
