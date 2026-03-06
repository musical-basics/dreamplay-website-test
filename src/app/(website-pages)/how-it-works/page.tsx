"use client"

import { SpecialOfferHeader } from "@/components/special-offer/header"
import Footer from "@/components/Footer"
import TestimonialsSection from "@/components/checkout/TestimonialsSection"
import { HowItWorksHero } from "@/components/how-it-works/hero-section"
import { CalculatorSection } from "@/components/how-it-works/calculator-section"
import { HiddenBarrierSection } from "@/components/how-it-works/hidden-barrier-section"
import { ScienceSection } from "@/components/how-it-works/science-section"
import { ResearchSection } from "@/components/how-it-works/research-section"
import { CtaSection } from "@/components/how-it-works/cta-section"

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen selection:bg-white/20">
            <SpecialOfferHeader forceOpaque={true} darkMode={true} className="border-b border-white/10 bg-[#050505] backdrop-blur-md" />

            <main className="flex flex-col items-center">
                {/* Hero */}
                <HowItWorksHero />

                {/* The Hidden Barrier — full-width animated donut charts */}
                <HiddenBarrierSection />

                {/* Testimonials */}
                <TestimonialsSection />

                {/* Hand Span Calculator */}
                <CalculatorSection />

                {/* The Science — biomechanics */}
                <ScienceSection />

                {/* Published Research */}
                <ResearchSection />

                {/* CTA */}
                <CtaSection />
            </main>

            <Footer />
        </div>
    )
}
