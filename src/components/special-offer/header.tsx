"use client"

import Link from "next/link"
import { ArrowRight, Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useABAnalytics } from "@/hooks/use-ab-analytics"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { RegisterModal } from "../RegisterModal"

interface SpecialOfferHeaderProps {
    forceOpaque?: boolean;
    darkMode?: boolean;
    className?: string;
}

export function SpecialOfferHeader({ forceOpaque = false, darkMode = false, className = "" }: SpecialOfferHeaderProps) {
    const { trackClick } = useABAnalytics("special_offer_variant", { trackTime: false })
    const [scrolled, setScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [isRegisterOpen, setIsRegisterOpen] = useState(false)

    useEffect(() => {
        const supabase = createClient()
        supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null))
        return () => subscription.unsubscribe()
    }, [])

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
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 flex flex-col",
                    className
                )}
            >
                {/* Global Announcement Bar */}
                <Link
                    href="/customize"
                    className="bg-[#050505] border-b border-white/10 py-2.5 text-center flex items-center justify-center w-full z-50 text-[10px] sm:text-xs text-white/80 uppercase tracking-[0.2em] font-sans font-medium hover:text-white transition-colors"
                >
                    Founder&apos;s Batch Closing. Retail MSRP ($1,199) Takes Effect Soon.
                </Link>
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
                                { label: "How It Works", href: "/how-it-works" },
                                { label: "The Benefits", href: "/better-practice" },
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

                        {/* CTA + Auth */}
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
                                <span className="w-6 h-6 rounded-none flex items-center justify-center bg-white">
                                    <ArrowRight className="w-3 h-3 text-black" />
                                </span>
                            </Link>

                            {user ? (
                                <Link href="/vip" className={`hidden md:flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${useDarkText ? "text-neutral-500 hover:text-black" : "text-white/50 hover:text-white"}`}>
                                    <User className="w-3.5 h-3.5" /> Account
                                </Link>
                            ) : (
                                <div className={`hidden md:flex items-center gap-0 text-[10px] uppercase tracking-[0.15em] font-medium ${useDarkText ? "text-neutral-500" : "text-white/50"}`}>
                                    <button onClick={() => setIsRegisterOpen(true)} className={`uppercase transition-colors cursor-pointer ${useDarkText ? "hover:text-black" : "hover:text-white"}`}>
                                        Register
                                    </button>
                                    <span className="mx-1.5 opacity-30">|</span>
                                    <Link href="/login" className={`transition-colors ${useDarkText ? "hover:text-black" : "hover:text-white"}`}>
                                        Login
                                    </Link>
                                </div>
                            )}

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
                {
                    isMobileMenuOpen && (
                        <div className="md:hidden absolute top-[100px] left-0 right-0 bg-white border-b border-gray-100 shadow-xl animate-in slide-in-from-top-2 duration-200">
                            <nav className="flex flex-col p-4">
                                {[
                                    { label: "DreamPlay One", href: "/" },
                                    { label: "How It Works", href: "/how-it-works" },
                                    { label: "The Benefits", href: "/better-practice" },
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

                                {!user && (
                                    <div className="py-2 flex items-center gap-3 border-t border-gray-100">
                                        <button
                                            onClick={() => { setIsRegisterOpen(true); setIsMobileMenuOpen(false); }}
                                            className="py-3 text-sm font-medium text-neutral-600 hover:text-black cursor-pointer"
                                        >
                                            Register
                                        </button>
                                        <span className="text-neutral-300">|</span>
                                        <Link
                                            href="/login"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="py-3 text-sm font-medium text-neutral-600 hover:text-black"
                                        >
                                            Login
                                        </Link>
                                    </div>
                                )}
                                {user && (
                                    <Link
                                        href="/vip"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="py-3 text-sm font-bold text-neutral-600 hover:text-black flex items-center gap-2"
                                    >
                                        <User className="w-4 h-4" /> My Account
                                    </Link>
                                )}
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
                    )
                }
            </header>

            <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
        </>
    )
}
