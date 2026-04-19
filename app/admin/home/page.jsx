'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { showError, showSuccess } from '@/lib/swal'
import SectionFormBuilder from '@/components/admin/SectionFormBuilder'
import { HiOutlineEye, HiOutlinePencil, HiOutlineChevronUp, HiOutlineChevronDown, HiOutlineSparkles, HiOutlineHome, HiOutlineGlobe } from 'react-icons/hi'

const sectionMeta = {
    hero: { emoji: '🦸', label: 'Hero Banner', color: 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-700/30' },
    text: { emoji: '📄', label: 'Text Block', color: 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-700/30' },
    cards: { emoji: '🃏', label: 'Card Layout', color: 'bg-cyan-50 text-cyan-600 border-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-400 dark:border-cyan-700/30' },
    cta: { emoji: '📣', label: 'Call to Action', color: 'bg-pink-50 text-pink-600 border-pink-200 dark:bg-pink-900/20 dark:text-pink-400 dark:border-pink-700/30' },
}

const layoutLabels = {
    home_hero: 'Home Hero',
    home_cards_who: 'Who We Serve',
    home_text_why: 'Why Choosing Digital Skills...',
    home_cards_framework: 'A Clear Framework',
    home_text_evaluation: 'How Recommendations...',
    home_cta: 'Explore CTA',
    home_audience: 'Who We Serve',
    home_challenge: 'The Challenge',
    home_framework: 'Our Framework',
    home_standards: 'Our Standards',
}

export default function AdminHomePage() {
    const [sections, setSections] = useState([])
    const [loading, setLoading] = useState(true)
    const [pageData, setPageData] = useState(null)
    const [editingId, setEditingId] = useState(null)

    useEffect(() => {
        async function load() {
            try {
                const pagesRes = await fetch('/api/admin/pages')
                const pages = await pagesRes.json()
                const homePage = pages.find(p => p.slug === 'home')

                if (!homePage) {
                    setLoading(false)
                    return
                }

                setPageData(homePage)

                const secRes = await fetch(`/api/admin/sections?pageId=${homePage.id}`)
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

    /* ── Loading State ── */
    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-10">
                {/* Skeleton Header */}
                <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-8 animate-pulse">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl" />
                        <div className="space-y-2 flex-1">
                            <div className="h-5 bg-gray-100 rounded-lg w-40" />
                            <div className="h-3 bg-gray-50 rounded-lg w-64" />
                        </div>
                    </div>
                </div>
                {/* Skeleton Cards */}
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 mb-4 animate-pulse">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg" />
                            <div className="space-y-2 flex-1">
                                <div className="h-4 bg-gray-100 rounded-lg w-48" />
                                <div className="h-3 bg-gray-50 rounded-lg w-32" />
                            </div>
                            <div className="flex gap-2">
                                <div className="w-16 h-7 bg-gray-100 rounded-lg" />
                                <div className="w-14 h-7 bg-gray-100 rounded-lg" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    /* ── Empty State ── */
    if (!pageData) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-20 text-center">
                <div className="bg-white rounded-2xl border border-gray-100 p-12 shadow-sm">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                        <HiOutlineHome className="text-2xl text-gray-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Page Not Found</h2>
                    <p className="text-gray-500 text-sm mb-6">The Home page hasn&apos;t been seeded yet.</p>
                    <p className="text-xs text-gray-400 font-mono bg-gray-50 inline-block px-4 py-2 rounded-xl border border-gray-100">
                        Run: node prisma/seed-vbs.js
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full">
            <div className="max-w-4xl mx-auto px-6 py-10">

                {/* ── Header Card ── */}
                <div className="mb-8 bg-white border border-gray-100 rounded-2xl p-7 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center shrink-0">
                                <HiOutlineHome className="text-lg text-primary-600" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 tracking-tight">Home Page</h1>
                                <p className="text-gray-500 text-sm mt-0.5">
                                    Manage sections, content, and visibility.
                                </p>
                                <div className="flex items-center gap-3 mt-2.5">
                                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${pageData.isPublished ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                                        {pageData.isPublished ? 'Published' : 'Draft'}
                                    </span>
                                    <span className="text-xs font-semibold text-gray-400">{sorted.length} sections</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <Link
                                href="/"
                                target="_blank"
                                className="px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-200 hover:bg-white hover:border-gray-300 rounded-xl transition-all flex items-center gap-1.5"
                            >
                                <HiOutlineEye className="text-sm" />
                                Preview
                            </Link>
                            <Link
                                href="/admin/pages"
                                className="px-4 py-2 text-xs font-semibold text-gray-500 bg-white border border-gray-200 hover:border-gray-300 rounded-xl transition-all"
                            >
                                ← All Pages
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ── SEO Settings — Compact Inline ── */}
                <div className="mb-8 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <HiOutlineGlobe className="text-sm" />
                        SEO Settings
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">Title Tag</p>
                            <p className="text-sm font-medium text-gray-800 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 truncate">{pageData.title}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">Meta Description</p>
                            <p className="text-sm font-medium text-gray-800 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 truncate">{pageData.metaDesc}</p>
                        </div>
                    </div>
                </div>

                {/* ── Sections List ── */}
                <div className="space-y-3">
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2 mb-1">
                        <HiOutlineSparkles className="text-sm text-primary-500" />
                        Page Sections ({sorted.length})
                    </h3>

                    {sorted.map((section, idx) => {
                        const meta = sectionMeta[section.type] || sectionMeta.text
                        const layoutLabel = section.data?.layout ? layoutLabels[section.data.layout] : null
                        const isEditing = editingId === section.id
                        const heading = section.data?.heading || section.data?.leftHeading || 'Untitled'
                        const displayHeading = heading.replace('|', ' ')

                        return (
                            <div
                                key={section.id}
                                className={`bg-white border rounded-2xl transition-all duration-200 ${
                                    !section.isActive
                                        ? 'opacity-50 border-gray-200 bg-gray-50/30'
                                        : isEditing
                                            ? 'border-primary-200 shadow-md ring-1 ring-primary-100'
                                            : 'border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md'
                                }`}
                            >
                                <div className="flex items-center justify-between px-5 py-4 gap-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        {/* Order Badge */}
                                        <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-50 border border-gray-100 text-gray-500 font-bold text-xs shrink-0">
                                            {section.order}
                                        </span>

                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                                <h4 className="font-semibold text-gray-900 text-sm truncate">
                                                    {layoutLabel || displayHeading}
                                                </h4>
                                                <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-bold border ${meta.color}`}>
                                                    {meta.emoji} {meta.label}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-400 truncate max-w-sm">
                                                {displayHeading.length > 50 ? displayHeading.slice(0, 50) + '...' : displayHeading}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 shrink-0">
                                        {/* Move Buttons */}
                                        <button
                                            onClick={() => handleMove(section.id, 'up')}
                                            disabled={idx === 0}
                                            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-600 disabled:opacity-20 transition-colors"
                                        >
                                            <HiOutlineChevronUp className="text-sm" />
                                        </button>
                                        <button
                                            onClick={() => handleMove(section.id, 'down')}
                                            disabled={idx === sorted.length - 1}
                                            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-600 disabled:opacity-20 transition-colors"
                                        >
                                            <HiOutlineChevronDown className="text-sm" />
                                        </button>

                                        {/* Toggle Switch */}
                                        <button
                                            onClick={() => handleToggle(section.id, !section.isActive)}
                                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ml-1 ${
                                                section.isActive ? 'bg-emerald-500' : 'bg-gray-300'
                                            }`}
                                        >
                                            <span
                                                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow-sm ${
                                                    section.isActive ? 'translate-x-4' : 'translate-x-0.5'
                                                }`}
                                            />
                                        </button>

                                        {/* Edit Button */}
                                        <button
                                            onClick={() => setEditingId(isEditing ? null : section.id)}
                                            className={`ml-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition-all flex items-center gap-1 ${
                                                isEditing
                                                    ? 'bg-gray-900 text-white border-gray-900'
                                                    : 'bg-white text-gray-500 border-gray-200 hover:border-primary-200 hover:text-primary-600'
                                            }`}
                                        >
                                            <HiOutlinePencil className="text-xs" />
                                            {isEditing ? 'Close' : 'Edit'}
                                        </button>
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="border-t border-gray-100">
                                        <SectionFormBuilder
                                            section={section}
                                            onSave={handleSave}
                                            onCancel={() => setEditingId(null)}
                                        />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
