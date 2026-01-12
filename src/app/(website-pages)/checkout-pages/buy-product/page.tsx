import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import ProductSelectionForm from "@/components/checkout/ProductSelectionForm";

export const metadata = {
    title: "Join the DreamPlay Founder's Circle | DreamPlay",
    description: "Secure guaranteed access to the lowest Super Early Bird price and receive exclusive rewards.",
};

export default function BuyProductPage() {
    return (
        <div className="page-wrapper bg-white font-sans text-neutral-900">
            <Navbar />

            <main>
                {/* --- Hero Section --- */}
                <section className="pt-32 pb-16 md:pt-40 md:pb-24 lg:pt-48">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up">
                                Join the DreamPlay <br className="hidden md:block" />Founder&apos;s Circle
                            </h1>
                            <p className="text-lg md:text-xl text-neutral-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
                                Pay a fully refundable $1 deposit to secure guaranteed access to the lowest Super Early Bird price and receive your exclusive rewards.
                            </p>

                            <div className="relative w-full max-w-3xl mx-auto aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up delay-200">
                                <Image
                                    src="/images/Frame-78.png"
                                    alt="DreamPlay Founder's Circle"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Benefits Section --- */}
                <section className="py-20 bg-neutral-50 border-y border-neutral-100">
                    <div className="container mx-auto px-6">
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                                Your $1 Founder’s Circle deposit unlocks
                            </h2>

                            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                                {/* Benefit 1 */}
                                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-neutral-100 transition-all hover:shadow-md">
                                    <div className="w-12 h-12 flex-shrink-0 relative">
                                        <Image src="/images/Frame-85.svg" alt="Price Icon" fill className="object-contain" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-lg text-neutral-900 leading-snug">
                                            Guaranteed access to the limited Super Early Bird Price
                                            <span className="text-neutral-500 font-normal block mt-1 text-base">(up to $50 cheaper than any other price available)</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Benefit 2 */}
                                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-neutral-100 transition-all hover:shadow-md">
                                    <div className="w-12 h-12 flex-shrink-0 relative">
                                        <Image src="/images/Vector-6.svg" alt="Journal Icon" fill className="object-contain" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-lg text-neutral-900 leading-snug">
                                            The Founder&apos;s Journal
                                            <span className="text-neutral-500 font-normal block mt-1 text-base">(Insider Access to our development journey)</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Benefit 3 */}
                                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-neutral-100 transition-all hover:shadow-md">
                                    <div className="w-12 h-12 flex-shrink-0 relative">
                                        <Image src="/images/Frame-84.svg" alt="Music Icon" fill className="object-contain" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-lg text-neutral-900 leading-snug">
                                            Instant Download of My Exclusive Sheet Music
                                        </p>
                                    </div>
                                </div>

                                {/* Benefit 4 */}
                                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-neutral-100 transition-all hover:shadow-md">
                                    <div className="w-12 h-12 flex-shrink-0 relative">
                                        <Image src="/images/Frame-82.svg" alt="Shipping Icon" fill className="object-contain" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-lg text-neutral-900 leading-snug">
                                            Priority Shipping
                                            <span className="text-neutral-500 font-normal block mt-1 text-base">- you will receive your keyboard earlier than anybody else</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Selection Form Section --- */}
                <section className="py-20 md:py-32" id="rsv">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">
                                Help Us Plan Our <br />First Production Run
                            </h2>
                            <p className="text-lg text-neutral-600 mb-4 max-w-2xl mx-auto">
                                To make sure we build the keyboard you&apos;re most excited about, please let us know your current preference below.
                            </p>
                            <p className="text-sm font-semibold text-neutral-900 bg-neutral-100 inline-block px-4 py-2 rounded-full">
                                Your choice is not final and you can change your selection after the campaign
                            </p>
                        </div>

                        <ProductSelectionForm />
                    </div>
                </section>

                {/* --- CTA / Reassurance --- */}
                <section className="py-16 bg-neutral-900 text-white text-center">
                    <div className="container mx-auto px-6">
                        <p className="text-xl md:text-2xl font-medium">
                            100% Fully Refundable Deposit. Cancel Anytime.
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
