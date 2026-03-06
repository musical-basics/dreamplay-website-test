"use client"

import { useState } from "react"
import Image from "next/image"

export function ScienceSection() {
    const [bioLightbox, setBioLightbox] = useState(false)

    return (
        <>
            <section className="w-full bg-black text-white">
                {/* Stats — replaces donut charts */}
                <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
                    <div className="text-center mb-16">
                        <p className="font-sans text-sm uppercase tracking-[0.3em] text-white/40 mb-4">The Data</p>
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight text-white">The Hidden Barrier</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-16 lg:gap-24 mb-20">
                        {/* Female stat */}
                        <div className="flex flex-col items-center text-center">
                            <div className="relative w-[200px] h-[200px] mb-8">
                                <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
                                    <defs>
                                        <filter id="arc-glow" x="-50%" y="-50%" width="200%" height="200%">
                                            <feGaussianBlur stdDeviation="5" result="blur" />
                                            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                                        </filter>
                                    </defs>
                                    {/* Track */}
                                    <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="20" />
                                    {/* Comfortable arc (green with glow) */}
                                    <circle cx="100" cy="100" r="80" fill="none" stroke="#4ade80" strokeWidth="20"
                                        strokeDasharray={`${0.13 * 2 * Math.PI * 80} ${0.87 * 2 * Math.PI * 80}`}
                                        strokeDashoffset={`${-0.87 * 2 * Math.PI * 80}`}
                                        strokeLinecap="butt" filter="url(#arc-glow)" />
                                    {/* Affected arc (subtle white) */}
                                    <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="20"
                                        strokeDasharray={`${0.87 * 2 * Math.PI * 80} ${0.13 * 2 * Math.PI * 80}`}
                                        strokeLinecap="butt" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="font-sans text-4xl font-light tracking-tight text-white">87<span className="text-xl text-white/40">%</span></span>
                                </div>
                            </div>
                            <p className="font-sans text-xs uppercase tracking-[0.25em] text-white/40 mb-2">of women</p>
                            <p className="font-sans text-sm leading-relaxed text-white/40 max-w-[260px]">
                                Have hand spans below the 8.5&quot; threshold that standard keyboards require.
                            </p>
                        </div>

                        {/* Male stat */}
                        <div className="flex flex-col items-center text-center">
                            <div className="relative w-[200px] h-[200px] mb-8">
                                <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
                                    {/* Track */}
                                    <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="20" />
                                    {/* Comfortable arc (green with glow) */}
                                    <circle cx="100" cy="100" r="80" fill="none" stroke="#4ade80" strokeWidth="20"
                                        strokeDasharray={`${0.76 * 2 * Math.PI * 80} ${0.24 * 2 * Math.PI * 80}`}
                                        strokeDashoffset={`${-0.24 * 2 * Math.PI * 80}`}
                                        strokeLinecap="butt" filter="url(#arc-glow)" />
                                    {/* Affected arc (subtle white) */}
                                    <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="20"
                                        strokeDasharray={`${0.24 * 2 * Math.PI * 80} ${0.76 * 2 * Math.PI * 80}`}
                                        strokeLinecap="butt" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="font-sans text-4xl font-light tracking-tight text-white">24<span className="text-xl text-white/40">%</span></span>
                                </div>
                            </div>
                            <p className="font-sans text-xs uppercase tracking-[0.25em] text-white/40 mb-2">of men</p>
                            <p className="font-sans text-sm leading-relaxed text-white/40 max-w-[260px]">
                                Also fall below the comfortable reach threshold for a standard 6.5&quot; keyboard.
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-16 grid md:grid-cols-2 gap-12 text-center md:text-left">
                        <div>
                            <div className="font-serif text-5xl md:text-6xl font-bold text-white mb-3">8.5&quot;</div>
                            <div className="font-sans text-xs uppercase tracking-[0.3em] text-white/40 mb-4">The Threshold</div>
                            <p className="font-sans text-base leading-relaxed text-white/60">
                                Minimum hand span needed to play a conventional 6.5 inch keyboard from Yamaha or Steinway with real comfort.
                            </p>
                        </div>
                        <div>
                            <div className="font-serif text-5xl md:text-6xl font-bold text-white mb-3">25–30%</div>
                            <div className="font-sans text-xs uppercase tracking-[0.3em] text-white/40 mb-4">Larger Reach Required</div>
                            <p className="font-sans text-base leading-relaxed text-white/60">
                                Hand span often needs to be at least one quarter larger than the octave just to reach 8ths, 9ths, and 10ths without strain.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Biomechanics Card */}
                <div className="mx-auto max-w-5xl px-4 md:px-6 pb-20 md:pb-28">
                    <div className="border border-white/10 bg-[#0a0a0f] overflow-hidden">
                        {/* Title Bar */}
                        <div className="border-b border-white/10 bg-white/[0.03] px-6 md:px-10 py-5 flex items-center gap-3">
                            <div className="flex gap-1.5">
                                <span className="w-3 h-3 rounded-full bg-[#c0392b]/60" />
                                <span className="w-3 h-3 rounded-full bg-amber-500/60" />
                                <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
                            </div>
                            <span className="font-sans text-xs uppercase tracking-[0.2em] text-white/40 font-medium ml-2">Clinical Research — Biomechanics</span>
                        </div>

                        {/* Card Content */}
                        <div className="p-6 md:p-10 lg:p-12">
                            <div className="mb-8 md:mb-10">
                                <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/40 mb-3">Peer-Reviewed Analysis</p>
                                <h3 className="font-serif text-2xl md:text-4xl font-semibold text-white leading-tight mb-4">
                                    How Standard Keyboards Cause Pain
                                </h3>
                                <p className="font-sans text-sm md:text-base text-white/60 leading-relaxed max-w-3xl">
                                    When small-handed pianists attempt to play octaves or large chords on a standard keyboard, they are forced completely out of an &quot;anatomically neutral&quot; position into a state of maximum stretch known as <strong className="text-white/90">hyperabduction</strong>.
                                </p>
                            </div>

                            {/* Image — Clickable */}
                            <button
                                onClick={() => setBioLightbox(true)}
                                className="group relative border border-white/10 hover:border-white/25 transition-all duration-300 cursor-pointer overflow-hidden w-full mb-3"
                            >
                                <Image
                                    src="/images/Biomechanical Impact on Small Hands copy.png"
                                    alt="Biomechanical Impact of Key Width on Small Hands"
                                    width={1200}
                                    height={900}
                                    className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300 scale-[1.3] object-cover"
                                />
                            </button>
                            <button
                                onClick={() => setBioLightbox(true)}
                                className="font-sans text-xs uppercase tracking-[0.2em] text-white/30 hover:text-white/60 transition-colors cursor-pointer mb-8 md:mb-10 block"
                            >
                                Click to enlarge
                            </button>

                            {/* Explanation */}
                            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-10">
                                <div className="border border-white/10 bg-white/[0.03] p-5 md:p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="w-3 h-3 rounded-full bg-[#c0392b]" />
                                        <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#e74c3c]">Standard Keyboard (Left)</span>
                                    </div>
                                    <p className="font-sans text-sm text-white/60 leading-relaxed">
                                        Players depress keys with fingers splayed completely flat, destroying the supportive bridge-like arch of the hand. This is accompanied by severe <strong className="text-white/90">ulnar deviation</strong> — bending the wrist sharply toward the pinky.
                                    </p>
                                </div>
                                <div className="border border-white/10 bg-white/[0.03] p-5 md:p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="w-3 h-3 rounded-full bg-emerald-500" />
                                        <span className="font-sans text-xs font-bold uppercase tracking-widest text-emerald-400">Narrower Keyboard (Right)</span>
                                    </div>
                                    <p className="font-sans text-sm text-white/60 leading-relaxed">
                                        The same hand maintains an anatomically neutral arch and relaxed wrist position. Full mechanical leverage is restored, producing a richer, more powerful tone with zero strain.
                                    </p>
                                </div>
                            </div>

                            {/* Key Findings */}
                            <div className="border-t border-white/10 pt-6 md:pt-8 mb-8 md:mb-10">
                                <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/40 mb-4">Key Findings</p>
                                <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
                                    <div className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-[#c0392b]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3 text-[#e74c3c]"><path d="M18 6 6 18M6 6l12 12" /></svg>
                                        </div>
                                        <p className="font-sans text-sm text-white/60"><strong className="text-white/90">86%</strong> of university piano majors experience active pain while playing</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-[#c0392b]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3 text-[#e74c3c]"><path d="M18 6 6 18M6 6l12 12" /></svg>
                                        </div>
                                        <p className="font-sans text-sm text-white/60">Over-stretching leads to <strong className="text-white/90">tendonitis, focal dystonia, and carpal tunnel syndrome</strong></p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3 text-emerald-400"><path d="M20 6 9 17l-5-5" /></svg>
                                        </div>
                                        <p className="font-sans text-sm text-white/60">Narrower keyboards show a <strong className="text-white/90">drastic reduction in muscle fatigue</strong> via EMG</p>
                                    </div>
                                </div>
                            </div>

                            {/* Sources */}
                            <div className="border-t border-white/10 pt-6 md:pt-8">
                                <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/40 mb-3">Sources</p>
                                <ul className="space-y-2">
                                    <li className="font-sans text-xs text-white/40 leading-relaxed">
                                        Yoshimura, E., et al. (2006). <em>Risk factors for piano-related pain among college students and piano teachers.</em> Medical Problems of Performing Artists.
                                    </li>
                                    <li className="font-sans text-xs text-white/40 leading-relaxed">
                                        Sakai, N. (2008). <em>Keyboard Span in Old Musical Instruments Concerning Hand Span and Overuse Problems in Pianists.</em>
                                    </li>
                                    <li className="font-sans text-xs text-white/40 leading-relaxed">
                                        Wristen, B. (2000). <em>Avoiding Piano-Related Injury: A Proposed Theoretical Procedure for Biomechanical Analysis of Piano Technique.</em> Medical Problems of Performing Artists.
                                    </li>
                                </ul>
                            </div>
                        </div>
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
                            className="w-full h-auto scale-[1.3] object-cover"
                        />
                        <p className="text-center font-sans text-xs text-white/50 mt-4">Click anywhere to close</p>
                    </div>
                </div>
            )}
        </>
    )
}
