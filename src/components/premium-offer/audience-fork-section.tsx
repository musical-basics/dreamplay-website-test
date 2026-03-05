"use client"

import { useState } from "react"
import { ArrowRight, Music, Baby } from "lucide-react"

type Audience = "self" | "child" | null

export function AudienceForkSection() {
    const [selected, setSelected] = useState<Audience>(null)

    const handleSelect = (audience: Audience) => {
        setSelected(audience)
        // Smooth scroll to the next section
        setTimeout(() => {
            const next = document.getElementById("video")
            if (next) next.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 300)
    }

    return (
        <section className="relative overflow-hidden bg-neutral-50">
            <div className="mx-auto max-w-4xl px-6 py-14 md:py-20">
                <div className="text-center mb-10">
                    <p className="font-sans text-sm uppercase tracking-[0.3em] text-neutral-500">
                        Personalize Your Experience
                    </p>
                    <h2 className="mt-3 font-serif text-2xl leading-tight text-neutral-900 md:text-3xl lg:text-4xl">
                        Who are you buying for?
                    </h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {/* Path A: For Myself */}
                    <button
                        onClick={() => handleSelect("self")}
                        className={`group flex flex-col items-start gap-4 border-2 p-6 md:p-8 text-left transition-all duration-300 cursor-pointer ${selected === "self"
                            ? "border-neutral-900 bg-neutral-900 text-white shadow-xl scale-[1.02]"
                            : "border-neutral-200 bg-white text-neutral-900 hover:border-neutral-400 hover:shadow-lg"
                            }`}
                    >
                        <Music className={`h-6 w-6 ${selected === "self" ? "text-white/70" : "text-neutral-400"}`} strokeWidth={1.5} />
                        <div>
                            <h3 className="font-serif text-xl md:text-2xl">For Myself</h3>
                            <p className={`mt-2 font-sans text-base leading-relaxed ${selected === "self" ? "text-white/70" : "text-neutral-500"}`}>
                                Eliminate wrist pain, unlock Chopin &amp; Liszt repertoire, and play with proper technique — endorsed by Stanford University researchers.
                            </p>
                        </div>
                        <div className={`flex items-center gap-2 font-sans text-sm uppercase tracking-wider ${selected === "self" ? "text-white/60" : "text-neutral-400"}`}>
                            Explore
                            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </div>
                    </button>

                    {/* Path B: For a Child */}
                    <button
                        onClick={() => handleSelect("child")}
                        className={`group flex flex-col items-start gap-4 border-2 p-6 md:p-8 text-left transition-all duration-300 cursor-pointer ${selected === "child"
                            ? "border-neutral-900 bg-neutral-900 text-white shadow-xl scale-[1.02]"
                            : "border-neutral-200 bg-white text-neutral-900 hover:border-neutral-400 hover:shadow-lg"
                            }`}
                    >
                        <Baby className={`h-6 w-6 ${selected === "child" ? "text-white/70" : "text-neutral-400"}`} strokeWidth={1.5} />
                        <div>
                            <h3 className="font-serif text-xl md:text-2xl">For a Child</h3>
                            <p className={`mt-2 font-sans text-base leading-relaxed ${selected === "child" ? "text-white/70" : "text-neutral-500"}`}>
                                Build proper technique from day one with keys sized for smaller hands. Light-up LED keys make practice fun and engaging.
                            </p>
                        </div>
                        <div className={`flex items-center gap-2 font-sans text-sm uppercase tracking-wider ${selected === "child" ? "text-white/60" : "text-neutral-400"}`}>
                            Explore
                            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </div>
                    </button>
                </div>
            </div>
        </section>
    )
}
