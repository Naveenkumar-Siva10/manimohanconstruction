"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { LOADED_EVENT } from "@/components/Preloader";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Clearance for the floating header.
const HEADER_OFFSET = 88;

/**
 * Site-wide Lenis smooth scrolling.
 *
 * Lenis animates the real window scroll position, so `position: sticky`,
 * IntersectionObserver and `getBoundingClientRect` keep working unchanged —
 * the scroll-progress hooks simply observe a smoother signal.
 *
 * Reduced-motion visitors keep native scrolling: Lenis is never created.
 * Scrolling is held while the preloader runs (html.is-loading).
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: false,
    });

    // Hold still under the preloader; release when it lifts.
    const onLoaded = () => lenis.start();
    if (document.documentElement.classList.contains("is-loading")) {
      lenis.stop();
      window.addEventListener(LOADED_EVENT, onLoaded, { once: true });
    }

    // Drive Lenis from our own rAF so it ticks before layout reads in the
    // scroll-progress hooks of the same frame.
    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });

    // In-page links: smooth-scroll, then move keyboard focus to the target
    // so skip links and nav links stay accessible.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const link = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href")!.slice(1);
      const target = id ? document.getElementById(id) : document.body;
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target, {
        offset: target.id === "main" || target.id === "home" ? 0 : -HEADER_OFFSET,
        onComplete: () => {
          if (target instanceof HTMLElement) {
            if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
            target.focus({ preventScroll: true });
          }
        },
      });
      history.pushState(null, "", id ? `#${id}` : location.pathname);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener(LOADED_EVENT, onLoaded);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
