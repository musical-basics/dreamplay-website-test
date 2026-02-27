"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { X, FileText, Package, CheckCircle2 } from "lucide-react";

import { getDiscountPopupStatus } from "@/actions/admin-actions";
import { subscribeToNewsletter } from "@/actions/email-actions";
import { trackEmailConversion } from "@/components/EmailTracker";

type PopupType = "none" | "shipping" | "pdf";

/** Safe analytics wrapper — won't crash if tracker is blocked or hasn't loaded */
const trackPopup = (action: 'yes' | 'no', popupName: string) => {
    if (typeof window !== 'undefined' && (window as any).dreamplay?.track) {
        (window as any).dreamplay.track(`click_popup_${action}`, { popup: popupName });
    }
};

interface ABEntry {
    type: string;
    delaySec: number;
}

interface ABSettings {
    entries: ABEntry[];
}

export default function NewsletterPopup() {
    const [activePopup, setActivePopup] = useState<PopupType>("none");
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState<PopupType>("none");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const pdfTimerRef = useRef<NodeJS.Timeout | null>(null);
    const hasExitFired = useRef(false);
    const pathname = usePathname();

    // A/B test refs
    const abBucketRef = useRef<string | null>(null);
    const abSettingsRef = useRef<ABSettings | null>(null);

    useEffect(() => {
        const popupTimers: NodeJS.Timeout[] = [];
        let qualifyTimer: NodeJS.Timeout | undefined;
        let cancelled = false;

        const checkStatus = async () => {
            // If user is already mapped, skip A/B entirely
            if (localStorage.getItem("dp_user_email")) return;
            if (localStorage.getItem("dp_v2_subscribed") === "true") return;

            try {
                const status = await getDiscountPopupStatus();
                if (String(status) !== 'true') return;
            } catch (e) {
                // proceed if admin check fails
            }

            // ── A/B Assignment ──
            try {
                const res = await fetch('/api/popup-ab', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'assign' }),
                });
                const data = await res.json();
                if (cancelled) return;
                abBucketRef.current = data.bucket;
                abSettingsRef.current = data.settings;
            } catch (e) {
                console.error('A/B assign failed, using defaults:', e);
                abBucketRef.current = 'control';
                abSettingsRef.current = { entries: [{ type: 'pdf', delaySec: 30 }, { type: 'shipping', delaySec: 300 }] };
            }

            const settings = abSettingsRef.current!;
            const bucket = abBucketRef.current!;

            // ── 10-Second Qualification ──
            if (!sessionStorage.getItem('dp_ab_qualified')) {
                qualifyTimer = setTimeout(() => {
                    if (sessionStorage.getItem('dp_ab_qualified')) return;
                    sessionStorage.setItem('dp_ab_qualified', 'true');
                    fetch('/api/popup-ab', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ action: 'qualify', bucket }),
                    }).catch(() => { });
                }, 10000);
            }

            // ── Popup Timers (dynamic from entries) ──
            for (const entry of settings.entries) {
                const popupType = entry.type as PopupType;
                const seen = localStorage.getItem(`dp_v2_${popupType}_seen`) === "true";
                if (!seen) {
                    const timer = setTimeout(() => {
                        if (localStorage.getItem("dp_v2_subscribed") !== "true") {
                            setActivePopup(current => current === "none" ? popupType : current);
                        }
                    }, entry.delaySec * 1000);
                    popupTimers.push(timer);
                }
            }
        };

        checkStatus();

        return () => {
            cancelled = true;
            popupTimers.forEach(t => clearTimeout(t));
            if (qualifyTimer) clearTimeout(qualifyTimer);
            if (pdfTimerRef.current) clearTimeout(pdfTimerRef.current);
        };
    }, []);

    // --- UBIQUITOUS EXIT-INTENT ---
    useEffect(() => {
        const excludedPaths = ["/vip", "/login", "/register", "/activate", "/forgot-password", "/reset-password"];
        if (excludedPaths.includes(pathname)) return;

        const handleMouseLeave = (e: MouseEvent) => {
            if (hasExitFired.current) return;
            if (e.clientY > 0) return;

            const isSubscribed = localStorage.getItem("dp_v2_subscribed") === "true" || !!localStorage.getItem("dp_user_email");
            if (isSubscribed) return;

            hasExitFired.current = true;
            setActivePopup("shipping");
        };

        document.documentElement.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [pathname]);

    const handleClose = () => {
        setErrorMsg("");
        if (activePopup === "shipping") {
            trackPopup('no', 'free_shipping');
            localStorage.setItem("dp_v2_shipping_seen", "true");
            setActivePopup("none");
            setIsSubmitted("none");

            const pdfSeen = localStorage.getItem("dp_v2_pdf_seen") === "true";
            if (!pdfSeen) {
                if (pdfTimerRef.current) clearTimeout(pdfTimerRef.current);
                pdfTimerRef.current = setTimeout(() => {
                    if (localStorage.getItem("dp_v2_subscribed") !== "true") {
                        setActivePopup("pdf");
                    }
                }, 22000);
            }
        } else if (activePopup === "pdf") {
            trackPopup('no', 'hand_size');
            localStorage.setItem("dp_v2_pdf_seen", "true");
            setActivePopup("none");
            setIsSubmitted("none");
        } else {
            setActivePopup("none");
            setIsSubmitted("none");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg("");

        const currentOffer = activePopup;

        try {
            const tag = currentOffer === "shipping" ? "Free Shipping Lead" : "Hand Guide Download";
            const tempSession = localStorage.getItem("dp_temp_session") || undefined;

            const res = await subscribeToNewsletter({
                email,
                first_name: "",
                tags: [tag],
                temp_session_id: tempSession,
            });

            if (!res.success) {
                throw new Error(res.error || "Failed to subscribe");
            }

            // ── A/B Conversion Tracking ──
            if (abBucketRef.current) {
                fetch('/api/popup-ab', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'convert',
                        bucket: abBucketRef.current,
                        offer_type: currentOffer,
                    }),
                }).catch(() => { });
            }

            localStorage.setItem("dp_v2_subscribed", "true");
            localStorage.setItem("dp_v2_shipping_seen", "true");
            localStorage.setItem("dp_v2_pdf_seen", "true");
            localStorage.setItem("dp_user_email", email);
            if (res.id) localStorage.setItem("dp_subscriber_id", res.id);

            setIsSubmitted(currentOffer);
            trackEmailConversion('conversion_t1', window.location.pathname);
            trackPopup('yes', currentOffer === 'shipping' ? 'free_shipping' : 'hand_size');

            // Auto-open PDF for pdf offer
            if (currentOffer === "pdf") {
                window.open(
                    "https://www.dropbox.com/scl/fi/9b72rbi4ga0pjterxyoan/DreamPlay-Infographic.pdf?rlkey=mc08i1ahn5tp3thdd0qjnag2d&st=olbh1t9w&dl=1",
                    "_blank"
                );
            }
        } catch (error: any) {
            console.error(error);
            setErrorMsg(error.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (activePopup === "none" && isSubmitted === "none") return null;

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300">
            <div className="relative w-full max-w-md bg-[#050505] border border-white/10 rounded-none shadow-2xl p-8 md:p-10 animate-in fade-in zoom-in-95 duration-300">

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
                                    ? "Join our VIP list and get a Free Shipping Pass applied to your next reservation. Limited availability."
                                    : "Enter your email to instantly download our Hand-Measuring Guide to see exactly which piano size will help you the most."}
                            </p>
                        </div>

                        {errorMsg && (
                            <div className="mb-4 p-3 border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-sans text-center">
                                {errorMsg}
                            </div>
                        )}

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
                                {isLoading
                                    ? "Processing..."
                                    : activePopup === "shipping"
                                        ? "Get Free Shipping Pass"
                                        : "Get Free PDF Guide"}
                            </button>

                            <button
                                type="button"
                                onClick={handleClose}
                                className="w-full mt-1 text-white/30 hover:text-white/60 font-sans text-xs uppercase tracking-widest transition-colors cursor-pointer py-2"
                            >
                                Remind Me Later
                            </button>
                            <p className="text-[10px] text-center text-white/40 uppercase tracking-widest mt-2">
                                No spam. Unsubscribe anytime.
                            </p>
                        </form>
                    </>
                ) : isSubmitted === "shipping" ? (
                    /* ── Shipping Success: Check your email ── */
                    <div className="text-center py-6">
                        <div className="mx-auto bg-white border border-white/20 w-16 h-16 rounded-none flex items-center justify-center mb-6">
                            <CheckCircle2 className="text-black" size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl font-serif text-white mb-3">Check your inbox.</h3>
                        <p className="text-white/60 font-sans text-sm mb-8 max-w-xs mx-auto leading-relaxed">
                            We just sent you an email with instructions to unlock your VIP Free Shipping Pass. Create your account to claim it.
                        </p>
                        <button
                            onClick={handleClose}
                            className="bg-transparent border border-white/30 text-white font-sans text-xs uppercase tracking-widest font-bold py-4 px-8 w-full rounded-none hover:bg-white/10 transition-colors cursor-pointer"
                        >
                            Continue Exploring
                        </button>
                    </div>
                ) : (
                    /* ── PDF Success ── */
                    <div className="text-center py-6">
                        <div className="mx-auto bg-white border border-white/20 w-16 h-16 rounded-none flex items-center justify-center mb-6">
                            <CheckCircle2 className="text-black" size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl font-serif text-white mb-3">Your guide is downloading!</h3>
                        <p className="text-white/60 font-sans text-sm mb-8 max-w-xs mx-auto leading-relaxed">
                            Check your new tab for the PDF. Print it out, place your hand on the guide, and discover your ideal key size.
                        </p>
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
