"use client"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"

const Check = () => (
    <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-white">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
    </div>
)

const Cross = () => (
    <svg className="w-6 h-6 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
)

type ComparisonRow = {
    feature: string
    dreamplay: string | "check"
    competitor: string | "cross"
}

const comparisonRows: ComparisonRow[] = [
    { feature: "Key Sensor Technology", dreamplay: "Triple Sensor", competitor: "Dual Sensor" },
    { feature: "Velocity Accuracy", dreamplay: "High Precision", competitor: "Standard" },
    { feature: "LED Key Indicators", dreamplay: "check", competitor: "cross" },
    { feature: "App Integration", dreamplay: "check", competitor: "cross" },
    { feature: "Price", dreamplay: "~$350", competitor: "$700" },
    { feature: "Bench & Stand", dreamplay: "check", competitor: "cross" },
]

export function ComparisonTableSection() {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.2 },
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section ref={sectionRef} className="py-20 md:py-28 bg-neutral-50">
            <div className="container mx-auto px-4 md:px-6">
                <div
                    className={`text-center max-w-3xl mx-auto mb-12 md:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                    <p className="text-sm font-semibold text-neutral-500 uppercase tracking-widest mb-3 md:mb-4">
                        Did you know?
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 leading-tight mb-4 md:mb-6">
                        Why Pay Double for Less?
                    </h2>
                    <p className="text-base md:text-lg text-neutral-500 leading-relaxed">
                        Compare our keyboard to the Yamaha P-125 and see why musicians are making the switch.
                    </p>
                </div>

                <div
                    className={`max-w-4xl mx-auto bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden transition-all duration-700 delay-200 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                >
                    {/* Header */}
                    <div className="grid grid-cols-3 bg-neutral-900 text-white text-sm md:text-lg">
                        <div className="p-4 md:p-6 lg:p-8 font-medium">Feature</div>
                        <div className="p-4 md:p-6 lg:p-8 text-center font-bold">DreamPlay</div>
                        <div className="p-4 md:p-6 lg:p-8 text-center text-neutral-400">Yamaha P-125</div>
                    </div>

                    {/* Rows */}
                    {comparisonRows.map((row, index) => (
                        <div
                            key={row.feature}
                            className={`grid grid-cols-3 hover:bg-neutral-50 transition-colors ${index < comparisonRows.length - 1 ? "border-b border-neutral-100" : ""
                                }`}
                        >
                            <div className="p-4 md:p-6 lg:p-8 font-medium text-sm md:text-base text-neutral-800">
                                {row.feature}
                            </div>
                            <div className="p-4 md:p-6 lg:p-8 text-center flex justify-center items-center">
                                {row.dreamplay === "check" ? (
                                    <Check />
                                ) : (
                                    <span className="font-bold text-sm md:text-base lg:text-xl">{row.dreamplay}</span>
                                )}
                            </div>
                            <div className="p-4 md:p-6 lg:p-8 text-center flex justify-center items-center">
                                {row.competitor === "cross" ? (
                                    <Cross />
                                ) : (
                                    <span className="text-neutral-400 text-sm md:text-base">{row.competitor}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div
                    className={`text-center mt-10 md:mt-12 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                    <Link
                        href="/customize"
                        className="inline-flex items-center gap-2 bg-neutral-900 text-white px-8 py-4 rounded-full font-semibold text-sm md:text-base hover:scale-105 hover:bg-neutral-800 transition-all shadow-xl"
                    >
                        Get Premium Quality for Less
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    )
}
