import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitText from "@/components/ui/SplitText";
import { WHY_US } from "@/lib/content";

/** Six reasons to choose us. */
export default function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="bg-surface py-24 md:py-32">
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel>{WHY_US.label}</SectionLabel>
            </Reveal>
            <SplitText id="why-title" text={WHY_US.title} className="mt-6 font-display heading-lg text-ink" />
          </div>
        </div>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={(i % 3) * 90}
              className="group rounded-[2rem] border border-line bg-paper p-8 transition-colors duration-500 hover:border-ink hover:bg-ink"
            >
              <span aria-hidden="true" className="grid h-12 w-12 place-items-center rounded-full bg-blush font-display text-sm text-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-8 font-display text-2xl tracking-[-0.03em] text-ink transition-colors duration-500 group-hover:text-paper">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-slate transition-colors duration-500 group-hover:text-paper/70">{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
