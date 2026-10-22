"use client";

import { useRef, type CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import { useInView } from "@/hooks/useInView";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type ParallaxImageProps = {
  src: StaticImageData;
  alt: string;
  sizes: string;
  className?: string;
  /** Total vertical travel as a percentage of the frame height. */
  strength?: number;
  /** Corner radius, also used by the wipe so the reveal keeps the shape. */
  radius?: string;
  /** Stagger for the wipe-in, in ms. */
  delay?: number;
};

/**
 * A photograph that wipes open from the bottom the first time it enters
 * the viewport (`[data-wipe]` in globals.css), then drifts slightly slower
 * than the page. Parallax uses the shared scroll-progress hook in "through"
 * mode and writes the transform directly.
 */
export default function ParallaxImage({ src, alt, sizes, className = "", strength = 12, radius = "1.75rem", delay = 0 }: ParallaxImageProps) {
  const [frameRef, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const innerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useScrollProgress(frameRef, {
    mode: "through",
    smoothing: 10,
    onUpdate: (p) => {
      if (!innerRef.current) return;
      const offset = reducedMotion ? 0 : (0.5 - p) * strength;
      innerRef.current.style.transform = `translate3d(0, ${offset}%, 0)`;
    },
  });

  return (
    // The observed frame carries no clip-path: Chrome's IntersectionObserver
    // treats a fully clipped target as not intersecting, so the wipe lives
    // on an inner layer.
    <div ref={frameRef} className={`relative ${className}`}>
      <div
        data-wipe=""
        data-visible={inView ? "true" : "false"}
        className="absolute inset-0 overflow-hidden bg-line"
        style={{ borderRadius: radius, "--wipe-radius": radius, "--reveal-delay": `${delay}ms` } as CSSProperties}
      >
        {/* Oversized by the travel distance so no edge is ever exposed. */}
        <div ref={innerRef} className="absolute inset-x-0 will-change-transform" style={{ top: `-${strength / 2}%`, bottom: `-${strength / 2}%` }}>
          <div data-wipe-inner="" className="absolute inset-0">
            <Image src={src} alt={alt} fill sizes={sizes} quality={80} placeholder="blur" className="photo object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
