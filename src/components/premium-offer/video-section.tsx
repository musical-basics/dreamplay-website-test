"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  function handlePlay() {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <section className="relative leading-[0] -mt-px bg-neutral-200">
      <div className="relative w-full aspect-video">
        <video
          ref={videoRef}
          className="h-full w-full object-cover block"
          controls={isPlaying}
          playsInline
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          <source
            src="https://pub-ae162277c7104eb2b558af08104deafc.r2.dev/Final%204k%20Video%20DreamPlay%20Intro.mp4"
            type="video/mp4"
          />
          Your browser does not support the video element.
        </video>

        {!isPlaying && (
          <>
            <Image
              src="/images/Piano + Bench Frontal + Bundle.png"
              alt="DreamPlay One with Bench"
              fill
              className="object-cover"
              priority
            />
            <button
              onClick={handlePlay}
              className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center transition-colors hover:bg-white/5"
              aria-label="Play DreamPlay intro video"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm transition-transform hover:scale-110 md:h-24 md:w-24">
                <Play className="ml-1 h-8 w-8 fill-white text-white md:h-10 md:w-10" />
              </span>
            </button>
          </>
        )}
      </div>
    </section>
  )
}
