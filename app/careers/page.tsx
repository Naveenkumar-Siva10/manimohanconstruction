import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import PageHero from "@/components/page/PageHero";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitText from "@/components/ui/SplitText";
import { CAREERS, ONGOING } from "@/lib/content";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Work with Mani Mohan Construction in Chennai — site engineers, supervisors and skilled tradespeople. Send us your details.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero
        crumbs={[{ href: "/careers", label: "Careers" }]}
        label={CAREERS.label}
        title={CAREERS.title}
        intro={CAREERS.intro}
        image={ONGOING[0].pictures[2]}
        actions={false}
      />

      <section aria-labelledby="roles-title" className="bg-surface py-24 md:py-32">
        <div className="container-site">
          <Reveal>
            <SectionLabel>Who We Work With</SectionLabel>
          </Reveal>
          <SplitText id="roles-title" text="People who take *pride* in good work" className="mt-6 max-w-[44rem] font-display heading-lg text-ink" />
          <ul className="mt-14 grid gap-4 md:grid-cols-3">
            {CAREERS.roles.map((role, i) => (
              <Reveal as="li" key={role.title} delay={i * 90} className="rounded-[2rem] border border-line bg-paper p-8 md:p-10">
                <span className="font-display text-5xl leading-none text-outline text-rose">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-10 font-display text-2xl tracking-[-0.03em] text-ink">{role.title}</h3>
                <p className="mt-3 leading-relaxed text-slate">{role.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="apply-title" className="bg-paper py-24 md:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionLabel>Apply</SectionLabel>
            </Reveal>
            <SplitText id="apply-title" text="Send us your *details*" className="mt-6 font-display heading-lg text-ink" />
            <Reveal delay={120}>
              <p className="mt-6 text-lg leading-relaxed text-slate">{CAREERS.note}</p>
            </Reveal>
          </div>
          <Reveal delay={120} className="rounded-[2rem] border border-line bg-surface p-6 md:p-9 lg:col-span-7 lg:col-start-6">
            <EnquiryForm kind="career" idPrefix="career" />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
