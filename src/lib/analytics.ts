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
