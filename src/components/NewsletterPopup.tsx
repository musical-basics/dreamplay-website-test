"use client";

import { useState, useEffect } from "react";
import { X, FileText, Package, CheckCircle2 } from "lucide-react";

import { getDiscountPopupStatus } from "@/actions/admin-actions";
import { subscribeToNewsletter } from "@/actions/email-actions";

type PopupType = "none" | "shipping" | "pdf";

export default function NewsletterPopup() {
    const [activePopup, setActivePopup] = useState<PopupType>("none");
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState<PopupType>("none");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const checkStatus = async () => {
            // Check global admin setting first
            try {
                const status = await getDiscountPopupStatus();
                if (String(status) !== 'true') return;
            } catch (e) {
                // proceed if admin check fails
            }

            // If they already subscribed globally, never show either popup again
            if (localStorage.getItem("dp_subscribed") === "true") return;

            const shippingSeen = localStorage.getItem("dp_shipping_seen") === "true";
            const pdfSeen = localStorage.getItem("dp_pdf_seen") === "true";

            let timer1: NodeJS.Timeout;
            let timer2: NodeJS.Timeout;

            // Timer 1: Show Shipping Offer at 8 seconds
            if (!shippingSeen) {
                timer1 = setTimeout(() => {
                    if (localStorage.getItem("dp_subscribed") !== "true") {
                        setActivePopup("shipping");
                    }
                }, 8000);
            }

            // Timer 2: Show PDF Offer at 30 seconds (Fallback)
            if (!pdfSeen) {
                timer2 = setTimeout(() => {
                    // Only show PDF if they haven't subscribed
                    if (localStorage.getItem("dp_subscribed") !== "true") {
                        setActivePopup((current) => {
                            if (current === "none") return "pdf";
                            return current;
                        });
                    }
                }, 30000);
            }

            return () => {
                if (timer1) clearTimeout(timer1);
                if (timer2) clearTimeout(timer2);
            };
        };

        checkStatus();
    }, []);

    const handleClose = () => {
        if (activePopup === "shipping") {
            localStorage.setItem("dp_shipping_seen", "true");
            setActivePopup("none");

            // If they closed shipping manually, setup a faster timer for the PDF fallback
            const pdfSeen = localStorage.getItem("dp_pdf_seen") === "true";
            if (!pdfSeen) {
                setTimeout(() => {
                    if (localStorage.getItem("dp_subscribed") !== "true") {
                        setActivePopup("pdf");
                    }
                }, 22000);
            }
        } else if (activePopup === "pdf") {
            localStorage.setItem("dp_pdf_seen", "true");
            setActivePopup("none");
        } else {
            setActivePopup("none");
            setIsSubmitted("none");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const currentOffer = activePopup;
        const tag = currentOffer === "shipping" ? "Free Shipping Lead" : "Hand Guide Download";

        try {
            const res = await subscribeToNewsletter({
                email: email,
                first_name: "",
                tags: [tag]
            });

            if (!res.success) {
                throw new Error(res.error || "Failed to subscribe");
            }

            // Mark as globally subscribed so no more popups ever show
            localStorage.setItem("dp_subscribed", "true");
            localStorage.setItem("dp_shipping_seen", "true");
            localStorage.setItem("dp_pdf_seen", "true");

            setIsSubmitted(currentOffer);

            // If it was the PDF, auto-open it in a new tab
            if (currentOffer === "pdf") {
                window.open("https://www.dropbox.com/scl/fi/9b72rbi4ga0pjterxyoan/DreamPlay-Infographic.pdf?rlkey=mc08i1ahn5tp3thdd0qjnag2d&st=olbh1t9w&dl=1", "_blank");
            }

        } catch (error: any) {
            console.error(error);
            alert(error.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (activePopup === "none" && isSubmitted === "none") return null;

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300">
            <div className="relative w-full max-w-md bg-[#050505] border border-white/10 rounded-none shadow-2xl p-8 md:p-10 animate-in fade-in zoom-in-95 duration-300">

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute right-4 top-4 text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                    <X size={20} />
                </button>

                {isSubmitted === "none" ? (
                    <>
                        <div className="mb-8 text-center">
                            <div className="mx-auto bg-white/5 border border-white/10 w-14 h-14 rounded-none flex items-center justify-center mb-6">
                                {activePopup === "shipping" ? (
                                    <Package className="text-white" size={24} strokeWidth={1.5} />
                                ) : (
                                    <FileText className="text-white" size={24} strokeWidth={1.5} />
                                )}
                            </div>

                            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-3">
                                {activePopup === "shipping" ? "Waitlist Exclusive" : "Free Resource"}
                            </p>

                            <h2 className="text-2xl md:text-3xl font-serif text-white tracking-tight leading-tight mb-4">
                                {activePopup === "shipping"
                                    ? "Unlock Free Global Shipping."
                                    : "Are standard keys holding you back?"}
                            </h2>

                            <p className="text-white/60 font-sans text-sm leading-relaxed">
                                {activePopup === "shipping"
                                    ? "The DreamPlay One is moving to its official retail price of $1,199 soon. Enter your email to secure a VIP Free Shipping pass (saves $150+) for your reservation."
                                    : "Enter your email to instantly download our Printable 1:1 Hand-Measuring Guide to see exactly which piano size fits your biology."}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="email"
                                required
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-4 rounded-none border border-white/20 bg-transparent placeholder-white/40 text-white focus:ring-1 focus:ring-white focus:border-white outline-none transition-all font-sans text-sm"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-white text-black font-sans text-xs uppercase tracking-widest font-bold py-4 rounded-none hover:bg-white/90 transition-colors disabled:opacity-70 cursor-pointer"
                            >
                                {isLoading ? "Processing..." : (activePopup === "shipping" ? "Get Free Shipping Pass" : "Get Free PDF Guide")}
                            </button>
                            <p className="text-[10px] text-center text-white/40 uppercase tracking-widest mt-4">
                                No spam. Unsubscribe anytime.
                            </p>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-6">
                        <div className="mx-auto bg-white border border-white/20 w-16 h-16 rounded-none flex items-center justify-center mb-6">
                            <CheckCircle2 className="text-black" size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl font-serif text-white mb-3">
                            {isSubmitted === "shipping" ? "VIP Status Confirmed" : "Your guide is downloading!"}
                        </h3>

                        {isSubmitted === "shipping" ? (
                            <>
                                <p className="text-white/60 font-sans text-sm leading-relaxed mb-6">
                                    Your email is officially on the VIP list. Use the code below at checkout to claim free global shipping.
                                </p>
                                <div className="bg-white/5 border border-white/10 p-5 mb-8">
                                    <p className="text-white/50 text-[10px] uppercase tracking-[0.2em] mb-1">Your Promo Code</p>
                                    <p className="text-2xl font-mono text-white tracking-widest font-bold">VIP-SHIP-FREE</p>
                                </div>
                            </>
                        ) : (
                            <p className="text-white/60 font-sans text-sm mb-8 max-w-xs mx-auto leading-relaxed">
                                Check your new tab for the PDF. Print it out, place your hand on the guide, and discover your ideal key size.
                            </p>
                        )}

                        <button
                            onClick={handleClose}
                            className="bg-transparent border border-white/30 text-white font-sans text-xs uppercase tracking-widest font-bold py-4 px-8 w-full rounded-none hover:bg-white/10 transition-colors cursor-pointer"
                        >
                            Continue Exploring
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
