import { getABTestStats } from "@/lib/posthog-server"
import { AlertTriangle, BarChart3, Clock, MousePointer2, Users } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function AnalyticsPage() {
    const stats = await getABTestStats()
    const hasCredentials = process.env.POSTHOG_PROJECT_ID && process.env.POSTHOG_PERSONAL_API_KEY

    // Normalize stats to ensure we have Control/Variant
    const getBucketStats = (bucket: string) =>
        stats.find(s => s.bucket === bucket) || { bucket, visitors: 0, clicks: 0, avgTime: 0 }

    const control = getBucketStats('control')
    const variant = getBucketStats('variant')

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <BarChart3 className="w-8 h-8 text-indigo-600" />
                        A/B Test Dashboard
                    </h1>
                    <p className="mt-2 text-gray-600">Comparing Home Page (Control) vs Special Offer (Variant)</p>
                </header>

                {!hasCredentials && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-yellow-700">
                                    <strong>Setup Required:</strong> Please add <code>POSTHOG_PROJECT_ID</code> and <code>POSTHOG_PERSONAL_API_KEY</code> to your <code>.env.local</code> file to view real data.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Control Card */}
                    <VariantCard
                        title="Control (Home)"
                        description="Original Home Page"
                        data={control}
                        color="blue"
                    />

                    {/* Variant Card */}
                    <VariantCard
                        title="Variant (Special Offer)"
                        description="New Dark Mode Landing Page"
                        data={variant}
                        color="indigo"
                        isWinner={variant.clicks > control.clicks || (variant.visitors > 0 && (variant.clicks / variant.visitors) > (control.clicks / (control.visitors || 1)))}
                    />
                </div>
            </div>
        </div>
    )
}

function VariantCard({ title, description, data, color, isWinner }: any) {
    const ctr = data.visitors > 0 ? ((data.clicks / data.visitors) * 100).toFixed(1) : "0.0"
    const avgTime = data.avgTime.toFixed(0)

    return (
        <div className={`bg-white rounded-2xl shadow-sm border ${isWinner ? 'border-2 border-indigo-500 ring-4 ring-indigo-50' : 'border-gray-200'} overflow-hidden`}>
            <div className={`px-6 py-5 border-b border-gray-100 ${color === 'blue' ? 'bg-blue-50/50' : 'bg-indigo-50/50'}`}>
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                        <p className="text-sm text-gray-500 mt-1">{description}</p>
                    </div>
                    {isWinner && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Current Leader
                        </span>
                    )}
                </div>
            </div>

            <div className="p-6 grid grid-cols-2 gap-6">
                <StatItem
                    icon={<Users className="w-4 h-4 text-gray-400" />}
                    label="Unique Visitors"
                    value={data.visitors}
                />
                <StatItem
                    icon={<MousePointer2 className="w-4 h-4 text-gray-400" />}
                    label="CTA Clicks"
                    value={data.clicks}
                />
                <StatItem
                    icon={<BarChart3 className="w-4 h-4 text-gray-400" />}
                    label="Conversion Rate"
                    value={`${ctr}%`}
                    highlight
                />
                <StatItem
                    icon={<Clock className="w-4 h-4 text-gray-400" />}
                    label="Avg Time on Page"
                    value={`${avgTime}s`}
                />
            </div>
        </div>
    )
}

function StatItem({ icon, label, value, highlight }: any) {
    return (
        <div>
            <div className="flex items-center gap-2 mb-1">
                {icon}
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
            </div>
            <div className={`text-2xl font-bold ${highlight ? 'text-indigo-600' : 'text-gray-900'}`}>
                {value}
            </div>
        </div>
    )
}
