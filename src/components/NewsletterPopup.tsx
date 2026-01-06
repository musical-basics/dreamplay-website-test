"use client";

import { useState, useEffect, useRef } from "react";
import { X, Mail } from "lucide-react";

export default function NewsletterPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // check if user has already seen/closed the popup to avoid spamming them
        const hasSeenPopup = localStorage.getItem("dreamplay_popup_seen");

        if (!hasSeenPopup) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 5000); // 5 seconds delay

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        // Remember that the user closed it so we don't show it again
        localStorage.setItem("dreamplay_popup_seen", "true");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) throw new Error("Failed to subscribe");

            // On success, show the code
            setIsSubmitted(true);
            localStorage.setItem("dreamplay_popup_seen", "true");
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300">
            <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6 md:p-8 animate-in fade-in zoom-in duration-300">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={20} />
                </button>

                {!isSubmitted ? (
                    <>
                        <div className="mb-6 text-center">
                            <div className="mx-auto bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                <Mail className="text-blue-600" size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Get 10% Off
                            </h2>
                            <p className="text-gray-600">
                                Join our mailing list and get a discount code for your first
                                order.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-70"
                            >
                                {isLoading ? "Unlocking..." : "Unlock My 10% Discount"}
                            </button>
                            <p className="text-xs text-center text-gray-400">
                                We respect your privacy. Unsubscribe at any time.
                            </p>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Welcome Aboard!
                        </h3>
                        <p className="text-gray-600 mb-6">Here is your discount code:</p>
                        <div className="bg-gray-100 p-4 rounded-lg font-mono text-xl font-bold tracking-wider text-blue-600 select-all border border-dashed border-gray-300">
                            WELCOME10
                        </div>
                        <button
                            onClick={handleClose}
                            className="mt-6 text-sm text-gray-500 hover:text-gray-900 underline"
                        >
                            Close and continue shopping
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
