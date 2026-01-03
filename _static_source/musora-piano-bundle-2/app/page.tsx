"use client"

import { HeroSection } from "@/components/hero-section"
import { CountdownTimer } from "@/components/countdown-timer"
import { FeaturesPianoSection } from "@/components/features-piano-section"
import { FeaturesGridSection } from "@/components/features-grid-section"
import { LessonsSection } from "@/components/lessons-section"
import { FindYourFitSection } from "@/components/find-your-fit-section"
import { GuaranteeSection } from "@/components/guarantee-section"
import { CTASection } from "@/components/cta-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VideoSection1 } from "@/components/video-section-1"
import { VideoSection2 } from "@/components/video-section-2"

export default function Home() {
  return (
    <main className="relative">
      <Header />

      {/* Card-stacking parallax sections */}
      <div className="relative">
        {/* Section 1: Hero - STICKY */}
        <div className="sticky top-0 z-10 min-h-screen" id="hero">
          <HeroSection />
        </div>

        <div className="relative z-[12] bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
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

        {/* Section 5: Lessons (Woman with piano) - STICKY */}
        <div className="sticky top-0 z-40 min-h-screen shadow-[0_-20px_50px_rgba(0,0,0,0.15)]" id="lessons">
          <LessonsSection />
        </div>

        {/* Section 6: Find Your Fit - SCROLL (normal flow) */}
        <div className="relative z-50 bg-neutral-950 shadow-[0_-10px_40px_rgba(0,0,0,0.4)]" id="find-your-fit">
          <FindYourFitSection />
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
          <Footer />
        </div>
      </div>
    </main>
  )
}
