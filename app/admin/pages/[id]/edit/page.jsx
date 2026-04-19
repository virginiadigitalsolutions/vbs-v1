'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { showSuccess, showError, showConfirm } from '@/lib/swal'

export default function EditCMSPage({ params }) {
    const { id } = use(params)
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        metaDesc: '',
        isPublished: true,
    })
    const isHome = formData.slug === 'home'

    useEffect(() => {
        fetch(`/api/admin/pages/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to load page')
                return res.json()
            })
            .then(data => {
                setFormData({
                    title: data.title || '',
                    slug: data.slug || '',
                    metaDesc: data.metaDesc || '',
                    isPublished: data.isPublished,
                })
                setLoading(false)
            })
            .catch(err => {
                showError(err.message)
                setLoading(false)
            })
    }, [id])

    const handleTitleChange = (e) => {
        const title = e.target.value
        if (isHome) {
            setFormData(prev => ({ ...prev, title }))
        } else {
            setFormData(prev => ({
                ...prev,
                title,
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)

        try {
            const res = await fetch(`/api/admin/pages/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'Failed to update page')
            }

            showSuccess('Page updated successfully!')
            router.push('/admin/pages')
            router.refresh()
        } catch (err) {
            showError(err.message)
            setSaving(false)
        }
    }

    const handleDelete = async () => {
        if (isHome) return
        const confirmed = await showConfirm({
            title: 'Delete this page?',
            text: 'All sections will be permanently destroyed. This cannot be undone.',
            confirmText: 'Yes, delete it',
        })
        if (!confirmed) return

        try {
            const res = await fetch(`/api/admin/pages/${id}`, { method: 'DELETE' })
            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || 'Failed to delete')
            }
            showSuccess('Page deleted successfully!')
            router.push('/admin/pages')
            router.refresh()
        } catch (err) {
            showError(err.message)
        }
    }

    if (loading) return <div className="min-h-screen flex justify-center pt-20 font-bold text-gray-400">Loading page settings...</div>

    return (
        <div className="min-h-screen bg-[#fafafa]">
            {/* Top bar */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm shadow-gray-100/50">
                <div className="flex items-center gap-4">
                    <Link href="/admin/pages" className="text-gray-400 font-bold hover:text-cyan-600 text-sm transition-colors">← CMS Pages</Link>
                    <span className="text-gray-200">|</span>
                    <span className="font-extrabold text-gray-900 tracking-tight">Edit Metadata</span>
                </div>
                {!isHome && (
                    <button onClick={handleDelete} className="text-red-500 font-bold text-sm hover:text-red-700 transition-colors">
                        Delete Page
                    </button>
                )}
            </div>

            <div className="max-w-3xl mx-auto px-6 py-10 animate-fade-up">
                <form onSubmit={handleSubmit} className="space-y-8">


                    {/* Metadata Card */}
                    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-extrabold text-gray-900">Page Settings</h2>
                            {isHome && <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md border border-indigo-100">Core Protected Route</span>}
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Internal Title <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={handleTitleChange}
                                    placeholder="e.g. Enterprise Services"
                                    className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-500/20 shadow-sm focus:shadow-md transition-all font-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">URL Slug <span className="text-red-500">*</span></label>
                                <div className={`flex bg-gray-50 rounded-xl border-2 border-transparent transition-all shadow-sm ${isHome ? 'opacity-70 cursor-not-allowed' : 'focus-within:border-primary-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary-500/20 focus-within:shadow-md'}`}>
                                    <span className="flex items-center pl-4 text-gray-400 font-bold text-sm select-none">/</span>
                                    <input
                                        type="text"
                                        required
                                        disabled={isHome}
                                        value={formData.slug}
                                        onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                        className="w-full bg-transparent text-gray-900 px-2 py-3 outline-none font-medium text-sm disabled:cursor-not-allowed"
                                        placeholder="enterprise-services"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">SEO Meta Description</label>
                                <textarea
                                    rows={3}
                                    value={formData.metaDesc}
                                    onChange={e => setFormData({ ...formData, metaDesc: e.target.value })}
                                    className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-500/20 shadow-sm focus:shadow-md transition-all font-medium text-sm resize-y"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Bar */}
                    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={formData.isPublished}
                                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                                    disabled={isHome}
                                />
                                <div className={`block w-14 h-8 rounded-full transition-colors ${formData.isPublished ? 'bg-cyan-500' : 'bg-gray-200'} ${isHome ? 'opacity-50' : ''}`}></div>
                                <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${formData.isPublished ? 'translate-x-6' : ''}`}></div>
                            </div>
                            <div>
                                <span className="block text-sm font-bold text-gray-900">Publish Page</span>
                                <span className="block text-xs font-medium text-gray-500">{isHome ? 'Index route is always active' : 'Enable dynamic routing'}</span>
                            </div>
                        </label>

                        <div className="flex items-center gap-4">
                            <Link href="/admin/pages" className="text-gray-500 font-bold text-sm hover:text-gray-800 transition-colors">Cancel</Link>
                            <button
                                type="submit"
                                disabled={saving}
                                className="btn-primary bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 py-3 px-8 shadow-sm disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Save Metadata'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
