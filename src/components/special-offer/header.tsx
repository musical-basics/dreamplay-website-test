"use client"

import Link from "next/link"
import { ArrowRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useABAnalytics } from "@/hooks/use-ab-analytics"
import { cn } from "@/lib/utils"

interface SpecialOfferHeaderProps {
    forceOpaque?: boolean;
    darkMode?: boolean;
    className?: string;
}

export function SpecialOfferHeader({ forceOpaque = false, darkMode = false, className = "" }: SpecialOfferHeaderProps) {
    const { trackClick } = useABAnalytics("special_offer_variant", { trackTime: false })
    const [scrolled, setScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const isScrolled = forceOpaque || scrolled || isMobileMenuOpen;
    const useDarkText = isScrolled && !darkMode;

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 flex flex-col",
                className
            )}
        >
            {/* Global Announcement Bar */}
            {(() => {
                const endDate = new Date("2026-03-02T23:59:59");
                const now = new Date();
                const daysLeft = Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
                return (
                    <Link
                        href="/customize"
                        className="bg-[#050505] border-b border-white/10 py-2.5 text-center flex items-center justify-center w-full z-50 text-[10px] sm:text-xs text-white/80 uppercase tracking-[0.2em] font-sans font-medium hover:text-white transition-colors"
                    >
                        Founder&apos;s Price Ends in {daysLeft} Days. Retail MSRP ($1,199) Takes Effect Soon.
                    </Link>
                );
            })()}
            <div className={cn(
                "w-full transition-all duration-300",
                darkMode
                    ? "bg-[#050505]/95 backdrop-blur-md"
                    : isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
            )}>
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <img
                            src={useDarkText ? "/images/Logo.svg" : "/images/DreamPlay Logo White.png"}
                            alt="DreamPlay Pianos"
                            className={`h-8 transition-all ${useDarkText ? "brightness-0" : ""}`}
                        />
                    </Link>

                    {/* Main navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {[
                            { label: "DreamPlay One", href: "/" },
                            { label: "Why Narrow?", href: "/why-narrow" },
                            { label: "How It Works", href: "/how-it-works" },
                            { label: "Our Story", href: "/our-story" },
                            { label: "DS Standard", href: "/about-us/ds-standard" },
                            { label: "FAQ", href: "/information-and-policies/faq" },
                            { label: "Shipping", href: "/information-and-policies/shipping" },
                            { label: "Blog", href: "https://blog.dreamplaypianos.com/blog" },
                        ].map((item, i) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`text-sm transition-colors ${useDarkText
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
                            onClick={() => trackClick("header", "start_customization")}
                            href="/customize"
                            className={`hidden md:flex items-center gap-2 rounded-none px-5 py-2.5 text-sm font-medium transition-all duration-300 ${useDarkText
                                ? "bg-black border border-black text-white hover:bg-neutral-800"
                                : "bg-white/5 backdrop-blur-sm border border-white/30 text-white hover:bg-white/15"
                                }`}
                        >
                            Configure Yours
                            <span
                                className="w-6 h-6 rounded-none flex items-center justify-center bg-white"
                            >
                                <ArrowRight className="w-3 h-3 text-black" />
                            </span>
                        </Link>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`md:hidden ${useDarkText ? "text-neutral-900" : "text-white"}`}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-[100px] left-0 right-0 bg-white border-b border-gray-100 shadow-xl animate-in slide-in-from-top-2 duration-200">
                    <nav className="flex flex-col p-4">
                        {[
                            { label: "DreamPlay One", href: "/" },
                            { label: "Why Narrow?", href: "/why-narrow" },
                            { label: "How It Works", href: "/how-it-works" },
                            { label: "Our Story", href: "/our-story" },
                            { label: "DS Standard", href: "/about-us/ds-standard" },
                            { label: "FAQ", href: "/information-and-policies/faq" },
                            { label: "Shipping", href: "/information-and-policies/shipping" },
                            { label: "Blog", href: "https://blog.dreamplaypianos.com/blog" },
                        ].map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="py-3 text-neutral-600 hover:text-black font-medium border-b border-gray-50 last:border-0"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/customize"
                            className="mt-4 flex items-center justify-center gap-2 w-full bg-black text-white rounded-none py-3 font-medium"
                            onClick={() => {
                                trackClick("header", "start_customization_mobile")
                                setIsMobileMenuOpen(false)
                            }}
                        >
                            Configure Yours
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    )
}
