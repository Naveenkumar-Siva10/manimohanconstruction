import type { Metadata } from "next";
import CtaBand from "@/components/page/CtaBand";
import Faq from "@/components/page/Faq";
import PageHero from "@/components/page/PageHero";
import ProcessSteps from "@/components/page/ProcessSteps";
import ServiceGrid from "@/components/page/ServiceGrid";
import WhyUs from "@/components/page/WhyUs";
import { GENERAL_FAQ, SERVICES_INTRO } from "@/lib/content";

export const metadata: Metadata = {
  title: "Construction Services in Chennai",
  description:
    "House construction, residential and apartment buildings, commercial buildings, renovation, extensions, finishing, tiling, electrical and plumbing — every construction service from Mani Mohan Construction, Chennai.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero
        crumbs={[{ href: "/services", label: "Services" }]}
        label="What We Do"
        title="Construction services, *start* to finish"
        intro={SERVICES_INTRO.body}
        image={SERVICES_INTRO.image}
      />

      <section aria-label="All services" className="bg-surface py-24 md:py-32">
        <div className="container-site">
          <ServiceGrid />
        </div>
      </section>

      <ProcessSteps />
      <WhyUs />
      <Faq items={GENERAL_FAQ.slice(0, 4)} />
      <CtaBand />
    </main>
  );
}
