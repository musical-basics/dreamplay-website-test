"use client"

import { useEffect, useRef } from "react"
import posthog from "posthog-js"

export type ABVariant = "control" | "variant"

export function useABAnalytics(pageName: string, options: { trackTime: boolean } = { trackTime: true }) {
    const startTime = useRef(Date.now())
    const hasTrackedTime = useRef(false)

    // Helper: Get bucket from cookie, or null
    const getBucket = (): ABVariant | null => {
        if (typeof document === "undefined") return null
        const match = document.cookie.match(new RegExp("(^| )ab-test-bucket=([^;]+)"))
        return match ? (match[2] as ABVariant) : null
    }

    // Track Time on Page
    useEffect(() => {
        console.log(`[Analytics] Hook initialized for page: ${pageName}`)
        if (!options.trackTime) return;

        startTime.current = Date.now()
        hasTrackedTime.current = false

        const trackTime = () => {
            if (hasTrackedTime.current) return
            const duration = (Date.now() - startTime.current) / 1000 // seconds
            const bucket = getBucket()

            posthog.capture("time_on_page", {
                page: pageName,
                duration_seconds: duration,
                ab_test_bucket: bucket,
            })
            console.log(`[Analytics] Time on page (${pageName}): ${duration}s (Bucket: ${bucket})`)
            hasTrackedTime.current = true
        }

        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                trackTime()
            }
        }

        // Track on unmount or tab switch
        window.addEventListener("visibilitychange", handleVisibilityChange)

        return () => {
            trackTime()
            window.removeEventListener("visibilitychange", handleVisibilityChange)
        }
    }, [pageName, options.trackTime])

    // Track Clicks
    const trackClick = (location: string, label: string) => {
        const bucket = getBucket()
        const payload = {
            page: pageName,
            location,
            label,
            ab_test_bucket: bucket,
        }
        console.log(`[Analytics] Sending 'cta_click' to PostHog:`, payload)

        posthog.capture("cta_click", payload)
        console.log(`[Analytics] Click tracked: ${label} @ ${location} (Bucket: ${bucket})`)
    }

    return { trackClick }
}
