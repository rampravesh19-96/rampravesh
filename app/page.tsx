import { ContactCTA } from "@/components/contact-cta";
import { ExperienceSection } from "@/components/experience-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { LayoutShell } from "@/components/layout-shell";
import { Navbar } from "@/components/navbar";
import { ProjectShowcaseSection } from "@/components/project-showcase-section";
import { ProofStrip } from "@/components/proof-strip";
import { StrengthsSection } from "@/components/strengths-section";
import { TechStackSection } from "@/components/tech-stack-section";

export default function Home() {
  return (
    <LayoutShell>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <HeroSection />
        <ProofStrip />
        <ProjectShowcaseSection />
        <StrengthsSection />
        <TechStackSection />
        <ExperienceSection />
        <ContactCTA />
      </main>
      <Footer />
    </LayoutShell>
  );
}
