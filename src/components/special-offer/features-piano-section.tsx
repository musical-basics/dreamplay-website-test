"use client"
import { useState, useEffect, useRef } from "react"
import { Bluetooth, Usb, Volume2, Music, Headphones, Piano } from "lucide-react"

type FeatureKey = "bluetooth" | "usb" | "presets" | "speakers" | "headphones" | "keys" | null

const featureData = {
    bluetooth: {
        icon: <Bluetooth className="w-4 h-4" />,
        label: "Bluetooth",
        description: "Connect wirelessly to your devices for seamless audio streaming and MIDI control.",
        position: { left: "32%", top: "38%" },
    },
    usb: {
        icon: <Usb className="w-4 h-4" />,
        label: "USB MIDI",
        description: "Direct USB connection for recording and integrating with your favorite music software.",
        position: { left: "36%", top: "38%" },
    },
    presets: {
        icon: <Music className="w-4 h-4" />,
        label: "18 Presets",
        description: "Choose from 18 professionally crafted instrument sounds including grand pianos and strings.",
        position: { left: "50%", top: "52%" },
    },
    speakers: {
        icon: <Volume2 className="w-4 h-4" />,
        label: "Hi-Fi Speakers",
        description: "Built-in high-fidelity speakers deliver rich, room-filling sound without external equipment.",
        position: { left: "16%", top: "48%" },
    },
    headphones: {
        icon: <Headphones className="w-4 h-4" />,
        label: "Dual Headphone Jack",
        description: "Two headphone outputs for private practice sessions or teacher-student learning.",
        position: { left: "14%", top: "38%" },
    },
    keys: {
        icon: <Piano className="w-4 h-4" />,
        label: "88 Weighted Keys",
        description: "Full-size weighted keys provide authentic piano feel and responsive touch dynamics.",
        position: { left: "50%", top: "70%" },
    },
}

export function FeaturesPianoSection() {
    const [activeFeature, setActiveFeature] = useState<FeatureKey>(null)
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.2 },
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    const handleFeatureInteraction = (key: FeatureKey) => {
        setActiveFeature((prev) => (prev === key ? null : key))
    }

    return (
        <section ref={sectionRef} className="py-16 md:py-24 lg:py-32 bg-white min-h-screen flex flex-col justify-center">
            <div className="container mx-auto px-4 md:px-6">
                <div
                    className={`text-center mb-6 md:mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                    <p className="text-neutral-500 text-xs md:text-sm uppercase tracking-widest mb-2 md:mb-3">Our Features</p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-900 leading-tight">
                        Everything You Need, Built In
                    </h2>
                    <p className="text-neutral-400 text-xs md:text-sm mt-2 md:mt-3">
                        <span className="hidden md:inline">Hover over</span>
                        <span className="md:hidden">Tap</span> a feature to learn more
                    </p>
                </div>

                <div
                    className={`relative max-w-4xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                    <div className="grid grid-cols-3 gap-2 sm:gap-2 md:flex md:justify-center md:gap-3 mb-4 md:mb-6">
                        {(Object.keys(featureData) as FeatureKey[]).filter(Boolean).map((key) => {
                            const feature = featureData[key!]
                            return (
                                <button
                                    key={key}
                                    className={`flex items-center justify-center gap-1 md:gap-2 rounded-full px-2.5 py-1.5 md:px-4 md:py-2 transition-shadow duration-300 ease-out ${activeFeature === key
                                        ? "bg-gradient-to-r from-sky-400 to-blue-500 text-white shadow-lg"
                                        : "bg-white text-neutral-600 shadow-md hover:shadow-lg hover:text-sky-500"
                                        } border border-neutral-200/60`}
                                    onClick={() => handleFeatureInteraction(key)}
                                    onMouseEnter={() => setActiveFeature(key)}
                                    onMouseLeave={() => setActiveFeature(null)}
                                >
                                    <span className="flex-shrink-0 [&>svg]:w-4 [&>svg]:h-4 md:[&>svg]:w-5 md:[&>svg]:h-5">{feature.icon}</span>
                                    <span className="text-[9px] sm:text-[10px] md:text-sm font-medium whitespace-nowrap">
                                        {feature.label}
                                    </span>
                                </button>
                            )
                        })}
                    </div>

                    <div className="relative rounded-md md:rounded-xl overflow-hidden bg-neutral-100">
                        <img
                            src="/images/Main%20Product%20Grey%20Background.JPG"
                            alt="DreamPlay One Features"
                            className="w-full h-auto"
                        />

                        {activeFeature && (
                            <svg
                                className="absolute inset-0 w-full h-full pointer-events-none"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                            >
                                <line
                                    x1="50"
                                    y1="0"
                                    x2={Number.parseFloat(featureData[activeFeature].position.left)}
                                    y2={Number.parseFloat(featureData[activeFeature].position.top)}
                                    stroke="#171717"
                                    strokeWidth="0.15"
                                />
                                <circle
                                    cx={Number.parseFloat(featureData[activeFeature].position.left)}
                                    cy={Number.parseFloat(featureData[activeFeature].position.top)}
                                    r="0.8"
                                    fill="#171717"
                                />
                            </svg>
                        )}

                        {activeFeature && (
                            <div
                                className="absolute w-2 h-2 md:w-3 md:h-3 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                style={{
                                    left: featureData[activeFeature].position.left,
                                    top: featureData[activeFeature].position.top,
                                }}
                            >
                                <div className="absolute inset-0 bg-sky-400 rounded-full animate-ping opacity-50" />
                                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full" />
                            </div>
                        )}
                    </div>

                    <div className="h-[80px] md:h-[100px] mt-3 md:mt-6 flex items-start justify-center">
                        {activeFeature ? (
                            <div className="text-center max-w-lg px-4 md:px-6">
                                <h3 className="font-medium bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent text-sm md:text-base mb-1">
                                    {featureData[activeFeature].label}
                                </h3>
                                <p className="text-neutral-500 text-xs md:text-sm leading-relaxed">
                                    {featureData[activeFeature].description}
                                </p>
                            </div>
                        ) : (
                            <p className="text-neutral-300 text-xs md:text-sm">Select a feature above</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
