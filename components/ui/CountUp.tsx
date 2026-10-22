"use client";

import { useEffect, useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { easeOutCubic } from "@/lib/math";

type CountUpProps = {
  value: number;
  /** Milliseconds for the count. */
  duration?: number;
  className?: string;
};

/**
 * A number that counts up from zero the first time it scrolls into view.
 * The server renders the final value (no-JS, crawlers); the client resets
 * it to 0 below the fold and animates once visible. Reduced motion skips
 * the count.
 */
export default function CountUp({ value, duration = 1800, className }: CountUpProps) {
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.6 });
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!inView) {
      el.textContent = "0";
      return;
    }
    started.current = true;
    const start = performance.now();
    let raf = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      el.textContent = String(Math.round(easeOutCubic(t) * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, ref]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
