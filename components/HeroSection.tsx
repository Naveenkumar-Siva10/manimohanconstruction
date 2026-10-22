"use client";

import { useCallback, useRef, useState, type CSSProperties, type ReactNode, type Ref } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import Typography3D, { type TypographyMode } from "@/components/typography/Typography3D";
import type { TypeChapter } from "@/components/typography/Typography3DScene";
import { useFrameSequence } from "@/hooks/useFrameSequence";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { BUILD_SEQUENCE, HERO } from "@/lib/content";
import { easeInOutCubic, easeOutCubic, lerp, range } from "@/lib/math";
import { CTA, SITE } from "@/lib/site";
import startFrame from "@/public/assets/video/build-sequence-start.jpg";
import endFrame from "@/public/assets/video/build-sequence-end.jpg";

/*
 * HERO — full-screen, scroll-scrubbed build sequence.
 *
 * The <section> is 400–460vh tall; its inner frame is `position: sticky`, so
 * the picture fills the screen and stays pinned while the page scrolls.
 * `useScrollProgress(..., { mode: "pin" })` reports p = 0 → 1 across the pin.
 *
 *   0.00 – 0.07  intro holds over the empty plot (headline, buttons)
 *   0.07 – 0.16  intro lifts away
 *   0.10 – 0.90  the build plays: plot → setting-out → frame → walls → finished
 *   0.15 – 0.43  3D word "Plan."     (setting-out lines on the ground)
 *   0.40 – 0.67  3D word "Build."    (frame, slab and walls go up)
 *   0.64 – 1.00  3D word "Deliver."  (finishes, completed house) — holds
 *   0.86 – 0.93  closing line + buttons replace the last caption
 *
 * The build is the client's video exported as stills and drawn to a canvas
 * (useFrameSequence) — one exact frame per scroll position, so nothing
 * judders. The picture itself never moves, scales or gets washed over: on
 * desktop the type sits directly on it with a glyph-only shadow.
 *
 * Every per-frame write goes straight to element styles from the rAF-driven
 * `onUpdate`; React never re-renders while scrolling.
 */
const SEQUENCE_WINDOW = [0.1, 0.9] as const;
const INTRO_OUT = [0.07, 0.16] as const;
const OUTRO_IN = [0.86, 0.93] as const;
const TYPE_CHAPTERS: TypeChapter[] = [
  { word: BUILD_SEQUENCE.chapters[0].word, start: 0.15, end: 0.43 },
  { word: BUILD_SEQUENCE.chapters[1].word, start: 0.4, end: 0.67 },
  { word: BUILD_SEQUENCE.chapters[2].word, start: 0.64, end: 1, hold: true },
];
/**
 * Caption boundaries: chapter i owns [BOUNDS[i], BOUNDS[i + 1]). The last
 * caption hands over to the closing line + buttons (the 3D word stays).
 */
const BOUNDS = [0.165, 0.415, 0.655, 0.88];
const FADE = 0.03;

const chapterOpacity = (p: number, i: number) =>
  range(p, BOUNDS[i] - FADE, BOUNDS[i] + FADE) * (1 - range(p, BOUNDS[i + 1] - FADE, BOUNDS[i + 1] + FADE));

const pad = (n: number) => String(n).padStart(2, "0");

/*
 * Colour rules: below lg the copy sits on the cream page under the picture
 * (charcoal, rose accent); from lg up it sits directly on the picture
 * (white + `on-image-text` glyph shadow, blush accent).
 */
const onImage = "lg:on-image-text";

const introDelay = (ms: number) => ({ "--intro-delay": `${ms}ms` }) as CSSProperties;

/** Masked line for the intro: the text rises into place once the preloader lifts. */
function RiseLine({ children, ms }: { children: ReactNode; ms: number }) {
  return (
    <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
      <span data-intro="rise" className="block origin-bottom-left" style={introDelay(ms)}>
        {children}
      </span>
    </span>
  );
}

