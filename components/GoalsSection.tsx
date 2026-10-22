import type { CSSProperties } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitText from "@/components/ui/SplitText";
import { GOALS, GOALS_INTRO } from "@/lib/content";

/** Card colourways, cycled: charcoal, blush, white. */
const TONES = [
  { card: "bg-ink text-paper", body: "text-paper/70", number: "text-blush", rule: "bg-paper/15" },
  { card: "bg-blush text-ink", body: "text-ink/75", number: "text-ink", rule: "bg-ink/15" },
  { card: "border border-line bg-surface text-ink", body: "text-slate", number: "text-rose", rule: "bg-line" },
];

/*
 * GOALS — the intro stays pinned on the left while the goal cards stack on
 * the right: each card is `position: sticky` with a slightly lower top, so
 * as the page scrolls every new card slides up over the previous one and
 * leaves its edge peeking out. Pure CSS — no scroll listeners.
 */
export default function GoalsSection({ label = GOALS_INTRO.label }: { label?: string }) {
  return (
    <section id="goals" aria-labelledby="goals-title" className="scroll-mt-16 bg-paper py-24 md:py-36">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <SectionLabel>{label}</SectionLabel>
            </Reveal>
            <SplitText id="goals-title" text={GOALS_INTRO.title} className="mt-7 font-display heading-xl text-ink" />
            <Reveal delay={120}>
              <p className="mt-7 max-w-[26rem] text-lg leading-relaxed text-slate">{GOALS_INTRO.body}</p>
            </Reveal>
          </div>
        </div>

        <ul className="lg:col-span-7">
          {GOALS.map((goal, i) => {
            const tone = TONES[i % TONES.length];
            return (
              <li
                key={goal.title}
                className="sticky mb-6 last:mb-0 md:mb-10"
                style={{ top: `calc(6.5rem + ${i} * 1.1rem)` } as CSSProperties}
              >
                <article
                  className={`flex min-h-[19rem] flex-col justify-between rounded-[2rem] p-8 shadow-[0_-12px_40px_-24px_rgba(25,27,29,0.45)] md:min-h-[22rem] md:p-11 ${tone.card}`}
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className={`font-display text-[clamp(3.5rem,8vw,6rem)] leading-[0.85] ${tone.number}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="eyebrow pt-2 opacity-60">
                      Goal {i + 1} / {GOALS.length}
                    </span>
                  </div>
                  <div>
                    <span aria-hidden="true" className={`mb-6 block h-px w-full ${tone.rule}`} />
                    <h3 className="font-display text-[clamp(1.75rem,3.2vw,2.6rem)] leading-[1.05]">{goal.title}</h3>
                    <p className={`mt-3 max-w-[32rem] text-lg leading-relaxed ${tone.body}`}>{goal.body}</p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
