'use server'

import { createClient } from '@supabase/supabase-js'

// Initialize Supabase Admin Client
// Using service_role key to ensure we have permission to manage admin variables
// This should only be used in secure server actions
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function getCountdownDate() {
    try {
        const { data, error } = await supabase
            .from('admin_variables')
            .select('value')
            .eq('key', 'countdown_end_date')
            .single()

        if (error) {
            console.error('Error fetching countdown date:', error)
            return null
        }

        return data?.value || null
    } catch (error) {
        console.error('Failed to get countdown date:', error)
        return null
    }
}

export async function updateCountdownDate(date: string) {
    try {
        // Simple validation for ISO string
        const d = new Date(date)
        if (isNaN(d.getTime())) {
            throw new Error('Invalid date format')
        }

        const { error } = await supabase
            .from('admin_variables')
            .upsert({
                key: 'countdown_end_date',
                value: date,
                updated_at: new Date().toISOString()
            })

        if (error) {
            console.error('Error updating countdown date:', error)
            throw new Error(error.message)
        }

        return { success: true }
    } catch (error: any) {
        console.error('Failed to update countdown date:', error)
        return { success: false, error: error.message }
    }
}
