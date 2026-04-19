import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma, queryWithRetry } from '@/lib/db'
import Link from 'next/link'
import {
    HiOutlineDocumentText,
    HiOutlineViewGrid,
    HiOutlinePencilAlt,
    HiOutlineLink,
    HiOutlineMail,
    HiOutlinePhotograph,
    HiOutlineExternalLink,
    HiOutlineArrowRight,
} from 'react-icons/hi'

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions)

    const [sectionCount, contactCount, pageCount, blogCount, affiliateCount, recentContacts] = await queryWithRetry(() =>
        Promise.all([
            prisma.section.count(),
            prisma.contact.count(),
            prisma.page.count(),
            prisma.post.count(),
            prisma.affiliateLink.count(),
            prisma.contact.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
        ])
    )

    const stats = [
        { label: 'CMS Pages', value: pageCount, icon: HiOutlineDocumentText, color: 'from-primary-500 to-primary-700', shadow: 'shadow-primary-500/20' },
        { label: 'Total Sections', value: sectionCount, icon: HiOutlineViewGrid, color: 'from-primary-400 to-primary-600', shadow: 'shadow-primary-400/20' },
        { label: 'Blog Posts', value: blogCount, icon: HiOutlinePencilAlt, color: 'from-accent-500 to-accent-700', shadow: 'shadow-accent-500/20' },
        { label: 'Affiliate Links', value: affiliateCount, icon: HiOutlineLink, color: 'from-emerald-500 to-teal-500', shadow: 'shadow-emerald-500/20' },
        { label: 'Enquiries', value: contactCount, icon: HiOutlineMail, color: 'from-secondary-500 to-secondary-600', shadow: 'shadow-secondary-500/20' },
    ]

    const quickActions = [
        { label: 'Manage All Pages', desc: 'Edit, reorder and toggle content blocks across all your pages.', href: '/admin/pages', icon: HiOutlineDocumentText },
        { label: 'View Live Site', desc: 'Preview your public-facing website in a new tab.', href: '/', icon: HiOutlineExternalLink, target: '_blank' },
        { label: 'Media Library', desc: 'Upload and manage images for your CMS and blog.', href: '/admin/media', icon: HiOutlinePhotograph },
        { label: 'Affiliate Links', desc: 'Manage partnership and referral links.', href: '/admin/affiliates', icon: HiOutlineLink },
    ]

    return (
        <div className="w-full">
            <div className="max-w-6xl mx-auto px-6 py-10 animate-fade-up">
                {/* Header */}
                <div className="mb-10 bg-linear-to-b from-secondary-600 to-[#162030] rounded-3xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                    <div className="relative z-10">
                        <p className="text-primary-400 text-xs font-bold uppercase tracking-widest mb-2">Welcome back</p>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">
                            {session?.user?.name || 'Admin'} 👋
                        </h1>
                        <p className="text-gray-400 font-medium text-sm mt-2 max-w-xl leading-relaxed">
                            Here&apos;s what&apos;s happening with your website. Manage content, track performance, and keep everything running smoothly.
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
                    {stats.map(stat => {
                        const Icon = stat.icon
                        return (
                            <div key={stat.label} className="bg-white border border-gray-100 rounded-3xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] hover:-translate-y-1 transition-all duration-300 group">
                                <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center mb-3 shadow-lg ${stat.shadow} group-hover:scale-110 transition-transform`}>
                                    <Icon className="text-white text-lg" />
                                </div>
                                <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                                <p className="text-xs font-bold text-gray-400 mt-0.5 uppercase tracking-wider">{stat.label}</p>
                            </div>
                        )
                    })}
                </div>

                {/* Quick Actions */}
                <div className="mb-10">
                    <h2 className="text-lg font-extrabold text-gray-900 mb-4 tracking-tight">Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {quickActions.map(action => {
                            const Icon = action.icon
                            return (
                                <Link
                                    key={action.href}
                                    href={action.href}
                                    target={action.target || '_self'}
                                    className="bg-white border border-gray-100 rounded-3xl p-5 block shadow-[0_4px_20px_rgb(0,0,0,0.03)] group hover:border-primary-200 hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-primary-50 group-hover:scale-110 transition-all">
                                        <Icon className="text-gray-400 text-lg group-hover:text-primary-600 transition-colors" />
                                    </div>
                                    <div className="text-sm font-bold text-gray-900 group-hover:text-primary-700 transition-colors flex items-center gap-1">
                                        {action.label}
                                        <HiOutlineArrowRight className="text-xs opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all" />
                                    </div>
                                    <p className="text-gray-500 text-xs mt-1 font-medium leading-relaxed">{action.desc}</p>
                                </Link>
                            )
                        })}
                    </div>
                </div>

                {/* Recent Enquiries */}
                <div className="bg-white border text-gray-900 border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                            <HiOutlineMail className="text-xl text-primary-500" />
                            Recent Enquiries
                        </h2>
                        <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg">Last 5</span>
                    </div>

                    {recentContacts.length === 0 ? (
                        <p className="text-gray-400 text-sm font-medium text-center py-8">No enquiries yet.</p>
                    ) : (
                        <div className="space-y-3">
                            {recentContacts.map(c => (
                                <div key={c.id} className="flex items-start gap-4 bg-white hover:bg-gray-50/80 rounded-2xl p-4 border border-gray-100 hover:border-primary-100 shadow-sm transition-all">
                                    <div className="w-9 h-9 rounded-lg bg-linear-to-b from-primary-100 to-primary-50 flex items-center justify-center text-primary-600 text-xs font-black uppercase shrink-0">
                                        {c.name?.[0] || '?'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="font-bold text-gray-900 text-sm">{c.name}</span>
                                            <span className="text-[10px] font-bold text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 font-medium truncate">{c.message}</p>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400 bg-white border border-gray-200 px-2 py-1 rounded-md shrink-0">{c.email}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
