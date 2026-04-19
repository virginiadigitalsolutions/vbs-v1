'use client'

import { useState, useEffect } from 'react'
import { showSuccess, showError, showConfirm } from '@/lib/swal'
import { HiOutlineTrash, HiOutlineClipboardCopy, HiOutlineExternalLink } from 'react-icons/hi'
import Image from 'next/image'

export default function AdminMediaLibrary() {
    const [media, setMedia] = useState([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)

    const fetchMedia = () => {
        setLoading(true)
        fetch('/api/admin/media')
            .then(res => res.json())
            .then(data => {
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

        if (file.size > 4 * 1024 * 1024) { // 4MB limit for Vercel
            showError('File is too large. Vercel limited to 4.5MB total request size. Please upload images under 4MB.');
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

            // Refresh gallery
            fetchMedia()
            showSuccess('Image uploaded successfully!')
        } catch (err) {
            showError(err.message)
        } finally {
            setUploading(false)
            e.target.value = '' // Reset input
        }
    }

    const copyToClipboard = (url) => {
        const fullUrl = url.startsWith('http') ? url : window.location.origin + url
        navigator.clipboard.writeText(fullUrl)
        showSuccess('Image URL copied to clipboard!')
    }

    const handleDelete = async (id, filename) => {
        const confirmed = await showConfirm({
            title: `Delete ${filename}?`,
            text: 'This will permanently remove the file from the database. This cannot be undone.',
            confirmText: 'Yes, Delete'
        })

        if (!confirmed) return

        try {
            const res = await fetch(`/api/admin/media/${id}`, { method: 'DELETE' })
            if (!res.ok) throw new Error('Failed to delete')
            showSuccess('Media deleted successfully')
            fetchMedia()
        } catch (err) {
            showError(err.message)
        }
    }

    return (
        <div className="w-full">
            <div className="max-w-6xl mx-auto px-6 py-10 animate-fade-up">
                <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between text-gray-900 bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] gap-4">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Global Media Library</h1>
                        <p className="text-gray-500 font-medium text-sm mt-2">
                            Upload images to embed in your dynamic CMS pages and Blog Engine.
                        </p>
                    </div>

                    <div>

                        <label className={`cursor-pointer inline-flex items-center justify-center btn-primary py-3 px-6 shadow-sm ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                            <input
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleFileUpload}
                                disabled={uploading}
                            />
                            {uploading ? 'Uploading...' : 'Upload Image'}
                        </label>
                    </div>
                </div>

                {loading ? (
                    <div className="py-20 text-center text-gray-400 font-bold">Loading library...</div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {media.length > 0 ? media.map(item => (
                            <div key={item.id} className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-primary-300 hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] transition-all hover:-translate-y-1 flex flex-col">
                                <div className="h-40 bg-gray-50 flex items-center justify-center overflow-hidden border-b border-gray-50 relative">
                                    <Image 
                                        src={item.url} 
                                        alt={item.filename} 
                                        fill 
                                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 px-4 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                        <button
                                            onClick={() => copyToClipboard(item.url)}
                                            className="w-10 h-10 bg-white text-gray-900 rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                                            title="Copy Link"
                                        >
                                            <HiOutlineClipboardCopy className="text-lg" />
                                        </button>
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-10 h-10 bg-white text-gray-900 rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                                            title="Open Original"
                                        >
                                            <HiOutlineExternalLink className="text-lg" />
                                        </a>
                                        <button
                                            onClick={() => handleDelete(item.id, item.filename)}
                                            className="w-10 h-10 bg-red-500 text-white rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                                            title="Delete Image"
                                        >
                                            <HiOutlineTrash className="text-lg" />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-1">
                                    <p className="text-xs font-bold text-gray-900 truncate mb-1">{item.filename}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-auto flex items-center justify-between">
                                        <span>{(item.sizeBytes / 1024).toFixed(1)} KB</span>
                                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                                    </p>
                                </div>
                            </div>
                        )) : (
                            <div className="col-span-full py-20 bg-white border border-dashed border-gray-200 rounded-3xl text-center flex flex-col items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-2xl mb-4">🖼️</div>
                                <p className="text-gray-900 font-bold">No media uploaded yet.</p>
                                <p className="text-gray-500 text-sm mt-1">Upload your first image to use in blog posts.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
