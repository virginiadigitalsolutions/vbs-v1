'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    HiOutlineChevronRight,
    HiOutlineExternalLink,
    HiOutlineHome,
    HiOutlineLightningBolt,
    HiOutlineSearch,
} from 'react-icons/hi'

const routeLabels = new Map([
    ['/admin/dashboard', 'Dashboard'],
    ['/admin/pages', 'Pages'],
    ['/admin/media', 'Media Library'],
    ['/admin/learning-hub', 'Learning Hub'],
    ['/admin/enquiries', 'Enquiries'],
    ['/admin/affiliates', 'Affiliate Links'],
    ['/admin/settings', 'Site Settings'],
    ['/admin/home', 'Home Page'],
    ['/admin/learning-hub-page', 'Learning Hub Page'],
    ['/admin/digital-skills', 'Digital Skills'],
    ['/admin/courses', 'Courses'],
    ['/admin/career-guides', 'Career Guides'],
    ['/admin/about-us', 'About Us'],
    ['/admin/terms-and-conditions', 'Terms & Conditions'],
    ['/admin/privacy-policy', 'Privacy Policy'],
    ['/admin/users', 'Team Members'],
    ['/admin/sections', 'Section Builder'],
    ['/admin/login', 'Admin Login'],
])

function humanize(segment) {
    return segment
        .split('-')
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
}

function getTitle(pathname) {
    if (routeLabels.has(pathname)) return routeLabels.get(pathname)
    const segments = pathname.split('/').filter(Boolean)
    const lastSegment = segments[segments.length - 1]
    return lastSegment ? humanize(lastSegment) : 'Dashboard'
}

function getBreadcrumbs(pathname) {
    const segments = pathname.split('/').filter(Boolean)
    if (segments.length <= 1) return [{ href: '/admin/dashboard', label: 'Dashboard' }]

    const crumbs = [{ href: '/admin/dashboard', label: 'Dashboard' }]
    let currentPath = ''

    segments.forEach((segment, index) => {
        currentPath += `/${segment}`
        if (segment === 'admin') return

        crumbs.push({
            href: currentPath,
            label: routeLabels.get(currentPath) || humanize(segment),
            current: index === segments.length - 1,
        })
    })

    return crumbs
}

export default function AdminTopbar({ user }) {
    const pathname = usePathname()
    const title = getTitle(pathname)
    const breadcrumbs = getBreadcrumbs(pathname)
    const firstName = user?.name?.split(' ')?.[0] || 'Admin'

    return (
        <div className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
            <div className="mx-auto flex max-w-[1600px] flex-col gap-5 px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                            <HiOutlineHome className="text-sm text-primary-500" />
                            {breadcrumbs.map((crumb, index) => (
                                <div key={crumb.href} className="flex items-center gap-2">
                                    {index > 0 && <HiOutlineChevronRight className="text-slate-300" />}
                                    {crumb.current ? (
                                        <span className="text-slate-500">{crumb.label}</span>
                                    ) : (
                                        <Link href={crumb.href} className="transition-colors hover:text-primary-600">
                                            {crumb.label}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-black tracking-tight text-slate-950">{title}</h1>
                                <p className="mt-1 text-sm font-medium text-slate-500">
                                    Welcome back, {firstName}. Manage content, structure, and publishing from one place.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto] lg:w-[620px]">
                        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 shadow-sm">
                            <HiOutlineSearch className="shrink-0 text-lg text-slate-400" />
                            <span className="truncate font-medium">Jump to pages, media, settings, or recent work</span>
                        </div>
                        <Link
                            href="/admin/pages"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-primary-200 hover:text-primary-700"
                        >
                            <HiOutlineLightningBolt className="text-base text-primary-500" />
                            Quick Edit
                        </Link>
                        <Link
                            href="/"
                            target="_blank"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)] transition-all hover:bg-primary-700"
                        >
                            View Site
                            <HiOutlineExternalLink className="text-base" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
