import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
              <circle cx="12" cy="20" r="10" fill="white" />
              <circle cx="28" cy="20" r="10" fill="white" />
            </svg>
            <span className="font-semibold text-lg tracking-tight">
              Dream<span className="text-white">Play</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-8">
            <Link href="#" className="text-neutral-400 text-sm hover:text-white transition-colors">
              DreamPlay One
            </Link>
            <Link href="#" className="text-neutral-400 text-sm hover:text-white transition-colors">
              Testimonials
            </Link>
            <Link href="#" className="text-neutral-400 text-sm hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="#" className="text-neutral-400 text-sm hover:text-white transition-colors">
              Our Story
            </Link>
            <Link href="#" className="text-neutral-400 text-sm hover:text-white transition-colors">
              FAQ
            </Link>
          </nav>

          <Link
            href="#"
            className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            Pre-Order Now
            <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <ArrowRight className="w-3 h-3 text-black" />
            </span>
          </Link>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 text-center">
          <p className="text-neutral-600 text-xs">© 2025 DreamPlay Pianos. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
