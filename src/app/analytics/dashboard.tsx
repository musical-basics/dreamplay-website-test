"use client"

import { useEffect, useState } from "react"
import { getAnalyticsStats, getRecentLogs, AnalyticsLog, getABTestStats, ABTestStats } from "@/lib/analytics"
import { Activity, RefreshCw, Split, Users, MousePointer2 } from "lucide-react"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar,
    Legend
} from "recharts"
import { ChevronDown, ChevronUp } from "lucide-react"

function ABTestRow({ item }: { item: ABTestStats }) {
    const [expanded, setExpanded] = useState(false)
    const [detailTab, setDetailTab] = useState<'conversions' | 'visitors'>('conversions')

    return (
        <>
            <tr
                key={item.variant}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setExpanded(!expanded)}
            >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize flex items-center gap-2">
                    {expanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    {item.variant}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {item.visitors}
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <MousePointer2 className="w-4 h-4" />
                        {item.conversions}
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-600">
                    {item.conversionRate.toFixed(2)}%
                </td>
            </tr>
            {expanded && (
                <tr className="bg-gray-50">
                    <td colSpan={4} className="px-6 py-4">
                        <div className="flex gap-4 mb-4 border-b border-gray-200">
                            <button
                                className={`pb-2 text-sm font-medium ${detailTab === 'conversions' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                                onClick={(e) => { e.stopPropagation(); setDetailTab('conversions'); }}
                            >
                                Conversion Details ({item.conversions})
                            </button>
                            <button
                                className={`pb-2 text-sm font-medium ${detailTab === 'visitors' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                                onClick={(e) => { e.stopPropagation(); setDetailTab('visitors'); }}
                            >
                                Visitor Details ({item.visitors})
                            </button>
                        </div>

                        {detailTab === 'conversions' && (
                            <>
                                {item.conversionDetails && item.conversionDetails.length > 0 ? (
                                    <div className="bg-white rounded border border-gray-200 overflow-hidden">
                                        <table className="min-w-full divide-y divide-gray-100">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">IP Address</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Converted At</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {item.conversionDetails.map((detail, idx) => (
                                                    <tr key={idx} className="hover:bg-gray-50">
                                                        <td className="px-4 py-2 text-sm text-gray-600 font-mono">{detail.ip_address}</td>
                                                        <td className="px-4 py-2 text-sm text-gray-600">{new Date(detail.converted_at).toLocaleString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-sm text-gray-500 italic">No detailed conversion events found.</div>
                                )}
                            </>
                        )}

                        {detailTab === 'visitors' && (
                            <>
                                {item.visitorDetails && item.visitorDetails.length > 0 ? (
                                    <div className="bg-white rounded border border-gray-200 overflow-hidden">
                                        <table className="min-w-full divide-y divide-gray-100">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">IP Address</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">First Seen At</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {item.visitorDetails.map((detail, idx) => (
                                                    <tr key={idx} className="hover:bg-gray-50">
                                                        <td className="px-4 py-2 text-sm text-gray-600 font-mono">{detail.ip_address}</td>
                                                        <td className="px-4 py-2 text-sm text-gray-600">{new Date(detail.first_seen_at).toLocaleString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-sm text-gray-500 italic">No detailed visitor events found.</div>
                                )}
                            </>
                        )}
                    </td>
                </tr>
            )}
        </>
    )
}

export function AnalyticsDashboard() {
    const [activeTab, setActiveTab] = useState<'overview' | 'logs' | 'ab-test'>('overview')
    const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d')

    // Data states
    const [logs, setLogs] = useState<AnalyticsLog[]>([])
    const [stats, setStats] = useState<{ chartData: any[], totalViews: number, uniquePaths: number } | null>(null)
    const [abStats, setAbStats] = useState<ABTestStats[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadData()
    }, [activeTab, timeRange])

    const loadData = async () => {
        setLoading(true)
        try {
            if (activeTab === 'logs') {
                const recentLogs = await getRecentLogs()
                setLogs(recentLogs)
            } else if (activeTab === 'ab-test') {
                const testStats = await getABTestStats()
                setAbStats(testStats)
            } else {
                const analyticsStats = await getAnalyticsStats(timeRange)
                setStats(analyticsStats)
            }
        } catch (error) {
            console.error("Failed to load analytics data", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'overview'
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Traffic Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('ab-test')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'ab-test'
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        A/B Test Results
                    </button>
                    <button
                        onClick={() => setActiveTab('logs')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'logs'
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Raw Logs
                    </button>
                </nav>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <RefreshCw className="w-8 h-8 animate-spin text-gray-300" />
                </div>
            ) : activeTab === 'overview' && stats ? (
                <div>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mb-8">
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <dt className="text-sm font-medium text-gray-500 truncate">Total Page Views</dt>
                                <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.totalViews}</dd>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <dt className="text-sm font-medium text-gray-500 truncate">Unique Pages Visited</dt>
                                <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.uniquePaths}</dd>
                            </div>
                        </div>
                    </div>

                    {/* Chart Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-medium text-gray-900">Page Views Trend</h3>
                            <div className="flex bg-gray-100 rounded-lg p-1">
                                {(['24h', '7d', '30d'] as const).map((range) => (
                                    <button
                                        key={range}
                                        onClick={() => setTimeRange(range)}
                                        className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${timeRange === range
                                            ? 'bg-white text-gray-900 shadow-sm'
                                            : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        {range === '24h' ? '24h' : range === '7d' ? '7 Days' : '30 Days'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stats.chartData}>
                                    <defs>
                                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis
                                        dataKey="date"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="views"
                                        stroke="#4f46e5"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorViews)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            ) : activeTab === 'ab-test' ? (
                <div>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                            <div className="flex items-center gap-3">
                                <Split className="w-5 h-5 text-gray-400" />
                                <h2 className="text-lg font-semibold text-gray-900">Conversion Results ("Join the Waitlist")</h2>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="p-6 border-b border-gray-100">
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={abStats} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                                        <XAxis type="number" tickFormatter={(val) => `${val}%`} />
                                        <YAxis dataKey="variant" type="category" />
                                        <Tooltip cursor={{ fill: 'transparent' }} formatter={(value: number | undefined) => [value ? `${value.toFixed(2)}%` : '0%', 'Conversion Rate']} />
                                        <Legend />
                                        <Bar dataKey="conversionRate" name="Conversion Rate (%)" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={40} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Detailed Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bucket (Variant)</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Visitors</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Conversions</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion Rate</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {abStats.map((item) => (
                                        <ABTestRow key={item.variant} item={item} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                        <div className="flex items-center gap-3">
                            <Activity className="w-5 h-5 text-gray-400" />
                            <h2 className="text-lg font-semibold text-gray-900">Recent Activity Logs</h2>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Path</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {logs.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                                            No recent logs found. Navigate around the site to generate data.
                                        </td>
                                    </tr>
                                ) : (
                                    logs.map((log) => (
                                        <tr key={log.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(log.created_at).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${log.event_name === 'cta_click' ? 'bg-green-100 text-green-800' :
                                                    log.event_name === 'pageview' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {log.event_name}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex flex-col">
                                                    <span title={log.user_id || 'Anonymous'} className="truncate max-w-[150px]">{log.user_id || 'Anonymous'}</span>
                                                    <span className="text-xs text-gray-400">{log.ip_address}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <span title={log.path} className="truncate max-w-[200px] block">
                                                    {log.path}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex flex-col">
                                                    <span className="truncate max-w-[200px]" title={log.user_agent || ''}>
                                                        {log.user_agent ? (log.user_agent.includes('Mac') ? 'Mac OS' : log.user_agent.includes('Windows') ? 'Windows' : 'Other') : 'Unknown'}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
