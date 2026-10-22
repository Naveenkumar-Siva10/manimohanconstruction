"use client";

import { createElement, Fragment, type CSSProperties } from "react";
import { useInView } from "@/hooks/useInView";

type SplitTextProps = {
  as?: "h1" | "h2" | "h3" | "p";
  /** Text to animate. Wrap a word in *asterisks* to set it as the italic accent. */
  text: string;
  id?: string;
  className?: string;
  /** Class for the *accent* words (colour). */
  accentClassName?: string;
  /** Extra delay before the first word, in ms. */
  delay?: number;
};

/**
 * A heading whose words rise one by one out of their own masks the first
 * time it scrolls into view. Screen readers get the plain sentence via
 * aria-label; the per-word spans are presentation only. Styles live in
 * globals.css (`.split-word`, `[data-split]`).
 */
export default function SplitText({ as = "h2", text, id, className = "", accentClassName = "text-rose", delay = 0 }: SplitTextProps) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.2 });
  const plain = text.replace(/\*/g, "");

  // "*word*" segments are accents; split everything into words.
  let index = 0;
  const words = text.split(/(\*[^*]+\*)/).flatMap((segment) => {
    const accent = segment.startsWith("*") && segment.endsWith("*");
    return segment
      .replace(/\*/g, "")
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ word, accent, i: index++ }));
  });

  return createElement(
    as,
    {
      ref,
      id,
      className,
      "aria-label": plain,
      "data-split": "",
      "data-visible": inView ? "true" : "false",
      style: { "--split-delay": `${delay}ms` } as CSSProperties,
    },
    <span aria-hidden="true">
      {words.map(({ word, accent, i }) => (
        <Fragment key={i}>
          <span className="split-word">
            <span className={accent ? `accent ${accentClassName}` : undefined} style={{ "--i": i } as CSSProperties}>
              {word}
            </span>
          </span>{" "}
        </Fragment>
      ))}
    </span>,
  );
}
