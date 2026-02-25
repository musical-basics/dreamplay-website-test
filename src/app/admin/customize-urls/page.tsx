'use client'

import { useState, useEffect } from 'react'
import { getCustomizePageUrls, updateCustomizePageUrls } from '@/actions/admin-actions'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CustomizeUrlsPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState('')

    const [urls, setUrls] = useState({
        bundle: '',
        solo: '',
        reservation: ''
    })

    useEffect(() => {
        const storedAuth = localStorage.getItem('admin_token')
        if (storedAuth === 'sorenkier_valid') {
            setIsAuthenticated(true)
            loadData()
        } else {
            setLoading(false)
            // Redirect to admin login if not authenticated
            window.location.href = '/admin'
        }
    }, [])

    async function loadData() {
        setLoading(true)
        const data = await getCustomizePageUrls()
        setUrls({
            bundle: data.bundle || '',
            solo: data.solo || '',
            reservation: data.reservation || ''
        })
        setLoading(false)
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault()
        setSaving(true)
        setMessage('')

        const res = await updateCustomizePageUrls(urls)
        if (res.success) {
            setMessage('URLs updated successfully!')
        } else {
            setMessage(`Failed to update URLs: ${res.error}`)
        }
        setSaving(false)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">
                <div className="animate-pulse">Loading Config...</div>
            </div>
        )
    }

    if (!isAuthenticated) return null

    return (
        <div className="min-h-screen bg-neutral-950 text-white p-8 font-sans">
            <div className="max-w-2xl mx-auto">
                <Link href="/admin" className="flex items-center gap-2 text-neutral-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </Link>

                <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-xl">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <span>🔗</span> Customize Page URLs
                    </h2>
                    <p className="text-sm text-neutral-400 mb-6">
                        Configure the destination URLs for the buttons on the /customize page.
                        Enter a Shopify Variant ID (numeric) or a full redirect URL. Leave empty for default.
                    </p>

                    <form onSubmit={handleSave} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">
                                DreamPlay Bundle (Variant ID or URL)
                            </label>
                            <input
                                type="text"
                                className="w-full bg-black border border-neutral-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm"
                                value={urls.bundle}
                                onChange={(e) => setUrls({ ...urls, bundle: e.target.value })}
                                placeholder="e.g. 52209394549050 or https://..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">
                                Keyboard Only (Variant ID or URL)
                            </label>
                            <input
                                type="text"
                                className="w-full bg-black border border-neutral-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm"
                                value={urls.solo}
                                onChange={(e) => setUrls({ ...urls, solo: e.target.value })}
                                placeholder="e.g. 1234567890 or https://..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">
                                Lock My Spot Reservation (Variant ID or URL)
                            </label>
                            <input
                                type="text"
                                className="w-full bg-black border border-neutral-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm"
                                value={urls.reservation}
                                onChange={(e) => setUrls({ ...urls, reservation: e.target.value })}
                                placeholder="e.g. 52213397291322 or https://..."
                            />
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
                                    'Save Changes'
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
