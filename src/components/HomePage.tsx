import { LanguageProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import BridgeSection from "@/components/BridgeSection";
import WhatIsSection from "@/components/WhatIsSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";

interface HomePageProps {
  fontVar: string;
}

export default function HomePage({ fontVar }: HomePageProps) {
  return (
    <LanguageProvider>
      <div style={{ ["--font-heading" as string]: `var(${fontVar})` }}>
        <Navbar />
        <main>
          <Hero />
          <ProblemSection />
          <BridgeSection />
          <WhatIsSection />
          <CapabilitiesSection />
          <HowItWorksSection />
          <PricingSection />
          <FAQSection />
          <WaitlistForm />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
