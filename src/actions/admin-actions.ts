'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

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

        revalidatePath('/')
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

export async function getCustomizePageUrls() {
    try {
        const { data, error } = await supabase
            .from('admin_variables')
            .select('key, value')
            .in('key', ['customize_url_bundle', 'customize_url_solo', 'customize_url_deposit'])

        if (error) {
            console.error('Error fetching customize URLs:', error)
            return {
                bundle: '',
                solo: '',
                deposit: ''
            }
        }

        // Initialize with emptiness
        const urlMap: Record<string, string> = {
            'customize_url_bundle': '',
            'customize_url_solo': '',
            'customize_url_deposit': ''
        }

        data?.forEach((row: { key: string, value: string }) => {
            urlMap[row.key] = row.value
        })

        return {
            bundle: urlMap['customize_url_bundle'],
            solo: urlMap['customize_url_solo'],
            deposit: urlMap['customize_url_deposit']
        }
    } catch (error) {
        console.error('Failed to get customize URLs:', error)
        return {
            bundle: '',
            solo: '',
            deposit: ''
        }
    }
}

export async function updateCustomizePageUrls(urls: { bundle: string, solo: string, deposit: string }) {
    try {
        const updates = [
            { key: 'customize_url_bundle', value: urls.bundle, updated_at: new Date().toISOString() },
            { key: 'customize_url_solo', value: urls.solo, updated_at: new Date().toISOString() },
            { key: 'customize_url_deposit', value: urls.deposit, updated_at: new Date().toISOString() }
        ]

        const { error } = await supabase
            .from('admin_variables')
            .upsert(updates)

        if (error) {
            console.error('Error updating customize URLs:', error)
            throw new Error(error.message)
        }

        revalidatePath('/customize')
        return { success: true }
    } catch (error: any) {
        return { success: false, error: error.message }
    }
}

