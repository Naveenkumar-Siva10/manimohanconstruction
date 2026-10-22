"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { LOGO } from "@/lib/logo";
import { COLORS, SITE } from "@/lib/site";

/** Shortest time the intro plays, so the logo animation always completes. */
const MIN_MS = 2300;
/** Never hold the visitor longer than this, even on a slow connection. */
const MAX_MS = 6000;
/** Length of the exit curtain (matches .preloader-panel in globals.css). */
const EXIT_MS = 1150;

export const LOADED_EVENT = "mmc:loaded";

type Phase = "loading" | "leaving" | "done";

/**
 * First-load intro: the MMC mark draws its charcoal outline, fills, then
 * the blush and cream panels drop into place while the wordmark rises and
 * a counter runs to 100. When the page has loaded (and the minimum time has
 * passed) a cream curtain lifts away with a blush one trailing behind.
 *
 * Coordination with the rest of the page is via <html> classes set in
 * app/layout.tsx: `is-loading` (scroll locked, overlay visible) is swapped
 * for `is-ready` (hero intro plays), and LOADED_EVENT tells SmoothScroll to
 * start. Without JavaScript the overlay never shows (CSS: `.js.is-loading`).
 */
export default function Preloader() {
  const [phase, setPhase] = useState<Phase>("loading");
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minMs = reduced ? 400 : MIN_MS;
    const start = performance.now();
    let loaded = document.readyState === "complete";
    let raf = 0;
    let shown = 0;
    let exitTimer = 0;

    const onLoad = () => (loaded = true);
    window.addEventListener("load", onLoad, { once: true });

    const finish = () => {
      root.classList.remove("is-loading");
      root.classList.add("is-ready");
      window.dispatchEvent(new Event(LOADED_EVENT));
      setPhase("leaving");
      exitTimer = window.setTimeout(() => setPhase("done"), reduced ? 350 : EXIT_MS);
    };

    const tick = (now: number) => {
      const elapsed = now - start;
      // Time-based progress, held at 90% until the page has actually loaded.
      const target = Math.min(elapsed / minMs, loaded || elapsed > MAX_MS ? 1 : 0.9);
      shown += (target - shown) * 0.12;
      if (target === 1 && 1 - shown < 0.004) shown = 1;

      const pct = Math.round(shown * 100);
      if (counterRef.current) counterRef.current.textContent = String(pct).padStart(3, "0");
      if (barRef.current) barRef.current.style.transform = `scaleX(${shown})`;

      if (shown >= 1) finish();
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(exitTimer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (phase === "done") return null;

  const pieces = [...LOGO.blush.map((d) => ({ d, fill: COLORS.blush })), ...LOGO.cream.map((d) => ({ d, fill: COLORS.paper }))];
  const letters = SITE.wordmark.split("");

  return (
    <div
      className="preloader fixed inset-0 z-[200] items-center justify-center"
      data-phase={phase}
      role="status"
      aria-live="polite"
      aria-label={phase === "loading" ? `Loading ${SITE.name}` : undefined}
    >
      {/* Curtain layers: blush trails behind the cream panel on exit. */}
      <div aria-hidden="true" className="preloader-panel absolute inset-0 bg-blush" data-layer="back" />
      <div aria-hidden="true" className="preloader-panel absolute inset-0 bg-paper" data-layer="front" />

      <div aria-hidden="true" className="preloader-content relative flex w-full flex-col items-center px-6">
        <svg viewBox={`-6 -6 ${LOGO.width + 12} ${LOGO.height + 12}`} className="w-[min(52vw,230px)] overflow-visible">
          {LOGO.silhouette.map((d) => (
            <path key={d} d={d} pathLength={1} className="preloader-draw" strokeLinejoin="round" />
          ))}
          {pieces.map(({ d, fill }, i) => (
            <path key={d} d={d} fill={fill} className="preloader-piece" style={{ "--i": i } as CSSProperties} />
          ))}
        </svg>

        <p className="mt-9 flex overflow-hidden font-display text-[clamp(1.6rem,5vw,2.4rem)] leading-none tracking-[0.02em] text-ink">
          {letters.map((ch, i) => (
            <span key={i} className="preloader-letter" style={{ "--i": i } as CSSProperties}>
              {ch === " " ? " " : ch}
            </span>
          ))}
        </p>
        <p className="mt-3 overflow-hidden text-[0.65rem] font-bold tracking-[0.55em] text-slate">
          <span className="preloader-letter" style={{ "--i": letters.length } as CSSProperties}>
            {SITE.wordmarkSub}
          </span>
        </p>
      </div>

      {/* Footer row: tagline left, counter right, progress hairline. */}
      <div aria-hidden="true" className="preloader-content container-site absolute inset-x-0 bottom-0 pb-7 md:pb-10">
        <div className="flex items-end justify-between gap-6">
          <p className="max-w-[14rem] text-xs font-semibold uppercase leading-relaxed tracking-[0.18em] text-slate">{SITE.tagline}</p>
          <p className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-none tabular-nums text-ink">
            <span ref={counterRef}>000</span>
            <span className="text-rose">%</span>
          </p>
        </div>
        <span className="mt-5 block h-px w-full bg-line">
          <span ref={barRef} className="block h-full origin-left bg-ink" style={{ transform: "scaleX(0)" }} />
        </span>
      </div>
    </div>
  );
}
