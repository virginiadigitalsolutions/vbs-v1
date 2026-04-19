'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { showWarning, showError, showSuccess } from '@/lib/swal'

import SectionFormBuilder from '@/components/admin/SectionFormBuilder'
import { SECTION_TEMPLATES } from '@/lib/section-templates'
import { HiOutlineCheckCircle, HiOutlineStar } from 'react-icons/hi'

const typeLabels = {
    hero: '🦸 Hero Breakout',
    cards: '🃏 Content Cards',
    text: '📄 Dynamic Text',
    cta: '📣 Call to Action',
}

// Visual preview renderer — shows a structural mockup of the template data
function PreviewRenderer({ template }) {
    const d = template.data
    const isHero = template.category === 'hero'
    const isDark = isHero

    return (
        <div className="space-y-4">
            {/* Tag */}
            {d.tag && (
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-full">
                    {d.tag}
                </span>
            )}

            {/* Heading */}
            {d.heading && (
                <h3 className={`text-xl font-extrabold tracking-tight leading-tight ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                    {d.heading.replace('|', ' ')}
                </h3>
            )}

            {/* Subheading */}
            {d.subheading && (
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{d.subheading}</p>
            )}

            {/* Cards Preview */}
            {d.cards && d.cards.length > 0 && (
                <div className={`grid gap-3 ${d.cards.length <= 2 ? 'grid-cols-2' : d.cards.length === 4 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                    {d.cards.map((card, i) => (
                        <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-left">
                            <p className="text-xs font-bold text-gray-800 mb-1">{card.title || card.name || card.value || card.level || `Card ${i + 1}`}</p>
                            {card.description && <p className="text-[10px] text-gray-500 font-medium line-clamp-2">{card.description}</p>}
                            {card.quote && <p className="text-[10px] text-gray-500 font-medium italic line-clamp-2">&ldquo;{card.quote}&rdquo;</p>}
                            {card.price && <p className="text-sm font-black text-gray-900 mt-1">{card.price}<span className="text-[10px] text-gray-400 font-medium">{card.period}</span></p>}
                            {card.features && (
                                <ul className="mt-1.5 space-y-0.5">
                                    {card.features.slice(0, 3).map((f, j) => (
                                        <li key={j} className="text-[9px] text-gray-500 flex items-center gap-1">
                                            <HiOutlineCheckCircle className="text-green-500 text-[10px] shrink-0" /> {f}
                                        </li>
                                    ))}
                                    {card.features.length > 3 && <li className="text-[9px] text-gray-400">+{card.features.length - 3} more</li>}
                                </ul>
                            )}
                            {card.rating && (
                                <div className="flex gap-0.5 mt-1">
                                    {Array.from({ length: card.rating }).map((_, j) => <HiOutlineStar key={j} className="text-amber-400 text-[10px]" />)}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* FAQ Items Preview */}
            {d.items && d.items.length > 0 && (
                <div className="space-y-2">
                    {d.items.slice(0, 3).map((item, i) => (
                        <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                            <p className="text-xs font-bold text-gray-800">{item.question || item.title || `${item.year}: ${item.title}`}</p>
                            {item.answer && <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">{item.answer}</p>}
                            {item.description && <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">{item.description}</p>}
                        </div>
                    ))}
                    {d.items.length > 3 && <p className="text-[10px] text-gray-400 font-medium text-center">+{d.items.length - 3} more items</p>}
                </div>
            )}

            {/* Body text */}
            {d.body && !d.cards && (
                <div className="text-xs text-gray-600 font-medium leading-relaxed bg-gray-50 border border-gray-200 rounded-xl p-3" dangerouslySetInnerHTML={{ __html: d.body }} />
            )}

            {/* Checklist */}
            {d.checklist && (
                <ul className="space-y-1.5">
                    {d.checklist.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                            <HiOutlineCheckCircle className="text-green-500 text-sm shrink-0" /> {item}
                        </li>
                    ))}
                </ul>
            )}

            {/* CTA buttons */}
            {(d.ctaText || d.secondaryCtaText) && (
                <div className="flex gap-2 pt-2">
                    {d.ctaText && <span className="text-[10px] font-bold bg-cyan-500 text-white px-3 py-1.5 rounded-lg">{d.ctaText}</span>}
                    {d.secondaryCtaText && <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg border">{d.secondaryCtaText}</span>}
                </div>
            )}

            {/* Footer text */}
            {d.footerText && (
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pt-2 border-t border-gray-100">{d.footerText}</p>
            )}
        </div>
    )
}

function SectionRow({ section, onToggle, onSave, onMoveUp, onMoveDown, isFirst, isLast }) {
    const [editing, setEditing] = useState(false)

    async function handleSaveData(id, data) {
        await onSave(id, data)
        setEditing(false)
    }

    return (
        <div className={`bg-white border border-gray-100 rounded-[1.25rem] shadow-sm transition-all duration-300 ${!section.isActive ? 'opacity-60 bg-gray-50 grayscale pt-0' : 'hover:border-cyan-200 hover:shadow-md'}`}>
            <div className="flex items-center justify-between px-6 py-5 gap-4">
                {/* Order + type */}
                <div className="flex items-center gap-4">
                    <span className="w-8 h-8 flex items-center justify-center rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-700 font-extrabold text-sm shadow-sm">
                        {section.order}
                    </span>
                    <span className="font-extrabold text-gray-900 text-lg">
                        {typeLabels[section.type] || section.type}
                    </span>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2 flex-wrap justify-end">
                    <button
                        onClick={() => onMoveUp(section.id)}
                        disabled={isFirst}
                        className="px-2.5 py-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30 text-sm font-bold transition-colors"
                        title="Move up"
                    >↑</button>
                    <button
                        onClick={() => onMoveDown(section.id)}
                        disabled={isLast}
                        className="px-2.5 py-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30 text-sm font-bold transition-colors"
                        title="Move down"
                    >↓</button>

                    <button
                        onClick={() => onToggle(section.id, !section.isActive)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${section.isActive
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm hover:bg-emerald-100'
                            : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'
                            }`}
                    >
                        {section.isActive ? 'Active' : 'Draft'}
                    </button>

                    <button
                        onClick={() => setEditing(!editing)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all shadow-sm ${editing ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200 hover:border-cyan-300 hover:text-cyan-700'}`}
                    >
                        {editing ? 'Close Editor' : 'Edit Block'}
                    </button>
                </div>
            </div>

            {/* Visual CMS Editor */}
            {editing && (
                <SectionFormBuilder
                    section={section}
                    onSave={handleSaveData}
                    onCancel={() => setEditing(false)}
                />
            )}
        </div>
    )
}

function SectionsManager() {
    const [sections, setSections] = useState([])
    const [loading, setLoading] = useState(true)
    const [addingTemplate, setAddingTemplate] = useState(false)
    const [isPosting, setIsPosting] = useState(false)
    const [previewTemplate, setPreviewTemplate] = useState(null)
    const [templateSearch, setTemplateSearch] = useState('')
    const [templateCategory, setTemplateCategory] = useState('all')
    const searchParams = useSearchParams()
    const pageId = searchParams.get('pageId')

    useEffect(() => {
        const url = pageId ? `/api/admin/sections?pageId=${pageId}` : '/api/admin/sections'
        fetch(url)
            .then((r) => r.json())
            .then(setSections)
            .finally(() => setLoading(false))
    }, [pageId])

    async function handleToggle(id, isActive) {
        await fetch(`/api/admin/sections/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isActive }),
        })
        setSections((prev) =>
            prev.map((s) => (s.id === id ? { ...s, isActive } : s)),
        )
    }

    async function handleSaveData(id, data) {
        await fetch(`/api/admin/sections/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data }),
        })
        setSections((prev) =>
            prev.map((s) => (s.id === id ? { ...s, data } : s)),
        )
    }

    async function handleMove(id, direction) {
        const sorted = [...sections].sort((a, b) => a.order - b.order)
        const idx = sorted.findIndex((s) => s.id === id)
        const swapIdx = direction === 'up' ? idx - 1 : idx + 1
        if (swapIdx < 0 || swapIdx >= sorted.length) return

        const current = sorted[idx]
        const swap = sorted[swapIdx]
        const newOrder = current.order
        const swapOrder = swap.order

        await Promise.all([
            fetch(`/api/admin/sections/${current.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ order: swapOrder }),
            }),
            fetch(`/api/admin/sections/${swap.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ order: newOrder }),
            }),
        ])

        setSections((prev) =>
            prev.map((s) => {
                if (s.id === current.id) return { ...s, order: swapOrder }
                if (s.id === swap.id) return { ...s, order: newOrder }
                return s
            }),
        )
    }

    const sorted = [...sections].sort((a, b) => a.order - b.order)

    async function handleAddTemplate(template) {
        setIsPosting(true)
        try {
            // Need the actual page ID we are mutating. If not passed in URL, we fetched the `home` page in GET but our POST requires explicit pageId.
            // A quick fix is extracting the pageId from the first existing section, but if 0 sections exist, we need to pass it strictly.
            // For now, let's parse the actual pageId from the `sections[0]` or just require pageId in URL properly.
            // Since we know the admin list passes pageId to the URL, we can safely grab it if exists.

            // To be totally bulletproof across all phases:
            const targetPageId = pageId || (sections.length > 0 ? sections[0].pageId : null)

            if (!targetPageId) {
                showWarning('Cannot add sections without a defined Page ID. Please navigate from the Pages dashboard.')
                setIsPosting(false)
                return
            }

            const res = await fetch(`/api/admin/sections`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pageId: targetPageId,
                    type: template.type,
                    data: template.data
                })
            })

            if (!res.ok) throw new Error("Failed to create section")
            const newSec = await res.json()

            setSections(prev => [...prev, newSec])
            setAddingTemplate(false)
            showSuccess('Section added successfully!')
        } catch (err) {
            showError(err.message)
        } finally {
            setIsPosting(false)
        }
    }

    return (
        <div className="w-full">
            <div className="max-w-3xl mx-auto px-6 py-10 animate-fade-up">
                <div className="mb-8 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Manage Sections</h1>
                    <p className="text-gray-500 font-medium text-sm mt-2">
                        Reorder, toggle visibility, or edit the content of each section. Changes are live immediately.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-gray-400 font-bold text-lg">Loading sections...</div>
                ) : (
                    <div className="space-y-5">
                        {sorted.map((section, idx) => (
                            <div className={`animate-fade-up stagger-${(idx % 6) + 1}`} key={section.id}>
                                <SectionRow
                                    section={section}
                                    onToggle={handleToggle}
                                    onSave={handleSaveData}
                                    onMoveUp={() => handleMove(section.id, 'up')}
                                    onMoveDown={() => handleMove(section.id, 'down')}
                                    isFirst={idx === 0}
                                    isLast={idx === sorted.length - 1}
                                />
                            </div>
                        ))}

                        {/* Add Section Button */}
                        <div className="pt-4 flex justify-center animate-fade-up stagger-6">
                            <button
                                onClick={() => setAddingTemplate(true)}
                                className="group flex items-center justify-center gap-3 w-full max-w-md py-4 border-2 border-dashed border-gray-300 rounded-[1.25rem] text-gray-500 font-extrabold hover:border-cyan-400 hover:text-cyan-600 hover:bg-cyan-50/50 transition-all shadow-sm"
                            >
                                <span className="bg-gray-100 text-gray-400 group-hover:bg-cyan-100 group-hover:text-cyan-600 w-8 h-8 rounded-full flex items-center justify-center font-black transition-colors">+</span>
                                Add New Layout Block
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Layout Library Modal with Preview */}
            {addingTemplate && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden ring-1 ring-gray-900/5">

                        {/* Header */}
                        <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-white z-10">
                            <div>
                                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Layout Library</h2>
                                <p className="text-gray-500 text-sm mt-1 font-medium">Click a template to preview, then inject into your page.</p>
                            </div>
                            <button
                                onClick={() => { setAddingTemplate(false); setPreviewTemplate(null); setTemplateSearch(''); setTemplateCategory('all') }}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors font-bold text-xl"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Search + Category Tabs */}
                        <div className="px-8 py-4 border-b border-gray-50 bg-gray-50/50 flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                <input
                                    type="text"
                                    value={templateSearch}
                                    onChange={(e) => setTemplateSearch(e.target.value)}
                                    placeholder="Search layouts..."
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-400"
                                />
                            </div>
                            <div className="flex gap-1 bg-white p-1 rounded-xl border border-gray-100 shrink-0">
                                {['all', 'hero', 'cards', 'text', 'cta'].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setTemplateCategory(cat)}
                                        className={`px-3 py-2 rounded-lg text-xs font-bold capitalize transition-all ${templateCategory === cat
                                            ? 'bg-cyan-50 text-cyan-700 shadow-sm'
                                            : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        {cat === 'all' ? 'All' : cat === 'cta' ? 'CTA' : cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Body — Split view */}
                        <div className="flex-1 flex overflow-hidden min-h-0">
                            {/* Left: Template List */}
                            <div className="w-full sm:w-[45%] lg:w-[40%] overflow-y-auto border-r border-gray-100 p-4 space-y-2 bg-white">
                                {(() => {
                                    const filtered = SECTION_TEMPLATES.filter(t => {
                                        if (templateCategory !== 'all' && t.category !== templateCategory) return false
                                        if (templateSearch) {
                                            const q = templateSearch.toLowerCase()
                                            return t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
                                        }
                                        return true
                                    })

                                    if (filtered.length === 0) {
                                        return <p className="text-gray-400 text-sm font-medium text-center py-10">No templates found.</p>
                                    }

                                    return filtered.map(template => (
                                        <div
                                            key={template.id}
                                            onClick={() => setPreviewTemplate(template)}
                                            className={`p-4 rounded-2xl cursor-pointer transition-all border-2 ${previewTemplate?.id === template.id
                                                ? 'bg-cyan-50 border-cyan-400 shadow-md'
                                                : 'bg-white border-transparent hover:bg-gray-50 hover:border-gray-200'
                                                }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 ${previewTemplate?.id === template.id ? 'bg-cyan-100' : 'bg-gray-50'}`}>
                                                    {template.category === 'hero' ? '🦸' : template.category === 'cards' ? '🃏' : template.category === 'cta' ? '📣' : '📄'}
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className={`font-bold text-sm leading-tight ${previewTemplate?.id === template.id ? 'text-cyan-800' : 'text-gray-900'}`}>{template.name}</h4>
                                                    <p className="text-[11px] text-gray-500 font-medium mt-0.5 line-clamp-2">{template.description}</p>
                                                    <span className="inline-block mt-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50 px-2 py-0.5 rounded">{template.type}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                })()}
                            </div>

                            {/* Right: Preview Panel */}
                            <div className="hidden sm:flex flex-1 flex-col bg-gray-50 overflow-y-auto">
                                {previewTemplate ? (
                                    <>
                                        {/* Preview Header */}
                                        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                                            <div>
                                                <h3 className="font-extrabold text-gray-900 text-base">{previewTemplate.name}</h3>
                                                <p className="text-xs text-gray-500 font-medium">{previewTemplate.description}</p>
                                            </div>
                                            <button
                                                onClick={() => !isPosting && handleAddTemplate(previewTemplate)}
                                                disabled={isPosting}
                                                className="btn-primary text-sm py-2.5 px-5 shadow-lg disabled:opacity-50 flex items-center gap-2 shrink-0"
                                            >
                                                {isPosting ? (
                                                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Injecting...</>
                                                ) : (
                                                    <>⚡ Inject into Page</>
                                                )}
                                            </button>
                                        </div>

                                        {/* Live Preview */}
                                        <div className="flex-1 p-6">
                                            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                                                {/* Mini browser chrome */}
                                                <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-200">
                                                    <div className="flex gap-1.5">
                                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                                    </div>
                                                    <div className="flex-1 bg-white rounded-md px-3 py-1 text-[10px] text-gray-400 font-mono ml-3">
                                                        preview — {previewTemplate.type} block
                                                    </div>
                                                </div>

                                                {/* Preview Content */}
                                                <div className="p-6 space-y-4 max-h-[50vh] overflow-y-auto">
                                                    {/* Structural Preview */}
                                                    <PreviewRenderer template={previewTemplate} />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center text-center p-8">
                                        <div>
                                            <p className="text-5xl mb-4">👈</p>
                                            <h3 className="text-lg font-extrabold text-gray-400">Select a Layout</h3>
                                            <p className="text-sm text-gray-400 font-medium mt-1">Click any template to preview it here.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile: Inject button for selected template (when no right panel visible) */}
                        {previewTemplate && (
                            <div className="sm:hidden px-6 py-4 border-t border-gray-100 bg-white">
                                <button
                                    onClick={() => !isPosting && handleAddTemplate(previewTemplate)}
                                    disabled={isPosting}
                                    className="btn-primary w-full text-sm py-3"
                                >
                                    {isPosting ? 'Injecting...' : `⚡ Inject "${previewTemplate.name}"`}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default function AdminSectionsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-gray-400">Loading CMS...</div>}>
            <SectionsManager />
        </Suspense>
    )
}
