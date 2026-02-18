import { SpecialOfferHeader } from "@/components/special-offer/header";
import { SpecialOfferFooter } from "@/components/special-offer/footer";

export default function ShippingPage() {
    return (
        <div className="min-h-screen font-sans selection:bg-white/20">
            <SpecialOfferHeader forceOpaque={true} className="border-b border-white/10 bg-[#050505] backdrop-blur-md" />

            <main>

                {/* ═══ HERO — DARK ═══ */}
                <section className="bg-[#050505] text-white pt-32 pb-24">
                    <div className="max-w-5xl mx-auto px-6 text-center">
                        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">Policies</p>
                        <h1 className="font-serif text-5xl md:text-6xl tracking-tight leading-tight mb-6 text-white">Shipping &amp; Delivery</h1>
                        <p className="font-sans text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
                            We ship worldwide. All orders are carefully packed and shipped from our fulfillment center.
                        </p>
                    </div>
                </section>

                {/* ═══ SHIPPING ZONES — LIGHT ═══ */}
                <section className="bg-white text-black py-20">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Zone 1 */}
                            <div className="rounded-none border border-neutral-200 bg-neutral-50 p-8 flex flex-col hover:border-neutral-400 transition-all">
                                <div className="font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3">Zone 1</div>
                                <h3 className="font-serif text-2xl font-bold text-black mb-2">United States</h3>
                                <p className="font-sans text-sm text-neutral-500 mb-6">Continental US (Lower 48)</p>
                                <div className="mt-auto pt-6 border-t border-neutral-200">
                                    <div className="flex justify-between items-baseline mb-3">
                                        <span className="font-sans text-sm text-neutral-600">Standard Shipping</span>
                                        <span className="font-bold text-black text-lg">Free</span>
                                    </div>
                                    <div className="flex justify-between items-baseline">
                                        <span className="font-sans text-sm text-neutral-600">Estimated Delivery</span>
                                        <span className="font-sans text-sm text-neutral-600">5-7 business days</span>
                                    </div>
                                </div>
                            </div>

                            {/* Zone 2 */}
                            <div className="rounded-none border border-neutral-200 bg-neutral-50 p-8 flex flex-col hover:border-neutral-400 transition-all">
                                <div className="font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3">Zone 2</div>
                                <h3 className="font-serif text-2xl font-bold text-black mb-2">Canada &amp; Mexico</h3>
                                <p className="font-sans text-sm text-neutral-500 mb-6">North America</p>
                                <div className="mt-auto pt-6 border-t border-neutral-200">
                                    <div className="flex justify-between items-baseline mb-3">
                                        <span className="font-sans text-sm text-neutral-600">Standard Shipping</span>
                                        <span className="font-bold text-black text-lg">$49</span>
                                    </div>
                                    <div className="flex justify-between items-baseline">
                                        <span className="font-sans text-sm text-neutral-600">Estimated Delivery</span>
                                        <span className="font-sans text-sm text-neutral-600">7-14 business days</span>
                                    </div>
                                </div>
                            </div>

                            {/* Zone 3 */}
                            <div className="rounded-none border border-neutral-200 bg-neutral-50 p-8 flex flex-col hover:border-neutral-400 transition-all">
                                <div className="font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3">Zone 3</div>
                                <h3 className="font-serif text-2xl font-bold text-black mb-2">International</h3>
                                <p className="font-sans text-sm text-neutral-500 mb-6">Europe, Asia, Oceania &amp; more</p>
                                <div className="mt-auto pt-6 border-t border-neutral-200">
                                    <div className="flex justify-between items-baseline mb-3">
                                        <span className="font-sans text-sm text-neutral-600">Standard Shipping</span>
                                        <span className="font-bold text-black text-lg">$99</span>
                                    </div>
                                    <div className="flex justify-between items-baseline">
                                        <span className="font-sans text-sm text-neutral-600">Estimated Delivery</span>
                                        <span className="font-sans text-sm text-neutral-600">14-21 business days</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══ DETAILS — DARK ═══ */}
                <section className="bg-[#050505] text-white py-20">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Packaging */}
                            <div className="rounded-none border border-white/10 bg-white/5 p-8">
                                <h3 className="font-serif text-xl font-bold text-white mb-6">Packaging</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0"></div>
                                        <span className="font-sans text-sm text-white/60 leading-relaxed">Each keyboard is packed in a custom-fit, shock-absorbing foam case.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0"></div>
                                        <span className="font-sans text-sm text-white/60 leading-relaxed">Double-boxed for maximum protection during transit.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0"></div>
                                        <span className="font-sans text-sm text-white/60 leading-relaxed">Includes all accessories, cables, and documentation.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Tracking & Support */}
                            <div className="rounded-none border border-white/10 bg-white/5 p-8">
                                <h3 className="font-serif text-xl font-bold text-white mb-6">Tracking &amp; Support</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0"></div>
                                        <span className="font-sans text-sm text-white/60 leading-relaxed">Full tracking provided via email once your order ships.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0"></div>
                                        <span className="font-sans text-sm text-white/60 leading-relaxed">Email us at <strong className="text-white">support@dreamplaypianos.com</strong> for any shipping questions.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0"></div>
                                        <span className="font-sans text-sm text-white/60 leading-relaxed">Insurance included on all shipments.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══ RETURNS — LIGHT ═══ */}
                <section className="bg-white text-black py-20">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="rounded-none border border-neutral-200 bg-neutral-50 p-10 text-center">
                            <h3 className="font-serif text-2xl font-bold text-black mb-4">Returns &amp; Exchanges</h3>
                            <p className="font-sans text-base text-neutral-600 leading-relaxed max-w-xl mx-auto mb-8">
                                We offer a 30-day return policy on all keyboards. Items must be in original condition and packaging. Return shipping is the responsibility of the buyer.
                            </p>
                            <a href="/information-and-policies/faq" className="group inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 font-sans text-xs uppercase tracking-widest transition-colors hover:bg-neutral-800">
                                View FAQ for details
                            </a>
                        </div>
                    </div>
                </section>

                {/* ═══ CTA — DARK ═══ */}
                <section className="bg-[#050505] text-white py-32 border-t border-white/10 text-center">
                    <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">Ready?</p>
                    <h2 className="font-serif text-3xl md:text-4xl tracking-tight leading-tight mb-8 text-white">Start your journey today.</h2>
                    <a href="/customize" className="group inline-flex items-center justify-center gap-2 border border-white bg-white px-8 py-4 font-sans text-xs uppercase tracking-widest text-black transition-colors hover:bg-white/90">
                        Configure Yours
                    </a>
                </section>

            </main>
            <SpecialOfferFooter />
        </div>
    );
}
