import Image from "next/image"

export function HowItWorksHero() {
    const sizes = [
        {
            model: "DS5.5",
            label: "7/8THS SIZE",
            desc: "Designed for pianists with hands under 7.6 inches. Play octaves and 9ths with ease.",
            keys: "88",
            width: "Narrowest",
            img: "/images/DS5.5-White-p-800.png",
            selected: false,
        },
        {
            model: "DS6.0",
            label: "15/16THS SIZE",
            desc: "Designed for pianists with hands between 7.6 and 8.5 inches. Play octaves effortlessly.",
            keys: "88",
            width: "Narrow",
            img: "/images/DS6.0-Black-1-p-800.png",
            selected: true,
        },
        {
            model: "DS6.5",
            label: "STANDARD SIZE",
            desc: "For the small percentage with larger hands. Conventional sizing.",
            keys: "88",
            width: "Standard",
            img: "/images/DS6.5-Black-p-800.png",
            selected: false,
        },
    ]

    return (
        <section className="relative bg-black text-white pt-32 pb-20 md:pb-28 w-full">
            <div className="mx-auto max-w-5xl px-6 text-center">
                <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/40">
                    How It Works
                </p>
                <h1 className="mt-4 font-sans text-4xl leading-tight text-white md:text-5xl lg:text-6xl text-balance font-bold">
                    A Keyboard That Fits You.
                </h1>

                {/* Size Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14 mb-14 text-left">
                    {sizes.map((s) => (
                        <div key={s.model} className={`relative flex flex-col bg-white text-neutral-900 rounded-sm overflow-hidden ${s.selected ? 'ring-2 ring-white shadow-2xl scale-[1.03] z-10' : ''}`}>
                            {s.selected && (
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
                                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] bg-neutral-800 text-white px-3 py-1.5 rounded-sm">
                                        Recommended
                                    </span>
                                </div>
                            )}
                            {/* Product image */}
                            <div className="bg-neutral-100 px-6 pt-10 pb-6 flex items-center justify-center min-h-[160px]">
                                <Image
                                    src={s.img}
                                    alt={`DreamPlay ${s.model}`}
                                    width={400}
                                    height={200}
                                    className="w-full h-auto object-contain max-h-[120px]"
                                />
                            </div>
                            {/* Card body */}
                            <div className="flex flex-col flex-grow p-6">
                                <h3 className="font-sans text-2xl font-bold text-neutral-900 mb-1">{s.model}</h3>
                                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">{s.label}</p>
                                <p className="font-sans text-sm text-neutral-500 leading-relaxed mb-6 flex-grow">{s.desc}</p>
                                {/* Stats row */}
                                <div className="flex justify-between items-end mb-5 border-t border-neutral-100 pt-4">
                                    <div>
                                        <div className="font-sans text-2xl font-bold text-neutral-900">{s.keys}</div>
                                        <div className="font-sans text-[10px] uppercase tracking-[0.15em] text-neutral-400">Keys</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-sans text-2xl font-bold text-neutral-900">{s.width}</div>
                                        <div className="font-sans text-[10px] uppercase tracking-[0.15em] text-neutral-400">Key Width</div>
                                    </div>
                                </div>
                                {/* CTA */}
                                <a
                                    href="/premium-offer"
                                    className={`w-full text-center py-3.5 font-sans text-xs uppercase tracking-[0.15em] transition-colors border ${s.selected
                                            ? 'bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-800'
                                            : 'bg-white text-neutral-900 border-neutral-300 hover:bg-neutral-50'
                                        }`}
                                >
                                    {s.selected ? 'Selected' : 'Select Size →'}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="font-sans text-base leading-relaxed text-white/60 max-w-2xl mx-auto md:text-lg">
                    Standard keyboards use a one-size-fits-all key width designed for large hands.
                    DreamPlay&apos;s DS Standard matches your biology — so you can finally play with comfort, power, and control.
                </p>
            </div>
        </section>
    )
}
