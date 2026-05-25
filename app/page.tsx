import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { LanguagesSection } from "@/components/landing/languages-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { CTASection } from "@/components/landing/cta-section";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <LanguagesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </main>
  );
}
