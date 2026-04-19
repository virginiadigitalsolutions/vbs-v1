'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { showError, showSuccess } from '@/lib/swal'
import SectionFormBuilder from '@/components/admin/SectionFormBuilder'
import { HiOutlineEye, HiOutlinePencil, HiOutlineChevronUp, HiOutlineChevronDown, HiOutlineSparkles } from 'react-icons/hi'

const sectionMeta = {
    hero: { emoji: '🦸', label: 'Hero Banner', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    text: { emoji: '📄', label: 'Text Block', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    cards: { emoji: '🃏', label: 'Card Layout', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
    cta: { emoji: '📣', label: 'Call to Action', color: 'bg-pink-50 text-pink-700 border-pink-200' },
}

const layoutLabels = {
    ds_hero: 'Digital Skills Hero',
    ds_skill_clusters: 'Core Skill Clusters',
    ds_evaluation: 'Skill Evaluation Criteria',
    ds_ai_impact: 'AI Impact Analysis',
    ds_mistakes: 'Common Mistakes',
    ds_where_next: 'Where to Go Next',
}

export default function AdminDigitalSkillsPage() {
    const [sections, setSections] = useState([])
    const [loading, setLoading] = useState(true)
    const [pageData, setPageData] = useState(null)
    const [editingId, setEditingId] = useState(null)

    useEffect(() => {
        async function load() {
            try {
                // First get the digital-skills page ID
                const pagesRes = await fetch('/api/admin/pages')
                const pages = await pagesRes.json()
                const dsPage = pages.find(p => p.slug === 'digital-skills')

                if (!dsPage) {
                    setLoading(false)
                    return
                }

                setPageData(dsPage)

                // Then fetch sections for this page
                const secRes = await fetch(`/api/admin/sections?pageId=${dsPage.id}`)
                const secs = await secRes.json()
                setSections(secs)
            } catch (err) {
                showError('Failed to load page data')
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    async function handleToggle(id, isActive) {
        try {
            await fetch(`/api/admin/sections/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isActive }),
            })
            setSections(prev => prev.map(s => (s.id === id ? { ...s, isActive } : s)))
            showSuccess(isActive ? 'Section activated' : 'Section set to draft')
        } catch {
            showError('Failed to update section')
        }
    }

    async function handleSave(id, data) {
        try {
            await fetch(`/api/admin/sections/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data }),
            })
            setSections(prev => prev.map(s => (s.id === id ? { ...s, data } : s)))
            setEditingId(null)
            showSuccess('Section updated!')
        } catch {
            showError('Failed to save section')
        }
    }

    async function handleMove(id, direction) {
        const sorted = [...sections].sort((a, b) => a.order - b.order)
        const idx = sorted.findIndex(s => s.id === id)
        const swapIdx = direction === 'up' ? idx - 1 : idx + 1
        if (swapIdx < 0 || swapIdx >= sorted.length) return

        const current = sorted[idx]
        const swap = sorted[swapIdx]

        try {
            await Promise.all([
                fetch(`/api/admin/sections/${current.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ order: swap.order }),
                }),
                fetch(`/api/admin/sections/${swap.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ order: current.order }),
                }),
            ])

            setSections(prev =>
                prev.map(s => {
                    if (s.id === current.id) return { ...s, order: swap.order }
                    if (s.id === swap.id) return { ...s, order: current.order }
                    return s
                })
            )
        } catch {
            showError('Failed to reorder')
        }
    }

    const sorted = [...sections].sort((a, b) => a.order - b.order)

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-gray-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-500 font-bold text-sm">Loading Digital Skills page...</p>
                </div>
            </div>
        )
    }

    if (!pageData) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-20 text-center animate-fade-up">
                <p className="text-5xl mb-4">📄</p>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Page Not Found</h2>
                <p className="text-gray-500 font-medium mb-6">The Digital Skills page hasn&apos;t been seeded yet.</p>
                <p className="text-sm text-gray-400 font-mono bg-gray-50 inline-block px-4 py-2 rounded-xl border">
                    Run: node scripts/seed-digital-skills.js
                </p>
            </div>
        )
    }

    return (
        <div className="w-full">
            <div className="max-w-4xl mx-auto px-6 py-10 animate-fade-up">
                {/* Header */}
                <div className="mb-10 bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary-50/60 rounded-bl-full -z-10" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-50/40 rounded-tr-full -z-10" />

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl">🎯</span>
                                <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Digital Skills</h1>
                            </div>
                            <p className="text-gray-500 font-medium text-sm max-w-lg">
                                Manage all sections of the Digital Skills page. Edit content, reorder sections, and toggle visibility.
                            </p>
                            <div className="flex items-center gap-3 mt-3">
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${pageData.isPublished ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                                    {pageData.isPublished ? 'Published' : 'Draft'}
                                </span>
                                <span className="text-xs font-bold text-gray-400">{sorted.length} Sections</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <Link
                                href="/digital-skills"
                                target="_blank"
                                className="px-5 py-2.5 text-xs font-bold text-gray-600 bg-gray-50 border border-gray-200 hover:bg-white hover:border-gray-300 hover:text-gray-900 rounded-xl transition-all flex items-center gap-2"
                            >
                                <HiOutlineEye className="text-sm" />
                                Preview Page
                            </Link>
                            <Link
                                href="/admin/pages"
                                className="px-5 py-2.5 text-xs font-bold text-gray-500 bg-white border border-gray-200 hover:border-gray-300 rounded-xl transition-all"
                            >
                                ← All Pages
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Page Meta Info */}
                <div className="mb-8 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">SEO Settings</h3>
                    <div className="space-y-3">
                        <div>
                            <p className="text-[11px] font-bold text-gray-400 mb-1">Title Tag</p>
                            <p className="text-sm font-medium text-gray-800 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100">{pageData.title}</p>
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-gray-400 mb-1">Meta Description</p>
                            <p className="text-sm font-medium text-gray-800 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100">{pageData.metaDesc}</p>
                        </div>
                    </div>
                </div>

                {/* Sections List */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        <HiOutlineSparkles className="text-primary-500" />
                        Page Sections ({sorted.length})
                    </h3>

                    {sorted.map((section, idx) => {
                        const meta = sectionMeta[section.type] || sectionMeta.text
                        const layoutLabel = section.data?.layout ? layoutLabels[section.data.layout] : null
                        const isEditing = editingId === section.id
                        const heading = section.data?.heading?.replace('|', ' ') || 'Untitled'

                        return (
                            <div
                                key={section.id}
                                className={`bg-white border rounded-2xl shadow-sm transition-all duration-300 animate-fade-up ${
                                    !section.isActive
                                        ? 'opacity-60 border-gray-200 bg-gray-50/50'
                                        : isEditing
                                            ? 'border-primary-300 shadow-md shadow-primary-500/5'
                                            : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
                                }`}
                                style={{ animationDelay: `${idx * 0.05}s` }}
                            >
                                {/* Section Header */}
                                <div className="flex items-center justify-between px-6 py-5 gap-3">
                                    <div className="flex items-center gap-4 min-w-0">
                                        {/* Order badge */}
                                        <span className="w-8 h-8 flex items-center justify-center rounded-xl bg-primary-50 border border-primary-100 text-primary-700 font-extrabold text-sm shrink-0">
                                            {section.order}
                                        </span>

                                        {/* Info */}
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                <h4 className="font-bold text-gray-900 text-sm truncate">
                                                    {layoutLabel || heading}
                                                </h4>
                                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${meta.color}`}>
                                                    {meta.emoji} {meta.label}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-400 font-medium truncate max-w-md">
                                                {heading.length > 60 ? heading.slice(0, 60) + '...' : heading}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Controls */}
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        {/* Move controls */}
                                        <button
                                            onClick={() => handleMove(section.id, 'up')}
                                            disabled={idx === 0}
                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-20 transition-colors"
                                        >
                                            <HiOutlineChevronUp className="text-sm" />
                                        </button>
                                        <button
                                            onClick={() => handleMove(section.id, 'down')}
                                            disabled={idx === sorted.length - 1}
                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-20 transition-colors"
                                        >
                                            <HiOutlineChevronDown className="text-sm" />
                                        </button>

                                        {/* Toggle */}
                                        <button
                                            onClick={() => handleToggle(section.id, !section.isActive)}
                                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                                                section.isActive
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                                    : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'
                                            }`}
                                        >
                                            {section.isActive ? 'Active' : 'Draft'}
                                        </button>

                                        {/* Edit */}
                                        <button
                                            onClick={() => setEditingId(isEditing ? null : section.id)}
                                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all flex items-center gap-1.5 ${
                                                isEditing
                                                    ? 'bg-gray-900 text-white border-gray-900'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300 hover:text-primary-600'
                                            }`}
                                        >
                                            <HiOutlinePencil className="text-xs" />
                                            {isEditing ? 'Close' : 'Edit'}
                                        </button>
                                    </div>
                                </div>

                                {/* Inline Editor */}
                                {isEditing && (
                                    <SectionFormBuilder
                                        section={section}
                                        onSave={handleSave}
                                        onCancel={() => setEditingId(null)}
                                    />
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
