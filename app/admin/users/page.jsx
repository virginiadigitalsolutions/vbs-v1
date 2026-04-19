'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { HiOutlineUserAdd, HiOutlineUsers } from 'react-icons/hi'
import { showSuccess, showError, showConfirm } from '@/lib/swal'
import Link from 'next/link'

export default function AdminUsersPage() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'EDITOR', isActive: true })
    const [editingUser, setEditingUser] = useState(null)
    const [showInviteForm, setShowInviteForm] = useState(false)
    const router = useRouter()

    const loadUsers = useCallback(async () => {
        try {
            const res = await fetch('/api/admin/users')
            if (res.status === 401) {
                router.push('/admin') // Redirect normal editors
                return
            }
            if (!res.ok) throw new Error('Failed to fetch')
            const data = await res.json()
            setUsers(data)
        } catch (err) {
            showError('Could not load users.')
        } finally {
            setLoading(false)
        }
    }, [router])

    useEffect(() => {
        loadUsers()
    }, [loadUsers]) 

    const handleCreate = async (e) => {
        e.preventDefault()
        if (!formData.name || !formData.email || (!editingUser && !formData.password)) return

        setSaving(true)
        try {
            const url = editingUser ? `/api/admin/users/${editingUser.id}` : '/api/admin/users'
            const method = editingUser ? 'PATCH' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error)

            showSuccess(editingUser ? 'Member Updated!' : 'Member Invited!')
            setFormData({ name: '', email: '', password: '', role: 'EDITOR', isActive: true })
            setEditingUser(null)
            setShowInviteForm(false)
            await loadUsers()
        } catch (err) {
            showError(err.message)
        } finally {
            setSaving(false)
        }
    }

    const handleEdit = (user) => {
        setEditingUser(user)
        setFormData({ name: user.name, email: user.email, password: '', role: user.role, isActive: user.isActive })
        setShowInviteForm(true)
    }

    const handleToggleActive = async (user) => {
        try {
            const res = await fetch(`/api/admin/users/${user.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isActive: !user.isActive })
            })
            if (!res.ok) throw new Error('Failed to toggle status')
            showSuccess(`Member ${!user.isActive ? 'activated' : 'deactivated'}`)
            await loadUsers()
        } catch (err) {
            showError(err.message)
        }
    }

    const handleRevoke = async (id, name) => {
        const confirmed = await showConfirm({
            title: `Revoke ${name}?`,
            text: 'This member will lose all access to the admin panel permanently.',
            confirmText: 'Yes, Revoke Access'
        })

        if (!confirmed) return

        try {
            const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
            const data = await res.json()

            if (!res.ok) throw new Error(data.error)

            showSuccess(`${name} has been revoked.`)
            await loadUsers()
        } catch (err) {
            showError(err.message)
        }
    }

    return (
        <div className="space-y-8 animate-fade-in w-full max-w-6xl mx-auto px-6 py-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center shrink-0">
                            <HiOutlineUsers className="text-xl" />
                        </div>
                        Team Members
                    </h1>
                    <p className="text-gray-500 font-medium mt-2">Manage access and RBAC permissions for the CMS. Only accessible by Super Admins.</p>
                </div>

                <div className="flex gap-4 items-center">
                    <Link href="/admin" className="text-violet-600 font-bold hover:text-violet-700 transition-colors bg-violet-50 px-4 py-2 rounded-xl text-sm">
                        Back to Dashboard
                    </Link>
                    <button
                        onClick={() => {
                            setShowInviteForm(!showInviteForm)
                            if (editingUser) {
                                setEditingUser(null)
                                setFormData({ name: '', email: '', password: '', role: 'EDITOR', isActive: true })
                            }
                        }}
                        className="btn-primary py-2 px-6 shadow-sm flex items-center gap-2"
                    >
                        <HiOutlineUserAdd />
                        {showInviteForm ? 'Cancel' : 'Add Member'}
                    </button>
                </div>
            </div>

            <div className={`grid grid-cols-1 ${showInviteForm ? 'lg:grid-cols-3' : ''} gap-8 transition-all`}>
                {/* Invite Form */}
                {showInviteForm && (
                    <div className="lg:col-span-1 animate-fade-in">
                        <form onSubmit={handleCreate} className="bg-white border text-gray-900 border-gray-100 rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] sticky top-24">
                            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <HiOutlineUserAdd className="text-violet-500" />
                                {editingUser ? 'Edit Team Member' : 'Add New Team Member'}
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/20 shadow-sm transition-all text-sm font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/20 shadow-sm transition-all text-sm font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">{editingUser ? 'New Password (leave blank to keep)' : 'Temp Password'}</label>
                                    <input
                                        type="password"
                                        required={!editingUser}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/20 shadow-sm transition-all text-sm font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Role</label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/20 shadow-sm transition-all text-sm font-bold"
                                    >
                                        <option value="EDITOR">Editor</option>
                                        <option value="VIEWER">Viewer</option>
                                        <option value="SUPER_ADMIN">Super Admin</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-3 py-2">
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        className="w-4 h-4 text-violet-600 rounded"
                                    />
                                    <label htmlFor="isActive" className="text-sm font-bold text-gray-700 cursor-pointer">Account Active</label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="w-full mt-4 bg-linear-to-r from-violet-600 to-fuchsia-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-violet-500/40 hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {saving ? 'Saving...' : editingUser ? 'Update Member' : 'Send Invite'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* List Table */}
                <div className={showInviteForm ? "lg:col-span-2" : "col-span-1"}>
                    <div className="bg-white border text-gray-900 border-gray-100 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden min-h-[400px]">
                        {loading ? (
                            <div className="p-12 text-center text-gray-400 font-bold">Loading users...</div>
                        ) : users.length === 0 ? (
                            <div className="p-16 text-center">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No users found</h3>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-100">
                                            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                                            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                                            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {users.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-violet-100 to-violet-100 flex items-center justify-center text-violet-700 font-bold border border-violet-200">
                                                            {user.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <span className="font-bold text-gray-900 block">{user.name}</span>
                                                            <span className="font-medium text-xs text-gray-500 block">{user.email}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold ${user.role === 'SUPER_ADMIN' ? 'bg-purple-50 text-purple-700' : user.role === 'EDITOR' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-600'}`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button 
                                                        onClick={() => handleToggleActive(user)}
                                                        className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-bold border transition-colors ${user.isActive ? 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100' : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'}`}
                                                    >
                                                        {user.isActive ? 'Active' : 'Inactive'}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <button
                                                            onClick={() => handleEdit(user)}
                                                            className="text-violet-600 hover:text-violet-800 font-bold text-xs transition-colors"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleRevoke(user.id, user.name)}
                                                            className="text-red-500 hover:text-red-700 font-bold text-xs transition-colors"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
