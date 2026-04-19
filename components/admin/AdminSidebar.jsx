'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'
import {
    HiOutlineMenu,
    HiOutlineX,
    HiOutlineViewGrid,
    HiOutlineDocumentText,
    HiOutlinePhotograph,
    HiOutlineCog,
    HiOutlineLink,
    HiOutlineUserGroup,
    HiOutlineLogout,
    HiOutlineExternalLink,
    HiOutlineMail,
    HiOutlineAcademicCap,
    HiOutlineBookOpen,
    HiOutlineTrendingUp,
    HiOutlineInformationCircle,
    HiOutlineShieldCheck,
    HiOutlineHome,
    HiOutlineTemplate,
} from 'react-icons/hi'

const mainNavItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: HiOutlineViewGrid },
    { label: 'CMS Pages', href: '/admin/pages', icon: HiOutlineDocumentText },
    { label: 'Media Library', href: '/admin/media', icon: HiOutlinePhotograph },
    { label: 'Learning Hub', href: '/admin/learning-hub', icon: HiOutlineBookOpen },
    { label: 'Enquiries', href: '/admin/enquiries', icon: HiOutlineMail },
    { label: 'Affiliate Links', href: '/admin/affiliates', icon: HiOutlineLink },
    { label: 'Site Settings', href: '/admin/settings', icon: HiOutlineCog },
]

const contentNavItems = [
    { label: 'Home Page', href: '/admin/home', icon: HiOutlineHome },
    { label: 'Learning Hub Page', href: '/admin/learning-hub-page', icon: HiOutlineTemplate },
    { label: 'Digital Skills', href: '/admin/digital-skills', icon: HiOutlineAcademicCap },
    { label: 'Courses', href: '/admin/courses', icon: HiOutlineBookOpen },
    { label: 'Career Guides', href: '/admin/career-guides', icon: HiOutlineTrendingUp },
    { label: 'About Us', href: '/admin/about-us', icon: HiOutlineInformationCircle },
]

const legalNavItems = [
    { label: 'Terms & Conditions', href: '/admin/terms-and-conditions', icon: HiOutlineShieldCheck },
    { label: 'Privacy Policy', href: '/admin/privacy-policy', icon: HiOutlineShieldCheck },
]

function SidebarLink({ item, pathname }) {
    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
    const Icon = item.icon

    return (
        <Link
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group ${isActive
                ? 'bg-primary-50 text-primary-700 border border-primary-100 shadow-[0_2px_10px_rgba(72,115,174,0.05)]'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
        >
            <Icon className={`text-lg shrink-0 ${isActive ? 'text-primary-400' : 'text-gray-500 group-hover:text-gray-700'}`} />
            <span>{item.label}</span>
            {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />}
        </Link>
    )
}

function SidebarSection({ title, items, pathname }) {
    return (
        <>
            <div className="pt-4 pb-2">
                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-4">{title}</p>
            </div>
            {items.map((item) => (
                <SidebarLink key={item.href} item={item} pathname={pathname} />
            ))}
        </>
    )
}

export default function AdminSidebar({ user }) {
    const pathname = usePathname()
    const { data: session } = useSession()
    const [isOpen, setIsOpen] = useState(false)

    const currentUser = user || session?.user

    useEffect(() => {
        const t = setTimeout(() => setIsOpen(false), 0)
        return () => clearTimeout(t)
    }, [pathname])

    return (
        <>
            <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-white border-b border-gray-100 shrink-0 sticky top-0 z-40 w-full">
                <Link href="/admin/dashboard" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-linear-to-b from-primary-500 to-primary-700 flex items-center justify-center shadow-md">
                        <span className="text-white font-black text-sm">V</span>
                    </div>
                    <div>
                        <h1 className="text-gray-900 font-extrabold text-sm tracking-tight">VBS Admin</h1>
                    </div>
                </Link>
                <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                    {isOpen ? <HiOutlineX className="text-2xl" /> : <HiOutlineMenu className="text-2xl" />}
                </button>
            </div>

            {isOpen && (
                <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden" />
            )}

            <aside className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-72 bg-white lg:border-r border-gray-100 flex flex-col select-none transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="p-6 pb-2 hidden lg:block">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-b from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-shadow">
                            <span className="text-white font-black text-lg">V</span>
                        </div>
                        <div>
                            <h1 className="text-gray-900 font-extrabold text-base tracking-tight">VBS Admin</h1>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Control Panel</p>
                        </div>
                    </Link>
                </div>

                {currentUser && (
                    <div className="mx-4 mt-4 mb-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-linear-to-b from-primary-500 to-primary-700 flex items-center justify-center text-white text-xs font-black uppercase">
                                {currentUser.name?.[0] || currentUser.email?.[0] || 'A'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-gray-900 text-xs font-bold truncate">{currentUser.name || 'Admin'}</p>
                                <p className="text-gray-500 text-[10px] font-semibold truncate">{currentUser.email}</p>
                            </div>
                        </div>
                    </div>
                )}

                <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-4 mb-3">Main Menu</p>
                    {mainNavItems.map((item) => (
                        <SidebarLink key={item.href} item={item} pathname={pathname} />
                    ))}

                    <SidebarSection title="Content Pages" items={contentNavItems} pathname={pathname} />
                    <SidebarSection title="Legal" items={legalNavItems} pathname={pathname} />

                    {currentUser?.role === 'SUPER_ADMIN' && (
                        <>
                            <div className="pt-4 pb-2">
                                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-4">Administration</p>
                            </div>
                            <SidebarLink item={{ label: 'Team Members', href: '/admin/users', icon: HiOutlineUserGroup }} pathname={pathname} />
                        </>
                    )}
                </nav>

                <div className="p-3 space-y-1 border-t border-gray-100">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-all group"
                    >
                        <HiOutlineExternalLink className="text-lg group-hover:text-primary-400" />
                        <span>View Live Site</span>
                    </Link>
                    <button
                        onClick={() => signOut({ callbackUrl: '/admin/login' })}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:text-red-500 hover:bg-red-50 transition-all group"
                    >
                        <HiOutlineLogout className="text-lg group-hover:text-red-400" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    )
}
