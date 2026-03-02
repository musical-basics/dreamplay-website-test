"use client"

import { useRef, useCallback, useState, useEffect } from "react"

const BG_VIDEOS = [
  "https://pub-ae162277c7104eb2b558af08104deafc.r2.dev/Clip%203.m4v",
  "https://pub-ae162277c7104eb2b558af08104deafc.r2.dev/Clip%202.m4v",
]

export function CrowdfundingSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [textSlide, setTextSlide] = useState(0)

  const handleEnded = useCallback(() => {
    const nextIndex = (currentIndex + 1) % BG_VIDEOS.length
    setCurrentIndex(nextIndex)
    if (videoRef.current) {
      videoRef.current.src = BG_VIDEOS[nextIndex]
      videoRef.current.load()
      videoRef.current.play()
    }
  }, [currentIndex])

  useEffect(() => {
    const timer = setInterval(() => {
      setTextSlide((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const scrollToVideo = () => {
    const el = document.getElementById("video")
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover brightness-[0.6] contrast-[1.1] saturate-[0.85]"
        onEnded={handleEnded}
      >
        <source src={BG_VIDEOS[0]} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/30" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)' }} />

      <div className="relative z-10 flex h-full min-h-screen flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="relative min-h-[280px] md:min-h-[320px]">
          {/* Slide 1: Headline */}
          <div
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${textSlide === 0
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
              }`}
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/70 md:text-xs">
              Now available to pre-order
            </p>
            <h1 className="mt-4 font-serif text-3xl leading-tight text-white md:text-5xl lg:text-6xl xl:text-7xl text-balance">
              The Pro Keyboard
              <br />
              for Hands That Don{"'"}t
              <br />
              Fit the Standard.
            </h1>
          </div>

          {/* Slide 2: Stat + Description */}
          <div
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${textSlide === 1
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
              }`}
          >
            <p className="max-w-lg font-sans text-base leading-relaxed text-white/90 md:text-lg lg:text-xl">
              88 weighted keys. Narrower by design. Built for the 87% of women and
              24% of men whose hands were never the right size for a standard
              keyboard.
            </p>
            <div className="mt-8 flex items-center gap-6">
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-5xl text-white md:text-7xl lg:text-8xl">55</span>
                <span className="font-serif text-3xl text-white/70 md:text-4xl">%</span>
              </div>
              <div className="h-12 w-px bg-white/30" />
              <p className="font-sans text-sm uppercase tracking-[0.2em] text-white/60 leading-relaxed max-w-[200px]">
                of pianists have hands under 8.5 inches
              </p>
            </div>
          </div>

          {/* Slide 3: Mantra */}
          <div
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${textSlide === 2
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
              }`}
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/70 md:text-xs">
              Your journey starts here
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-5xl lg:text-6xl xl:text-7xl text-balance">
              Start With Keys
              <br />
              That Fit. Excel on
              <br />
              Any Stage.
            </h2>
            <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-white/80 md:text-base">
              A keyboard designed for your unique handspan — so you can play
              the way you were always meant to.
            </p>
          </div>
        </div>

        {/* Slide dots */}
        <div className="mt-6 flex gap-2">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setTextSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${textSlide === i ? "w-6 bg-white" : "w-1.5 bg-white/40"
                }`}
              aria-label={`Show slide ${i + 1}`}
            />
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a
            href="/customize"
            className="inline-block bg-white px-8 py-3 text-center text-xs font-sans uppercase tracking-widest text-black transition-colors hover:bg-white/90 md:text-sm"
          >
            Pre-Order Now
          </a>
          <button
            onClick={scrollToVideo}
            className="group inline-flex items-center justify-center gap-2 border border-white/30 px-8 py-3 text-center text-xs font-sans uppercase tracking-widest text-white transition-colors hover:bg-white/10 md:text-sm cursor-pointer"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/40">
              <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-2.5 w-2.5">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            Watch Video
          </button>
        </div>
      </div>
    </section>
  )
}
