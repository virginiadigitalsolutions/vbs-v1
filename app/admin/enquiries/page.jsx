'use client'

import { useState, useEffect, useCallback } from 'react'
import { HiOutlineMail, HiOutlinePhone, HiOutlineCalendar, HiOutlineSearch, HiOutlineTrash, HiOutlineEye, HiOutlineX, HiOutlineChat, HiOutlineRefresh } from 'react-icons/hi'

const STATUS_OPTIONS = ['ALL', 'NEW', 'READ', 'REPLIED', 'ARCHIVED']
const STATUS_COLORS = {
    NEW: 'bg-blue-50 text-blue-700 border-blue-200',
    READ: 'bg-amber-50 text-amber-700 border-amber-200',
    REPLIED: 'bg-green-50 text-green-700 border-green-200',
    ARCHIVED: 'bg-gray-100 text-gray-500 border-gray-200',
}

export default function AdminEnquiriesPage() {
    const [enquiries, setEnquiries] = useState([])
    const [loading, setLoading] = useState(true)
    const [filterStatus, setFilterStatus] = useState('ALL')
    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState(null)
    const [notes, setNotes] = useState('')
    const [updating, setUpdating] = useState(false)

    const fetchEnquiries = useCallback(async () => {
        setLoading(true)
        const params = new URLSearchParams()
        if (filterStatus !== 'ALL') params.set('status', filterStatus)
        if (search) params.set('search', search)

        try {
            const res = await fetch(`/api/admin/enquiries?${params}`)
            const data = await res.json()
            setEnquiries(data.enquiries || [])
        } catch {
            setEnquiries([])
        } finally {
            setLoading(false)
        }
    }, [filterStatus, search])

    useEffect(() => {
        const timer = setTimeout(() => fetchEnquiries(), 300)
        return () => clearTimeout(timer)
    }, [fetchEnquiries])

    const updateStatus = async (id, newStatus) => {
        setUpdating(true)
        try {
            await fetch('/api/admin/enquiries', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus }),
            })
            setEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, status: newStatus } : e))
            if (selected?.id === id) setSelected((prev) => ({ ...prev, status: newStatus }))
        } finally {
            setUpdating(false)
        }
    }

    const saveNotes = async (id) => {
        setUpdating(true)
        try {
            await fetch('/api/admin/enquiries', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, notes }),
            })
            setEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, notes } : e))
            if (selected?.id === id) setSelected((prev) => ({ ...prev, notes }))
        } finally {
            setUpdating(false)
        }
    }

    const deleteEnquiry = async (id) => {
        if (!confirm('Are you sure you want to delete this enquiry?')) return
        try {
            await fetch(`/api/admin/enquiries?id=${id}`, { method: 'DELETE' })
            setEnquiries((prev) => prev.filter((e) => e.id !== id))
            if (selected?.id === id) setSelected(null)
        } catch {
            alert('Failed to delete')
        }
    }

    const openDetail = (enquiry) => {
        setSelected(enquiry)
        setNotes(enquiry.notes || '')
        // Auto-mark as READ if NEW
        if (enquiry.status === 'NEW') {
            updateStatus(enquiry.id, 'READ')
        }
    }

    const newCount = enquiries.filter((e) => e.status === 'NEW').length

    return (
        <div className="w-full">
            <div className="max-w-6xl mx-auto px-6 py-10 animate-fade-up">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                            <HiOutlineMail className="text-primary-500" />
                            Enquiries
                            {newCount > 0 && (
                                <span className="bg-blue-500 text-white text-xs font-black px-2.5 py-1 rounded-full animate-pulse">{newCount} new</span>
                            )}
                        </h1>
                        <p className="text-gray-500 font-medium text-sm mt-2">
                            All contact form submissions. Click to view full details, update status, and add notes.
                        </p>
                    </div>
                    <button onClick={fetchEnquiries} className="btn-ghost text-sm py-2.5 px-4 flex items-center gap-2">
                        <HiOutlineRefresh className={loading ? 'animate-spin' : ''} /> Refresh
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    {/* Search */}
                    <div className="relative flex-1">
                        <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name, email, subject..."
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
                        />
                    </div>
                    {/* Status Tabs */}
                    <div className="flex gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100">
                        {STATUS_OPTIONS.map((s) => (
                            <button
                                key={s}
                                onClick={() => setFilterStatus(s)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filterStatus === s
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white border border-gray-100 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
                    {loading ? (
                        <div className="p-20 text-center">
                            <div className="inline-block w-8 h-8 border-3 border-primary-500 border-t-transparent rounded-full animate-spin" />
                            <p className="mt-4 text-gray-400 font-medium text-sm">Loading enquiries...</p>
                        </div>
                    ) : enquiries.length === 0 ? (
                        <div className="p-20 text-center">
                            <p className="text-4xl mb-3">📭</p>
                            <p className="text-gray-500 font-bold">No enquiries found</p>
                            <p className="text-gray-400 text-sm mt-1">
                                {search ? 'Try a different search term.' : 'No submissions yet.'}
                            </p>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Sender</th>
                                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Subject</th>
                                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {enquiries.map((e) => (
                                    <tr key={e.id} className={`hover:bg-gray-50/50 transition-colors cursor-pointer ${e.status === 'NEW' ? 'bg-blue-50/30' : ''}`} onClick={() => openDetail(e)}>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${e.status === 'NEW' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                                                    {e.name?.[0]?.toUpperCase() || '?'}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className={`font-bold text-sm truncate ${e.status === 'NEW' ? 'text-gray-900' : 'text-gray-700'}`}>{e.name}</p>
                                                    <p className="text-xs text-gray-500 font-medium truncate">{e.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="text-sm text-gray-700 font-medium truncate max-w-[200px]">{e.subject || '—'}</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${STATUS_COLORS[e.status] || STATUS_COLORS.NEW}`}>
                                                {e.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-500 font-medium whitespace-nowrap">
                                            {new Date(e.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2" onClick={(ev) => ev.stopPropagation()}>
                                                <button onClick={() => openDetail(e)} className="text-primary-600 hover:text-primary-800 font-bold text-sm transition-colors flex items-center gap-1">
                                                    <HiOutlineEye className="text-base" /> View
                                                </button>
                                                <button onClick={() => deleteEnquiry(e.id)} className="text-red-500 hover:text-red-700 font-bold text-sm transition-colors ml-2">
                                                    <HiOutlineTrash className="text-base" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <p className="text-xs text-gray-400 font-medium mt-4 text-right">
                    Showing {enquiries.length} enquir{enquiries.length === 1 ? 'y' : 'ies'}
                </p>
            </div>

            {/* Detail Slide-over */}
            {selected && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setSelected(null)} />
                    <div className="relative w-full max-w-lg bg-white h-full shadow-2xl overflow-y-auto animate-fade-up">
                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between z-10">
                            <h2 className="text-lg font-extrabold text-gray-900 tracking-tight">Enquiry Details</h2>
                            <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
                                <HiOutlineX className="text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Sender Info */}
                            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary-100 to-primary-50 flex items-center justify-center text-primary-700 text-xl font-black">
                                        {selected.name?.[0]?.toUpperCase() || '?'}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-extrabold text-gray-900">{selected.name}</h3>
                                        <p className="text-sm text-gray-500 font-medium">{selected.email}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <HiOutlinePhone className="text-gray-400" />
                                        <span className="font-medium">{selected.phone || 'Not provided'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <HiOutlineCalendar className="text-gray-400" />
                                        <span className="font-medium">
                                            {new Date(selected.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Subject */}
                            {selected.subject && (
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Subject</label>
                                    <p className="text-gray-900 font-bold text-base">{selected.subject}</p>
                                </div>
                            )}

                            {/* Message */}
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Message</label>
                                <div className="bg-white border border-gray-200 rounded-xl p-4 text-gray-700 font-medium text-sm leading-relaxed whitespace-pre-wrap">
                                    {selected.message}
                                </div>
                            </div>

                            {/* Status Update */}
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Status</label>
                                <div className="flex gap-2 flex-wrap">
                                    {['NEW', 'READ', 'REPLIED', 'ARCHIVED'].map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => updateStatus(selected.id, s)}
                                            disabled={updating}
                                            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${selected.status === s
                                                ? STATUS_COLORS[s] + ' ring-2 ring-offset-1 ring-current shadow-sm'
                                                : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Admin Notes */}
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                                    <HiOutlineChat className="text-sm" /> Internal Notes
                                </label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Add internal notes about this enquiry..."
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all resize-none"
                                />
                                <button
                                    onClick={() => saveNotes(selected.id)}
                                    disabled={updating || notes === (selected.notes || '')}
                                    className="btn-primary text-xs py-2.5 px-5 mt-3 disabled:opacity-50"
                                >
                                    {updating ? 'Saving...' : 'Save Notes'}
                                </button>
                            </div>

                            {/* Quick Actions */}
                            <div className="pt-4 border-t border-gray-100 flex gap-3">
                                <a
                                    href={`mailto:${selected.email}?subject=Re: ${selected.subject || 'Your enquiry'}`}
                                    onClick={() => updateStatus(selected.id, 'REPLIED')}
                                    className="btn-primary text-sm py-3 px-5 flex-1 text-center flex items-center justify-center gap-2"
                                >
                                    <HiOutlineMail /> Reply via Email
                                </a>
                                <button
                                    onClick={() => deleteEnquiry(selected.id)}
                                    className="px-4 py-3 rounded-xl border border-red-200 text-red-500 font-bold text-sm hover:bg-red-50 transition-colors"
                                >
                                    <HiOutlineTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
