"use client";
import React, { useEffect, useState } from "react";
import { SpecialOfferHeader } from "@/components/special-offer/header";
import { SpecialOfferFooter } from "@/components/special-offer/footer";

export default function OurStoryPage() {
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const sections = ['the-struggle', 'the-discovery', 'the-transformation', 'the-teacher'];
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;
            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(sectionId);
                        return;
                    }
                }
            }
            if (window.scrollY < 100) setActiveSection("");
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <div className="min-h-screen font-sans selection:bg-blue-500/20">
            <SpecialOfferHeader forceOpaque={true} darkMode={true} className="border-b border-white/10 bg-[#050505] backdrop-blur-md" />

            <main className="relative">

                {/* DESKTOP NAV (Left Sticky) */}
                <nav className="fixed left-6 md:left-12 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
                    <div className="relative">
                        <div className="absolute left-[9px] top-0 bottom-0 w-[2px] bg-blue-600/20"></div>
                        <div className="space-y-16">
                            {[
                                { id: 'the-struggle', year: '1990-2020', title: 'The Struggle' },
                                { id: 'the-discovery', year: '2022', title: 'The Discovery' },
                                { id: 'the-transformation', year: '2022-2025', title: 'The Transformation' },
                                { id: 'the-teacher', year: 'Late 2024', title: 'The Teacher' }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className="relative flex items-center gap-6 group w-full text-left"
                                >
                                    <div className={`w-5 h-5 rounded-full border-[3px] transition-all duration-300 z-10 ${activeSection === item.id ? 'bg-blue-600 border-blue-600 scale-125' : 'bg-white border-neutral-300 group-hover:border-blue-600 group-hover:scale-125'}`}></div>
                                    <div className={`transition-all duration-300 ${activeSection === item.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`}>
                                        <div className="whitespace-nowrap">
                                            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-blue-600 font-semibold">{item.year}</p>
                                            <p className="text-base font-bold text-neutral-900">{item.title}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </nav>

                {/* ═══ HERO — DARK ═══ */}
                <section className="relative h-screen flex flex-col items-center justify-center px-6 bg-[#050505] text-white">
                    <div className="text-center max-w-4xl mx-auto z-10">
                        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-blue-400 font-bold mb-8">A Pianist's Story</p>
                        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight leading-none mb-8 text-white">
                            The Dream<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                                of a Lifetime
                            </span>
                        </h1>
                        <p className="font-sans text-base md:text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
                            A personal journey through decades of struggle, a chance encounter, and the piano that changed everything.
                        </p>
                    </div>
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-blue-400">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"></path></svg>
                    </div>
                </section>

                {/* ═══ CHAPTER 1: THE STRUGGLE — LIGHT ═══ */}
                <section id="the-struggle" className="bg-white text-black relative">
                    <div className="min-h-screen flex flex-col justify-center py-32 px-6 md:px-12 lg:px-24">
                        <div className="max-w-7xl mx-auto w-full pl-0 lg:pl-16">
                            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                                <div>
                                    <span className="inline-block font-sans text-[10px] uppercase tracking-[0.3em] text-blue-600 bg-blue-600/10 px-4 py-2 mb-6 border border-blue-600/20">
                                        Chapter One · The Struggle
                                    </span>
                                    <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight mb-12 text-black">
                                        I have a confession to make.
                                    </h2>
                                    <div className="space-y-6 font-sans text-base md:text-lg text-neutral-600 leading-relaxed max-w-xl">
                                        <p>My hands are not large, especially for a man. In a world where there is only one "conventional" piano size, I spent 3 decades of my life playing on pianos that were simply too big for my hands.</p>
                                        <p>Even though I became a professional pianist late in my life, at age 30, I found myself frequently straining to reach certain notes, and excluded from playing some of my favorite composers like Liszt and Rachmaninoff, both of whom famously had large hands.</p>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <div className="aspect-[4/5] overflow-hidden rounded-none border border-neutral-200">
                                        <img src="/images/carnegie-hall-performance.png" alt="Pianist performing" className="w-full h-full object-cover transition-all duration-700" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* History Note — LIGHT (neutral-50) */}
                    <div className="border-t border-neutral-200 py-24 px-6 md:px-12 lg:px-24 bg-neutral-50">
                        <div className="max-w-6xl mx-auto pl-0 lg:pl-16">
                            <span className="inline-block font-sans text-[10px] uppercase tracking-[0.3em] text-blue-600 bg-blue-600/10 px-4 py-2 mb-6 border border-blue-600/20">
                                History Note
                            </span>
                            <div className="grid md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr] gap-8 items-start">
                                <div className="relative overflow-hidden rounded-none border border-neutral-200">
                                    <img src="/images/franz-liszt-in-colour-1546939903-large-article-0.jpg" alt="Franz Liszt" className="w-full h-auto object-cover transition-all duration-700" />
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-1 h-full min-h-[100px] bg-blue-600 flex-shrink-0"></div>
                                    <p className="font-serif text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-neutral-600">
                                        The modern piano only reached its current size during the time of superstars like Liszt and Anton Rubinstein, with earlier versions of the piano having narrower keys.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══ CHAPTER 2: THE DISCOVERY — DARK ═══ */}
                <section id="the-discovery" className="bg-[#050505] text-white relative">
                    <div className="min-h-screen flex flex-col justify-center py-32 px-6 md:px-12 lg:px-24">
                        <div className="max-w-7xl mx-auto w-full pl-0 lg:pl-16">
                            <div className="grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20 items-start lg:items-end">
                                <div className="order-1 space-y-6 lg:space-y-8">
                                    <span className="inline-block font-sans text-[10px] uppercase tracking-[0.3em] text-blue-400 bg-blue-400/10 px-4 py-2 border border-blue-400/20">
                                        Chapter Two · A Chance Encounter
                                    </span>
                                    <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight text-white">
                                        Then I met David Steinbuhler.
                                    </h2>
                                    <div className="space-y-6 font-sans text-sm md:text-base text-white/60 leading-relaxed max-w-2xl">
                                        <p>3 years ago, I met a man named David Steinbuhler, who owns a textile factory in northern Pennsylvania. In the small corner of his factory, he had a small operation going, where he made narrower keyboards for pianists all around the world since 1992, creating the <a href="/about-us/ds-standard" target="_blank" className="underline hover:text-blue-400 font-bold">Donison-Steinbuhler (DS) Standard®</a>.</p>
                                        <p>Focusing on grand pianos, he would create the keybed plus the entire action (which includes the felt hammers and pivots), for pianists and universities to swap out from their existing grand pianos.</p>
                                        <p>David took my Kawai MP11SE, replacing the existing DS6.5 keys for a narrower, reduced DS6.0 size. To this day, my Kawai MP11SE keyboard is the only DS6.0-sized keyboard with the same wood used for premium, grand pianos.</p>
                                    </div>
                                </div>
                                <div className="order-2 flex items-start lg:-mt-[200px]">
                                    <div className="w-full aspect-video overflow-hidden rounded-none border border-white/10">
                                        <img src="/images/vlcsnap-2025-11-25-19h10m12s384.png" alt="Workshop" className="w-full h-full object-cover transition-all duration-700" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══ CHAPTER 3: THE TRANSFORMATION — LIGHT ═══ */}
                <section id="the-transformation" className="bg-white text-black relative">
                    <div className="py-32 px-6 md:px-12 lg:px-24">
                        <div className="max-w-7xl mx-auto w-full pl-0 lg:pl-16">
                            <span className="inline-block font-sans text-[10px] uppercase tracking-[0.3em] text-blue-600 bg-blue-600/10 px-4 py-2 mb-6 border border-blue-600/20">
                                Chapter Three · The Transformation
                            </span>
                            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-tight mb-16 max-w-4xl text-black">
                                Everything changed.
                            </h2>
                        </div>
                    </div>
                    {/* Full Width Image */}
                    <div className="relative w-full aspect-[21/9] overflow-hidden">
                        <img src="/images/article-main-placeholder.jpg" alt="Piano close up" className="w-full h-full object-cover transition-all duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/50"></div>
                    </div>

                    <div className="py-32 px-6 md:px-12 lg:px-24">
                        <div className="max-w-7xl mx-auto pl-0 lg:pl-16">
                            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
                                <div className="space-y-6 font-sans text-base md:text-lg text-neutral-600 leading-relaxed">
                                    <p>During the first few weeks of practicing, I didn't notice much difference. The main thought I had during this time was, wow, the black keys feel so narrow. Whereas on the conventional pianos, the black keys had enough surface area that you could kind of "approximate" the distance, and still hit the note, with the narrower keys, finger accuracy was paramount.</p>
                                    <p>But this feeling of unease gradually went away. As time went on, the feeling that profoundly affected me as I played on this keyboard, was the feeling of complete relaxation.</p>
                                    <p>For the first time in my life, I didn't have to strain to play the #1 most common interval, the octave. Pieces by Romantic composers, especially by Chopin, Liszt, and Rachmaninoff, began opening up to me, like old friends who moved back into town.</p>
                                </div>
                                <div className="flex items-center">
                                    <div className="relative">
                                        <div className="absolute -left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-blue-600/20 rounded-full"></div>
                                        <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-black pl-0">
                                            "For the first time in my life, I didn't have to strain."
                                        </blockquote>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══ CHAPTER 4: THE TEACHER — LIGHT (neutral-50) ═══ */}
                <section id="the-teacher" className="bg-neutral-50 text-black relative">
                    <div className="min-h-screen flex flex-col justify-center py-32 px-6 md:px-12 lg:px-24">
                        <div className="max-w-7xl mx-auto w-full pl-0 lg:pl-16">
                            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-20">
                                <div>
                                    <span className="inline-block font-sans text-[10px] uppercase tracking-[0.3em] text-blue-600 bg-blue-600/10 px-4 py-2 mb-6 border border-blue-600/20">
                                        Chapter Four · Late 2024
                                    </span>
                                    <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight mb-8 text-black">
                                        I became a teacher.
                                    </h2>
                                    <div className="space-y-6 font-sans text-base md:text-lg text-neutral-600 leading-relaxed">
                                        <p>After my worldwide concert tour in 2023, I decided to become a piano teacher. My students were fans of mine from my Youtube channel, many of whom had attended my concerts.</p>
                                        <p>As a new teacher, I learned on the spot—how to demonstrate hand position, posture, and technique. But as I learned more about teaching, I started running into a very common issue amongst my students.</p>
                                    </div>
                                </div>
                                <div className="relative mt-8 lg:mt-0">
                                    <div className="aspect-[4/3] overflow-hidden rounded-none border border-neutral-200">
                                        <img src="/images/hands-playing-illuminated-piano-keys-learning.jpg" alt="Teaching Piano" className="w-full h-full object-cover transition-all duration-700" />
                                    </div>
                                </div>
                            </div>

                            {/* Student Category Cards */}
                            <div className="grid md:grid-cols-3 gap-6 mb-24">
                                <div className="bg-white p-8 rounded-none border border-neutral-200">
                                    <div className="w-10 h-10 bg-blue-600/10 rounded-full flex items-center justify-center mb-4 text-blue-600 font-bold text-lg">1</div>
                                    <h3 className="font-serif text-xl font-bold mb-3 text-black">Kids (&lt; 13)</h3>
                                    <p className="font-sans text-sm text-neutral-600 leading-relaxed">Almost universally, students under 13 faced hand size issues. I constantly had to remind them, "don't worry, your hands will grow."</p>
                                </div>
                                <div className="bg-white p-8 rounded-none border border-neutral-200">
                                    <div className="w-10 h-10 bg-blue-600/10 rounded-full flex items-center justify-center mb-4 text-blue-600 font-bold text-lg">2</div>
                                    <h3 className="font-serif text-xl font-bold mb-3 text-black">Teenagers (14-22)</h3>
                                    <p className="font-sans text-sm text-neutral-600 leading-relaxed">Those with smaller hands struggled. I felt bad demonstrating on my DS6.0, knowing they couldn't replicate the technique on their standard keys.</p>
                                </div>
                                <div className="bg-white p-8 rounded-none border border-neutral-200">
                                    <div className="w-10 h-10 bg-blue-600/10 rounded-full flex items-center justify-center mb-4 text-blue-600 font-bold text-lg">3</div>
                                    <h3 className="font-serif text-xl font-bold mb-3 text-black">Adults (22+)</h3>
                                    <p className="font-sans text-sm text-neutral-600 leading-relaxed">Most female students complained about large intervals. While many men could play 9ths and 10ths, those with similar hands to mine, had trouble playing Romantic repertoire.</p>
                                </div>
                            </div>

                            {/* The Realization Box — DARK pop */}
                            <div className="bg-[#050505] text-white rounded-none p-8 md:p-16 text-center relative overflow-hidden border border-white/10">
                                <div className="relative z-10 max-w-3xl mx-auto">
                                    <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-blue-400 font-bold mb-4">The Realization</p>
                                    <h3 className="font-serif text-3xl md:text-5xl leading-tight mb-6">
                                        60% of my students would benefit from a narrower keyboard.
                                    </h3>
                                    <p className="font-sans text-base md:text-lg text-white/60 leading-relaxed">
                                        Nearly all of my female students, and a quarter of my male students. I desperately wanted them to just play once on my DS6.0 keyboard, to feel how easy it was.
                                    </p>
                                    <div className="mt-8">
                                        <a href="/how-it-works" className="inline-flex items-center gap-2 text-blue-400 font-bold font-sans text-xs uppercase tracking-widest hover:text-white transition-colors">
                                            Measure your hand size
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                        </a>
                                    </div>
                                </div>
                                {/* Subtle blue gradient overlay */}
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/15 to-transparent pointer-events-none"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══ CTA — DARK ═══ */}
                <section className="bg-[#0a0a0f] text-white py-32 border-t border-white/10">
                    <div className="flex flex-col items-center justify-center px-6 text-center">
                        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">Get Started</p>
                        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight mb-6 text-white">
                            Ready to play freely?
                        </h2>
                        <p className="font-sans text-base md:text-lg text-white/60 mb-12 max-w-xl">
                            Back our crowdfunding campaign and get early access.
                        </p>
                        <a href="/customize" className="group inline-flex items-center justify-center gap-2 border border-white bg-white px-8 py-4 font-sans text-xs uppercase tracking-widest text-black transition-colors hover:bg-white/90">
                            Configure Yours
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path></svg>
                        </a>
                    </div>
                </section>

            </main>
            <SpecialOfferFooter />
        </div>
    );
}
