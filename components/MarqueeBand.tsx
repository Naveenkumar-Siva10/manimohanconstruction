import type { CSSProperties } from "react";
import LogoMark from "@/components/ui/LogoMark";
import { MARQUEE } from "@/lib/content";

/** One seamless row: the word list twice, so translating by -50% loops cleanly. */
function Row({ tone, direction, duration }: { tone: "ink" | "blush"; direction?: "reverse"; duration: number }) {
  const items = [...MARQUEE, ...MARQUEE];
  const text = tone === "ink" ? "text-paper" : "text-ink";
  return (
    <div className="marquee" data-direction={direction} style={{ "--marquee-duration": `${duration}s` } as CSSProperties}>
      {items.map((word, i) => (
        <span key={i} className="flex shrink-0 items-center gap-6 pr-6 md:gap-10 md:pr-10">
          <span className={`font-display text-[clamp(1.6rem,4vw,3.25rem)] uppercase leading-none tracking-[-0.02em] ${text}`}>
            {i % 3 === 1 ? <span className="accent normal-case">{word}</span> : word}
          </span>
          <LogoMark className="h-[clamp(1.4rem,3vw,2.4rem)] w-auto shrink-0" />
        </span>
      ))}
    </div>
  );
}

/**
 * Two crossing bands of service words drifting in opposite directions —
 * charcoal over blush — between the hero and the first section. Purely
 * decorative (the same services are listed in full further down).
 */
export default function MarqueeBand() {
  return (
    <div aria-hidden="true" className="relative overflow-hidden bg-paper py-14 md:py-20">
      <div className="-mx-8 rotate-[2.5deg] bg-blush py-4 md:py-5">
        <Row tone="blush" direction="reverse" duration={55} />
      </div>
      <div className="-mx-8 -mt-[3.6rem] -rotate-[2deg] bg-ink py-4 shadow-[0_20px_40px_-20px_rgba(25,27,29,0.5)] md:-mt-[5.6rem] md:py-5">
        <Row tone="ink" duration={45} />
      </div>
    </div>
  );
}
