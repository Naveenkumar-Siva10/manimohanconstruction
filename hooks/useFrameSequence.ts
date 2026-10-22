"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { clamp } from "@/lib/math";

export type FrameSet = {
  /** Folder containing 000.webp, 001.webp, … */
  dir: string;
  count: number;
};

type FrameSequenceOptions = {
  frames: FrameSet;
  /** Wanted position in the clip, 0..1. Read once per animation frame. */
  getProgress: () => number;
  enabled?: boolean;
  /** Parallel image requests. */
  concurrency?: number;
};

const frameUrl = (set: FrameSet, i: number) => `${set.dir}/${String(i).padStart(3, "0")}.webp`;

/**
 * Coarse-to-fine load order: every 64th frame, then every 32nd, 16th … 1st.
 * After the first few requests the whole clip is scrubbable (at low temporal
 * resolution) and it sharpens as the remaining frames arrive.
 */
function loadOrder(count: number) {
  const order: number[] = [];
  const seen = new Set<number>();
  const push = (i: number) => {
    if (!seen.has(i)) {
      seen.add(i);
      order.push(i);
    }
  };
  push(0);
  push(count - 1);
  for (let step = 64; step >= 1; step /= 2) for (let i = 0; i < count; i += step) push(i);
  return order;
}

/**
 * Scroll-scrubbed image sequence drawn to a <canvas>.
 *
 * Why not seek a <video>? Video seeks are asynchronous and their cost varies
 * with the decoder, so frames land unevenly while scrolling and the picture
 * judders. Here every frame of the clip is a still image; on each animation
 * frame we pick the frame that matches the scroll position and draw it — one
 * deterministic draw, and only when the frame index actually changes.
 *
 * Images are drawn "object-fit: cover" into the canvas at device resolution
 * (capped at 2×). If the exact frame hasn't loaded yet, the nearest loaded
 * frame is shown instead, so the sequence never blanks.
 */
export function useFrameSequence(canvasRef: RefObject<HTMLCanvasElement | null>, { frames, getProgress, enabled = true, concurrency = 6 }: FrameSequenceOptions) {
  const getProgressRef = useRef(getProgress);
  useLayoutEffect(() => {
    getProgressRef.current = getProgress;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !enabled) return;

    const { count } = frames;
    const images: (HTMLImageElement | null)[] = new Array(count).fill(null);
    let disposed = false;
    let drawn = -1;
    let raf = 0;

    // ---- loading -----------------------------------------------------
    const order = loadOrder(count);
    let cursor = 0;
    let inFlight = 0;
    const pump = () => {
      while (!disposed && inFlight < concurrency && cursor < order.length) {
        const index = order[cursor++];
        const img = new Image();
        img.decoding = "async";
        inFlight++;
        img.onload = () => {
          inFlight--;
          if (disposed) return;
          images[index] = img;
          drawn = -1; // a closer frame may now be available
          pump();
        };
        img.onerror = () => {
          inFlight--;
          pump();
        };
        img.src = frameUrl(frames, index);
      }
    };
    pump();

    // ---- drawing -----------------------------------------------------
    const nearestLoaded = (target: number) => {
      if (images[target]) return target;
      for (let d = 1; d < count; d++) {
        if (target - d >= 0 && images[target - d]) return target - d;
        if (target + d < count && images[target + d]) return target + d;
      }
      return -1;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        drawn = -1;
      }
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const draw = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    const tick = () => {
      const target = Math.round(clamp(getProgressRef.current()) * (count - 1));
      const index = nearestLoaded(target);
      // Draw only when the frame changes (`drawn` is reset to -1 after a
      // resize or when a closer frame finishes loading).
      if (index >= 0 && index !== drawn) {
        draw(images[index]!);
        drawn = index;
        canvas.dataset.frame = String(index); // handy for debugging / tests
      }
      raf = requestAnimationFrame(tick);
    };

    // Only animate while the canvas is near the viewport.
    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), {
      rootMargin: "25% 0px 25% 0px",
    });
    visibility.observe(canvas);

    return () => {
      disposed = true;
      stop();
      visibility.disconnect();
      resizeObserver.disconnect();
    };
  }, [canvasRef, frames, enabled, concurrency]);
}
