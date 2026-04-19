'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { HiOutlineUserAdd, HiOutlineUsers, HiOutlinePencil, HiOutlineX, HiOutlineGlobe, HiOutlinePhotograph } from 'react-icons/hi'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { showSuccess, showError } from '@/lib/swal'

export default function BlogAuthorsManager() {
    const [authors, setAuthors] = useState([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'EDITOR', avatar: '', bio: '', designation: '', socialLinks: { linkedin: '', twitter: '', github: '', website: '' } })
    const [editData, setEditData] = useState({})

    const loadAuthors = async () => {
        try {
            const res = await fetch('/api/admin/learning-hub/authors')
            if (!res.ok) throw new Error('Failed to fetch')
            const data = await res.json()
            setAuthors(data)
        } catch {
            showError('Could not load authors.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { loadAuthors() }, [])

    const handleCreate = async (e) => {
        e.preventDefault()
        if (!formData.name || !formData.email || !formData.password) return

        setSaving(true)
        try {
            const res = await fetch('/api/admin/learning-hub/authors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error)

            showSuccess('Author Registered!')
            setFormData({ name: '', email: '', password: '', role: 'EDITOR', avatar: '', bio: '', designation: '', socialLinks: { linkedin: '', twitter: '', github: '', website: '' } })
            await loadAuthors()
        } catch (err) {
            showError(err.message)
        } finally {
            setSaving(false)
        }
    }

    const startEditing = (author) => {
        setEditingId(author.id)
        setEditData({
            name: author.name || '',
            avatar: author.avatar || '',
            bio: author.bio || '',
            designation: author.designation || '',
            socialLinks: {
                linkedin: author.socialLinks?.linkedin || '',
                twitter: author.socialLinks?.twitter || '',
                github: author.socialLinks?.github || '',
                website: author.socialLinks?.website || ''
            }
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            const res = await fetch('/api/admin/learning-hub/authors', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: editingId, ...editData })
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)
            showSuccess('Author updated!')
            setEditingId(null)
            await loadAuthors()
        } catch (err) {
            showError(err.message)
        } finally {
            setSaving(false)
        }
    }

    const inputClass = 'w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/20 shadow-sm transition-all text-sm font-medium'

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center shrink-0">
                            <HiOutlineUsers className="text-xl" />
                        </div>
                        Blog Authors
                    </h1>
                    <p className="text-gray-500 font-medium mt-2">Manage registered authors and their public profiles.</p>
                </div>

                <Link href="/admin/learning-hub" className="text-violet-600 font-bold hover:text-violet-700 transition-colors bg-violet-50 px-4 py-2 rounded-xl text-sm">
                    Back to Blog
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Create Form */}
                <div className="lg:col-span-1">
                    <form onSubmit={handleCreate} className="bg-white border text-gray-900 border-gray-100 rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] sticky top-24">
                        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <HiOutlineUserAdd className="text-violet-500" />
                            Register New Author
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Temp Password</label>
                                <input type="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Role</label>
                                <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className={`${inputClass} font-bold`}>
                                    <option value="EDITOR">Editor</option>
                                    <option value="SUPER_ADMIN">Super Admin</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Designation</label>
                                <input type="text" value={formData.designation} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} className={inputClass} placeholder="Senior Engineer" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Avatar URL</label>
                                <input type="text" value={formData.avatar} onChange={(e) => setFormData({ ...formData, avatar: e.target.value })} className={inputClass} placeholder="https://..." />
                            </div>

                            <button type="submit" disabled={saving} className="w-full mt-4 bg-gray-900 text-white font-bold py-3 rounded-xl shadow-sm hover:bg-black hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                                {saving ? 'Saving...' : 'Register Author'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Author Cards */}
                <div className="lg:col-span-2 space-y-4">
                    {loading ? (
                        <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center text-gray-400 font-bold shadow-sm">Loading...</div>
                    ) : authors.length === 0 ? (
                        <div className="bg-white border border-gray-100 rounded-3xl p-16 text-center shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No authors found</h3>
                        </div>
                    ) : authors.map((author) => (
                        <div key={author.id} className="bg-white border border-gray-100 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] hover:border-primary-200 transition-all">
                            <div className="p-6 flex items-start gap-5">
                                {/* Avatar */}
                                <div className="w-16 h-16 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-xl shrink-0 overflow-hidden border-2 border-violet-200">
                                    {author.avatar ? (
                                        <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
                                    ) : (
                                        author.name.charAt(0)
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-extrabold text-gray-900 text-lg truncate">{author.name}</h3>
                                        <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${author.role === 'SUPER_ADMIN' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-blue-50 text-blue-600 border border-blue-200'}`}>
                                            {author.role}
                                        </span>
                                    </div>
                                    {author.designation && <p className="text-sm font-semibold text-violet-600 mb-1">{author.designation}</p>}
                                    <p className="text-sm text-gray-500 truncate">{author.email}</p>
                                    <div className="flex items-center gap-4 mt-3">
                                        <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">{author._count?.posts || 0} Posts</span>
                                        {author.socialLinks?.linkedin && <a href={author.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#0A66C2] transition-colors"><FaLinkedin /></a>}
                                        {author.socialLinks?.twitter && <a href={author.socialLinks.twitter} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors"><FaXTwitter /></a>}
                                        {author.socialLinks?.github && <a href={author.socialLinks.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors"><FaGithub /></a>}
                                        {author.socialLinks?.website && <a href={author.socialLinks.website} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary-600 transition-colors"><HiOutlineGlobe /></a>}
                                    </div>
                                </div>

                                {/* Edit Button */}
                                <button onClick={() => editingId === author.id ? setEditingId(null) : startEditing(author)} className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all shadow-sm shrink-0 ${editingId === author.id ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-gray-200 text-gray-400 hover:text-violet-600 hover:border-violet-200 hover:bg-violet-50'}`}>
                                    {editingId === author.id ? <HiOutlineX className="w-4 h-4" /> : <HiOutlinePencil className="w-4 h-4" />}
                                </button>
                            </div>

                            {/* Edit Form (expandable) */}
                            {editingId === author.id && (
                                <form onSubmit={handleUpdate} className="border-t border-gray-100 p-6 bg-gray-50/50 space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1.5">Name</label>
                                            <input type="text" value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} className={inputClass} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1.5">Designation</label>
                                            <input type="text" value={editData.designation} onChange={e => setEditData({ ...editData, designation: e.target.value })} className={inputClass} placeholder="Senior Engineer" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5">Avatar URL</label>
                                        <div className="flex gap-3">
                                            <input type="text" value={editData.avatar} onChange={e => setEditData({ ...editData, avatar: e.target.value })} className={`${inputClass} font-mono`} placeholder="https://..." />
                                            <button type="button" onClick={() => window.open('/admin/media', '_blank')} className="px-4 py-2 bg-violet-50 text-violet-700 font-bold text-xs rounded-xl border border-violet-200 hover:bg-violet-100 transition-colors whitespace-nowrap shrink-0">
                                                <HiOutlinePhotograph className="inline mr-1" /> Browse
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5">Bio</label>
                                        <textarea value={editData.bio} onChange={e => setEditData({ ...editData, bio: e.target.value })} rows={3} className={`${inputClass} resize-y`} placeholder="Tell readers about yourself..." />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1.5">LinkedIn URL</label>
                                            <input type="text" value={editData.socialLinks?.linkedin || ''} onChange={e => setEditData({ ...editData, socialLinks: { ...editData.socialLinks, linkedin: e.target.value } })} className={inputClass} placeholder="https://linkedin.com/in/..." />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1.5">Twitter/X URL</label>
                                            <input type="text" value={editData.socialLinks?.twitter || ''} onChange={e => setEditData({ ...editData, socialLinks: { ...editData.socialLinks, twitter: e.target.value } })} className={inputClass} placeholder="https://x.com/..." />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1.5">GitHub URL</label>
                                            <input type="text" value={editData.socialLinks?.github || ''} onChange={e => setEditData({ ...editData, socialLinks: { ...editData.socialLinks, github: e.target.value } })} className={inputClass} placeholder="https://github.com/..." />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1.5">Website URL</label>
                                            <input type="text" value={editData.socialLinks?.website || ''} onChange={e => setEditData({ ...editData, socialLinks: { ...editData.socialLinks, website: e.target.value } })} className={inputClass} placeholder="https://..." />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                        <button type="button" onClick={() => setEditingId(null)} className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 font-bold text-sm rounded-xl hover:bg-gray-50 transition-all shadow-sm">Cancel</button>
                                        <button type="submit" disabled={saving} className="px-6 py-2.5 bg-gray-900 text-white font-bold text-sm rounded-xl hover:bg-black transition-all shadow-sm disabled:opacity-50">{saving ? 'Saving...' : 'Save Changes'}</button>
                                    </div>
                                </form>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
