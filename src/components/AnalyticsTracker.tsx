'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { logEvent } from '@/lib/analytics'

function AnalyticsTrackerContent() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (pathname) {
            let url = pathname
            if (searchParams && searchParams.toString()) {
                url = url + `?${searchParams.toString()}`
            }

            const metadata: any = {};

            // Capture email from URL if present
            const em = searchParams?.get('em');
            if (em && typeof window !== 'undefined') {
                localStorage.setItem('dp_user_email', em);
            }

            // Retrieve saved email to persist identity across organic clicks
            if (typeof window !== 'undefined') {
                const savedEmail = localStorage.getItem('dp_user_email');
                if (savedEmail) {
                    metadata.email = savedEmail;
                }
            }

            // Log the page view with injected email
            logEvent('pageview', { path: url, metadata })
        }
    }, [pathname, searchParams])

    return null
}

export function AnalyticsTracker() {
    return (
        <Suspense fallback={null}>
            <AnalyticsTrackerContent />
        </Suspense>
    )
}
