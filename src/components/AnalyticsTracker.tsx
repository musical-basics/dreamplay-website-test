'use client'

import { useEffect, useRef, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { logEvent } from '@/lib/analytics'

function AnalyticsTrackerContent() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const analyticsTrackUrl = process.env.NEXT_PUBLIC_ANALYTICS_TRACK_URL || 'https://data.dreamplaypianos.com/api/track'

    // Use Refs so we can track times and URLs without triggering infinite re-renders
    const startTime = useRef(Date.now())
    const currentPath = useRef('')
    const hasSentLeave = useRef(false)

    useEffect(() => {
        if (!pathname) return;

        let url = pathname
        if (searchParams && searchParams.toString()) {
            url = url + `?${searchParams.toString()}`
        }

        const metadata: any = {};
        const em = searchParams?.get('em');
        if (em && typeof window !== 'undefined') {
            localStorage.setItem('dp_user_email', em);
        }
        if (typeof window !== 'undefined') {
            const savedEmail = localStorage.getItem('dp_user_email');
            if (savedEmail) metadata.email = savedEmail;
        }

        // 1. If navigating internally inside the App, fire the leave event for the OLD page
        if (currentPath.current && currentPath.current !== url && !hasSentLeave.current) {
            const duration = Math.round((Date.now() - startTime.current) / 1000);
            if (duration > 1) {
                fetch(analyticsTrackUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        eventName: 'page_leave',
                        path: currentPath.current,
                        metadata: { ...metadata, duration_seconds: duration }
                    }),
                    keepalive: true // Guarantees delivery even during navigation
                }).catch(() => { });
            }
        }

        // 2. Setup for the NEW page
        currentPath.current = url;
        startTime.current = Date.now();
        hasSentLeave.current = false;

        // 3. Log the page view using your existing Server Action
        logEvent('pageview', { path: url, metadata });

    }, [pathname, searchParams])

    // 4. Track physical exits (tab close, browser minimize, phone lock)
    useEffect(() => {
        const handleVisibilityChange = () => {
            // Only fire if they are hiding the tab and we haven't sent it yet
            if (document.visibilityState === 'hidden' && !hasSentLeave.current && currentPath.current) {
                const duration = Math.round((Date.now() - startTime.current) / 1000);
                if (duration > 1) {
                    const savedEmail = typeof window !== 'undefined' ? localStorage.getItem('dp_user_email') : null;
                    const metadata: any = { duration_seconds: duration };
                    if (savedEmail) metadata.email = savedEmail;

                    fetch(analyticsTrackUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            eventName: 'page_leave',
                            path: currentPath.current,
                            metadata: metadata
                        }),
                        keepalive: true // Guarantees delivery when tab is destroyed
                    }).catch(() => { });

                    hasSentLeave.current = true;
                }
            } else if (document.visibilityState === 'visible') {
                // If they return to the tab, restart the clock so we don't log a massive 8-hour session
                startTime.current = Date.now();
                hasSentLeave.current = false;
            }
        };

        const handlePageHide = () => {
            // Fallback for older iOS Safari browsers
            if (!hasSentLeave.current && currentPath.current) {
                const duration = Math.round((Date.now() - startTime.current) / 1000);
                if (duration > 1) {
                    fetch(analyticsTrackUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            eventName: 'page_leave',
                            path: currentPath.current,
                            metadata: { duration_seconds: duration }
                        }),
                        keepalive: true
                    }).catch(() => { });
                    hasSentLeave.current = true;
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('pagehide', handlePageHide);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('pagehide', handlePageHide);
        };
    }, []);

    return null
}

export function AnalyticsTracker() {
    return (
        <Suspense fallback={null}>
            <AnalyticsTrackerContent />
        </Suspense>
    )
}
