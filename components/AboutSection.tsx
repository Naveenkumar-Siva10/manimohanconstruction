import LogoMark from "@/components/ui/LogoMark";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitText from "@/components/ui/SplitText";
import { ABOUT } from "@/lib/content";
import { SITE } from "@/lib/site";

/** Slowly turning round badge: circular text around the MMC mark. */
function SealBadge({ className = "" }: { className?: string }) {
  const text = `Family run · 27+ years · Built with care · ${SITE.city} · `;
  return (
    <div aria-hidden="true" className={`grid place-items-center rounded-full bg-ink shadow-[0_24px_50px_-20px_rgba(25,27,29,0.55)] ${className}`}>
      <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full">
        <defs>
          <path id="seal-circle" d="M100 100 m-74 0 a74 74 0 1 1 148 0 a74 74 0 1 1 -148 0" />
        </defs>
        <text className="fill-paper text-[11.5px] font-bold uppercase tracking-[0.14em]">
          {/* Stretched to exactly one lap of the circle (2π × 74). */}
          <textPath href="#seal-circle" textLength={462} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <LogoMark className="relative h-auto w-[38%]" />
    </div>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m3 8.5 3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative scroll-mt-16 bg-paper pb-24 pt-10 md:pb-36 md:pt-16">
      <div className="container-site grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <Reveal>
            <SectionLabel>{ABOUT.label}</SectionLabel>
          </Reveal>
          <SplitText id="about-title" text={ABOUT.title} className="mt-7 font-display heading-lg text-ink" />

          <Reveal delay={120}>
            <p className="mt-8 max-w-[38rem] text-lg leading-relaxed text-ink/75 md:text-xl md:leading-relaxed">{ABOUT.body}</p>
          </Reveal>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {ABOUT.pillars.map((pillar, i) => (
              <Reveal as="li" key={pillar} delay={160 + i * 70}>
                <span className="group flex items-center gap-4 rounded-2xl border border-line bg-surface px-5 py-4 transition-colors duration-500 hover:border-ink hover:bg-ink">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blush text-ink transition-transform duration-500 group-hover:rotate-[360deg]">
                    <CheckIcon />
                  </span>
                  <span className="font-semibold text-ink transition-colors duration-500 group-hover:text-paper">{pillar}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>

        <figure className="relative lg:col-span-5 lg:col-start-8">
          <ParallaxImage
            src={ABOUT.image.src}
            alt={ABOUT.image.alt}
            // Landscape photo in a portrait frame: request enough width for the crop.
            sizes="(min-width: 1024px) 70vw, 100vw"
            strength={14}
            radius="2rem"
            className="aspect-[4/5] w-full sm:aspect-[4/3] lg:aspect-[4/5]"
          />
          <SealBadge className="absolute -bottom-10 left-4 h-32 w-32 sm:-left-8 md:h-40 md:w-40" />
          <figcaption className="absolute right-4 top-4 rounded-full bg-paper/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-ink backdrop-blur-md">
            On site, every day
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
