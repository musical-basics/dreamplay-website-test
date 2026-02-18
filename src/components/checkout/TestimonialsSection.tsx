"use client";
import React, { useState } from "react";
import Image from "next/image";

const stories = [
    {
        image: "/images/_DSC1180-2-copy.jpg",
        quote: `"I often witness pianists place their hands for the first time on a keyboard that better suits their hand span. How often the pianist spontaneously bursts into tears. A lifetime of struggling with a seemingly insurmountable problem vanishes in the moment they realize, 'It's not me that is the problem; it is the instrument!' Following on that, the joy of possibility overwhelms them."`,
        avatar: "/images/carol-leone.png",
        name: "Dr. Carol Leone",
        role: "Chair of Piano Studies",
        school: "SMU Meadows School of the Arts"
    },
    {
        image: "/images/pianist-playing-grand-piano-warm-lighting.jpg",
        quote: `"I can play for much longer and continue to play every day. I don't get frustrated from the pain and from being limited in my playing."`,
        avatar: "/images/Jen-McCabe.png",
        name: "Jen McCabe",
        role: "Pianist, teacher, music director",
        school: "harmonypianostudio.com"
    },
    {
        image: "/images/person-practicing-piano-with-glowing-led-keys.jpg",
        quote: `"My favorite story is from a piano performance major, who couldn't believe that playing the piano didn't have to hurt. The instrument restored her joy for piano repertoire. She had been preparing to change over to harpsichord due to keyboard size issues. I will never forget the day she first played a Chopin ballade on the DS5.5. She literally could not stop beaming."`,
        avatar: "/images/Kathryn-Ananda-Owens.png",
        name: "Kathryn-Ananda Owens",
        role: "Professor of Music - Piano",
        school: "St Olaf College, Minnesota"
    }
];

export default function TestimonialsSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const totalSlides = stories.length;
    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

    return (
        <section className="bg-[#050505] text-white py-20 px-6 overflow-hidden min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4 block">Why We're Doing This</span>
                    <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight">Playing the piano<br />doesn't have to hurt</h2>
                </div>

                <div className="relative">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {stories.map((story, i) => (
                                <div key={i} className="min-w-full grid md:grid-cols-2 gap-8 md:gap-16 items-center px-4">

                                    {/* Image Column — sharp edges */}
                                    <div className="relative aspect-square w-full rounded-none overflow-hidden bg-neutral-900">
                                        <Image
                                            src={story.image}
                                            alt="Pianist playing"
                                            fill
                                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                        />
                                    </div>

                                    {/* Content Column */}
                                    <div className="flex flex-col justify-center">
                                        <blockquote className="font-serif text-3xl md:text-4xl leading-tight mb-12">
                                            {story.quote}
                                        </blockquote>

                                        <div className="flex items-end justify-between border-t border-white/10 pt-8">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-12 h-12 rounded-none overflow-hidden bg-neutral-800 flex-shrink-0">
                                                    <Image
                                                        src={story.avatar}
                                                        alt={story.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-sans text-lg font-bold">{story.name}</h4>
                                                    <p className="font-sans text-sm text-white/60 leading-tight mt-1">{story.role}<br />{story.school}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex justify-end gap-6 mt-8 md:mt-0 md:absolute md:bottom-0 md:right-4">
                        <div className="flex gap-2 items-center">
                            {stories.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentSlide(i)}
                                    className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? "bg-white scale-125" : "bg-white/30 hover:bg-white/50"}`}
                                    aria-label={`Go to slide ${i + 1}`}
                                />
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <button onClick={prevSlide} className="w-10 h-10 rounded-none border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all" aria-label="Previous">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button onClick={nextSlide} className="w-10 h-10 rounded-none border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all" aria-label="Next">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
