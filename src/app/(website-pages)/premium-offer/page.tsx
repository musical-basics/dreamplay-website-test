import { Playfair_Display, Inter } from "next/font/google"
import { SpecialOfferHeader } from "@/components/special-offer/header"
import { CrowdfundingSection } from "@/components/premium-offer/crowdfunding-section"
import { SocialProofBar } from "@/components/premium-offer/social-proof-bar"
import { InlineBuyersGuide } from "@/components/premium-offer/audience-fork-section"
import { ChildHeroSection } from "@/components/premium-offer/child-hero-section"
import { TradeInSection } from "@/components/premium-offer/trade-in-section"
import { TradeInFaqSection } from "@/components/premium-offer/trade-in-faq-section"
import { HandComparisonSection } from "@/components/premium-offer/hand-comparison-section"
import { VideoHero3 } from "@/components/premium-offer/video-hero-3"
import { SizeFinderSection } from "@/components/premium-offer/size-finder-section"
import { VideoSection } from "@/components/premium-offer/video-section"
import { FeaturesSection } from "@/components/premium-offer/features-section"
import { VideoHero4 } from "@/components/premium-offer/video-hero-4"
import { SizeVisualSection } from "@/components/premium-offer/size-visual-section"
import { SpecsSection } from "@/components/premium-offer/specs-section"
import { StanfordQuoteSection } from "@/components/premium-offer/stanford-quote-section"
import { CreatorSection } from "@/components/premium-offer/creator-section"
import { TrustSection } from "@/components/premium-offer/trust-section"
import { PricingSection } from "@/components/premium-offer/pricing-section"
import { GuaranteeSection } from "@/components/premium-offer/guarantee-section"
import Footer from "@/components/Footer"
import { getHiddenProducts } from "@/actions/admin-actions"

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

export default async function PremiumOfferPage() {
    const hiddenProducts = await getHiddenProducts()
    return (
        <div className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
            <SpecialOfferHeader />
            <main>
                {/* ⚡ APPROACH — Hook in 3 seconds */}
                <CrowdfundingSection />
                {/* All sections below scroll OVER the sticky hero — each sticks and stacks */}
                <div className="relative z-10">
                    <div className="sticky top-0 z-[11]"><SocialProofBar /></div>

                    {/* Section 2 — Buyer's Guide (regular scroll) */}
                    <div className="relative z-[12] min-h-screen flex flex-col justify-center bg-neutral-100">
                        <InlineBuyersGuide />
                    </div>

                    {/* Section 3 — Child Hero / Video Hero 2 (regular scroll) */}
                    <div className="relative z-[13] min-h-screen md:min-h-0 md:aspect-video">
                        <ChildHeroSection />
                    </div>

                    {/* Section 4 — Trade-In Upgrade */}
                    <div className="sticky top-0 z-[14] bg-neutral-100">
                        <TradeInSection />
                    </div>

                    {/* Section 5 — Trade-In FAQ */}
                    <div className="sticky top-0 z-[15] bg-neutral-50">
                        <TradeInFaqSection />
                    </div>

                    {/* Section 6 — Video Hero 3 */}
                    <div className="sticky top-0 z-[16]">
                        <VideoHero3 />
                    </div>

                    {/* Section 7 — Hand Comparison */}
                    <div className="sticky top-0 z-[17] min-h-screen md:min-h-0 md:aspect-video flex flex-col justify-center bg-white">
                        <HandComparisonSection />
                    </div>

                    {/* Section 8 — Size Finder */}
                    <div className="sticky top-0 z-[18] min-h-screen md:min-h-0 md:aspect-video flex flex-col justify-center bg-white">
                        <SizeFinderSection />
                    </div>

                    {/* Section 9 — Specs (accordion overlays Features/VH4 below) */}
                    <div className="sticky top-0 z-[21]">
                        <SpecsSection />
                    </div>

                    {/* Section 10 — Features */}
                    <div className="sticky top-0 z-[20]">
                        <FeaturesSection />
                    </div>

                    {/* Section 11 — Video Hero 4 */}
                    <div className="sticky top-0 z-[19]">
                        <VideoHero4 />
                    </div>

                    {/* Section 12 — Size Visual */}
                    <div className="sticky top-0 z-[22] bg-[#f5f5f0]">
                        <SizeVisualSection />
                    </div>

                    {/* Section 13 — Stanford Quote */}
                    <div className="sticky top-0 z-[23] bg-foreground">
                        <StanfordQuoteSection />
                    </div>

                    {/* Section 14 — Trust (Built to Last) */}
                    <div className="sticky top-0 z-[24] bg-background">
                        <TrustSection />
                    </div>

                    {/* Section 15 — Creator */}
                    <div className="sticky top-0 z-[25] bg-foreground">
                        <CreatorSection />
                    </div>

                    {/* Section 16 — Video */}
                    <div className="sticky top-0 z-[26] min-h-screen md:min-h-0 md:aspect-video bg-neutral-200">
                        <section id="video"><VideoSection /></section>
                    </div>

                    {/* Section 17 — Pricing */}
                    <div className="sticky top-0 z-[27] bg-foreground">
                        <PricingSection hiddenProducts={hiddenProducts} />
                    </div>

                    {/* Section 18 — Guarantee */}
                    <div className="sticky top-0 z-[28] bg-white">
                        <GuaranteeSection />
                    </div>
                </div>
            </main>

            {/* 🔄 EXTEND */}
            <Footer />
        </div>
    )
}
