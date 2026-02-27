import Link from "next/link"
import { ArrowRight } from "lucide-react"

const Check = () => (
    <div className="w-7 h-7 rounded-full bg-foreground flex items-center justify-center">
        <svg className="w-4 h-4 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
    </div>
)

const Cross = () => (
    <svg className="w-5 h-5 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    return (
        <section className="relative overflow-hidden bg-background">
            <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 lg:py-32">
                <div className="mb-16 max-w-2xl">
                    <p className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        Did You Know?
                    </p>
                    <h2 className="mt-4 font-serif text-3xl leading-tight text-foreground md:text-4xl lg:text-5xl text-balance">
                        Why Pay Double for Less?
                    </h2>
                    <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
                        Compare our keyboard to the Yamaha P-125 and see why musicians are making the switch.
                    </p>
                </div>

                {/* Comparison table */}
                <div className="max-w-4xl">
                    {/* Header */}
                    <div className="grid grid-cols-3 border-b border-neutral-200 border-t">
                        <div className="py-4 md:py-5 font-sans text-xs uppercase tracking-[0.2em] text-neutral-500 md:text-sm">
                            Feature
                        </div>
                        <div className="py-4 md:py-5 text-center font-sans text-xs uppercase tracking-[0.2em] text-foreground font-medium md:text-sm">
                            DreamPlay
                        </div>
                        <div className="py-4 md:py-5 text-center font-sans text-xs uppercase tracking-[0.2em] text-neutral-400 md:text-sm">
                            Yamaha P-125
                        </div>
                    </div>

                    {/* Rows */}
                    {comparisonRows.map((row) => (
                        <div
                            key={row.feature}
                            className="grid grid-cols-3 border-b border-neutral-200"
                        >
                            <div className="py-5 md:py-6 font-sans text-sm text-foreground md:text-base">
                                {row.feature}
                            </div>
                            <div className="py-5 md:py-6 text-center flex justify-center items-center">
                                {row.dreamplay === "check" ? (
                                    <Check />
                                ) : (
                                    <span className="font-sans text-sm font-medium text-foreground md:text-base">{row.dreamplay}</span>
                                )}
                            </div>
                            <div className="py-5 md:py-6 text-center flex justify-center items-center">
                                {row.competitor === "cross" ? (
                                    <Cross />
                                ) : (
                                    <span className="font-sans text-sm text-neutral-400 md:text-base">{row.competitor}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12 md:mt-16">
                    <Link
                        href="/customize"
                        className="group inline-flex items-center justify-center gap-2 border border-foreground bg-foreground px-8 py-4 font-sans text-xs uppercase tracking-widest text-background transition-colors hover:bg-foreground/90"
                    >
                        Get Premium Quality for Less
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
