'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { useEffect, useMemo, useState } from 'react'
import {
    HiOutlineAcademicCap,
    HiOutlineBookOpen,
    HiOutlineCog,
    HiOutlineDocumentText,
    HiOutlineExternalLink,
    HiOutlineHome,
    HiOutlineInformationCircle,
    HiOutlineLink,
    HiOutlineLogout,
    HiOutlineMail,
    HiOutlineMenu,
    HiOutlinePhotograph,
    HiOutlineShieldCheck,
    HiOutlineTemplate,
    HiOutlineTrendingUp,
    HiOutlineUserGroup,
    HiOutlineViewGrid,
    HiOutlineX,
} from 'react-icons/hi'

const navGroups = [
    {
        title: 'Overview',
        items: [
            { label: 'Dashboard', href: '/admin/dashboard', icon: HiOutlineViewGrid, tone: 'from-primary-500 to-primary-700' },
            { label: 'Pages', href: '/admin/pages', icon: HiOutlineDocumentText, tone: 'from-sky-500 to-primary-600' },
            { label: 'Media Library', href: '/admin/media', icon: HiOutlinePhotograph, tone: 'from-violet-500 to-fuchsia-500' },
            { label: 'Learning Hub', href: '/admin/learning-hub', icon: HiOutlineBookOpen, tone: 'from-emerald-500 to-teal-500' },
        ],
    },
    {
        title: 'Growth',
        items: [
            { label: 'Enquiries', href: '/admin/enquiries', icon: HiOutlineMail, tone: 'from-amber-500 to-orange-500' },
            { label: 'Affiliate Links', href: '/admin/affiliates', icon: HiOutlineLink, tone: 'from-cyan-500 to-sky-500' },
            { label: 'Site Settings', href: '/admin/settings', icon: HiOutlineCog, tone: 'from-slate-700 to-slate-900' },
        ],
    },
    {
        title: 'Content Layouts',
        items: [
            { label: 'Home Page', href: '/admin/home', icon: HiOutlineHome, tone: 'from-primary-500 to-blue-600' },
            { label: 'Learning Hub Page', href: '/admin/learning-hub-page', icon: HiOutlineTemplate, tone: 'from-violet-500 to-indigo-600' },
            { label: 'Digital Skills', href: '/admin/digital-skills', icon: HiOutlineAcademicCap, tone: 'from-cyan-500 to-sky-600' },
            { label: 'Courses', href: '/admin/courses', icon: HiOutlineBookOpen, tone: 'from-emerald-500 to-lime-500' },
            { label: 'Career Guides', href: '/admin/career-guides', icon: HiOutlineTrendingUp, tone: 'from-orange-500 to-amber-500' },
            { label: 'About Us', href: '/admin/about-us', icon: HiOutlineInformationCircle, tone: 'from-pink-500 to-rose-500' },
        ],
    },
    {
        title: 'Policies',
        items: [
            { label: 'Terms & Conditions', href: '/admin/terms-and-conditions', icon: HiOutlineShieldCheck, tone: 'from-slate-600 to-slate-800' },
            { label: 'Privacy Policy', href: '/admin/privacy-policy', icon: HiOutlineShieldCheck, tone: 'from-slate-500 to-slate-700' },
        ],
    },
]