/** Headline block — shared by the animated and reduced-motion heroes. */
function IntroCopy({ ref }: { ref?: Ref<HTMLDivElement> }) {
  const second = HERO.headline[1].split(" ");
  const accentWord = second.pop();
  return (
    <div ref={ref} className={`will-change-transform ${onImage}`}>
      <p data-intro="fade" style={introDelay(80)} className="eyebrow flex items-center gap-3 text-ink lg:text-surface">
        <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-rose lg:bg-blush" />
        {SITE.name} · {SITE.city}
      </p>
      <h1
        id="hero-title"
        className="mt-4 font-display text-[clamp(2.1rem,8.6vw,2.9rem)] leading-[0.98] text-ink lg:mt-6 lg:text-[clamp(3rem,4.6vw,5rem)] lg:text-surface"
      >
        <RiseLine ms={160}>{HERO.headline[0]}</RiseLine>
        <RiseLine ms={270}>
          {second.join(" ")} <span className="accent text-rose lg:text-blush">{accentWord}</span>
        </RiseLine>
      </h1>
      <p
        data-intro="fade"
        style={introDelay(420)}
        className="mt-4 max-w-[32rem] text-base leading-relaxed text-ink/75 md:text-lg lg:mt-6 lg:text-xl lg:font-medium lg:text-surface"
      >
        {HERO.body}
      </p>
      <div data-intro="fade" style={introDelay(520)} className="mt-6 flex flex-wrap gap-3 lg:mt-9">
        <HeroButtons />
      </div>
      <p
        data-intro="fade"
        style={introDelay(640)}
        className="mt-6 flex items-center gap-3 text-sm font-semibold text-ink/70 lg:mt-9 lg:text-surface"
      >
        <span aria-hidden="true" className="h-px w-8 shrink-0 bg-rose lg:bg-blush" />
        {HERO.trustLine}
      </p>
    </div>
  );
}

/** Primary + secondary CTA. On the picture (lg+) they switch to blush and frosted glass. */
function HeroButtons() {
  const isDesktop = useMediaQuery("(min-width: 1024px)", true);
  return (
    <>
      <Button href={CTA.primary.href} label={CTA.primary.label} variant={isDesktop ? "blush" : "primary"} size={isDesktop ? "md" : "sm"} />
      <Button
        href={CTA.secondary.href}
        label={CTA.secondary.label}
        variant={isDesktop ? "glass" : "outline"}
        size={isDesktop ? "md" : "sm"}
        icon={false}
      />
    </>
  );
}

/** Reduced motion: no pinning or scrubbing — the finished house, the
 *  headline, and the three build stages as plain content. */
