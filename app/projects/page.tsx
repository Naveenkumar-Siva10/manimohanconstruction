import type { Metadata } from "next";
import CtaBand from "@/components/page/CtaBand";
import PageHero from "@/components/page/PageHero";
import ProjectsSection from "@/components/ProjectsSection";
import { ONGOING, PROJECTS_INTRO } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Buildings Mani Mohan Construction is building right now in Thoraipakkam, Saidapet and Kundrathur — and a track record of 100+ buildings over 27+ years in Chennai.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero
        crumbs={[{ href: "/projects", label: "Projects" }]}
        label="Our Work"
        title={PROJECTS_INTRO.title}
        intro={PROJECTS_INTRO.body}
        image={ONGOING[0].pictures[1]}
      />
      <ProjectsSection standalone />
      <CtaBand spaced title="Want your building on this *page*?" />
    </main>
  );
}
