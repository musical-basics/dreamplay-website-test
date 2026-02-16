import { Playfair_Display, Inter } from "next/font/google"
import { StepNav } from "@/components/premium-offer/step-nav"
import { StickyHeader } from "@/components/premium-offer/sticky-header"
import { CrowdfundingSection } from "@/components/premium-offer/crowdfunding-section"
import { StatsSection } from "@/components/premium-offer/stats-section"
import { HeroSection } from "@/components/premium-offer/hero-section"
import { SocialProofBar } from "@/components/premium-offer/social-proof-bar"
import { VideoSection } from "@/components/premium-offer/video-section"
import { FeaturesSection } from "@/components/premium-offer/features-section"
import { SizeFinderSection } from "@/components/premium-offer/size-finder-section"
import { SpecsSection } from "@/components/premium-offer/specs-section"
import { CreatorSection } from "@/components/premium-offer/creator-section"
import { TrustSection } from "@/components/premium-offer/trust-section"
import { PricingSection } from "@/components/premium-offer/pricing-section"
import { GuaranteeSection } from "@/components/premium-offer/guarantee-section"

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
})
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
})

export const metadata = {
    title: "DreamPlay One - Piano Keyboard for Every Hand",
    description:
        "DreamPlay One is designed with narrower keys so you can play freely, naturally, and without strain.",
}

export default function PremiumOfferPage() {
    return (
        <div className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
            <StepNav />
            <StickyHeader />
            <main>
                <section id="hero">
                    <CrowdfundingSection />
                    <StatsSection />
                    <HeroSection />
                    <SocialProofBar />
                    <VideoSection />
                </section>
                <FeaturesSection />
                <section className="relative min-h-screen overflow-hidden">
                    <img
                        src="/images/Hero-Image-Final-Version.jpg"
                        alt="Hand in black suit playing piano keys"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </section>
                <SizeFinderSection />
                <SpecsSection />
                <CreatorSection />
                <TrustSection />
                <PricingSection />
                <GuaranteeSection />
            </main>
        </div>
    )
}
