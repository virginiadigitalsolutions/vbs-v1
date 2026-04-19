'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

export default function SectionFormBuilder({ section, onSave, onCancel }) {
    const [data, setData] = useState(section.data || {})
    const [saving, setSaving] = useState(false)
    const layout = section.data?.layout || ''
    const isHomeHero = layout === 'home_hero'
    const isHomeAudience = layout === 'home_audience'
    const isHomeChallenge = layout === 'home_challenge'
    const isHomeFramework = layout === 'home_framework'
    const isHomeStandards = layout === 'home_standards'
    const isLearningHubHero = layout === 'learning_hub_hero'
    const isLearningHubFeed = layout === 'learning_hub_feed'

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        await onSave(section.id, data)
        setSaving(false)
    }

    const renderHeroForm = () => (
        <div className="space-y-5">
            <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Hero Heading</label>
                <input required type="text" value={data.heading || ''} onChange={e => setData({ ...data, heading: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all shadow-sm" placeholder="Enter headline..." />
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Subheading</label>
                <textarea required value={data.subheading || ''} onChange={e => setData({ ...data, subheading: e.target.value })} rows={3} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 resize-y transition-all shadow-sm" placeholder="Supporting text..." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Eyebrow / Tag</label>
                    <input type="text" value={data.tag || ''} onChange={e => setData({ ...data, tag: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all shadow-sm" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Primary CTA Text</label>
                    <input type="text" value={data.ctaText || ''} onChange={e => setData({ ...data, ctaText: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all shadow-sm" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Primary CTA Link</label>
                    <input type="text" value={data.ctaHref || ''} onChange={e => setData({ ...data, ctaHref: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all shadow-sm" placeholder="/destination" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Secondary CTA Text</label>
                    <input type="text" value={data.secondaryCtaText || ''} onChange={e => setData({ ...data, secondaryCtaText: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all shadow-sm" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Secondary CTA Link</label>
                    <input type="text" value={data.secondaryCtaHref || ''} onChange={e => setData({ ...data, secondaryCtaHref: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all shadow-sm" placeholder="/destination" />
                </div>
            </div>
            <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Background Image URL (Optional)</label>
                    <div className="flex gap-3">
                        <input type="text" value={data.bgImage || ''} onChange={e => setData({ ...data, bgImage: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all shadow-sm font-mono" placeholder="https://..." />
                        <button type="button" onClick={() => window.open('/admin/media', '_blank')} className="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200 hover:bg-indigo-100 transition-colors whitespace-nowrap">
                            Browse
                        </button>
                    </div>
                    <p className="text-[11px] font-medium text-gray-400 mt-2 ml-1">Overrides background with full cover image.</p>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Side Image URL (Optional)</label>
                    <div className="flex gap-3">
                        <input type="text" value={data.image || ''} onChange={e => setData({ ...data, image: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all shadow-sm font-mono" placeholder="https://..." />
                        <button type="button" onClick={() => window.open('/admin/media', '_blank')} className="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200 hover:bg-indigo-100 transition-colors whitespace-nowrap">
                            Browse
                        </button>
                    </div>
                    <p className="text-[11px] font-medium text-gray-400 mt-2 ml-1">Appears when content is Left or Right aligned.</p>
                </div>
            </div>
            <div className="pt-4 border-t border-gray-100">
                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Content Alignment</label>
                <select value={data.contentAlign || 'center'} onChange={e => setData({ ...data, contentAlign: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all shadow-sm">
                    <option value="left">Left Aligned</option>
                    <option value="center">Center Aligned</option>
                    <option value="right">Right Aligned</option>
                </select>
                <p className="text-[11px] font-medium text-gray-400 mt-2 ml-1">Controls how the text and buttons are horizontally positioned inside the banner block.</p>
            </div>

            {isHomeHero && (
                <div className="bg-white border text-gray-900 border-gray-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                        <div>
                            <label className="block text-sm font-bold text-gray-900">Animated Stats Panel</label>
                            <p className="text-xs font-medium text-gray-500 mt-0.5">These numbers animate on the hero banner.</p>
                        </div>
                        <button type="button" onClick={() => setData({ ...data, stats: [...(data.stats || []), { value: '', label: '' }] })} className="text-xs bg-indigo-50 text-indigo-700 font-bold px-4 py-2 border-indigo-200 hover:bg-indigo-100 border rounded-xl shadow-sm transition-colors">+ Add Stat</button>
                    </div>
                    <div className="space-y-3">
                        {(data.stats || []).map((stat, idx) => (
                            <div key={idx} className="grid grid-cols-1 sm:grid-cols-[140px_minmax(0,1fr)_auto] gap-3 items-center group">
                                <input type="text" value={stat.value || ''} onChange={e => {
                                    const stats = [...(data.stats || [])]
                                    stats[idx] = { ...stats[idx], value: e.target.value }
                                    setData({ ...data, stats })
                                }} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-bold text-gray-900 transition-all" placeholder="10K+" />
                                <input type="text" value={stat.label || ''} onChange={e => {
                                    const stats = [...(data.stats || [])]
                                    stats[idx] = { ...stats[idx], label: e.target.value }
                                    setData({ ...data, stats })
                                }} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" placeholder="Students Guided" />
                                <button type="button" onClick={() => setData({ ...data, stats: data.stats.filter((_, i) => i !== idx) })} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-lg transition-colors shadow-sm opacity-50 group-hover:opacity-100">✕</button>
                            </div>
                        ))}
                        {(!data.stats || data.stats.length === 0) && (
                            <div className="text-center py-4 text-xs font-bold text-gray-400">No stats configured. Add one to make the hero panel dynamic.</div>
                        )}
                    </div>
                </div>
            )}

            {isHomeHero && (
                <div className="bg-white border text-gray-900 border-gray-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                        <div>
                            <label className="block text-sm font-bold text-gray-900">Hero Trust Points</label>
                            <p className="text-xs font-medium text-gray-500 mt-0.5">Short chips shown under the hero actions for a more content-rich first fold.</p>
                        </div>
                        <button type="button" onClick={() => setData({ ...data, highlights: [...(data.highlights || []), ''] })} className="text-xs bg-indigo-50 text-indigo-700 font-bold px-4 py-2 border-indigo-200 hover:bg-indigo-100 border rounded-xl shadow-sm transition-colors">+ Add Point</button>
                    </div>
                    <div className="space-y-3">
                        {(data.highlights || []).map((item, idx) => (
                            <div key={idx} className="flex gap-3 items-center group">
                                <div className="w-6 flex justify-center text-gray-400 font-bold text-xs">{idx + 1}.</div>
                                <input type="text" value={item} onChange={e => {
                                    const highlights = [...(data.highlights || [])]
                                    highlights[idx] = e.target.value
                                    setData({ ...data, highlights })
                                }} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" placeholder="Trusted by students and professionals" />
                                <button type="button" onClick={() => setData({ ...data, highlights: (data.highlights || []).filter((_, i) => i !== idx) })} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-lg transition-colors shadow-sm opacity-50 group-hover:opacity-100">âœ•</button>
                            </div>
                        ))}
                        {(!data.highlights || data.highlights.length === 0) && (
                            <div className="text-center py-4 text-xs font-bold text-gray-400">No trust points configured.</div>
                        )}
                    </div>
                </div>
            )}

            {isLearningHubHero && (
                <div className="bg-white border text-gray-900 border-gray-200 rounded-2xl p-5 shadow-sm space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pb-6 border-b border-gray-100">
                        <div className="sm:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Learning Hub Tag (Eyebrow)</label>
                            <input type="text" value={data.tag || ''} onChange={e => setData({ ...data, tag: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" placeholder="Learning Hub" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Main Heading</label>
                            <input type="text" value={data.heading || ''} onChange={e => setData({ ...data, heading: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" placeholder="Enter headline..." />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Subheading</label>
                            <textarea value={data.subheading || ''} onChange={e => setData({ ...data, subheading: e.target.value })} rows={3} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 resize-y transition-all" placeholder="Supporting text..." />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Background Image URL (Optional)</label>
                            <div className="flex gap-3">
                                <input type="text" value={data.bgImage || ''} onChange={e => setData({ ...data, bgImage: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all font-mono" placeholder="https://..." />
                                <button type="button" onClick={() => window.open('/admin/media', '_blank')} className="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200 hover:bg-indigo-100 transition-colors whitespace-nowrap">
                                    Browse
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Search Placeholder</label>
                            <input type="text" value={data.searchPlaceholder || ''} onChange={e => setData({ ...data, searchPlaceholder: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" placeholder="Search the Learning Hub" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Featured Badge Text</label>
                            <input type="text" value={data.featuredLabel || ''} onChange={e => setData({ ...data, featuredLabel: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" placeholder="Featured article" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Featured CTA Text</label>
                            <input type="text" value={data.featuredCtaText || ''} onChange={e => setData({ ...data, featuredCtaText: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" placeholder="Read article" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

    const renderTextForm = () => (
        <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Tagline (Eyebrow)</label>
                    <input type="text" value={data.tag || ''} onChange={e => setData({ ...data, tag: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all shadow-sm" />
                </div>
                <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Main Heading</label>
                    <input required type="text" value={data.heading || ''} onChange={e => setData({ ...data, heading: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all shadow-sm" />
                </div>
                <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Supporting Intro (Optional)</label>
                    <textarea value={data.subheading || ''} onChange={e => setData({ ...data, subheading: e.target.value })} rows={2} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 resize-y transition-all shadow-sm" placeholder="Short intro above the panel or cards..." />
                </div>
                <div className="sm:col-span-1">
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Side Image URL (Optional)</label>
                    <div className="flex gap-3">
                        <input type="text" value={data.image || ''} onChange={e => setData({ ...data, image: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all shadow-sm font-mono" placeholder="https://..." />
                        <button type="button" onClick={() => window.open('/admin/media', '_blank')} className="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200 hover:bg-indigo-100 transition-colors whitespace-nowrap">
                            Browse
                        </button>
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Image Position</label>
                    <select value={data.imagePosition || 'right'} onChange={e => setData({ ...data, imagePosition: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all shadow-sm">
                        <option value="left">Left of Text</option>
                        <option value="right">Right of Text</option>
                    </select>
                </div>
            </div>
            <div data-color-mode="light">
                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Body Text (Markdown & HTML supported)</label>
                <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <MDEditor
                        value={data.body || ''}
                        onChange={val => setData({ ...data, body: val || '' })}
                        height={400}
                        preview="edit"
                        hideToolbar={false}
                        className="border-0! shadow-none! ring-0 w-full"
                    />
                </div>
            </div>

            {isHomeChallenge && (
                <div className="bg-white border text-gray-900 border-gray-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                        <div>
                            <label className="block text-sm font-bold text-gray-900">Animated Content Panel Points</label>
                            <p className="text-xs font-medium text-gray-500 mt-0.5">These appear as icon callouts under the main content panel.</p>
                        </div>
                        <button type="button" onClick={() => setData({ ...data, points: [...(data.points || []), ''] })} className="text-xs bg-indigo-50 text-indigo-700 font-bold px-4 py-2 border-indigo-200 hover:bg-indigo-100 border rounded-xl shadow-sm transition-colors">+ Add Point</button>
                    </div>

                    <div className="space-y-3">
                        {(data.points || []).map((point, idx) => (
                            <div key={idx} className="flex gap-3 items-center group">
                                <div className="w-6 flex justify-center text-gray-400 font-bold text-xs">{idx + 1}.</div>
                                <input type="text" value={point} onChange={e => {
                                    const points = [...(data.points || [])]
                                    points[idx] = e.target.value
                                    setData({ ...data, points })
                                }} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" placeholder="Add a supporting pain point..." />
                                <button type="button" onClick={() => setData({ ...data, points: data.points.filter((_, i) => i !== idx) })} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-lg transition-colors shadow-sm opacity-50 group-hover:opacity-100">✕</button>
                            </div>
                        ))}
                        {(!data.points || data.points.length === 0) && (
                            <div className="text-center py-4 text-xs font-bold text-gray-400">No panel points configured.</div>
                        )}
                    </div>
                </div>
            )}

            <div className="bg-white border text-gray-900 border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                    <div>
                        <label className="block text-sm font-bold text-gray-900">Feature Checklist</label>
                        <p className="text-xs font-medium text-gray-500 mt-0.5">Add dynamic checkmarks to this section.</p>
                    </div>
                    <button type="button" onClick={() => setData({ ...data, checklist: [...(data.checklist || []), ''] })} className="text-xs bg-indigo-50 text-indigo-700 font-bold px-4 py-2 border-indigo-200 hover:bg-indigo-100 border rounded-xl shadow-sm transition-colors">+ Add Item</button>
                </div>

                <div className="space-y-3">
                    {data.checklist && data.checklist.map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-center group">
                            <div className="w-6 flex justify-center text-gray-400 font-bold text-xs">{idx + 1}.</div>
                            <input type="text" value={item} onChange={e => {
                                const newChecklist = [...data.checklist];
                                newChecklist[idx] = e.target.value;
                                setData({ ...data, checklist: newChecklist })
                            }} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" />
                            <button type="button" onClick={() => {
                                setData({ ...data, checklist: data.checklist.filter((_, i) => i !== idx) })
                            }} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-lg transition-colors shadow-sm opacity-50 group-hover:opacity-100">✕</button>
                        </div>
                    ))}
                    {(!data.checklist || data.checklist.length === 0) && (
                        <div className="text-center py-4 text-xs font-bold text-gray-400">No checklist items.</div>
                    )}
                </div>
            </div>
        </div>
    )

    const renderCtaForm = () => (
        <div className="space-y-5">
            <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Heading</label>
                <input required type="text" value={data.heading || ''} onChange={e => setData({ ...data, heading: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all shadow-sm" />
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Subheading / Body</label>
                <textarea value={data.subheading || data.body || ''} onChange={e => setData({ ...data, subheading: e.target.value, body: e.target.value })} rows={3} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 resize-y transition-all shadow-sm" />
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Side Image URL (Optional)</label>
                <div className="flex gap-3">
                    <input type="text" value={data.image || ''} onChange={e => setData({ ...data, image: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all shadow-sm font-mono" placeholder="https://..." />
                    <button type="button" onClick={() => window.open('/admin/media', '_blank')} className="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200 hover:bg-indigo-100 transition-colors whitespace-nowrap">
                        Browse
                    </button>
                </div>
            </div>

            <div className="bg-white border text-gray-900 border-gray-200 rounded-2xl p-5 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Primary CTA Text</label>
                    <input type="text" value={data.ctaText || ''} onChange={e => setData({ ...data, ctaText: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Primary URL</label>
                    <input type="text" value={data.ctaHref || ''} onChange={e => setData({ ...data, ctaHref: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Secondary CTA Text</label>
                    <input type="text" value={data.secondaryCtaText || ''} onChange={e => setData({ ...data, secondaryCtaText: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Secondary URL</label>
                    <input type="text" value={data.secondaryCtaHref || ''} onChange={e => setData({ ...data, secondaryCtaHref: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" />
                </div>
            </div>
        </div>
    )

    const renderCardsForm = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Section Heading</label>
                    <input required type="text" value={data.heading || ''} onChange={e => setData({ ...data, heading: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all shadow-sm" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Section Image (Optional)</label>
                    <div className="flex gap-3">
                        <input type="text" value={data.image || ''} onChange={e => setData({ ...data, image: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all shadow-sm font-mono" placeholder="https://..." />
                        <button type="button" onClick={() => window.open('/admin/media', '_blank')} className="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200 hover:bg-indigo-100 transition-colors whitespace-nowrap">
                            Browse
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white border text-gray-900 border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <div>
                        <label className="block text-sm font-bold text-gray-900">Card Elements</label>
                        <p className="text-xs font-medium text-gray-500 mt-0.5">Manage the individual cards in this layout.</p>
                    </div>
                    <button type="button" onClick={() => setData({ ...data, cards: [...(data.cards || []), { title: '', description: '', icon: '' }] })} className="text-xs bg-indigo-50 text-indigo-700 font-bold px-4 py-2 border-indigo-200 hover:bg-indigo-100 border rounded-xl shadow-sm transition-colors">+ Add Card</button>
                </div>

                <div className="space-y-4">
                    {data.cards && data.cards.map((card, idx) => (
                        <div key={idx} className="bg-gray-50 border border-gray-200 p-5 rounded-xl relative group transition-all hover:bg-white hover:border-indigo-200 hover:shadow-md">
                            <div className="absolute top-4 right-4 flex items-center gap-2">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Card {idx + 1}</span>
                                <button type="button" onClick={() => setData({ ...data, cards: data.cards.filter((_, i) => i !== idx) })} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-lg transition-colors shadow-sm opacity-0 group-hover:opacity-100">✕</button>
                            </div>

                            <div className="space-y-4 pr-12">
                                <div className="grid grid-cols-5 gap-4">
                                    <div className="col-span-1">
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Icon</label>
                                        <input type="text" value={card.icon || ''} onChange={e => {
                                            const newCards = [...data.cards];
                                            newCards[idx].icon = e.target.value;
                                            setData({ ...data, cards: newCards })
                                        }} className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-indigo-500 text-center text-lg transition-all" placeholder="✨" />
                                    </div>
                                    <div className="col-span-4">
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Card Title</label>
                                        <input type="text" required value={card.title || ''} onChange={e => {
                                            const newCards = [...data.cards];
                                            newCards[idx].title = e.target.value;
                                            setData({ ...data, cards: newCards })
                                        }} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-bold text-gray-900 transition-all" />
                                    </div>
                                </div>
                                {(isHomeAudience || isHomeFramework || isHomeStandards) && (
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Card Image URL</label>
                                        <div className="flex gap-3">
                                            <input type="text" value={card.image || ''} onChange={e => {
                                                const newCards = [...data.cards];
                                                newCards[idx].image = e.target.value;
                                                setData({ ...data, cards: newCards })
                                            }} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 font-mono transition-all" placeholder="https://... or /images/..." />
                                            <button type="button" onClick={() => window.open('/admin/media', '_blank')} className="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200 hover:bg-indigo-100 transition-colors whitespace-nowrap">
                                                Browse
                                            </button>
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">{isHomeAudience ? 'Card Summary' : 'Card Description'}</label>
                                    <textarea value={card.description || ''} onChange={e => {
                                        const newCards = [...data.cards];
                                        newCards[idx].description = e.target.value;
                                        setData({ ...data, cards: newCards })
                                    }} rows={3} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-700 resize-y transition-all" />
                                </div>

                                {isHomeAudience && (
                                    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-900">Panel Content Lines</label>
                                                <p className="text-xs font-medium text-gray-500 mt-0.5">Each line appears as one bullet row inside the animated card panel.</p>
                                            </div>
                                            <button type="button" onClick={() => {
                                                const newCards = [...data.cards];
                                                newCards[idx].lines = [...(newCards[idx].lines || []), ''];
                                                setData({ ...data, cards: newCards })
                                            }} className="text-xs bg-indigo-50 text-indigo-700 font-bold px-4 py-2 border-indigo-200 hover:bg-indigo-100 border rounded-xl shadow-sm transition-colors">+ Add Line</button>
                                        </div>
                                        <div className="space-y-3">
                                            {(card.lines || []).map((line, lineIdx) => (
                                                <div key={lineIdx} className="flex gap-3 items-center group/line">
                                                    <div className="w-6 flex justify-center text-gray-400 font-bold text-xs">{lineIdx + 1}.</div>
                                                    <input type="text" value={line} onChange={e => {
                                                        const newCards = [...data.cards];
                                                        const lines = [...(newCards[idx].lines || [])];
                                                        lines[lineIdx] = e.target.value;
                                                        newCards[idx].lines = lines;
                                                        setData({ ...data, cards: newCards })
                                                    }} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" placeholder="Add audience pain point or benefit..." />
                                                    <button type="button" onClick={() => {
                                                        const newCards = [...data.cards];
                                                        newCards[idx].lines = (newCards[idx].lines || []).filter((_, i) => i !== lineIdx);
                                                        setData({ ...data, cards: newCards })
                                                    }} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-lg transition-colors shadow-sm opacity-50 group-hover/line:opacity-100">✕</button>
                                                </div>
                                            ))}
                                            {(!card.lines || card.lines.length === 0) && (
                                                <div className="text-center py-3 text-xs font-bold text-gray-400">No card lines configured.</div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {isHomeFramework && (
                                    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                                        <div className="mb-4">
                                            <label className="block text-sm font-bold text-gray-900">Step Journey Settings</label>
                                            <p className="text-xs font-medium text-gray-500 mt-0.5">These fields control the visible step tag, small stage label, and bottom action link in the live Our Approach design.</p>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Step Label</label>
                                                <input type="text" value={card.stepLabel || ''} onChange={e => {
                                                    const newCards = [...data.cards];
                                                    newCards[idx].stepLabel = e.target.value;
                                                    setData({ ...data, cards: newCards })
                                                }} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" placeholder="Step 1" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Stage Label</label>
                                                <input type="text" value={card.kicker || ''} onChange={e => {
                                                    const newCards = [...data.cards];
                                                    newCards[idx].kicker = e.target.value;
                                                    setData({ ...data, cards: newCards })
                                                }} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" placeholder="Career Path Stage" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Bottom Link Text</label>
                                                <input type="text" value={card.ctaText || ''} onChange={e => {
                                                    const newCards = [...data.cards];
                                                    newCards[idx].ctaText = e.target.value;
                                                    setData({ ...data, cards: newCards })
                                                }} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" placeholder="Explore" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Card Link URL</label>
                                                <input type="text" value={card.href || ''} onChange={e => {
                                                    const newCards = [...data.cards];
                                                    newCards[idx].href = e.target.value;
                                                    setData({ ...data, cards: newCards })
                                                }} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all font-mono" placeholder="/courses-certifications" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Alt text field (Evaluation/Mistakes cards) */}
                                {'text' in card && (
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Alt Text (used by some layouts)</label>
                                        <textarea value={card.text || ''} onChange={e => {
                                            const newCards = [...data.cards];
                                            newCards[idx].text = e.target.value;
                                            setData({ ...data, cards: newCards })
                                        }} rows={2} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-700 resize-y transition-all" />
                                    </div>
                                )}

                                {/* Suited field (Skill Clusters) */}
                                {'suited' in card && (
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Best Suited For</label>
                                        <input type="text" value={card.suited || ''} onChange={e => {
                                            const newCards = [...data.cards];
                                            newCards[idx].suited = e.target.value;
                                            setData({ ...data, cards: newCards })
                                        }} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" placeholder="Target audience..." />
                                    </div>
                                )}

                                {/* URL field (Where Next cards) */}
                                {'url' in card && (
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Link URL</label>
                                        <input type="text" value={card.url || ''} onChange={e => {
                                            const newCards = [...data.cards];
                                            newCards[idx].url = e.target.value;
                                            setData({ ...data, cards: newCards })
                                        }} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 font-mono transition-all" placeholder="/destination" />
                                    </div>
                                )}

                                {/* Color field (Skill Clusters gradient) */}
                                {'color' in card && (
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Gradient Color</label>
                                        <select value={card.color || ''} onChange={e => {
                                            const newCards = [...data.cards];
                                            newCards[idx].color = e.target.value;
                                            setData({ ...data, cards: newCards })
                                        }} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all">
                                            <option value="from-violet-500 to-indigo-600">Violet → Indigo</option>
                                            <option value="from-cyan-500 to-blue-600">Cyan → Blue</option>
                                            <option value="from-emerald-500 to-teal-600">Emerald → Teal</option>
                                            <option value="from-amber-500 to-orange-600">Amber → Orange</option>
                                            <option value="from-pink-500 to-rose-600">Pink → Rose</option>
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {(!data.cards || data.cards.length === 0) && (
                        <div className="text-center py-6 text-sm font-bold text-gray-400">No cards configured.</div>
                    )}
                </div>
            </div>

            {isHomeStandards && (
                <div className="bg-white border text-gray-900 border-gray-200 rounded-2xl p-5 shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Highlight Panel Title</label>
                            <input type="text" value={data.highlightTitle || ''} onChange={e => setData({ ...data, highlightTitle: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-bold text-gray-900 transition-all" placeholder="Quality You Can Trust" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Highlight Panel Copy</label>
                            <textarea value={data.highlightText || ''} onChange={e => setData({ ...data, highlightText: e.target.value })} rows={3} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 resize-y transition-all" placeholder="Explain how your recommendations are evaluated..." />
                        </div>
                    </div>
                </div>
            )}

            {isLearningHubFeed && (
                <div className="bg-white border text-gray-900 border-gray-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                        <div>
                            <label className="block text-sm font-bold text-gray-900">Dynamic Feed Labels</label>
                            <p className="text-xs font-medium text-gray-500 mt-0.5">These labels control the live article grid and category sidebar while posts still come from the backend.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Categories Title</label>
                            <input type="text" value={data.categoriesLabel || ''} onChange={e => setData({ ...data, categoriesLabel: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" placeholder="Categories" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">All Topics Label</label>
                            <input type="text" value={data.allTopicsLabel || ''} onChange={e => setData({ ...data, allTopicsLabel: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" placeholder="All Topics" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Clear Label</label>
                            <input type="text" value={data.clearLabel || ''} onChange={e => setData({ ...data, clearLabel: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" placeholder="Clear" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Card Button Text</label>
                            <input type="text" value={data.readButtonText || ''} onChange={e => setData({ ...data, readButtonText: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" placeholder="Read" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Empty State Title</label>
                            <input type="text" value={data.emptyTitle || ''} onChange={e => setData({ ...data, emptyTitle: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" placeholder="No Posts Found" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Clear Filters Button</label>
                            <input type="text" value={data.clearFiltersText || ''} onChange={e => setData({ ...data, clearFiltersText: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" placeholder="Clear Filters" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Empty State Description</label>
                            <textarea value={data.emptyText || ''} onChange={e => setData({ ...data, emptyText: e.target.value })} rows={3} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 resize-y transition-all" placeholder="We couldn't find any articles matching your current filter." />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

    let FormContent = null

    // Determine if the current section is a standard type or a custom layout that should use a standard form
    const isHeroType = section.type === 'hero' || (section.data?.layout && section.data.layout.endsWith('_hero'));

    if (isHeroType) FormContent = renderHeroForm()
    else if (section.type === 'text') FormContent = renderTextForm()
    else if (section.type === 'cards') FormContent = renderCardsForm()
    else if (section.type === 'cta') FormContent = renderCtaForm()
    else FormContent = <div className="text-red-500 font-bold p-6 bg-red-50 border border-red-100 rounded-xl text-center">Unknown section builder type or custom layout not supported in UI yet.</div>

    return (
        <form onSubmit={handleSubmit} className="border-t border-gray-100 px-6 sm:px-8 py-8 bg-[#fdfdfd] rounded-b-[1.5rem]">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-extrabold text-gray-900 tracking-tight mb-1">Editing Layout</h3>
                    <p className="text-gray-500 text-sm font-medium">Update the content payload for this active layout block.</p>
                </div>
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-200 shadow-sm">
                    {section.type} builder
                </span>
            </div>

            {FormContent}

            <div className="mt-10 flex flex-row-reverse gap-4 pt-8 border-t border-gray-100">
                <button
                    type="submit"
                    disabled={saving}
                    className="btn-primary bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-8 py-3.5 disabled:opacity-60 shadow-md shadow-indigo-500/20 w-full sm:w-auto"
                >
                    {saving ? 'Saving Section...' : 'Deploy Section Updates'}
                </button>
                <button
                    type="button"
                    onClick={() => { setData(section.data); onCancel() }}
                    className="bg-white border text-gray-600 font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all shadow-sm w-full sm:w-auto"
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
