"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ProductSelectionFormProps {
    className?: string;
}

export default function ProductSelectionForm({ className }: ProductSelectionFormProps) {
    const [selectedPiano, setSelectedPiano] = useState<string>("DS-6.0-Black");
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

        try {
            // Save to Waitlist via API
            await fetch('/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName,
                    email,
                }),
            });
        } catch (error) {
            console.error('Failed to save to waitlist:', error);
            // We continue to redirect even if saving failed to not block the purchase flow
        }

        // --- PREPARE SHOPIFY SUBMISSION ---
        // Parse selected size and color from value like "DS 6.0 - Black"
        // The values in pianoOptions below are setup as "DS 5.5 - Black" etc.
        let selectedSize = 'Not Selected';
        let selectedColor = 'Not Selected';

        // Find the selected option object to be sure (or just parse the state string)
        const selectedOption = pianoOptions.find(opt => opt.value === selectedPiano);
        const valueToParse = selectedOption ? selectedOption.value : selectedPiano;

        if (valueToParse && valueToParse.includes('-')) {
            const parts = valueToParse.split('-');
            // Example: "DS 5.5 - Black" -> ["DS 5.5 ", " Black"]
            selectedSize = parts[0].trim();
            // Handle if there are multiple hyphens or just one, but based on options:
            // "DS 5.5 - Black" -> Size: "DS 5.5", Color: "Black"
            // "DS 6.0 - Black" -> Size: "DS 6.0", Color: "Black"
            if (parts.length >= 2) {
                selectedColor = parts[1].trim();
            }
        }

        // If "Not sure" is selected
        if (valueToParse === "Not sure") {
            selectedSize = "Not sure";
            selectedColor = "Not sure";
        }

        const PRODUCT_VARIANT_ID = '52240288776506';
        const STORE_DOMAIN = 'dreamplay-pianos.myshopify.com';

        // Prepare Return URL params
        const checkoutParams = [];
        if (email) checkoutParams.push(`checkout[email]=${encodeURIComponent(email)}`);

        if (fullName) {
            const nameParts = fullName.trim().split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(' ');
            if (firstName) checkoutParams.push(`checkout[shipping_address][first_name]=${encodeURIComponent(firstName)}`);
            if (lastName) checkoutParams.push(`checkout[shipping_address][last_name]=${encodeURIComponent(lastName)}`);
        }

        const queryString = checkoutParams.length > 0 ? '?' + checkoutParams.join('&') : '';


        // Create and submit form
        const shopifyForm = document.createElement('form');
        shopifyForm.method = 'POST';
        shopifyForm.action = `https://${STORE_DOMAIN}/cart/add`;
        shopifyForm.style.display = 'none';

        const addInput = (name: string, value: string) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = name;
            input.value = value;
            shopifyForm.appendChild(input);
        };

        addInput('id', PRODUCT_VARIANT_ID);
        addInput('quantity', '1');
        addInput('properties[Size]', selectedSize);
        addInput('properties[Finish]', selectedColor);
        addInput('return_to', '/checkout' + queryString);

        document.body.appendChild(shopifyForm);
        shopifyForm.submit();
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
            {/* Country Field Hidden */}
            <div className="hidden">
                <input
                    type="text"
                    value={country}
                    readOnly
                    className="w-full"
                />
            </div>

            {/* Piano Selection - Hidden for now */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10 hidden">
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
                    </label>
                ))}
            </div>

            <div className="bg-transparent mb-8">
                <div className="space-y-4 max-w-lg mx-auto">
                    <div>
                        <input
                            type="text"
                            id="fullName"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Full name"
                            className="w-full px-6 py-4 rounded-xl bg-neutral-100 border-transparent focus:bg-white focus:border-neutral-900 focus:ring-0 transition-all placeholder:text-neutral-500 font-medium"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address"
                            className="w-full px-6 py-4 rounded-xl bg-neutral-100 border-transparent focus:bg-white focus:border-neutral-900 focus:ring-0 transition-all placeholder:text-neutral-500 font-medium"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-6">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black text-white px-12 py-4 rounded-full text-base font-semibold hover:bg-neutral-800 transition-all disabled:opacity-70 shadow-lg hover:shadow-xl w-full max-w-sm"
                >
                    {isSubmitting ? "Redirecting..." : "Join the Waitlist for $1"}
                </button>

                <p className="text-center text-base text-neutral-600 font-medium">
                    100% Fully Refundable Deposit. Cancel Anytime.
                </p>
            </div>
        </form>
    );
}
