import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma, queryWithRetry } from '@/lib/db'
import Link from 'next/link'
import {
    HiOutlineArrowRight,
    HiOutlineChartBar,
    HiOutlineClock,
    HiOutlineDocumentText,
    HiOutlineExternalLink,
    HiOutlineLink,
    HiOutlineMail,
    HiOutlinePencilAlt,
    HiOutlinePhotograph,
    HiOutlineSparkles,
    HiOutlineViewGrid,
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
        {
            label: 'CMS Pages',
            value: pageCount,
            icon: HiOutlineDocumentText,
            accent: 'from-primary-500 to-primary-700',
            detail: 'Core site structure',
        },
        {
            label: 'Sections',
            value: sectionCount,
            icon: HiOutlineViewGrid,
            accent: 'from-sky-500 to-cyan-500',
            detail: 'Layout building blocks',
        },
        {
            label: 'Blog Posts',
            value: blogCount,
            icon: HiOutlinePencilAlt,
            accent: 'from-emerald-500 to-teal-500',
            detail: 'Published and draft content',
        },
        {
            label: 'Affiliate Links',
            value: affiliateCount,
            icon: HiOutlineLink,
            accent: 'from-violet-500 to-fuchsia-500',
            detail: 'Active outbound campaigns',
        },
        {
            label: 'Enquiries',
            value: contactCount,
            icon: HiOutlineMail,
            accent: 'from-amber-500 to-orange-500',
            detail: 'Inbound messages',
        },
    ]

    const quickActions = [
        {
            label: 'Open Page Manager',
            desc: 'Edit titles, slugs, publish state, and section counts.',
            href: '/admin/pages',
            icon: HiOutlineDocumentText,
        },
        {
            label: 'Upload Media',
            desc: 'Keep the shared asset library tidy and ready for page layouts.',
            href: '/admin/media',
            icon: HiOutlinePhotograph,
        },
        {
            label: 'Review Enquiries',
            desc: 'Check the newest inbound messages and close the loop faster.',
            href: '/admin/enquiries',
            icon: HiOutlineMail,
        },
        {
            label: 'Visit Live Site',
            desc: 'Open the public experience in a new tab for a visual pass.',
            href: '/',
            icon: HiOutlineExternalLink,
            target: '_blank',
        },
    ]

    return (
        <div className="space-y-6 text-slate-950">
            <section className="overflow-hidden rounded-[28px] border border-slate-200/70 bg-[linear-gradient(135deg,#0f172a_0%,#132238_42%,#1e3a8a_100%)] p-6 shadow-[0_24px_60px_rgba(15,23,42,0.16)] sm:p-8">
                <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
                    <div className="relative">
                        <div className="absolute -left-6 top-0 h-32 w-32 rounded-full bg-white/8 blur-3xl" />
                        <div className="relative">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-blue-100">
                                <HiOutlineSparkles className="text-sm text-cyan-300" />
                                Admin Overview
                            </div>
                            <h2 className="max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl">
                                Keep content, design, and publishing aligned across the whole VBS site.
                            </h2>
                            <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-200 sm:text-base">
                                This workspace is now structured around faster editing, clearer navigation, and a steadier publishing flow for the public website.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    href="/admin/pages"
                                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-sm transition-all hover:bg-slate-100"
                                >
                                    Manage Content
                                    <HiOutlineArrowRight className="text-base" />
                                </Link>
                                <Link
                                    href="/admin/sections"
                                    className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-white/15"
                                >
                                    Open Layout Builder
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
                        {[
                            { label: 'Signed In', value: session?.user?.name || 'Admin' },
                            { label: 'Workspace', value: 'Live CMS' },
                            { label: 'Focus', value: 'Publishing' },
                            { label: 'Status', value: 'Ready' },
                        ].map((item) => (
                            <div key={item.label} className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                                <div className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-100/70">{item.label}</div>
                                <div className="mt-2 text-sm font-bold text-white sm:text-base">{item.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <div
                            key={stat.label}
                            className="rounded-[26px] border border-slate-200/70 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(72,115,174,0.10)]"
                        >
                            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.accent} text-white shadow-lg`}>
                                <Icon className="text-xl" />
                            </div>
                            <div className="mt-4 text-3xl font-black tracking-tight text-slate-950">{stat.value}</div>
                            <div className="mt-1 text-sm font-bold text-slate-800">{stat.label}</div>
                            <div className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-400">{stat.detail}</div>
                        </div>
                    )
                })}
            </section>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:p-7">
                    <div className="mb-5 flex items-center justify-between gap-4">
                        <div>
                            <h3 className="text-xl font-black tracking-tight text-slate-950">Quick Actions</h3>
                            <p className="mt-1 text-sm font-medium text-slate-500">The fastest way into the work that moves this site every day.</p>
                        </div>
                        <div className="hidden rounded-2xl bg-slate-50 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 sm:block">
                            Jump Points
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {quickActions.map((action) => {
                            const Icon = action.icon
                            return (
                                <Link
                                    key={action.href}
                                    href={action.href}
                                    target={action.target || '_self'}
                                    className="group rounded-[24px] border border-slate-200 bg-slate-50/60 p-5 transition-all hover:border-primary-200 hover:bg-white hover:shadow-[0_14px_32px_rgba(72,115,174,0.10)]"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm transition-colors group-hover:text-primary-600">
                                            <Icon className="text-xl" />
                                        </div>
                                        <HiOutlineArrowRight className="mt-2 text-base text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-primary-500" />
                                    </div>
                                    <div className="mt-5 text-base font-black tracking-tight text-slate-950">{action.label}</div>
                                    <p className="mt-2 text-sm font-medium leading-7 text-slate-500">{action.desc}</p>
                                </Link>
                            )
                        })}
                    </div>
                </div>

                <div className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:p-7">
                    <div className="mb-5 flex items-center justify-between gap-4">
                        <div>
                            <h3 className="text-xl font-black tracking-tight text-slate-950">Recent Enquiries</h3>
                            <p className="mt-1 text-sm font-medium text-slate-500">Latest contact activity coming in from the public website.</p>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            <HiOutlineClock className="text-sm" />
                            Last 5
                        </div>
                    </div>

                    {recentContacts.length === 0 ? (
                        <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50/70 px-6 py-14 text-center">
                            <div className="text-base font-black text-slate-900">No enquiries yet</div>
                            <p className="mt-2 text-sm font-medium text-slate-500">New contact messages will appear here as soon as they arrive.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {recentContacts.map((contact) => (
                                <div
                                    key={contact.id}
                                    className="flex items-start gap-4 rounded-[22px] border border-slate-200/80 bg-slate-50/70 p-4 transition-all hover:border-primary-200 hover:bg-white"
                                >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-sm font-black uppercase text-white">
                                        {contact.name?.[0] || '?'}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-sm font-bold text-slate-900">{contact.name}</span>
                                            <span className="rounded-full bg-white px-2 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                                                {new Date(contact.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-primary-600">{contact.email}</div>
                                        <p className="mt-3 line-clamp-2 text-sm font-medium leading-6 text-slate-500">{contact.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:p-7">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h3 className="flex items-center gap-3 text-xl font-black tracking-tight text-slate-950">
                            <HiOutlineChartBar className="text-2xl text-primary-500" />
                            Publishing Rhythm
                        </h3>
                        <p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-slate-500">
                            Content structure is healthy when pages, sections, and blog entries stay balanced. Use this workspace to keep the public site current without losing consistency.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Pages</div>
                            <div className="mt-1 text-lg font-black text-slate-950">{pageCount}</div>
                        </div>
                        <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Sections</div>
                            <div className="mt-1 text-lg font-black text-slate-950">{sectionCount}</div>
                        </div>
                        <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Posts</div>
                            <div className="mt-1 text-lg font-black text-slate-950">{blogCount}</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
