"use client";

import { useState, useEffect, useRef } from "react";
import { X, Mail, FileText } from "lucide-react";

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

            // Never show if user already subscribed
            const hasSubscribed = localStorage.getItem("dreamplay_subscribed");
            if (hasSubscribed) {
                console.log("Newsletter popup suppressed: user already subscribed");
                return;
            }

            // Check if user has dismissed the popup before
            const hasDismissed = localStorage.getItem("dreamplay_popup_seen");

            if (!hasDismissed) {
                // First visit: show after 8 seconds
                console.log("Scheduling newsletter popup in 8s...");
                const timer = setTimeout(() => {
                    console.log("Showing newsletter popup now");
                    setIsOpen(true);
                }, 8000);
                return () => clearTimeout(timer);
            } else {
                // Previously dismissed: show again after 2 minutes
                console.log("User dismissed before, scheduling re-show in 2 minutes...");
                const timer = setTimeout(() => {
                    console.log("Re-showing newsletter popup after 2 minutes");
                    setIsOpen(true);
                }, 120000); // 2 minutes
                return () => clearTimeout(timer);
            }
        };

        checkStatus();
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        // Mark as dismissed (but NOT subscribed) so it can re-appear after 2 minutes
        localStorage.setItem("dreamplay_popup_seen", "true");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await subscribeToNewsletter({
                email: email,
                first_name: name || "", // Send empty string instead of undefined
                tags: ["Hand Guide Download"]
            });

            if (!res.success) {
                throw new Error(res.error || "Failed to subscribe");
            }

            // On success
            setIsSubmitted(true);
            // Mark as subscribed — popup will never show again
            localStorage.setItem("dreamplay_subscribed", "true");
            localStorage.setItem("dreamplay_popup_seen", "true");

            // Auto-open the PDF in a new tab
            window.open("https://www.dropbox.com/scl/fi/9b72rbi4ga0pjterxyoan/DreamPlay-Infographic.pdf?rlkey=mc08i1ahn5tp3thdd0qjnag2d&st=olbh1t9w&dl=1", "_blank");
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
                                Are standard keys holding you back?
                            </h2>
                            <p className="text-gray-600 text-sm">
                                Enter your email to instantly download our <strong>Printable 1:1 Hand-Measuring Guide</strong> to see exactly which piano size fits your biology.
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
                                {isLoading ? "Sending..." : "Get Free Guide"}
                            </button>
                            <p className="text-xs text-center text-gray-400">
                                We respect your privacy. Unsubscribe at any time.
                            </p>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <div className="mx-auto bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                            <FileText className="text-green-600" size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            Your guide is downloading!
                        </h3>
                        <p className="text-gray-600 mb-8 max-w-xs mx-auto">
                            Check your new tab for the PDF. Print it out, place your hand on the guide, and discover your ideal key size.
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
