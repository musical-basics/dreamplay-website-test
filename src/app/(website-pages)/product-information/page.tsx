import { Playfair_Display, Inter } from "next/font/google"
import { SpecialOfferHeader } from "@/components/special-offer/header"
import { FeaturesGridSection } from "@/components/special-offer/features-grid-section"
import { FeaturesPianoSection } from "@/components/special-offer/features-piano-section"
import Footer from "@/components/Footer"
import Link from "next/link"

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata = {
    title: "Product Information — DreamPlay One",
    description: "Complete technical specifications and comparison between the DreamPlay One and DreamPlay One Pro ergonomic piano keyboards.",
}

/* ── Spec data (Side-by-Side Matrix) ────────────────────────────────────────── */

const keySpecs = [
    { label: "Starting Price", one: "$749", pro: "$1,249" },
    { label: "Keyboard Versions", one: "DS5.5 or DS6.0", pro: "DS5.5 or DS6.0" },
    { label: "Key Sensor Technology", one: "Dual-Sensor", pro: "Triple-Sensor (Pro Action)" },
    { label: "Polyphony", one: "192 Notes", pro: "256 Notes" },
    { label: "Onboard Sounds", one: "18 Presets", pro: "230 Presets" },
    { label: "LED Learning System", one: "Above every key", pro: "Above AND within every key" },
    { label: "Competitor Equivalent", one: "Yamaha P125", pro: "Yamaha P525" },
    { label: "Action Style", one: "Weighted Hammer Action", pro: "Graded Hammer Action" },
    { label: "Overall Dimensions", one: '48.27" × 11.65" × 5.9"', pro: '48.27" × 11.65" × 5.9"' },
    { label: "Gap Between Black Keys", one: 'DS 6.0: 13.0 mm | DS 5.5: 12.0 mm', pro: 'DS 6.0: 13.0 mm | DS 5.5: 12.0 mm' },
]

const speakerSpecs = [
    { label: "Total Output Power", one: "30W", pro: "40W" },
    { label: "Power Allocation", one: "15W × 2 channels", pro: "20W × 2 channels" },
    { label: "Configuration", one: "Stereo Output", pro: "2.0 Channel Stereo Hi-Fi" },
]

const connectivitySpecs = [
    { label: "Headphone Jacks", one: "1× 3.5 mm output", pro: "2× 3.5 mm outputs" },
    { label: "MIDI", one: "USB-MIDI (Type-C)", pro: "USB-MIDI (Type-C)" },
    { label: "Bluetooth", one: "Audio Streaming", pro: "Audio Streaming" },
    { label: "Aux In/Out", one: "3.5 mm stereo", pro: "3.5 mm stereo" },
    { label: "Sustain Pedal", one: '6.35 mm (¼") jack', pro: '6.35 mm (¼") jack + Triple Pedal Support' },
]

const features = [
    {
        title: "Ergonomic DS Standard Sizing",
        description: "Available in DS5.5 (7/8ths) and DS6.0 (15/16ths) sizes, matching the keyboard to your hand span and reducing stretching-related strain.",
    },
    {
        title: "Authentic Weighted Keys",
        description: "Every note responds to your touch with the dynamic range you'd expect from an acoustic piano, mapping perfectly to your muscle memory.",
    },
    {
        title: "Interactive LED Learning System",
        description: "Built-in key lights guide your fingers as you learn, seamlessly connecting with learning apps to accelerate your progress. Toggle them off for a classic look.",
    },
]

/* ── Side-by-Side Spec table renderer ──────────────────────────────── */

function SpecTable({ specs, note, light }: { specs: { label: string; one: string; pro: string }[]; note?: string; light?: boolean }) {
    return (
        <div className="w-full">
            {/* Table Header */}
            <div className={`hidden md:grid grid-cols-12 gap-4 pb-4 border-b ${light ? 'border-neutral-300' : 'border-neutral-800'}`}>
                <div className="col-span-4 font-sans text-xs uppercase tracking-[0.2em] text-transparent">Feature</div>
                <div className={`col-span-4 font-sans text-sm font-bold uppercase tracking-wider ${light ? 'text-neutral-900' : 'text-white'}`}>DreamPlay One</div>
                <div className="col-span-4 font-sans text-sm font-bold uppercase tracking-wider text-[#4a9eff]">DreamPlay One Pro</div>
            </div>

            {/* Table Rows */}
            {specs.map((spec) => (
                <div
                    key={spec.label}
                    className={`flex flex-col gap-2 py-5 md:grid md:grid-cols-12 md:gap-4 md:items-center ${light
                        ? `border-b border-neutral-200`
                        : `border-b border-neutral-800`
                        }`}
                >
                    <div className={`col-span-4 font-sans text-xs uppercase tracking-[0.2em] md:text-sm ${light ? "text-neutral-500" : "text-neutral-400"}`}>
                        {spec.label}
                    </div>

                    {/* Mobile Label for One */}
                    <div className="md:hidden font-sans text-[10px] uppercase tracking-wider font-bold mt-2 text-neutral-500">DreamPlay One</div>
                    <div className={`col-span-4 font-sans text-sm md:text-base ${light ? "text-neutral-900" : "text-white"}`}>
                        {spec.one}
                    </div>

                    {/* Mobile Label for Pro */}
                    <div className="md:hidden font-sans text-[10px] uppercase tracking-wider font-bold mt-2 text-[#4a9eff]">DreamPlay One Pro</div>
                    <div className={`col-span-4 font-sans text-sm font-medium md:text-base text-[#4a9eff]`}>
                        {spec.pro}
                    </div>
                </div>
            ))}
            {note && (
                <p className={`mt-6 text-xs italic ${light ? "text-neutral-500" : "text-neutral-400"}`}>{note}</p>
            )}
        </div>
    )
}

