import Button from "@/components/ui/Button";
import LogoMark from "@/components/ui/LogoMark";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import { CTA, contactLinks } from "@/lib/site";

/** Closing call-to-action before the footer on inner pages. */
export default function CtaBand({
  title = "Ready to build your *dream* project?",
  body = "Tell us about your plot, your plans and your budget. We’ll visit the site and give you a clear, written estimate.",
  spaced = false,
}: {
  title?: string;
  body?: string;
  /** Add top padding when the previous section has a different background. */
  spaced?: boolean;
}) {
  return (
    <section aria-label="Start your project" className={`bg-paper pb-24 md:pb-32 ${spaced ? "pt-24 md:pt-32" : ""}`}>
      <div className="container-site">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-blush px-8 py-14 md:px-14 md:py-20">
          <LogoMark className="pointer-events-none absolute -bottom-16 -right-10 h-auto w-[min(60vw,30rem)] opacity-25 mix-blend-multiply" />
          <div className="relative max-w-[44rem]">
            <SplitText text={title} accentClassName="text-ink" className="font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-none text-ink" />
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-ink/80">{body}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={CTA.primary.href} label={CTA.primary.label} />
              <Button href={contactLinks.call} label="Call us" variant="outline" icon={false} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
