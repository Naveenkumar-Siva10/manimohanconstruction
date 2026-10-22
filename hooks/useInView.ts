"use client";

import { useEffect, useRef, useState } from "react";

type InViewOptions = {
  rootMargin?: string;
  threshold?: number;
  /** Stop observing after the first reveal (default). */
  once?: boolean;
};

/**
 * IntersectionObserver wrapper used for section reveals. Falls back to
 * "visible" when the API is missing so content is never stranded hidden.
 */
export function useInView<T extends Element>({
  rootMargin = "0px 0px -12% 0px",
  threshold = 0.15,
  once = true,
}: InViewOptions = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return [ref, inView] as const;
}
