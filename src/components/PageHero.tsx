import { Container } from "./Section";
import { Eyebrow } from "./Eyebrow";

/** Centered page hero used by the About, Services, and Contact pages. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Container className="pt-16 pb-14 text-center sm:pt-[100px] sm:pb-[70px]">
      <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
      <h1 className="mx-auto mb-5 max-w-[820px] text-[36px] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink sm:text-[50px]">
        {title}
      </h1>
      <p className="mx-auto max-w-[600px] text-[17px] leading-[1.6] font-medium text-muted">
        {subtitle}
      </p>
    </Container>
  );
}
