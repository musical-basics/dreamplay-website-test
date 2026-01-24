"use client";
import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Globe, MapPin } from "lucide-react";

export default function DSStandardPage() {
    return (
        <React.Suspense fallback={null}>
            <DSStandardContent />
        </React.Suspense>
    );
}

function DSStandardContent() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-accent/30">
            <Navbar />

            <main className="pt-24">

                {/* --- HERO SECTION --- */}
                <section className="relative py-24 lg:py-32 overflow-hidden bg-[#0a0a0f]">
                    <div className="container max-w-6xl mx-auto px-6 relative z-10 text-center">
                        <AnimatedSection>
                            {/* DS Logo at Top */}
                            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-10 relative">
                                <Image
                                    src="/images/DS Logo Registered 1200-Recovered.jpg"
                                    alt="DS Standard Registered Logo"
                                    fill
                                    className="object-contain"
                                    style={{ filter: "invert(1)" }}
                                />
                            </div>

                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-widest mb-8 border border-accent/20">
                                Official Licensed Partner
                            </div>
                            <h1 className="text-5xl md:text-7xl font-serif font-semibold tracking-tight mb-8 text-white">
                                The Gold Standard <br />
                                <span className="text-gray-400">of Ergonomics.</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                                DreamPlay is an authorized partner of the DS Standard Foundation. We build our instruments to the exact specifications that are revolutionizing piano performance at universities worldwide.
                            </p>
                        </AnimatedSection>
                    </div>

                    {/* Abstract Background Element */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
                </section>


                {/* --- THE MARK OF QUALITY (Keys Image) --- */}
                <section className="py-24 bg-white text-black">
                    <div className="container max-w-6xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <AnimatedSection>
                                <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-200">
                                    <Image
                                        src="/images/DSDS6.0-Straightened-1-1024x788.jpg"
                                        alt="DS Logo on Piano Keys"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </AnimatedSection>

                            <AnimatedSection delay={100}>
                                <h2 className="text-3xl md:text-5xl font-bold mb-8 text-black leading-tight">
                                    The Mark of Quality
                                </h2>
                                <p className="text-xl text-gray-800 font-medium mb-8 leading-relaxed border-l-4 border-accent pl-6">
                                    All DreamPlay Keyboards ship with the DS® logo stamped on the bottom two keys.
                                </p>
                                <div className="prose text-lg text-gray-600 leading-relaxed space-y-6">
                                    <p>
                                        This isn't just decoration. It is a certification of precision. It guarantees that the instrument you practice on at home matches the exact specifications of the DS Standard® keyboards found in concert halls and universities.
                                    </p>
                                    <p>
                                        When you see this mark, you know that the octave width is accurate to within <strong>±0.04 inches</strong> of the international standard.
                                    </p>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>


                {/* --- THE ORIGIN STORY (David & Linda) --- */}
                <section className="py-24 bg-[#0a0a0f] border-y border-white/10">
                    <div className="container max-w-6xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <AnimatedSection className="order-2 lg:order-1">
                                <div className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs mb-6">
                                    <MapPin className="w-4 h-4" /> Titusville, Pennsylvania
                                </div>
                                <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 text-white">A Big Idea</h2>

                                <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                                    <p>
                                        It started with a chance meeting in 1991. <strong>David Steinbuhler</strong>, visiting the Shaw Festival, met music director <strong>Christopher Donison</strong>, who had a custom 7/8 keyboard installed in his grand piano.
                                    </p>
                                    <p>
                                        David played it and was amazed by the ease of adaptation. Christopher explained how a whole new world opened before him when he first got the keyboard.
                                    </p>
                                    <p>
                                        Combining Christopher's vision with David's engineering background from his family's textile business, they collaborated to create the <strong>Donison-Steinbuhler (DS) Standard®</strong>.
                                    </p>
                                    <p>
                                        Today, David and his wife Linda continue to champion this ergonomic revolution from Titusville, PA, transforming the lives of pianists worldwide.
                                    </p>
                                </div>

                                <div className="mt-10">
                                    <Button asChild variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white hover:text-black rounded-full px-8 py-6 text-base h-auto">
                                        <a href="https://dsstandardfoundation.org/" target="_blank" rel="noopener noreferrer">
                                            Visit the Foundation <ArrowRight className="ml-2 w-5 h-5" />
                                        </a>
                                    </Button>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection delay={100} className="order-1 lg:order-2">
                                <div className="relative aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                                    <Image
                                        src="/images/David-Linda.jpg"
                                        alt="David and Linda Steinbuhler"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8 pt-24">
                                        <p className="text-white font-medium text-lg">David & Linda Steinbuhler</p>
                                        <p className="text-gray-400 text-sm">Founders, DS Standard Foundation</p>
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>


                {/* --- THE DATA (Graph) --- */}
                <section className="py-24 bg-[#111] text-white">
                    <div className="container max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">The Science of Hand Span</h2>
                            <p className="text-xl text-gray-400">Data collected at the 2004 MTNA National Convention</p>
                        </div>

                        <AnimatedSection>
                            <div className="relative w-full aspect-[3/1] min-h-[300px] bg-white rounded-3xl overflow-hidden p-6 md:p-8">
                                <Image
                                    src="/images/Hand-Size-Chart-Data-1024x336.jpg"
                                    alt="Hand Size Chart Data"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <p className="text-center text-base text-gray-500 mt-8 max-w-4xl mx-auto leading-relaxed">
                                The graph illustrates the wide diversity of hand spans among pianists. The colored zones indicate which keyboard size (DS5.5, DS6.0, or Standard) is ergonomically appropriate for each hand span range.
                            </p>
                        </AnimatedSection>
                    </div>
                </section>


                {/* --- THE STANDARDS INFO --- */}
                <section className="py-24 bg-black text-white">
                    <div className="container max-w-6xl mx-auto px-6">
                        <div className="text-center mb-20">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">The Three Adult Standards</h2>
                            <p className="text-gray-400 max-w-2xl mx-auto text-xl">
                                DreamPlay One creates instruments exclusively in the two alternative sizes certified by the foundation.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* DS6.5 */}
                            <AnimatedSection delay={0}>
                                <div className="h-full p-10 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors flex flex-col">
                                    <div className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6">The Old Standard</div>
                                    <h3 className="text-4xl font-bold mb-3">DS6.5™</h3>
                                    <p className="text-xl text-white/80 mb-8">Conventional Size</p>

                                    <ul className="space-y-6 text-base text-gray-400 mt-auto">
                                        <li className="flex gap-4 items-center">
                                            <div className="w-2 h-2 rounded-full bg-gray-600 shrink-0"></div>
                                            <span><strong>6.5 inch</strong> octave span</span>
                                        </li>
                                        <li className="flex gap-4 items-center">
                                            <div className="w-2 h-2 rounded-full bg-gray-600 shrink-0"></div>
                                            <span>Fit for hands &gt; 8.5 inches</span>
                                        </li>
                                    </ul>
                                </div>
                            </AnimatedSection>

                            {/* DS6.0 */}
                            <AnimatedSection delay={100}>
                                <div className="h-full p-10 rounded-[2.5rem] border-2 border-accent bg-accent/10 relative flex flex-col shadow-[0_0_50px_rgba(37,99,235,0.15)]">
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-accent text-white text-sm font-bold px-6 py-2 rounded-full uppercase tracking-wider shadow-xl">
                                        Universal
                                    </div>
                                    <div className="text-sm font-bold uppercase tracking-wider text-accent mb-6">DreamPlay Choice</div>
                                    <h3 className="text-4xl font-bold mb-3 text-white">DS6.0®</h3>
                                    <p className="text-xl text-white/80 mb-8">Universal Size</p>

                                    <ul className="space-y-6 text-base text-gray-300 mt-auto">
                                        <li className="flex gap-4 items-center">
                                            <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                                            <span><strong>6.0 inch</strong> octave span</span>
                                        </li>
                                        <li className="flex gap-4 items-center">
                                            <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                                            <span>Fits 7.6" – 8.5" hands (Average)</span>
                                        </li>
                                        <li className="flex gap-4 items-center">
                                            <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                                            <span><strong>15/16ths</strong> width of standard</span>
                                        </li>
                                    </ul>
                                </div>
                            </AnimatedSection>

                            {/* DS5.5 */}
                            <AnimatedSection delay={200}>
                                <div className="h-full p-10 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors flex flex-col">
                                    <div className="text-sm font-bold uppercase tracking-wider text-rose-400 mb-6">DreamPlay Choice</div>
                                    <h3 className="text-4xl font-bold mb-3">DS5.5®</h3>
                                    <p className="text-xl text-white/80 mb-8">7/8th Size</p>

                                    <ul className="space-y-6 text-base text-gray-400 mt-auto">
                                        <li className="flex gap-4 items-center">
                                            <CheckCircle2 className="w-6 h-6 text-rose-400 shrink-0" />
                                            <span><strong>5.5 inch</strong> octave span</span>
                                        </li>
                                        <li className="flex gap-4 items-center">
                                            <CheckCircle2 className="w-6 h-6 text-rose-400 shrink-0" />
                                            <span>Fits &lt; 7.6" hands (Small)</span>
                                        </li>
                                        <li className="flex gap-4 items-center">
                                            <CheckCircle2 className="w-6 h-6 text-rose-400 shrink-0" />
                                            <span><strong>7/8ths</strong> width of standard</span>
                                        </li>
                                    </ul>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* --- THE VISION: HOME TO STAGE --- */}
                <section className="py-32 bg-[#111]">
                    <div className="container max-w-6xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <div className="order-2 lg:order-1">
                                <AnimatedSection>
                                    <div className="flex items-center gap-3 mb-8">
                                        <Globe className="w-6 h-6 text-accent" />
                                        <span className="text-sm font-bold uppercase tracking-[0.2em] text-white">Our Shared Vision</span>
                                    </div>

                                    <h2 className="text-5xl md:text-6xl font-serif font-bold leading-[1.1] mb-8 text-white">
                                        Practice at Home.<br />
                                        Perform Anywhere.
                                    </h2>

                                    <blockquote className="text-xl md:text-2xl text-gray-400 italic mb-10 pl-6 border-l-4 border-white/20">
                                        "If I practice on a smaller keyboard at home, will I be able to play on a standard piano on stage?"
                                    </blockquote>

                                    <div className="space-y-6 mb-12">
                                        <p className="text-xl text-gray-300 leading-relaxed">
                                            Our vision, aligned with the DS Standard Foundation, is a world where <strong>DS5.5 and DS6.0 keyboards are standard equipment in every concert hall and university</strong>.
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <div className="flex-1 p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                            <div className="flex items-center gap-3 mb-3">
                                                <CheckCircle2 className="w-6 h-6 text-accent" />
                                                <span className="font-bold text-xl text-white">Universities</span>
                                            </div>
                                            <p className="text-lg text-gray-400 leading-snug">
                                                SMU, UNT, and others already use DS keyboards for teaching.
                                            </p>
                                        </div>

                                        <div className="flex-1 p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                            <div className="flex items-center gap-3 mb-3">
                                                <CheckCircle2 className="w-6 h-6 text-accent" />
                                                <span className="font-bold text-xl text-white">Competitions</span>
                                            </div>
                                            <p className="text-lg text-gray-400 leading-snug">
                                                International competitions are beginning to accept DS sizes.
                                            </p>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            </div>

                            {/* Carnegie Hall Image */}
                            <div className="order-1 lg:order-2 relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group">
                                <Image
                                    src="/images/carnegie-hall-performance.png"
                                    alt="Performance on stage"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-8 left-8 text-white/80 font-medium text-sm tracking-wide uppercase">
                                    The Goal: A DS Keyboard on Every Stage
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}