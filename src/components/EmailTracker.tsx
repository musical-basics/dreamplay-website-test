"use client"

import { useEffect, useRef, Suspense } from "react"
import { useSearchParams, usePathname } from "next/navigation"

function EmailTrackerContent() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    // Track when the user lands on a specific page
    const startTime = useRef(Date.now())

    // 1. IDENTIFY: Check for Subscriber ID in URL
    useEffect(() => {
        const sid = searchParams.get("sid")
        const cid = searchParams.get("cid")

        if (sid) {
            // Save to storage so we track them on future pages too
            localStorage.setItem("dp_subscriber_id", sid)
            if (cid) localStorage.setItem("dp_campaign_id", cid)
        }
    }, [searchParams])

    // 2. REPORT: Track Page Views & Duration
    useEffect(() => {
        const sid = localStorage.getItem("dp_subscriber_id")
        if (!sid) return // If we don't know who this is, don't track

        // A. Send "Page View" immediately
        sendEvent(sid, "page_view", pathname)

        // Reset timer for the new page
        startTime.current = Date.now()

        // B. Send "Session End" when they leave the page
        return () => {
            const duration = Math.round((Date.now() - startTime.current) / 1000)
            if (duration > 1) { // Only track if they stayed > 1 second
                sendEvent(sid, "session_end", pathname, duration)
            }
        }
    }, [pathname])

    const sendEvent = (sid: string, type: string, urlPath: string, duration?: number) => {
        const payload = {
            subscriber_id: sid,
            campaign_id: localStorage.getItem("dp_campaign_id"),
            type: type,
            url: window.location.origin + urlPath,
            duration: duration,
            // Grab IP on the receiver side, or pass client info here if needed
        }

        // Send to your Email App API (The "Receiver")
        // Use keepalive: true to ensure the request finishes even if the tab is closing
        fetch("https://email.dreamplaypianos.com/api/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            keepalive: true
        }).catch(err => console.error("Tracking error", err))
    }

    return null
}

// 3. WRAP: Use Suspense to prevent Next.js de-opt
export function EmailTracker() {
    return (
        <Suspense fallback={null}>
            <EmailTrackerContent />
        </Suspense>
    )
}
