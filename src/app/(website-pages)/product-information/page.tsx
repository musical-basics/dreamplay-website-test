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
    { label: "Action Style", one: "Weighted Hammer Action", pro: "Graded Hammer Action" },
    { label: "Overall Dimensions", one: '48.27" × 11.65" × 5.9"', pro: '48.27" × 11.65" × 5.9"' },
    { label: "Gap Between Black Keys", one: 'DS 6.0: 13.0 mm | DS 5.5: 12.0 mm', pro: 'DS 6.0: 13.0 mm | DS 5.5: 12.0 mm' },
]

const speakerSpecs = [
    { label: "Total Output Power", one: "30W", pro: "40W" },
    { label: "Configuration", one: "2.0 Channel Stereo", pro: "2.0 Channel Stereo" },
    { label: "Power Allocation", one: "(10W + 5W) × 2 channels", pro: "(15W + 5W) × 2 channels" },
    { label: "Woofer Power", one: "10W per channel", pro: "15W per channel" },
    { label: "Tweeter Power", one: "5W per channel", pro: "5W per channel" },
    { label: "Woofer Dimensions", one: "53 mm (W) × 93 mm (L) × 51.4 mm (H)", pro: "53 mm (W) × 93 mm (L) × 51.4 mm (H)" },
    { label: "Tweeter Dimensions", one: "Φ31 mm × 11.1 mm", pro: "Φ31 mm × 11.1 mm" },
]

