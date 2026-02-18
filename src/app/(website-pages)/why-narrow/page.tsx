"use client";
import React, { useEffect, useState, useRef } from "react";
import { SpecialOfferHeader } from "@/components/special-offer/header";
import { SpecialOfferFooter } from "@/components/special-offer/footer";
import TestimonialsSection from "@/components/checkout/TestimonialsSection";

/**
 * 3D Glassmorphic Donut Chart — SVG-based with gradient strokes, drop shadows, and glass inner ring
 */
const DonutChart = ({ percent, label, theme = "light" }: { percent: number; label: string; theme?: "light" | "dark" }) => {
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
          const ease = 1 - Math.pow(1 - progress, 4);
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

  const size = 200;
  const strokeWidth = 26;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const cx = size / 2;
  const cy = size / 2;

  const filledLength = (currentPercent / 100) * circumference;
  const emptyLength = circumference - filledLength;

  const uniqueId = `wn-donut-${percent}-${label.replace(/\s/g, '')}`;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90 drop-shadow-2xl">
          <defs>
            <filter id={`${uniqueId}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.25)" />
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="rgba(0,0,0,0.15)" />
            </filter>
            <linearGradient id={`${uniqueId}-filled`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff4d6d" />
              <stop offset="40%" stopColor="#ff2d55" />
              <stop offset="100%" stopColor="#c0223f" />
            </linearGradient>
            <linearGradient id={`${uniqueId}-empty`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="40%" stopColor="#34c759" />
              <stop offset="100%" stopColor="#1a8f3c" />
            </linearGradient>
          </defs>

          {/* Background ring */}
          <circle cx={cx} cy={cy} r={radius} fill="none"
            stroke={theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)"}
            strokeWidth={strokeWidth + 4} />

          {/* Empty (green) arc */}
          <circle cx={cx} cy={cy} r={radius} fill="none"
            stroke={`url(#${uniqueId}-empty)`}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference}`}
            strokeDashoffset={0}
            strokeLinecap="butt"
            filter={`url(#${uniqueId}-shadow)`} />

          {/* Filled (red) arc */}
          <circle cx={cx} cy={cy} r={radius} fill="none"
            stroke={`url(#${uniqueId}-filled)`}
            strokeWidth={strokeWidth}
            strokeDasharray={`${filledLength} ${emptyLength}`}
            strokeDashoffset={0}
            strokeLinecap="butt"
            filter={`url(#${uniqueId}-shadow)`} />
        </svg>

        {/* Glass inner circle */}
        <div className="absolute rounded-full" style={{
          width: size - strokeWidth * 2 - 14,
          height: size - strokeWidth * 2 - 14,
          background: theme === "dark"
            ? "radial-gradient(ellipse at 35% 25%, rgba(255,255,255,0.06) 0%, rgba(10,10,15,0.95) 60%)"
            : "radial-gradient(ellipse at 35% 25%, rgba(255,255,255,0.9) 0%, rgba(250,250,250,0.98) 60%)",
          boxShadow: theme === "dark"
            ? "inset 0 2px 8px rgba(255,255,255,0.04), inset 0 -4px 12px rgba(0,0,0,0.6), 0 0 20px rgba(0,0,0,0.3)"
            : "inset 0 2px 8px rgba(255,255,255,0.8), inset 0 -4px 12px rgba(0,0,0,0.06), 0 0 16px rgba(0,0,0,0.04)",
        }} />

        {/* Percentage text */}
        <div className="absolute z-10 flex flex-col items-center">
          <span className="text-4xl font-bold text-[#ff2d55]" style={{
            textShadow: theme === "dark"
              ? "0 0 20px rgba(255,45,85,0.3), 0 2px 4px rgba(0,0,0,0.5)"
              : "0 0 12px rgba(255,45,85,0.1), 0 1px 2px rgba(0,0,0,0.08)"
          }}>
            {Math.round(currentPercent)}%
          </span>
          {label && <span className={`text-sm font-medium uppercase tracking-wide mt-1 ${theme === "light" ? "text-neutral-500" : "text-white/50"}`}>{label}</span>}
        </div>
      </div>
    </div>
  );
};

export default function WhyNarrowPage() {

  return (
    <div className="min-h-screen">
      <SpecialOfferHeader forceOpaque={true} darkMode={true} className="border-b border-white/10 bg-[#050505] backdrop-blur-md" />
      <main>

        {/* ═══ TESTIMONIALS — DARK ═══ */}
        <TestimonialsSection />

        {/* ═══ SCIENCE SECTION (Hidden Barrier) — LIGHT ═══ */}
        <section id="science-section" className="w-full bg-neutral-50 text-black flex flex-col items-center py-24 md:py-40">

          <div className="w-full max-w-[80rem] px-6">
            <div className="text-center mb-16">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4">The Data</p>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight text-black">The Hidden Barrier</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="text-center mb-8">
                  <span className="font-serif text-6xl font-bold block text-[#ff2d55]">87%</span>
                  <span className="font-sans text-xl font-medium text-neutral-600">of females</span>
                  <p className="font-sans text-sm text-neutral-500 max-w-[18rem] mx-auto mt-2 leading-relaxed">Have hand spans smaller than the 8.5 inch minimum that standard keyboards expect.</p>
                </div>
                <div className="bg-white border border-neutral-200 rounded-none p-8 flex flex-col items-center hover:border-neutral-400 transition-all">
                  <DonutChart percent={87} label="" theme="light" />
                  <div className="flex gap-6 text-xs font-medium text-neutral-500 mt-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff2d55]"></div>Too small
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#34c759]"></div>Comfortable
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-center mb-8">
                  <span className="font-serif text-6xl font-bold block text-[#ff2d55]">24%</span>
                  <span className="font-sans text-xl font-medium text-neutral-600">of males</span>
                  <p className="font-sans text-sm text-neutral-500 max-w-[18rem] mx-auto mt-2 leading-relaxed">Also fall below the comfortable reach threshold for a standard 6.5 inch keyboard.</p>
                </div>
                <div className="bg-white border border-neutral-200 rounded-none p-8 flex flex-col items-center hover:border-neutral-400 transition-all">
                  <DonutChart percent={24} label="" theme="light" />
                  <div className="flex gap-6 text-xs font-medium text-neutral-500 mt-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff2d55]"></div>Too small
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#34c759]"></div>Comfortable
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-12 border-t border-neutral-200 grid md:grid-cols-2 gap-8">
              <div>
                <div className="font-serif text-5xl font-bold text-black">8.5"</div>
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-500 block mt-2 mb-2">The Threshold</span>
                <p className="font-sans text-base text-neutral-600 leading-relaxed">Minimum hand span needed to play a conventional 6.5 inch keyboard from Yamaha or Steinway with real comfort.</p>
              </div>
              <div>
                <div className="font-serif text-5xl font-bold text-black">25-30%</div>
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-500 block mt-2 mb-2">Larger Reach Required</span>
                <p className="font-sans text-base text-neutral-600 leading-relaxed">Hand span often needs to be at least one quarter larger than the octave just to reach 8ths, 9ths, and 10ths without strain.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ RESEARCH SECTION — DARK ═══ */}
        <section className="w-full bg-[#050505] text-white flex flex-col items-center py-24 md:py-40">
          <div className="w-full max-w-[80rem] px-6">
            <div className="text-center mb-16">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">Evidence</p>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight text-white mb-4">Published Research</h2>
              <p className="font-sans text-base text-white/60 max-w-[36rem] mx-auto leading-relaxed">Decades of peer reviewed research explain why standard keyboards hold most pianists back.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              <div className="border border-white/10 bg-white/5 rounded-none p-10 flex flex-col hover:border-white/20 transition-all">
                <div className="font-serif text-xl font-bold text-white mb-3">Hand size and performance related injuries</div>
                <div className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">Applied Ergonomics, 2021</div>
                <div className="font-sans text-sm text-white/60 leading-relaxed mb-8 flex-grow">Pianists with smaller hands show <strong>reduced muscular effort and lower perceived strain</strong> when they move to 5.5 inch octave keyboards instead of standard size.</div>
                <a href="https://www.sciencedirect.com/science/article/abs/pii/S0003687021001654" target="_blank" className="group inline-flex items-center justify-center gap-2 border border-white bg-white px-8 py-4 font-sans text-xs uppercase tracking-widest text-black transition-colors hover:bg-white/90 w-fit">
                  Read full study
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                </a>
              </div>
              <div className="border border-white/10 bg-white/5 rounded-none p-10 flex flex-col hover:border-white/20 transition-all">
                <div className="font-serif text-xl font-bold text-white mb-3">Gender differences and career impact</div>
                <div className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">Susan Tomes</div>
                <div className="font-sans text-sm text-white/60 leading-relaxed mb-8 flex-grow">Studies note that <strong>internationally acclaimed women pianists tend to have larger hands</strong>, which aligns with a repertoire that often expects very wide reaches.</div>
                <a href="https://www.susantomes.com/blog/hand-size-gender-differences-pianists-acclaim/" target="_blank" className="group inline-flex items-center justify-center gap-2 border border-white bg-white px-8 py-4 font-sans text-xs uppercase tracking-widest text-black transition-colors hover:bg-white/90 w-fit">
                  Read article
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                </a>
              </div>
              <div className="border border-white/10 bg-white/5 rounded-none p-10 flex flex-col hover:border-white/20 transition-all">
                <div className="font-serif text-xl font-bold text-white mb-3">Benefits of ergonomically scaled keyboards</div>
                <div className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">Survey of reduced size users</div>
                <div className="font-sans text-sm text-white/60 leading-relaxed mb-8 flex-grow">Players report <strong>relief from pain, faster technical progress, and greater comfort</strong> when they move to keyboards that match their hand span.</div>
                <a href="https://www.researchgate.net/publication/264457999" target="_blank" className="group inline-flex items-center justify-center gap-2 border border-white bg-white px-8 py-4 font-sans text-xs uppercase tracking-widest text-black transition-colors hover:bg-white/90 w-fit">
                  Read full study
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                </a>
              </div>
              <div className="border border-white/10 bg-white/5 rounded-none p-10 flex flex-col hover:border-white/20 transition-all">
                <div className="font-serif text-xl font-bold text-white mb-3">Performance quality improvements</div>
                <div className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">PASK findings</div>
                <div className="font-sans text-sm text-white/60 leading-relaxed mb-8 flex-grow"><strong>Shorter reaches and reduced wrist travel</strong> on compatible keyboards are linked to better control and lower risk of overuse injuries.</div>
                <a href="https://paskpiano.org/performance-quality/" target="_blank" className="group inline-flex items-center justify-center gap-2 border border-white bg-white px-8 py-4 font-sans text-xs uppercase tracking-widest text-black transition-colors hover:bg-white/90 w-fit">
                  Learn more
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                </a>
              </div>
            </div>

            <div className="border border-white/10 rounded-none p-10 bg-white/5">
              <h3 className="font-serif text-2xl font-bold text-white mb-2">Academic recognition</h3>
              <p className="font-sans text-sm text-white/60 leading-relaxed">The Donison Steinbuhler standard appears in research and teaching at leading institutions.</p>
              <div className="grid md:grid-cols-2 gap-8 mt-10">
                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 bg-white/10 rounded-none flex items-center justify-center flex-shrink-0 border border-white/10">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }} className="text-[#34c759]"><path d="M20 6 9 17l-5-5"></path></svg>
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-white mb-1">Stanford University</h4>
                    <p className="font-sans text-sm text-white/60">Research and advocacy around scaled keyboards in music education and injury prevention.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 bg-white/10 rounded-none flex items-center justify-center flex-shrink-0 border border-white/10">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }} className="text-[#34c759]"><path d="M20 6 9 17l-5-5"></path></svg>
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-white mb-1">Johns Hopkins Peabody Institute</h4>
                    <p className="font-sans text-sm text-white/60">Use of alternative sizes inside curriculum and performance programs.</p>
                  </div>
                </div>
              </div>
              <div className="mt-10 text-center">
                <a href="/about-us/ds-standard" className="group inline-flex items-center justify-center gap-2 border border-white bg-white px-8 py-4 font-sans text-xs uppercase tracking-widest text-black transition-colors hover:bg-white/90">
                  Learn more about the DS Standard
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CTA — LIGHT ═══ */}
        <section className="w-full bg-white text-black flex flex-col items-center pb-32 border-t border-neutral-200">
          <div className="w-full max-w-[80rem] px-6 text-center pt-24">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4">Get Started</p>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight text-black mb-8">Don't let your instrument hold you back.</h2>
            <a href="/customize" className="group inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 font-sans text-xs uppercase tracking-widest transition-colors hover:bg-neutral-800">
              Configure Yours
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
            </a>
          </div>
        </section>

      </main>
      <SpecialOfferFooter />
    </div>
  );
}
