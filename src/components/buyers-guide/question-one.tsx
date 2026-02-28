"use client"

import { User, Gift } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuestionOneProps {
    selected: string | null
    onSelect: (value: "myself" | "someone-else") => void
}

export function QuestionOne({ selected, onSelect }: QuestionOneProps) {
    return (
        <section id="question-1" className="py-20 px-6 border-t border-border">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-foreground text-background text-sm font-semibold">
                        1
                    </span>
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        Question One
                    </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-4">
                    Who is this keyboard for?
                </h2>
                <p className="text-muted-foreground text-lg mb-10">
                    Let us know if you&apos;re shopping for yourself or someone special.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                    <button
                        onClick={() => onSelect("myself")}
                        className={cn(
                            "group relative p-8 rounded-2xl border-2 text-left transition-all duration-200",
                            "hover:border-foreground hover:shadow-lg",
                            selected === "myself"
                                ? "border-foreground bg-foreground/5"
                                : "border-border bg-background"
                        )}
                    >
                        <div className="flex items-start gap-4">
                            <div
                                className={cn(
                                    "flex items-center justify-center w-14 h-14 rounded-xl transition-colors",
                                    selected === "myself" ? "bg-foreground text-background" : "bg-muted text-foreground"
                                )}
                            >
                                <User className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-foreground mb-1">For Myself</h3>
                                <p className="text-muted-foreground text-sm">
                                    I&apos;m looking for a keyboard that fits my own hands
                                </p>
                            </div>
                        </div>
                        {selected === "myself" && (
                            <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-foreground flex items-center justify-center">
                                <svg className="w-4 h-4 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        )}
                    </button>

                    <button
                        onClick={() => onSelect("someone-else")}
                        className={cn(
                            "group relative p-8 rounded-2xl border-2 text-left transition-all duration-200",
                            "hover:border-foreground hover:shadow-lg",
                            selected === "someone-else"
                                ? "border-foreground bg-foreground/5"
                                : "border-border bg-background"
                        )}
                    >
                        <div className="flex items-start gap-4">
                            <div
                                className={cn(
                                    "flex items-center justify-center w-14 h-14 rounded-xl transition-colors",
                                    selected === "someone-else"
                                        ? "bg-foreground text-background"
                                        : "bg-muted text-foreground"
                                )}
                            >
                                <Gift className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-foreground mb-1">For Someone Else</h3>
                                <p className="text-muted-foreground text-sm">
                                    I&apos;m buying this as a gift for a child, partner, or friend
                                </p>
                            </div>
                        </div>
                        {selected === "someone-else" && (
                            <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-foreground flex items-center justify-center">
                                <svg className="w-4 h-4 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </section>
    )
}