function StaticHero() {
  return (
    <>
      <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden bg-paper">
        <div className="relative min-h-svh">
          <div className="absolute inset-x-0 top-0 h-[46svh] overflow-hidden max-lg:[@media(max-height:740px)]:h-[36svh] lg:inset-0 lg:h-auto">
            <div className="absolute inset-0 lg:left-0 lg:right-auto lg:w-[118%]">
              <Image src={endFrame} alt="" fill priority sizes="100vw" placeholder="blur" className="object-cover" />
            </div>
          </div>
          <div className="container-site relative flex min-h-svh flex-col justify-end pb-10 pt-[calc(46svh+1.5rem)] max-lg:[@media(max-height:740px)]:pt-[calc(36svh+1.25rem)] lg:justify-center lg:pb-0 lg:pt-24">
            <div className="lg:max-w-[42rem]">
              <IntroCopy />
            </div>
          </div>
        </div>
      </section>

      <section id="how-we-build" aria-labelledby="build-title" className="scroll-mt-16 bg-paper py-20 md:py-28">
        <div className="container-site">
          <SectionLabel>{BUILD_SEQUENCE.label}</SectionLabel>
          <h2 id="build-title" className="mt-6 font-display heading-lg text-ink">
            {BUILD_SEQUENCE.title}
          </h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {BUILD_SEQUENCE.chapters.map((c, i) => (
              <li key={c.word} className="rounded-[1.75rem] border border-line bg-surface p-7 md:p-9">
                <p className="eyebrow text-rose">{c.stage}</p>
                <h3 className="mt-3 font-display text-4xl text-ink">
                  <span className="sr-only">{pad(i + 1)} — </span>
                  {c.word}
                </h3>
                <p className="mt-3 leading-relaxed text-slate">{c.caption}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

export default function HeroSection() {
  const reducedMotion = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)", true);
  const isPhone = useMediaQuery("(max-width: 767px)");

  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const stageRef = useRef<HTMLSpanElement>(null);
  const stageTagRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLLIElement | null)[]>([]);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const activeChapter = useRef(-1);
  const [typeMode, setTypeMode] = useState<TypographyMode>("pending");

  const progressRef = useScrollProgress(sectionRef, {
    mode: "pin",
    smoothing: 10,
    onUpdate: (p) => {
      // Intro (headline + buttons) lifts away once the build begins.
      const out = easeInOutCubic(range(p, INTRO_OUT[0], INTRO_OUT[1]));
      if (introRef.current) {
        introRef.current.style.opacity = String(1 - out);
        introRef.current.style.transform = `translate3d(0, ${-40 * out}px, 0)`;
        introRef.current.style.pointerEvents = out > 0.5 ? "none" : "auto";
        introRef.current.style.visibility = out >= 1 ? "hidden" : "visible";
      }

      // The build-sequence layer (label, counter, progress) fades in behind it.
      const seq = range(p, 0.13, 0.18);
      if (sequenceRef.current) sequenceRef.current.style.opacity = String(seq);
      if (stageTagRef.current) stageTagRef.current.style.opacity = String(seq);

      chapterRefs.current.forEach((el, i) => {
        if (!el) return;
        const o = chapterOpacity(p, i);
        el.style.opacity = String(o);
        el.style.transform = `translate3d(0, ${lerp(14, 0, o)}px, 0)`;
        el.style.visibility = o < 0.01 ? "hidden" : "visible";
      });

      barRefs.current.forEach((el, i) => {
        if (el) el.style.transform = `scaleX(${range(p, BOUNDS[i], i === 2 ? SEQUENCE_WINDOW[1] : BOUNDS[i + 1])})`;
      });

      const index = p < BOUNDS[1] ? 0 : p < BOUNDS[2] ? 1 : 2;
      if (index !== activeChapter.current) {
        activeChapter.current = index;
        if (counterRef.current) counterRef.current.textContent = pad(index + 1);
        if (stageRef.current) stageRef.current.textContent = BUILD_SEQUENCE.chapters[index].stage;
      }

      // Closing line + buttons over the finished house.
      const outro = easeOutCubic(range(p, OUTRO_IN[0], OUTRO_IN[1]));
      if (outroRef.current) {
        outroRef.current.style.opacity = String(outro);
        outroRef.current.style.transform = `translate3d(0, ${lerp(16, 0, outro)}px, 0)`;
        outroRef.current.style.pointerEvents = outro > 0.5 ? "auto" : "none";
        outroRef.current.style.visibility = outro < 0.01 ? "hidden" : "visible";
      }

      if (cueRef.current) cueRef.current.style.opacity = String(1 - range(p, 0, 0.05));
    },
  });

  useFrameSequence(canvasRef, {
    frames: isPhone ? BUILD_SEQUENCE.frames.mobile : BUILD_SEQUENCE.frames.desktop,
    enabled: !reducedMotion,
    getProgress: () => range(progressRef.current ?? 0, SEQUENCE_WINDOW[0], SEQUENCE_WINDOW[1]),
  });

  const onModeChange = useCallback((mode: TypographyMode) => setTypeMode(mode), []);

  if (reducedMotion) return <StaticHero />;

  // In 3D mode the DOM words stay available to screen readers but are
  // visually hidden; without WebGL they render as large serif type.
  const htmlWords = typeMode === "html";
  const wordHeight = "h-[6rem] sm:h-[8rem] lg:h-[10.5rem]";

  return (
    <section ref={sectionRef} id="home" aria-labelledby="hero-title" className="relative h-[400vh] bg-paper lg:h-[460vh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* ---------------------------------------------------- picture layer */}
        {/* Phones/tablets: the top 46% (36% on short screens) with a clean edge. Desktop: full screen,
            118% wide and anchored left so the house sits right of centre,
            away from the copy. */}
        <div className="absolute inset-x-0 top-0 h-[46svh] overflow-hidden max-lg:[@media(max-height:740px)]:h-[36svh] lg:inset-0 lg:h-auto">
          <div className="absolute inset-0 lg:left-0 lg:right-auto lg:w-[118%]">
            {/* First frame as an optimised image: instant paint while the
                sequence loads, and the LCP element. */}
            <Image src={startFrame} alt="" fill priority sizes="100vw" placeholder="blur" className="object-cover" />
            <canvas
              ref={canvasRef}
              role="img"
              aria-label="Construction sequence animation"
              aria-describedby="hero-sequence-description"
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <p id="hero-sequence-description" className="sr-only">
            {BUILD_SEQUENCE.video.description}
          </p>

          {/* Stage name — plain type on the picture, no card */}
          <div
            ref={stageTagRef}
            aria-hidden="true"
            className="on-image-text absolute right-5 top-20 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-surface md:right-8 lg:bottom-10 lg:right-10 lg:top-auto"
            style={{ opacity: 0 }}
          >
            <span ref={stageRef}>{BUILD_SEQUENCE.chapters[0].stage}</span>
          </div>
        </div>

        {/* ---------------------------------------------------- copy layer */}
        {/* Below lg the copy starts just under the picture; from lg it is
            vertically centred over it. */}
        <div className="container-site relative flex h-full flex-col justify-start pb-6 pt-[calc(46svh+1.5rem)] max-lg:[@media(max-height:740px)]:pt-[calc(36svh+1.25rem)] lg:justify-center lg:pb-0 lg:pt-20">
          <div className="relative lg:max-w-[42rem]">
            <IntroCopy ref={introRef} />

            {/* Build sequence — occupies the same box as the intro */}
            <div ref={sequenceRef} className={`pointer-events-none absolute inset-0 flex flex-col ${onImage}`} style={{ opacity: 0 }}>
              <div className="flex items-center gap-4">
                <SectionLabel className="lg:text-surface">{BUILD_SEQUENCE.label}</SectionLabel>
                <p className="text-sm font-bold tabular-nums text-ink lg:text-surface" aria-hidden="true">
                  <span ref={counterRef}>01</span>
                  <span className="text-slate lg:text-surface/70"> / {pad(BUILD_SEQUENCE.chapters.length)}</span>
                </p>
              </div>
              <h2 className="sr-only">{BUILD_SEQUENCE.title}</h2>

              <div className="relative mt-3 flex-1">
                <div className={`absolute inset-x-0 top-0 ${wordHeight}`}>
                  <Typography3D
                    chapters={TYPE_CHAPTERS}
                    progressRef={progressRef}
                    onModeChange={onModeChange}
                    tone={isDesktop ? "light" : "dark"}
                  />
                </div>
                <ol>
                  {BUILD_SEQUENCE.chapters.map((c, i) => (
                    <li
                      key={c.word}
                      ref={(el) => {
                        chapterRefs.current[i] = el;
                      }}
                      className="absolute inset-0 flex flex-col will-change-transform"
                      style={{ opacity: 0, visibility: "hidden" }}
                    >
                      <h3
                        className={
                          htmlWords
                            ? `flex ${wordHeight} items-end font-display text-[clamp(3.2rem,7.5vw,6.5rem)] leading-none text-ink lg:text-surface`
                            : "sr-only"
                        }
                      >
                        <span className="sr-only">{pad(i + 1)} — </span>
                        {c.word}
                      </h3>
                      <p
                        className={`max-w-[30rem] leading-relaxed text-ink lg:max-w-[25rem] lg:text-lg lg:font-medium lg:text-surface ${
                          htmlWords ? "mt-3" : "mt-[6rem] sm:mt-[8rem] lg:mt-[10.5rem]"
                        }`}
                      >
                        {c.caption}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Closing line + buttons, over the finished house */}
              <div ref={outroRef} className="mb-5" style={{ opacity: 0, visibility: "hidden" }}>
                <p className="font-display text-xl tracking-[-0.02em] text-ink lg:text-2xl lg:text-surface">{HERO.outro}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <HeroButtons />
                </div>
              </div>

              {/* Chapter progress */}
              <div aria-hidden="true" className="grid grid-cols-3 gap-3">
                {BUILD_SEQUENCE.chapters.map((c, i) => (
                  <div key={c.word}>
                    <span className="relative block h-[2px] overflow-hidden bg-line lg:bg-surface/40">
                      <span
                        ref={(el) => {
                          barRefs.current[i] = el;
                        }}
                        className="absolute inset-0 origin-left bg-rose lg:bg-blush"
                        style={{ transform: "scaleX(0)" }}
                      />
                    </span>
                    <span className="mt-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate lg:text-surface">
                      {c.word.replace(".", "")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <div
            ref={cueRef}
            aria-hidden="true"
            className="on-image-text absolute bottom-8 right-10 hidden items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-surface lg:flex"
          >
            <span className="relative block h-10 w-px overflow-hidden bg-surface/40">
              <span className="scroll-cue-dot absolute inset-x-0 top-0 h-1/3 bg-blush" />
            </span>
            {HERO.scrollCue}
          </div>
        </div>
      </div>
    </section>
  );
}
