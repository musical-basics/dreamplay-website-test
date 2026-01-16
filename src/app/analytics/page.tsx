import { getRecentLogs, getAnalyticsStats } from "@/lib/analytics"
import { Activity, BarChart3 } from "lucide-react"
import { AnalyticsDashboard } from "./dashboard"

export const dynamic = 'force-dynamic'

export default async function AnalyticsPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <BarChart3 className="w-8 h-8 text-indigo-600" />
                        Website Analytics
                    </h1>
                    <p className="mt-2 text-gray-600">Internal tracking dashboard</p>
                </header>

                <AnalyticsDashboard />
            </div>
        </div>
    )
}
