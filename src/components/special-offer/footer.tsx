import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function SpecialOfferFooter() {
    return (
        <footer className="bg-black text-white py-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/images/Logo.svg" alt="DreamPlay Pianos" className="h-8 brightness-0 invert" />
                    </Link>

                    {/* Navigation */}
                    <nav className="flex flex-wrap items-center justify-center gap-8">
                        <Link href="/" className="text-neutral-400 text-sm hover:text-white transition-colors">
                            DreamPlay One
                        </Link>
                        <Link href="/how-it-works" className="text-neutral-400 text-sm hover:text-white transition-colors">
                            How It Works
                        </Link>
                        <Link href="/why-narrow" className="text-neutral-400 text-sm hover:text-white transition-colors">
                            Why Narrow?
                        </Link>
                        <Link href="/our-story" className="text-neutral-400 text-sm hover:text-white transition-colors">
                            Our Story
                        </Link>
                        <Link href="/information-and-policies/faq" className="text-neutral-400 text-sm hover:text-white transition-colors">
                            FAQ
                        </Link>
                    </nav>

                    <Link
                        href="/customize"
                        className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                        Configure Yours
                        <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <ArrowRight className="w-3 h-3 text-black" />
                        </span>
                    </Link>
                </div>

                <div className="border-t border-neutral-800 mt-8 pt-8 text-center">
                    <p className="text-neutral-600 text-xs">© 2026 DreamPlay Pianos. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
