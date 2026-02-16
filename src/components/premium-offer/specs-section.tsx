"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import { useState } from "react"
import { ZoomIn } from "lucide-react"

const specs = [
  { label: "Keyboard Versions", value: "DS5.5 (7/8ths size) or DS6.0 (15/16ths size)" },
  {
    label: "Overall Dimensions (L x W x H)",
    value: '48.27" x 11.65" x 5.9" (1226 mm x 296 mm x 150 mm)',
  },
  {
    label: "Active Key Width",
    value: 'DS 6.0: 44.53" (1131 mm) | DS 5.5: 41.1" (1044 mm)',
  },
  { label: "Action", value: "Graded Hammer Action (Weighted)" },
  { label: "Polyphony", value: "256 Notes (never cut off a sound)" },
  {
    label: "Connectivity",
    value:
      "USB-MIDI, Bluetooth Audio, 2x Headphone Jacks, Aux In/Out, Sustain Pedal",
  },
]

const soundDetails = [
  {
    title: "Authentic Feel & Sound",
    description:
      "We didn't cut corners. The DreamPlay One features graded \"hammer-feel\" weighted keys and a beautiful, modern piano sound engine. Every note responds to your touch with the same dynamic range you'd expect from an acoustic grand.",
  },
  {
    title: "Smart & Connected",
    description:
      "Built for the modern musician, it comes equipped with an onboard metronome, full MIDI connectivity, interactive LEDs, and seamless learning app connectivity. Whether you're composing, recording, or learning, the DreamPlay One adapts to your workflow.",
  },
]

export function SpecsSection() {
  const [showLightbox, setShowLightbox] = useState(false)

  return (
    <section id="specs" className="relative overflow-hidden bg-neutral-950">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 lg:py-32">
        <div className="mb-16 max-w-2xl">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-neutral-400">
            Technical Details
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-4xl lg:text-5xl text-balance">
            Built without compromise.
          </h2>
        </div>

        {/* Product Dimensions Thumbnail */}
        <button
          onClick={() => setShowLightbox(true)}
          className="group relative mb-16 max-w-xs overflow-hidden rounded-md border border-neutral-800 transition-all hover:border-neutral-600 hover:shadow-lg cursor-pointer"
        >
          <Image
            src="/images/Main Product With Dimensions Info.JPG"
            alt="DreamPlay One keyboard with dimensions"
            width={400}
            height={200}
            className="w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/30">
            <ZoomIn className="h-6 w-6 text-white opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <p className="px-3 py-2 text-xs text-neutral-400">Click to enlarge</p>
        </button>

        {/* Lightbox */}
        {showLightbox && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 cursor-pointer"
            onClick={() => setShowLightbox(false)}
          >
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute right-6 top-6 text-white/70 hover:text-white text-3xl font-light"
            >
              ✕
            </button>
            <Image
              src="/images/Main Product With Dimensions Info.JPG"
              alt="DreamPlay One keyboard with dimensions"
              width={1600}
              height={900}
              className="max-h-[90vh] w-auto max-w-full object-contain"
            />
          </div>
        )}

        {/* Spec Table */}
        <div className="mb-16">
          {specs.map((spec, i) => (
            <div
              key={spec.label}
              className={`flex flex-col gap-1 border-b border-neutral-800 py-5 md:flex-row md:items-baseline md:gap-8 ${i === 0 ? "border-t" : ""
                }`}
            >
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-400 md:w-64 md:shrink-0 md:text-sm">
                {spec.label}
              </span>
              <span className="font-sans text-sm text-white md:text-base">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* Sound & connectivity details with accordion for longer text */}
        <div className="grid gap-6 md:grid-cols-2">
          {soundDetails.map((detail) => (
            <Accordion key={detail.title} type="single" collapsible>
              <AccordionItem value={detail.title} className="border-neutral-800">
                <AccordionTrigger className="font-serif text-lg text-white hover:no-underline md:text-xl">
                  {detail.title}
                </AccordionTrigger>
                <AccordionContent className="font-sans text-sm leading-relaxed text-neutral-400 md:text-base">
                  {detail.description}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  )
}
