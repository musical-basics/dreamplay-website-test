"use client";
import React, { useEffect, useState } from "react";
import { SpecialOfferHeader } from "@/components/special-offer/header";
import { SpecialOfferFooter } from "@/components/special-offer/footer";
import { subscribeToNewsletter } from "@/actions/email-actions";
import Link from "next/link";

function InlineShippingCTA() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            const res = await subscribeToNewsletter({
                email,
                first_name: "",
                tags: ["Free Shipping Lead"],
            });
            if (!res.success) throw new Error(res.error || "Failed");
            setIsDone(true);
        } catch (err: any) {
            setError(err.message || "Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="bg-[#0a0a0f] text-white py-20 border-y border-white/5">
            <div className="max-w-2xl mx-auto px-6 text-center reveal-el opacity-0 translate-y-8 transition-all duration-700">
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">VIP Offer</p>
                <h2 className="font-serif text-3xl md:text-4xl tracking-tight leading-tight text-white mb-4">
                    Waive your Global Shipping Fees.
                </h2>
                <p className="font-sans text-base text-white/50 leading-relaxed mb-10 max-w-lg mx-auto">
                    Join the Founder&apos;s Club to unlock a VIP pass that covers 100% of your shipping costs.
                </p>

                {!isDone ? (
                    <>
                        {error && (
                            <div className="mb-4 p-3 border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-sans">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                required
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 px-4 py-4 rounded-none border border-white/20 bg-transparent placeholder-white/30 text-white focus:ring-1 focus:ring-white focus:border-white outline-none transition-all font-sans text-sm"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-white text-black font-sans text-xs uppercase tracking-widest font-bold px-6 py-4 rounded-none hover:bg-white/90 transition-colors disabled:opacity-70 cursor-pointer whitespace-nowrap"
                            >
                                {isLoading ? "..." : "Get VIP Pass"}
                            </button>
                        </form>
                        <p className="text-[10px] text-white/30 uppercase tracking-widest mt-4">No spam. Unsubscribe anytime.</p>
                    </>
                ) : (
                    <div className="py-4">
                        <p className="text-lg font-serif text-white mb-2">Check your inbox.</p>
                        <p className="text-sm text-white/50">We sent you instructions to lock in your free shipping pass.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
export default function ShippingPage() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-8');
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.reveal-el');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen font-sans selection:bg-white/20">
            <SpecialOfferHeader forceOpaque={true} darkMode={true} className="border-b border-white/10 bg-[#050505] backdrop-blur-md" />

            <main>

                {/* ═══ HERO — LIGHT ═══ */}
                <section className="bg-neutral-50 text-black pt-32 pb-20 overflow-hidden">
                    <div className="max-w-5xl mx-auto px-6 text-center">
                        <h1 className="font-serif text-4xl md:text-6xl tracking-tight leading-tight mb-2 text-black reveal-el opacity-0 translate-y-8 transition-all duration-700">Global Delivery.</h1>
                        <h1 className="font-serif text-4xl md:text-6xl tracking-tight leading-tight mb-12 text-[#0066cc] reveal-el opacity-0 translate-y-8 transition-all duration-700 delay-100">Discounted Shipping.</h1>

                        {/* World Map */}
                        <div className="max-w-4xl mx-auto mb-16 reveal-el opacity-0 translate-y-8 transition-all duration-700 delay-200">
                            <img src="/images/Worldmap.png" alt="World Map showing shipping regions" className="w-full h-auto object-contain" />
                        </div>

                        {/* Map Legend */}
                        <div className="flex flex-wrap justify-center gap-8 mb-16 reveal-el opacity-0 translate-y-8 transition-all duration-700 delay-200">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-[#2F80ED]"></div>
                                <span className="text-sm font-medium text-neutral-500">Discounted Shipping</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-[#00C2CB]"></div>
                                <span className="text-sm font-medium text-neutral-500">Extended Region</span>
                            </div>
                        </div>

                        <p className="font-sans text-lg text-neutral-500 max-w-xl mx-auto mb-12 reveal-el opacity-0 translate-y-8 transition-all duration-700 delay-300">
                            Free delivery to the US, Canada, and Europe. Extended shipping available worldwide.
                        </p>

                        {/* Price Stats */}
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16 reveal-el opacity-0 translate-y-8 transition-all duration-700 delay-300">
                            <div className="text-center">
                                <div className="font-serif text-5xl font-bold text-black">Under $40</div>
                                <div className="text-sm text-neutral-500 mt-2">US &amp; Europe</div>
                            </div>
                            <div className="hidden md:block w-px bg-neutral-300 h-16"></div>
                            <div className="text-center">
                                <div className="font-serif text-5xl font-bold text-black">+$70</div>
                                <div className="text-sm text-neutral-500 mt-2">Extended Regions</div>
                            </div>
                            <div className="hidden md:block w-px bg-neutral-300 h-16"></div>
                            <div className="text-center">
                                <div className="font-serif text-5xl font-bold text-black">$150</div>
                                <div className="text-sm text-neutral-500 mt-2">Rest of World</div>
                            </div>
                        </div>

                        {/* International Warning */}
                        <div className="mt-8 max-w-2xl mx-auto text-center reveal-el opacity-0 translate-y-8 transition-all duration-700 delay-300">
                            <div className="bg-red-50/80 border border-red-200 rounded-none p-4 inline-block">
                                <p className="text-sm text-red-700/80 font-medium">
                                    ⚠️ <strong>International Backers (EU/UK/Asia):</strong>
                                </p>
                                <p className="text-xs text-red-600/70 mt-1">
                                    Shipping estimates do not include local VAT, Import Duties, or Customs fees.
                                    These are collected by your local carrier upon delivery.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══ SHIPPING ZONES — DARK ═══ */}
                <section className="bg-[#050505] text-white py-24">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-20 reveal-el opacity-0 translate-y-8 transition-all duration-700">
                            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#0066cc] mb-4 font-semibold">Shipping Zones</p>
                            <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight text-white">We ship to over 50 countries</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Discounted */}
                            <div className="reveal-el opacity-0 translate-y-8 transition-all duration-700 delay-100 border border-white/10 bg-white/5 rounded-none p-8 hover:border-white/20 transition-all">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#2F80ED]"></div>
                                        <span className="text-xs uppercase tracking-wider text-white/50">Discounted</span>
                                    </div>
                                </div>
                                <div className="font-serif text-5xl font-bold mb-2 text-white">Under $40</div>
                                <p className="text-white/40 text-sm mb-8">Estimated Shipping July 2026</p>
                                <div className="space-y-3">
                                    {['Austria', 'Belgium', 'Canada', 'Denmark', 'Finland', 'France', 'Germany', 'Ireland', 'Netherlands', 'UK', 'US (Continental)'].map(c => (
                                        <div key={c} className="flex items-center gap-3 text-sm text-white/60"><span className="text-[#2F80ED]">✓</span> {c}</div>
                                    ))}
                                </div>
                            </div>

                            {/* Extended */}
                            <div className="reveal-el opacity-0 translate-y-8 transition-all duration-700 delay-200 border border-white/10 bg-white/5 rounded-none p-8 hover:border-white/20 transition-all">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#00C2CB]"></div>
                                        <span className="text-xs uppercase tracking-wider text-white/50">Extended</span>
                                    </div>
                                </div>
                                <div className="font-serif text-5xl font-bold mb-2 text-white">$50–$70</div>
                                <p className="text-white/40 text-sm mb-8">Estimated Shipping August 2026</p>
                                <div className="space-y-3">
                                    {['Australia', 'China', 'Japan', 'South Korea', 'New Zealand', 'Singapore', 'Switzerland', 'Taiwan', 'Hawaii (US)'].map(c => (
                                        <div key={c} className="flex items-center gap-3 text-sm text-white/60"><span className="text-[#00C2CB]">✓</span> {c}</div>
                                    ))}
                                </div>
                            </div>

                            {/* Standard */}
                            <div className="reveal-el opacity-0 translate-y-8 transition-all duration-700 delay-300 border border-white/10 bg-white/5 rounded-none p-8 hover:border-white/20 transition-all">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-white/40"></div>
                                        <span className="text-xs uppercase tracking-wider text-white/50">Standard</span>
                                    </div>
                                </div>
                                <div className="font-serif text-5xl font-bold mb-2 text-white">$150</div>
                                <p className="text-white/40 text-sm mb-8">Estimated Shipping October 2026</p>
                                <div className="space-y-3">
                                    {['Brazil', 'India', 'Mexico', 'UAE', 'Saudi Arabia', 'Turkey', 'Argentina', 'Egypt'].map(c => (
                                        <div key={c} className="flex items-center gap-3 text-sm text-white/60"><span className="text-white/40">✓</span> {c}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══ INLINE VIP SHIPPING CTA — DARK ACCENT ═══ */}
                <InlineShippingCTA />

                {/* ═══ PACKAGING — LIGHT ═══ */}
                <section className="bg-white text-black py-24">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="reveal-el opacity-0 translate-y-8 transition-all duration-700">
                                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#0066cc] mb-4 font-semibold">Premium Protection</p>
                                <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight text-black mb-6">Packaged with Care</h2>
                                <p className="font-sans text-base text-neutral-600 leading-relaxed mb-10">
                                    Every DreamPlay One is carefully packaged in custom-designed protective casing to ensure it arrives in perfect condition, no matter where you are in the world.
                                </p>
                                <div className="space-y-8">
                                    {[
                                        { title: 'Custom Foam Inserts', desc: 'Precision-cut protection for every component' },
                                        { title: 'Double-Wall Boxing', desc: 'Extra durability for long-distance shipping' },
                                        { title: 'Insured Delivery', desc: 'Full coverage throughout the journey' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="w-10 h-10 rounded-none border border-neutral-200 bg-neutral-50 flex items-center justify-center flex-shrink-0 text-[#0066cc]">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                            </div>
                                            <div>
                                                <h3 className="font-sans font-bold text-black text-lg">{item.title}</h3>
                                                <p className="font-sans text-sm text-neutral-500">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="reveal-el opacity-0 translate-y-8 transition-all duration-700 delay-200">
                                <div className="border border-neutral-200 overflow-hidden bg-neutral-50">
                                    <img src="/images/piano-in-the-box.png" alt="DreamPlay One Packaging" className="w-full aspect-square object-cover scale-110" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══ PRODUCT AVAILABILITY — DARK ═══ */}
                <section className="bg-[#050505] text-white py-24">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16 reveal-el opacity-0 translate-y-8 transition-all duration-700">
                            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">Coming Soon</p>
                            <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight text-white">Product Availability</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* DS5.5 */}
                            <div className="reveal-el opacity-0 translate-y-8 transition-all duration-700 delay-100 border border-white/10 bg-white/5 rounded-none p-8 hover:border-white/20 transition-all">
                                <div className="aspect-[4/3] bg-[#0a0a0a] rounded-none mb-6 flex items-center justify-center p-4">
                                    <img src="/images/Group-2.png" alt="DS5.5" className="max-h-full object-contain" />
                                </div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-serif text-2xl font-bold">DS5.5</h3>
                                    <div className="text-right">
                                        <div className="text-[10px] uppercase tracking-wider text-white/50">Ships</div>
                                        <div className="font-sans font-medium text-sm">August 2026</div>
                                    </div>
                                </div>
                                <p className="text-white/50 text-sm border-t border-white/10 pt-4 mt-4">Zone A: Smaller Hands</p>
                            </div>

                            {/* DS6.0 */}
                            <div className="reveal-el opacity-0 translate-y-8 transition-all duration-700 delay-200 border border-white/10 bg-white/5 rounded-none p-8 hover:border-white/20 transition-all">
                                <div className="aspect-[4/3] bg-[#0a0a0a] rounded-none mb-6 flex items-center justify-center p-4">
                                    <img src="/images/Group-3.png" alt="DS6.0" className="max-h-full object-contain" />
                                </div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-serif text-2xl font-bold">DS6.0</h3>
                                    <div className="text-right">
                                        <div className="text-[10px] uppercase tracking-wider text-white/50">Ships</div>
                                        <div className="font-sans font-medium text-sm">August 2026</div>
                                    </div>
                                </div>
                                <p className="text-white/50 text-sm border-t border-white/10 pt-4 mt-4">Zone B: Medium Hands</p>
                            </div>

                            {/* DS6.5 */}
                            <div className="reveal-el opacity-0 translate-y-8 transition-all duration-700 delay-300 border border-white/10 bg-white/5 rounded-none p-8 hover:border-white/20 transition-all">
                                <div className="aspect-[4/3] bg-[#0a0a0a] rounded-none mb-6 flex items-center justify-center p-4">
                                    <img src="/images/DS6.5-Black.png" alt="DS6.5" className="max-h-full object-contain" />
                                </div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-serif text-2xl font-bold">DS6.5</h3>
                                    <div className="text-right">
                                        <div className="text-[10px] uppercase tracking-wider text-white/50">Ships</div>
                                        <div className="font-sans font-medium text-[#0066cc] text-sm">August 2026</div>
                                    </div>
                                </div>
                                <p className="text-white/50 text-sm border-t border-white/10 pt-4 mt-4">Zone C: Standard Size</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══ PAYMENT & POLICIES — LIGHT ═══ */}
                <section className="bg-neutral-50 text-black py-24">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-16 reveal-el opacity-0 translate-y-8 transition-all duration-700">
                            <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight text-black">Payment &amp; Policies</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { title: 'Payment Terms', desc: '$299 (50%) deposit upfront. The remaining $299 is due once we ship your DreamPlay One.', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
                                { title: 'Duties & Taxes', desc: 'Buyer is responsible for all import duties, taxes, and customs fees. Not included in price.', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                                { title: '90-Day Returns', desc: 'No questions asked, full refund within 90 days of receiving your instrument.', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' }
                            ].map((item, i) => (
                                <div key={i} className={`reveal-el opacity-0 translate-y-8 transition-all duration-700 border border-neutral-200 bg-white rounded-none p-8 hover:border-neutral-400 transition-all`} style={{ transitionDelay: `${(i + 1) * 100}ms` }}>
                                    <div className="w-12 h-12 bg-neutral-100 rounded-none flex items-center justify-center text-[#0066cc] mb-6 border border-neutral-200">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path></svg>
                                    </div>
                                    <h3 className="font-serif text-xl font-bold text-black mb-3">{item.title}</h3>
                                    <p className="font-sans text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══ REFUND POLICY — DARK ═══ */}
                <section className="bg-[#050505] text-white py-24 border-t border-white/10">
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="text-center mb-16 reveal-el opacity-0 translate-y-8 transition-all duration-700">
                            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">Zero Risk</p>
                            <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight text-white mb-6">Our Refund Promise</h2>
                            <p className="font-sans text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
                                We are absolutely confident that you will love your DreamPlay One. Our refund policy reflects that confidence.
                            </p>
                        </div>

                        <div className="reveal-el opacity-0 translate-y-8 transition-all duration-700 delay-100 border border-white/10 bg-white/5 p-8 md:p-12 mb-8">
                            <div className="space-y-10">
                                <div className="flex gap-6 items-start">
                                    <div className="w-12 h-12 bg-white/10 rounded-none flex items-center justify-center flex-shrink-0 border border-white/10">
                                        <svg className="w-6 h-6 text-[#34c759]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-xl font-bold text-white mb-2">90-Day Full Refund</h3>
                                        <p className="font-sans text-sm text-white/60 leading-relaxed">
                                            If for any reason you are not completely satisfied with your DreamPlay One, return it within 90 days for a full refund — no questions asked. We want you to have plenty of time to experience the difference.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6 items-start">
                                    <div className="w-12 h-12 bg-white/10 rounded-none flex items-center justify-center flex-shrink-0 border border-white/10">
                                        <svg className="w-6 h-6 text-[#34c759]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8 8-4-4m-4 4l4-4 4 4 8-8"></path></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-xl font-bold text-white mb-2">Free Return Shipping</h3>
                                        <p className="font-sans text-sm text-white/60 leading-relaxed">
                                            We cover 100% of return shipping costs. You won&apos;t pay a cent to send it back. We believe in our product enough to take on that cost ourselves.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6 items-start">
                                    <div className="w-12 h-12 bg-white/10 rounded-none flex items-center justify-center flex-shrink-0 border border-white/10">
                                        <svg className="w-6 h-6 text-[#34c759]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-xl font-bold text-white mb-2">Free Size Exchanges</h3>
                                        <p className="font-sans text-sm text-white/60 leading-relaxed">
                                            Not sure if the DS5.5 or DS6.0 is right for you? Try one, and if you decide you&apos;d prefer the other size, we&apos;ll exchange it for free — shipping included both ways.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="reveal-el opacity-0 translate-y-8 transition-all duration-700 delay-200 text-center border border-white/10 bg-white/[0.03] p-8">
                            <p className="font-serif text-lg md:text-xl text-white/80 italic leading-relaxed">
                                &ldquo;While we — and every small-handed pianist we know — love the narrower keyboard, we understand that trying something new takes a leap of faith. Our guarantee is designed to make that leap completely risk-free.&rdquo;
                            </p>
                            <p className="font-sans text-sm text-white/40 mt-4 uppercase tracking-wider">The DreamPlay Team</p>
                        </div>
                    </div>
                </section>

                {/* ═══ CTA — DARK ═══ */}
                <section className="bg-[#050505] text-white py-32 border-t border-white/10 text-center">
                    <div className="max-w-3xl mx-auto px-6 reveal-el opacity-0 translate-y-8 transition-all duration-700">
                        <h2 className="font-serif text-3xl md:text-4xl tracking-tight leading-tight mb-6 text-white">Ready to order your DreamPlay One?</h2>
                        <p className="font-sans text-base text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
                            Secure your pre-order today and be among the first to experience the future of piano.
                        </p>
                        <Link href="/customize" className="group inline-flex items-center justify-center gap-2 border border-white bg-white px-8 py-4 font-sans text-xs uppercase tracking-widest text-black transition-colors hover:bg-white/90">
                            Configure Yours
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </Link>
                    </div>
                </section>

            </main>
            <SpecialOfferFooter />
        </div>
    );
}
