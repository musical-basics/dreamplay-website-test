"use client"

import { ArrowRight, RefreshCw, Clock, Shield } from "lucide-react"

export function TradeInSection() {
    return (
        <section className="relative bg-neutral-950">
            <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 lg:py-32">
                {/* Header */}
                <div className="mb-16 max-w-3xl">
                    <p className="font-sans text-xs uppercase tracking-[0.3em] text-emerald-400">
                        Free Upgrade Program
                    </p>
                    <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-4xl lg:text-5xl text-balance">
                        They grow. Their keyboard grows with them.
                    </h2>
                    <p className="mt-5 font-sans text-base font-medium leading-relaxed text-white/60 md:text-lg max-w-2xl">
                        When your child&apos;s hands outgrow the DS5.5, trade it in for a DS6.0 — completely free.
                        No hidden fees, no fine print. Just a bigger keyboard for bigger hands.
                    </p>
                </div>

                {/* Trade-in flow visual */}
                <div className="grid gap-6 md:grid-cols-3 mb-16">
                    {/* Step 1 */}
                    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 mb-6">
                            <Shield className="w-6 h-6 text-emerald-400" strokeWidth={1.5} />
                        </div>
                        <h3 className="font-serif text-xl text-white mb-3">Start with DS5.5</h3>
                        <p className="font-sans text-sm leading-relaxed text-white/50">
                            The perfect 7/8ths-size keyboard for smaller hands. Your child plays comfortably from day one.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 mb-6">
                            <RefreshCw className="w-6 h-6 text-emerald-400" strokeWidth={1.5} />
                        </div>
                        <h3 className="font-serif text-xl text-white mb-3">Trade In When Ready</h3>
                        <p className="font-sans text-sm leading-relaxed text-white/50">
                            When their hands grow, send back the DS5.5 and we&apos;ll ship a brand-new DS6.0 at no extra cost.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 mb-6">
                            <ArrowRight className="w-6 h-6 text-emerald-400" strokeWidth={1.5} />
                        </div>
                        <h3 className="font-serif text-xl text-white mb-3">Play On, Pain-Free</h3>
                        <p className="font-sans text-sm leading-relaxed text-white/50">
                            Your child continues playing on a properly-sized keyboard — no gap in practice, no added expense.
                        </p>
                    </div>
                </div>

                {/* Urgency CTA */}
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/15 flex-shrink-0">
                        <Clock className="w-6 h-6 text-emerald-400" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-serif text-xl text-white mb-2">
                            This offer is only available during our launch promo.
                        </h3>
                        <p className="font-sans text-sm leading-relaxed text-white/60">
                            The free DS5.5 → DS6.0 trade-in upgrade is exclusive to backers who lock in during our special launch pricing.
                            Once the promo ends, this upgrade will no longer be offered free of charge.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