function SidebarLink({ item, pathname }) {
    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
    const Icon = item.icon

    return (
        <Link
            href={item.href}
            className={`group flex items-center gap-3 rounded-2xl border px-3 py-3 text-sm font-semibold transition-all duration-200 ${
                isActive
                    ? 'border-primary-200 bg-white text-slate-950 shadow-[0_10px_30px_rgba(72,115,174,0.12)]'
                    : 'border-transparent text-slate-600 hover:border-slate-200/80 hover:bg-white/80 hover:text-slate-950'
            }`}
        >
            <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm transition-transform ${
                    item.tone
                } ${isActive ? 'scale-105' : 'group-hover:scale-105'}`}
            >
                <Icon className="text-lg" />
            </div>
            <div className="min-w-0 flex-1">
                <div className="truncate">{item.label}</div>
                <div className={`mt-0.5 text-[11px] font-bold uppercase tracking-[0.18em] ${isActive ? 'text-primary-500' : 'text-slate-400'}`}>
                    {isActive ? 'Current' : 'Open'}
                </div>
            </div>
            {isActive && <div className="h-2.5 w-2.5 rounded-full bg-primary-500 shadow-[0_0_12px_rgba(72,115,174,0.6)]" />}
        </Link>
    )
}

export default function AdminSidebar({ user }) {
    const pathname = usePathname()
    const { data: session } = useSession()
    const [isOpen, setIsOpen] = useState(false)

    const currentUser = user || session?.user
    const firstName = currentUser?.name?.split(' ')?.[0] || 'Admin'

    const administrationItems = useMemo(() => {
        if (currentUser?.role !== 'SUPER_ADMIN') return []
        return [{ label: 'Team Members', href: '/admin/users', icon: HiOutlineUserGroup, tone: 'from-slate-800 to-black' }]
    }, [currentUser?.role])

    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    return (
        <>
            <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200/70 bg-white/90 px-4 backdrop-blur-xl lg:hidden">
                <Link href="/admin/dashboard" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-lg font-black text-white shadow-lg shadow-primary-500/25">
                        V
                    </div>
                    <div>
                        <div className="text-sm font-black tracking-tight text-slate-950">VBS Admin</div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Operations</div>
                    </div>
                </Link>
                <button
                    onClick={() => setIsOpen((open) => !open)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm"
                    aria-label="Toggle admin navigation"
                >
                    {isOpen ? <HiOutlineX className="text-2xl" /> : <HiOutlineMenu className="text-2xl" />}
                </button>
            </div>

            {isOpen && <div className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden" onClick={() => setIsOpen(false)} />}

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-[308px] max-w-[86vw] flex-col border-r border-slate-200/70 bg-[#f7faff]/95 backdrop-blur-xl transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:w-[320px] lg:translate-x-0 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="border-b border-slate-200/70 px-5 pb-5 pt-6">
                    <Link href="/admin/dashboard" className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-xl font-black text-white shadow-[0_14px_34px_rgba(72,115,174,0.30)]">
                            V
                        </div>
                        <div>
                            <div className="text-base font-black tracking-tight text-slate-950">VBS Admin</div>
                            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Content Workspace</div>
                        </div>
                    </Link>

                    <div className="mt-5 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-sm font-black uppercase text-white">
                                {currentUser?.name?.[0] || currentUser?.email?.[0] || 'A'}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="truncate text-sm font-bold text-slate-950">{currentUser?.name || 'Admin User'}</div>
                                <div className="truncate text-xs font-medium text-slate-500">{currentUser?.email}</div>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2.5">
                            <div>
                                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Role</div>
                                <div className="text-sm font-bold text-slate-700">{currentUser?.role || 'EDITOR'}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Today</div>
                                <div className="text-sm font-bold text-primary-600">Hi, {firstName}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-5">
                    {navGroups.map((group) => (
                        <div key={group.title}>
                            <div className="mb-3 px-2 text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">
                                {group.title}
                            </div>
                            <div className="space-y-2">
                                {group.items.map((item) => (
                                    <SidebarLink key={item.href} item={item} pathname={pathname} />
                                ))}
                            </div>
                        </div>
                    ))}

                    {administrationItems.length > 0 && (
                        <div>
                            <div className="mb-3 px-2 text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">
                                Administration
                            </div>
                            <div className="space-y-2">
                                {administrationItems.map((item) => (
                                    <SidebarLink key={item.href} item={item} pathname={pathname} />
                                ))}
                            </div>
                        </div>
                    )}
                </nav>

                <div className="border-t border-slate-200/70 p-4">
                    <div className="rounded-3xl border border-slate-200/80 bg-white p-3 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
                        <Link
                            href="/"
                            target="_blank"
                            className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 hover:text-primary-700"
                        >
                            <HiOutlineExternalLink className="text-lg text-primary-500" />
                            View Live Site
                        </Link>
                        <button
                            onClick={() => signOut({ callbackUrl: '/admin/login' })}
                            className="mt-1 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold text-slate-700 transition-all hover:bg-red-50 hover:text-red-600"
                        >
                            <HiOutlineLogout className="text-lg text-red-500" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>
        </>
    )
}
