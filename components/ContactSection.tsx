import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitText from "@/components/ui/SplitText";
import EnquiryForm from "@/components/EnquiryForm";
import { CONTACT_COPY } from "@/lib/content";
import { contactLinks } from "@/lib/site";

export function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </svg>
  );
}

export function ChatIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 12a8 8 0 0 1-11.8 7L4 20l1.1-4A8 8 0 1 1 20 12Z" />
    </svg>
  );
}

/** Opens in a new tab only for real external links (WhatsApp). */
export const external = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {});

/** Home page closing section: headline + quick contact buttons, and the enquiry form. */
export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="grain relative scroll-mt-16 overflow-hidden rounded-t-[2.5rem] bg-ink py-24 text-paper md:rounded-t-[4rem] md:py-36"
    >
      {/* Soft blush glow in the corner */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-blush/20 blur-[120px]" />

      <div className="container-site relative grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionLabel tone="light">{CONTACT_COPY.label}</SectionLabel>
          </Reveal>
          <SplitText id="contact-title" text={CONTACT_COPY.title} accentClassName="text-blush" className="mt-7 font-display heading-lg text-paper" />
          <Reveal delay={120}>
            <p className="mt-8 max-w-[30rem] text-lg leading-relaxed text-paper/70">{CONTACT_COPY.body}</p>
          </Reveal>
          <Reveal delay={200} className="mt-10 flex flex-wrap gap-3">
            <Button href={contactLinks.call} label="Call Us" variant="blush" icon={<PhoneIcon />} />
            <Button href={contactLinks.whatsapp} label="WhatsApp Us" variant="glass" icon={<ChatIcon />} {...external(contactLinks.whatsapp)} />
          </Reveal>
          <Reveal delay={260}>
            <Button href="/contact" label="All contact details" variant="glass" icon={false} size="sm" className="mt-3" />
          </Reveal>
        </div>

        <Reveal delay={160} className="lg:col-span-6 lg:col-start-7">
          <div className="rounded-[2rem] border border-paper/10 bg-paper/[0.04] p-6 backdrop-blur-sm md:p-9">
            <h3 className="mb-7 font-display text-2xl tracking-[-0.03em] text-paper">Send us your enquiry</h3>
            <EnquiryForm tone="dark" idPrefix="home-enquiry" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
