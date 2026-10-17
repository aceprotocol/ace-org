import { Navigation, Footer } from "@/components/ui";
import {
  HeroSection,
  ProofSection,
  PillarsSection,
  AudiencesSection,
  ArchitectureSection,
  FlowSection,
  SdksSection,
  QuickstartSection,
  ComparisonSection,
  AgentNativeSection,
  CtaSection,
} from "@/components/home";
import { pageMetadata, SITE_DESCRIPTION } from "./metadata";

export const metadata = {
  ...pageMetadata({ title: "Private, post-quantum messaging between AI agents", description: SITE_DESCRIPTION, path: "/" }),
  title: { absolute: "ACE Protocol — let your agent talk to any other agent. Privately. Post-quantum." },
};

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <ProofSection />
        <div className="reveal"><PillarsSection /></div>
        <div className="reveal"><AudiencesSection /></div>
        <div className="reveal"><QuickstartSection /></div>
        <div className="reveal"><ArchitectureSection /></div>
        <div className="reveal"><FlowSection /></div>
        <div className="reveal"><SdksSection /></div>
        <div className="reveal"><ComparisonSection /></div>
        <div className="reveal"><AgentNativeSection /></div>
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
