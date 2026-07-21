import { GradientButton } from "./GradientButton";
import { Section } from "./Section";

/** The recurring centered "ready to…" call-to-action card. */
export function CtaBand({
  title,
  subtitle,
  ctaLabel,
  ctaHref = "/contact",
}: {
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref?: string;
}) {
  return (
    <Section className="text-center">
      <div className="glass mx-auto max-w-[640px] rounded-[32px] px-8 py-12 shadow-[0_20px_50px_rgba(139,124,246,.18)] sm:px-10 sm:py-[60px]">
        <h2 className="mb-4 text-[28px] leading-[1.25] font-extrabold text-ink sm:text-[34px]">
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mb-[30px] max-w-md text-[15px] leading-[1.7] font-medium text-muted">
            {subtitle}
          </p>
        )}
        <GradientButton href={ctaHref}>{ctaLabel}</GradientButton>
      </div>
    </Section>
  );
}
