import Link from "next/link";
import { ArrowIcon } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { SERVICES, serviceHref } from "@/lib/services";

/** Every service as a linked card. `exclude` drops the current page's service. */
export default function ServiceGrid({ exclude, limit }: { exclude?: string; limit?: number }) {
  const services = SERVICES.filter((s) => s.slug !== exclude).slice(0, limit);
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, i) => {
        const number = SERVICES.findIndex((s) => s.slug === service.slug) + 1;
        return (
          <Reveal as="li" key={service.slug} delay={(i % 3) * 90}>
            <Link
              href={serviceHref(service.slug)}
              className="group flex h-full min-h-[17rem] flex-col justify-between gap-10 rounded-[2rem] border border-line bg-paper p-7 transition-[background-color,border-color,transform] duration-500 ease-[var(--ease-expo)] hover:-translate-y-1.5 hover:border-ink hover:bg-ink md:p-8"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-[3.25rem] leading-none text-outline text-ink/30 transition-colors duration-500 group-hover:text-blush">
                  {String(number).padStart(2, "0")}
                </span>
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink transition-all duration-500 ease-[var(--ease-expo)] group-hover:-rotate-45 group-hover:border-blush group-hover:bg-blush"
                >
                  <ArrowIcon />
                </span>
              </div>
              <div>
                <h3 className="font-display text-[1.5rem] leading-[1.1] tracking-[-0.03em] text-ink transition-colors duration-500 group-hover:text-paper">
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed text-slate transition-colors duration-500 group-hover:text-paper/70">{service.description}</p>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </ul>
  );
}
