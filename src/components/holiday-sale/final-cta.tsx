import Image from "next/image"

export function FinalCta() {
  return (
    <section className="sticky top-0 z-[80] bg-white py-12 px-6 min-h-[80vh] flex flex-col items-center justify-center gap-8">
      <div className="relative w-full max-w-4xl aspect-[16/9] md:aspect-[21/9]">
        <Image
          src="/images/piano-bench-bundle.png"
          alt="DreamPlay Piano and Bench Bundle"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 80vw"
        />
      </div>
      <div className="max-w-md mx-auto w-full">
        <button className="w-full bg-neutral-900 text-white py-4 px-8 rounded-full text-lg font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2">
          Claim Your Bundle Now
          <span className="text-xl">→</span>
        </button>
      </div>
    </section>
  )
}
