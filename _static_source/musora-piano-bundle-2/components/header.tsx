"use client"

import Link from "next/link"
import { ArrowRight, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
            <circle cx="12" cy="20" r="10" fill={scrolled ? "black" : "white"} />
            <circle cx="28" cy="20" r="10" fill={scrolled ? "black" : "white"} />
          </svg>
          <span
            className={`font-semibold text-lg tracking-tight transition-colors ${scrolled ? "text-neutral-900" : "text-white"}`}
          >
            Dream<span>Play</span>
          </span>
          <span
            className={`text-[10px] -ml-1 mt-2 transition-colors ${scrolled ? "text-neutral-400" : "text-white/60"}`}
          >
            PIANOS
          </span>
        </Link>

        {/* Main navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {["DreamPlay One", "Testimonials", "How It Works", "Our Story", "FAQ"].map((item, i) => (
            <Link
              key={item}
              href="#"
              className={`text-sm transition-colors ${
                scrolled
                  ? i === 0
                    ? "text-neutral-900 font-medium"
                    : "text-neutral-700 hover:text-neutral-900"
                  : i === 0
                    ? "text-white font-medium"
                    : "text-white/70 hover:text-white"
              }`}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className={`hidden md:flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
              scrolled
                ? "bg-white border border-neutral-200 text-neutral-900 hover:border-neutral-400"
                : "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
            }`}
          >
            Pre-Order Now
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center ${scrolled ? "bg-black" : "bg-white"}`}
            >
              <ArrowRight className={`w-3 h-3 ${scrolled ? "text-white" : "text-black"}`} />
            </span>
          </Link>
          <Button variant="ghost" size="icon" className={`md:hidden ${scrolled ? "text-neutral-900" : "text-white"}`}>
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