/* ── Page ──────────────────────────────────────────────── */

export default function ProductInformationPage() {
    return (
        <div className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
            <SpecialOfferHeader />
            <main>
                {/* Hero */}
                <section className="bg-neutral-950 pt-32 pb-20 md:pt-40 md:pb-28">
                    <div className="mx-auto max-w-6xl px-6 text-center">
                        <p className="font-sans text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4">
                            Product Information
                        </p>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-white mb-6 text-balance">
                            Tech Specs & Comparisons
                        </h1>
                        <p className="font-sans text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                            Compare the models. The world&apos;s first ergonomic digital piano line — designed with narrower keys so every hand can play freely.
                        </p>
                    </div>
                </section>

                {/* Features Overview — LIGHT */}
                <section className="bg-white">
                    <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
                        <div className="mb-16 text-center md:text-left">
                            <p className="font-sans text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4">
                                Standard Across All Models
                            </p>
                            <h2 className="font-serif text-3xl md:text-4xl leading-tight text-neutral-900">
                                The DreamPlay Foundation
                            </h2>
                        </div>
                        <div className="grid gap-8 md:grid-cols-3">
                            {features.map((f) => (
                                <div key={f.title} className="border border-neutral-200 bg-neutral-50 p-6 md:p-8 hover:border-neutral-400 transition-colors">
                                    <h3 className="font-serif text-lg text-neutral-900 mb-3">{f.title}</h3>
                                    <p className="font-sans text-sm text-neutral-500 leading-relaxed">{f.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* All the Features You Need */}
                <FeaturesGridSection />

                {/* Everything You Need, Built In */}
                <FeaturesPianoSection />

                {/* Keys Specifications (Side by Side) */}
                <section className="bg-neutral-950 border-t border-neutral-800">
                    <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
                        <div className="mb-12">
                            <p className="font-sans text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4">
                                Head to Head
                            </p>
                            <h2 className="font-serif text-3xl md:text-4xl leading-tight text-white">
                                Key Specifications
                            </h2>
                        </div>
                        <SpecTable
                            specs={keySpecs}
                            note="* The DreamPlay One Pro is currently in active development. Pricing and specifications are subject to slight changes before mass production."
                        />
                    </div>
                </section>

                {/* Speaker Specifications — LIGHT (Side by Side) */}
                <section className="bg-white">
                    <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
                        <div className="mb-12">
                            <p className="font-sans text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4">
                                Audio
                            </p>
                            <h2 className="font-serif text-3xl md:text-4xl leading-tight text-neutral-900">
                                Speaker System
                            </h2>
                        </div>
                        <SpecTable
                            specs={speakerSpecs}
                            light
                        />
                    </div>
                </section>

                {/* Connectivity Specifications (Side by Side) */}
                <section className="bg-neutral-950 border-t border-neutral-800">
                    <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
                        <div className="mb-12">
                            <p className="font-sans text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4">
                                I/O
                            </p>
                            <h2 className="font-serif text-3xl md:text-4xl leading-tight text-white">
                                Connectivity
                            </h2>
                        </div>
                        <SpecTable specs={connectivitySpecs} />
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-neutral-950 border-t border-neutral-800 py-24 md:py-32 text-center">
                    <div className="mx-auto max-w-6xl px-6">
                        <p className="font-sans text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4">
                            Get Started
                        </p>
                        <h2 className="font-serif text-3xl md:text-4xl leading-tight text-white mb-8">
                            Ready to play without limits?
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/customize"
                                className="inline-flex items-center justify-center gap-2 border border-white bg-white px-8 py-4 font-sans text-xs uppercase tracking-widest text-black transition-colors hover:bg-white/90"
                            >
                                Configure Yours
                            </Link>
                            <Link
                                href="/how-it-works"
                                className="inline-flex items-center justify-center gap-2 border border-neutral-600 px-8 py-4 font-sans text-xs uppercase tracking-widest text-white transition-colors hover:border-white"
                            >
                                How It Works
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
