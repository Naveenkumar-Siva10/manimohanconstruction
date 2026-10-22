import JsonLd from "@/components/page/JsonLd";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitText from "@/components/ui/SplitText";

type FaqProps = {
  items: { q: string; a: string }[];
  title?: string;
  label?: string;
  /** Emit FAQPage structured data (once per page). */
  schema?: boolean;
};

/** Accordion of questions (native <details>, so it works without JavaScript). */
export default function Faq({ items, title = "Common *questions*", label = "FAQ", schema = true }: FaqProps) {
  return (
    <section aria-label="Frequently asked questions" className="bg-paper py-24 md:py-32">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Reveal>
            <SectionLabel>{label}</SectionLabel>
          </Reveal>
          <SplitText text={title} className="mt-6 font-display heading-lg text-ink" />
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          {items.map((item, i) => (
            <Reveal key={item.q} delay={i * 60}>
              <details className="group border-b border-line py-2 first:border-t">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-[clamp(1.15rem,1.8vw,1.45rem)] leading-snug tracking-[-0.02em] text-ink [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/15 transition-colors duration-300 group-open:border-ink group-open:bg-ink group-open:text-paper"
                  >
                    <span className="absolute h-[2px] w-3.5 rounded bg-current" />
                    <span className="absolute h-3.5 w-[2px] rounded bg-current transition-transform duration-300 group-open:rotate-90" />
                  </span>
                </summary>
                <p className="max-w-[44rem] pb-6 pr-14 text-lg leading-relaxed text-slate">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
      {schema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }}
        />
      )}
    </section>
  );
}
