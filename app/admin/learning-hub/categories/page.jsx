'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { HiOutlineTag, HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { showSuccess, showError, showConfirm } from '@/lib/swal'

export default function BlogCategoriesManager() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [newCategoryName, setNewCategoryName] = useState('')
    const [newCategorySlug, setNewCategorySlug] = useState('')
    const [slugTouched, setSlugTouched] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [editingName, setEditingName] = useState('')
    const [editingSlug, setEditingSlug] = useState('')
    const [editingSlugTouched, setEditingSlugTouched] = useState(false)

    const slugify = (value = '') =>
        value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '')

    const loadCategories = async () => {
        try {
            const res = await fetch('/api/admin/learning-hub/categories')
            if (!res.ok) throw new Error('Failed to fetch')
            const data = await res.json()
            setCategories(data)
        } catch (err) {
            showError('Could not load categories.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { loadCategories() }, [])

    const handleCreate = async (e) => {
        e.preventDefault()
        if (!newCategoryName.trim()) return

        setSaving(true)
        try {
            const res = await fetch('/api/admin/learning-hub/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newCategoryName, slug: newCategorySlug })
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error)

            showSuccess('Category Created!')
            setNewCategoryName('')
            setNewCategorySlug('')
            setSlugTouched(false)
            await loadCategories()
        } catch (err) {
            showError(err.message)
        } finally {
            setSaving(false)
        }
    }

    const startEditing = (category) => {
        setEditingId(category.id)
        setEditingName(category.name)
        setEditingSlug(category.slug)
        setEditingSlugTouched(false)
    }

    const cancelEditing = () => {
        setEditingId(null)
        setEditingName('')
        setEditingSlug('')
        setEditingSlugTouched(false)
    }

    const handleUpdate = async (id) => {
        try {
            const res = await fetch('/api/admin/learning-hub/categories', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, name: editingName, slug: editingSlug })
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error)

            showSuccess('Category Updated!')
            cancelEditing()
            await loadCategories()
        } catch (err) {
            showError(err.message)
        }
    }

    const handleDelete = async (category) => {
        const confirmed = await showConfirm({
            title: `Delete "${category.name}"?`,
            text: category._count.posts > 0
                ? 'Posts in this category will stay live, but they will become uncategorized.'
                : 'This category will be deleted permanently.',
            confirmText: 'Delete category',
        })

        if (!confirmed) return

        try {
            const res = await fetch('/api/admin/learning-hub/categories', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: category.id })
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error)

            showSuccess('Category Deleted!')
            if (editingId === category.id) cancelEditing()
            await loadCategories()
        } catch (err) {
            showError(err.message)
        }
    }

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center shrink-0">
                            <HiOutlineTag className="text-xl" />
                        </div>
                        Blog Categories
                    </h1>
                    <p className="text-gray-500 font-medium mt-2">Manage the topics and tags for your articles.</p>
                </div>

                <Link href="/admin/learning-hub" className="text-violet-600 font-bold hover:text-violet-700 transition-colors bg-violet-50 px-4 py-2 rounded-xl text-sm">
                    Back to Blog
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Create Form */}
                <div className="lg:col-span-1">
                    <form onSubmit={handleCreate} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] sticky top-24">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <HiOutlinePlus className="text-violet-500" />
                            Add New Category
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Category Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newCategoryName}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        setNewCategoryName(value)
                                        if (!slugTouched) {
                                            setNewCategorySlug(slugify(value))
                                        }
                                    }}
                                    placeholder="e.g. Engineering"
                                    className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/20 shadow-sm transition-all text-sm font-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Category Slug</label>
                                <input
                                    type="text"
                                    required
                                    value={newCategorySlug}
                                    onChange={(e) => {
                                        setSlugTouched(true)
                                        setNewCategorySlug(slugify(e.target.value))
                                    }}
                                    placeholder="engineering"
                                    className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/20 shadow-sm transition-all text-sm font-medium"
                                />
                                <p className="mt-2 text-xs font-medium text-gray-500">This becomes the category URL key.</p>
                            </div>

                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl shadow-sm hover:bg-black hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {saving ? 'Saving...' : 'Create Category'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* List Table */}
                <div className="lg:col-span-2">
                    <div className="bg-white border border-gray-100 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
                        {loading ? (
                            <div className="p-12 text-center text-gray-400 font-bold">Loading...</div>
                        ) : categories.length === 0 ? (
                            <div className="p-16 text-center">
                                <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                                    <HiOutlineTag />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No categories yet</h3>
                                <p className="text-gray-500 text-sm">Create your first category using the form on the left.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-100">
                                            <th className="font-bold text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Name</th>
                                            <th className="font-bold text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Slug</th>
                                            <th className="font-bold text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Posts</th>
                                            <th className="font-bold text-gray-500 text-xs uppercase tracking-wider px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {categories.map((cat) => (
                                            <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    {editingId === cat.id ? (
                                                        <input
                                                            type="text"
                                                            value={editingName}
                                                            onChange={(e) => {
                                                                const value = e.target.value
                                                                setEditingName(value)
                                                                if (!editingSlugTouched) {
                                                                    setEditingSlug(slugify(value))
                                                                }
                                                            }}
                                                            className="w-full bg-gray-50 border border-violet-200 text-gray-900 rounded-xl px-3 py-2 outline-none focus:border-violet-400"
                                                        />
                                                    ) : (
                                                        <span className="font-bold text-gray-900">{cat.name}</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {editingId === cat.id ? (
                                                        <input
                                                            type="text"
                                                            value={editingSlug}
                                                            onChange={(e) => {
                                                                setEditingSlugTouched(true)
                                                                setEditingSlug(slugify(e.target.value))
                                                            }}
                                                            className="w-full bg-gray-50 border border-violet-200 text-gray-900 rounded-xl px-3 py-2 outline-none focus:border-violet-400 font-mono text-sm"
                                                        />
                                                    ) : (
                                                        <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">/{cat.slug}</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-violet-50 text-violet-700 font-bold text-xs">
                                                        {cat._count.posts}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    {editingId === cat.id ? (
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleUpdate(cat.id)}
                                                                className="px-3 py-2 rounded-xl bg-violet-600 text-white text-xs font-bold hover:bg-violet-700 transition-colors"
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={cancelEditing}
                                                                className="px-3 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-colors"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => startEditing(cat)}
                                                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-violet-50 text-violet-700 text-xs font-bold hover:bg-violet-100 transition-colors"
                                                            >
                                                                <HiOutlinePencil className="h-3.5 w-3.5" />
                                                                Edit
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDelete(cat)}
                                                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 text-red-700 text-xs font-bold hover:bg-red-100 transition-colors"
                                                            >
                                                                <HiOutlineTrash className="h-3.5 w-3.5" />
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
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
