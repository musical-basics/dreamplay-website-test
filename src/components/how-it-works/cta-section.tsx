export function CtaSection() {
    return (
        <section className="w-full bg-black text-white py-28 md:py-36 text-center border-t border-white/10">
            <div
                className="mx-auto max-w-3xl px-6 py-16 md:py-20 rounded-2xl border border-white/10"
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.08) 100%)',
                    backdropFilter: 'blur(24px) saturate(1.5)',
                    WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
                    boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.3)',
                }}
            >
                <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/40">Get Started</p>
                <h2 className="mt-4 font-sans text-3xl leading-tight text-white md:text-4xl lg:text-5xl text-balance font-bold">
                    Ready to Play Pain-Free?
                </h2>
                <p className="font-sans text-base text-white/60 leading-relaxed mb-10 max-w-xl mx-auto">
                    Reserve your DreamPlay One at Founder&apos;s Batch pricing. 100% risk-free — full refund if we don&apos;t ship.
                </p>
                <a
                    href="/premium-offer"
                    className="group inline-flex items-center justify-center gap-2 border border-white/30 bg-white px-10 py-5 font-sans text-sm uppercase tracking-widest text-black transition-all hover:bg-white/90 rounded-xl"
                >
                    Reserve Your DreamPlay One
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>
                </a>
            </div>
        </section>
    )
}
