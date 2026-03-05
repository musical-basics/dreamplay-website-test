"use client"

import { useRef, useEffect } from "react"

const BG_VIDEO = "/videos/DreamPlay Hero 1080p v4 Loop.mov"

export function VideoHero3() {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handleLoaded = () => {
            video.currentTime = 0
        }

        const handleTimeUpdate = () => {
            if (video.currentTime >= 7) {
                video.currentTime = 0
                video.play()
            }
        }

        video.addEventListener("loadedmetadata", handleLoaded)
        video.addEventListener("timeupdate", handleTimeUpdate)

        return () => {
            video.removeEventListener("loadedmetadata", handleLoaded)
            video.removeEventListener("timeupdate", handleTimeUpdate)
        }
    }, [])

    return (
        <section className="relative min-h-screen md:min-h-0 md:aspect-video overflow-hidden">
            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover brightness-[0.55] contrast-[1.1] saturate-[0.85]"
            >
                <source src={BG_VIDEO} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/[0.02] to-transparent" />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.25) 100%)' }} />

            <div
                className="relative z-10 flex h-full min-h-screen md:min-h-0 md:aspect-video flex-col justify-center px-8 md:px-16 lg:px-24"
                style={{
                    textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 30px rgba(0,0,0,0.4)',
                }}
            >
                <p className="font-sans text-sm font-bold uppercase tracking-[0.3em] text-white/70 md:text-lg">
                    Designed for You
                </p>
                <h2 className="mt-4 font-serif text-2xl leading-tight text-white md:text-4xl lg:text-5xl text-balance">
                    Find Your Perfect Fit.
                    <br />
                    Play Without Limits.
                </h2>
                <p className="mt-5 max-w-md font-sans text-base font-medium leading-relaxed text-white/80 md:text-xl">
                    Two professional sizes. One standard of excellence.
                    Choose the keyboard that matches your hands.
                </p>
            </div>
        </section>
    )
}
