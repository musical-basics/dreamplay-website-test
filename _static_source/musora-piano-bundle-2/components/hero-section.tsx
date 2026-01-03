"use client"

import { ArrowRight, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center bg-neutral-900 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/elegant-hands-playing-modern-digital-piano-keyboar.jpg"
          alt="Playing DreamPlay One"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-2xl">
          {/* Title with slide-up animation */}
          <h1
            className={`text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.1] tracking-tight mb-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Finally, A Piano
            <br />
            That Fits
          </h1>

          <p
            className={`text-neutral-300 text-lg mb-8 max-w-lg transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Introducing the DreamPlay One. The world's first professional keyboard built to DS5.5 and DS6.0 standards
            for smaller hands.
          </p>

          {/* Pricing section */}
          <div
            className={`mb-8 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-neutral-400 text-sm mb-2">Pre-order today and lock in the founder's price</p>
            <div className="flex items-baseline gap-3">
              <span className="text-neutral-500 text-2xl line-through">$599</span>
              <span className="text-white text-5xl font-semibold">$499</span>
              <span className="text-white text-sm font-medium">Save $100</span>
            </div>
          </div>

          <Link
            href="#"
            className={`inline-flex items-center gap-3 bg-white text-neutral-900 rounded-full px-8 py-4 text-base font-medium hover:bg-neutral-100 transition-all duration-1000 delay-500 hover:scale-105 hover:shadow-xl ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Pre-Order Now
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
