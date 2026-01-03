import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const AB_COOKIE_NAME = 'ab-test-bucket'
    let bucket = request.cookies.get(AB_COOKIE_NAME)?.value

    // If no bucket, assign one
    if (!bucket) {
        bucket = Math.random() < 0.5 ? 'control' : 'variant'
        console.log(`[Middleware] New visitor. Assigned bucket: ${bucket}`)
    } else {
        console.log(`[Middleware] Returning visitor. Bucket: ${bucket}`)
    }

    // Handle URL rendering based on bucket
    // If user is designated for 'variant' and visits '/', show them '/special-offer' content
    if (request.nextUrl.pathname === '/') {
        if (bucket === 'variant') {
            const url = request.nextUrl.clone()
            url.pathname = '/special-offer'
            const response = NextResponse.rewrite(url)
            // Ensure cookie is set
            if (!request.cookies.has(AB_COOKIE_NAME)) {
                response.cookies.set(AB_COOKIE_NAME, bucket, { httpOnly: false })
            }
            return response
        }
    }

    // Default response (Control or other pages)
    const response = NextResponse.next()

    // Set cookie if missing
    if (!request.cookies.has(AB_COOKIE_NAME)) {
        response.cookies.set(AB_COOKIE_NAME, bucket, { httpOnly: false })
    }

    return response
}

export const config = {
    matcher: [
        // Match root path mainly, but also must run on root to set cookie.
        // We want to run on '/' to potentially rewrite.
        '/',
        // We can also match others if we want to track them, but for now we only rewrite '/'
    ],
}
