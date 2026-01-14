import { Header } from "@/components/header"
import { CountdownTimer } from "@/components/countdown-timer"
import { ProductHero } from "@/components/product-hero"
import { FlashSale } from "@/components/flash-sale"
import { BundleIncludes } from "@/components/bundle-includes"
import { ValueProposition } from "@/components/value-proposition"
import { BundleShowcase } from "@/components/bundle-showcase"
import { UrgencySection } from "@/components/urgency-section"
import { FinalCta } from "@/components/final-cta"

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <div className="h-screen flex flex-col">
        <Header />
        <ProductHero />
        <CountdownTimer />
      </div>
      <FlashSale />
      <ValueProposition />
      <BundleShowcase />
      <BundleIncludes />
      <UrgencySection />
      <FinalCta />
    </main>
  )
}
