import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost";

const base =
  "inline-flex items-center justify-center rounded-full text-[14px] font-bold transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const variants: Record<Variant, string> = {
  primary: "bg-brand-gradient text-white shadow-[0_10px_30px_rgba(139,124,246,.35)]",
  ghost: "glass text-ink",
};

/** Pill CTA rendered as a Next.js Link, in the two design variants. */
export function GradientButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} px-7 py-[15px] ${className}`}>
      {children}
    </Link>
  );
}
