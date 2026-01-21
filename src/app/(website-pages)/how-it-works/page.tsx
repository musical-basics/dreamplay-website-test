"use client";
import React, { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { cn } from "@/lib/utils";

// --- HELPERS ---

const SectionContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <section className="w-full flex justify-center py-12 md:py-24 px-4 bg-black">
        <div className={cn(
            "w-full max-w-[80rem] bg-[#080a0f] border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,1),0_20px_60px_rgba(0,0,0,0.5)] p-6 md:p-16",
            className
        )}>
            {children}
        </div>
    </section>
);

/**
 * Split-Color Donut Chart (Red vs Green)
 * "Fatter" ring design (smaller inner circle)
 */
const DonutChart = ({ percent, label }: { percent: number; label: string }) => {
    const [currentPercent, setCurrentPercent] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const target = percent;
                const duration = 1500;
                const startTime = performance.now();

                const animate = (time: number) => {
                    const elapsed = time - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const ease = 1 - Math.pow(1 - progress, 4); // easeOutQuart
                    setCurrentPercent(target * ease);
                    if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
                observer.disconnect();
            }
        }, { threshold: 0.5 });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [percent]);

    return (
        <div ref={ref} className="flex flex-col items-center">
            <div className="relative w-[220px] h-[220px] flex items-center justify-center">
                {/* Split Conic Gradient */}
                <div
                    className="absolute inset-0 rounded-full transition-all duration-75"
                    style={{
                        background: `conic-gradient(#ff2d55 0% ${currentPercent}%, #34c759 ${currentPercent}% 100%)`
                    }}
                />
                {/* Inner Circle - Smaller inset = Fatter ring */}
                <div className="absolute inset-8 bg-[#0c111c] rounded-full" />

                {/* Center Text */}
                <div className="relative z-10 flex flex-col items-center">
                    <span className="text-5xl font-bold text-[#ff2d55]">{Math.round(currentPercent)}%</span>
                    {label && <span className="text-sm text-gray-500 font-medium uppercase tracking-wide mt-1">{label}</span>}
                </div>
            </div>
        </div>
    );
};

/**
 * Animated Bar for "Unlock Your Potential"
 */
const AnimatedBar = ({ targetWidth, color }: { targetWidth: number; color: string }) => {
    const [width, setWidth] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(() => setWidth(targetWidth), 200);
                observer.disconnect();
            }
        });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [targetWidth]);

    return (
        <div ref={ref} className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
            <div
                className="h-full transition-all duration-1000 ease-out rounded-full"
                style={{ width: `${width}%`, backgroundColor: color }}
            />
        </div>
    );
};

