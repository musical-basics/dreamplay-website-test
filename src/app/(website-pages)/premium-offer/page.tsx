import { Playfair_Display, Inter } from "next/font/google"
import { SpecialOfferHeader } from "@/components/special-offer/header"
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
import { HeroImageSection } from "@/components/premium-offer/hero-image-section"

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
            <SpecialOfferHeader />
            <main>
                <section id="hero">
                    <CrowdfundingSection />
                    <StatsSection />
                    <HeroSection />
                    <SocialProofBar />
                    <VideoSection />
                </section>
                <FeaturesSection />
                <HeroImageSection />
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
