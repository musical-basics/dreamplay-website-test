
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toggleTestStatus } from "@/actions/ab-actions";
import { TestControlPanel } from "./test-control-panel";
import { createAdminClient } from "@/lib/supabase/server";

export const revalidate = 0; // Disable cache for admin panel

export default async function ABTestsPage() {
    // Initialize Service Role Client for Admin Page
    const supabase = await createAdminClient();
    // 1. Fetch Tests
    const { data: tests, error } = await supabase
        .from("ab_tests")
        .select("*, ab_variants(*)")
        .order("created_at", { ascending: false });

    if (error) {
        return <div className="p-8">Error loading tests: {error.message}</div>;
    }

    const safeTests = tests || [];

    // 2. Fetch Aggregated Stats
    // Note: For production, use RPC or specialized analytics table. 
    // Here we do a simple aggregation in-memory for the simpler setup.
    const statsMap: Record<string, any> = {};

    for (const test of safeTests) {
        // Fetch events for this test
        // Limit to recent 10000 events for performance protection in this basic implementation
        const { data: events } = await supabase
            .from("ab_events")
            .select("event_type, variant_id, session_id, metadata")
            .eq("test_id", test.id)
            .limit(10000);

        const stats = calculateStats(events || [], test.ab_variants);
        statsMap[test.id] = stats;
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">A/B Experiments</h1>
                    <p className="text-gray-500">Manage your split tests and traffic allocation.</p>
                </div>
                <Link href="/admin/ab-tests/create">
                    <Button>+ Create New Test</Button>
                </Link>
            </div>

            <div className="grid gap-8">
                {safeTests.map((test) => (
                    <div key={test.id} className="border rounded-xl p-6 shadow-sm bg-white dark:bg-gray-900">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-xl font-semibold">{test.name}</h2>
                                <div className="text-sm text-gray-500 font-mono mt-1">
                                    Path: {test.target_path} | Slug: {test.slug}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <form action={toggleTestStatus.bind(null, test.id, test.status)}>
                                    <Button variant="outline" size="sm">
                                        {test.status === 'active' ? 'Pause' : 'Resume'}
                                    </Button>
                                </form>
                                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${test.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {test.status.toUpperCase()}
                                </div>
                            </div>
                        </div>

                        {/* Stats Table */}
                        <div className="overflow-x-auto mb-4">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                                    <tr>
                                        <th className="px-4 py-2">Variant</th>
                                        <th className="px-4 py-2">Traffic %</th>
                                        <th className="px-4 py-2">Views (Unique)</th>
                                        <th className="px-4 py-2">Conversions (Unique)</th>
                                        <th className="px-4 py-2">Conv. Rate</th>
                                        <th className="px-4 py-2">Avg Time (s)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(test.ab_variants || []).map((variant: any) => {
                                        const vStats = statsMap[test.id]?.[variant.id] || { views: 0, conversions: 0, avgTime: 0 };
                                        const rate = vStats.views > 0 ? ((vStats.conversions / vStats.views) * 100).toFixed(1) : "0.0";
                                        const isWinner = test.winning_variant_id === variant.id;

                                        return (
                                            <tr key={variant.id} className={`border-t ${isWinner ? 'bg-yellow-50 dark:bg-yellow-900/10' : ''}`}>
                                                <td className="px-4 py-2 font-medium">
                                                    {variant.name} {isWinner && "🏆"}
                                                </td>
                                                <td className="px-4 py-2 text-gray-500">{variant.traffic_percent}%</td>
                                                <td className="px-4 py-2">{vStats.views}</td>
                                                <td className="px-4 py-2">{vStats.conversions}</td>
                                                <td className="px-4 py-2 font-bold text-blue-600">{rate}%</td>
                                                <td className="px-4 py-2">{vStats.avgTime.toFixed(1)}s</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Control Panel (Winner selection) */}
                        <TestControlPanel test={test} />
                    </div>
                ))}

                {safeTests.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed">
                        <p className="text-gray-500 mb-4">No active experiments found.</p>
                        <Link href="/admin/ab-tests/create">
                            <Button>Start your first test</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

// Helper to aggregate stats
function calculateStats(events: any[], variants: any[]) {
    const stats: Record<string, { views: number; conversions: number; totalTime: number; timeCount: number; avgTime: number }> = {};

    // Initialize
    (variants || []).forEach(v => {
        stats[v.id] = { views: 0, conversions: 0, totalTime: 0, timeCount: 0, avgTime: 0 };
    });

    const sessionViews = new Set<string>();
    const sessionConversions = new Set<string>();

    events.forEach(e => {
        const vId = e.variant_id;
        if (!stats[vId]) return;

        // Unique Views
        if (e.event_type === 'view') {
            const key = `${vId}-${e.session_id}`;
            if (!sessionViews.has(key)) {
                sessionViews.add(key);
                stats[vId].views++;
            }
        }

        // Unique Conversions
        if (e.event_type === 'conversion') {
            const key = `${vId}-${e.session_id}`;
            if (!sessionConversions.has(key)) {
                sessionConversions.add(key);
                stats[vId].conversions++;
            }
        }

        // Time on Page (Average)
        if (e.event_type === 'time_on_page' && e.metadata?.duration) {
            stats[vId].totalTime += Number(e.metadata.duration);
            stats[vId].timeCount++;
        }
    });

    // Calculate Averages
    Object.values(stats).forEach(s => {
        if (s.timeCount > 0) {
            s.avgTime = s.totalTime / s.timeCount;
        }
    });

    return stats;
}
