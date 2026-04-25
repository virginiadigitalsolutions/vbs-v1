'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { HiOutlineArrowRight } from 'react-icons/hi'
import Image from 'next/image'
import { AdminPageHeader, AdminPageShell, AdminStatsGrid } from '@/components/admin/AdminPageShell'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

function SmtpSection() {
    const [smtp, setSmtp] = useState(null)
    const [testing, setTesting] = useState(false)
    const [testResult, setTestResult] = useState(null)
    const [testEmail, setTestEmail] = useState('')

    useEffect(() => {
        fetch('/api/admin/smtp-test')
            .then(r => r.json())
            .then(setSmtp)
            .catch(() => setSmtp({ configured: false }))
    }, [])

    const handleTest = async () => {
        setTesting(true)
        setTestResult(null)
        try {
            const res = await fetch('/api/admin/smtp-test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: testEmail || undefined })
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)
            setTestResult({ type: 'success', text: `Test email sent to ${data.sentTo}` })
        } catch (err) {
            setTestResult({ type: 'error', text: err.message })
        } finally {
            setTesting(false)
        }
    }

    if (!smtp) return <p className="text-gray-400 text-sm font-medium animate-pulse py-4">Loading SMTP status...</p>

    const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20 shadow-sm focus:shadow-md text-sm font-medium text-gray-900 transition-all"

    return (
        <div className="space-y-5">
            <div className="flex items-center gap-3 mb-4">
                <span className={`w-2.5 h-2.5 rounded-full ${smtp.configured ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-red-400'}`} />
                <span className={`text-sm font-bold ${smtp.configured ? 'text-emerald-700' : 'text-red-600'}`}>
                    {smtp.configured ? 'SMTP Configured' : 'SMTP Not Configured'}
                </span>
            </div>

            {smtp.configured ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Host</p>
                            <p className="text-sm font-semibold text-gray-800">{smtp.host}:{smtp.port}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">User</p>
                            <p className="text-sm font-semibold text-gray-800 font-mono">{smtp.user}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">From</p>
                            <p className="text-sm font-semibold text-gray-800">{smtp.from}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Admin Email</p>
                            <p className="text-sm font-semibold text-gray-800">{smtp.adminEmail}</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        <p className="text-xs font-bold text-gray-500 mb-3">Send Test Email</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Recipient email (optional — defaults to admin)"
                                value={testEmail}
                                onChange={e => setTestEmail(e.target.value)}
                                className={inputClass}
                            />
                            <button
                                type="button"
                                onClick={handleTest}
                                disabled={testing}
                                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-xl whitespace-nowrap disabled:opacity-60 transition-all shadow-sm hover:shadow-md shrink-0"
                            >
                                {testing ? 'Sending...' : '📧 Test'}
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
                    <p className="text-sm text-amber-800 font-semibold mb-2">SMTP credentials not found</p>
                    <p className="text-xs text-amber-700 leading-relaxed">
                        Add the following to your <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono text-[11px]">.env</code> file:
                    </p>
                    <pre className="mt-3 bg-amber-100/50 text-amber-900 text-xs font-mono p-3 rounded-lg overflow-x-auto leading-relaxed">
{`SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password`}
                    </pre>
                </div>
            )}

            {testResult && (
                <div className={`px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2 ${testResult.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                    {testResult.type === 'success' ? '✅' : '❌'} {testResult.text}
                </div>
            )}
        </div>
    )
}

const DEFAULT_NAV_LINKS = [
    { label: 'Home', url: '/' },
    { label: 'About', url: '/about-us' },
    { label: 'What should I learn', url: '/digital-skills' },
    { label: 'Where should I learn it?', url: '/courses-certifications' },
    { label: 'What does this lead to?', url: '/career-guides' },
    { label: 'Resources', url: '/resources' },
]

export default function AdminSettingsPage() {
    const [data, setData] = useState({
        siteName: '',
        logoUrl: '',
        contactEmail: '',
        contactPhone: '',
        footerText: '',
        seoDefaultTitle: '',
        seoDefaultDesc: '',
        socialLinks: { linkedin: '', twitter: '' },
        navLinks: DEFAULT_NAV_LINKS
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState({ text: '', type: '' })

    useEffect(() => {
        fetch('/api/admin/settings')
            .then(res => res.json())
            .then(settings => {
                if (settings && Object.keys(settings).length > 0) {
                    setData({
                        ...settings,
                        socialLinks: settings.socialLinks || { linkedin: '', twitter: '' },
                        navLinks: settings.navLinks || DEFAULT_NAV_LINKS,
                        logoUrl: settings.logoUrl || ''
                    })
                }
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
                setMessage({ text: 'Failed to load configuration.', type: 'error' })
            })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        setMessage({ text: '', type: '' })

        try {
            const res = await fetch('/api/admin/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (!res.ok) throw new Error('Failed to update config')

            setMessage({ text: 'Global settings successfully updated.', type: 'success' })
            setTimeout(() => setMessage({ text: '', type: '' }), 3000)
        } catch (error) {
            setMessage({ text: error.message, type: 'error' })
        } finally {
            setSaving(false)
        }
    }

    // Nav link helpers
    const addNavLink = () => {
        setData(prev => ({
            ...prev,
            navLinks: [...(prev.navLinks || []), { label: '', url: '' }]
        }))
    }
    const removeNavLink = (idx) => {
        setData(prev => ({
            ...prev,
            navLinks: prev.navLinks.filter((_, i) => i !== idx)
        }))
    }
    const updateNavLink = (idx, field, value) => {
        setData(prev => ({
            ...prev,
            navLinks: prev.navLinks.map((link, i) => i === idx ? { ...link, [field]: value } : link)
        }))
    }
    const moveNavLink = (idx, direction) => {
        const links = [...(data.navLinks || [])]
        const swapIdx = direction === 'up' ? idx - 1 : idx + 1
        if (swapIdx < 0 || swapIdx >= links.length) return
            ;[links[idx], links[swapIdx]] = [links[swapIdx], links[idx]]
        setData(prev => ({ ...prev, navLinks: links }))
    }

    if (loading) {
        return <div className="p-10 text-gray-400 font-bold animate-pulse text-center">Loading Configuration...</div>
    }

    const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20 shadow-sm focus:shadow-md text-sm font-medium text-gray-900 transition-all"

    return (
        <AdminPageShell className="max-w-5xl animate-fade-up">
                <AdminPageHeader
                    eyebrow="Global Settings"
                    title="Control brand, navigation, footer, email, and default SEO"
                    description="These settings shape the shared identity of the public website. Use this page for cross-site updates that affect navigation, metadata, footer copy, and operational email."
                    meta={[
                        { label: 'Nav Links', value: String((data.navLinks || []).length) },
                        { label: 'SMTP', value: 'Configured in panel' },
                        { label: 'Brand', value: data.siteName || 'Not set' },
                        { label: 'Mode', value: 'Global' },
                    ]}
                />

                <AdminStatsGrid
                    items={[
                        { label: 'Navigation Links', value: (data.navLinks || []).length, detail: 'Header menu items', accent: 'from-primary-500 to-primary-700' },
                        { label: 'Social Profiles', value: Object.values(data.socialLinks || {}).filter(Boolean).length, detail: 'Connected channels', accent: 'from-violet-500 to-fuchsia-500' },
                        { label: 'Contact Points', value: [data.contactEmail, data.contactPhone].filter(Boolean).length, detail: 'Public support info', accent: 'from-emerald-500 to-teal-500' },
                        { label: 'SEO Defaults', value: data.seoDefaultTitle ? 1 : 0, detail: 'Fallback metadata', accent: 'from-amber-500 to-orange-500' },
                    ]}
                />

                {message.text && (
                    <div className={`mb-8 px-6 py-4 rounded-xl font-bold text-sm shadow-sm flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
                        }`}>
                        {message.type === 'success' ? '✅' : '⚠️'} {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Identity Block */}
                    <div className="bg-white border text-gray-900 border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] hover:border-primary-200 hover:-translate-y-1">
                        <div className="mb-6 pb-4 border-b border-gray-50 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-sm">1</span>
                            <h2 className="text-lg font-extrabold tracking-tight">Brand Identity</h2>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Website Brand Name (Navbar)</label>
                                <input type="text" required value={data.siteName || ''} onChange={e => setData({ ...data, siteName: e.target.value })} className={`${inputClass} font-bold`} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Logo Image URL <span className="text-gray-400 font-normal">(Leave empty for default icon)</span></label>
                                <div className="flex gap-3 items-center">
                                    <input type="url" value={data.logoUrl || ''} onChange={e => setData({ ...data, logoUrl: e.target.value })} className={inputClass} placeholder="https://example.com/logo.png" />
                                    {data.logoUrl && (
                                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 shrink-0 relative">
                                            <Image src={data.logoUrl} alt="Logo preview" fill className="object-cover" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Primary Support Email</label>
                                    <input type="email" value={data.contactEmail || ''} onChange={e => setData({ ...data, contactEmail: e.target.value })} className={inputClass} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Support Phone</label>
                                    <input type="text" value={data.contactPhone || ''} onChange={e => setData({ ...data, contactPhone: e.target.value })} className={inputClass} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navbar Links Block */}
                    <div className="bg-white border text-gray-900 border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] hover:border-primary-200 hover:-translate-y-1">
                        <div className="mb-6 pb-4 border-b border-gray-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-sm">2</span>
                                <h2 className="text-lg font-extrabold tracking-tight">Navigation Links</h2>
                            </div>
                            <button type="button" onClick={addNavLink} className="text-xs font-bold text-primary-600 bg-primary-50 hover:bg-primary-100 px-4 py-2 rounded-lg transition-colors">
                                + Add Link
                            </button>
                        </div>

                        <div className="space-y-3">
                            {(data.navLinks || []).map((link, idx) => (
                                <div key={idx} className="flex items-center gap-2 bg-gray-50/80 rounded-xl p-3 border border-gray-100 group hover:border-primary-100 transition-colors">
                                    <div className="flex flex-col gap-0.5">
                                        <button type="button" onClick={() => moveNavLink(idx, 'up')} disabled={idx === 0} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 text-[10px] font-bold leading-none">▲</button>
                                        <button type="button" onClick={() => moveNavLink(idx, 'down')} disabled={idx === (data.navLinks || []).length - 1} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 text-[10px] font-bold leading-none">▼</button>
                                    </div>
                                    <span className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-400 shrink-0">{idx + 1}</span>
                                    <input
                                        type="text"
                                        placeholder="Label"
                                        value={link.label}
                                        onChange={e => updateNavLink(idx, 'label', e.target.value)}
                                        className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20 shadow-sm focus:shadow-md transition-all min-w-0"
                                    />
                                    <input
                                        type="text"
                                        placeholder="/url-path"
                                        value={link.url}
                                        onChange={e => updateNavLink(idx, 'url', e.target.value)}
                                        className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium font-mono text-gray-600 outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20 shadow-sm focus:shadow-md transition-all min-w-0"
                                    />
                                    <button type="button" onClick={() => removeNavLink(idx)} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0 text-sm font-bold">
                                        ×
                                    </button>
                                </div>
                            ))}
                            {(!data.navLinks || data.navLinks.length === 0) && (
                                <p className="text-center text-gray-400 text-sm font-medium py-6">No navigation links configured. Click &ldquo;+ Add Link&rdquo; to begin.</p>
                            )}
                        </div>
                    </div>

                    {/* Footer Block */}
                    <div className="bg-white border text-gray-900 border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] hover:border-primary-200 hover:-translate-y-1">
                        <div className="mb-6 pb-4 border-b border-gray-50 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-sm">3</span>
                            <h2 className="text-lg font-extrabold tracking-tight">Footer Injection</h2>
                        </div>

                        <div className="space-y-5">
                            <div data-color-mode="light">
                                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Global Footer Bio / Tagline</label>
                                <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                    <MDEditor
                                        value={data.footerText || ''}
                                        onChange={val => setData({ ...data, footerText: val || '' })}
                                        height={200}
                                        preview="edit"
                                        hideToolbar={false}
                                        className="border-0! shadow-none! ring-0 w-full"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">LinkedIn URL</label>
                                    <input type="url" value={data.socialLinks?.linkedin || ''} onChange={e => setData({ ...data, socialLinks: { ...data.socialLinks, linkedin: e.target.value } })} className={`${inputClass} font-mono text-[13px]`} placeholder="https://linkedin.com/..." />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">X URL</label>
                                    <input type="url" value={data.socialLinks?.twitter || ''} onChange={e => setData({ ...data, socialLinks: { ...data.socialLinks, twitter: e.target.value } })} className={`${inputClass} font-mono text-[13px]`} placeholder="https://x.com/..." />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Instagram URL</label>
                                    <input type="url" value={data.socialLinks?.instagram || ''} onChange={e => setData({ ...data, socialLinks: { ...data.socialLinks, instagram: e.target.value } })} className={`${inputClass} font-mono text-[13px]`} placeholder="https://instagram.com/..." />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">YouTube URL</label>
                                    <input type="url" value={data.socialLinks?.youtube || ''} onChange={e => setData({ ...data, socialLinks: { ...data.socialLinks, youtube: e.target.value } })} className={`${inputClass} font-mono text-[13px]`} placeholder="https://youtube.com/..." />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Facebook URL</label>
                                    <input type="url" value={data.socialLinks?.facebook || ''} onChange={e => setData({ ...data, socialLinks: { ...data.socialLinks, facebook: e.target.value } })} className={`${inputClass} font-mono text-[13px]`} placeholder="https://facebook.com/..." />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SMTP Email Block */}
                    <div className="bg-white border text-gray-900 border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] hover:border-primary-200 hover:-translate-y-1">
                        <div className="mb-6 pb-4 border-b border-gray-50 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-sm">4</span>
                            <h2 className="text-lg font-extrabold tracking-tight">Email & SMTP</h2>
                        </div>

                        <SmtpSection />
                    </div>

                    {/* SEO Block */}
                    <div className="bg-white border text-gray-900 border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] hover:border-primary-200 hover:-translate-y-1">
                        <div className="mb-6 pb-4 border-b border-gray-50 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-sm">5</span>
                            <h2 className="text-lg font-extrabold tracking-tight">Default Search Engine Config</h2>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Fallback Meta Title (Overridden by distinct pages)</label>
                                <input type="text" required value={data.seoDefaultTitle || ''} onChange={e => setData({ ...data, seoDefaultTitle: e.target.value })} className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Fallback Meta Description</label>
                                <textarea required value={data.seoDefaultDesc || ''} onChange={e => setData({ ...data, seoDefaultDesc: e.target.value })} rows={3} className={`${inputClass} resize-y`} />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="btn-primary bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold px-8 py-4 disabled:opacity-60 shadow-lg shadow-primary-500/30 transition-all hover:shadow-primary-500/40 hover:-translate-y-0.5 rounded-xl w-full sm:w-auto"
                        >
                            {saving ? 'Synchronizing State...' : 'Commit Global Master Settings'}
                        </button>
                    </div>
                </form>
        </AdminPageShell>
    )
}
