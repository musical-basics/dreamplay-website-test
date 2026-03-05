"use client"

import Image from "next/image"
import { ArrowRight, ArrowDown } from "lucide-react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function ChildHeroSection() {
    return (
        <section className="relative leading-[0] bg-white">
            {/* Video Hero 2 */}
            <div className="relative w-full aspect-video">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover brightness-[0.6] contrast-[1.1] saturate-[0.85]"
                >
                    <source src="/videos/DreamPlay Hero 1080p v5 Loop (mom+child).mov" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                <div className="absolute inset-0 z-10 flex items-end px-8 pb-10 md:px-16 md:pb-14 lg:px-24 leading-normal">
                    <div className="max-w-md">
                        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/70 md:text-xs">
                            A Piano That Grows With Them
                        </p>
                        <h2 className="mt-3 font-serif text-2xl leading-tight text-white md:text-3xl lg:text-4xl xl:text-5xl text-balance">
                            Their First Real Piano.
                            <br />
                            Built for Little Hands.
                        </h2>
                        <p className="mt-4 max-w-sm font-sans text-sm font-medium leading-relaxed text-white/85 md:text-base">
                            Children deserve keys that actually fit. Start on the DS5.5,
                            upgrade when they grow.
                        </p>
                    </div>
                </div>
            </div>

            {/* Upgrade Path Section */}
            <div className="bg-[#fafaf8]">
                <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
                    <div className="mb-10 max-w-2xl">
                        <p className="font-sans text-sm uppercase tracking-[0.3em] text-neutral-500">
                            The Growth Path
                        </p>
                        <h3 className="mt-3 font-serif text-2xl leading-tight text-neutral-900 md:text-3xl lg:text-4xl text-balance">
                            Start small. Upgrade when they&apos;re ready.
                        </h3>
                    </div>

                    {/* Timeline */}
                    <div className="flex flex-col md:flex-row md:items-stretch gap-6 md:gap-0">
                        {/* Step 1: DS5.5 */}
                        <div className="flex-1 border border-neutral-200 bg-white p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 font-sans text-xs font-bold text-white">1</span>
                                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-neutral-400">Start Here</span>
                            </div>
                            <h4 className="font-serif text-2xl text-neutral-900 md:text-3xl">DS5.5</h4>
                            <p className="mt-1 font-sans text-xs uppercase tracking-wider text-neutral-400">7/8ths Size</p>
                            <p className="mt-4 font-sans text-sm font-medium leading-relaxed text-neutral-600">
                                Perfect for children and petite adults with handspans under 7.6&quot;. The smaller keys
                                let young hands reach octaves comfortably, building <strong className="text-neutral-900">proper technique</strong> from
                                the very first lesson.
                            </p>
                        </div>

                        {/* Arrow */}
                        <div className="flex items-center justify-center md:px-4 py-2 md:py-0">
                            <ArrowRight className="hidden md:block h-6 w-6 text-neutral-300" />
                            <ArrowDown className="md:hidden h-6 w-6 text-neutral-300" />
                        </div>

                        {/* Step 2: DS6.0 */}
                        <div className="flex-1 border border-neutral-200 bg-white p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-300 font-sans text-xs font-bold text-neutral-400">2</span>
                                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-neutral-400">When They Grow</span>
                            </div>
                            <h4 className="font-serif text-2xl text-neutral-900 md:text-3xl">DS6.0</h4>
                            <p className="mt-1 font-sans text-xs uppercase tracking-wider text-neutral-400">15/16ths Size</p>
                            <p className="mt-4 font-sans text-sm font-medium leading-relaxed text-neutral-600">
                                As their hands grow past 7.6&quot;, they upgrade to the DS6.0 — the universal size
                                used by top university programs. Same muscle memory, same relaxed technique, just more room.
                            </p>
                        </div>
                    </div>

                    {/* Learn More Accordion */}
                    <div className="mt-8">
                        <Accordion type="single" collapsible>
                            <AccordionItem value="upgrade-details" className="border-neutral-200">
                                <AccordionTrigger className="font-sans text-sm uppercase tracking-[0.15em] text-neutral-600 hover:no-underline hover:text-neutral-900 py-4">
                                    Learn More About the Upgrade Path
                                </AccordionTrigger>
                                <AccordionContent className="font-sans text-sm font-medium leading-relaxed text-neutral-600 md:text-base">
                                    <div className="flex flex-col gap-4 max-w-3xl">
                                        <p>
                                            <strong className="text-neutral-900">How the upgrade works:</strong> When your child outgrows
                                            the DS5.5, contact our team to arrange a keyboard swap. You&apos;ll only pay the difference in price
                                            between the two models — we handle the rest.
                                        </p>
                                        <p>
                                            <strong className="text-neutral-900">Why start on DS5.5?</strong> Standard 6.5&quot; octave
                                            keyboards force children to hyperextend their fingers, creating bad habits that are extremely hard
                                            to unlearn later. Starting on a properly sized keyboard builds the correct foundation — relaxed
                                            wrists, curved fingers, natural hand position.
                                        </p>
                                        <p>
                                            <strong className="text-neutral-900">When to upgrade:</strong> Most children transition between
                                            ages 12-16, when their handspan grows past 7.6&quot;. Some prefer to stay on the DS5.5 well into
                                            adulthood — many professional female pianists have handspans in the DS5.5 range.
                                        </p>
                                        <p>
                                            <strong className="text-neutral-900">No lost progress:</strong> The transition from DS5.5 to
                                            DS6.0 is seamless. Both follow the DS Standard sizing system, so finger spacing ratios stay
                                            consistent. Your child won&apos;t need to &quot;re-learn&quot; anything.
                                        </p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* CTA */}
                    <div className="mt-8">
                        <a
                            href="/customize"
                            className="group inline-flex items-center gap-2 bg-neutral-900 px-8 py-4 font-sans text-xs uppercase tracking-widest text-white transition-colors hover:bg-neutral-800"
                        >
                            Start with DS5.5
                            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
