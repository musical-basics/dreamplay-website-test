'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getCountdownDate, updateCountdownDate, getDiscountPopupStatus, updateDiscountPopupStatus, loginAdmin, getHomepageVersion, updateHomepageVersion, getHiddenProducts, updateHiddenProducts, getChatModel, updateChatModel, getChatKnowledge, updateChatKnowledge, getChatSuggestions, updateChatSuggestions } from '@/actions/admin-actions'

type AdminTab = 'chatbot' | 'marketing' | 'other'

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [authError, setAuthError] = useState('')
    const [activeTab, setActiveTab] = useState<AdminTab>('chatbot')

    // Date State
    const [date, setDate] = useState('')

    // Feature Toggle State
    const [showDiscount, setShowDiscount] = useState(true)
    const [homepageVersion, setHomepageVersion] = useState<'old' | 'special-offer'>('special-offer')
    const [hiddenProducts, setHiddenProducts] = useState<string[]>(['reservation', 'reserve50'])
    const [chatModel, setChatModel] = useState('google:gemini-2.5-flash')
    const [availableModels, setAvailableModels] = useState<{ id: string; provider: string; name: string }[]>([])
    const [modelsLoading, setModelsLoading] = useState(false)
    const [chatKnowledge, setChatKnowledge] = useState('')
    const [knowledgeSaving, setKnowledgeSaving] = useState(false)
    const [knowledgeMessage, setKnowledgeMessage] = useState('')
    const [chatSuggestions, setChatSuggestions] = useState<string[]>([])
    const [newSuggestion, setNewSuggestion] = useState('')
    const [suggestionsSaving, setSuggestionsSaving] = useState(false)
    const [suggestionsMessage, setSuggestionsMessage] = useState('')

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        const storedAuth = localStorage.getItem('admin_token')
        if (storedAuth === 'sorenkier_valid') {
            setIsAuthenticated(true)
            loadData()
        } else {
            setLoading(false)
        }
    }, [])

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setAuthError('')

        const res = await loginAdmin(password)
        if (res.success) {
            localStorage.setItem('admin_token', 'sorenkier_valid')
            setIsAuthenticated(true)
            loadData()
        } else {
            setAuthError('Invalid Password')
        }
    }

    async function loadData() {
        setLoading(true)
        const [dateVal, discountVal, versionVal, hiddenVal, chatModelVal, chatKnowledgeVal, chatSuggestionsVal] = await Promise.all([
            getCountdownDate(),
            getDiscountPopupStatus(),
            getHomepageVersion(),
            getHiddenProducts(),
            getChatModel(),
            getChatKnowledge(),
            getChatSuggestions()
        ])

        if (dateVal) setDate(dateVal)
        else setDate('2026-01-19T21:00:00-08:00')

        setShowDiscount(discountVal === 'true')
        setHomepageVersion(versionVal as 'old' | 'special-offer')
        setHiddenProducts(hiddenVal)
        setChatModel(chatModelVal)
        setChatKnowledge(chatKnowledgeVal)
        setChatSuggestions(chatSuggestionsVal)

        // Fetch available models in background
        setModelsLoading(true)
        fetch('/api/chatbot-models')
            .then(r => r.json())
            .then(d => setAvailableModels(d.models || []))
            .catch(() => { })
            .finally(() => setModelsLoading(false))

        setLoading(false)
    }

    async function handleSaveCountdown(e: React.FormEvent) {
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

    async function handleToggleDiscount() {
        const newValue = !showDiscount
        setShowDiscount(newValue)

        const res = await updateDiscountPopupStatus(newValue)
        if (!res.success) {
            setShowDiscount(!newValue)
            alert('Failed to update discount status')
        }
    }

    async function handleVersionChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const newVersion = e.target.value as 'old' | 'special-offer'
        setHomepageVersion(newVersion)

        const res = await updateHomepageVersion(newVersion)
        if (!res.success) {
            alert('Failed to update homepage version')
            loadData()
        }
    }

    async function handleChatModelChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const newModel = e.target.value
        setChatModel(newModel)
        const res = await updateChatModel(newModel)
        if (!res.success) {
            alert('Failed to update chatbot model')
            loadData()
        }
    }

    async function handleSaveKnowledge() {
        setKnowledgeSaving(true)
        setKnowledgeMessage('')
        const res = await updateChatKnowledge(chatKnowledge)
        if (res.success) {
            setKnowledgeMessage('Knowledge base updated!')
        } else {
            setKnowledgeMessage('Failed to save knowledge base')
        }
        setKnowledgeSaving(false)
        setTimeout(() => setKnowledgeMessage(''), 3000)
    }

    async function handleAddSuggestion() {
        if (!newSuggestion.trim()) return
        const updated = [...chatSuggestions, newSuggestion.trim()]
        setChatSuggestions(updated)
        setNewSuggestion('')
        setSuggestionsSaving(true)
        const res = await updateChatSuggestions(updated)
        if (!res.success) {
            alert('Failed to save suggestion')
            setChatSuggestions(chatSuggestions)
        }
        setSuggestionsSaving(false)
    }

    async function handleRemoveSuggestion(index: number) {
        const updated = chatSuggestions.filter((_, i) => i !== index)
        setChatSuggestions(updated)
        setSuggestionsSaving(true)
        const res = await updateChatSuggestions(updated)
        if (!res.success) {
            alert('Failed to remove suggestion')
            setChatSuggestions(chatSuggestions)
        }
        setSuggestionsSaving(false)
    }

    if (!isAuthenticated && !loading) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white p-4">
                <div className="w-full max-w-md bg-neutral-900 p-8 rounded-xl border border-neutral-800 shadow-2xl">
                    <h1 className="text-2xl font-bold mb-6 text-center">Admin Access</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Password"
                                className="w-full bg-black border border-neutral-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                                autoFocus
                            />
                        </div>
                        {authError && <p className="text-red-500 text-sm text-center">{authError}</p>}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        )
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
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                        <p className="text-neutral-400">Manage global site settings and configurations.</p>
                    </div>
                    <button
                        onClick={() => {
                            localStorage.removeItem('admin_token')
                            window.location.reload()
                        }}
                        className="text-xs text-red-400 hover:text-red-300 underline"
                    >
                        Logout
                    </button>
                </div>

                {/* TAB NAVIGATION */}
                <div className="flex border-b border-neutral-800 mb-8">
                    {([
                        { key: 'chatbot' as AdminTab, label: '💬 Chatbot Settings' },
                        { key: 'marketing' as AdminTab, label: '📢 Marketing Features' },
                        { key: 'other' as AdminTab, label: '⚙️ Other' },
                    ]).map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === tab.key
                                    ? 'border-blue-500 text-blue-400'
                                    : 'border-transparent text-neutral-400 hover:text-white hover:bg-neutral-900'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* ─── TAB 1: CHATBOT SETTINGS ─── */}
                {activeTab === 'chatbot' && (
                    <div className="space-y-6">
                        {/* Chatbot Model */}
                        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-xl">
                            <h3 className="font-medium text-white mb-1">AI Model</h3>
                            <p className="text-sm text-neutral-500 mb-4">Choose which AI model powers the support chatbot.</p>
                            <select
                                value={chatModel}
                                onChange={handleChatModelChange}
                                disabled={modelsLoading}
                                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-white text-sm outline-none focus:border-blue-500 disabled:opacity-50"
                            >
                                {modelsLoading && <option>Loading models...</option>}
                                {!modelsLoading && availableModels.length === 0 && (
                                    <option value={chatModel}>{chatModel}</option>
                                )}
                                {['Google', 'Anthropic'].map(provider => {
                                    const group = availableModels.filter(m => m.provider === provider)
                                    if (group.length === 0) return null
                                    return (
                                        <optgroup key={provider} label={provider}>
                                            {group.map(m => (
                                                <option key={m.id} value={m.id}>{m.name}</option>
                                            ))}
                                        </optgroup>
                                    )
                                })}
                            </select>
                            <p className="text-xs text-neutral-600 mt-2 font-mono">{chatModel}</p>
                        </div>

                        {/* Knowledge Base */}
                        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-xl">
                            <h3 className="font-medium text-white mb-1">Knowledge Base</h3>
                            <p className="text-sm text-neutral-500 mb-3">Product info, pricing, shipping details — the chatbot will use this to answer questions accurately.</p>
                            <textarea
                                value={chatKnowledge}
                                onChange={(e) => setChatKnowledge(e.target.value)}
                                rows={10}
                                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white text-sm outline-none focus:border-blue-500 font-mono leading-relaxed resize-y"
                                placeholder={`Example:\n- DS5.5: 5.5-inch keys, designed for hand spans under 8.5 inches\n- DS6.0: 6.0-inch keys, suits most adult hand sizes\n- Pricing: Starts at $549 for the DreamPlay One\n- Shipping: Batch 1 ships August 2026`}
                            />
                            <div className="flex items-center justify-between mt-3">
                                <span className={`text-sm ${knowledgeMessage.includes('updated') ? 'text-green-400' : knowledgeMessage ? 'text-red-400' : 'text-transparent'}`}>
                                    {knowledgeMessage || '.'}
                                </span>
                                <button
                                    onClick={handleSaveKnowledge}
                                    disabled={knowledgeSaving}
                                    className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                                >
                                    {knowledgeSaving ? 'Saving...' : 'Save Knowledge'}
                                </button>
                            </div>
                        </div>

                        {/* Suggested Questions */}
                        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-xl">
                            <h3 className="font-medium text-white mb-1">Suggested Questions</h3>
                            <p className="text-sm text-neutral-500 mb-4">These appear on the chatbot&apos;s blank screen. Users can tap to send instantly.</p>
                            <div className="space-y-2 mb-4">
                                {chatSuggestions.map((q, i) => (
                                    <div key={i} className="flex items-center gap-2 p-2 bg-neutral-800 rounded-lg border border-neutral-700">
                                        <span className="flex-1 text-sm text-white">{q}</span>
                                        <button
                                            onClick={() => handleRemoveSuggestion(i)}
                                            className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded hover:bg-red-500/10 transition-colors"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                                {chatSuggestions.length === 0 && (
                                    <p className="text-xs text-neutral-600 italic">No suggested questions yet. Add some below.</p>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    value={newSuggestion}
                                    onChange={(e) => setNewSuggestion(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSuggestion(); } }}
                                    placeholder="e.g. When does the DreamPlay One ship?"
                                    className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-white text-sm outline-none focus:border-blue-500"
                                />
                                <button
                                    onClick={handleAddSuggestion}
                                    disabled={!newSuggestion.trim() || suggestionsSaving}
                                    className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ─── TAB 2: MARKETING FEATURES ─── */}
                {activeTab === 'marketing' && (
                    <div className="space-y-6">
                        {/* Newsletter Popup */}
                        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-white">Newsletter Popup</h3>
                                    <p className="text-sm text-neutral-500">Enable or disable the newsletter popup globally.</p>
                                </div>
                                <button
                                    onClick={handleToggleDiscount}
                                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${showDiscount ? 'bg-green-600' : 'bg-neutral-700'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${showDiscount ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Homepage Version */}
                        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-white">Homepage Version</h3>
                                    <p className="text-sm text-neutral-500">Switch between the old homepage and the special offer.</p>
                                </div>
                                <select
                                    value={homepageVersion}
                                    onChange={handleVersionChange}
                                    className="bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-white outline-none focus:border-blue-500"
                                >
                                    <option value="special-offer">Special Offer</option>
                                    <option value="old">Old Homepage</option>
                                </select>
                            </div>
                        </div>

                        {/* Product Visibility */}
                        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-xl">
                            <h3 className="font-medium text-white mb-1">Product Visibility</h3>
                            <p className="text-sm text-neutral-500 mb-4">Show or hide pricing tiers on the /customize page.</p>
                            <div className="space-y-3">
                                {[
                                    { id: 'reservation', label: 'Lock My Spot', price: '$99' },
                                    { id: 'reserve50', label: 'Reserve (50%)', price: '$274' },
                                    { id: 'solo', label: 'DreamPlay One', price: '$549' },
                                    { id: 'full', label: 'DreamPlay Bundle', price: '$599' },
                                    { id: 'signature', label: 'DreamPlay Signature', price: '$999' },
                                ].map(product => {
                                    const isVisible = !hiddenProducts.includes(product.id)
                                    return (
                                        <div key={product.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-black/40">
                                            <div className="flex items-center gap-3">
                                                <span className={`text-sm font-medium ${isVisible ? 'text-white' : 'text-neutral-500 line-through'}`}>{product.label}</span>
                                                <span className="text-xs text-neutral-600 font-mono">{product.price}</span>
                                            </div>
                                            <button
                                                onClick={async () => {
                                                    const next = isVisible
                                                        ? [...hiddenProducts, product.id]
                                                        : hiddenProducts.filter(id => id !== product.id)
                                                    setHiddenProducts(next)
                                                    const res = await updateHiddenProducts(next)
                                                    if (!res.success) {
                                                        setHiddenProducts(hiddenProducts)
                                                        alert('Failed to update product visibility')
                                                    }
                                                }}
                                                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${isVisible ? 'bg-green-600' : 'bg-neutral-700'}`}
                                            >
                                                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${isVisible ? 'translate-x-6' : 'translate-x-1'}`} />
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* ─── TAB 3: OTHER ─── */}
                {activeTab === 'other' && (
                    <div className="space-y-6">
                        {/* Content Management */}
                        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-xl">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <span>📚</span> Content Management
                            </h2>
                            <div className="space-y-4">
                                <Link href="/admin/faq" className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-neutral-800 hover:border-blue-500/50 transition-colors group">
                                    <div>
                                        <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">Manage FAQs</h3>
                                        <p className="text-sm text-neutral-500">Edit, add, or remove questions from the FAQ page.</p>
                                    </div>
                                    <span className="text-neutral-500 group-hover:text-blue-400 transition-colors">→</span>
                                </Link>

                                <Link href="/admin/customize-urls" className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-neutral-800 hover:border-blue-500/50 transition-colors group">
                                    <div>
                                        <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">Customize Page URLs</h3>
                                        <p className="text-sm text-neutral-500">Update destination links for pricing buttons.</p>
                                    </div>
                                    <span className="text-neutral-500 group-hover:text-blue-400 transition-colors">→</span>
                                </Link>
                            </div>
                        </div>

                        {/* Countdown Settings */}
                        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-xl">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <span>⏳</span> Countdown Settings
                            </h2>

                            <form onSubmit={handleSaveCountdown} className="space-y-6">
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
                )}
            </div>
        </div>
    )
}
