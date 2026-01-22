import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize simpler client for middleware (Edge compatible)
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const pathname = url.pathname;

    // 1. Check DB for active tests on this path
    // (In production, you would cache this response to avoid hitting DB on every request)
    const { data: activeTest } = await supabase
        .from("ab_tests")
        .select("*, ab_variants(*)")
        .eq("target_path", pathname)
        .eq("status", "active")
        .single();

    if (!activeTest || !activeTest.ab_variants) {
        return NextResponse.next(); // No test running, proceed as normal
    }

    // 2. Check if user is already bucketed via Cookie
    const cookieName = `ab_${activeTest.slug}`;
    let assignedVariantId = request.cookies.get(cookieName)?.value;
    let variant = activeTest.ab_variants.find((v: any) => v.id === assignedVariantId);

    // 3. Logic: If Winner Declared, force everyone to winner
    if (activeTest.winning_variant_id) {
        variant = activeTest.ab_variants.find((v: any) => v.id === activeTest.winning_variant_id);
    }
    // 4. Logic: If no bucket, assign one based on traffic %
    else if (!variant) {
        const random = Math.random() * 100;
        let accumulated = 0;
        for (const v of activeTest.ab_variants) {
            accumulated += v.traffic_percent;
            if (random <= accumulated) {
                variant = v;
                break;
            }
        }
    }

    // 5. Rewrite Request
    if (variant && variant.path_rewrite !== pathname) {
        const rewriteUrl = request.nextUrl.clone();
        rewriteUrl.pathname = variant.path_rewrite;

        // Pass test info headers so the Client Component knows what to track
        const response = NextResponse.rewrite(rewriteUrl);
        response.cookies.set(cookieName, variant.id);
        response.headers.set("x-ab-test-id", activeTest.id);
        response.headers.set("x-ab-variant-id", variant.id);
        return response;
    }

    // Even if it's the Control (no rewrite), we set headers for tracking
    const response = NextResponse.next();
    if (variant) {
        response.cookies.set(cookieName, variant.id);
        response.headers.set("x-ab-test-id", activeTest.id);
        response.headers.set("x-ab-variant-id", variant.id);
    }
    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|api|admin).*)", // Exclude API and Admin
    ],
};
