import { getRecentLogs } from "@/lib/analytics"
import { Activity, BarChart3 } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function AnalyticsPage() {
    const logs = await getRecentLogs()

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

                {/* Raw Logs Section */}
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
            </div>
        </div>
    )
}
