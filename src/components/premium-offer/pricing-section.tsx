import Image from "next/image"
import { ArrowRight } from "lucide-react"

const tiers = [
  {
    badge: "Most Popular",
    title: "DreamPlay Bundle",
    subtitle: "Founder's Batch",
    price: "$599",
    description:
      "The complete DreamPlay experience. Keyboard, adjustable stand, responsive sustain pedal, and comfortable padded bench.",
    includes: ["DreamPlay One Keyboard", "Keyboard Stand", "Sustain Pedal", "Padded Bench"],
    delivery: "Aug 2026",
    backers: 208,
    remaining: 42,
    total: 250,
    highlight: true,
  },
  {
    badge: null,
    title: "DreamPlay One",
    subtitle: "Founder's Batch",
    price: "$499",
    description:
      "The DreamPlay One Keyboard. Available in DS5.5 or DS6.0. Choose Midnight Black or Pearl White.",
    includes: ["DreamPlay One Keyboard"],
    delivery: "Aug 2026",
    backers: 40,
    remaining: 10,
    total: 50,
    highlight: false,
  },
  {
    badge: null,
    title: "Reserve (50%)",
    subtitle: "Late 2026 / Early 2027",
    price: "$299",
    description:
      "Pay 50% now, the rest (50% + shipping/taxes) when ready to ship. Secures your spot in Batch 2.",
    includes: ["DreamPlay One Keyboard", "Keyboard Stand", "Sustain Pedal"],
    delivery: "Dec 2026",
    backers: 2,
    remaining: 8,
    total: 10,
    highlight: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-foreground">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 lg:py-32">
        <div className="mb-16 max-w-2xl">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-background/50">
            Pre-Order Now
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-background md:text-4xl lg:text-5xl text-balance">
            Reserve your DreamPlay One.
          </h2>
          <p className="mt-6 font-sans text-sm leading-relaxed text-background/60 md:text-base">
            Ships worldwide. Choose the size and color that suits you after
            placing your order.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.title}
              className={`relative flex flex-col border p-8 transition-all md:p-10 ${
                tier.highlight
                  ? "border-background/30 bg-background/5"
                  : "border-background/10 bg-transparent"
              }`}
            >
              {tier.badge && (
                <span className="mb-4 self-start font-sans text-[10px] uppercase tracking-[0.3em] text-background/50">
                  {tier.badge}
                </span>
              )}

              <h3 className="font-serif text-xl text-background md:text-2xl">
                {tier.title}
              </h3>
              <p className="mt-1 font-sans text-xs text-background/40">
                {tier.subtitle}
              </p>

              <p className="mt-6 font-serif text-4xl text-background md:text-5xl">
                {tier.price}
              </p>

              <p className="mt-6 font-sans text-sm leading-relaxed text-background/60">
                {tier.description}
              </p>

              {/* Includes */}
              <div className="mt-6 flex flex-col gap-2">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-background/40">
                  Includes
                </p>
                {tier.includes.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-background/40" />
                    <span className="font-sans text-sm text-background/70">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Meta */}
              <div className="mt-6 flex items-center gap-6">
                <div>
                  <p className="font-sans text-xs text-background/40">
                    Delivery
                  </p>
                  <p className="font-sans text-sm text-background/70">
                    {tier.delivery}
                  </p>
                </div>
                <div className="h-6 w-px bg-background/10" aria-hidden="true" />
                <div>
                  <p className="font-sans text-xs text-background/40">
                    Backers
                  </p>
                  <p className="font-sans text-sm text-background/70">
                    {tier.backers}
                  </p>
                </div>
                <div className="h-6 w-px bg-background/10" aria-hidden="true" />
                <div>
                  <p className="font-sans text-xs text-background/40">
                    Left
                  </p>
                  <p className="font-sans text-sm text-background/70">
                    {tier.remaining} of {tier.total}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-px w-full bg-background/10">
                <div
                  className="h-full bg-background/40 transition-all"
                  style={{
                    width: `${((tier.total - tier.remaining) / tier.total) * 100}%`,
                  }}
                />
              </div>

              {/* CTA */}
              <a
                href="#"
                className={`mt-8 group flex items-center justify-center gap-2 border px-6 py-4 text-center font-sans text-xs uppercase tracking-widest transition-colors ${
                  tier.highlight
                    ? "border-background bg-background text-foreground hover:bg-background/90"
                    : "border-background/30 text-background hover:bg-background/10"
                }`}
              >
                Reserve for {tier.price}
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
