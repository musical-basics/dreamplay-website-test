"use client"

import Link from "next/link"
import { ArrowRight, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function SpecialOfferHeader() {
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
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <img
                        src="/images/Logo.svg"
                        alt="DreamPlay Pianos"
                        className={`h-8 transition-all ${scrolled ? "" : "brightness-0 invert"}`}
                    />
                </Link>

                {/* Main navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {[
                        { label: "DreamPlay One", href: "/" },
                        { label: "How It Works", href: "/how-it-works" },
                        { label: "Our Story", href: "/our-story" },
                        { label: "FAQ", href: "/information-and-policies/faq" },
                    ].map((item, i) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`text-sm transition-colors ${scrolled
                                    ? i === 0
                                        ? "text-neutral-900 font-medium"
                                        : "text-neutral-700 hover:text-neutral-900"
                                    : i === 0
                                        ? "text-white font-medium"
                                        : "text-white/70 hover:text-white"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* CTA Button */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/checkout-pages/customize"
                        className={`hidden md:flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${scrolled
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
