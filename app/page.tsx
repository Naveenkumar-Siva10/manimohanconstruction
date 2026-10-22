import HeroSection from "@/components/HeroSection";
import MarqueeBand from "@/components/MarqueeBand";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import GoalsSection from "@/components/GoalsSection";
import VisionSection from "@/components/VisionSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <main id="main" tabIndex={-1} className="outline-none">
        <HeroSection />
        <MarqueeBand />
        <AboutSection />
        <ServicesSection />
        <GoalsSection />
        <VisionSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
