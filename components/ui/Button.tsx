"use client";

import { useRef, type AnchorHTMLAttributes, type ReactNode } from "react";

export type ButtonVariant = "primary" | "blush" | "outline" | "glass";

type ButtonProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
  href: string;
  /** Plain-text label (also used for the hover roll-over copy). */
  label: string;
  variant?: ButtonVariant;
  size?: "md" | "sm";
  /** Icon shown in the round chip; defaults to an arrow. `false` hides the chip. */
  icon?: ReactNode | false;
};

export function ArrowIcon({ size = 16 }: { size?: number }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const VARIANT: Record<ButtonVariant, string> = {
  primary: "",
  blush: "btn-blush",
  outline: "btn-outline",
  glass: "btn-glass",
};

/**
 * Pill call-to-action (styles: `.btn` in globals.css). On a fine pointer it
 * leans gently toward the cursor — a small magnetic pull — and springs back
 * on leave. The transform is written directly, so React never re-renders.
 */
export default function Button({ href, label, variant = "primary", size = "md", icon, className = "", ...rest }: ButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onPointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (event.clientX - (r.left + r.width / 2)) * 0.18;
    const y = (event.clientY - (r.top + r.height / 2)) * 0.3;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const onPointerLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <a
      ref={ref}
      href={href}
      className={`btn ${VARIANT[variant]} ${size === "sm" ? "btn-sm" : ""} ${className}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      // The roll-over copy is CSS generated content; name the link once.
      aria-label={label}
      {...rest}
    >
      <span className="btn-label" data-text={label}>
        <span>{label}</span>
      </span>
      {icon !== false && <span className="btn-icon">{icon ?? <ArrowIcon />}</span>}
    </a>
  );
}
