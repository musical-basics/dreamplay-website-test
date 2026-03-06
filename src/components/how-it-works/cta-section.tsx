export function CtaSection() {
    return (
        <section className="w-full bg-black text-white py-28 md:py-36 text-center border-t border-white/10">
            <div className="mx-auto max-w-3xl px-6">
                <p className="font-sans text-sm uppercase tracking-[0.3em] text-white/40 mb-4">Get Started</p>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight mb-4 text-white">
                    Ready to Play Pain-Free?
                </h2>
                <p className="font-sans text-base text-white/60 leading-relaxed mb-10 max-w-xl mx-auto">
                    Reserve your DreamPlay One at Founder&apos;s Batch pricing. 100% risk-free — full refund if we don&apos;t ship.
                </p>
                <a
                    href="/premium-offer"
                    className="group inline-flex items-center justify-center gap-2 border border-white bg-white px-10 py-5 font-sans text-sm uppercase tracking-widest text-black transition-colors hover:bg-white/90"
                >
                    Reserve Your DreamPlay One
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>
                </a>
            </div>
        </section>
    )
}
