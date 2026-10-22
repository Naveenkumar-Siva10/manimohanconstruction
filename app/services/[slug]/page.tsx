import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EnquiryForm from "@/components/EnquiryForm";
import CtaBand from "@/components/page/CtaBand";
import Faq from "@/components/page/Faq";
import JsonLd from "@/components/page/JsonLd";
import PageHero from "@/components/page/PageHero";
import ProcessSteps from "@/components/page/ProcessSteps";
import ServiceGrid from "@/components/page/ServiceGrid";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitText from "@/components/ui/SplitText";
import { SERVICES, getService, serviceHref } from "@/lib/services";
import { SITE } from "@/lib/site";

// Only the services in lib/services.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const title = `${service.title} in Chennai`;
  return {
    title,
    description: `${service.description} ${SITE.name} — family-run, 27+ years, 100+ buildings in Chennai.`,
    alternates: { canonical: serviceHref(service.slug) },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description: service.description,
      url: serviceHref(service.slug),
      ...(service.image ? { images: [{ url: service.image.src.src, alt: service.image.alt }] } : {}),
    },
  };
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m3 8.5 3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const number = String(SERVICES.indexOf(service) + 1).padStart(2, "0");

  // "Individual house construction" → "Individual house *construction*"
  const words = service.title.split(" ");
  const title = `${words.slice(0, -1).join(" ")} *${words.at(-1)}*`;

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero
        crumbs={[
          { href: "/services", label: "Services" },
          { href: serviceHref(service.slug), label: service.short },
        ]}
        label={`Service ${number}`}
        title={title}
        intro={service.intro}
        image={service.image}
        panelText={number}
      />

      {/* What's included + highlights */}
      <section aria-labelledby="included-title" className="bg-surface py-24 md:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel>What’s Included</SectionLabel>
            </Reveal>
            <SplitText id="included-title" text="Everything the job *needs*" className="mt-6 font-display heading-lg text-ink" />
            <Reveal delay={120}>
              <p className="mt-6 max-w-[28rem] text-lg leading-relaxed text-slate">{service.description}</p>
            </Reveal>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {service.includes.map((item, i) => (
              <Reveal as="li" key={item} delay={(i % 2) * 80}>
                <span className="flex h-full items-start gap-4 rounded-2xl border border-line bg-paper px-5 py-4">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blush text-ink">
                    <CheckIcon />
                  </span>
                  <span className="font-semibold leading-snug text-ink">{item}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="container-site mt-20 grid gap-4 md:grid-cols-3">
          {service.highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 90} className={`rounded-[2rem] p-8 md:p-10 ${i === 1 ? "bg-blush" : "bg-ink text-paper"}`}>
              <span className={`font-display text-sm ${i === 1 ? "text-ink/60" : "text-blush"}`}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-8 font-display text-2xl tracking-[-0.03em]">{h.title}</h3>
              <p className={`mt-3 leading-relaxed ${i === 1 ? "text-ink/75" : "text-paper/70"}`}>{h.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <ProcessSteps />
      <Faq items={service.faqs} title={`${service.short}: *questions*`} />

      {/* Enquiry, pre-set to this service */}
      <section aria-labelledby="service-enquiry-title" className="bg-surface py-24 md:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionLabel>Enquire</SectionLabel>
            </Reveal>
            <SplitText id="service-enquiry-title" text="Tell us about your *project*" className="mt-6 font-display heading-lg text-ink" />
            <Reveal delay={120}>
              <p className="mt-6 text-lg leading-relaxed text-slate">We’ll arrange a site visit and follow up with a clear, written estimate.</p>
            </Reveal>
          </div>
          <Reveal delay={120} className="rounded-[2rem] border border-line bg-paper p-6 md:p-9 lg:col-span-7 lg:col-start-6">
            <EnquiryForm defaultService={service.title} idPrefix="service-enquiry" />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="more-services-title" className="bg-paper py-24 md:py-32">
        <div className="container-site">
          <Reveal>
            <SectionLabel>More Services</SectionLabel>
          </Reveal>
          <SplitText id="more-services-title" text="We can also *help* with" className="mb-12 mt-6 font-display heading-lg text-ink" />
          <ServiceGrid exclude={service.slug} limit={3} />
        </div>
      </section>

      <CtaBand />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.intro,
          serviceType: service.title,
          url: `${SITE.url}${serviceHref(service.slug)}`,
          areaServed: { "@type": "City", name: SITE.city },
          provider: { "@id": `${SITE.url}/#business` },
        }}
      />
    </main>
  );
}
