"use client";

import { useEffect, useRef, useState } from "react";
import Button, { ArrowIcon } from "@/components/ui/Button";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitText from "@/components/ui/SplitText";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { SERVICES, SERVICES_INTRO } from "@/lib/content";
import { CTA } from "@/lib/site";

const pad = (n: number) => String(n).padStart(2, "0");

/*
 * SERVICES — on desktop the card row is pinned and slides sideways as the
 * page scrolls (a sticky frame inside a wrapper whose height equals the
 * sideways travel plus one screen). Phones, tablets and reduced-motion
 * visitors get a plain two-column grid.
 */
export default function ServicesSection() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reducedMotion = usePrefersReducedMotion();
  const horizontal = isDesktop && !reducedMotion;

  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const distance = useRef(0);
  const [height, setHeight] = useState<number>();

  // Measure how far the row has to travel; the wrapper is that much taller than the screen.
  useEffect(() => {
    const track = trackRef.current;
    if (!horizontal || !track) {
      if (track) track.style.transform = "";
      return;
    }
    const measure = () => {
      distance.current = Math.max(0, track.scrollWidth - window.innerWidth);
      setHeight(distance.current + window.innerHeight);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [horizontal]);

  useScrollProgress(pinRef, {
    mode: "pin",
    smoothing: 12,
    onUpdate: (p) => {
      if (!horizontal) return;
      if (trackRef.current) trackRef.current.style.transform = `translate3d(${-p * distance.current}px, 0, 0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (counterRef.current) counterRef.current.textContent = pad(Math.min(SERVICES.length, 1 + Math.floor(p * SERVICES.length)));
    },
  });

  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-16 bg-surface pt-24 md:pt-32">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-6">
          <Reveal>
            <SectionLabel>{SERVICES_INTRO.label}</SectionLabel>
          </Reveal>
          <SplitText id="services-title" text={SERVICES_INTRO.title} className="mt-7 font-display heading-xl text-ink" />
          <Reveal delay={120}>
            <p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-slate">{SERVICES_INTRO.body}</p>
            <Button href={CTA.primary.href} label="Discuss your project" variant="outline" className="mt-8" />
          </Reveal>
        </div>

        <figure className="lg:col-span-5 lg:col-start-8">
          <ParallaxImage
            src={SERVICES_INTRO.image.src}
            alt={SERVICES_INTRO.image.alt}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-[16/10] w-full"
            radius="2rem"
          />
        </figure>
      </div>

      <div ref={pinRef} className="relative" style={{ height: horizontal ? height : undefined }}>
        <div className={horizontal ? "sticky top-0 flex h-svh flex-col justify-center overflow-hidden" : "container-site pb-24 pt-16 md:pb-32"}>
          {horizontal && (
            <div aria-hidden="true" className="container-site mb-8 flex items-center justify-between gap-8">
              <p className="eyebrow flex items-center gap-3 text-slate">
                Scroll to explore
                <ArrowIcon size={14} />
              </p>
              <div className="flex w-[18rem] items-center gap-4">
                <span className="text-sm font-bold tabular-nums text-ink">
                  <span ref={counterRef}>01</span>
                  <span className="text-slate"> / {pad(SERVICES.length)}</span>
                </span>
                <span className="relative h-[2px] flex-1 overflow-hidden rounded bg-line">
                  <span ref={barRef} className="absolute inset-0 origin-left bg-ink" style={{ transform: "scaleX(0)" }} />
                </span>
              </div>
            </div>
          )}

          <ol
            ref={trackRef}
            className={
              horizontal
                ? "flex w-max gap-5 pl-[max(2.5rem,calc((100vw-90rem)/2+2.5rem))] pr-10 will-change-transform"
                : "grid gap-4 sm:grid-cols-2"
            }
          >
            {SERVICES.map((service, i) => (
              <li
                key={service.title}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-line bg-paper p-7 transition-[background-color,border-color,transform] duration-500 ease-[var(--ease-expo)] hover:-translate-y-1.5 hover:border-ink hover:bg-ink md:p-8 ${
                  horizontal ? "h-[min(28rem,58vh)] w-[22rem] xl:w-[24rem]" : "min-h-[15rem] gap-10"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-[3.5rem] leading-none text-outline text-ink/30 transition-colors duration-500 group-hover:text-blush">
                    {pad(i + 1)}
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink transition-all duration-500 ease-[var(--ease-expo)] group-hover:-rotate-45 group-hover:border-blush group-hover:bg-blush"
                  >
                    <ArrowIcon />
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-[1.6rem] leading-[1.1] tracking-[-0.03em] text-ink transition-colors duration-500 group-hover:text-paper">
                    {service.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate transition-colors duration-500 group-hover:text-paper/70">{service.description}</p>
                </div>
              </li>
            ))}

            {/* Closing card */}
            <li
              className={`relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-blush p-7 md:p-8 ${
                horizontal ? "h-[min(28rem,58vh)] w-[22rem] xl:w-[24rem]" : "min-h-[15rem] gap-10 sm:col-span-2"
              }`}
            >
              <p className="font-display text-[2rem] leading-[1.05] text-ink">
                Have a project <span className="accent">in mind?</span>
              </p>
              <div>
                <p className="mb-6 max-w-[20rem] leading-relaxed text-ink/75">
                  Tell us what you want to build — we’ll guide you from plan to handover.
                </p>
                <Button href={CTA.primary.href} label={CTA.primary.label} />
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
