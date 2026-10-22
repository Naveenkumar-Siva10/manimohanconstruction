import type { Metadata } from "next";
import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitText from "@/components/ui/SplitText";
import CtaBand from "@/components/page/CtaBand";
import PageHero from "@/components/page/PageHero";
import ProcessSteps from "@/components/page/ProcessSteps";
import WhyUs from "@/components/page/WhyUs";
import GoalsSection from "@/components/GoalsSection";
import VisionSection from "@/components/VisionSection";
import { ABOUT, ABOUT_PAGE, TRACK_RECORD } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Mani Mohan Construction is a family-run builder from Saidapet, Chennai, with 27+ years of experience and 100+ buildings completed. Our story, values and the way we work.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero crumbs={[{ href: "/about", label: "About Us" }]} label={ABOUT_PAGE.label} title={ABOUT_PAGE.title} intro={ABOUT_PAGE.intro} image={ABOUT.image} />

      {/* Story + figures */}
      <section aria-labelledby="story-title" className="bg-surface py-24 md:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel>Our Story</SectionLabel>
            </Reveal>
            <SplitText id="story-title" text={ABOUT_PAGE.story.title} className="mt-6 font-display heading-lg text-ink" />
            <dl className="mt-12 grid grid-cols-3 gap-3">
              {TRACK_RECORD.stats.map((stat) => (
                <Reveal key={stat.label} className="flex flex-col-reverse gap-2 rounded-2xl border border-line bg-paper p-4 md:p-5">
                  <dt className="text-[0.65rem] font-bold uppercase leading-snug tracking-[0.14em] text-slate">{stat.label}</dt>
                  <dd className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-none text-ink">
                    <CountUp value={stat.value} />
                    <span className="text-rose">{stat.suffix}</span>
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
          <div className="space-y-6 lg:col-span-6 lg:col-start-7">
            {ABOUT_PAGE.story.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={i * 100}>
                <p className={`leading-relaxed ${i === 0 ? "font-display text-[clamp(1.4rem,2.4vw,2rem)] leading-snug tracking-[-0.03em] text-ink" : "text-lg text-slate"}`}>
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <VisionSection label="Our Vision" />
      <WhyUs />
      <GoalsSection label="Our Goals" />
      <ProcessSteps />
      <CtaBand spaced />
    </main>
  );
}
