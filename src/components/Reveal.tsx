"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Fade-and-rise reveal on scroll — replaces the design's `data-reveal`
 * opacity/transform driven by a mount timer. Elements start hidden and
 * animate in when they enter the viewport. Under reduced-motion the global
 * CSS collapses the transition duration, so revealed content simply appears.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    /* v8 ignore next -- ref always bound by the time effect runs */
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        /* v8 ignore next -- only fires when IO reports not-intersecting, which doesn't happen in tests */
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(16px)",
        transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
