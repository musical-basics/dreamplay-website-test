"use client"

import { useState } from "react"
import Image from "next/image"
import { Hand, ArrowRight } from "lucide-react"

export function SizeFinderSection() {
  const [selectedSize, setSelectedSize] = useState<"ds55" | "ds60" | null>(null)

  return (
    <section id="size" className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 lg:py-32">
        <div className="mb-16 max-w-2xl">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Choose Your Fit
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-foreground md:text-4xl lg:text-5xl text-balance">
            Two sizes. One perfect fit.
          </h2>
          <p className="mt-6 font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
            We use the official DS Standard sizes &mdash; the same standard
            adopted by top universities worldwide. This is a professional
            instrument, not a toy.
          </p>
        </div>

        {/* How to measure */}
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-start md:gap-16">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <Hand className="h-5 w-5 text-foreground" strokeWidth={1.5} />
              <h3 className="font-serif text-lg text-foreground md:text-xl">
                How to Measure Your Hand
              </h3>
            </div>
            <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
              Place your hand flat on a table, fingers spread naturally. Measure
              from the tip of your thumb to the tip of your pinky. This is your
              hand span.
            </p>
          </div>
          <div className="relative flex-1 overflow-hidden rounded-sm">
            <Image
              src="/images/hands-measuring.jpg"
              alt="Hands demonstrating natural span on piano keys"
              width={600}
              height={340}
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* Size cards */}
        <div className="grid gap-4 md:grid-cols-2">
          <button
            onClick={() => setSelectedSize("ds55")}
            className={`group flex flex-col items-start gap-4 border p-8 text-left transition-all md:p-10 ${
              selectedSize === "ds55"
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-foreground hover:border-foreground"
            }`}
          >
            <p
              className={`font-sans text-xs uppercase tracking-[0.3em] ${
                selectedSize === "ds55"
                  ? "text-background/60"
                  : "text-muted-foreground"
              }`}
            >
              7/8ths Size
            </p>
            <h3 className="font-serif text-2xl md:text-3xl">DS5.5</h3>
            <p
              className={`font-sans text-sm leading-relaxed md:text-base ${
                selectedSize === "ds55"
                  ? "text-background/70"
                  : "text-muted-foreground"
              }`}
            >
              Designed for pianists with hands under 7.6 inches. Play octaves
              and 9ths with ease, and even the occasional 10th interval
              comfortably.
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span
                className={`font-sans text-xs uppercase tracking-wider ${
                  selectedSize === "ds55"
                    ? "text-background/80"
                    : "text-muted-foreground"
                }`}
              >
                {'Hand span < 7.6"'}
              </span>
              <ArrowRight
                className={`h-3 w-3 transition-transform group-hover:translate-x-1 ${
                  selectedSize === "ds55"
                    ? "text-background/80"
                    : "text-muted-foreground"
                }`}
              />
            </div>
          </button>

          <button
            onClick={() => setSelectedSize("ds60")}
            className={`group flex flex-col items-start gap-4 border p-8 text-left transition-all md:p-10 ${
              selectedSize === "ds60"
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-foreground hover:border-foreground"
            }`}
          >
            <p
              className={`font-sans text-xs uppercase tracking-[0.3em] ${
                selectedSize === "ds60"
                  ? "text-background/60"
                  : "text-muted-foreground"
              }`}
            >
              15/16ths Size
            </p>
            <h3 className="font-serif text-2xl md:text-3xl">DS6.0</h3>
            <p
              className={`font-sans text-sm leading-relaxed md:text-base ${
                selectedSize === "ds60"
                  ? "text-background/70"
                  : "text-muted-foreground"
              }`}
            >
              Designed for pianists with hands between 7.6 and 8.5 inches. Play
              octaves and 9ths with ease, and the occasional 10th without
              strain.
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span
                className={`font-sans text-xs uppercase tracking-wider ${
                  selectedSize === "ds60"
                    ? "text-background/80"
                    : "text-muted-foreground"
                }`}
              >
                {'Hand span 7.6" – 8.5"'}
              </span>
              <ArrowRight
                className={`h-3 w-3 transition-transform group-hover:translate-x-1 ${
                  selectedSize === "ds60"
                    ? "text-background/80"
                    : "text-muted-foreground"
                }`}
              />
            </div>
          </button>
        </div>

        {selectedSize && (
          <div className="mt-8 border border-foreground/10 bg-muted p-6 md:p-8">
            <p className="font-sans text-sm leading-relaxed text-foreground md:text-base">
              {selectedSize === "ds55" ? (
                <>
                  <strong className="font-serif text-base md:text-lg">
                    DS5.5 is your match.
                  </strong>{" "}
                  The active key width is 41.1{'"'} (1044 mm) &mdash;
                  approximately 7/8ths of a standard keyboard. This places you
                  in {'"'}Zone A{'"'}, where octaves, 9ths, and even 10ths
                  become comfortable.
                </>
              ) : (
                <>
                  <strong className="font-serif text-base md:text-lg">
                    DS6.0 is your match.
                  </strong>{" "}
                  The active key width is 44.53{'"'} (1131 mm) &mdash;
                  approximately 15/16ths of a standard keyboard. This places you
                  in {'"'}Zone B{'"'}, where octaves and 9ths are effortless and
                  10ths become reachable.
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
