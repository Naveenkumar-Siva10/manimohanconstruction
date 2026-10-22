import Button from "@/components/ui/Button";
import CountUp from "@/components/ui/CountUp";
import LogoMark from "@/components/ui/LogoMark";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitText from "@/components/ui/SplitText";
import { ONGOING, PROJECTS_INTRO, TRACK_RECORD, type OngoingProject } from "@/lib/content";
import { CTA } from "@/lib/site";

function PinIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M8 14.5s4.5-4.2 4.5-7.8a4.5 4.5 0 0 0-9 0c0 3.6 4.5 7.8 4.5 7.8Z" />
      <circle cx="8" cy="6.6" r="1.6" />
    </svg>
  );
}

/** "Under construction" chip with a pulsing live dot. */
function LiveChip({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-paper/90 px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink backdrop-blur-md ${className}`}
    >
      <span aria-hidden="true" className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-rose" />
      </span>
      Under construction
    </span>
  );
}

/** Location, type, stage and description — shared by every project card. */
function ProjectText({ project, tone = "dark", headingId }: { project: OngoingProject; tone?: "dark" | "light"; headingId: string }) {
  const muted = tone === "light" ? "text-paper/70" : "text-slate";
  return (
    <>
      <p className={`eyebrow flex items-center gap-2 ${tone === "light" ? "text-blush" : "text-rose"}`}>
        <PinIcon />
        {project.type}
      </p>
      <h3
        id={headingId}
        className={`mt-3 font-display text-[clamp(2rem,3.6vw,3.25rem)] leading-none ${tone === "light" ? "text-paper" : "text-ink"}`}
      >
        {project.location}
      </h3>
      <p
        className={`mt-4 inline-flex w-fit rounded-full border px-3 py-1 text-xs font-bold ${
          tone === "light" ? "border-paper/20 text-paper/85" : "border-ink/15 text-ink"
        }`}
      >
        {project.stage}
      </p>
      <p className={`mt-4 max-w-[30rem] leading-relaxed ${muted}`}>{project.description}</p>
    </>
  );
}

/** The main site: a wide cover photo with the details and two thumbnails beside it. */
function FeatureProject({ project }: { project: OngoingProject }) {
  const [cover, ...thumbs] = project.pictures;
  return (
    <article aria-labelledby="ongoing-0" className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="relative lg:col-span-8">
        <ParallaxImage
          src={cover.src}
          alt={cover.alt}
          sizes="(min-width: 1024px) 62vw, 100vw"
          radius="2rem"
          className="aspect-[4/3] w-full sm:aspect-[16/10]"
        />
        <LiveChip className="absolute left-4 top-4" />
      </div>
      <div className="flex flex-col justify-between gap-8 lg:col-span-4">
        <Reveal>
          <ProjectText project={project} headingId="ongoing-0" />
        </Reveal>
        {thumbs.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {thumbs.map((picture, i) => (
              <ParallaxImage
                key={picture.alt}
                src={picture.src}
                alt={picture.alt}
                // Landscape photos cropped to portrait boxes: ask for the width of the cover crop.
                sizes="(min-width: 1024px) 30vw, 100vw"
                radius="1.25rem"
                strength={8}
                delay={120 + i * 100}
                className="aspect-[4/5] w-full"
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

/** A site with a photo: portrait image beside the details. */
function PhotoProject({ project, index }: { project: OngoingProject; index: number }) {
  const [cover] = project.pictures;
  return (
    <article
      aria-labelledby={`ongoing-${index}`}
      className="grid h-full gap-6 rounded-[2rem] border border-line bg-paper p-4 sm:grid-cols-2 sm:p-5"
    >
      <div className="relative">
        <ParallaxImage
          src={cover.src}
          alt={cover.alt}
          sizes="(min-width: 1024px) 34vw, (min-width: 640px) 60vw, 100vw"
          radius="1.5rem"
          className="aspect-[4/5] w-full"
        />
        <LiveChip className="absolute left-3 top-3" />
      </div>
      <Reveal className="flex flex-col justify-center px-2 pb-4 sm:px-0 sm:pb-0 sm:pr-4">
        <ProjectText project={project} headingId={`ongoing-${index}`} />
      </Reveal>
    </article>
  );
}

/** A site without photos yet: a charcoal card with the mark in the background. */
function PendingProject({ project, index }: { project: OngoingProject; index: number }) {
  return (
    <article
      aria-labelledby={`ongoing-${index}`}
      className="grain relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-ink p-8 md:p-10"
    >
      <LogoMark className="pointer-events-none absolute -right-10 -top-6 h-auto w-[70%] opacity-[0.08]" />
      <LiveChip className="absolute left-5 top-5" />
      <Reveal className="relative">
        <ProjectText project={project} tone="light" headingId={`ongoing-${index}`} />
      </Reveal>
    </article>
  );
}

/*
 * PROJECTS — the company's track record (count-up figures), the sites under
 * construction right now with real photographs, and the Saidapet legacy.
 */
export default function ProjectsSection({ standalone = false }: { standalone?: boolean }) {
  const [feature, ...others] = ONGOING;

  return (
    <section
      id="projects"
      aria-labelledby={standalone ? undefined : "projects-title"}
      aria-label={standalone ? "Our projects" : undefined}
      className={`scroll-mt-16 bg-surface ${standalone ? "pb-24 pt-4 md:pb-32" : "py-24 md:py-36"}`}
    >
      <div className="container-site">
        {/* On /projects the page hero carries the heading. */}
        {!standalone && (
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionLabel>{PROJECTS_INTRO.label}</SectionLabel>
              </Reveal>
              <SplitText id="projects-title" text={PROJECTS_INTRO.title} className="mt-7 font-display heading-xl text-ink" />
            </div>
            <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
              <p className="max-w-[34rem] text-lg leading-relaxed text-slate">{PROJECTS_INTRO.body}</p>
              <Button href="/projects" label="All projects" variant="outline" size="sm" className="mt-6" />
            </Reveal>
          </div>
        )}

        {/* Track record */}
        <dl
          className={`grid gap-px overflow-hidden rounded-[2rem] border border-line bg-line sm:grid-cols-3 ${standalone ? "" : "mt-14 md:mt-20"}`}
        >
          {TRACK_RECORD.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90} className="flex flex-col-reverse gap-3 bg-paper p-7 md:p-9">
              <dt className="eyebrow text-slate">{stat.label}</dt>
              <dd className="font-display text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.85] text-ink">
                <CountUp value={stat.value} />
                <span className="text-rose">{stat.suffix}</span>
              </dd>
            </Reveal>
          ))}
        </dl>

        {/* Live sites */}
        <h3 className="sr-only">Sites under construction now</h3>
        <div className="mt-16 md:mt-24">
          <FeatureProject project={feature} />
        </div>
        <ul className="mt-10 grid gap-6 lg:grid-cols-12">
          {others.map((project, i) =>
            project.pictures.length ? (
              <li key={project.location} className="lg:col-span-7">
                <PhotoProject project={project} index={i + 1} />
              </li>
            ) : (
              <li key={project.location} className="lg:col-span-5">
                <PendingProject project={project} index={i + 1} />
              </li>
            ),
          )}
        </ul>

        {/* Legacy */}
        <Reveal className="relative mt-16 overflow-hidden rounded-[2rem] bg-blush p-8 md:mt-24 md:p-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SplitText
                as="h3"
                text={TRACK_RECORD.legacy.title}
                accentClassName="text-ink"
                className="font-display text-[clamp(2rem,4.4vw,4rem)] leading-none text-ink"
              />
              <p className="mt-6 max-w-[38rem] text-lg leading-relaxed text-ink/80">{TRACK_RECORD.legacy.body}</p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 lg:justify-self-end">
              <Button href={CTA.primary.href} label={CTA.primary.label} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