export default function HowItWorksPage() {
    // --- CALCULATOR STATE ---
    const [sliderValue, setSliderValue] = useState(50);
    const [result, setResult] = useState({
        val: 8.0,
        cm: 20.3,
        zone: "B",
        model: "DS6.0",
        desc: "The 'Goldilocks' size. Slightly narrower than standard, giving you the power of a concert pianist without the stretching fatigue.",
        reach: "Play 10ths with new ease",
        activeColor: "#f59e0b", // Amber
        activeTwColor: "text-amber-500",
    });

    // --- LOGIC ---
    const getRealValue = (percent: number) => {
        const visualZoneA_End = 33.33;
        const visualZoneB_End = 66.66;

        if (percent <= visualZoneA_End) {
            return 6.0 + (percent / visualZoneA_End) * (7.6 - 6.0);
        } else if (percent <= visualZoneB_End) {
            const relativeP = (percent - visualZoneA_End) / (visualZoneB_End - visualZoneA_End);
            return 7.6 + relativeP * (8.5 - 7.6);
        } else {
            const relativeP = (percent - visualZoneB_End) / (100 - visualZoneB_End);
            return 8.5 + relativeP * (10.0 - 8.5);
        }
    };

    useEffect(() => {
        const realVal = getRealValue(sliderValue);
        const cm = realVal * 2.54;

        if (realVal < 7.6) {
            setResult({
                val: realVal, cm, zone: "A", model: "DS5.5",
                desc: "Standard keys are physically too wide for you. The DS5.5 solves this by shrinking the octave, instantly removing tension.",
                reach: "Finally play 10ths comfortably",
                activeColor: "#f43f5e", // Rose
                activeTwColor: "text-rose-500",
            });
        } else if (realVal <= 8.5) {
            setResult({
                val: realVal, cm, zone: "B", model: "DS6.0",
                desc: "The 'Goldilocks' size. Slightly narrower than standard, giving you the power of a concert pianist without the stretching fatigue.",
                reach: "Play 10ths with new ease",
                activeColor: "#f59e0b", // Amber
                activeTwColor: "text-amber-500",
            });
        } else {
            setResult({
                val: realVal, cm, zone: "C", model: "DS6.5",
                desc: "You fit the historical standard. Since your hands are naturally large, this model provides the traditional concert grand key width.",
                reach: "Master standard repertoire",
                activeColor: "#2dd4bf", // Teal
                activeTwColor: "text-teal-400",
            });
        }
    }, [sliderValue]);

    return (
        <div className="bg-black min-h-screen text-white selection:bg-blue-500/30">
            <Navbar />

            <main className="pt-24 flex flex-col items-center">

                {/* --- SECTION 1: CALCULATOR --- */}
                <SectionContainer>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">A Keyboard That Fits You.</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            DreamPlay's DS Standard keyboards come in different sizes to match your biology.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8">
                        {/* INPUT CARD */}
                        <div className="lg:col-span-7 rounded-[2rem] border border-white/10 p-8 md:p-10 bg-[rgba(30,41,59,0.4)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col">
                            <div className="flex items-center gap-3 mb-8 relative z-10">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl text-white">📏</div>
                                <div className="text-2xl font-semibold">Find Your Zone</div>
                            </div>

                            <div className="mb-12 relative z-10">
                                <div className="flex justify-between items-end mb-6">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Your hand span</span>
                                    <div className={`text-4xl font-bold ${result.activeTwColor} transition-colors duration-300`}>
                                        {result.val.toFixed(1)}" <span className="text-gray-400 text-lg font-normal">/ {result.cm.toFixed(1)} cm</span>
                                    </div>
                                </div>

                                {/* THE SLIDER CONTAINER */}
                                <div className="relative w-full h-12 flex items-center justify-center">

                                    {/* The Static Tri-Color Glow (Red -> Amber -> Teal) */}
                                    <div
                                        className="absolute left-0 right-0 h-3 rounded-full blur-md opacity-80"
                                        style={{
                                            background: 'linear-gradient(90deg, #f43f5e 0%, #f43f5e 33%, #f59e0b 33%, #f59e0b 66%, #2dd4bf 66%, #2dd4bf 100%)'
                                        }}
                                    ></div>

                                    {/* The Background Track (Visible Line) */}
                                    <div
                                        className="absolute left-0 right-0 h-1.5 rounded-full"
                                        style={{
                                            background: 'linear-gradient(90deg, #f43f5e 0%, #f43f5e 33%, #f59e0b 33%, #f59e0b 66%, #2dd4bf 66%, #2dd4bf 100%)'
                                        }}
                                    ></div>

                                    {/* The Slider Input (Transparent track, custom thumb) */}
                                    <input
                                        type="range"
                                        min="0" max="100" step="0.5"
                                        value={sliderValue}
                                        onChange={(e) => setSliderValue(parseFloat(e.target.value))}
                                        className="w-full h-1.5 bg-transparent rounded-full appearance-none cursor-pointer relative z-10"
                                    />

                                    {/* Thumb Styling */}
                                    <style jsx>{`
                      input[type=range]::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        height: 28px;
                        width: 28px;
                        border-radius: 50%;
                        background: #ffffff;
                        cursor: pointer;
                        border: 4px solid ${result.activeColor}; /* Thumb matches active zone color */
                        box-shadow: 0 0 20px ${result.activeColor};
                        transition: border-color 0.2s ease, box-shadow 0.2s ease;
                        margin-top: -12px; /* Center thumb on track */
                      }
                      input[type=range]::-moz-range-thumb {
                        height: 28px;
                        width: 28px;
                        border-radius: 50%;
                        background: #ffffff;
                        cursor: pointer;
                        border: 4px solid ${result.activeColor};
                        box-shadow: 0 0 20px ${result.activeColor};
                        transition: border-color 0.2s ease, box-shadow 0.2s ease;
                        margin-top: -12px;
                      }
                      /* Chrome/Safari track reset */
                      input[type=range]::-webkit-slider-runnable-track {
                        background: transparent;
                        height: 6px;
                      }
                    `}</style>
                                </div>

                                <div className="flex justify-between text-xs text-gray-500 mt-4 font-medium px-1">
                                    <span>Small (6 in)</span>
                                    <span>Average (8 in)</span>
                                    <span>Large (10 in)</span>
                                </div>
                            </div>

                            <div className="bg-[#151921] rounded-2xl p-6 flex items-center gap-6 mt-auto relative z-10 border border-white/5">
                                <div className="w-20 h-20 relative rounded-xl overflow-hidden bg-black flex-shrink-0">
                                    <Image
                                        src="/images/generated-hand-image.jpg"
                                        alt="Hand span guide"
                                        fill
                                        className="object-cover opacity-80"
                                    />
                                </div>
                                <div>
                                    <div className="text-base font-semibold mb-1 text-white">How to measure</div>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        Spread your hand wide. Measure from the <strong>tip of the thumb</strong> to the <strong>tip of the pinky</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* RESULT CARD */}
                        <div className="lg:col-span-5 rounded-[2rem] border border-white/10 p-8 md:p-10 bg-[#0c111c] flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Your match</div>
                            <div className={`text-5xl font-bold mb-2 ${result.activeTwColor}`}>Zone {result.zone}</div>
                            <div className="text-sm text-gray-400 mb-8 font-medium">Hand span range: {result.val < 7.6 ? '6.0 to 7.6 inches' : result.val <= 8.5 ? '7.6 to 8.5 inches' : '8.5 inches +'}</div>

                            {/* MODEL NAME */}
                            <div className="text-6xl font-bold text-white mb-2 tracking-tight">{result.model}</div>

                            {/* RECOMMENDED LABEL (BLUE) */}
                            <div className="text-blue-400 font-medium text-lg mb-8">Recommended model</div>

                            <p className="text-gray-400 leading-relaxed text-lg mb-8 flex-grow">
                                {result.desc}
                            </p>

                            <div className="mt-auto bg-[#151921] border border-white/5 rounded-2xl p-5 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-[#222] flex items-center justify-center text-green-500 text-xl shadow-inner">✓</div>
                                <div>
                                    <div className="text-xs text-gray-500 font-medium uppercase mb-0.5">Capability Unlocked</div>
                                    <div className="text-base font-semibold text-white">{result.reach}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SectionContainer>


                {/* --- SECTION 2: UNLOCK YOUR POTENTIAL --- */}
                <SectionContainer>
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Unlock Your Potential</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Matching your hand size to the correct keyboard unlocks greater comfort, accuracy, and musical expression.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                        {/* Zone A Card */}
                        <div className="rounded-[2rem] border border-white/10 bg-[#0c111c] p-8 md:p-10 flex flex-col gap-8 shadow-xl">
                            <div className="pb-6 border-b border-white/5">
                                <h3 className="text-4xl font-bold text-rose-500 mb-2">Zone A Players</h3>
                                <p className="text-gray-300 text-lg font-medium">Petite Hands / DS5.5 Standard</p>
                            </div>

                            <div className="space-y-8">
                                {/* Bar 1 */}
                                <div>
                                    <div className="flex justify-between text-sm text-gray-500 mb-3 font-medium tracking-wide">
                                        <span>Conventional (DS6.5)</span>
                                        <span>8 Notes</span>
                                    </div>
                                    <AnimatedBar targetWidth={60} color="#4b5563" />
                                </div>
                                {/* Bar 2 */}
                                <div>
                                    <div className="flex justify-between text-sm text-rose-500 font-bold mb-3 tracking-wide">
                                        <span>DS5.5 Model</span>
                                        <span>10 Notes</span>
                                    </div>
                                    <AnimatedBar targetWidth={100} color="#f43f5e" />
                                </div>
                            </div>
                        </div>

                        {/* Zone B Card */}
                        <div className="rounded-[2rem] border border-white/10 bg-[#0c111c] p-8 md:p-10 flex flex-col gap-8 shadow-xl">
                            <div className="pb-6 border-b border-white/5">
                                <h3 className="text-4xl font-bold text-amber-500 mb-2">Zone B Players</h3>
                                <p className="text-gray-300 text-lg font-medium">Average Hands / DS6.0 Standard</p>
                            </div>

                            <div className="space-y-8">
                                {/* Bar 1 */}
                                <div>
                                    <div className="flex justify-between text-sm text-gray-500 mb-3 font-medium tracking-wide">
                                        <span>Conventional (DS6.5)</span>
                                        <span>9 Notes</span>
                                    </div>
                                    <AnimatedBar targetWidth={75} color="#4b5563" />
                                </div>
                                {/* Bar 2 */}
                                <div>
                                    <div className="flex justify-between text-sm text-amber-500 font-bold mb-3 tracking-wide">
                                        <span>DS6.0 Model</span>
                                        <span>10 Notes</span>
                                    </div>
                                    <AnimatedBar targetWidth={100} color="#f59e0b" />
                                </div>
                            </div>
                        </div>
                    </div>
                </SectionContainer>


                {/* --- SECTION 3: THE HIDDEN BARRIER (Charts) --- */}
                <SectionContainer>
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">The Hidden Barrier</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-16 lg:gap-24 mb-20">
                        {/* Chart 1: Females */}
                        <div className="flex flex-col items-center">
                            <div className="text-center mb-10">
                                <div className="text-6xl font-bold mb-3 text-white">87%</div>
                                <div className="text-xl font-medium text-gray-300 mb-3">of females</div>
                                <p className="text-gray-500 text-sm max-w-[280px] mx-auto leading-relaxed">
                                    Have hand spans smaller than the 8.5 inch minimum that standard keyboards expect.
                                </p>
                            </div>

                            <div className="bg-[#0c111c] border border-white/10 rounded-[2.5rem] p-10 w-full max-w-sm flex flex-col items-center hover:border-white/20 transition-all duration-500 shadow-2xl">
                                <DonutChart percent={87} label="" />
                                <div className="flex gap-8 text-xs font-medium text-gray-400 mt-8">
                                    <div className="flex items-center gap-2.5"><span className="w-2.5 h-2.5 rounded-full bg-[#ff2d55]"></span>Too small</div>
                                    <div className="flex items-center gap-2.5"><span className="w-2.5 h-2.5 rounded-full bg-[#34c759]"></span>Comfortable</div>
                                </div>
                            </div>
                        </div>

                        {/* Chart 2: Males */}
                        <div className="flex flex-col items-center">
                            <div className="text-center mb-10">
                                <div className="text-6xl font-bold mb-3 text-white">24%</div>
                                <div className="text-xl font-medium text-gray-300 mb-3">of males</div>
                                <p className="text-gray-500 text-sm max-w-[280px] mx-auto leading-relaxed">
                                    Also fall below the comfortable reach threshold for a standard 6.5 inch keyboard.
                                </p>
                            </div>

                            <div className="bg-[#0c111c] border border-white/10 rounded-[2.5rem] p-10 w-full max-w-sm flex flex-col items-center hover:border-white/20 transition-all duration-500 shadow-2xl">
                                <DonutChart percent={24} label="" />
                                <div className="flex gap-8 text-xs font-medium text-gray-400 mt-8">
                                    <div className="flex items-center gap-2.5"><span className="w-2.5 h-2.5 rounded-full bg-[#ff2d55]"></span>Too small</div>
                                    <div className="flex items-center gap-2.5"><span className="w-2.5 h-2.5 rounded-full bg-[#34c759]"></span>Comfortable</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-16 mt-8 grid md:grid-cols-2 gap-12 text-center md:text-left">
                        <div className="px-4">
                            <div className="text-6xl font-bold mb-3 text-white">8.5"</div>
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">The Threshold</div>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                Minimum hand span needed to play a conventional 6.5 inch keyboard from Yamaha or Steinway with real comfort.
                            </p>
                        </div>
                        <div className="px-4">
                            <div className="text-6xl font-bold mb-3 text-white">25 to 30%</div>
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Larger Reach Required</div>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                Hand span often needs to be at least one quarter larger than the octave just to reach 8ths, 9ths, and 10ths without strain.
                            </p>
                        </div>
                    </div>
                </SectionContainer>


                {/* --- SECTION 4: PUBLISHED RESEARCH --- */}
                <SectionContainer className="bg-transparent border-0 shadow-none p-0">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-white">Published Research</h2>
                        <p className="text-gray-400 text-lg">Decades of peer reviewed research explain why standard keyboards hold most pianists back.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        {/* Study 1 */}
                        <div className="bg-[#0c111c] border border-white/10 rounded-[2rem] p-10 flex flex-col hover:bg-[#111621] hover:translate-y-[-4px] transition-all duration-300 group">
                            <h3 className="text-2xl font-bold text-white mb-3">Hand size and performance related injuries</h3>
                            <div className="text-sm font-medium text-gray-500 mb-6 uppercase tracking-wider">Applied Ergonomics, 2021</div>
                            <p className="text-gray-300 leading-relaxed mb-10 flex-grow text-lg">
                                Pianists with smaller hands show <strong>reduced muscular effort and lower perceived strain</strong> when they move to 5.5 inch octave keyboards.
                            </p>
                            <a href="https://www.sciencedirect.com/science/article/abs/pii/S0003687021001654" target="_blank" className="inline-flex items-center gap-2 bg-white text-black px-6 py-3.5 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors w-fit group-hover:shadow-lg">
                                Read full study <span className="text-lg leading-none mb-0.5">→</span>
                            </a>
                        </div>

                        {/* Study 2 */}
                        <div className="bg-[#0c111c] border border-white/10 rounded-[2rem] p-10 flex flex-col hover:bg-[#111621] hover:translate-y-[-4px] transition-all duration-300 group">
                            <h3 className="text-2xl font-bold text-white mb-3">Gender differences and career impact</h3>
                            <div className="text-sm font-medium text-gray-500 mb-6 uppercase tracking-wider">Susan Tomes</div>
                            <p className="text-gray-300 leading-relaxed mb-10 flex-grow text-lg">
                                Studies note that <strong>internationally acclaimed women pianists tend to have larger hands</strong>, aligning with a repertoire that expects wide reaches.
                            </p>
                            <a href="https://www.susantomes.com/blog/hand-size-gender-differences-pianists-acclaim/" target="_blank" className="inline-flex items-center gap-2 bg-white text-black px-6 py-3.5 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors w-fit group-hover:shadow-lg">
                                Read article <span className="text-lg leading-none mb-0.5">→</span>
                            </a>
                        </div>
                    </div>
                </SectionContainer>


                {/* --- CTA --- */}
                <section className="py-32 text-center border-t border-white/10 w-full bg-[#080a0f]">
                    <h2 className="text-4xl md:text-5xl font-bold mb-10 text-white">Ready to Play Pain-Free?</h2>
                    <a href="/checkout-pages/customize" className="inline-block bg-white text-black px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-200 hover:scale-105 transition-all shadow-xl shadow-white/10">
                        Reserve Your DreamPlay One
                    </a>
                </section>

            </main>
            <Footer />
        </div>
    );
}
