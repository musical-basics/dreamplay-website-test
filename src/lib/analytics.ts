'use server'

import { createClient } from '@supabase/supabase-js'
import { headers } from 'next/headers'

// Initialize Supabase Admin Client for generic logging (service role)
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export interface AnalyticsLog {
    id: string
    created_at: string
    event_name: string
    path: string
    ip_address: string | null
    user_agent: string | null
    user_id?: string
    metadata?: any
}

export async function logEvent(
    eventName: string,
    data: { path: string; userId?: string; metadata?: any }
) {
    try {
        const headerList = await headers()
        const userAgent = headerList.get('user-agent')
        const forwardedFor = headerList.get('x-forwarded-for')
        const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown'

        const { error } = await supabase.from('analytics_logs').insert({
            event_name: eventName,
            path: data.path,
            ip_address: ip,
            user_agent: userAgent,
            user_id: data.userId,
            metadata: data.metadata,
        })

        if (error) {
            console.error('[Analytics Server] Supabase insert error:', error)
        }
    } catch (error) {
        console.error('Failed to log analytics event:', error)
        // Don't throw, we don't want to break the UI
    }
}

export async function getRecentLogs(): Promise<AnalyticsLog[]> {
    try {
        const { data, error } = await supabase
            .from('analytics_logs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(100)

        if (error) {
            console.error('Error fetching analytics logs:', error)
            return []
        }

        return data as AnalyticsLog[]
    } catch (error) {
        console.error('Failed to get recent logs:', error)
        return []
    }
}

export type TimeRange = '24h' | '7d' | '30d'

export async function getAnalyticsStats(range: TimeRange) {
    try {
        const now = new Date()
        const startDate = new Date()

        if (range === '24h') {
            startDate.setHours(startDate.getHours() - 24)
        } else if (range === '7d') {
            startDate.setDate(startDate.getDate() - 7)
        } else {
            startDate.setDate(startDate.getDate() - 30)
        }

        const { data: logs, error } = await supabase
            .from('analytics_logs')
            .select('created_at, path')
            .gte('created_at', startDate.toISOString())
            .order('created_at', { ascending: true })

        if (error) {
            console.error('Error fetching analytics stats:', error)
            return { chartData: [], totalViews: 0, uniquePaths: 0 }
        }

        // Aggregate data for chart
        const chartDataMap = new Map<string, number>()

        // Define format based on range
        const getKey = (dateStr: string) => {
            const date = new Date(dateStr)
            if (range === '24h') {
                return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })
            } else {
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            }
        }

        logs.forEach(log => {
            const key = getKey(log.created_at)
            chartDataMap.set(key, (chartDataMap.get(key) || 0) + 1)
        })

        // Fill in gaps if needed (optional optimization for smoother charts)
        // For simplicity, we'll just map the existing data points for now

        const chartData = Array.from(chartDataMap.entries()).map(([date, views]) => ({
            date,
            views
        }))

        return {
            chartData,
            totalViews: logs.length,
            uniquePaths: new Set(logs.map(l => l.path)).size
        }

    } catch (error) {
        console.error('Failed to get analytics stats:', error)
        return { chartData: [], totalViews: 0, uniquePaths: 0 }
    }
}
