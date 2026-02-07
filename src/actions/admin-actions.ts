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

export async function getDiscountPopupStatus() {
    try {
        const { data, error } = await supabase
            .from('admin_variables')
            .select('value')
            .eq('key', 'show_discount_popup')
            .single()

        if (error) {
            // If key doesn't exist, default to true
            if (error.code === 'PGRST116') return 'true'
            console.error('Error fetching discount status:', error)
            return 'true'
        }

        return data?.value || 'true'
    } catch (error) {
        console.error('Failed to get discount status:', error)
        return 'true'
    }
}

export async function updateDiscountPopupStatus(enabled: boolean) {
    try {
        const { error } = await supabase
            .from('admin_variables')
            .upsert({
                key: 'show_discount_popup',
                value: String(enabled),
                updated_at: new Date().toISOString()
            })

        if (error) {
            console.error('Error updating discount status:', error)
            throw new Error(error.message)
        }

        return { success: true }
    } catch (error: any) {
        return { success: false, error: error.message }
    }
}

export async function getHomepageVersion() {
    try {
        const { data, error } = await supabase
            .from('admin_variables')
            .select('value')
            .eq('key', 'homepage_version')
            .single()

        if (error) {
            // Default to special-offer if not set
            if (error.code === 'PGRST116') return 'special-offer'
            console.error('Error fetching homepage version:', error)
            return 'special-offer'
        }

        return data?.value || 'special-offer'
    } catch (error) {
        console.error('Failed to get homepage version:', error)
        return 'special-offer'
    }
}

export async function updateHomepageVersion(version: 'old' | 'special-offer') {
    try {
        const { error } = await supabase
            .from('admin_variables')
            .upsert({
                key: 'homepage_version',
                value: version,
                updated_at: new Date().toISOString()
            })

        if (error) {
            console.error('Error updating homepage version:', error)
            throw new Error(error.message)
        }

        return { success: true }
    } catch (error: any) {
        return { success: false, error: error.message }
    }
}

export async function loginAdmin(password: string) {
    if (password === 'sorenkier') {
        // In a real app we'd use cookies() from next/headers to set a session
        // For this simple request, we'll verify and return success, letting client handle persistence
        return { success: true }
    }
    return { success: false, error: 'Invalid password' }
}
