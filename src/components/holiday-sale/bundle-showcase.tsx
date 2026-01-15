import Image from "next/image"

export function BundleShowcase() {
  return (
    <section className="sticky top-0 z-50 bg-black text-white min-h-[70vh]">
      <div className="grid md:grid-cols-[1fr_3.5fr] h-full min-h-[70vh]">
        {/* Left: Info */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="space-y-1 text-sm text-white/60">
            <p>*Free Shipping</p>
            <p>Complete Bundle</p>
            <p>Est. Shipping July 2026</p>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">DreamPlay One</h3>
            <button className="mt-6 border-2 border-solid border-white text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-white hover:text-black transition-colors">
              PRE-ORDER NOW
            </button>
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative aspect-[4/3] md:aspect-auto min-h-[300px]">
          <Image
            src="/images/piano-bench-bundle.png"
            alt="DreamPlay Piano and Bench Bundle"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 60vw"
            quality={100}
            priority
          />
        </div>
      </div>
    </section>
  )
}
