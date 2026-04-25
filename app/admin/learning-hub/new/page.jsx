'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { showSuccess, showError } from '@/lib/swal'
import { HiOutlineSparkles, HiOutlineDocumentText, HiOutlineX } from 'react-icons/hi'
import { normalizePositiveInteger, toDatetimeLocalValue } from '@/lib/blog'
import 'react-quill-new/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

const quillModules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean']
    ],
}

const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list',
    'align',
    'blockquote', 'code-block',
    'link', 'image', 'video'
]

const slugify = (value = '') =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')

export default function NewBlogPost() {
    const router = useRouter()
    const [saving, setSaving] = useState(false)
    const [generating, setGenerating] = useState(false)
    const [showAiModal, setShowAiModal] = useState(false)
    const [error, setError] = useState('')
    const [categories, setCategories] = useState([])
    const [authors, setAuthors] = useState([])
    const fileInputRef = useRef(null)
    const [blocks, setBlocks] = useState([])
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        h1: '',
        metaTitle: '',
        metaDesc: '',
        showToc: true,
        excerpt: '',
        featuredImg: '',
        featuredImgAlt: '',
        publishedAt: toDatetimeLocalValue(new Date()),
        readTimeMinutes: '',
        authorId: '',
        categoryId: '',
        isPublished: false,
    })

    const addBlock = (type) => {
        const id = Math.random().toString(36).substring(2, 9)
        let data = {}
        if (type === 'header') data = { text: '', level: 2 }
        if (type === 'text') data = { html: '' }
        if (type === 'image') data = { url: '', alt: '' }
        if (type === 'video') data = { url: '' }
        if (type === 'quote') data = { text: '', author: '' }
        if (type === 'divider') data = { style: 'solid' }
        if (type === 'button') data = { text: '', url: '', style: 'primary' }
        if (type === 'html') data = { code: '' }
        if (type === 'faq') data = { items: [{ q: '', a: '' }] }
        if (type === 'callout') data = { text: '', style: 'info' }
        setBlocks([...blocks, { id, type, data }])
    }

    const updateBlock = (id, newData) => {
        setBlocks(blocks.map(b => b.id === id ? { ...b, data: { ...b.data, ...newData } } : b))
    }

    const deleteBlock = (id) => {
        setBlocks(blocks.filter(b => b.id !== id))
    }

    const moveBlock = (index, dir) => {
        const newBlocks = [...blocks]
        const temp = newBlocks[index]
        newBlocks[index] = newBlocks[index + dir]
        newBlocks[index + dir] = temp
        setBlocks(newBlocks)
    }

    // Fetch categories and authors on load
    useEffect(() => {
        Promise.all([
            fetch('/api/admin/learning-hub/categories').then(res => res.json()),
            fetch('/api/admin/learning-hub/authors').then(res => res.json())
        ]).then(([cats, auths]) => {
            setCategories(cats)
            setAuthors(auths)
        }).catch(err => console.error('Failed to load metadata dropdowns:', err))
    }, [])

    // Auto-generate slug from title
    const handleTitleChange = (e) => {
        const title = e.target.value
        setFormData(prev => ({
            ...prev,
            title,
            slug: prev.slug === '' || prev.slug === slugify(prev.title)
                ? slugify(title)
                : prev.slug
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)

        try {
            const finalData = {
                ...formData,
                readTimeMinutes: normalizePositiveInteger(formData.readTimeMinutes),
                content: JSON.stringify(blocks)
            }
            const res = await fetch('/api/admin/learning-hub', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalData),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'Failed to create post')
            }

            showSuccess('Article created successfully!')
            router.push('/admin/learning-hub')
            router.refresh()
        } catch (err) {
            showError(err.message)
            setSaving(false)
        }
    }

    const onImageUpload = async (file) => {
        const payload = new FormData()
        payload.append('file', file)

        try {
            const res = await fetch('/api/upload', { method: 'POST', body: payload })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)
            return data.url
        } catch (err) {
            showError('Image upload failed: ' + err.message)
            return null
        }
    }

    const handleAiGenerate = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        setGenerating(true)
        setShowAiModal(false)

        try {
            const rawText = await file.text()

            const payload = new FormData()
            payload.append('textContent', rawText)

            const res = await fetch('/api/admin/learning-hub/ai-generate', {
                method: 'POST',
                body: payload
            })

            const json = await res.json()

            if (!res.ok) throw new Error(json.error || 'AI generation failed')

            const { title, excerpt, content, tags } = json.data

            setFormData(prev => ({
                ...prev,
                title: title || prev.title,
                slug: slugify(title || prev.title),
                excerpt: excerpt || prev.excerpt,
            }))
            
            if (content) {
                setBlocks(prev => [...prev, { id: Math.random().toString(36).substring(2, 9), type: 'text', data: { html: content } }])
            }

            showSuccess('AI generation complete!')
        } catch (err) {
            console.error(err)
            showError(err.message)
        } finally {
            setGenerating(false)
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    // Removed legacy content onDrop


    return (
        <div className="min-h-screen bg-[#fafafa]">
            {/* Top bar */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm shadow-gray-100/50">
                <div className="flex items-center gap-4">
                    <Link href="/admin/learning-hub" className="text-gray-400 font-bold hover:text-violet-600 text-sm transition-colors">← Blog Engine</Link>
                    <span className="text-gray-200">|</span>
                    <span className="font-extrabold text-gray-900 tracking-tight">New Article</span>
                    {generating && <span className="text-xs font-bold text-violet-500 bg-violet-50 px-2 py-1 rounded animate-pulse">🤖 Generating AI Content...</span>}
                </div>
                <button
                    type="button"
                    onClick={() => setShowAiModal(true)}
                    disabled={generating}
                    className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:scale-105 transition-transform"
                >
                    <HiOutlineSparkles className="text-lg" />
                    Generate with AI
                </button>
            </div>

            {/* AI Modal */}
            {showAiModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md p-8 relative">
                        <button onClick={() => setShowAiModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors">
                            <HiOutlineX className="text-2xl" />
                        </button>
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                                <HiOutlineSparkles />
                            </div>
                            <h3 className="text-2xl font-extrabold text-gray-900">AI Blog Generator</h3>
                            <p className="text-gray-500 text-sm mt-2 font-medium">Upload a raw document (.txt, .md) and let Gemini format it into a perfect blog post.</p>
                        </div>
                        <div className="border-2 border-dashed border-violet-200 bg-violet-50/50 hover:bg-violet-50 transition-colors rounded-2xl p-8 text-center cursor-pointer relative">
                            <input
                                type="file"
                                accept=".txt,.md"
                                onChange={handleAiGenerate}
                                ref={fileInputRef}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <HiOutlineDocumentText className="text-4xl text-violet-400 mx-auto mb-2" />
                            <p className="text-violet-900 font-bold text-sm">Click to upload document</p>
                            <p className="text-violet-500 font-medium text-xs mt-1">Supports TXT and MD</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto px-6 py-10 animate-fade-up">
                <form onSubmit={handleSubmit} className="space-y-8">


                    {/* Metadata Card */}
                    <div className="bg-white border text-gray-900 border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                        <h2 className="text-xl font-extrabold text-gray-900 mb-6">Post Metadata</h2>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Post Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={handleTitleChange}
                                    placeholder="e.g. 10 Next.js Performance Tricks for 2026"
                                    className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-500/20 shadow-sm focus:shadow-md transition-all font-medium"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">URL Slug</label>
                                    <div className="flex bg-gray-50 rounded-xl border-2 border-transparent focus-within:border-primary-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary-500/20 shadow-sm focus-within:shadow-md transition-all">
                                        <span className="flex items-center pl-4 text-gray-400 font-bold text-sm select-none">
                                            /learning-hub/{categories.find(c => String(c.id) === String(formData.categoryId))?.slug || 'posts'}/
                                        </span>
                                        <input
                                            type="text"
                                            required
                                            value={formData.slug}
                                            onChange={e => setFormData({ ...formData, slug: slugify(e.target.value) })}
                                            className="w-full bg-transparent text-gray-900 px-2 py-3 outline-none font-medium text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Banner / Featured Image URL</label>
                                    <input
                                        type="url"
                                        value={formData.featuredImg}
                                        onChange={e => setFormData({ ...formData, featuredImg: e.target.value })}
                                        placeholder="https://..."
                                        className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-500/20 shadow-sm focus:shadow-md transition-all font-medium text-sm"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Featured Image Alt Text</label>
                                    <input
                                        type="text"
                                        value={formData.featuredImgAlt}
                                        onChange={e => setFormData({ ...formData, featuredImgAlt: e.target.value })}
                                        placeholder="Describe the featured image for accessibility"
                                        className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-500/20 shadow-sm focus:shadow-md transition-all font-medium text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Read Time (Minutes)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={formData.readTimeMinutes}
                                        onChange={e => setFormData({ ...formData, readTimeMinutes: e.target.value })}
                                        placeholder="Auto-calculate if blank"
                                        className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-500/20 shadow-sm transition-all text-sm font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Publish Date</label>
                                    <input
                                        type="datetime-local"
                                        value={formData.publishedAt}
                                        onChange={e => setFormData({ ...formData, publishedAt: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-500/20 shadow-sm focus:shadow-md transition-all font-medium text-sm"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">H1 Override (Optional)</label>
                                <input
                                    type="text"
                                    value={formData.h1}
                                    onChange={e => setFormData({ ...formData, h1: e.target.value })}
                                    placeholder="Leave blank to use Post Title as H1"
                                    className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-500/20 shadow-sm focus:shadow-md transition-all font-medium text-sm"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Category (Optional)</label>
                                    <select
                                        value={formData.categoryId}
                                        onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-500/20 shadow-sm transition-all text-sm font-medium"
                                    >
                                        <option value="">-- No Category --</option>
                                        {categories.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Author</label>
                                    <select
                                        required
                                        value={formData.authorId}
                                        onChange={e => setFormData({ ...formData, authorId: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-500/20 shadow-sm transition-all text-sm font-medium"
                                    >
                                        <option value="" disabled>-- Select Author --</option>
                                        {authors.map(a => (
                                            <option key={a.id} value={a.id}>{a.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">SEO Meta Title (Optional)</label>
                                    <input
                                        type="text"
                                        value={formData.metaTitle}
                                        onChange={e => setFormData({ ...formData, metaTitle: e.target.value })}
                                        placeholder="SEO Title instead of regular Title"
                                        className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-500/20 shadow-sm transition-all text-sm font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Blog One-Liner / Excerpt</label>
                                    <input
                                        type="text"
                                        value={formData.excerpt}
                                        onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                        placeholder="Short summary for the blog loop..."
                                        className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-500/20 shadow-sm transition-all text-sm font-medium"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">SEO Meta Description</label>
                                <textarea
                                    rows={2}
                                    value={formData.metaDesc}
                                    onChange={e => setFormData({ ...formData, metaDesc: e.target.value })}
                                    placeholder="Search Engine description..."
                                    className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-500/20 shadow-sm focus:shadow-md transition-all font-medium text-sm resize-y"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border text-gray-900 border-gray-100 rounded-3xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] pb-2">
                        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <div>
                                <h2 className="text-xl font-extrabold text-gray-900">Article Content (Section Builder)</h2>
                                <p className="text-xs text-gray-500 font-medium mt-1">Build your post with dynamic blocks. The Table of Contents is auto-generated from Header blocks.</p>
                            </div>
                            <span className="text-xs font-bold text-violet-600 bg-violet-50 px-3 py-1 rounded-md">WYSIWYG Mode</span>
                        </div>
                        <div className="p-6 bg-white space-y-4 min-h-[400px]">
                            {blocks.map((block, index) => (
                                <div key={block.id} className="border border-gray-100 rounded-2xl p-4 relative bg-gray-50/50 group hover:shadow-sm transition-shadow">
                                    <div className="absolute right-4 top-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                        <button type="button" onClick={() => moveBlock(index, -1)} disabled={index === 0} className="p-1.5 bg-white shadow-sm rounded-md text-gray-400 hover:text-violet-600 disabled:opacity-30">↑</button>
                                        <button type="button" onClick={() => moveBlock(index, 1)} disabled={index === blocks.length - 1} className="p-1.5 bg-white shadow-sm rounded-md text-gray-400 hover:text-violet-600 disabled:opacity-30">↓</button>
                                        <button type="button" onClick={() => deleteBlock(block.id)} className="p-1.5 bg-white shadow-sm rounded-md text-red-400 hover:text-red-600 ml-2">×</button>
                                    </div>

                                    {block.type === 'header' && (
                                        <div className="pr-32">
                                            <div className="flex gap-2 mb-3">
                                                <select value={block.data.level} onChange={(e) => updateBlock(block.id, { level: Number(e.target.value) })} className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-sm font-bold text-gray-700 outline-none">
                                                    <option value={2}>H2</option>
                                                    <option value={3}>H3</option>
                                                    <option value={4}>H4</option>
                                                </select>
                                                <span className="text-xs font-bold text-violet-600 uppercase tracking-widest flex items-center bg-violet-50 px-2 pl-3 rounded-lg border-l-2 border-violet-500">Header Section</span>
                                            </div>
                                            <input type="text" value={block.data.text} onChange={(e) => updateBlock(block.id, { text: e.target.value })} placeholder="Heading text..." className="w-full bg-transparent text-2xl font-extrabold text-gray-900 border-none outline-none focus:ring-0 p-0" />
                                        </div>
                                    )}
                                    {block.type === 'text' && (
                                        <div className="space-y-4">
                                            <div className="flex flex-col gap-3 rounded-[1.75rem] border border-violet-100 bg-[linear-gradient(180deg,rgba(245,243,255,0.95),rgba(255,255,255,1))] p-5 shadow-[0_18px_50px_rgba(109,40,217,0.08)]">
                                                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                                    <div className="space-y-2">
                                                        <span className="text-xs font-bold text-violet-700 uppercase tracking-[0.28em]">Article Body</span>
                                                        <h3 className="text-xl font-extrabold text-slate-900">Write this section like the live blog content</h3>
                                                        <p className="max-w-2xl text-sm font-medium leading-6 text-slate-600">
                                                            This editor now uses the same clean reading canvas feel as the public article page, so spacing and formatting are easier to judge while writing.
                                                        </p>
                                                    </div>
                                                    <div className="rounded-2xl border border-white/80 bg-white/80 px-4 py-3 text-xs font-semibold leading-5 text-slate-500 shadow-sm">
                                                        Title, paragraph, list and quote formatting stay exactly as saved in the backend.
                                                    </div>
                                                </div>
                                                <div className="learning-editor-shell rounded-[1.5rem] border border-slate-200/80 bg-white p-3 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
                                                    <ReactQuill theme="snow" value={block.data.html} onChange={val => updateBlock(block.id, { html: val })} modules={quillModules} formats={quillFormats} className="learning-editor min-h-[260px]" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {block.type === 'image' && (
                                        <div className="pr-32">
                                            <span className="text-xs font-bold text-violet-600 uppercase tracking-widest flex items-center bg-violet-50 px-2 py-1 pl-3 rounded-lg border-l-2 border-violet-500 w-max mb-4">Image Section</span>
                                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                                {block.data.url ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img src={block.data.url} alt="block" className="w-48 h-32 object-cover rounded-xl border border-gray-200 shadow-sm" />
                                                ) : (
                                                    <div className="w-48 h-32 bg-gray-100/80 rounded-xl border-2 border-dashed border-gray-200 flex flex-col gap-2 items-center justify-center text-gray-400 text-xs text-center p-2 font-medium">📷 No Image Uploaded</div>
                                                )}
                                                <div className="flex-1 space-y-3 w-full">
                                                    <div>
                                                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Image Source URL</label>
                                                      <input type="text" value={block.data.url} onChange={(e) => updateBlock(block.id, { url: e.target.value })} placeholder="Enter URL or upload file..." className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none shadow-sm focus:border-violet-300" />
                                                    </div>
                                                    <div>
                                                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Alt Text (SEO)</label>
                                                      <input type="text" value={block.data.alt} onChange={(e) => updateBlock(block.id, { alt: e.target.value })} placeholder="Describe this image..." className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none shadow-sm focus:border-violet-300" />
                                                    </div>
                                                    <label className="btn-secondary py-1.5 px-4 text-xs inline-block cursor-pointer bg-white shadow-sm mt-1">
                                                        Upload from Computer
                                                        <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                                                            if(e.target.files[0]) {
                                                                const url = await onImageUpload(e.target.files[0])
                                                                if(url) updateBlock(block.id, { url })
                                                            }
                                                        }} />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {block.type === 'video' && (
                                        <div className="pr-32">
                                            <span className="text-xs font-bold text-violet-600 uppercase tracking-widest flex items-center bg-violet-50 px-2 py-1 pl-3 rounded-lg border-l-2 border-violet-500 w-max mb-4">Video Embed Section</span>
                                            <div>
                                              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">YouTube / Vimeo Link</label>
                                              <input type="text" value={block.data.url} onChange={(e) => updateBlock(block.id, { url: e.target.value })} placeholder="https://youtube.com/watch?v=..." className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none shadow-sm focus:border-violet-300" />
                                            </div>
                                            {block.data.url && (
                                                <div className="mt-4 aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-inner border border-gray-100">
                                                    <iframe src={block.data.url.replace('watch?v=', 'embed/').split('&')[0].replace('youtu.be/', 'www.youtube.com/embed/')} className="w-full h-full" frameBorder="0" allowFullScreen></iframe>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {block.type === 'quote' && (
                                        <div className="pr-32">
                                            <span className="text-xs font-bold text-violet-600 uppercase tracking-widest flex items-center bg-violet-50 px-2 py-1 pl-3 rounded-lg border-l-2 border-violet-500 w-max mb-4">Quote Section</span>
                                            <div className="space-y-4">
                                                <textarea value={block.data.text} onChange={(e) => updateBlock(block.id, { text: e.target.value })} placeholder="Enter quote text..." className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-lg font-medium outline-none shadow-sm focus:border-violet-300 resize-y" rows={3}></textarea>
                                                <input type="text" value={block.data.author} onChange={(e) => updateBlock(block.id, { author: e.target.value })} placeholder="Author name (optional)" className="w-full md:w-1/2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none shadow-sm focus:border-violet-300" />
                                            </div>
                                        </div>
                                    )}
                                    {block.type === 'divider' && (
                                        <div className="pr-32">
                                            <span className="text-xs font-bold text-violet-600 uppercase tracking-widest flex items-center bg-violet-50 px-2 py-1 pl-3 rounded-lg border-l-2 border-violet-500 w-max mb-4">Divider line</span>
                                            <div className="h-px bg-gray-200 w-full my-4"></div>
                                        </div>
                                    )}
                                    {block.type === 'button' && (
                                        <div className="pr-32">
                                            <span className="text-xs font-bold text-violet-600 uppercase tracking-widest flex items-center bg-violet-50 px-2 py-1 pl-3 rounded-lg border-l-2 border-violet-500 w-max mb-4">Call-to-Action Button</span>
                                            <div className="flex flex-col md:flex-row gap-4 items-center">
                                                <input type="text" value={block.data.text} onChange={(e) => updateBlock(block.id, { text: e.target.value })} placeholder="Button Text (e.g. Read More)" className="w-full md:w-1/3 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none shadow-sm focus:border-violet-300" />
                                                <input type="url" value={block.data.url} onChange={(e) => updateBlock(block.id, { url: e.target.value })} placeholder="Button URL (https://...)" className="w-full md:w-2/3 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none shadow-sm focus:border-violet-300" />
                                                <select value={block.data.style} onChange={(e) => updateBlock(block.id, { style: e.target.value })} className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-bold text-gray-700 outline-none w-full md:w-auto">
                                                    <option value="primary">Primary</option>
                                                    <option value="secondary">Secondary</option>
                                                    <option value="outline">Outline</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                    {block.type === 'html' && (
                                        <div className="pr-32">
                                            <span className="text-xs font-bold text-violet-600 uppercase tracking-widest flex items-center bg-violet-50 px-2 py-1 pl-3 rounded-lg border-l-2 border-violet-500 w-max mb-4">Custom HTML / Embed</span>
                                            <textarea value={block.data.code} onChange={(e) => updateBlock(block.id, { code: e.target.value })} placeholder="<iframe src='...' /> or custom <div>..." className="w-full bg-gray-900 text-gray-100 font-mono border border-gray-800 rounded-lg px-4 py-3 text-sm outline-none shadow-sm focus:border-violet-500 resize-y" rows={4}></textarea>
                                        </div>
                                    )}
                                    {block.type === 'faq' && (
                                        <div className="pr-32">
                                            <span className="text-xs font-bold text-violet-600 uppercase tracking-widest flex items-center bg-violet-50 px-2 py-1 pl-3 rounded-lg border-l-2 border-violet-500 w-max mb-4">FAQ / Accordion</span>
                                            <div className="space-y-4">
                                                {block.data.items?.map((item, idx) => (
                                                    <div key={idx} className="flex gap-3 items-start bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative group/faq">
                                                        <button type="button" onClick={() => updateBlock(block.id, { items: block.data.items.filter((_, i) => i !== idx) })} className="absolute -right-2 -top-2 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center opacity-0 group-hover/faq:opacity-100 transition-opacity text-xs font-bold shadow-sm hover:scale-110">×</button>
                                                        <span className="font-extrabold text-gray-300 select-none mt-2">{idx + 1}.</span>
                                                        <div className="flex-1 space-y-3">
                                                            <input type="text" value={item.q} onChange={e => { const newItems = [...block.data.items]; newItems[idx].q = e.target.value; updateBlock(block.id, { items: newItems }) }} placeholder="Question?" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold outline-none focus:border-violet-400 focus:bg-white transition-colors" />
                                                            <textarea value={item.a} onChange={e => { const newItems = [...block.data.items]; newItems[idx].a = e.target.value; updateBlock(block.id, { items: newItems }) }} placeholder="Answer..." className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-violet-400 focus:bg-white transition-colors block text-gray-700 resize-y" rows={2}></textarea>
                                                        </div>
                                                    </div>
                                                ))}
                                                <button type="button" onClick={() => updateBlock(block.id, { items: [...(block.data.items || []), { q: '', a: '' }] })} className="w-full bg-violet-50 hover:bg-violet-100 text-violet-700 font-bold text-xs py-2 rounded-xl border border-violet-200 transition-colors shadow-sm">+ Add Q&A Item</button>
                                            </div>
                                        </div>
                                    )}
                                    {block.type === 'callout' && (
                                        <div className="pr-32">
                                            <span className="text-xs font-bold text-violet-600 uppercase tracking-widest flex items-center bg-violet-50 px-2 py-1 pl-3 rounded-lg border-l-2 border-violet-500 w-max mb-4">Callout Box</span>
                                            <div className="flex flex-col md:flex-row gap-4 items-start">
                                                <select value={block.data.style} onChange={(e) => updateBlock(block.id, { style: e.target.value })} className="bg-white border text-sm font-bold text-gray-700 px-4 py-3 rounded-xl shadow-sm outline-none w-full md:w-auto" style={{
                                                    borderColor: block.data.style === 'info' ? '#3b82f6' : block.data.style === 'success' ? '#10b981' : block.data.style === 'warning' ? '#f59e0b' : '#ef4444'
                                                }}>
                                                    <option value="info">💡 Info</option>
                                                    <option value="success">✅ Success</option>
                                                    <option value="warning">⚠️ Warning</option>
                                                    <option value="danger">🚨 Danger</option>
                                                </select>
                                                <textarea value={block.data.text} onChange={(e) => updateBlock(block.id, { text: e.target.value })} placeholder="Callout message..." className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none shadow-sm focus:border-violet-400 resize-y" rows={2}></textarea>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {blocks.length === 0 && (
                                <div className="text-center py-16 bg-white border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">🧩</div>
                                    <p className="text-gray-900 font-extrabold text-lg">No content sections yet</p>
                                    <p className="text-sm text-gray-500 font-medium">Click a button below to start adding blocks to your article.</p>
                                </div>
                            )}
                        </div>

                        <div className="p-4 bg-gray-50/80 border-t border-gray-100 flex flex-wrap gap-3 justify-center">
                            <button type="button" onClick={() => addBlock('header')} className="btn-secondary py-2 px-4 shadow-sm text-sm bg-white hover:bg-gray-50 font-bold tracking-tight">+ Header</button>
                            <button type="button" onClick={() => addBlock('text')} className="btn-secondary py-2 px-4 shadow-sm text-sm bg-white hover:bg-gray-50 font-bold tracking-tight">+ Text Editor</button>
                            <button type="button" onClick={() => addBlock('image')} className="btn-secondary py-2 px-4 shadow-sm text-sm bg-white hover:bg-gray-50 font-bold tracking-tight">+ Image</button>
                            <button type="button" onClick={() => addBlock('video')} className="btn-secondary py-2 px-4 shadow-sm text-sm bg-white hover:bg-gray-50 font-bold tracking-tight">+ Video</button>
                            <button type="button" onClick={() => addBlock('quote')} className="btn-secondary py-2 px-4 shadow-sm text-sm bg-white hover:bg-gray-50 font-bold tracking-tight">+ Quote</button>
                            <button type="button" onClick={() => addBlock('button')} className="btn-secondary py-2 px-4 shadow-sm text-sm bg-white hover:bg-gray-50 font-bold tracking-tight">+ CTA Button</button>
                            <button type="button" onClick={() => addBlock('html')} className="btn-secondary py-2 px-4 shadow-sm text-sm bg-white hover:bg-gray-50 font-bold tracking-tight">+ Custom HTML</button>
                            <button type="button" onClick={() => addBlock('divider')} className="btn-secondary py-2 px-4 shadow-sm text-sm bg-white hover:bg-gray-50 font-bold tracking-tight">+ Divider</button>
                            <button type="button" onClick={() => addBlock('faq')} className="btn-secondary py-2 px-4 shadow-sm text-sm bg-white hover:bg-gray-50 font-bold tracking-tight">+ FAQ</button>
                            <button type="button" onClick={() => addBlock('callout')} className="btn-secondary py-2 px-4 shadow-sm text-sm bg-white hover:bg-gray-50 font-bold tracking-tight">+ Callout Box</button>
                        </div>
                        {/* Scope CSS to make default Quill blocks look seamless */}
                        <style suppressHydrationWarning>{`
                            .learning-editor-shell .quill { display: flex; flex-direction: column; background: transparent; border-radius: 1.25rem; }
                            .learning-editor-shell .ql-toolbar {
                                position: sticky;
                                top: 0;
                                z-index: 5;
                                border: none !important;
                                border-bottom: 1px solid #e2e8f0 !important;
                                background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
                                padding: 14px 18px !important;
                                border-top-left-radius: 1rem !important;
                                border-top-right-radius: 1rem !important;
                            }
                            .learning-editor-shell .ql-container {
                                border: none !important;
                                font-family: Georgia, "Times New Roman", serif !important;
                                font-size: 1.05rem !important;
                            }
                            .learning-editor-shell .ql-editor {
                                padding: 40px 36px !important;
                                min-height: 260px;
                                line-height: 1.9 !important;
                                color: #0f172a;
                            }
                            .learning-editor-shell .ql-editor p,
                            .learning-editor-shell .ql-editor ol,
                            .learning-editor-shell .ql-editor ul,
                            .learning-editor-shell .ql-editor blockquote,
                            .learning-editor-shell .ql-editor pre {
                                margin-bottom: 1em;
                            }
                            .learning-editor-shell .ql-editor h1,
                            .learning-editor-shell .ql-editor h2,
                            .learning-editor-shell .ql-editor h3,
                            .learning-editor-shell .ql-editor h4 {
                                color: #020617;
                                font-weight: 800;
                                line-height: 1.25;
                                margin: 1.6em 0 0.7em;
                            }
                            .learning-editor-shell .ql-editor blockquote {
                                border-left: 4px solid #8b5cf6;
                                padding-left: 1rem;
                                color: #475569;
                                font-style: italic;
                            }
                            .learning-editor-shell .ql-editor .ql-align-center { text-align: center; }
                            .learning-editor-shell .ql-editor .ql-align-right { text-align: right; }
                            .learning-editor-shell .ql-editor .ql-align-justify { text-align: justify; }
                            .learning-editor-shell .ql-editor .ql-align-center img {
                                display: block;
                                margin-left: auto;
                                margin-right: auto;
                            }
                            .learning-editor-shell .ql-editor .ql-align-right img {
                                display: block;
                                margin-left: auto;
                                margin-right: 0;
                            }
                        `}</style>
                    </div>

                    {/* Submit Bar */}
                    <div className="bg-white border text-gray-900 border-gray-100 rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-wrap gap-6 items-center justify-between">
                        <div className="flex gap-8">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={formData.isPublished}
                                        onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                                    />
                                    <div className={`block w-14 h-8 rounded-full transition-colors ${formData.isPublished ? 'bg-emerald-500' : 'bg-gray-200'}`}></div>
                                    <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${formData.isPublished ? 'translate-x-6' : ''}`}></div>
                                </div>
                                <div>
                                    <span className="block text-sm font-bold text-gray-900">Publish Immediately</span>
                                    <span className="block text-xs font-medium text-gray-500">Live on the public site</span>
                                </div>
                            </label>
                            
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={formData.showToc}
                                        onChange={(e) => setFormData({ ...formData, showToc: e.target.checked })}
                                    />
                                    <div className={`block w-14 h-8 rounded-full transition-colors ${formData.showToc ? 'bg-violet-500' : 'bg-gray-200'}`}></div>
                                    <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${formData.showToc ? 'translate-x-6' : ''}`}></div>
                                </div>
                                <div>
                                    <span className="block text-sm font-bold text-gray-900">Show Table of Contents</span>
                                    <span className="block text-xs font-medium text-gray-500">Sticky TOC side panel</span>
                                </div>
                            </label>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link href="/admin/learning-hub" className="text-gray-500 font-bold text-sm hover:text-gray-800 transition-colors">Cancel</Link>
                            <button
                                type="submit"
                                disabled={saving}
                                className="btn-primary py-3 px-8 shadow-sm disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Save Article'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}
