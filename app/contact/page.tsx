import type { Metadata } from "next";
import Link from "next/link";
import EnquiryForm from "@/components/EnquiryForm";
import { ChatIcon, PhoneIcon, external } from "@/components/ContactSection";
import Breadcrumbs from "@/components/page/Breadcrumbs";
import Faq from "@/components/page/Faq";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitText from "@/components/ui/SplitText";
import { CONTACT_COPY, GENERAL_FAQ } from "@/lib/content";
import { CONTACT, SERVICE_AREAS, SITE, contactLinks, isPlaceholder } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Talk to Mani Mohan Construction about your house, apartment, commercial building or renovation in Chennai. Call, WhatsApp or send an enquiry for a site visit and a written estimate.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const details = [
    { term: "Phone", value: CONTACT.phone, href: contactLinks.call },
    { term: "WhatsApp", value: `+${CONTACT.whatsapp}`, href: contactLinks.whatsapp },
    { term: "Email", value: CONTACT.email, href: contactLinks.email },
    { term: "Office", value: CONTACT.address },
    { term: "Working hours", value: CONTACT.hours },
  ];
  const mapsHref = isPlaceholder(CONTACT.address) ? null : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${SITE.name}, ${CONTACT.address}`)}`;

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      {/* Hero + form on charcoal */}
      <section aria-labelledby="contact-title" className="grain relative overflow-hidden bg-ink pb-24 pt-32 text-paper md:pb-32 md:pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-blush/20 blur-[120px]" />
        <div className="container-site relative grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <Breadcrumbs items={[{ href: "/contact", label: "Contact" }]} tone="light" />
              <SectionLabel tone="light" className="mt-8">
                Contact Us
              </SectionLabel>
            </Reveal>
            <SplitText
              as="h1"
              id="contact-title"
              text={CONTACT_COPY.title}
              accentClassName="text-blush"
              className="mt-6 font-display text-[clamp(2.4rem,5.2vw,4.75rem)] leading-[0.98] text-paper"
            />
            <Reveal delay={120}>
              <p className="mt-7 max-w-[30rem] text-lg leading-relaxed text-paper/70">{CONTACT_COPY.body}</p>
            </Reveal>
            <Reveal delay={200} className="mt-9 flex flex-wrap gap-3">
              <Button href={contactLinks.call} label="Call Us" variant="blush" icon={<PhoneIcon />} />
              <Button href={contactLinks.whatsapp} label="WhatsApp Us" variant="glass" icon={<ChatIcon />} {...external(contactLinks.whatsapp)} />
            </Reveal>
          </div>

          <Reveal delay={160} className="lg:col-span-7 lg:col-start-6">
            <div className="rounded-[2rem] border border-paper/10 bg-paper/[0.04] p-6 backdrop-blur-sm md:p-10">
              <h2 className="font-display text-2xl tracking-[-0.03em] text-paper md:text-3xl">Send us your enquiry</h2>
              <p className="mb-8 mt-2 text-paper/60">Fields marked * are required.</p>
              <EnquiryForm tone="dark" idPrefix="contact-enquiry" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Details + areas */}
      <section aria-label="Contact details and service areas" className="bg-surface py-24 md:py-32">
        <div className="container-site grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div id="contact-details" tabIndex={-1} className="h-full scroll-mt-28 rounded-[2rem] border border-line bg-paper p-7 outline-none md:p-10">
              <h2 className="font-display text-3xl tracking-[-0.03em] text-ink">Contact details</h2>
              <dl className="mt-6">
                {details.map((item) => (
                  <div key={item.term} className="grid gap-1 border-t border-line py-4 sm:grid-cols-[9rem_1fr] sm:gap-4">
                    <dt className="eyebrow pt-0.5 text-rose">{item.term}</dt>
                    <dd className="text-lg text-ink">
                      {item.href && !item.href.startsWith("/") ? (
                        <a href={item.href} className="link-underline" {...external(item.href)}>
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
              {mapsHref && (
                <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="link-underline mt-4 inline-block font-bold text-rose">
                  Open in Google Maps ↗
                </a>
              )}
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="grain relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-[2rem] bg-ink p-7 text-paper md:p-10">
              <div>
                <h2 className="font-display text-3xl tracking-[-0.03em]">Where we build</h2>
                <p className="mt-3 leading-relaxed text-paper/70">
                  Across {SITE.city}. Saidapet is home — around half the buildings in our neighbourhood are our work.
                </p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {[SITE.city, ...SERVICE_AREAS].map((area) => (
                  <li key={area} className="rounded-full border border-paper/20 px-4 py-2 text-sm font-semibold">
                    {area}
                  </li>
                ))}
              </ul>
              <Link href="/projects" className="link-underline self-start font-bold text-blush">
                See our current sites →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Faq items={GENERAL_FAQ} />
    </main>
  );
}
