"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * A footer link column. On phones it collapses behind its heading (tap to
 * open, chevron turns); from md up it is always open and the toggle is
 * just a heading.
 */
export default function FooterAccordion({ title, label, children }: { title: string; label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <nav aria-label={label} className="border-b border-paper/10 md:border-0">
      <h2>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="eyebrow flex w-full items-center justify-between py-4 text-left text-blush md:pointer-events-none md:py-0"
        >
          {title}
          <span
            aria-hidden="true"
            className={`grid h-8 w-8 place-items-center rounded-full border border-paper/15 text-paper transition-transform duration-300 md:hidden ${open ? "rotate-180" : ""}`}
          >
            <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m4 6 4 4 4-4" />
            </svg>
          </span>
        </button>
      </h2>
      {/* Height animates with grid rows; always shown from md up. */}
      <div
        id={id}
        className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-expo)] md:grid-rows-[1fr] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className={`overflow-hidden ${open ? "" : "invisible md:visible"}`}>
          <div className="pb-5 md:mt-5 md:pb-0">{children}</div>
        </div>
      </div>
    </nav>
  );
}
