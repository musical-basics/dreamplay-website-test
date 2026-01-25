'use client'

import { useState, useEffect } from 'react'
import { getFaqItems, updateFaqItems, FAQItem } from '@/actions/faq-actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminFAQPage() {
    const router = useRouter()
    const [items, setItems] = useState<FAQItem[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState('')

    // Auth check
    useEffect(() => {
        const storedAuth = localStorage.getItem('admin_token')
        if (storedAuth !== 'sorenkier_valid') {
            router.push('/admin')
        } else {
            loadData()
        }
    }, [])

    async function loadData() {
        setLoading(true)
        const data = await getFaqItems()
        setItems(data)
        setLoading(false)
    }

    async function handleSave() {
        setSaving(true)
        setMessage('')
        const res = await updateFaqItems(items)
        if (res.success) {
            setMessage('FAQs updated successfully!')
        } else {
            setMessage(`Failed to save: ${res.error}`)
        }
        setSaving(false)
    }

    const handleChange = (index: number, field: keyof FAQItem, value: string) => {
        const newItems = [...items]
        newItems[index] = { ...newItems[index], [field]: value }
        setItems(newItems)
    }

    const handleDelete = (index: number) => {
        if (confirm('Are you sure you want to delete this item?')) {
            const newItems = items.filter((_, i) => i !== index)
            setItems(newItems)
        }
    }

    const handleAdd = () => {
        const newItem: FAQItem = {
            id: Date.now().toString(),
            question: '',
            answer: ''
        }
        setItems([...items, newItem])
    }

    const moveItem = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return
        if (direction === 'down' && index === items.length - 1) return

        const newItems = [...items]
        const targetIndex = direction === 'up' ? index - 1 : index + 1
        const temp = newItems[targetIndex]
        newItems[targetIndex] = newItems[index]
        newItems[index] = temp
        setItems(newItems)
    }

    if (loading) {
        return <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">Loading...</div>
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-white p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <Link href="/admin" className="text-neutral-400 hover:text-white mb-2 inline-block">← Back to Dashboard</Link>
                        <h1 className="text-3xl font-bold">Manage FAQs</h1>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

                {message && (
                    <div className={`p-4 mb-6 rounded-lg text-center font-medium ${message.includes('success') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                        {message}
                    </div>
                )}

                <div className="space-y-6">
                    {items.map((item, index) => (
                        <div key={item.id} className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-xl">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="bg-neutral-800 text-neutral-400 px-2 py-1 rounded text-xs font-mono">#{index + 1}</span>
                                    <div className="flex gap-1">
                                        <button onClick={() => moveItem(index, 'up')} disabled={index === 0} className="p-1 hover:bg-neutral-800 rounded disabled:opacity-30">⬆️</button>
                                        <button onClick={() => moveItem(index, 'down')} disabled={index === items.length - 1} className="p-1 hover:bg-neutral-800 rounded disabled:opacity-30">⬇️</button>
                                    </div>
                                </div>
                                <button onClick={() => handleDelete(index)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-1">Question</label>
                                    <input
                                        type="text"
                                        value={item.question}
                                        onChange={(e) => handleChange(index, 'question', e.target.value)}
                                        className="w-full bg-black border border-neutral-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                                        placeholder="Enter question"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-1">Answer (HTML supported)</label>
                                    <textarea
                                        value={item.answer}
                                        onChange={(e) => handleChange(index, 'answer', e.target.value)}
                                        className="w-full bg-black border border-neutral-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none font-mono text-sm min-h-[150px]"
                                        placeholder="<p>Enter answer...</p>"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 mb-20">
                    <button
                        onClick={handleAdd}
                        className="w-full bg-neutral-800 hover:bg-neutral-700 border-2 border-dashed border-neutral-700 hover:border-neutral-600 text-neutral-400 font-semibold py-4 rounded-xl transition-colors"
                    >
                        + Add New FAQ Item
                    </button>
                </div>
            </div>
        </div>
    )
}
