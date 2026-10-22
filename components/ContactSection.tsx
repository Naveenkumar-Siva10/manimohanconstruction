import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitText from "@/components/ui/SplitText";
import { CONTACT_COPY } from "@/lib/content";
import { CONTACT, contactLinks } from "@/lib/site";

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 12a8 8 0 0 1-11.8 7L4 20l1.1-4A8 8 0 1 1 20 12Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3.5 6.5h17v11h-17z M3.5 7l8.5 6 8.5-6" strokeLinejoin="round" />
    </svg>
  );
}

/** Opens in a new tab only for real external links (WhatsApp). */
const external = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {});

export default function ContactSection() {
  const details = [
    { term: "Phone", value: CONTACT.phone, href: contactLinks.call },
    { term: "WhatsApp", value: `+${CONTACT.whatsapp}`, href: contactLinks.whatsapp },
    { term: "Email", value: CONTACT.email, href: contactLinks.email },
    { term: "Office", value: CONTACT.address },
    { term: "Working hours", value: CONTACT.hours },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="grain relative scroll-mt-16 overflow-hidden rounded-t-[2.5rem] bg-ink py-24 text-paper md:rounded-t-[4rem] md:py-36"
    >
      {/* Soft blush glow in the corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-blush/20 blur-[120px]"
      />

      <div className="container-site relative grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Reveal>
            <SectionLabel tone="light">{CONTACT_COPY.label}</SectionLabel>
          </Reveal>
          <SplitText
            id="contact-title"
            text={CONTACT_COPY.title}
            accentClassName="text-blush"
            className="mt-7 font-display heading-xl text-paper"
          />
          <Reveal delay={120}>
            <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-paper/70 md:text-xl md:leading-relaxed">{CONTACT_COPY.body}</p>
          </Reveal>

          <Reveal delay={200} className="mt-10 flex flex-wrap gap-3">
            <Button href={contactLinks.call} label="Call Us" variant="blush" icon={<PhoneIcon />} />
            <Button href={contactLinks.whatsapp} label="WhatsApp Us" variant="glass" icon={<ChatIcon />} {...external(contactLinks.whatsapp)} />
            <Button href={contactLinks.consultation} label="Request a Consultation" variant="glass" icon={<MailIcon />} />
          </Reveal>
        </div>

        <Reveal as="div" delay={160} className="lg:col-span-5 lg:col-start-8">
          <div
            id="contact-details"
            tabIndex={-1}
            className="scroll-mt-28 rounded-[2rem] border border-paper/10 bg-paper/[0.04] p-7 outline-none backdrop-blur-sm md:p-9"
          >
            <h3 className="font-display text-2xl tracking-[-0.03em] text-paper">Contact details</h3>
            <dl className="mt-6">
              {details.map((item) => (
                <div key={item.term} className="grid gap-1 border-t border-paper/10 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                  <dt className="eyebrow pt-0.5 text-blush">{item.term}</dt>
                  <dd className="text-paper/85">
                    {item.href && !item.href.startsWith("#") ? (
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
