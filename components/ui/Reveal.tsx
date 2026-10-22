"use client";

import { createElement, type CSSProperties, type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type RevealProps = {
  as?: "div" | "li" | "p" | "header" | "figure" | "span" | "dl";
  /** Stagger offset in milliseconds. */
  delay?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Fades and lifts its children into place the first time they enter the
 * viewport (IntersectionObserver). The resting state lives in CSS
 * (`[data-reveal]` in globals.css) so reduced-motion users and visitors
 * without JavaScript always see the content.
 */
export default function Reveal({ as = "div", delay = 0, className, children }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>();

  return createElement(
    as,
    {
      ref,
      className,
      "data-reveal": "",
      "data-visible": inView ? "true" : "false",
      style: { "--reveal-delay": `${delay}ms` } as CSSProperties,
    },
    children,
  );
}
