"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/content/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-[22px] sm:px-10 lg:px-16">
        <Link href="/" className="text-[20px] font-bold text-ink">
          {site.name}
        </Link>

        {/* Desktop pill nav */}
        <div className="glass hidden items-center gap-9 rounded-full px-7 py-2.5 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[14px] font-semibold ${
                isActive(pathname, item.href) ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-brand-gradient px-6 py-3 text-[13px] font-bold text-white"
          >
            Get a Free Consultation
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="glass flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
        >
          <span className="text-[18px] text-ink" aria-hidden>
            {open ? "✕" : "☰"}
          </span>
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="px-6 pb-4 lg:hidden">
          <div className="glass flex flex-col gap-1 rounded-3xl p-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-[15px] font-semibold ${
                  isActive(pathname, item.href) ? "bg-[rgba(139,124,246,.12)] text-ink" : "text-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-brand-gradient px-6 py-3 text-[13px] font-bold text-white"
            >
              Get a Free Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
