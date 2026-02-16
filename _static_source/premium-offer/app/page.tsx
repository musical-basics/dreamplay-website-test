import { StepNav } from "@/components/step-nav"
import { StickyHeader } from "@/components/sticky-header"
import { CrowdfundingSection } from "@/components/crowdfunding-section"
import { StatsSection } from "@/components/stats-section"
import { HeroSection } from "@/components/hero-section"
import { SocialProofBar } from "@/components/social-proof-bar"
import { VideoSection } from "@/components/video-section"
import { FeaturesSection } from "@/components/features-section"
import { SizeFinderSection } from "@/components/size-finder-section"
import { SpecsSection } from "@/components/specs-section"
import { CreatorSection } from "@/components/creator-section"
import { TrustSection } from "@/components/trust-section"
import { PricingSection } from "@/components/pricing-section"
import { GuaranteeSection } from "@/components/guarantee-section"

export default function Page() {
  return (
    <>
      <StepNav />
      <StickyHeader />
      <main>
        <section id="hero">
          <CrowdfundingSection />
          <StatsSection />
          <HeroSection />
        </section>
        <SocialProofBar />
        <VideoSection />
        <FeaturesSection />
        <SizeFinderSection />
        <SpecsSection />
        <CreatorSection />
        <TrustSection />
        <PricingSection />
        <GuaranteeSection />
      </main>
    </>
  )
}
