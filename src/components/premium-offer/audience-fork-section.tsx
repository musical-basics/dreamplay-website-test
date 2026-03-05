"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowRight, Music, Baby, ChevronDown } from "lucide-react"
import { QuestionTwo } from "@/components/buyers-guide/question-two"
import { QuestionThree } from "@/components/buyers-guide/question-three"
import { QuestionFour } from "@/components/buyers-guide/question-four"
import { RecommendationSection, UserProfile } from "@/components/buyers-guide/recommendation-section"

type Audience = "self" | "child" | null

export function AudienceForkSection() {
    const [selected, setSelected] = useState<Audience>(null)
    const [hovered, setHovered] = useState<Audience>(null)
    const [guideStep, setGuideStep] = useState(0) // 0=hidden, 1=Q2, 2=Q3, 3=Q4, 4=recommendation
    const [profile, setProfile] = useState<UserProfile>({
        buyingFor: null,
        demographic: null,
        handSize: null,
        goal: null,
    })
    const guideRef = useRef<HTMLDivElement>(null)

    const handleSelect = (audience: Audience) => {
        setSelected(audience)
        const buyingFor = audience === "self" ? "myself" : "someone-else"
        setProfile((prev) => ({ ...prev, buyingFor }))
        setGuideStep(1)
    }

    // Scroll to accordion when it opens or advances
    useEffect(() => {
        if (guideStep > 0 && guideRef.current) {
            setTimeout(() => {
                guideRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
            }, 150)
        }
    }, [guideStep])

    const updateProfile = (key: keyof UserProfile, value: string) => {
        setProfile((prev) => ({ ...prev, [key]: value }))
    }

    const nextGuideStep = () => {
        setGuideStep((prev) => prev + 1)
    }

    // When hovering child, "For Myself" reverts to white; when hovering self or nothing, it stays dark
    const selfIsDark = hovered !== "child" && selected !== "child"
    const childIsDark = selected === "child" || hovered === "child"

    const stepLabels = [
        { num: 2, label: "About You" },
        { num: 3, label: "Hand Size" },
        { num: 4, label: "Goals" },
    ]

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
                            <p className={`mt-3 font-sans text-base font-medium leading-relaxed ${selfIsDark ? "text-white/70" : "text-neutral-600"}`}>
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
                            <p className={`mt-3 font-sans text-base font-medium leading-relaxed ${childIsDark ? "text-white/70" : "text-neutral-600"}`}>
                                Build proper technique from day one with keys sized for smaller hands. Light-up LED keys make practice fun and engaging.
                            </p>
                        </div>
                        <div className={`flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wider ${childIsDark ? "text-white/80" : "text-neutral-900"}`}>
                            Select
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </button>
                </div>

                {/* Inline Buyer's Guide Accordion */}
                <div
                    ref={guideRef}
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${guideStep > 0 ? "max-h-[3000px] opacity-100 mt-10" : "max-h-0 opacity-0 mt-0"
                        }`}
                >
                    {guideStep > 0 && (
                        <div className="rounded-2xl border border-neutral-200 bg-white shadow-lg overflow-hidden">
                            {/* Progress header */}
                            <div className="bg-neutral-50 border-b border-neutral-200 px-6 py-4">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="font-sans text-sm font-semibold uppercase tracking-wider text-neutral-500">
                                        Find Your Perfect Size
                                    </p>
                                    <span className="font-sans text-xs text-neutral-400">
                                        Step {Math.min(guideStep + 1, 4)} of 4
                                    </span>
                                </div>
                                <div className="flex gap-1.5">
                                    {[1, 2, 3, 4].map((step) => (
                                        <div
                                            key={step}
                                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${step === 1
                                                ? "bg-neutral-900"
                                                : step <= guideStep
                                                    ? "bg-neutral-900"
                                                    : "bg-neutral-200"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Question panels */}
                            <div className="p-6 md:p-8">
                                {/* Q2: Demographics */}
                                {guideStep >= 1 && (
                                    <div className="transition-all duration-300">
                                        <QuestionTwo
                                            selected={profile.demographic}
                                            buyingFor={profile.buyingFor}
                                            onSelect={(value) => {
                                                updateProfile("demographic", value)
                                                nextGuideStep()
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Q3: Hand Size */}
                                {guideStep >= 2 && (
                                    <div className="mt-8 pt-8 border-t border-neutral-100 transition-all duration-300">
                                        <QuestionThree
                                            selected={profile.handSize}
                                            demographic={profile.demographic}
                                            onSelect={(value) => {
                                                updateProfile("handSize", value)
                                                nextGuideStep()
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Q4: Goals */}
                                {guideStep >= 3 && (
                                    <div className="mt-8 pt-8 border-t border-neutral-100 transition-all duration-300">
                                        <QuestionFour
                                            selected={profile.goal}
                                            onSelect={(value) => {
                                                updateProfile("goal", value)
                                                nextGuideStep()
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Recommendation */}
                            {guideStep >= 4 && (
                                <div className="border-t border-neutral-200">
                                    <RecommendationSection profile={profile} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