const connectivitySpecs = [
    { label: "Headphone Jacks", one: "1× 3.5 mm output", pro: '1× 3.5 mm + 1× 6.35 mm (¼") output' },
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

/* ── Competitor Comparison Data ────────────────────────────────────────── */

const check = <span className="text-emerald-500 font-bold">✓ Yes</span>
const cross = <span className="text-neutral-400 font-medium">✕ No</span>

const p125Comparison = [
    { feature: "Market Price", dreamplay: "$749", competitor: "$649" },
    { feature: "Key Width", dreamplay: "Ergonomic (DS5.5 / DS6.0)", competitor: "Standard Wide Only (DS6.5)" },
    { feature: "Speaker Power", dreamplay: "30W (2x15W)", competitor: "14W (2x7W)" },
    { feature: "LED Learning Lights", dreamplay: check, competitor: cross },
    { feature: "Key Sensors", dreamplay: "Dual-Sensor", competitor: "Dual-Sensor" },
    { feature: "Polyphony", dreamplay: "192 Notes", competitor: "192 Notes" },
]

const p525Comparison = [
    { feature: "Market Price", dreamplay: "$1,249", competitor: "$1,599" },
    { feature: "Key Width", dreamplay: "Ergonomic (DS5.5 / DS6.0)", competitor: "Standard Wide Only (DS6.5)" },
    { feature: "LED Learning Lights", dreamplay: "✓ Yes (Above & Within Keys)", competitor: cross },
    { feature: "Key Sensors", dreamplay: "Triple-Sensor", competitor: "Triple-Sensor" },
    { feature: "Polyphony", dreamplay: "256 Notes", competitor: "256 Notes" },
    { feature: "Headphone Outputs", dreamplay: "2", competitor: "2" },
]

const genericComparison = [
    { feature: "Market Price", one: "$749", pro: "$1,249", competitor: "$2,499+" },
    { feature: "Build Design", one: "Custom Narrow Tooling", pro: "Custom Narrow Tooling", competitor: "Retrofitted OEM Parts" },
    { feature: "Key Sensors", one: "Dual-Sensor", pro: "Triple-Sensor", competitor: "Dual-Sensor" },
    { feature: "Interactive LEDs", one: "✓ Above Keys", pro: "✓ Above & Within Keys", competitor: "✕ None" },
    { feature: "Smart App Integration", one: check, pro: check, competitor: cross },
    { feature: "Bench & Stand", one: "Included in Bundle", pro: "Included in Bundle", competitor: "Not Included" },
]


/* ── Components ──────────────────────────────────────────────── */

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

                    <div className="md:hidden font-sans text-[10px] uppercase tracking-wider font-bold mt-2 text-neutral-500">DreamPlay One</div>
                    <div className={`col-span-4 font-sans text-sm md:text-base ${light ? "text-neutral-900" : "text-white"}`}>
                        {spec.one}
                    </div>

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

function ComparisonTable2Col({ title, subtitle, dreamplayName, competitorName, data }: { title: string, subtitle: string, dreamplayName: string, competitorName: string, data: any[] }) {
    return (
        <div className="bg-white border border-neutral-200 p-6 md:p-10 mb-12">
            <div className="mb-8">
                <h3 className="font-serif text-2xl md:text-3xl text-neutral-900">{title}</h3>
                <p className="font-sans text-sm text-neutral-500 mt-2">{subtitle}</p>
            </div>

            <div className="grid grid-cols-12 gap-4 pb-4 border-b border-neutral-300">
                <div className="col-span-4 font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-500 hidden md:block">Feature</div>
                <div className="col-span-6 md:col-span-4 font-sans text-sm font-bold uppercase tracking-wider text-black">{dreamplayName}</div>
                <div className="col-span-6 md:col-span-4 font-sans text-sm font-bold uppercase tracking-wider text-neutral-400">{competitorName}</div>
            </div>

            {data.map((row: any, i: number) => (
                <div key={i} className="flex flex-col gap-2 py-5 md:grid md:grid-cols-12 md:gap-4 md:items-center border-b border-neutral-100 last:border-0">
                    <div className="col-span-12 md:col-span-4 font-sans text-xs uppercase tracking-[0.2em] md:text-sm text-neutral-500 mb-2 md:mb-0">
                        {row.feature}
                    </div>
                    <div className="col-span-12 grid grid-cols-2 md:col-span-8 md:grid-cols-2 gap-4">
                        <div className="font-sans text-sm md:text-base text-neutral-900 font-medium">{row.dreamplay}</div>
                        <div className="font-sans text-sm md:text-base text-neutral-500">{row.competitor}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

function ComparisonTable3Col({ title, subtitle, data }: { title: string, subtitle: string, data: any[] }) {
    return (
        <div className="bg-neutral-50 border border-neutral-200 p-6 md:p-10">
            <div className="mb-8">
                <h3 className="font-serif text-2xl md:text-3xl text-neutral-900">{title}</h3>
                <p className="font-sans text-sm text-neutral-500 mt-2">{subtitle}</p>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-neutral-300">
                <div className="col-span-3 font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-500">Feature</div>
                <div className="col-span-3 font-sans text-xs font-bold uppercase tracking-wider text-black">DP One</div>
                <div className="col-span-3 font-sans text-xs font-bold uppercase tracking-wider text-[#4a9eff]">DP One Pro</div>
                <div className="col-span-3 font-sans text-xs font-bold uppercase tracking-wider text-neutral-400">Generic Competitor</div>
            </div>

            {data.map((row: any, i: number) => (
                <div key={i} className="flex flex-col gap-2 py-5 md:grid md:grid-cols-12 md:gap-4 md:items-center border-b border-neutral-200 last:border-0">
                    <div className="col-span-12 md:col-span-3 font-sans text-xs uppercase tracking-[0.2em] md:text-sm text-neutral-500 mb-2 md:mb-0">
                        {row.feature}
                    </div>

                    {/* Mobile Labels + Values */}
                    <div className="col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-4 md:col-span-9 md:grid-cols-3">
                        <div>
                            <div className="md:hidden font-sans text-[10px] uppercase tracking-wider font-bold mb-1 text-black">DP One</div>
                            <div className="font-sans text-sm md:text-base text-neutral-900">{row.one}</div>
                        </div>
                        <div>
                            <div className="md:hidden font-sans text-[10px] uppercase tracking-wider font-bold mb-1 text-[#4a9eff]">DP One Pro</div>
                            <div className="font-sans text-sm md:text-base text-[#4a9eff] font-medium">{row.pro}</div>
                        </div>
                        <div>
                            <div className="md:hidden font-sans text-[10px] uppercase tracking-wider font-bold mb-1 text-neutral-400">Generic Competitor</div>
                            <div className="font-sans text-sm md:text-base text-neutral-500">{row.competitor}</div>
                        </div>
                    </div>
                </div>
            ))}
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

                {/* COMPETITIVE ANALYSIS */}
                <section className="bg-white py-24 md:py-32">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="mb-16 text-center">
                            <p className="font-sans text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4">
                                Market Comparison
                            </p>
                            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-neutral-900">
                                How We Stack Up
                            </h2>
                            <p className="font-sans text-base md:text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed mt-4">
                                We engineered the DreamPlay series to go toe-to-toe with the world&apos;s leading standard-sized digital pianos, while destroying the narrow-key competition on price.
                            </p>
                        </div>

                        <ComparisonTable2Col
                            title="The Entry-Level Clash"
                            subtitle="Comparing the standard base models."
                            dreamplayName="DreamPlay One"
                            competitorName="Yamaha P125"
                            data={p125Comparison}
                        />

                        <ComparisonTable2Col
                            title="The Pro-Level Clash"
                            subtitle="Comparing the premium upgraded models."
                            dreamplayName="DreamPlay One Pro"
                            competitorName="Yamaha P525"
                            data={p525Comparison}
                        />

                        <ComparisonTable3Col
                            title="The Narrow-Key Industry"
                            subtitle="Why pay double for retrofitted parts when you can get custom tooling?"
                            data={genericComparison}
                        />
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
