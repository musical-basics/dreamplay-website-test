"use client"

import { ArrowRight, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { useABAnalytics } from "@/hooks/use-ab-analytics"

export function HeroSection() {
    const { trackClick } = useABAnalytics("special_offer_variant", { trackTime: false })
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <section ref={sectionRef} className="relative h-screen flex items-center bg-neutral-900 overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src="/images/special-offer/elegant-hands-playing-modern-digital-piano-keyboar.jpg"
                    alt="Playing DreamPlay One"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-transparent" />
            </div>

            <div className="relative container mx-auto px-4 py-20">
                <div className="max-w-2xl">
                    {/* Title with slide-up animation */}
                    <h1
                        className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-white transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                            }`}
                    >
                        Standard Piano Keys Are Too Wide
                    </h1>

                    <p
                        className={`text-xl md:text-2xl text-neutral-300 max-w-2xl mb-12 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                            }`}
                    >
                        Stop over-stretching. The DreamPlay One offers narrower keys designed for your handspan.
                    </p>

                    <Link
                        onClick={() => trackClick("hero_section", "join_waitlist")}
                        href="https://crowdfund.dreamplaypianos.com"
                        className={`inline-flex items-center gap-3 bg-white text-neutral-900 rounded-full px-8 py-4 text-base font-medium hover:bg-neutral-100 transition-all duration-1000 delay-300 hover:scale-105 hover:shadow-xl ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                            }`}
                    >
                        Back This Project
                        <span className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                            <ArrowRight className="w-4 h-4 text-white" />
                        </span>
                    </Link>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/60">
                <span className="text-xs uppercase tracking-wider mb-2">Scroll</span>
                <ChevronDown className="w-5 h-5 animate-bounce" />
            </div>
        </section>
    )
}
