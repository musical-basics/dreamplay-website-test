import { Header } from "@/components/holiday-sale/header"
import { CountdownTimer } from "@/components/holiday-sale/countdown-timer"
import { ProductHero } from "@/components/holiday-sale/product-hero"

import { BundleIncludes } from "@/components/holiday-sale/bundle-includes"
import { ValueProposition } from "@/components/holiday-sale/value-proposition"
import { BundleShowcase } from "@/components/holiday-sale/bundle-showcase"
import { UrgencySection } from "@/components/holiday-sale/urgency-section"
import { FinalCta } from "@/components/holiday-sale/final-cta"

export const metadata = {
    title: "MLK Holiday Sale | DreamPlay",
    description: "Limited time MLK Holiday Sale. Get the complete DreamPlay bundle.",
}

export default function MLKHolidaySalePage() {
    return (
        <main className="min-h-screen bg-neutral-950">
            <Header />
            <div className="w-full sticky top-0 z-0">
                <img
                    src="/images/mlk-hero.jpg"
                    alt="MLK Holiday Sale"
                    className="w-full h-auto object-cover"
                />
            </div>
            <div className="relative z-10 bg-neutral-950">
                <ProductHero />
                <CountdownTimer />

                <ValueProposition />
                <BundleShowcase />
                <BundleIncludes />
                <UrgencySection />
                <FinalCta />
            </div>
        </main>
    )
}
