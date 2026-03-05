"use client"

import { useState } from "react"
import { ArrowRight, Music, Baby } from "lucide-react"

type Audience = "self" | "child" | null

export function AudienceForkSection() {
    const [selected, setSelected] = useState<Audience>(null)
    const [hovered, setHovered] = useState<Audience>(null)

    const handleSelect = (audience: Audience) => {
        setSelected(audience)
        setTimeout(() => {
            const next = document.getElementById("video")
            if (next) next.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 300)
    }

    // When hovering child, "For Myself" reverts to white; when hovering self or nothing, it stays dark
    const selfIsDark = hovered !== "child" && selected !== "child"
    const childIsDark = selected === "child" || hovered === "child"

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

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Path A: For Myself */}
                    <button
                        onClick={() => handleSelect("self")}
                        onMouseEnter={() => setHovered("self")}
                        onMouseLeave={() => setHovered(null)}
                        className={`group flex flex-col items-start gap-4 rounded-xl p-8 md:p-10 text-left transition-all duration-300 cursor-pointer ${selfIsDark
                                ? "bg-neutral-900 text-white shadow-lg hover:bg-black hover:shadow-2xl hover:scale-[1.02]"
                                : "bg-white text-neutral-900 shadow-lg border border-neutral-200 hover:bg-neutral-100 hover:shadow-xl hover:scale-[1.02]"
                            }`}
                    >
                        <Music className={`h-7 w-7 ${selfIsDark ? "text-white/60" : "text-neutral-600"}`} strokeWidth={2} />
                        <div>
                            <h3 className="font-serif text-2xl font-semibold md:text-3xl">For Myself</h3>
                            <p className={`mt-3 font-sans text-base leading-relaxed ${selfIsDark ? "text-white/70" : "text-neutral-600"}`}>
                                Eliminate wrist pain, unlock Chopin &amp; Liszt repertoire, and play with proper technique — endorsed by Stanford University researchers.
                            </p>
                        </div>
                        <div className={`flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wider ${selfIsDark ? "text-white/80" : "text-neutral-900"}`}>
                            Select
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </button>

                    {/* Path B: For a Child */}
                    <button
                        onClick={() => handleSelect("child")}
                        onMouseEnter={() => setHovered("child")}
                        onMouseLeave={() => setHovered(null)}
                        className={`group flex flex-col items-start gap-4 rounded-xl p-8 md:p-10 text-left transition-all duration-300 cursor-pointer ${childIsDark
                                ? "bg-neutral-800 text-white shadow-2xl scale-[1.02] ring-2 ring-neutral-800"
                                : "bg-white text-neutral-900 shadow-lg border border-neutral-200 hover:bg-neutral-100 hover:shadow-xl hover:scale-[1.02]"
                            }`}
                    >
                        <Baby className={`h-7 w-7 ${childIsDark ? "text-white/70" : "text-neutral-600"}`} strokeWidth={2} />
                        <div>
                            <h3 className="font-serif text-2xl font-semibold md:text-3xl">For a Child</h3>
                            <p className={`mt-3 font-sans text-base leading-relaxed ${childIsDark ? "text-white/70" : "text-neutral-600"}`}>
                                Build proper technique from day one with keys sized for smaller hands. Light-up LED keys make practice fun and engaging.
                            </p>
                        </div>
                        <div className={`flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wider ${childIsDark ? "text-white/80" : "text-neutral-900"}`}>
                            Select
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </button>
                </div>
            </div>
        </section>
    )
}
