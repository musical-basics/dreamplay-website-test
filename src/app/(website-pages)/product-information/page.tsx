import { Playfair_Display, Inter } from "next/font/google"
import { SpecialOfferHeader } from "@/components/special-offer/header"
import { FeaturesGridSection } from "@/components/special-offer/features-grid-section"
import { FeaturesPianoSection } from "@/components/special-offer/features-piano-section"
import { ComparisonTableSection } from "@/components/special-offer/comparison-table-section"
import Footer from "@/components/Footer"
import Link from "next/link"
import Image from "next/image"

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata = {
    title: "Product Information — DreamPlay One",
    description: "Complete technical specifications, speaker system details, connectivity options, and features of the DreamPlay One ergonomic piano keyboard.",
}

/* ── Spec data ────────────────────────────────────────── */

const keySpecs = [
    { label: "Keyboard Versions", value: "DS5.5 (7/8ths size) or DS6.0 (15/16ths size)" },
    { label: "Overall Dimensions (L × W × H)", value: '48.27" × 11.65" × 5.9" (1226 mm × 296 mm × 150 mm)' },
    { label: "Active Key Width", value: 'DS 6.0: 44.53" (1131 mm) | DS 5.5: 41.1" (1044 mm)' },
    { label: "White Key Width (Center-to-Center)", value: 'DS 6.0: 0.857" / 21.8 mm | DS 5.5: 0.791" / 20.1 mm' },
    { label: "Black Key Width (Top)", value: 'DS 6.0: 0.346" / 8.8 mm | DS 5.5: 0.320" / 8.1 mm' },
    { label: "Gap Between Black Keys", value: 'DS 6.0: 0.511" / 13.0 mm | DS 5.5: 0.471" / 12.0 mm' },
    { label: "Key Pivot Length", value: '7.5" – 8.5" (folded-action mechanism)' },
    { label: "Action", value: "Graded Hammer Action (Weighted)" },
    { label: "Polyphony", value: "256 Notes (never cut off a sound)" },
    { label: "Key Count", value: "88 Keys (full range)" },
]

const speakerSpecs = [
    { label: "Configuration", value: "2.0 Channel Stereo" },
    { label: "Total Output Power", value: "40W" },
    { label: "Power Allocation", value: "(15W + 5W) × 2 channels" },
    { label: "Woofer Power (per channel)", value: "15W" },
    { label: "Tweeter Power (per channel)", value: "5W" },
    { label: "Woofer Dimensions", value: "53 mm (W) × 93 mm (L) × 51.4 mm (H)" },
    { label: "Tweeter Dimensions", value: "Φ31 mm × 11.1 mm" },
]

const connectivitySpecs = [
    { label: "MIDI", value: "USB-MIDI (Type-C)" },
    { label: "Bluetooth", value: "Bluetooth Audio Streaming" },
    { label: "Headphone Jacks", value: "2× 3.5 mm stereo headphone outputs" },
    { label: "Aux In/Out", value: "3.5 mm stereo auxiliary input & output" },
    { label: "Sustain Pedal", value: "6.35 mm (¼\") pedal jack" },
]

const features = [
    {
        title: "Graded Hammer-Feel Weighted Keys",
        description: "Every note responds to your touch with the same dynamic range you'd expect from an acoustic grand piano. The key weight is heavier in the bass and lighter in the treble, mirroring the real instrument.",
    },
    {
        title: "256-Voice Polyphony",
        description: "No notes are ever cut off — even the most complex passages with heavy sustain pedal use ring out completely, exactly as intended.",
    },
    {
        title: "Ergonomic DS Standard Sizing",
        description: "Available in DS5.5 (7/8ths) and DS6.0 (15/16ths) sizes, matching the keyboard to your hand span and reducing stretching-related strain.",
    },
    {
        title: "Powerful 40W Stereo Speaker System",
        description: "A dedicated 2.0 channel system with separate woofer and tweeter per channel delivers room-filling, balanced sound without an external amplifier.",
    },
    {
        title: "Seamless Connectivity",
        description: "Connect to your DAW via USB-MIDI, stream music via Bluetooth, and practice silently with dual headphone jacks. The Aux In/Out lets you connect to external speakers or sound sources.",
    },
    {
        title: "Interactive LED Learning System",
        description: "Built-in key lights guide your fingers as you learn, seamlessly connecting with learning apps to accelerate your progress.",
    },
]

/* ── Spec table renderer ──────────────────────────────── */

function SpecTable({ specs, note, light }: { specs: { label: string; value: string }[]; note?: string; light?: boolean }) {
    return (
        <>
            {specs.map((spec, i) => (
                <div
                    key={spec.label}
                    className={`flex flex-col gap-1 py-5 md:flex-row md:items-baseline md:gap-8 ${light
                        ? `border-b border-neutral-200 ${i === 0 ? "border-t" : ""}`
                        : `border-b border-neutral-800 ${i === 0 ? "border-t" : ""}`
                        }`}
                >
                    <span className={`font-sans text-xs uppercase tracking-[0.2em] md:w-72 md:shrink-0 md:text-sm ${light ? "text-neutral-500" : "text-neutral-400"
                        }`}>
                        {spec.label}
                    </span>
                    <span className={`font-sans text-sm md:text-base ${light ? "text-neutral-900" : "text-white"
                        }`}>
                        {spec.value}
                    </span>
                </div>
            ))}
            {note && (
                <p className={`mt-4 text-xs italic ${light ? "text-neutral-400" : "text-neutral-500"}`}>{note}</p>
            )}
        </>
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
                            DreamPlay One
                        </h1>
                        <p className="font-sans text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                            The world&apos;s first ergonomic digital piano — designed with narrower keys so every hand can play freely, naturally, and without strain.
                        </p>
                    </div>
                </section>

                {/* Features Overview — LIGHT */}
                <section className="bg-white">
                    <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
                        <div className="mb-16">
                            <p className="font-sans text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4">
                                What&apos;s Included
                            </p>
                            <h2 className="font-serif text-3xl md:text-4xl leading-tight text-neutral-900">
                                Key Features
                            </h2>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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

                {/* Keys Specifications */}
                <section className="bg-neutral-950 border-t border-neutral-800">
                    <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
                        <div className="mb-12">
                            <p className="font-sans text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4">
                                Keyboard
                            </p>
                            <h2 className="font-serif text-3xl md:text-4xl leading-tight text-white">
                                Key Specifications
                            </h2>
                        </div>
                        <SpecTable specs={keySpecs} />
                    </div>
                </section>

                {/* Speaker Specifications — LIGHT */}
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
                            note="Specifications apply to the current prototype/demo version and may be further optimized for mass production."
                            light
                        />
                    </div>
                </section>

                {/* Connectivity Specifications */}
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

                {/* Why Pay Double for Less? — Comparison Table */}
                <ComparisonTableSection />

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
                                href="/premium-offer"
                                className="inline-flex items-center justify-center gap-2 border border-neutral-600 px-8 py-4 font-sans text-xs uppercase tracking-widest text-white transition-colors hover:border-white"
                            >
                                Back to Overview
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
