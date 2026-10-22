"use client";

import { useRef } from "react";
import LogoMark from "@/components/ui/LogoMark";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitText from "@/components/ui/SplitText";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { VISION } from "@/lib/content";
import { range } from "@/lib/math";
import { SITE } from "@/lib/site";

/** Words that pick up the blush accent once lit. */
const HIGHLIGHT = new Set(["dream", "quality,", "trust", "care."]);

/*
 * VISION — a charcoal stage. The statement starts as dim type and lights up
 * word by word as the section scrolls through the screen, while a large
 * MMC mark drifts and turns slowly behind it. All writes go straight to
 * element styles from the scroll hook; React never re-renders.
 */
export default function VisionSection({ label = VISION.label }: { label?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const markRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const words = VISION.statement.split(" ");

  useScrollProgress(sectionRef, {
    mode: "through",
    smoothing: 8,
    onUpdate: (p) => {
      // Light the words between 22% and 62% of the section's pass.
      const lit = reducedMotion ? 1 : range(p, 0.22, 0.62) * words.length;
      wordRefs.current.forEach((el, i) => {
        if (el) el.style.opacity = String(0.16 + 0.84 * Math.min(1, Math.max(0, lit - i)));
      });
      if (markRef.current && !reducedMotion) {
        markRef.current.style.transform = `translate3d(0, ${(0.5 - p) * 160}px, 0) rotate(${(p - 0.5) * 14}deg)`;
      }
    },
  });

  return (
    <section
      ref={sectionRef}
      id="vision"
      aria-labelledby="vision-title"
      className="grain relative scroll-mt-16 overflow-hidden bg-ink py-28 text-paper md:py-44"
    >
      <div
        ref={markRef}
        aria-hidden="true"
        className="pointer-events-none absolute -right-[12%] top-1/2 w-[min(80vw,52rem)] -translate-y-1/2 opacity-[0.07] will-change-transform"
      >
        <LogoMark className="h-auto w-full" />
      </div>

      <div className="container-site relative">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <SectionLabel tone="light">{label}</SectionLabel>
          <SplitText
            as="h2"
            id="vision-title"
            text={VISION.title}
            accentClassName="text-blush"
            className="font-display text-2xl text-paper md:text-3xl"
          />
        </div>

        <blockquote className="mt-16 md:mt-24">
          <p className="max-w-[68rem] font-display text-[clamp(2.1rem,5.6vw,5.4rem)] leading-[1.02] tracking-[-0.04em]">
            {words.map((word, i) => (
              <span key={i}>
                <span
                  ref={(el) => {
                    wordRefs.current[i] = el;
                  }}
                  // Dim until the scroll hook lights it — only when JS is running.
                  className={`[.js_&]:opacity-[0.16] ${HIGHLIGHT.has(word.toLowerCase()) ? "accent text-blush" : ""}`}
                >
                  {word}
                </span>{" "}
              </span>
            ))}
          </p>
        </blockquote>

        <p className="mt-14 flex items-center gap-4 text-sm font-bold uppercase tracking-[0.2em] text-paper/60">
          <span aria-hidden="true" className="h-px w-12 bg-blush" />
          {SITE.name}
        </p>
      </div>
    </section>
  );
}
