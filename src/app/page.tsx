import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import WhatIsSection from "@/components/WhatIsSection";
import PricingSection from "@/components/PricingSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <WhatIsSection />
        <PricingSection />
        <CapabilitiesSection />
        <WaitlistForm />
      </main>
      <Footer />
    </>
  );
}
