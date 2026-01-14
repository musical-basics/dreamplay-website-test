"use client"

import { Check, Truck, Package, Clock, Gift } from "lucide-react"

export function ValueProposition() {
  const items = [
    { label: "DreamPlay Digital Piano", col: 1 },
    { label: "Premium Adjustable Stand", col: 2 },
    { label: "Cushioned Piano Bench", col: 1 },
    { label: "Sustain Pedal", col: 2 },
    { label: "Music Rest", col: 1 },
    { label: "Power Adapter", col: 2 },
  ]

  const badges = [
    { icon: Truck, label: "Free Shipping" },
    { icon: Package, label: "Complete Bundle" },
    { icon: Clock, label: "Ships in 2-3 Days" },
  ]

  // Each slot has a unique ID and background color matching reference
  const imageSlots = {
    // Row 1
    benchTop: { bg: "#e8e5e0", label: "Piano Bench", slot: 1 },
    keyboardTop: { bg: "#f5f5f5", label: "Keyboard Top View", slot: 2 },
    pianoMusicRest: { bg: "#d8d5d0", label: "Piano with Music Rest", slot: 3 },
    // Row 2
    pianoStandDark: { bg: "#1a1a1a", label: "Sustain Pedal", slot: 4, dark: true },
    xStand: { bg: "#ffffff", label: "X-Stand", slot: 5 },
    pianoAngled: { bg: "#c8c5c0", label: "DreamPlay Stand", slot: 6 },
  }

  return (
    <section className="sticky top-0 z-40 min-h-screen">
      {/* 
        SMART GRID LAYOUT - 4 columns, 2 rows
        Column widths: 15fr | 22fr | 33fr | 30fr (proportional to reference)
        Upload your images to each slot - they will maintain aspect ratio on resize
      */}
      <div
        className="h-screen grid grid-rows-2"
        style={{
          display: "grid",
          gridTemplateColumns: "15fr 22fr 33fr 30fr",
          gridTemplateRows: "1fr 1fr",
        }}
      >
        {/* ============ ROW 1 ============ */}

        {/* Slot 1: Piano Bench - Top Left */}
        <div
          className="relative overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: imageSlots.benchTop.bg }}
        >
          {/* UPLOAD IMAGE HERE - will fill container */}
          <img
            src="/holiday-sale/images/slot-1-bench.png"
            alt={imageSlots.benchTop.label}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none"
              e.currentTarget.nextElementSibling?.classList.remove("hidden")
            }}
          />
          <div className="hidden absolute inset-0 flex items-center justify-center text-neutral-400 text-xs font-medium">
            Slot 1: {imageSlots.benchTop.label}
          </div>
        </div>

        {/* Slot 2: Keyboard Top View */}
        <div
          className="relative overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: imageSlots.keyboardTop.bg }}
        >
          <img
            src="/holiday-sale/images/slot-2-piano-top.png"
            alt={imageSlots.keyboardTop.label}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none"
              e.currentTarget.nextElementSibling?.classList.remove("hidden")
            }}
          />
          <div className="hidden absolute inset-0 flex items-center justify-center text-neutral-400 text-xs font-medium">
            Slot 2: {imageSlots.keyboardTop.label}
          </div>
        </div>

        {/* Slot 3: Piano with Music Rest - Larger cell */}
        <div
          className="relative overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: imageSlots.pianoMusicRest.bg }}
        >
          <img
            src="/holiday-sale/images/slot-3-piano-rest.png"
            alt={imageSlots.pianoMusicRest.label}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none"
              e.currentTarget.nextElementSibling?.classList.remove("hidden")
            }}
          />
          <div className="hidden absolute inset-0 flex items-center justify-center text-neutral-400 text-xs font-medium">
            Slot 3: {imageSlots.pianoMusicRest.label}
          </div>
        </div>

        {/* Text Content - Spans both rows */}
        <div className="bg-white row-span-2 flex flex-col justify-center px-6 xl:px-10 py-10">
          <div className="inline-flex items-center gap-2 bg-neutral-900 text-white text-xs font-medium px-3 py-1.5 rounded-full w-fit mb-6">
            <Gift className="w-3.5 h-3.5" />
            Limited Time Offer
          </div>

          <h2 className="text-2xl xl:text-3xl font-bold text-neutral-900 leading-tight">
            Complete Bundle.
            <br />
            Zero Extras to Buy.
          </h2>

          <p className="text-neutral-500 mt-4 text-sm leading-relaxed">
            For a limited time, every purchase includes a professional bench and stand — everything you need to start
            playing immediately.
          </p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mt-6">
            {items.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border border-neutral-300 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-neutral-600" />
                </div>
                <span className="text-xs text-neutral-700">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-neutral-200">
            {badges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-1.5 text-neutral-500">
                <badge.icon className="w-3.5 h-3.5" />
                <span className="text-[10px] font-medium">{badge.label}</span>
              </div>
            ))}
          </div>

          <button className="mt-6 inline-flex items-center justify-center gap-2 bg-neutral-900 text-white px-5 py-2.5 rounded-full text-xs font-medium hover:bg-neutral-800 transition-colors w-fit">
            Claim Your Bundle
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* ============ ROW 2 ============ */}

        {/* Slot 4: Piano on Stand - Dark background */}
        <div
          className="relative overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: imageSlots.pianoStandDark.bg }}
        >
          <img
            src="/holiday-sale/images/slot-4-pedal.jpg"
            alt={imageSlots.pianoStandDark.label}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none"
              e.currentTarget.nextElementSibling?.classList.remove("hidden")
            }}
          />
          <div className="hidden absolute inset-0 flex items-center justify-center text-neutral-500 text-xs font-medium">
            Slot 4: {imageSlots.pianoStandDark.label}
          </div>
        </div>

        {/* Slot 5: X-Stand - White background */}
        <div
          className="relative overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: imageSlots.xStand.bg }}
        >
          <img
            src="/holiday-sale/images/slot-5-x-stand.png"
            alt={imageSlots.xStand.label}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none"
              e.currentTarget.nextElementSibling?.classList.remove("hidden")
            }}
          />
          <div className="hidden absolute inset-0 flex items-center justify-center text-neutral-400 text-xs font-medium">
            Slot 5: {imageSlots.xStand.label}
          </div>
        </div>

        {/* Slot 6: Piano Angled View */}
        <div
          className="relative overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: imageSlots.pianoAngled.bg }}
        >
          <img
            src="/holiday-sale/images/slot-6-piano-stand.png"
            alt={imageSlots.pianoAngled.label}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none"
              e.currentTarget.nextElementSibling?.classList.remove("hidden")
            }}
          />
          <div className="hidden absolute inset-0 flex items-center justify-center text-neutral-400 text-xs font-medium">
            Slot 6: {imageSlots.pianoAngled.label}
          </div>
        </div>

        {/* Row 2 Col 4 is covered by row-span-2 text content above */}
      </div>
    </section>
  )
}
