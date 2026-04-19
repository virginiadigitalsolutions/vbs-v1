'use client'

import { useState, useEffect } from 'react'
import { HiOutlineLink, HiOutlinePlus, HiOutlineExternalLink, HiOutlinePencil, HiOutlineTrash, HiOutlineStar, HiOutlineEye } from 'react-icons/hi'
import { showSuccess, showError, showConfirm } from '@/lib/swal'

const PLATFORMS = ['Coursera', 'Udemy', 'AWS', 'Google', 'LinkedIn Learning', 'Skillshare', 'edX', 'Custom', 'Other']
const CATEGORIES = ['Course', 'Tool', 'Certification', 'Book', 'Software', 'Hosting', 'Other']

const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 text-sm font-medium text-gray-900 transition-all"
const selectClass = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 text-sm font-medium text-gray-900 transition-all appearance-none cursor-pointer"

export default function AdminAffiliatesPage() {
    const [links, setLinks] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState(null)
    const [saving, setSaving] = useState(false)
    const [form, setForm] = useState({
        title: '', url: '', platform: 'Other', category: 'Course',
        description: '', commission: '', isActive: true, isFeatured: false,
    })

    const fetchLinks = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/admin/affiliates')
            const data = await res.json()
            if (Array.isArray(data)) setLinks(data)
        } catch {
            showError('Failed to load affiliate links.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchLinks() }, [])

    const resetForm = () => {
        setForm({ title: '', url: '', platform: 'Other', category: 'Course', description: '', commission: '', isActive: true, isFeatured: false })
        setEditing(null)
        setShowForm(false)
    }

    const startEdit = (link) => {
        setForm({
            title: link.title, url: link.url, platform: link.platform,
            category: link.category, description: link.description || '',
            commission: link.commission || '', isActive: link.isActive, isFeatured: link.isFeatured,
        })
        setEditing(link.id)
        setShowForm(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)

        try {
            const url = editing ? `/api/admin/affiliates/${editing}` : '/api/admin/affiliates'
            const method = editing ? 'PATCH' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || 'Failed to save')
            }

            showSuccess(editing ? 'Link updated!' : 'Link created!')
            resetForm()
            fetchLinks()
        } catch (err) {
            showError(err.message)
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id) => {
        const confirmed = await showConfirm({
            title: 'Delete this link?',
            text: 'This affiliate link will be permanently removed.',
            confirmText: 'Delete',
        })
        if (!confirmed) return

        try {
            await fetch(`/api/admin/affiliates/${id}`, { method: 'DELETE' })
            showSuccess('Link deleted!')
            fetchLinks()
        } catch {
            showError('Failed to delete.')
        }
    }

    const toggleActive = async (link) => {
        try {
            await fetch(`/api/admin/affiliates/${link.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isActive: !link.isActive })
            })
            fetchLinks()
        } catch {
            showError('Failed to toggle.')
        }
    }

    const toggleFeatured = async (link) => {
        try {
            await fetch(`/api/admin/affiliates/${link.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isFeatured: !link.isFeatured })
            })
            fetchLinks()
        } catch {
            showError('Failed to toggle.')
        }
    }

    const totalClicks = links.reduce((sum, l) => sum + (l.clicks || 0), 0)
    const activeCount = links.filter(l => l.isActive).length
    const featuredCount = links.filter(l => l.isFeatured).length

    return (
        <div className="w-full">
            <div className="max-w-6xl mx-auto px-6 py-10 animate-fade-up">
                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between bg-white border border-gray-100 rounded-3xl p-8 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary-50/40 rounded-bl-full -z-10" />
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-linear-to-b from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
                                <HiOutlineLink className="text-white text-lg" />
                            </div>
                            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Affiliate Links</h1>
                        </div>
                        <p className="text-gray-500 font-medium text-sm mt-1 max-w-xl leading-relaxed">
                            Manage your partnership and referral links. Track clicks, commissions, and performance.
                        </p>
                    </div>
                    <button
                        onClick={() => { resetForm(); setShowForm(!showForm) }}
                        className="mt-4 md:mt-0 btn-primary py-3 px-6 flex items-center gap-2 shadow-sm"
                    >
                        <HiOutlinePlus className="text-lg" />
                        {showForm ? 'Cancel' : 'Add New Link'}
                    </button>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                        { label: 'Total Links', value: links.length, color: 'primary' },
                        { label: 'Active', value: activeCount, color: 'emerald' },
                        { label: 'Total Clicks', value: totalClicks, color: 'primary' },
                    ].map(stat => (
                        <div key={stat.label} className={`bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm`}>
                            <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                            <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Create/Edit Form */}
                {showForm && (
                    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm mb-8 animate-fade-up">
                        <h2 className="text-lg font-extrabold text-gray-900 mb-6">{editing ? 'Edit Link' : 'New Affiliate Link'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5">Link Title *</label>
                                    <input type="text" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputClass} placeholder="e.g. AWS Cloud Practitioner Course" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5">Affiliate URL *</label>
                                    <input type="url" required value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} className={inputClass} placeholder="https://partner.example.com/ref/abc123" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5">Platform</label>
                                    <select value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })} className={selectClass}>
                                        {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5">Category</label>
                                    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={selectClass}>
                                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5">Commission</label>
                                    <input type="text" value={form.commission} onChange={e => setForm({ ...form, commission: e.target.value })} className={inputClass} placeholder="e.g. 15% or $50/sale" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5">Description</label>
                                <textarea rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className={`${inputClass} resize-y`} placeholder="Brief note about this partnership..." />
                            </div>

                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 rounded accent-primary-600" />
                                    <span className="text-sm font-semibold text-gray-700">Active</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={form.isFeatured} onChange={e => setForm({ ...form, isFeatured: e.target.checked })} className="w-4 h-4 rounded accent-amber-500" />
                                    <span className="text-sm font-semibold text-gray-700">Featured</span>
                                </label>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={resetForm} className="text-sm font-bold text-gray-500 hover:text-gray-700 px-5 py-3 transition-colors">Cancel</button>
                                <button type="submit" disabled={saving} className="btn-primary py-3 px-8 disabled:opacity-50">
                                    {saving ? 'Saving...' : editing ? 'Update Link' : 'Create Link'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Links Table */}
                {loading ? (
                    <div className="py-20 text-center text-gray-400 font-bold animate-pulse">Loading affiliate links...</div>
                ) : links.length === 0 ? (
                    <div className="bg-white border border-dashed border-gray-200 rounded-3xl p-16 text-center">
                        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-2xl mb-4 mx-auto">🔗</div>
                        <p className="text-gray-900 font-bold text-lg">No affiliate links yet</p>
                        <p className="text-gray-500 text-sm mt-1">Start building your affiliate network by adding your first link.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {links.map(link => (
                            <div key={link.id} className={`bg-white border rounded-2xl p-5 shadow-sm flex items-start gap-4 group transition-all hover:shadow-md ${link.isActive ? 'border-gray-100 hover:border-primary-200' : 'border-gray-100 opacity-60'
                                }`}>
                                {/* Platform Badge */}
                                <div className="w-11 h-11 rounded-xl bg-linear-to-b from-primary-50 to-primary-50 flex items-center justify-center shrink-0 border border-primary-100">
                                    <HiOutlineLink className="text-primary-500 text-lg" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <h3 className="font-bold text-gray-900 text-sm truncate">{link.title}</h3>
                                        {link.isFeatured && (
                                            <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                                <HiOutlineStar className="text-xs" /> Featured
                                            </span>
                                        )}
                                        <span className="text-[10px] font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">{link.platform}</span>
                                        <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{link.category}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 font-mono truncate mb-1">{link.url}</p>
                                    {link.description && <p className="text-xs text-gray-500 font-medium">{link.description}</p>}
                                    <div className="flex items-center gap-4 mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                        {link.commission && <span>💰 {link.commission}</span>}
                                        <span className="flex items-center gap-1"><HiOutlineEye className="text-xs" /> {link.clicks} clicks</span>
                                        <span>{new Date(link.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => toggleFeatured(link)} title="Toggle Featured" className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${link.isFeatured ? 'text-amber-500 bg-amber-50' : 'text-gray-400 hover:text-amber-500 hover:bg-amber-50'}`}>
                                        <HiOutlineStar className="text-sm" />
                                    </button>
                                    <button onClick={() => toggleActive(link)} title="Toggle Active" className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${link.isActive ? 'text-emerald-500 bg-emerald-50' : 'text-gray-400 hover:text-emerald-500 hover:bg-emerald-50'}`}>
                                        <HiOutlineEye className="text-sm" />
                                    </button>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" title="Open Link" className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary-500 hover:bg-primary-50 transition-colors">
                                        <HiOutlineExternalLink className="text-sm" />
                                    </a>
                                    <button onClick={() => startEdit(link)} title="Edit" className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary-500 hover:bg-primary-50 transition-colors">
                                        <HiOutlinePencil className="text-sm" />
                                    </button>
                                    <button onClick={() => handleDelete(link.id)} title="Delete" className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                                        <HiOutlineTrash className="text-sm" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
