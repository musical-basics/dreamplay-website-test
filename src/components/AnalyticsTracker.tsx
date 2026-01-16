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

            // Log the page view
            logEvent('pageview', { path: url })
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
