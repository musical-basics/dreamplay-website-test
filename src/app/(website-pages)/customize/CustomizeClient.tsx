"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { SpecialOfferHeader } from "@/components/special-offer/header";
import { getCountdownDate } from "@/actions/admin-actions";
import { useABAnalytics } from "@/hooks/use-ab-analytics";
import { ArrowRight, ArrowLeft, Check, ShieldCheck } from "lucide-react";

interface CustomizeClientProps {
    urls: {
        bundle?: string;
        solo?: string;
        deposit?: string;
    }
}

export default function CustomizeClient({ urls }: CustomizeClientProps) {
    // --- STATE ---
    const [appState, setAppState] = useState({
        handSpan: null as string | null,
        size: null as string | null,
        color: null as string | null,
        selectedTier: 'full',
    });

    const [currentSection, setCurrentSection] = useState(0);
    const [isSizingModalOpen, setIsSizingModalOpen] = useState(false);
    const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
    const [policyUrl, setPolicyUrl] = useState("");

    // Sizing Tool State
    const [sliderValue, setSliderValue] = useState(50);
    const [customerCount, setCustomerCount] = useState(208); // Real backer count
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
    const [countDownDate, setCountDownDate] = useState<number | null>(null);

    const sectionRefs = useRef<(HTMLElement | null)[]>([]);

    // --- DATA ---
    const tiers = [
        {
            id: 'deposit',
            badge: null,
            title: "Reserve (50%)",
            subtitle: "Late 2026 / Early 2027",
            price: "$299",
            originalPrice: null,
            description: "Pay 50% now, the rest (50% + shipping/taxes) when ready to ship. Secures your spot in Batch 2.",
            includes: ["DreamPlay One Keyboard", "Keyboard Stand", "Sustain Pedal"],
            delivery: "Dec 2026",
            backers: 2,
            remaining: 8,
            total: 10,
            highlight: false,
        },
        {
            id: 'solo',
            badge: null,
            title: "DreamPlay One",
            subtitle: "Founder's Batch",
            price: "$549",
            originalPrice: null,
            description: "The DreamPlay One Keyboard. Available in DS5.5 or DS6.0. Choose Midnight Black or Pearl White.",
            includes: ["DreamPlay One Keyboard"],
            delivery: "Aug 2026",
            backers: 40,
            remaining: 10,
            total: 50,
            highlight: false,
        },
        {
            id: 'full',
            badge: "Most Popular",
            title: "DreamPlay Bundle",
            subtitle: "Founder's Batch",
            price: "$599",
            originalPrice: null,
            description: "The complete DreamPlay experience. Keyboard, adjustable stand, responsive sustain pedal, and comfortable padded bench.",
            includes: ["DreamPlay One Keyboard", "Keyboard Stand", "Sustain Pedal", "Padded Bench"],
            delivery: "Aug 2026",
            backers: 208,
            remaining: 42,
            total: 250,
            highlight: true,
        }
    ];

    const keyboards = {
        'DS5.5': {
            name: 'DS5.5',
            tagline: '7/8ths Size',
            description: 'Designed for pianists with hands under 7.6 inches. Play octaves and 9ths with ease.',
            zone: 'Zone A',
            imgSrc: '/images/DS5.5-white_1.png'
        },
        'DS6.0': {
            name: 'DS6.0',
            tagline: '15/16ths Size',
            description: 'Designed for pianists with hands between 7.6 and 8.5 inches. Play octaves effortlessly.',
            zone: 'Zone B',
            imgSrc: '/images/DS6.0-Black-transparent v2.png'
        },
        'DS6.5': {
            name: 'DS6.5',
            tagline: 'Standard Size',
            description: 'For the small percentage with larger hands. Conventional sizing.',
            zone: 'Zone C',
            imgSrc: '/images/DS6.5-Black.png'
        }
    };

    // --- EFFECTS ---
    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY + window.innerHeight / 2;
            sectionRefs.current.forEach((section, index) => {
                if (!section) return;
                const rect = section.getBoundingClientRect();
                const top = rect.top + window.scrollY;
                const bottom = top + rect.height;
                if (scrollPos >= top && scrollPos < bottom) {
                    setCurrentSection(index);
                }
            });
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        getCountdownDate().then((dateStr) => {
            const target = dateStr ? new Date(dateStr).getTime() : new Date("2026-01-19T21:00:00-08:00").getTime();
            setCountDownDate(target);
        });
    }, []);

    useEffect(() => {
        if (!countDownDate) return;
        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = countDownDate - now;
            if (distance < 0) {
                setCountdown({ days: 0, hours: 0, mins: 0, secs: 0 });
                return;
            }
            setCountdown({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                secs: Math.floor((distance % (1000 * 60)) / 1000)
            });
        };
        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [countDownDate]);

    useEffect(() => {
        const handlePageShow = (event: PageTransitionEvent) => {
            if (event.persisted) {
                window.location.reload();
            }
        };
        window.addEventListener('pageshow', handlePageShow);
        return () => window.removeEventListener('pageshow', handlePageShow);
    }, []);

    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            setMousePos({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // --- HELPERS ---
    const scrollToSection = (index: number) => {
        const section = sectionRefs.current[index];
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const getRealValue = (percent: number) => {
        const visualZoneA_End = 33.33;
        const visualZoneB_End = 66.66;
        if (percent <= visualZoneA_End) return 6.0 + (percent / visualZoneA_End) * (7.6 - 6.0);
        else if (percent <= visualZoneB_End) {
            const relativeP = (percent - visualZoneA_End) / (visualZoneB_End - visualZoneA_End);
            return 7.6 + relativeP * (8.5 - 7.6);
        } else {
            const relativeP = (percent - visualZoneB_End) / (100 - visualZoneB_End);
            return 8.5 + relativeP * (10.0 - 8.5);
        }
    };

    const getSizingResult = (realVal: number) => {
        if (realVal < 7.6) {
            return { zone: 'A', rangeText: 'Hand span range: under 7.6 inches', model: 'DS5.5', desc: "Standard keys are physically too wide for you.", reach: 'Finally play 10ths comfortably' };
        } else if (realVal <= 8.5) {
            return { zone: 'B', rangeText: 'Hand span range: 7.6 to 8.5 inches', model: 'DS6.0', desc: "The perfect fit. Slightly narrower than standard.", reach: 'Play 10ths with new ease' };
        } else {
            return { zone: 'C', rangeText: 'Hand span range: above 8.5 inches', model: 'DS6.5', desc: 'You fit the historical standard.', reach: 'Master standard repertoire' };
        }
    };

    // --- ACTIONS ---
    const handleSelectHandSize = (size: 'small' | 'medium' | 'large') => {
        const sizeMap = { small: 'DS5.5', medium: 'DS6.0', large: 'DS6.5' };
        setAppState(prev => ({ ...prev, handSpan: size, size: sizeMap[size] }));
        setTimeout(() => scrollToSection(2), 300);
    };

    const handleSelectSize = (size: string) => {
        setAppState(prev => ({ ...prev, size }));
        setTimeout(() => scrollToSection(3), 300);
    };

    const handleSelectColor = (color: string) => {
        setAppState(prev => ({ ...prev, color }));
        setTimeout(() => scrollToSection(4), 300);
    };

    const handleSelectTier = (tierId: string) => {
        setAppState(prev => ({ ...prev, selectedTier: tierId }));

        if (tierId === 'full' || tierId === 'deposit' || tierId === 'solo') {
            const sizeParam = encodeURIComponent(appState.size || 'Not Selected');
            const colorParam = encodeURIComponent(appState.color || 'Not Selected');
            const propertiesParams = `&properties[Size]=${sizeParam}&properties[Finish]=${colorParam}`;

            const getCheckoutUrl = (configValue: string | undefined, defaultId: string) => {
                const val = configValue?.trim();
                if (val && /^\d+$/.test(val)) return `https://dreamplay-pianos.myshopify.com/cart/add?id=${val}&quantity=1&return_to=/checkout`;
                if (val) return val;
                if (defaultId) return `https://dreamplay-pianos.myshopify.com/cart/add?id=${defaultId}&quantity=1&return_to=/checkout`;
                return "";
            }

            let baseUrl = "";
            if (tierId === 'full') baseUrl = getCheckoutUrl(urls.bundle, "52209394549050");
            else if (tierId === 'deposit') baseUrl = getCheckoutUrl(urls.deposit, "52213397291322");
            else if (tierId === 'solo') baseUrl = getCheckoutUrl(urls.solo, "");

            if (baseUrl) {
                const separator = baseUrl.includes('?') ? '&' : '?';
                const finalParams = separator === '?' ? propertiesParams.substring(1) : propertiesParams;
                window.location.href = baseUrl + (baseUrl.includes('?') ? propertiesParams : `?${finalParams}`);
            }
        }
    };

    // --- ANALYTICS ---
    const { trackClick } = useABAnalytics("customize_waitlist_form", { trackTime: false });

    const handleSubmitWaitlist = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const fullName = (form.elements.namedItem('full-name') as HTMLInputElement).value;

        trackClick("form_submission", "join_waitlist");

        const ACTION_URL = 'https://dreamplaypianos.us12.list-manage.com/subscribe/post?u=90fbaa21ba86eecae78c767a8&id=cc37fd2637&f_id=00c46be9f0';
        const iframeName = 'mc_iframe_' + Date.now();
        const iframe = document.createElement('iframe');
        iframe.name = iframeName;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        const hiddenForm = document.createElement('form');
        hiddenForm.action = ACTION_URL;
        hiddenForm.method = 'POST';
        hiddenForm.target = iframeName;

        const payload = {
            'EMAIL': email,
            'FNAME': fullName,
            'DP1SIZE': appState.size || 'Not Selected',
            'DP1FINISH': appState.color || 'Not Selected',
            'DP1TIER': appState.selectedTier
        };

        for (const [key, value] of Object.entries(payload)) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            hiddenForm.appendChild(input);
        }

        document.body.appendChild(hiddenForm);
        hiddenForm.submit();

        setTimeout(() => {
            alert('You have been added to the waitlist! Please check your email.');
            document.body.removeChild(hiddenForm);
            document.body.removeChild(iframe);
            form.reset();
        }, 1500);
    }

    const realVal = getRealValue(sliderValue);
    const sizingResult = getSizingResult(realVal);
    const cmVal = (realVal * 2.54).toFixed(1);

    const navSteps = ['Start', 'Measure', 'Size', 'Color', 'Reserve'];

    return (
        <div className="min-h-screen bg-white font-sans text-neutral-900 selection:bg-neutral-200">
            {/* --- FIXED HEADERS WRAPPER --- */}
            <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
                <SpecialOfferHeader forceOpaque={true} className="border-b border-white/10 bg-[#050505] backdrop-blur-md" />

                {/* Steps Sub-Navbar */}
                <header id="sticky-nav" className="w-full mt-16 bg-[#050505]/95 backdrop-blur-md border-b border-white/5 shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 md:px-6">
                        <div className="flex h-12 md:h-14 items-center justify-between">
                            <div className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-medium text-white/40 mx-auto">
                                {navSteps.map((label, i) => (
                                    <React.Fragment key={i}>
                                        <button onClick={() => scrollToSection(i)} className={`flex items-center gap-2 transition-colors cursor-pointer hover:text-white ${currentSection === i ? 'text-white font-bold' : ''}`}>
                                            <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${currentSection === i ? 'border-white bg-white text-black' : 'border-white/20'}`}>{i + 1}</span>
                                            <span>{label}</span>
                                        </button>
                                        {i < 4 && <div className={`h-px w-6 bg-white/10`}></div>}
                                    </React.Fragment>
                                ))}
                            </div>
                            <div className="md:hidden text-[10px] uppercase tracking-[0.2em] font-medium text-white mx-auto">
                                Step {currentSection + 1} of 5
                            </div>
                        </div>
                    </div>
                </header>
            </div>


            {/* SECTION 0: HERO (DARK MODE) */}
            <section ref={el => { if (sectionRefs.current) sectionRefs.current[0] = el }} id="section-0" className="relative flex h-screen items-center justify-center overflow-hidden bg-[#050505] pt-16 text-white">
                {/* Subtle blue/white glow tracking mouse */}
                <div
                    className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                    style={{ background: `radial-gradient(1000px circle at ${mousePos.x}% ${mousePos.y}%, rgba(100, 180, 255, 0.15), transparent 40%)` }}
                ></div>

                <div className="relative z-10 mx-auto max-w-4xl px-4 text-center md:px-6">
                    <div className="mb-6 inline-block border border-white/20 bg-white/5 px-4 py-2 font-sans text-[10px] uppercase tracking-[0.3em] text-white/70 backdrop-blur-sm md:mb-8">
                        <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white"></span>
                        Final Units Remaining in Batch 1
                    </div>

                    <h1 className="mb-8 font-serif text-5xl leading-tight text-white md:text-7xl lg:text-8xl">
                        Build your<br />
                        <span className="italic text-white/90">DreamPlay One.</span>
                    </h1>

                    <p className="mx-auto mb-12 max-w-xl font-sans text-sm leading-relaxed text-white/60 md:text-base">
                        In just a few steps, we'll help you discover the ideal keyboard size and finish for your musical journey.
                    </p>

                    <button
                        onClick={() => scrollToSection(1)}
                        className="group mx-auto flex items-center justify-center gap-3 border border-white bg-white px-10 py-5 font-sans text-xs uppercase tracking-widest text-black transition-all hover:bg-white/90 hover:scale-105 shadow-xl shadow-white/10"
                    >
                        Start Customization
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </section>

            {/* SECTION 1: HAND SIZE (LIGHT MODE) */}
            <section ref={el => { if (sectionRefs.current) sectionRefs.current[1] = el }} id="section-1" className="relative flex min-h-screen flex-col justify-center border-t border-gray-200 bg-white py-24">
                <div className="mx-auto w-full max-w-5xl px-6">
                    <div className="mb-16 text-center mt-12">
                        <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-400">Step One</p>
                        <h2 className="mb-6 font-serif text-3xl text-neutral-900 md:text-5xl">Select Your Hand Size.</h2>
                        <button onClick={() => setIsSizingModalOpen(true)} className="inline-flex items-center gap-2 border-b border-gray-300 pb-1 font-sans text-xs uppercase tracking-widest text-neutral-500 transition-colors hover:border-black hover:text-black">
                            Or measure using our tool <ArrowRight className="h-3 w-3" />
                        </button>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {[
                            { id: 'small', label: 'Smaller Hands', desc: 'Ideal for women and children', range: '< 7.6 inches', zone: 'DS5.5', fullZone: 'Zone A', zoneDesc: '7/8ths Size' },
                            { id: 'medium', label: 'Average Hands', desc: 'Perfect for most men and women', range: '7.6–8.5 inches', zone: 'DS6.0', fullZone: 'Zone B', zoneDesc: '15/16ths Size' },
                            { id: 'large', label: 'Larger Hands', desc: 'For the small percentage with larger hands', range: '8.5+ inches', zone: 'DS6.5', fullZone: 'Zone C', zoneDesc: 'Standard Size' }
                        ].map((btn) => {
                            const isSelected = appState.handSpan === btn.id;
                            return (
                                <button
                                    key={btn.id}
                                    onClick={() => handleSelectHandSize(btn.id as any)}
                                    className={`group relative flex flex-col border p-8 text-left transition-all duration-300 md:p-10 ${isSelected
                                        ? 'border-black bg-neutral-50 text-black shadow-md z-10'
                                        : 'border-gray-200 bg-white hover:border-gray-400 hover:bg-neutral-50'
                                        }`}
                                >
                                    {isSelected && (
                                        <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-black text-white">
                                            <Check className="h-3 w-3" />
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <p className={`mb-3 font-sans text-[10px] uppercase tracking-[0.3em] ${isSelected ? 'text-black/60' : 'text-neutral-400'}`}>{btn.zoneDesc}</p>
                                        <h3 className={`mb-3 font-serif text-3xl text-neutral-900`}>{btn.zone}</h3>
                                        <p className={`font-sans text-sm leading-relaxed ${isSelected ? 'text-black/70' : 'text-neutral-500'}`}>{btn.desc}</p>
                                    </div>

                                    <div className={`mt-auto w-full border-t pt-6 ${isSelected ? 'border-black/20' : 'border-gray-200'}`}>
                                        <div className="mb-2 flex items-end justify-between">
                                            <span className={`font-sans text-[10px] uppercase tracking-widest ${isSelected ? 'text-black/50' : 'text-neutral-400'}`}>Hand Span</span>
                                            <span className={`font-sans text-sm font-bold text-neutral-900`}>{btn.range}</span>
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* SECTION 2: RECOMMENDATION (DARK MODE) */}
            <section ref={el => { if (sectionRefs.current) sectionRefs.current[2] = el }} id="section-2" className="relative flex min-h-screen flex-col justify-center bg-[#0a0a0f] py-24 text-white">
                <div className="mx-auto w-full max-w-6xl px-6">
                    <button onClick={() => scrollToSection(1)} className="mb-12 flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-white/50 transition-colors hover:text-white">
                        <ArrowLeft className="h-3 w-3" /> Back
                    </button>

                    <div className="mb-16 text-center">
                        <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.3em] text-white/50">Step Two</p>
                        <h2 className="mb-6 font-serif text-3xl text-white md:text-5xl">Your Recommended Size.</h2>
                        <p className="mx-auto max-w-xl font-sans text-sm text-white/60">
                            Based on your hand span, we recommend the {appState.size || 'DS6.0'}.
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {Object.entries(keyboards).map(([key, kb]) => {
                            const isSelected = key === appState.size;
                            const isRecommended = key === appState.size;
                            return (
                                <button
                                    key={key}
                                    onClick={() => handleSelectSize(key)}
                                    className={`group relative flex flex-col items-start border text-left transition-all duration-300 ${isSelected
                                        ? 'z-10 scale-105 border-white bg-white/5 shadow-2xl'
                                        : 'border-white/20 bg-transparent hover:border-white/50 hover:bg-white/5'
                                        }`}
                                >
                                    {isRecommended && (
                                        <div className={`absolute left-6 top-6 z-10 border px-3 py-1 font-sans text-[9px] uppercase tracking-[0.2em] backdrop-blur-md ${isSelected ? 'border-white/20 bg-white/50 text-black' : 'border-white/20 bg-black/50 text-white'}`}>
                                            Recommended
                                        </div>
                                    )}

                                    {/* Image Container */}
                                    <div className={`relative flex h-64 w-full items-center justify-center border-b p-8 transition-colors md:h-72 ${isSelected ? 'border-white/30 bg-black/40' : 'border-white/10 bg-black/20'}`}>
                                        <img src={kb.imgSrc} alt={kb.name} className="w-auto max-w-[90%] max-h-[80%] object-contain transition-transform duration-700 group-hover:scale-105" />
                                    </div>

                                    <div className="flex w-full flex-1 flex-col p-8 md:p-10">
                                        <h3 className="mb-2 font-serif text-2xl text-white md:text-3xl">{key}</h3>
                                        <p className="mb-6 font-sans text-[10px] uppercase tracking-widest text-white/50">{kb.tagline}</p>

                                        <p className="mb-8 flex-1 font-sans text-sm leading-relaxed text-white/60">{kb.description}</p>

                                        <div className="mb-8 flex w-full justify-between border-t border-white/10 pt-6">
                                            <div>
                                                <div className="font-serif text-xl text-white">88</div>
                                                <div className="mt-1 font-sans text-[10px] uppercase tracking-widest text-white/40">Keys</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-serif text-xl text-white">{key === 'DS5.5' ? 'Narrowest' : key === 'DS6.0' ? 'Narrow' : 'Standard'}</div>
                                                <div className="mt-1 font-sans text-[10px] uppercase tracking-widest text-white/40">Key Width</div>
                                            </div>
                                        </div>

                                        <div className={`mt-auto flex w-full items-center justify-center gap-2 border px-6 py-4 text-center font-sans text-xs uppercase tracking-widest transition-colors ${isSelected ? 'border-white bg-white text-black hover:bg-white/90' : 'border-white/30 text-white group-hover:border-white group-hover:bg-white/10'}`}>
                                            {isSelected ? 'Selected' : 'Select Size'}
                                            {!isSelected && <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />}
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                    <div className="mt-12 text-center">
                        <button onClick={() => { setPolicyUrl("/information-and-policies/shipping"); setIsPolicyModalOpen(true); }} className="font-sans text-[10px] uppercase tracking-widest text-white/40 underline underline-offset-4 transition-colors hover:text-white/80">
                            Unsure? We have a flexible change policy.
                        </button>
                    </div>
                </div>
            </section>

            {/* SECTION 3: FINISH (LIGHT GRAY MODE) */}
            <section ref={el => { if (sectionRefs.current) sectionRefs.current[3] = el }} id="section-3" className="journey-section relative flex min-h-screen flex-col justify-center bg-[#f5f5f5] py-24 text-black">
                <div className="mx-auto w-full max-w-5xl px-6">
                    <button onClick={() => scrollToSection(2)} className="mb-12 flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-black/50 transition-colors hover:text-black">
                        <ArrowLeft className="h-3 w-3" /> Back
                    </button>

                    <div className="mb-16 text-center">
                        <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.3em] text-black/50">Step Three</p>
                        <h2 className="font-serif text-3xl text-black md:text-5xl">Choose Your Finish.</h2>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        {['Black', 'White'].map(color => {
                            const isSelected = appState.color === color;
                            return (
                                <button
                                    key={color}
                                    onClick={() => handleSelectColor(color)}
                                    className={`group relative flex flex-col overflow-hidden border text-left transition-all duration-300 ${isSelected ? 'border-black bg-white z-10 scale-105 shadow-xl' : 'border-black/10 bg-transparent hover:border-black/30 hover:bg-white/50'
                                        }`}
                                >
                                    {isSelected && (
                                        <div className="absolute right-6 top-6 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white shadow-lg">
                                            <Check className="h-4 w-4" />
                                        </div>
                                    )}
                                    <div className={`relative flex h-72 w-full items-center justify-center border-b p-8 transition-colors duration-500 ${isSelected ? 'border-black/20' : 'border-black/10'}`} style={{ backgroundColor: color === 'Black' ? '#e5e5e5' : '#ffffff' }}>
                                        <img src={color === 'Black' ? "/images/DS6.5-Black.png" : "/images/DS5.5-White.png"} alt={color} className="h-auto w-full max-h-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                    <div className="flex w-full flex-1 flex-col p-8 md:p-10">
                                        <div className="mb-4 flex items-center gap-4">
                                            <div className={`h-6 w-6 rounded-full border ${isSelected ? 'border-black/50' : 'border-black/20'}`} style={{ backgroundColor: color === 'Black' ? '#000' : '#fff' }}></div>
                                            <h3 className="font-serif text-2xl text-black">{color === 'Black' ? 'Midnight Black' : 'Pearl White'}</h3>
                                        </div>
                                        <p className="mb-8 flex-1 font-sans text-sm leading-relaxed text-black/60">{color === 'Black' ? 'Classic elegance with a sophisticated matte finish. Commands presence on any stage.' : 'Modern aesthetic with a pristine glossy finish. A striking centerpiece for any studio.'}</p>

                                        <div className={`mt-auto w-full border py-4 text-center font-sans text-xs uppercase tracking-widest transition-colors ${isSelected ? 'border-black bg-black text-white' : 'border-black/30 text-black group-hover:border-black group-hover:bg-black/10'
                                            }`}>
                                            {isSelected ? 'Selected' : 'Choose Finish'}
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* SECTION 4: PRICING / RESERVE (WHITE MODE) */}
            <section ref={el => { if (sectionRefs.current) sectionRefs.current[4] = el }} id="section-4" className="journey-section relative flex min-h-screen flex-col justify-center border-t border-black/5 bg-white py-24 text-black">
                <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
                    <button onClick={() => scrollToSection(3)} className="mb-12 flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-black/50 transition-colors hover:text-black">
                        <ArrowLeft className="h-3 w-3" /> Back
                    </button>

                    <div className="mb-16 max-w-2xl text-left">
                        <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.3em] text-black/50">Final Step</p>
                        <h2 className="mb-4 font-serif text-4xl leading-tight text-black md:text-5xl lg:text-6xl text-balance">Reserve your DreamPlay One.</h2>
                        <div className="flex items-center gap-2 font-sans text-sm text-black/60">
                            <ShieldCheck className="h-4 w-4" /> Ships worldwide. Choose the size and color that suits you.
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {tiers.map(tier => {
                            const isSelected = appState.selectedTier === tier.id;
                            const isHighlight = tier.highlight;

                            return (
                                <button
                                    key={tier.id}
                                    onClick={() => handleSelectTier(tier.id)}
                                    className={`relative flex flex-col border p-8 text-left transition-all md:p-10 ${isSelected
                                        ? "z-10 scale-105 border-black bg-black text-white shadow-2xl"
                                        : isHighlight
                                            ? "border-black/30 bg-black/5 hover:border-black/50"
                                            : "border-black/10 bg-transparent hover:border-black/30 hover:bg-black/5"
                                        }`}
                                >
                                    {tier.badge && (
                                        <span className={`mb-4 self-start font-sans text-[10px] uppercase tracking-[0.3em] ${isSelected ? 'text-white/50' : 'text-black/50'}`}>
                                            {tier.badge}
                                        </span>
                                    )}

                                    <h3 className={`w-full font-serif text-xl md:text-2xl ${isSelected ? 'text-white' : 'text-black'}`}>
                                        {tier.title}
                                    </h3>
                                    <p className={`mt-1 w-full font-sans text-[10px] uppercase tracking-wider ${isSelected ? 'text-white/50' : 'text-black/40'}`}>
                                        {tier.subtitle}
                                    </p>

                                    <div className="mt-6 flex w-full items-baseline gap-3">
                                        <span className={`font-serif text-4xl md:text-5xl ${isSelected ? 'text-white' : 'text-black'}`}>{tier.price}</span>
                                        {tier.originalPrice && (
                                            <span className={`text-lg line-through ${isSelected ? 'text-white/40' : 'text-black/40'}`}>
                                                {tier.originalPrice}
                                            </span>
                                        )}
                                    </div>

                                    <p className={`mt-6 min-h-[80px] w-full flex-grow font-sans text-sm leading-relaxed ${isSelected ? 'text-white/70' : 'text-black/60'}`}>
                                        {tier.description}
                                    </p>

                                    {/* Includes */}
                                    {tier.includes && (
                                        <div className="mt-6 flex w-full flex-col gap-2 text-left">
                                            <p className={`font-sans text-[10px] uppercase tracking-[0.2em] ${isSelected ? 'text-white/40' : 'text-black/40'}`}>
                                                Includes
                                            </p>
                                            <div className="flex flex-col gap-2">
                                                {tier.includes.map((item, i) => (
                                                    <div key={i} className="flex items-center gap-3">
                                                        <span className={`h-1 w-1 shrink-0 rounded-full ${isSelected ? 'bg-white/40' : 'bg-black/40'}`} />
                                                        <span className={`font-sans text-sm ${isSelected ? 'text-white/80' : 'text-black/70'}`}>{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Meta */}
                                    <div className="mt-8 flex w-full items-center gap-4 md:gap-6">
                                        <div>
                                            <p className={`font-sans text-[10px] uppercase tracking-widest ${isSelected ? 'text-white/40' : 'text-black/40'}`}>Delivery</p>
                                            <p className={`mt-1 font-sans text-xs ${isSelected ? 'text-white/80' : 'text-black/70'}`}>{tier.delivery}</p>
                                        </div>
                                        <div className={`h-6 w-px ${isSelected ? 'bg-white/10' : 'bg-black/10'}`} />
                                        <div>
                                            <p className={`font-sans text-[10px] uppercase tracking-widest ${isSelected ? 'text-white/40' : 'text-black/40'}`}>Backers</p>
                                            <p className={`mt-1 font-sans text-xs ${isSelected ? 'text-white/80' : 'text-black/70'}`}>{tier.backers}</p>
                                        </div>
                                        <div className={`h-6 w-px ${isSelected ? 'bg-white/10' : 'bg-black/10'}`} />
                                        <div>
                                            <p className={`font-sans text-[10px] uppercase tracking-widest ${isSelected ? 'text-white/40' : 'text-black/40'}`}>Left</p>
                                            <p className={`mt-1 font-sans text-xs ${isSelected ? 'text-white/80' : 'text-black/70'}`}>{tier.remaining} of {tier.total}</p>
                                        </div>
                                    </div>
                                    <div className={`mt-3 h-px w-full ${isSelected ? 'bg-white/10' : 'bg-black/10'}`}>
                                        <div className={`h-full transition-all ${isSelected ? 'bg-white/40' : 'bg-black/40'}`} style={{ width: `${((tier.total - tier.remaining) / tier.total) * 100}%` }} />
                                    </div>

                                    {/* CTA Button */}
                                    <div className="mt-8 w-full pt-4">
                                        <div className={`group flex w-full items-center justify-center gap-2 border px-6 py-4 text-center font-sans text-xs uppercase tracking-widest transition-colors ${isSelected
                                            ? "border-white bg-white text-black hover:bg-white/90"
                                            : isHighlight
                                                ? "border-black bg-black text-white hover:bg-black/90"
                                                : "border-black/30 text-black group-hover:border-black group-hover:bg-black/10"
                                            }`}>
                                            {appState.selectedTier === tier.id ? 'Processing...' : `Reserve for ${tier.price}`}
                                            {appState.selectedTier !== tier.id && <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />}
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* --- SIZING MODAL (DARK) --- */}
            {isSizingModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
                    <div className="relative max-h-[90vh] w-full max-w-6xl overflow-auto border border-white/20 bg-[#050505] p-8 shadow-2xl md:p-16">
                        <button onClick={() => setIsSizingModalOpen(false)} className="absolute right-6 top-6 font-sans text-xs uppercase tracking-widest text-white/50 transition-colors hover:text-white">
                            Close ✕
                        </button>

                        <div className="mb-16 text-center">
                            <h2 className="mb-4 font-serif text-3xl text-white md:text-5xl">A Keyboard That Fits You.</h2>
                            <p className="mx-auto max-w-xl font-sans text-sm text-white/50">DreamPlay's DS Standard keyboards come in different sizes to match your biology.</p>
                        </div>

                        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
                            {/* CARD 1: INPUT */}
                            <div className="flex flex-col border border-white/10 bg-white/5 p-10">
                                <div className="mb-12">
                                    <div className="mb-4 flex items-end justify-between border-b border-white/20 pb-4">
                                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/50">Your Span</span>
                                        <div className="font-serif text-4xl text-white">
                                            {getRealValue(sliderValue).toFixed(1)}" <span className="font-sans text-lg font-normal text-white/40">/ {(getRealValue(sliderValue) * 2.54).toFixed(1)} cm</span>
                                        </div>
                                    </div>

                                    <input
                                        type="range"
                                        min="0" max="100" step="0.5"
                                        value={sliderValue}
                                        onChange={(e) => setSliderValue(Number(e.target.value))}
                                        className="mb-4 h-1 w-full cursor-pointer appearance-none rounded-none bg-white/20"
                                        style={{
                                            background: `linear-gradient(to right, white ${sliderValue}%, rgba(255,255,255,0.2) ${sliderValue}%)`
                                        }}
                                    />
                                    <style jsx>{`
                                        input[type=range]::-webkit-slider-thumb {
                                            -webkit-appearance: none;
                                            height: 24px;
                                            width: 8px;
                                            background: #fff;
                                            cursor: pointer;
                                            margin-top: -10px;
                                        }
                                    `}</style>
                                    <div className="mt-4 flex justify-between font-sans text-[10px] uppercase tracking-widest text-white/40">
                                        <span>Small (6 in)</span>
                                        <span>Average (8 in)</span>
                                        <span>Large (10 in)</span>
                                    </div>
                                </div>

                                <div className="mt-auto flex items-start gap-6 border-t border-white/10 pt-8">
                                    <div className="relative h-16 w-16 shrink-0 bg-black grayscale border border-white/10">
                                        <Image src="/images/generated-hand-image.jpg" alt="Hand span" fill className="object-cover opacity-60" />
                                    </div>
                                    <div>
                                        <div className="mb-2 font-serif text-lg text-white">How to measure</div>
                                        <p className="font-sans text-xs leading-relaxed text-white/50">Spread your hand wide. Measure from the tip of the thumb to the tip of the pinky.</p>
                                    </div>
                                </div>
                            </div>

                            {/* CARD 2: RESULT */}
                            <div className="flex flex-col justify-center border border-white/10 bg-transparent p-10">
                                <div className="mb-2 font-sans text-[10px] uppercase tracking-[0.2em] text-white/40">Your match</div>
                                <div className="mb-2 font-serif text-5xl text-white">Zone {getSizingResult(getRealValue(sliderValue)).zone}</div>
                                <div className="mb-10 border-b border-white/10 pb-6 font-sans text-sm text-white/50">{getSizingResult(getRealValue(sliderValue)).rangeText}</div>

                                <div className="mb-2 font-serif text-3xl text-white">{getSizingResult(getRealValue(sliderValue)).model}</div>
                                <div className="mb-6 font-sans text-[10px] uppercase tracking-widest text-white/50">Recommended Model</div>

                                <p className="mb-10 min-h-[60px] border-l border-white/20 pl-4 font-sans text-sm leading-relaxed text-white/60">
                                    {getSizingResult(getRealValue(sliderValue)).desc}
                                </p>

                                <button
                                    onClick={() => {
                                        const zoneMap: any = { A: 'small', B: 'medium', C: 'large' };
                                        handleSelectHandSize(zoneMap[getSizingResult(getRealValue(sliderValue)).zone]);
                                        setIsSizingModalOpen(false);
                                    }}
                                    className="group mt-auto flex w-full items-center justify-center gap-2 border border-white bg-white py-4 font-sans text-xs uppercase tracking-widest text-black transition-colors hover:bg-white/90"
                                >
                                    Select and Return
                                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- POLICY MODAL --- */}
            {isPolicyModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
                    <div className="relative flex h-full max-h-[90vh] w-full max-w-6xl flex-col border border-white/20 bg-[#050505] shadow-2xl">
                        <div className="flex items-center justify-between border-b border-white/10 px-8 py-6">
                            <h3 className="font-serif text-2xl text-white">Our Policy</h3>
                            <button onClick={() => setIsPolicyModalOpen(false)} className="font-sans text-xs uppercase tracking-widest text-white/50 transition-colors hover:text-white">Close ✕</button>
                        </div>
                        <div className="flex-1 bg-white">
                            <iframe src={policyUrl} className="h-full w-full border-0" title="Policy Page"></iframe>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
