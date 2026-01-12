"use client";
import React, { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestimonialsSection from "@/components/checkout/TestimonialsSection";

export default function WhyNarrowPage() {
  const scienceSectionRef = useRef<HTMLElement>(null);

  // --- CHART ANIMATION LOGIC ---
  useEffect(() => {
    const section = scienceSectionRef.current;
    if (!section) return;

    const donuts = section.querySelectorAll(".dp-donut") as NodeListOf<HTMLElement>;
    let hasAnimated = false;

    const runAnimation = () => {
      if (hasAnimated) return;
      hasAnimated = true;

      donuts.forEach((donut) => {
        const targetStr = donut.getAttribute("data-target-degree");
        if (!targetStr) return;
        const targetDegree = parseFloat(targetStr);
        const duration = 1500;
        let startTime: number | null = null;
        const colorRed = "#ff2d55";
        const colorGreen = "#34c759";

        function animateFrame(timestamp: number) {
          if (!startTime) startTime = timestamp;
          const progress = timestamp - startTime;
          const percent = Math.min(progress / duration, 1);
          const ease = 1 - Math.pow(1 - percent, 4);
          const currentAngle = targetDegree * ease;
          donut.style.background = `conic-gradient(${colorRed} 0deg ${currentAngle}deg, ${colorGreen} ${currentAngle}deg 360deg)`;
          if (progress < duration) window.requestAnimationFrame(animateFrame);
        }
        window.requestAnimationFrame(animateFrame);
      });
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runAnimation();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(section);
      return () => observer.disconnect();
    } else {
      runAnimation();
    }
  }, []);

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="main-wrapper">

        {/* --- STORIES SECTION --- */}
        <TestimonialsSection />

        {/* --- DIVIDER --- */}
        <div style={{ width: "100%", maxWidth: "80rem", height: "1px", backgroundColor: "rgba(255, 255, 255, 0.15)", margin: "0 auto", display: "block" }}></div>

        {/* --- SCIENCE SECTION --- */}
        <section id="science-section" ref={scienceSectionRef} className="dp-section-wrapper dp-section-padding">
          <style jsx>{`
            .dp-section-wrapper {
              width: 100%;
              background-color: #000000;
              color: #ffffff;
              font-family: 'Manrope', system-ui, -apple-system, sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .dp-section-padding { padding: 6rem 0 10rem; }

            .dp-content-container {
              width: 100%;
              max-width: 80rem; /* WIDENED from 68rem */
              padding: 0 1.5rem;
              box-sizing: border-box;
            }
            .dp-center { text-align: center; }
            .dp-h2 {
              font-size: 2.5rem;
              font-weight: 700;
              letter-spacing: -0.02em;
              margin: 0 0 1.5rem;
              line-height: 1.1;
              color: #fff;
            }
            @media (min-width: 768px) { .dp-h2 { font-size: 3rem; } }
            .dp-mb-lg { margin-bottom: 4rem; }
            .dp-stat-number {
              font-size: 3.5rem;
              font-weight: 700;
              letter-spacing: -0.04em;
              line-height: 1;
              margin-bottom: 0.5rem;
              display: block;
            }
            .dp-sub-stat {
              font-size: 1.25rem;
              font-weight: 600;
              margin-bottom: 0.25rem;
              color: #fff;
            }
            .dp-text-soft {
              color: rgba(255, 255, 255, 0.7);
              font-size: 1rem; /* Slightly larger readability */
              line-height: 1.6;
            }
            .dp-grid-2 {
              display: grid;
              grid-template-columns: 1fr;
              gap: 3rem;
            }
            @media (min-width: 768px) { .dp-grid-2 { grid-template-columns: repeat(2, 1fr); } }
            .dp-chart-card {
              background: #111111;
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-radius: 1.5rem;
              padding: 2rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              transition: transform 0.2s ease;
            }
            .dp-chart-card:hover { border-color: rgba(255, 255, 255, 0.2); }
            .dp-chart-shell {
              position: relative;
              width: 200px;
              height: 200px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 1rem;
            }
            .dp-donut {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background: conic-gradient(#333 0deg 360deg);
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .dp-donut-inner {
              width: 120px;
              height: 120px;
              background: #111111;
              border-radius: 50%;
              position: absolute;
            }
            .dp-donut-value {
              position: absolute;
              font-size: 2rem;
              font-weight: 700;
              z-index: 2;
              color: #ff2d55;
            }
            .dp-legend {
              display: flex;
              gap: 1.5rem;
              font-size: 0.85rem;
              margin-top: 1rem;
            }
            .dp-legend-item { display: flex; align-items: center; gap: 0.5rem; color: #ccc; }
            .dp-dot-small { width: 8px; height: 8px; border-radius: 50%; }
            .dp-dot-red { background: #ff2d55; }
            .dp-dot-green { background: #34c759; }
            .dp-split-stats {
              margin-top: 4rem;
              padding-top: 3rem;
              border-top: 1px solid rgba(255, 255, 255, 0.15);
              display: grid;
              grid-template-columns: 1fr;
              gap: 2rem;
            }
            @media (min-width: 768px) { .dp-split-stats { grid-template-columns: repeat(2, 1fr); } }
            .dp-kpi-val { font-size: 3rem; font-weight: 700; line-height: 1; margin-bottom: 0.5rem; }
            .dp-kpi-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #888; margin-bottom: 0.5rem; display: block; }
          `}</style>

          <div className="dp-content-container">
            <div className="dp-center dp-mb-lg">
              <h2 className="dp-h2">The Hidden Barrier</h2>
            </div>
            <div className="dp-grid-2">
              <div>
                <div className="dp-center" style={{ marginBottom: "2rem" }}>
                  <span className="dp-stat-number">87%</span>
                  <span className="dp-sub-stat">of females</span>
                  <p className="dp-text-soft" style={{ maxWidth: "18rem", margin: "0.5rem auto 0" }}>Have hand spans smaller than the 8.5 inch minimum that standard keyboards expect.</p>
                </div>
                <div className="dp-chart-card">
                  <div className="dp-chart-shell">
                    <div className="dp-donut" data-target-degree="313.2">
                      <div className="dp-donut-inner"></div>
                      <div className="dp-donut-value">87%</div>
                    </div>
                  </div>
                  <div className="dp-legend">
                    <div className="dp-legend-item">
                      <div className="dp-dot-small dp-dot-red"></div>Too small
                    </div>
                    <div className="dp-legend-item">
                      <div className="dp-dot-small dp-dot-green"></div>Comfortable
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="dp-center" style={{ marginBottom: "2rem" }}>
                  <span className="dp-stat-number">24%</span>
                  <span className="dp-sub-stat">of males</span>
                  <p className="dp-text-soft" style={{ maxWidth: "18rem", margin: "0.5rem auto 0" }}>Also fall below the comfortable reach threshold for a standard 6.5 inch keyboard.</p>
                </div>
                <div className="dp-chart-card">
                  <div className="dp-chart-shell">
                    <div className="dp-donut" data-target-degree="86.4">
                      <div className="dp-donut-inner"></div>
                      <div className="dp-donut-value">24%</div>
                    </div>
                  </div>
                  <div className="dp-legend">
                    <div className="dp-legend-item">
                      <div className="dp-dot-small dp-dot-red"></div>Too small
                    </div>
                    <div className="dp-legend-item">
                      <div className="dp-dot-small dp-dot-green"></div>Comfortable
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="dp-split-stats">
              <div>
                <div className="dp-kpi-val">8.5"</div>
                <span className="dp-kpi-label">The Threshold</span>
                <p className="dp-text-soft">Minimum hand span needed to play a conventional 6.5 inch keyboard from Yamaha or Steinway with real comfort.</p>
              </div>
              <div>
                <div className="dp-kpi-val">25-30%</div>
                <span className="dp-kpi-label">Larger Reach Required</span>
                <p className="dp-text-soft">Hand span often needs to be at least one quarter larger than the octave just to reach 8ths, 9ths, and 10ths without strain.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- DIVIDER --- */}
        <div style={{ width: "100%", maxWidth: "80rem", height: "1px", backgroundColor: "rgba(255, 255, 255, 0.15)", margin: "0 auto", display: "block" }}></div>

        {/* --- RESEARCH SECTION --- */}
        <section className="dp-section-wrapper dp-section-padding-research">
          <style jsx>{`
            .dp-section-padding-research { padding: 6rem 0 10rem; }
            .dp-center { text-align: center; }
            .dp-mb-lg { margin-bottom: 4rem; }
            .dp-section-wrapper {
              width: 100%;
              background-color: #000000;
              color: #ffffff;
              font-family: 'Manrope', system-ui, -apple-system, sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .dp-content-container {
              width: 100%;
              max-width: 80rem; /* WIDENED from 68rem */
              padding: 0 1.5rem;
              box-sizing: border-box;
            }
             .dp-research-grid {
                display: grid;
                gap: 1.5rem;
                margin-bottom: 4rem;
                grid-template-columns: 1fr;
             }
             @media (min-width: 768px) { .dp-research-grid { grid-template-columns: repeat(2, 1fr); } }
             .dp-pill-card {
                border-radius: 1rem;
                border: 1px solid rgba(255, 255, 255, 0.15);
                background: #111111;
                padding: 2.5rem; /* Increased Padding */
                transition: all 0.2s ease;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                height: 100%;
             }
             .dp-pill-card:hover {
                background: #161616;
                transform: translateY(-2px);
                border-color: rgba(255, 255, 255, 0.3);
             }
             .dp-card-title { 
                font-size: 1.5rem; /* Increased size significantly */
                font-weight: 700; 
                color: #fff; 
                margin-bottom: 0.75rem; 
                line-height: 1.2; /* Tightened line height */
             }
             .dp-card-meta { font-size: 0.9rem; color: #888; margin-bottom: 1.25rem; }
             .dp-card-body { 
                font-size: 1rem; 
                color: rgba(255,255,255,0.7); 
                line-height: 1.6; 
                margin-bottom: 2rem; 
                flex-grow: 1; 
             }
             .dp-card-cta {
                margin-top: auto;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                background: #fff;
                color: #000;
                padding: 0.75rem 1.25rem;
                border-radius: 999px;
                font-size: 0.9rem;
                font-weight: 700;
                text-decoration: none;
                transition: background 0.2s;
             }
             .dp-card-cta:hover { background: #f0f0f0; }

             .dp-academic-block {
                background: linear-gradient(145deg, #161616, #0a0a0a); /* Subtler gradient */
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 1.5rem;
                padding: 2.5rem;
             }
             .dp-academic-list {
                display: grid;
                gap: 2rem; /* Increased gap */
                margin-top: 3rem; /* Increased spacing from header */
                grid-template-columns: 1fr;
             }
             @media (min-width: 768px) { .dp-academic-list { grid-template-columns: repeat(2, 1fr); } }
             
             .dp-uni-item { display: flex; gap: 1rem; align-items: flex-start; }
             .dp-check-icon { 
                width: 24px; height: 24px; 
                background: #000; 
                border-radius: 50%; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0;
                border: 1px solid #222; /* Added subtle border */
             }
             .dp-check-icon svg { stroke: #34c759; }
           `}</style>

          <div className="dp-content-container">
            <div className="dp-center dp-mb-lg">
              <h2 className="dp-h2">Published Research</h2>
              <p className="dp-text-soft" style={{ maxWidth: "36rem", margin: "0 auto", fontSize: "1.1rem" }}>Decades of peer reviewed research explain why standard keyboards hold most pianists back.</p>
            </div>

            <div className="dp-research-grid">
              {/* Card 1 */}
              <div className="dp-pill-card">
                <div className="dp-card-title">Hand size and performance related injuries</div>
                <div className="dp-card-meta">Applied Ergonomics, 2021</div>
                <div className="dp-card-body">Pianists with smaller hands show <strong>reduced muscular effort and lower perceived strain</strong> when they move to 5.5 inch octave keyboards instead of standard size.</div>
                <a href="https://www.sciencedirect.com/science/article/abs/pii/S0003687021001654" target="_blank" className="dp-card-cta">
                  Read full study
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                </a>
              </div>
              {/* Card 2 */}
              <div className="dp-pill-card">
                <div className="dp-card-title">Gender differences and career impact</div>
                <div className="dp-card-meta">Susan Tomes</div>
                <div className="dp-card-body">Studies note that <strong>internationally acclaimed women pianists tend to have larger hands</strong>, which aligns with a repertoire that often expects very wide reaches.</div>
                <a href="https://www.susantomes.com/blog/hand-size-gender-differences-pianists-acclaim/" target="_blank" className="dp-card-cta">
                  Read article
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                </a>
              </div>
              {/* Card 3 */}
              <div className="dp-pill-card">
                <div className="dp-card-title">Benefits of ergonomically scaled keyboards</div>
                <div className="dp-card-meta">Survey of reduced size users</div>
                <div className="dp-card-body">Players report <strong>relief from pain, faster technical progress, and greater comfort</strong> when they move to keyboards that match their hand span.</div>
                <a href="https://www.researchgate.net/publication/264457999" target="_blank" className="dp-card-cta">
                  Read full study
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                </a>
              </div>
              {/* Card 4 */}
              <div className="dp-pill-card">
                <div className="dp-card-title">Performance quality improvements</div>
                <div className="dp-card-meta">PASK findings</div>
                <div className="dp-card-body"><strong>Shorter reaches and reduced wrist travel</strong> on compatible keyboards are linked to better control and lower risk of overuse injuries.</div>
                <a href="https://paskpiano.org/performance-quality/" target="_blank" className="dp-card-cta">
                  Learn more
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                </a>
              </div>
            </div>

            <div className="dp-academic-block">
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.5rem", color: "#fff" }}>Academic recognition</h3>
              <p className="dp-text-soft">The Donison Steinbuhler standard appears in research and teaching at leading institutions.</p>
              <div className="dp-academic-list">
                <div className="dp-uni-item">
                  <div className="dp-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}><path d="M20 6 9 17l-5-5"></path></svg></div>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 0.25rem", color: "#fff" }}>Stanford University</h4>
                    <p className="dp-text-soft" style={{ fontSize: "0.95rem", margin: 0 }}>Research and advocacy around scaled keyboards in music education and injury prevention.</p>
                  </div>
                </div>
                <div className="dp-uni-item">
                  <div className="dp-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}><path d="M20 6 9 17l-5-5"></path></svg></div>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 0.25rem", color: "#fff" }}>Johns Hopkins Peabody Institute</h4>
                    <p className="dp-text-soft" style={{ fontSize: "0.95rem", margin: 0 }}>Use of alternative sizes inside curriculum and performance programs.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spacer */}
        <div className="div-block-7" style={{ height: "15rem" }}></div>
      </main>
      <Footer />
    </div>
  );
}
