"use client";
import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Globe, Scale, MapPin } from "lucide-react";

export default function DSStandardPage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-accent/30">
            <Navbar />

            <main className="pt-24">

                {/* --- HERO SECTION --- */}
                <section className="relative py-24 lg:py-32 overflow-hidden bg-[#0a0a0f]">
                    <div className="container max-w-6xl mx-auto px-6 relative z-10 text-center">
                        <AnimatedSection>
                            {/* DS Logo at Top */}
                            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-8 relative">
                                <Image
                                    src="/images/DS Logo Registered 1200-Recovered.jpg"
                                    alt="DS Standard Registered Logo"
                                    fill
                                    className="object-contain"
                                    style={{ filter: "invert(1)" }} // Force white logo on dark background
                                />
                            </div>

                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6 border border-accent/20">
                                Official Licensed Partner
                            </div>
                            <h1 className="text-5xl md:text-7xl font-serif font-semibold tracking-tight mb-8 text-white">
                                The Gold Standard <br />
                                <span className="text-gray-400">of Ergonomics.</span>
                            </h1>
                            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
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
                                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
                                    <Image
                                        src="/images/DSDS6.0-Straightened-1-1024x788.jpg"
                                        alt="DS Logo on Piano Keys"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </AnimatedSection>

                            <AnimatedSection delay={100}>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
                                    The Mark of Quality
                                </h2>
                                <p className="text-xl text-gray-800 font-medium mb-6 leading-relaxed">
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


                {/* --- THE DATA (Graph) --- */}
                <section className="py-24 bg-[#111] text-white">
                    <div className="container max-w-7xl mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Science of Hand Span</h2>
                            <p className="text-gray-300">Data collected at the 2004 MTNA National Convention</p>
                        </div>

                        <AnimatedSection>
                            <div className="relative w-full aspect-[3/1] min-h-[300px] bg-white rounded-2xl overflow-hidden p-4">
                                <Image
                                    src="/images/Hand-Size-Chart-Data-1024x336.jpg"
                                    alt="Hand Size Chart Data"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <p className="text-center text-sm text-gray-400 mt-6 max-w-4xl mx-auto leading-relaxed">
                                The graph illustrates the wide diversity of hand spans among pianists. The colored zones indicate which keyboard size (DS5.5, DS6.0, or Standard) is ergonomically appropriate for each hand span range.
                            </p>
                        </AnimatedSection>
                    </div>
                </section>


                {/* --- THE FOUNDERS (David & Linda) --- */}
                <section className="py-24 bg-[#0a0a0f] border-t border-white/10">
                    <div className="container max-w-4xl mx-auto px-6">
                        <div className="bg-[#15151a] rounded-[3rem] overflow-hidden border border-white/10">
                            <div className="relative aspect-[16/9] w-full">
                                <Image
                                    src="/images/David-Linda.jpg"
                                    alt="David and Linda Steinbuhler"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-8 md:p-12 text-center">
                                <div className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs mb-4">
                                    <MapPin className="w-4 h-4" /> Titusville, Pennsylvania
                                </div>
                                <h2 className="text-3xl font-serif font-bold mb-6 text-white">The Originators</h2>
                                <p className="text-lg text-gray-200 leading-relaxed mb-8">
                                    Based in Titusville, PA, <strong>David and Linda Steinbuhler</strong> have dedicated decades to researching hand ergonomics and manufacturing alternative keyboards. Their pioneering work established the DS Standard®, transforming the lives of thousands of pianists who were previously limited by the "one-size-fits-all" convention.
                                </p>
                                <Button asChild variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white hover:text-black rounded-full px-8 py-6 text-base">
                                    <a href="https://dsstandardfoundation.org/" target="_blank" rel="noopener noreferrer">
                                        Visit the Foundation <ArrowRight className="ml-2 w-5 h-5" />
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>


                {/* --- THE STANDARDS INFO --- */}
                <section className="py-24 bg-black text-white">
                    <div className="container max-w-6xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">The Three Adult Standards</h2>
                            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                                DreamPlay One creates instruments exclusively in the two alternative sizes certified by the foundation.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* DS6.5 */}
                            <AnimatedSection delay={0}>
                                <div className="h-full p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors flex flex-col">
                                    <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">The Old Standard</div>
                                    <h3 className="text-3xl font-bold mb-2">DS6.5™</h3>
                                    <p className="text-lg text-white/80 mb-6">Conventional Size</p>

                                    <ul className="space-y-4 text-sm text-gray-300 mt-auto">
                                        <li className="flex gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2 shrink-0"></div>
                                            <span><strong>6.5 inch</strong> octave span</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2 shrink-0"></div>
                                            <span>Fit for hands &gt; 8.5 inches</span>
                                        </li>
                                    </ul>
                                </div>
                            </AnimatedSection>

                            {/* DS6.0 */}
                            <AnimatedSection delay={100}>
                                <div className="h-full p-8 rounded-3xl border-2 border-accent bg-accent/10 relative flex flex-col">
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        Universal
                                    </div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-accent mb-4">DreamPlay Choice</div>
                                    <h3 className="text-3xl font-bold mb-2 text-white">DS6.0®</h3>
                                    <p className="text-lg text-white/80 mb-6">Universal Size</p>

                                    <ul className="space-y-4 text-sm text-gray-200 mt-auto">
                                        <li className="flex gap-3">
                                            <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                                            <span><strong>6.0 inch</strong> octave span</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                                            <span>Fits 7.6" – 8.5" hands (Average)</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                                            <span><strong>15/16ths</strong> the width of standard</span>
                                        </li>
                                    </ul>
                                </div>
                            </AnimatedSection>

                            {/* DS5.5 */}
                            <AnimatedSection delay={200}>
                                <div className="h-full p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors flex flex-col">
                                    <div className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-4">DreamPlay Choice</div>
                                    <h3 className="text-3xl font-bold mb-2">DS5.5®</h3>
                                    <p className="text-lg text-white/80 mb-6">7/8th Size</p>

                                    <ul className="space-y-4 text-sm text-gray-300 mt-auto">
                                        <li className="flex gap-3">
                                            <CheckCircle2 className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                                            <span><strong>5.5 inch</strong> octave span</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <CheckCircle2 className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                                            <span>Fits &lt; 7.6" hands (Small)</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <CheckCircle2 className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                                            <span><strong>7/8ths</strong> the width of standard</span>
                                        </li>
                                    </ul>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* --- THE VISION: HOME TO STAGE --- */}
                <section className="py-24 bg-muted/10">
                    <div className="container max-w-6xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="order-2 lg:order-1 space-y-6">
                                <AnimatedSection>
                                    <div className="flex items-center gap-3 mb-4">
                                        <Globe className="w-6 h-6 text-accent" />
                                        <span className="text-sm font-bold uppercase tracking-widest text-white">Our Shared Vision</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white mb-6">
                                        Practice at Home.<br />
                                        Perform Anywhere.
                                    </h2>
                                    <p className="text-xl text-gray-300 italic mb-6">
                                        "If I practice on a smaller keyboard at home, will I be able to play on a standard piano on stage?"
                                    </p>
                                    <p className="text-xl text-gray-300 leading-relaxed mb-10">
                                        Our vision, aligned with the DS Standard Foundation, is a world where <strong>DS5.5 and DS6.0 keyboards are standard equipment in every concert hall and university</strong>.
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <div className="flex-1 flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                            <CheckCircle2 className="w-6 h-6 text-accent mt-1 shrink-0" />
                                            <div>
                                                <div className="font-bold text-lg text-white mb-2">Universities</div>
                                                <div className="text-base text-gray-400 leading-snug">SMU, UNT, and others already use DS keyboards for teaching.</div>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                            <CheckCircle2 className="w-6 h-6 text-accent mt-1 shrink-0" />
                                            <div>
                                                <div className="font-bold text-lg text-white mb-2">Competitions</div>
                                                <div className="text-base text-gray-400 leading-snug">International competitions are beginning to accept DS sizes.</div>
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            </div>

                            {/* Carnegie Hall Image */}
                            <div className="order-1 lg:order-2 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                                <Image
                                    src="/images/carnegie-hall-performance.png"
                                    alt="Performance on stage"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}