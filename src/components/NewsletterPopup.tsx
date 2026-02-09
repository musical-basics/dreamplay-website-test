"use client";

import { useState, useEffect, useRef } from "react";
import { X, Mail } from "lucide-react";

import { getDiscountPopupStatus } from "@/actions/admin-actions";
import { subscribeToNewsletter } from "@/actions/email-actions";

export default function NewsletterPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const checkStatus = async () => {
            // Check global admin setting first
            const status = await getDiscountPopupStatus();
            if (String(status) !== 'true') {
                console.log("Newsletter popup suppressed by admin setting:", status);
                return;
            }

            // check if user has already seen/closed the popup to avoid spamming them
            const hasSeenPopup = localStorage.getItem("dreamplay_popup_seen");
            console.log("Newsletter popup seen status:", hasSeenPopup);

            if (!hasSeenPopup) {
                console.log("Scheduling newsletter popup in 10s...");
                const timer = setTimeout(() => {
                    console.log("Showing newsletter popup now");
                    setIsOpen(true);
                }, 10000); // 10 seconds delay

                return () => clearTimeout(timer);
            }
        };

        checkStatus();
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
            const res = await subscribeToNewsletter({
                email: email,
                first_name: name || undefined, // Send undefined if name is empty (hidden)
                tags: ["Newsletter Subscription"]
            });

            if (!res.success) {
                throw new Error(res.error || "Failed to subscribe");
            }

            // On success, show the code
            setIsSubmitted(true);
            localStorage.setItem("dreamplay_popup_seen", "true");
        } catch (error: any) {
            console.error(error);
            alert(error.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300">
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
                                Exclusive Discount
                            </h2>
                            <p className="text-gray-600">
                                Subscribe for an exclusive discount on your first purchase on our store.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <div>
                                    {/* Name field hidden for now
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full mb-3 px-4 py-3 rounded-lg border border-gray-300 bg-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                                    />
                                    */}
                                    <input
                                        type="email"
                                        required
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-70"
                            >
                                {isLoading ? "Subscribing..." : "Subscribe"}
                            </button>
                            <p className="text-xs text-center text-gray-400">
                                We respect your privacy. Unsubscribe at any time.
                            </p>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <div className="mx-auto bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                            <Mail className="text-green-600" size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            Thank you for subscribing!
                        </h3>
                        <p className="text-gray-600 mb-8 max-w-xs mx-auto">
                            You have been added to our mailing list.
                        </p>
                        <button
                            onClick={handleClose}
                            className="bg-black text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
