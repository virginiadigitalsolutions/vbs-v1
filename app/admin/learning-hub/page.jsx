'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { showSuccess, showError, showConfirm } from '@/lib/swal'
import { resolvePublishedAt, resolveReadTimeMinutes } from '@/lib/blog'
import {
    HiOutlineTrash,
    HiOutlinePencil,
    HiOutlineDocumentText,
    HiOutlineSearch,
    HiOutlineExternalLink,
    HiOutlineClock,
    HiOutlineCheckCircle,
    HiOutlineClipboardList,
} from 'react-icons/hi'

const formatDate = (value) =>
    new Date(value).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })

export default function AdminBlogDashboard() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [categoryFilter, setCategoryFilter] = useState('all')

    const loadPosts = async () => {
        try {
            const res = await fetch('/api/admin/learning-hub')
            if (!res.ok) throw new Error('Failed')
            const data = await res.json()
            setPosts(data)
        } catch {
            showError('Could not load posts.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadPosts()
    }, [])

    const handleDelete = async (id, title) => {
        const confirmed = await showConfirm({
            title: `Delete "${title}"?`,
            text: 'This action cannot be undone.',
            confirmText: 'Yes, delete it',
        })
        if (!confirmed) return

        try {
            const res = await fetch(`/api/admin/learning-hub/${id}`, { method: 'DELETE' })
            if (!res.ok) throw new Error('Failed')
            showSuccess('Post deleted!')
            setPosts((current) => current.filter((post) => post.id !== id))
        } catch {
            showError('Could not delete post.')
        }
    }

    const trimmedQuery = query.trim().toLowerCase()
    const categories = Array.from(new Set(posts.map((post) => post.category?.name).filter(Boolean))).sort((a, b) =>
        a.localeCompare(b)
    )

    const filteredPosts = posts.filter((post) => {
        const matchesQuery =
            !trimmedQuery ||
            post.title?.toLowerCase().includes(trimmedQuery) ||
            post.slug?.toLowerCase().includes(trimmedQuery) ||
            post.excerpt?.toLowerCase().includes(trimmedQuery) ||
            post.author?.name?.toLowerCase().includes(trimmedQuery)

        const matchesStatus =
            statusFilter === 'all' ||
            (statusFilter === 'published' && post.isPublished) ||
            (statusFilter === 'draft' && !post.isPublished)

        const matchesCategory =
            categoryFilter === 'all' || post.category?.name === categoryFilter

        return matchesQuery && matchesStatus && matchesCategory
    })

    const stats = {
        total: posts.length,
        published: posts.filter((post) => post.isPublished).length,
        drafts: posts.filter((post) => !post.isPublished).length,
    }

    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto px-6 py-10 animate-fade-up space-y-8">
                <div className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/40">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 via-cyan-500 to-accent-500"></div>
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-2xl">
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Blog Engine</h1>
                            <p className="mt-3 text-sm font-medium text-gray-500">
                                Run the editorial side of the site from one place. Review drafts, monitor what is live,
                                and jump straight into editing or previewing.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/admin/learning-hub/categories" className="inline-flex items-center rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-100">
                                Categories
                            </Link>
                            <Link href="/admin/learning-hub/authors" className="inline-flex items-center rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-100">
                                Authors
                            </Link>
                            <Link href="/admin/learning-hub/new" className="btn-primary px-6 py-3 shadow-sm">
                                Write Post
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-200/30">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                                <HiOutlineDocumentText className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-gray-400">All Posts</p>
                                <p className="text-3xl font-extrabold text-gray-900">{stats.total}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-200/30">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                                <HiOutlineCheckCircle className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-gray-400">Published</p>
                                <p className="text-3xl font-extrabold text-gray-900">{stats.published}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-200/30">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                                <HiOutlineClipboardList className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-gray-400">Drafts</p>
                                <p className="text-3xl font-extrabold text-gray-900">{stats.drafts}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/30">
                    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_180px_220px]">
                        <label className="relative block">
                            <HiOutlineSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Search title, slug, excerpt, or author"
                                className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm font-medium text-gray-900 outline-none transition-all focus:border-primary-300 focus:bg-white focus:ring-4 focus:ring-primary-500/10"
                            />
                        </label>

                        <select
                            value={statusFilter}
                            onChange={(event) => setStatusFilter(event.target.value)}
                            className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 outline-none transition-all focus:border-primary-300 focus:bg-white focus:ring-4 focus:ring-primary-500/10"
                        >
                            <option value="all">All statuses</option>
                            <option value="published">Published</option>
                            <option value="draft">Drafts</option>
                        </select>

                        <select
                            value={categoryFilter}
                            onChange={(event) => setCategoryFilter(event.target.value)}
                            className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 outline-none transition-all focus:border-primary-300 focus:bg-white focus:ring-4 focus:ring-primary-500/10"
                        >
                            <option value="all">All categories</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-xl shadow-gray-200/40">
                    {loading ? (
                        <div className="py-16 text-center text-sm font-bold text-gray-400">Loading posts...</div>
                    ) : filteredPosts.length === 0 ? (
                        <div className="px-6 py-20 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50">
                                <HiOutlineDocumentText className="h-8 w-8 text-gray-300" />
                            </div>
                            <p className="text-lg font-extrabold text-gray-900">No matching posts</p>
                            <p className="mt-2 text-sm font-medium text-gray-500">
                                Try adjusting the filters or start a new draft.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse text-left">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/70">
                                        <th className="px-6 py-5 text-xs font-extrabold uppercase tracking-[0.2em] text-gray-400">Article</th>
                                        <th className="px-6 py-5 text-xs font-extrabold uppercase tracking-[0.2em] text-gray-400">Author</th>
                                        <th className="px-6 py-5 text-xs font-extrabold uppercase tracking-[0.2em] text-gray-400">Category</th>
                                        <th className="px-6 py-5 text-xs font-extrabold uppercase tracking-[0.2em] text-gray-400">Publish Date</th>
                                        <th className="px-6 py-5 text-xs font-extrabold uppercase tracking-[0.2em] text-gray-400">Read Time</th>
                                        <th className="px-6 py-5 text-xs font-extrabold uppercase tracking-[0.2em] text-gray-400">Status</th>
                                        <th className="px-6 py-5 text-right text-xs font-extrabold uppercase tracking-[0.2em] text-gray-400">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredPosts.map((post) => (
                                        <tr key={post.id} className="group transition-colors hover:bg-gray-50/80">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-14 w-14 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
                                                        {post.featuredImg ? (
                                                            <div className="h-full w-full bg-cover bg-center" aria-label={post.featuredImgAlt || post.title} title={post.featuredImgAlt || post.title} style={{ backgroundImage: `url(${post.featuredImg})` }} />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-100 to-cyan-100 text-lg font-extrabold text-sky-700">
                                                                {post.title?.charAt(0) || 'P'}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="line-clamp-1 text-sm font-extrabold text-gray-900 transition-colors group-hover:text-primary-600">
                                                            {post.title}
                                                        </p>
                                                        <p className="mt-1 line-clamp-2 text-sm font-medium text-gray-500">
                                                            {post.excerpt || 'No excerpt written yet.'}
                                                        </p>
                                                        <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">
                                                            /learning-hub/{post.category?.slug || 'posts'}/{post.slug}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-extrabold text-gray-700">
                                                        {post.author?.name?.charAt(0) || '?'}
                                                    </div>
                                                    <p className="text-sm font-bold text-gray-800">{post.author?.name || 'Unknown'}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                {post.category ? (
                                                    <span className="inline-flex rounded-xl border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700">{post.category.name}</span>
                                                ) : (
                                                    <span className="inline-flex rounded-xl border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-500">Uncategorized</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600">
                                                    <HiOutlineClock className="h-4 w-4 text-gray-400" />
                                                    {formatDate(resolvePublishedAt(post))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600">
                                                    <HiOutlineClock className="h-4 w-4 text-gray-400" />
                                                    {resolveReadTimeMinutes(post)} min
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`inline-flex rounded-xl border px-3 py-1 text-xs font-bold ${post.isPublished ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-amber-200 bg-amber-50 text-amber-700'}`}>
                                                    {post.isPublished ? 'Published' : 'Draft'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center justify-end gap-2">
                                                    {post.isPublished && (
                                                        <Link
                                                            href={`/learning-hub/${post.category?.slug || 'posts'}/${post.slug}`}
                                                            target="_blank"
                                                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition-all hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600"
                                                            title="Preview live post"
                                                        >
                                                            <HiOutlineExternalLink className="h-4 w-4" />
                                                        </Link>
                                                    )}
                                                    <Link
                                                        href={`/admin/learning-hub/${post.id}/edit`}
                                                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition-all hover:border-primary-200 hover:bg-primary-50 hover:text-primary-600"
                                                        title="Edit post"
                                                    >
                                                        <HiOutlinePencil className="h-4 w-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(post.id, post.title)}
                                                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                                        title="Delete post"
                                                    >
                                                        <HiOutlineTrash className="h-4 w-4" />
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
    )
}
