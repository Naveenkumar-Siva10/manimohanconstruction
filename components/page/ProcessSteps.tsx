import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitText from "@/components/ui/SplitText";
import { PROCESS } from "@/lib/content";

/** The five-step way we run a project, on a charcoal band. */
export default function ProcessSteps() {
  return (
    <section aria-labelledby="process-title" className="grain relative overflow-hidden bg-ink py-24 text-paper md:py-32">
      <div className="container-site relative">
        <Reveal>
          <SectionLabel tone="light">{PROCESS.label}</SectionLabel>
        </Reveal>
        <SplitText id="process-title" text={PROCESS.title} accentClassName="text-blush" className="mt-6 max-w-[48rem] font-display heading-lg text-paper" />

        <ol className="mt-16 grid gap-px overflow-hidden rounded-[2rem] bg-paper/10 md:grid-cols-2 lg:grid-cols-5">
          {PROCESS.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 90} className="group relative flex flex-col gap-10 bg-ink p-7 transition-colors duration-500 hover:bg-[#222427] md:p-8">
              <span className="font-display text-5xl leading-none text-outline text-blush">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-xl tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-paper/65">{step.body}</p>
              </div>
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-blush transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-x-100" />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
