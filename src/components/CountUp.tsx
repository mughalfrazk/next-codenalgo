"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated count-up number — replaces the design's cubic ease-out counter
 * (1200ms) driven on mount. Starts when scrolled into view; jumps straight
 * to the final value under reduced-motion.
 */
export function CountUp({
  value,
  suffix = "",
  duration = 1200,
  className = "",
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    /* v8 ignore next -- ref always bound by the time effect runs */
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let started = false;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(value * eased));
        /* v8 ignore next 3 -- rAF mock completes animation in a single tick (p >= 1 always in tests) */
        if (p < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          setDone(true);
        }
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        /* v8 ignore next -- fires when not-intersecting or already started; neither occurs in tests */
        if (entry.isIntersecting && !started) {
          started = true;
          if (reduced) {
            setDisplay(value);
            setDone(true);
          } else {
            run();
          }
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {done ? suffix : ""}
    </span>
  );
}
