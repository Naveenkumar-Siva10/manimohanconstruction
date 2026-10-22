import Button from "@/components/ui/Button";
import LogoMark from "@/components/ui/LogoMark";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitText from "@/components/ui/SplitText";
import Breadcrumbs, { type Crumb } from "@/components/page/Breadcrumbs";
import type { Picture } from "@/lib/content";
import { CTA, contactLinks } from "@/lib/site";

type PageHeroProps = {
  crumbs: Crumb[];
  label: string;
  /** Wrap one word in *asterisks* for the italic accent. */
  title: string;
  intro: string;
  image?: Picture;
  /** Shown in the branded panel when there is no photo (e.g. a service number). */
  panelText?: string;
  /** Show the primary call-to-action buttons. */
  actions?: boolean;
};

/**
 * Top of every inner page: breadcrumbs, label, a split-reveal headline and
 * intro on the left; a photo (or a charcoal panel with the MMC mark when
 * there's no photo) on the right.
 */
export default function PageHero({ crumbs, label, title, intro, image, panelText, actions = true }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-paper pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Reveal>
            <Breadcrumbs items={crumbs} />
            <SectionLabel className="mt-8">{label}</SectionLabel>
          </Reveal>
          <SplitText as="h1" text={title} className="mt-6 font-display text-[clamp(2.4rem,5.6vw,5.25rem)] leading-[0.98] text-ink" />
          <Reveal delay={140}>
            <p className="mt-7 max-w-[38rem] text-lg leading-relaxed text-ink/75 md:text-xl md:leading-relaxed">{intro}</p>
          </Reveal>
          {actions && (
            <Reveal delay={220} className="mt-9 flex flex-wrap gap-3">
              <Button href={CTA.primary.href} label="Get a free consultation" />
              <Button href={contactLinks.call} label="Call us" variant="outline" icon={false} />
            </Reveal>
          )}
        </div>

        <div className="lg:col-span-5">
          {image ? (
            <ParallaxImage
              src={image.src}
              alt={image.alt}
              sizes="(min-width: 1024px) 60vw, 100vw"
              radius="2rem"
              className="aspect-[4/3] w-full lg:aspect-[4/5]"
            />
          ) : (
            <Reveal className="grain relative grid aspect-[4/3] w-full place-items-center overflow-hidden rounded-[2rem] bg-ink lg:aspect-[4/5]">
              <LogoMark className="absolute -right-[12%] -bottom-[8%] h-auto w-[90%] opacity-[0.1]" />
              {panelText && (
                <span aria-hidden="true" className="relative font-display text-[clamp(6rem,16vw,12rem)] leading-none text-outline text-blush">
                  {panelText}
                </span>
              )}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
