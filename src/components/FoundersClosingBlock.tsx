import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function FoundersClosingBlock() {
    return (
        <section className="my-24 px-4">
            <div className="mx-auto max-w-4xl border border-white/10 bg-[#0a0a0f] p-12 text-center">
                <p className="font-sans text-xs uppercase tracking-widest text-white/50">
                    Batch 1 Update
                </p>

                <h2 className="mt-4 mb-6 font-serif text-3xl text-white md:text-4xl">
                    The Transition to Retail.
                </h2>

                <p className="mx-auto mb-8 max-w-2xl font-sans text-sm leading-relaxed text-white/70">
                    For the past year, our earliest supporters have enjoyed beta pricing while we
                    perfected the custom steel tooling and manufacturing of the DreamPlay One. As we
                    prepare for global distribution, the Founder&apos;s Batch is officially closing on March 2nd.
                    Secure your instrument at the original allocation rate before the public $1,199
                    MSRP takes effect on March 3rd.
                </p>

                <Link
                    href="/customize"
                    className="group inline-flex items-center justify-center gap-2 bg-white px-8 py-4 font-sans text-xs uppercase tracking-widest font-bold text-black transition-colors hover:bg-white/90"
                >
                    Secure My Allocation
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </section>
    )
}
