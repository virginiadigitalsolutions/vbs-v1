'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { showSuccess, showError } from '@/lib/swal'

export default function NewCMSPage() {
    const router = useRouter()
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        metaDesc: '',
        isPublished: true,
    })

    const handleTitleChange = (e) => {
        const title = e.target.value
        setFormData(prev => ({
            ...prev,
            title,
            slug: prev.slug === '' || prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
                ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
                : prev.slug
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)

        try {
            const res = await fetch('/api/admin/pages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'Failed to create page')
            }

            showSuccess('Page created successfully!')
            router.push(`/admin/sections?pageId=${data.id}`)
            router.refresh()
        } catch (err) {
            showError(err.message)
            setSaving(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#fafafa]">
            {/* Top bar */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm shadow-gray-100/50">
                <div className="flex items-center gap-4">
                    <Link href="/admin/pages" className="text-gray-400 font-bold hover:text-cyan-600 text-sm transition-colors">← CMS Pages</Link>
                    <span className="text-gray-200">|</span>
                    <span className="font-extrabold text-gray-900 tracking-tight">Create New Page</span>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-10 animate-fade-up">
                <form onSubmit={handleSubmit} className="space-y-8">


                    {/* Metadata Card */}
                    <div className="bg-white border text-gray-900 border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                        <h2 className="text-xl font-extrabold text-gray-900 mb-6">Page Settings</h2>

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
                                <div className="flex bg-gray-50 rounded-xl border-2 border-transparent focus-within:border-primary-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary-500/20 shadow-sm focus-within:shadow-md transition-all">
                                    <span className="flex items-center pl-4 text-gray-400 font-bold text-sm select-none">/</span>
                                    <input
                                        type="text"
                                        required
                                        value={formData.slug}
                                        onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                        className="w-full bg-transparent text-gray-900 px-2 py-3 outline-none font-medium text-sm"
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
                    <div className="bg-white border text-gray-900 border-gray-100 rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={formData.isPublished}
                                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                                />
                                <div className={`block w-14 h-8 rounded-full transition-colors ${formData.isPublished ? 'bg-cyan-500' : 'bg-gray-200'}`}></div>
                                <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${formData.isPublished ? 'translate-x-6' : ''}`}></div>
                            </div>
                            <div>
                                <span className="block text-sm font-bold text-gray-900">Publish Page</span>
                                <span className="block text-xs font-medium text-gray-500">Enable dynamic routing</span>
                            </div>
                        </label>

                        <div className="flex items-center gap-4">
                            <Link href="/admin/pages" className="text-gray-500 font-bold text-sm hover:text-gray-800 transition-colors">Cancel</Link>
                            <button
                                type="submit"
                                disabled={saving}
                                className="btn-primary bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 py-3 px-8 shadow-sm disabled:opacity-50"
                            >
                                {saving ? 'Creating...' : 'Create & Add Layout'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
