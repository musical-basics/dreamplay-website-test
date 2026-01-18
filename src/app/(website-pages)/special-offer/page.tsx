"use client"

import Link from "next/link"
import { HeroSection } from "@/components/special-offer/hero-section"
import { CountdownTimer } from "@/components/special-offer/countdown-timer"
import { FeaturesPianoSection } from "@/components/special-offer/features-piano-section"
import { FeaturesGridSection } from "@/components/special-offer/features-grid-section"
import { LessonsSection } from "@/components/special-offer/lessons-section"
import { FindYourFitSection } from "@/components/special-offer/find-your-fit-section"
import { GuaranteeSection } from "@/components/special-offer/guarantee-section"
import { CTASection } from "@/components/special-offer/cta-section"
import { SpecialOfferHeader } from "@/components/special-offer/header"
import { SpecialOfferFooter } from "@/components/special-offer/footer"
import { useABAnalytics } from "@/hooks/use-ab-analytics"
import { VideoSection1 } from "@/components/special-offer/video-section-1"
import { VideoSection2 } from "@/components/special-offer/video-section-2"

export default function SpecialOfferPage() {
    useABAnalytics("special_offer_variant")
    return (
        <main className="relative">
            <style jsx global>{`
                html, body {
                    overflow-x: visible !important;
                    overflow: visible !important;
                }
            `}</style>

            {/* MLK Banner - Sticky Parallax */}
            {/* MLK Banner - Sticky Parallax */}
            <div className="w-full bg-black sticky top-0 z-0 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[50px] after:bg-gradient-to-b after:from-transparent after:to-neutral-900 after:pointer-events-none after:content-['']">
                <Link href="/mlk-holiday-sale">
                    {/* Desktop Banner */}
                    <img
                        src="/images/holiday-sale-banner.jpg"
                        alt="MLK Holiday Sale"
                        className="hidden md:block w-full h-auto object-cover mx-auto hover:opacity-95 transition-opacity"
                    />
                    {/* Mobile Banner */}
                    <img
                        src="/images/mlk-banner-mobile.png"
                        alt="MLK Holiday Sale"
                        className="block md:hidden w-full h-auto object-cover mx-auto hover:opacity-95 transition-opacity"
                    />
                </Link>
            </div>

            <SpecialOfferHeader className="sticky top-0 mb-[-4rem] z-[100]" />

            {/* Card-stacking parallax sections */}
            <div className="relative">
                {/* Section 1: Hero - STICKY */}
                <div className="sticky top-0 z-10 min-h-screen" id="hero">
                    <HeroSection />
                </div>

                {/* Section: Lessons (Woman with piano) - STICKY */}
                <div className="sticky top-0 z-[11] min-h-screen shadow-[0_-20px_50px_rgba(0,0,0,0.15)]" id="lessons">
                    <LessonsSection />
                </div>

                {/* Section: Find Your Fit - STICKY */}
                <div className="sticky top-0 z-[12] min-h-screen bg-neutral-950 shadow-[0_-10px_40px_rgba(0,0,0,0.4)]" id="find-your-fit">
                    <FindYourFitSection />
                </div>

                <div className="relative z-[13] bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
                    <CountdownTimer />
                </div>

                <div className="sticky top-0 z-[15] min-h-screen shadow-[0_-20px_50px_rgba(0,0,0,0.3)]" id="video-1">
                    <VideoSection1 />
                </div>

                {/* Section 2: Features Grid - STICKY */}
                <div className="sticky top-0 z-20 min-h-screen shadow-[0_-10px_30px_rgba(0,0,0,0.1)]" id="features-grid">
                    <FeaturesGridSection />
                </div>

                {/* Section 3: Video Section 2 - STICKY */}
                <div className="sticky top-0 z-[25] min-h-screen shadow-[0_-20px_50px_rgba(0,0,0,0.3)]" id="video-2">
                    <VideoSection2 />
                </div>

                {/* Section 4: Features Piano - STICKY */}
                <div className="sticky top-0 z-30 min-h-screen shadow-[0_-10px_30px_rgba(0,0,0,0.1)]" id="features-piano">
                    <FeaturesPianoSection />
                </div>





                {/* Section 7: Guarantee - STICKY */}
                <div className="sticky top-0 z-[60] min-h-screen shadow-[0_-20px_50px_rgba(0,0,0,0.15)]" id="guarantee">
                    <GuaranteeSection />
                </div>

                {/* Section 8: CTA - STICKY */}
                <div className="sticky top-0 z-[70] min-h-screen shadow-[0_-20px_50px_rgba(0,0,0,0.3)]" id="cta">
                    <CTASection />
                </div>

                {/* Footer - normal flow at the end */}
                <div className="relative z-[80]">
                    <SpecialOfferFooter />
                </div>
            </div>
        </main>
    )
}
