import { SpecialOfferHeader } from "@/components/special-offer/header";
import { SpecialOfferFooter } from "@/components/special-offer/footer";
import { getFaqItems } from "@/actions/faq-actions";
import FAQList from "@/components/faq-list";

export default async function FAQPage() {
    const faqItems = await getFaqItems();

    return (
        <div className="min-h-screen bg-white text-neutral-900 font-sans">
            <SpecialOfferHeader forceOpaque={true} className="border-b border-white/10 bg-[#050505] backdrop-blur-md" />

            <main className="pt-32 pb-24">
                <div className="max-w-4xl mx-auto px-6">
                    {/* HERO */}
                    <div className="text-center mb-20">
                        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4">Support</p>
                        <h1 className="font-serif text-5xl md:text-6xl tracking-tight leading-tight mb-6 text-black">Frequently Asked Questions</h1>
                        <p className="font-sans text-base md:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                            Everything you need to know about DreamPlay keyboards.
                        </p>
                    </div>

                    {/* FAQ LIST */}
                    <FAQList items={faqItems} />

                    {/* CONTACT */}
                    <div className="mt-20 pt-12 border-t border-neutral-200 text-center">
                        <p className="font-sans text-base text-neutral-600 mb-6">
                            Still have questions? Reach out to us directly.
                        </p>
                        <a href="mailto:support@dreamplaypianos.com" className="group inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 font-sans text-xs uppercase tracking-widest transition-colors hover:bg-neutral-800">
                            Contact Support
                        </a>
                    </div>
                </div>
            </main>
            <SpecialOfferFooter />
        </div>
    );
}
