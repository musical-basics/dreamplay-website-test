export function ResearchSection() {
    return (
        <section className="w-full bg-black text-white py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-6">
                <div className="text-center mb-16">
                    <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/40">Evidence</p>
                    <h2 className="mt-4 font-sans text-3xl leading-tight text-white md:text-4xl lg:text-5xl text-balance font-bold">Published Research</h2>
                    <p className="mt-6 font-sans text-base text-white/60 max-w-xl mx-auto leading-relaxed">Decades of peer reviewed research explain why standard keyboards hold most pianists back.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-16">
                    {[
                        {
                            title: "Hand size and performance related injuries",
                            source: "Applied Ergonomics, 2021",
                            desc: "Pianists with smaller hands show reduced muscular effort and lower perceived strain when they move to 5.5 inch octave keyboards instead of standard size.",
                            href: "https://www.sciencedirect.com/science/article/abs/pii/S0003687021001654",
                            cta: "Read full study",
                            dark: true,
                        },
                        {
                            title: "Gender differences and career impact",
                            source: "Susan Tomes",
                            desc: "Studies note that internationally acclaimed women pianists tend to have larger hands, which aligns with a repertoire that often expects very wide reaches.",
                            href: "https://www.susantomes.com/blog/hand-size-gender-differences-pianists-acclaim/",
                            cta: "Read article",
                            dark: false,
                        },
                        {
                            title: "Performance quality improvements",
                            source: "PASK findings",
                            desc: "Shorter reaches and reduced wrist travel on compatible keyboards are linked to better control and lower risk of overuse injuries.",
                            href: "https://paskpiano.org/performance-quality/",
                            cta: "Learn more",
                            dark: true,
                        },
                        {
                            title: "Benefits of ergonomically scaled keyboards",
                            source: "Survey of reduced size users",
                            desc: "Players report relief from pain, faster technical progress, and greater comfort when they move to keyboards that match their hand span.",
                            href: "https://www.researchgate.net/publication/264457999",
                            cta: "Read full study",
                            dark: false,
                        },
                    ].map((item) => (
                        <div key={item.title} className={`p-10 flex flex-col transition-all ${item.dark ? 'border border-white/10 bg-white/5 hover:border-white/20' : 'bg-white hover:bg-neutral-50'}`}>
                            <div className={`font-sans text-xl font-bold mb-3 ${item.dark ? 'text-white' : 'text-neutral-900'}`}>{item.title}</div>
                            <div className={`font-sans text-xs uppercase tracking-[0.3em] mb-4 ${item.dark ? 'text-white/40' : 'text-neutral-400'}`}>{item.source}</div>
                            <div className={`font-sans text-sm leading-relaxed mb-8 flex-grow ${item.dark ? 'text-white/60' : 'text-neutral-600'}`}>{item.desc}</div>
                            <a href={item.href} target="_blank" className={`group inline-flex items-center justify-center gap-2 border px-8 py-4 font-sans text-xs uppercase tracking-widest transition-colors w-fit ${item.dark ? 'border-white bg-white text-black hover:bg-white/90' : 'border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-800'}`}>
                                {item.cta}
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>
                            </a>
                        </div>
                    ))}
                </div>

                {/* Academic Recognition */}
                <div className="bg-white p-10">
                    <h3 className="font-sans text-2xl font-bold text-neutral-900 mb-2">Academic recognition</h3>
                    <p className="font-sans text-sm text-neutral-600 leading-relaxed">The Donison Steinbuhler standard appears in research and teaching at leading institutions.</p>
                    <div className="grid md:grid-cols-2 gap-8 mt-10">
                        {[
                            { name: "Stanford University", desc: "Research and advocacy around scaled keyboards in music education and injury prevention." },
                            { name: "Johns Hopkins Peabody Institute", desc: "Use of alternative sizes inside curriculum and performance programs." },
                        ].map((inst) => (
                            <div key={inst.name} className="flex gap-4 items-start">
                                <div className="w-6 h-6 bg-neutral-100 flex items-center justify-center flex-shrink-0 border border-neutral-200">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }} className="text-emerald-600"><path d="M20 6 9 17l-5-5" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-sans text-lg font-bold text-neutral-900 mb-1">{inst.name}</h4>
                                    <p className="font-sans text-sm text-neutral-600">{inst.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 text-center">
                        <a href="/about-us/ds-standard" className="group inline-flex items-center justify-center gap-2 border border-neutral-900 bg-neutral-900 px-8 py-4 font-sans text-xs uppercase tracking-widest text-white transition-colors hover:bg-neutral-800">
                            Learn more about the DS Standard
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
