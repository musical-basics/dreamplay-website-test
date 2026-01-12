"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ProductSelectionFormProps {
    className?: string;
}

export default function ProductSelectionForm({ className }: ProductSelectionFormProps) {
    const [selectedPiano, setSelectedPiano] = useState<string>("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("Loading...");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Fetch country like in the original HTML
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                if (data.country_name) {
                    setCountry(data.country_name);
                } else {
                    setCountry("Unknown");
                }
            })
            .catch(error => {
                console.error('Error fetching country:', error);
                setCountry("Unknown"); // Fallback
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate submission delay or analytics tracking here if needed
        // For now, we just redirect to the Stripe URL as requested

        // Construct Stripe URL with prefilled email if possible, though the provided URL is a payment link
        // Standard Stripe Payment Links don't always accept params easily without configuration, 
        // but specific ones do. The user provided: https://buy.stripe.com/cNifZa4lh9k867Y1xtcMM00
        // We will standard redirect.

        // In a real app, we might want to save this data to Supabase/PostHog before redirecting.

        setTimeout(() => {
            window.location.href = "https://buy.stripe.com/cNifZa4lh9k867Y1xtcMM00?prefilled_email=" + encodeURIComponent(email);
        }, 500);
    };

    const pianoOptions = [
        {
            id: "DS-5.5-Black",
            value: "DS 5.5 - Black",
            label: "DS 5.5 - Black",
            image: "/images/Group-1.png",
        },
        {
            id: "DS-5.5-White",
            value: "DS 5.5 - White",
            label: "DS 5.5 - White",
            image: "/images/Group-2.png",
        },
        {
            id: "DS-6.0-Black",
            value: "DS 6.0 - Black",
            label: "DS 6.0 - Black",
            image: "/images/Group-3.png",
        },
        {
            id: "DS-6.0-White",
            value: "DS 6.0 - White",
            label: "DS 6.0 - White",
            image: "/images/Group-4.png",
        },
        {
            id: "Not-sure",
            value: "Not sure",
            label: "Not sure",
            image: "/images/Group-4-1.png",
        },
    ];

    return (
        <form onSubmit={handleSubmit} className={`w-full max-w-4xl mx-auto ${className}`}>
            {/* Country Field (Hidden/Read-only style in original, but let's make it visible as a disabled input or just hidden state if intended) 
            Original HTML used a text field: <input ... id="country-field"> 
        */}
            <div className="mb-8">
                <input
                    type="text"
                    value={country}
                    readOnly
                    className="w-full bg-transparent border-b border-neutral-300 py-2 text-neutral-500 focus:outline-none focus:border-neutral-900 transition-colors cursor-not-allowed"
                    placeholder="Detecting Country..."
                />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
                {pianoOptions.map((option) => (
                    <label key={option.id} className="relative cursor-pointer group">
                        <input
                            type="radio"
                            name="Piano"
                            value={option.value}
                            checked={selectedPiano === option.value}
                            onChange={(e) => setSelectedPiano(e.target.value)}
                            className="peer sr-only"
                        />
                        {/* Image Container with Border Logic */}
                        <div className="p-2 border-2 border-transparent rounded-xl transition-all duration-200 peer-checked:border-black peer-checked:bg-neutral-50 hover:bg-neutral-50">
                            <div className="relative aspect-[3/4] w-full mb-3">
                                <Image
                                    src={option.image}
                                    alt={option.label}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="text-center">
                                <span className="text-xs font-medium text-neutral-600 peer-checked:text-black">{option.label}</span>
                            </div>
                        </div>
                        {/* Custom Radio Circle (Visual only, original didn't strictly have one but used CSS for border) */}
                    </label>
                ))}
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-neutral-100 mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700 mb-2">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 rounded-lg bg-neutral-50 border-transparent focus:bg-white focus:border-neutral-900 focus:ring-0 transition-all placeholder:text-neutral-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-lg bg-neutral-50 border-transparent focus:bg-white focus:border-neutral-900 focus:ring-0 transition-all placeholder:text-neutral-400"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-neutral-900 text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-neutral-800 hover:scale-105 active:scale-95 transition-all disabled:opacity-70 disabled:hover:scale-100 shadow-lg hover:shadow-xl"
                >
                    {isSubmitting ? "Processing..." : "Reserve Now for $1"}
                </button>
            </div>

            <p className="text-center text-sm text-neutral-400 mt-6">
                Secure checkout powered by Stripe
            </p>
        </form>
    );
}
