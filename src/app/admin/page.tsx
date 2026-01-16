'use client'

import { useState, useEffect } from 'react'
import { getCountdownDate, updateCountdownDate } from '@/actions/admin-actions'

export default function AdminPage() {
    const [date, setDate] = useState('')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        loadData()
    }, [])

    async function loadData() {
        setLoading(true)
        const val = await getCountdownDate()
        if (val) setDate(val)
        // Default fall back if DB is empty or error
        else setDate('2026-01-19T21:00:00-08:00')
        setLoading(false)
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault()
        setSaving(true)
        setMessage('')

        const res = await updateCountdownDate(date)
        if (res.success) {
            setMessage('Date updated successfully!')
        } else {
            setMessage(`Failed to update date: ${res.error}`)
        }
        setSaving(false)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">
                <div className="animate-pulse">Loading Admin Config...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-white p-8 font-sans">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-neutral-400 mb-8">Manage global site settings and configurations.</p>

                <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-xl">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <span>⏳</span> Countdown Settings
                    </h2>

                    <form onSubmit={handleSave} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">
                                Countdown End Date (ISO Format)
                            </label>
                            <input
                                type="text"
                                className="w-full bg-black border border-neutral-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                placeholder="YYYY-MM-DDTHH:mm:ss-ZZ:ZZ"
                            />
                            <p className="text-xs text-neutral-500 mt-2">
                                Current format: ISO 8601 (e.g., 2026-01-19T21:00:00-08:00 for PST)
                            </p>
                            <div className="mt-2 text-xs text-neutral-600 bg-neutral-950 p-2 rounded border border-neutral-800">
                                <strong>Preview Time:</strong> {new Date(date).toString() !== 'Invalid Date' ? new Date(date).toLocaleString() : 'Invalid Date'}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-neutral-800">
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                {saving ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                                        Saving...
                                    </>
                                ) : (
                                    'Update Date'
                                )}
                            </button>
                        </div>

                        {message && (
                            <div className={`p-3 rounded-lg text-sm text-center font-medium ${message.includes('success') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                {message}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}
