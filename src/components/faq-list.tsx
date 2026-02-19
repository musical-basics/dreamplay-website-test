"use client";
import React, { useState } from "react";

interface FAQItem {
    question: string;
    answer: string;
}

export default function FAQList({ items }: { items: FAQItem[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="divide-y divide-neutral-200 border-t border-neutral-200">
            {items.map((item, index) => (
                <div key={index} className="group">
                    <button
                        onClick={() => toggle(index)}
                        className="w-full flex items-center justify-between py-8 text-left transition-colors hover:bg-neutral-50"
                        aria-expanded={openIndex === index}
                    >
                        <span className="font-serif text-xl md:text-2xl text-neutral-900 pr-8 leading-snug">
                            {item.question}
                        </span>
                        <span className={`text-neutral-400 text-2xl shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}>
                            +
                        </span>
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100 pb-8' : 'max-h-0 opacity-0'}`}
                    >
                        <div className="font-sans text-sm md:text-base text-neutral-600 leading-relaxed pr-12 [&_a]:text-blue-500 [&_a]:underline [&_a:hover]:text-blue-600 [&_a]:transition-colors [&_p]:mb-4 [&_p:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: item.answer }} />
                    </div>
                </div>
            ))}
        </div>
    );
}
