"use client"

import { useState } from "react"
import Image from "next/image"

export function ScienceSection() {
    const [bioLightbox, setBioLightbox] = useState(false)

    return (
        <>
            <section className="w-full bg-neutral-100 text-neutral-900">
                <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-24">
                    {/* Section header */}
                    <div className="mb-8 md:mb-12 text-center max-w-2xl mx-auto">
                        <p className="font-sans text-xs uppercase tracking-[0.3em] text-neutral-400">
                            Clinical Research
                        </p>
                        <h2 className="mt-4 font-serif text-3xl leading-tight text-neutral-900 md:text-4xl lg:text-5xl text-balance">
                            How Standard Keyboards Cause Pain
                        </h2>
                        <p className="mt-4 font-sans text-base font-medium leading-relaxed text-neutral-600 md:text-lg">
                            When small-handed pianists attempt to play octaves or large chords, they are forced
                            into a state of maximum stretch known as <strong className="text-neutral-900">hyperabduction</strong>.
                        </p>
                    </div>

                    {/* Biomechanical image card */}
                    <div className="bg-white rounded-sm shadow-lg shadow-black/5 border border-neutral-200/60 overflow-hidden mb-2">
                        <button
                            onClick={() => setBioLightbox(true)}
                            className="group relative block w-full transition-transform duration-300 hover:scale-[1.005]"
                        >
                            <Image
                                src="/images/Biomechanical Impact on Small Hands copy.png"
                                alt="Biomechanical Impact of Key Width on Small Hands"
                                width={1200}
                                height={900}
                                className="w-full h-auto group-hover:brightness-105 transition-all duration-300 object-contain"
                            />
                        </button>
                    </div>
                    <button
                        onClick={() => setBioLightbox(true)}
                        className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer mb-10 md:mb-14 block"
                    >
                        Click to enlarge
                    </button>

                    {/* ── What the Research Shows ── */}
                    <h3 className="font-serif text-2xl md:text-3xl text-neutral-900 mb-6 md:mb-8">
                        What the Research Shows
                    </h3>

                    {/* Comparison cards */}
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-14">
                        {/* Standard Keyboard card */}
                        <div className="bg-white rounded-sm shadow-lg shadow-black/5 border-l-4 border-l-red-500 border border-neutral-200/60 p-6 md:p-8">
                            <div className="flex items-center gap-2.5 mb-4">
                                <span className="inline-block w-3 h-3 rounded-full bg-red-500" />
                                <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-red-600">
                                    Standard Keyboard
                                </h4>
                            </div>
                            <p className="font-sans text-base font-semibold text-neutral-900 mb-3 leading-snug">
                                Fingers splay flat. The hand arch collapses.
                            </p>
                            <p className="font-sans text-sm text-neutral-600 leading-relaxed">
                                Players are forced into severe <strong className="font-bold text-neutral-900">ulnar deviation</strong> — bending the wrist sharply toward the pinky — destroying the supportive bridge-like arch of the hand.
                            </p>
                        </div>

                        {/* Narrower Keyboard card */}
                        <div className="bg-white rounded-sm shadow-lg shadow-black/5 border-l-4 border-l-emerald-500 border border-neutral-200/60 p-6 md:p-8">
                            <div className="flex items-center gap-2.5 mb-4">
                                <span className="inline-block w-3 h-3 rounded-full bg-emerald-500" />
                                <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-emerald-600">
                                    Narrower Keyboard
                                </h4>
                            </div>
                            <p className="font-sans text-base font-semibold text-neutral-900 mb-3 leading-snug">
                                Natural arch maintained. Wrist stays neutral.
                            </p>
                            <p className="font-sans text-sm text-neutral-600 leading-relaxed">
                                Full mechanical leverage is restored, producing a <strong className="font-bold text-neutral-900">richer, more powerful tone</strong> with zero strain on tendons and joints.
                            </p>
                        </div>
                    </div>

                    {/* ── Key Findings ── */}
                    <h3 className="font-serif text-2xl md:text-3xl text-neutral-900 mb-6 md:mb-8">
                        Key Findings
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-14">
                        {/* Finding 1 */}
                        <div className="bg-white rounded-sm shadow-lg shadow-black/5 border border-neutral-200/60 p-6">
                            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-4">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4 text-red-500"><path d="M18 6 6 18M6 6l12 12" /></svg>
                            </div>
                            <div className="font-sans text-3xl font-bold text-neutral-900 mb-2">86%</div>
                            <p className="font-sans text-sm font-medium text-neutral-600 leading-relaxed">
                                of university piano majors experience <strong className="text-neutral-900">active pain</strong> while playing
                            </p>
                        </div>

                        {/* Finding 2 */}
                        <div className="bg-white rounded-sm shadow-lg shadow-black/5 border border-neutral-200/60 p-6">
                            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-4">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4 text-red-500"><path d="M18 6 6 18M6 6l12 12" /></svg>
                            </div>
                            <h4 className="font-sans text-base font-bold text-neutral-900 mb-2">Injury Risk</h4>
                            <p className="font-sans text-sm font-medium text-neutral-600 leading-relaxed">
                                Over-stretching leads to <strong className="text-neutral-900">tendonitis, focal dystonia, and carpal tunnel syndrome</strong>
                            </p>
                        </div>

                        {/* Finding 3 */}
                        <div className="bg-white rounded-sm shadow-lg shadow-black/5 border border-neutral-200/60 p-6">
                            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4 text-emerald-500"><path d="M20 6 9 17l-5-5" /></svg>
                            </div>
                            <h4 className="font-sans text-base font-bold text-emerald-700 mb-2">The Solution Works</h4>
                            <p className="font-sans text-sm font-medium text-neutral-600 leading-relaxed">
                                Narrower keyboards show a <strong className="text-neutral-900">drastic reduction in muscle fatigue</strong> via EMG
                            </p>
                        </div>
                    </div>

                    {/* Sources */}
                    <div className="bg-white rounded-sm shadow-sm shadow-black/5 border border-neutral-200/60 p-5 md:p-7">
                        <h4 className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-3">Sources</h4>
                        <ul className="space-y-1.5">
                            <li className="font-sans text-xs text-neutral-500 leading-relaxed">
                                Yoshimura, E., et al. (2006). <em>Risk factors for piano-related pain among college students and piano teachers.</em> Medical Problems of Performing Artists.
                            </li>
                            <li className="font-sans text-xs text-neutral-500 leading-relaxed">
                                Sakai, N. (2008). <em>Keyboard Span in Old Musical Instruments Concerning Hand Span and Overuse Problems in Pianists.</em>
                            </li>
                            <li className="font-sans text-xs text-neutral-500 leading-relaxed">
                                Wristen, B. (2000). <em>Avoiding Piano-Related Injury: A Proposed Theoretical Procedure for Biomechanical Analysis of Piano Technique.</em> Medical Problems of Performing Artists.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Biomechanical Lightbox */}
            {bioLightbox && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-pointer"
                    onClick={() => setBioLightbox(false)}
                >
                    <div className="relative max-w-5xl w-full mx-4 md:mx-8">
                        <Image
                            src="/images/Biomechanical Impact on Small Hands copy.png"
                            alt="Biomechanical Impact of Key Width on Small Hands"
                            width={1200}
                            height={900}
                            className="w-full h-auto object-contain"
                        />
                        <p className="text-center font-sans text-xs text-white/50 mt-4">Click anywhere to close</p>
                    </div>
                </div>
            )}
        </>
    )
}
