"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { clamp, damp } from "@/lib/math";

/**
 * How progress is measured against the viewport:
 *
 * - "pin":     0 when the element's top reaches the top of the viewport,
 *              1 when its bottom reaches the bottom. This is the range in
 *              which a `position: sticky` child stays pinned, so it is the
 *              natural timeline for a pinned scroll sequence.
 * - "through": 0 when the top enters from the bottom of the viewport,
 *              1 when the bottom leaves through the top. Useful for
 *              parallax on elements that scroll normally.
 */
export type ScrollProgressMode = "pin" | "through";

export function getScrollProgress(el: Element, mode: ScrollProgressMode = "pin"): number {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;

  if (mode === "pin") {
    const travel = rect.height - vh;
    if (travel <= 0) return rect.top <= 0 ? 1 : 0;
    return clamp(-rect.top / travel);
  }

  return clamp((vh - rect.top) / (vh + rect.height));
}

type ScrollProgressOptions = {
  mode?: ScrollProgressMode;
  /**
   * Damping stiffness (see `damp`). 0 disables smoothing and reports the raw
   * value. Lenis already smooths wheel input, but touch and keyboard
   * scrolling arrive in coarse steps — a light damping pass hides those.
   */
  smoothing?: number;
  /** Called on every frame where progress actually changed. */
  onUpdate?: (progress: number) => void;
};

/**
 * Reusable scroll-progress driver.
 *
 * Instead of reacting to `scroll` events (which fire at irregular intervals
 * and can't be damped), this runs a requestAnimationFrame loop while the
 * element is near the viewport:
 *
 *   1. read the element's raw progress from its bounding rect,
 *   2. ease the stored value toward it with frame-rate independent damping,
 *   3. publish the result to a ref (no React re-render) and `onUpdate`.
 *
 * Consumers — the WebGL camera rig, the hero copy — read the ref inside
 * their own frame loops, so a scroll never triggers React reconciliation.
 * An IntersectionObserver parks the loop when the element is far off screen.
 */
export function useScrollProgress(
  ref: RefObject<Element | null>,
  { mode = "pin", smoothing = 0, onUpdate }: ScrollProgressOptions = {},
): RefObject<number> {
  const progressRef = useRef(0);
  const onUpdateRef = useRef(onUpdate);

  useLayoutEffect(() => {
    onUpdateRef.current = onUpdate;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let last = 0;
    let current = getScrollProgress(el, mode);

    const publish = (value: number) => {
      current = value;
      progressRef.current = value;
      onUpdateRef.current?.(value);
    };

    // Paint the correct state immediately (e.g. after a reload mid-page).
    publish(current);

    const tick = (now: number) => {
      // Cap dt so a backgrounded tab doesn't produce one giant step.
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      const target = getScrollProgress(el, mode);
      let next = smoothing > 0 ? damp(current, target, smoothing, dt) : target;
      if (Math.abs(next - target) < 1e-4) next = target;
      if (next !== current) publish(next);

      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
      // Settle on the exact resting value so nothing is left half-way.
      publish(getScrollProgress(el, mode));
    };

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "25% 0px 25% 0px" },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ref, mode, smoothing]);

  return progressRef;
}
