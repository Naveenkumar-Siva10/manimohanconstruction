"use client";

import { Component, useCallback, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { detectWebGL } from "@/lib/webgl";
import type { TypeChapter } from "./Typography3DScene";

const Typography3DScene = dynamic(() => import("./Typography3DScene"), { ssr: false, loading: () => null });

export type TypographyMode = "pending" | "3d" | "html";

class SceneBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

type Typography3DProps = {
  chapters: TypeChapter[];
  progressRef: RefObject<number>;
  /** Reports whether the 3D words are showing, so the caller can fall back to HTML type. */
  onModeChange: (mode: TypographyMode) => void;
  /** "light" = white letters over imagery (with a soft glyph shadow); "dark" = charcoal. */
  tone?: "light" | "dark";
};

/**
 * Decorative 3D typography layer. The real words live in the DOM (as
 * headings in the section); this canvas is aria-hidden and purely visual.
 * Falls back to "html" mode when WebGL is missing, the font fails to load
 * or the scene throws.
 */
export default function Typography3D({ chapters, progressRef, onModeChange, tone = "dark" }: Typography3DProps) {
  const lite = useMediaQuery("(max-width: 767px), (pointer: coarse) and (max-width: 1100px)");
  const [mode, setMode] = useState<TypographyMode>("pending");
  const [active, setActive] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const update = useCallback(
    (next: TypographyMode) => {
      setMode(next);
      onModeChange(next);
    },
    [onModeChange],
  );
  const fail = useCallback(() => update("html"), [update]);
  const ready = useCallback(() => update("3d"), [update]);

  useEffect(() => {
    // Feature detection has to run in the browser, after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!detectWebGL()) fail();
  }, [fail]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 transition-opacity duration-700"
      style={{
        opacity: mode === "3d" ? 1 : 0,
        // The canvas is transparent, so a drop-shadow filter follows the
        // letter shapes only — no box or panel behind them.
        filter: tone === "light" ? "drop-shadow(0 6px 18px rgba(17, 18, 20, 0.35)) drop-shadow(0 1px 2px rgba(17, 18, 20, 0.3))" : undefined,
      }}
    >
      {mode !== "html" && (
        <SceneBoundary onError={fail}>
          <Typography3DScene
            chapters={chapters}
            progressRef={progressRef}
            reducedMotion={false}
            lite={lite}
            active={active}
            tone={tone}
            onReady={ready}
            onError={fail}
          />
        </SceneBoundary>
      )}
    </div>
  );
}
