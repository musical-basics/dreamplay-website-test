export function StanfordQuoteSection() {
    return (
        <section className="relative overflow-hidden bg-foreground">
            <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
                <div className="border-l-2 border-background/20 pl-8 md:pl-12">
                    <blockquote className="font-serif text-lg leading-relaxed text-background/80 md:text-xl lg:text-2xl text-balance italic">
                        &ldquo;We would never expect a world-class athlete to compete with
                        equipment that does not fit their body. Yet we ask pianists,
                        particularly women, to adapt to a one-size-fits-all design that was
                        never built with them in mind.&rdquo;
                    </blockquote>
                    <div className="mt-6 flex flex-col gap-0.5">
                        <cite className="font-sans text-sm font-medium text-background/70 not-italic">
                            Elizabeth Schumann
                        </cite>
                        <span className="font-sans text-xs text-background/40">
                            Director of Keyboard Studies, Stanford University
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}
