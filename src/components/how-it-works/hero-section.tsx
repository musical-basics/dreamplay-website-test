import Image from "next/image"
import { ArrowRight } from "lucide-react"

const keyboards = {
    'DS5.5': {
        name: 'DS5.5',
        tagline: '7/8THS SIZE',
        description: 'Designed for pianists with hands under 7.6 inches. Play octaves and 9ths with ease.',
        imgSrc: '/images/DS5.5-White-p-800.png'
    },
    'DS6.0': {
        name: 'DS6.0',
        tagline: '15/16THS SIZE',
        description: 'Designed for pianists with hands between 7.6 and 8.5 inches. Play octaves effortlessly.',
        imgSrc: '/images/DS6.0-Black-1-p-800.png'
    },
    'DS6.5': {
        name: 'DS6.5',
        tagline: 'STANDARD SIZE',
        description: 'For the small percentage with larger hands. Conventional sizing.',
        imgSrc: '/images/DS6.5-Black-p-800.png'
    },
}

export function HowItWorksHero() {
    return (
        <section className="relative flex flex-col justify-center bg-[#0a0a0f] py-16 md:py-24 text-white w-full">
            <div className="mx-auto w-full max-w-6xl px-6">
                <div className="mb-16 text-center">
                    <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.3em] text-white/50">The Solution</p>
                    <h2 className="mb-6 font-serif text-3xl text-white md:text-5xl">A Keyboard That Fits You.</h2>
                    <p className="mx-auto max-w-xl font-sans text-sm text-white/60">
                        Standard keyboards use a one-size-fits-all key width designed for large hands. DreamPlay&apos;s DS Standard matches your biology.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {Object.entries(keyboards).map(([key, kb]) => {
                        const isLight = key === 'DS5.5' || key === 'DS6.5';
                        return (
                            <a
                                key={key}
                                href="/customize"
                                className={`group relative flex flex-col items-start border text-left transition-all duration-300 ${isLight
                                    ? 'border-black/15 bg-white shadow-lg shadow-black/10 hover:border-black/40 hover:shadow-xl'
                                    : 'border-white/30 bg-white/5 shadow-lg shadow-black/50 hover:border-white/50 hover:bg-white/10'
                                    }`}
                            >
                                {key === 'DS6.0' && (
                                    <div className="absolute left-6 top-6 z-10 border border-white/20 bg-black/50 text-white px-3 py-1 font-sans text-[9px] uppercase tracking-[0.2em] backdrop-blur-md">
                                        Most Popular
                                    </div>
                                )}

                                {/* Image Container */}
                                <div className={`relative flex h-64 w-full items-center justify-center border-b p-8 transition-colors md:h-72 ${isLight
                                    ? 'border-black/10 bg-neutral-50'
                                    : 'border-white/15 bg-black/15'
                                    }`}>
                                    <Image src={kb.imgSrc} alt={kb.name} width={400} height={200} className="w-auto max-w-[90%] max-h-[80%] object-contain transition-transform duration-700 group-hover:scale-105" />
                                </div>

                                <div className="flex w-full flex-1 flex-col p-8 md:p-10">
                                    <h3 className={`mb-2 font-serif text-2xl md:text-3xl ${isLight ? 'text-black' : 'text-white'}`}>{key}</h3>
                                    <p className={`mb-6 font-sans text-[10px] uppercase tracking-widest ${isLight ? 'text-black/50' : 'text-white/50'}`}>{kb.tagline}</p>

                                    <p className={`mb-8 flex-1 font-sans text-sm leading-relaxed ${isLight ? 'text-black/60' : 'text-white/60'}`}>{kb.description}</p>

                                    <div className={`mb-8 flex w-full justify-between border-t pt-6 ${isLight ? 'border-black/10' : 'border-white/10'}`}>
                                        <div>
                                            <div className={`font-serif text-xl ${isLight ? 'text-black' : 'text-white'}`}>88</div>
                                            <div className={`mt-1 font-sans text-[10px] uppercase tracking-widest ${isLight ? 'text-black/40' : 'text-white/40'}`}>Keys</div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`font-serif text-xl ${isLight ? 'text-black' : 'text-white'}`}>{key === 'DS5.5' ? 'Narrowest' : key === 'DS6.0' ? 'Narrow' : 'Standard'}</div>
                                            <div className={`mt-1 font-sans text-[10px] uppercase tracking-widest ${isLight ? 'text-black/40' : 'text-white/40'}`}>Key Width</div>
                                        </div>
                                    </div>

                                    <div className={`mt-auto flex w-full items-center justify-center gap-2 border px-6 py-4 text-center font-sans text-xs uppercase tracking-widest transition-colors ${isLight
                                        ? 'border-black/30 text-black group-hover:border-black group-hover:bg-black group-hover:text-white'
                                        : 'border-white/30 text-white group-hover:border-white group-hover:bg-white/10'
                                        }`}>
                                        Select Size
                                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </a>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
