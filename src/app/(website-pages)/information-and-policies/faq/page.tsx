import { SpecialOfferHeader } from "@/components/special-offer/header";
import Footer from "@/components/Footer";
import FAQList from "@/components/faq-list";

const faqItems = [
    {
        question: "What does DS stand for?",
        answer: `<p class="p-regular text-gray">DS stands for the Donison-Steinbuhler Standard, which was created in 1991 to standardize alternative piano sizes. The DS5.5 and DS6.0 sizes are supported widely by piano competitions such as the Dallas International Competition and universities such as Stanford University, Johns Hopkins Peabody Institute, University of Wisconsin-Madison, University of Memphis, State University of Music (HDMK) in Stuttgart, Germany, and countless others. When purchasing a keyboard stamped with the "DS5.5" or "DS6.0" size, you can feel confident knowing your keyboard was manufactured to the exact precision dictated by the DS standard, and they can play on any DS5.5 or DS6.0 keyboard and have the same experience. <a href="/about-us/ds-standard" class="text-blue-500 underline hover:text-blue-600 transition-colors">Learn more about the DS Standard.</a> For more information: <a href="https://dsstandardfoundation.org/" target="_blank" rel="noopener noreferrer">https://dsstandardfoundation.org/</a></p>`,
    },
    {
        question: "Why not do more sizes such as DS5.7 or DS6.2?",
        answer: `<p class="p-regular text-gray">It comes down to one thing: <strong>compatibility.</strong> We don't want you to fall in love with a piano size at home that you can't find anywhere else.<br><br>We strictly build to the International DS standards (5.5 and 6.0) because these are the sizes being adopted by universities and concert halls. If we built a custom size like a 5.7, you'll need more time to adjust if you had to perform onstage. <br><br>Plus, the data is clear: these two sizes solve the handspan issue for 87% of women and 24% of men. We'd rather build a tool that connects you to the wider music world than a niche instrument that isolates you. <br><br><a href="/about-us/ds-standard" class="text-blue-500 underline hover:text-blue-600 transition-colors">Learn more about the DS Standard.</a></p>`,
    },
    {
        question: "If I practice on this, will I lose my ability to play on a standard keyboard?",
        answer: `<p class="p-regular text-gray"><strong>It's a natural fear, but the data suggests the opposite:</strong> playing on narrower keys often improves your technique on standard ones (DS6.5 conventional size).<br><br>When you practice on a size that fits your hand (like the DS6.0), you learn to play with less tension. That relaxation carries over when you switch back to a standard keyboard. Your fingers and hands develop smooth, seamless micro-adjustments that carry over to a standard keyboard - it's much easier to "rescale" <strong>proper technique</strong> developed from a smaller keyboard to a larger keyboard, than it is to "fix" <strong>broken technique</strong> from spending years practicing on a keyboard that is too large.<br><br><strong>The Real-World Proof:</strong> Our co-founder, Lionel Yu, practices on a DS6.0 but regularly performs on concert-sized Steinway & Yamaha grand pianos in venues like Carnegie Hall and the Barbican Center. He switches between them seamlessly.<br><br>Hubert Ness, Professor of Jazz Piano (HMDK Stuttgart), noted: <em>"Playing the DS6.0 had a positive effect when going back to the normal keyboard."</em><br><br><strong>See the switch in action:</strong><br><strong>Watch:</strong> [Pianist Linda Gould switching between all three sizes instantly] <a href="https://youtu.be/KkIz-uq5M_k" target="_blank" rel="noopener noreferrer">https://youtu.be/KkIz-uq5M_k</a> <br><strong>Watch:</strong> [Professor Carol Leone playing DS6.0 and DS6.5 back-to-back] <a href="https://youtu.be/fZRML4LOkoo" target="_blank" rel="noopener noreferrer">https://youtu.be/fZRML4LOkoo</a></p>`,
    },
    {
        question: "What's the advantage of reaching a 10th?",
        answer: `<p class="p-regular text-gray">Being able to reach a 10th isn't just about playing 10ths. Most modern & classical composers avoided using 10ths or more because they knew that women and children would be playing their pieces, even if they could reach the intervals themselves.<br><br>However, being able to reach a 10th means 9ths and octaves are also much easier. Similarly, the interval between fingers such as the thumb and index finger, or index & pinky, are also commonly used intervals within larger chords.<br><br>For example, the 5-note chord D-G-Bb-D-E has a total interval of a 9th, but pianists who can only reach a 9th will have a hard time playing this chord due to stretching the fingers for the inner notes. They might be able to play it, but only with much strain. With a DS6.0 keyboard, they will be able to play this chord with ease.</p>`,
    },
    {
        question: "How does pre-ordering work?",
        answer: `<p class="p-regular text-gray">Reserve your keyboard by pre-ordering now. Your support helps us finish our prototype and start production. We'll keep you updated, with shipping planned for August 2026. <a href="/information-and-policies/shipping" class="text-blue-500 underline hover:text-blue-600 transition-colors">Read our full Shipping & Refund Policy.</a></p>`,
    },
    {
        question: "Does it feel like a real piano?",
        answer: `<p class="p-regular text-gray">Yes! You'll enjoy weighted, graded keys and a natural touch. Plus, the LED lights above each key make learning and performing more fun for everyone.</p>`,
    },
];

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-white text-neutral-900 font-sans">
            <SpecialOfferHeader forceOpaque={true} darkMode={true} className="border-b border-white/10 bg-[#050505] backdrop-blur-md" />

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
            <Footer />
        </div>
    );
}
