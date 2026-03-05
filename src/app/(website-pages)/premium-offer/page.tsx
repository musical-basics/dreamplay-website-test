import { Playfair_Display, Inter } from "next/font/google"
import { SpecialOfferHeader } from "@/components/special-offer/header"
import { CrowdfundingSection } from "@/components/premium-offer/crowdfunding-section"
import { SocialProofBar } from "@/components/premium-offer/social-proof-bar"
import { InlineBuyersGuide } from "@/components/premium-offer/audience-fork-section"
import { ChildHeroSection } from "@/components/premium-offer/child-hero-section"
import { HandComparisonSection } from "@/components/premium-offer/hand-comparison-section"
import { SizeFinderSection } from "@/components/premium-offer/size-finder-section"
import { VideoSection } from "@/components/premium-offer/video-section"
import { FeaturesSection } from "@/components/premium-offer/features-section"
import { SizeVisualSection } from "@/components/premium-offer/size-visual-section"
import { SpecsSection } from "@/components/premium-offer/specs-section"
import { StanfordQuoteSection } from "@/components/premium-offer/stanford-quote-section"
import { SwitchingSection } from "@/components/premium-offer/switching-section"
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

                    {/* 🎯 PROBE — Make it personal */}
                    <div className="sticky top-0 z-[12]"><InlineBuyersGuide /></div>
                    <div className="sticky top-0 z-[13]"><ChildHeroSection /></div>
                    <div className="sticky top-0 z-[14]"><HandComparisonSection /></div>
                    <div className="sticky top-0 z-[15]"><SizeFinderSection /></div>

                    {/* 📦 PRESENT — Show the product */}
                    <div className="sticky top-0 z-[16]">
                        <section id="video"><VideoSection /></section>
                    </div>
                    <div className="sticky top-0 z-[17]"><FeaturesSection /></div>
                    <div className="sticky top-0 z-[18]"><SizeVisualSection /></div>
                    <div className="sticky top-0 z-[19]"><SpecsSection /></div>

                    {/* 🔬 LEVERAGE — Build credibility */}
                    <div className="sticky top-0 z-[20]"><StanfordQuoteSection /></div>
                    <div className="sticky top-0 z-[21]"><SwitchingSection /></div>
                    <div className="sticky top-0 z-[22]"><CreatorSection /></div>
                    <div className="sticky top-0 z-[23]"><TrustSection /></div>

                    {/* 🔒 LOCKIN — Remove all risk */}
                    <div className="sticky top-0 z-[24]"><PricingSection hiddenProducts={hiddenProducts} /></div>
                    <div className="sticky top-0 z-[25]"><GuaranteeSection /></div>
                </div>
            </main>

            {/* 🔄 EXTEND */}
            <Footer />
        </div>
    )
}
