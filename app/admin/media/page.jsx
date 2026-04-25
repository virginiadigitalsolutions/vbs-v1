'use client'

import { useState, useEffect } from 'react'
import { showSuccess, showError, showConfirm } from '@/lib/swal'
import {
    HiOutlineClipboardCopy,
    HiOutlineExternalLink,
    HiOutlinePhotograph,
    HiOutlineTrash,
    HiOutlineUpload,
} from 'react-icons/hi'
import Image from 'next/image'
import {
    AdminPageHeader,
    AdminPageShell,
    AdminPanel,
    AdminStatsGrid,
} from '@/components/admin/AdminPageShell'

export default function AdminMediaLibrary() {
    const [media, setMedia] = useState([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)

    const fetchMedia = () => {
        setLoading(true)
        fetch('/api/admin/media')
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setMedia(data)
                setLoading(false)
            })
            .catch(() => {
                showError('Failed to load media.')
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchMedia()
    }, [])

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            showError('Only image files are allowed.')
            return
        }

        if (file.size > 4 * 1024 * 1024) {
            showError('File is too large. Upload images under 4 MB.')
            return
        }

        setUploading(true)

        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await fetch('/api/admin/media', {
                method: 'POST',
                body: formData,
            })

            if (!res.ok) throw new Error('Upload failed')

            fetchMedia()
            showSuccess('Image uploaded successfully.')
        } catch (err) {
            showError(err.message)
        } finally {
            setUploading(false)
            e.target.value = ''
        }
    }

    const copyToClipboard = (url) => {
        const fullUrl = url.startsWith('http') ? url : window.location.origin + url
        navigator.clipboard.writeText(fullUrl)
        showSuccess('Image URL copied to clipboard.')
    }

    const handleDelete = async (id, filename) => {
        const confirmed = await showConfirm({
            title: `Delete ${filename}?`,
            text: 'This will permanently remove the file from the database. This cannot be undone.',
            confirmText: 'Yes, Delete',
        })

        if (!confirmed) return

        try {
            const res = await fetch(`/api/admin/media/${id}`, { method: 'DELETE' })
            if (!res.ok) throw new Error('Failed to delete')
            showSuccess('Media deleted successfully.')
            fetchMedia()
        } catch (err) {
            showError(err.message)
        }
    }

    const totalSizeKb = media.reduce((sum, item) => sum + item.sizeBytes, 0) / 1024
    const latestUpload = media[0]?.createdAt ? new Date(media[0].createdAt).toLocaleDateString() : 'No uploads yet'

    return (
        <AdminPageShell>
            <AdminPageHeader
                eyebrow="Media Library"
                title="Manage shared image assets for pages and posts"
                description="Upload approved images once, then reuse them across the CMS, learning hub, and section layouts without duplicate asset hunting."
                action={
                    <label
                        className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(15,23,42,0.16)] transition-all hover:bg-primary-700 ${
                            uploading ? 'pointer-events-none opacity-50' : ''
                        }`}
                    >
                        <input
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleFileUpload}
                            disabled={uploading}
                        />
                        <HiOutlineUpload className="text-base" />
                        {uploading ? 'Uploading...' : 'Upload Image'}
                    </label>
                }
                meta={[
                    { label: 'Assets', value: String(media.length) },
                    { label: 'Total Size', value: `${totalSizeKb.toFixed(1)} KB` },
                    { label: 'Latest Upload', value: latestUpload },
                    { label: 'Usage', value: 'CMS + Blog' },
                ]}
            />

            <AdminStatsGrid
                items={[
                    { label: 'Files', value: media.length, icon: HiOutlinePhotograph, accent: 'from-primary-500 to-primary-700', detail: 'Available assets' },
                    { label: 'Ready', value: media.length, icon: HiOutlineUpload, accent: 'from-emerald-500 to-teal-500', detail: 'Accessible in admin' },
                    { label: 'Storage', value: `${totalSizeKb.toFixed(0)} KB`, icon: HiOutlineClipboardCopy, accent: 'from-violet-500 to-fuchsia-500', detail: 'Tracked in database' },
                    { label: 'Latest', value: latestUpload, icon: HiOutlineExternalLink, accent: 'from-amber-500 to-orange-500', detail: 'Most recent upload' },
                ]}
            />

            <AdminPanel
                title="Library Assets"
                description="Hover any asset to copy its URL, open the original file, or remove it from the library."
            >
                {loading ? (
                    <div className="py-20 text-center text-sm font-bold text-slate-400">Loading library...</div>
                ) : media.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        {media.map((item) => (
                            <div
                                key={item.id}
                                className="group overflow-hidden rounded-[24px] border border-slate-200/70 bg-slate-50/60 transition-all hover:-translate-y-1 hover:border-primary-200 hover:bg-white hover:shadow-[0_16px_36px_rgba(72,115,174,0.10)]"
                            >
                                <div className="relative h-44 overflow-hidden border-b border-slate-100 bg-slate-100">
                                    <Image
                                        src={item.url}
                                        alt={item.filename}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-slate-950/60 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                        <button
                                            onClick={() => copyToClipboard(item.url)}
                                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-900 shadow-lg transition-transform hover:scale-110"
                                            title="Copy Link"
                                        >
                                            <HiOutlineClipboardCopy className="text-lg" />
                                        </button>
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-900 shadow-lg transition-transform hover:scale-110"
                                            title="Open Original"
                                        >
                                            <HiOutlineExternalLink className="text-lg" />
                                        </a>
                                        <button
                                            onClick={() => handleDelete(item.id, item.filename)}
                                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500 text-white shadow-lg transition-transform hover:scale-110"
                                            title="Delete Image"
                                        >
                                            <HiOutlineTrash className="text-lg" />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="truncate text-sm font-bold text-slate-950">{item.filename}</div>
                                    <div className="mt-3 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                                        <span>{(item.sizeBytes / 1024).toFixed(1)} KB</span>
                                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50/80 px-6 py-20 text-center">
                        <div className="text-base font-black text-slate-950">No media uploaded yet</div>
                        <p className="mt-2 text-sm font-medium text-slate-500">
                            Upload your first image to start reusing assets across pages and blog content.
                        </p>
                    </div>
                )}
            </AdminPanel>
        </AdminPageShell>
    )
}
