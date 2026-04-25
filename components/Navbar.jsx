'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { HiChevronDoubleRight } from 'react-icons/hi'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

export default function Navbar({ settings }) {
    const [open, setOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 15)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const siteName = settings?.siteName || 'Virginia Business Solutions'
    const logoUrl = settings?.logoUrl || ''

    const navLinks = settings?.navLinks || [
        { label: 'HOME', url: '/' },
        { label: 'Learning Hub', url: '/learning-hub' },
        { label: 'Digital Skills', url: '/digital-skills' },
        { label: 'Courses & Certifications', url: '/courses-certifications' },
        { label: 'Career Guides', url: '/career-guides' },
        { label: 'About', url: '/about-us' },
    ]

    const checkActive = (url) => {
        if (url === '/') return pathname === url
        return pathname?.startsWith(url)
    }

    return (
        <header className={clsx(
            "fixed top-0 left-0 right-0 z-50 w-full px-4 lg:px-8 flex justify-center pointer-events-none transition-all duration-500",
            isScrolled ? "pt-2 lg:pt-4" : "pt-4 xl:pt-6"
        )}>
            {/* Floating Glass navbar */}
            <div className={clsx(
                "pointer-events-auto w-full max-w-[1320px] transition-all duration-500 border rounded-2xl relative",
                isScrolled
                    ? "bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-2xl border-gray-200/50 dark:border-slate-800/80 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                    : "bg-white dark:bg-transparent backdrop-blur-lg border-transparent shadow-[0_4px_16px_rgba(0,0,0,0.03)] dark:shadow-none"
            )}>

                {/* Animated gradient top border on scroll */}
                <div className={clsx(
                    "absolute top-0 inset-x-0 h-[1.5px] bg-linear-to-r from-transparent via-primary-500/50 to-transparent transition-opacity duration-500 rounded-t-2xl",
                    isScrolled ? "opacity-100" : "opacity-0"
                )} />

                <div className={clsx(
                    "flex items-center justify-between px-5 lg:px-6 transition-all duration-500",
                    isScrolled ? "h-[72px]" : "h-[88px]"
                )}>

                    {/* Logo Area */}
                    <Link href="/" className="flex items-center gap-3 group shrink-0">
                        {logoUrl ? (
                            <div className="relative flex items-center">
                                <Image 
                                    src={logoUrl} 
                                    alt={siteName} 
                                    width={200} 
                                    height={60} 
                                    className="h-14 lg:h-16 w-auto object-contain transition-all duration-500 group-hover:scale-105 dark:invert dark:hue-rotate-180" 
                                    unoptimized 
                                />
                                {/* Optional subtle glow in dark mode for image logos */}
                                <div className="absolute inset-0 bg-white/5 dark:bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <div className="relative w-12 h-12 flex items-center justify-center bg-linear-to-br from-primary-500 to-primary-700 rounded-[14px] shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 group-hover:-translate-y-0.5 transition-all duration-300">
                                    <span className="font-black text-white text-[22px] z-10">V</span>
                                    <div className="absolute inset-0 bg-white/20 rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="hidden sm:flex flex-col">
                                    <span className="font-bold text-gray-900 dark:text-gray-100 text-2xl tracking-tighter leading-tight uppercase">
                                        {siteName.split(' ')[0]}
                                    </span>
                                    <span className="text-xs font-bold text-primary-500 dark:text-primary-400 tracking-[0.2em] uppercase">
                                        {siteName.split(' ').slice(1).join(' ')}
                                    </span>
                                </div>
                            </div>
                        )}
                    </Link>

                    {/* Desktop Nav Links */}
                    <nav className="hidden lg:flex items-center gap-1 relative">
                        {navLinks.map((link, i) => {
                            const isActive = checkActive(link.url)
                            return (
                                <Link
                                    key={i}
                                    href={link.url}
                                    className={clsx(
                                        "relative px-4 py-2 rounded-lg text-[14px] font-semibold transition-colors z-10",
                                        isActive
                                            ? "text-primary-800 dark:text-white"
                                            : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activePill"
                                            className="absolute inset-0 bg-primary-100 dark:bg-primary-900/30 rounded-lg -z-10 shadow-sm border border-primary-200 dark:border-primary-800/30"
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                    {link.label}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Right side interactions */}
                    <div className="flex items-center gap-2">

                        <Link
                            href="/contact"
                            className="btn-premium py-1.5! px-5! gap-3! text-sm"
                        >
                            <span>Contact Us</span>
                            <span className="btn-premium-icon h-8! w-12!">
                                <HiChevronDoubleRight className="text-sm" />
                            </span>
                        </Link>


                        {/* Mobile Hamburger */}
                        <button
                            className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-colors text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800"
                            onClick={() => setOpen(!open)}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                {open
                                    ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                }
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={clsx(
                            "pointer-events-auto absolute left-4 right-4 backdrop-blur-2xl shadow-2xl p-6 border rounded-2xl lg:hidden flex flex-col gap-1 z-50 mx-auto max-w-[1320px] overflow-hidden bg-white/95 border-gray-100 dark:bg-[#0B1120]/95 dark:border-slate-800",
                            isScrolled ? "top-[80px]" : "top-[96px]"
                        )}
                    >
                        {navLinks.map((link, i) => {
                            const isActive = checkActive(link.url)
                            return (
                                <Link
                                    key={`mobile-${i}`}
                                    href={link.url}
                                    className={clsx(
                                        "px-4 py-3 rounded-xl font-semibold text-[15px] transition-all",
                                        isActive
                                            ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                                            : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-slate-800/50'
                                    )}
                                    onClick={() => setOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                        <div className="h-px w-full my-2 bg-gray-100 dark:bg-white/10" />

                        <Link
                            href="/contact"
                            className="mx-1 mt-2 px-4 py-3.5 rounded-xl flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-bold text-[14px] shadow-md active:scale-[0.98] transition-all"
                            onClick={() => setOpen(false)}
                        >
                            Contact Us
                        </Link>

                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

