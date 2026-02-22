import Image from "next/image"
import { Playfair_Display, Inter } from "next/font/google"
import { SpecialOfferHeader } from "@/components/special-offer/header"
import { CrowdfundingSection } from "@/components/premium-offer/crowdfunding-section"
import { StatsSection } from "@/components/premium-offer/stats-section"
import { HeroSection } from "@/components/premium-offer/hero-section"
import { SocialProofBar } from "@/components/premium-offer/social-proof-bar"
import { VideoSection } from "@/components/premium-offer/video-section"
import { FeaturesSection } from "@/components/premium-offer/features-section"
import { SizeFinderSection } from "@/components/premium-offer/size-finder-section"
import { SizeVisualSection } from "@/components/premium-offer/size-visual-section"
import { SpecsSection } from "@/components/premium-offer/specs-section"
import { CreatorSection } from "@/components/premium-offer/creator-section"
import { TrustSection } from "@/components/premium-offer/trust-section"
import { PricingSection } from "@/components/premium-offer/pricing-section"
import { StanfordQuoteSection } from "@/components/premium-offer/stanford-quote-section"
import { GuaranteeSection } from "@/components/premium-offer/guarantee-section"
import { HeroImageSection } from "@/components/premium-offer/hero-image-section"
import Footer from "@/components/Footer"

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
                <StanfordQuoteSection />

                {/* Biomechanical Impact Image */}
                <section className="relative overflow-hidden bg-foreground">
                    <div className="mx-auto max-w-4xl px-6 pb-16 md:pb-24">
                        <Image
                            src="/images/Biomechanical Impact.jpeg"
                            alt="Biomechanical Impact of Key Width on Small Hands — comparing strain on standard vs. alternative sized keyboards"
                            width={1200}
                            height={900}
                            className="w-full h-auto"
                        />
                    </div>
                </section>

                <HeroImageSection />
                <SizeFinderSection />
                <SizeVisualSection />
                <SpecsSection />
                <CreatorSection />
                <TrustSection />
                <PricingSection />
                <GuaranteeSection />
            </main>
            <Footer />
        </div>
    )
}
