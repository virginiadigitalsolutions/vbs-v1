'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { HiChevronUp } from 'react-icons/hi'

export default function ClientEnhancements() {
    const [loading, setLoading] = useState(true)
    const [scrollPct, setScrollPct] = useState(0)
    const [showTopBtn, setShowTopBtn] = useState(false)
    const pathname = usePathname()

    // 1. Loader Effect
    useEffect(() => {
        // Schedule the loading true state out of the sync effect loop to satisfy linter
        const startTimer = setTimeout(() => {
            setLoading(true)
        }, 0)

        const endTimer = setTimeout(() => {
            setLoading(false)
        }, 500)

        return () => {
            clearTimeout(startTimer)
            clearTimeout(endTimer)
        }
    }, [pathname])

    // 2. Scroll Progress & Scroll-to-Top Button Visibility
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight

            const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
            setScrollPct(scrolled)
            setShowTopBtn(scrollTop > 400)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <>
            {/* Scroll Progress Bar */}
            <div
                className="fixed top-0 left-0 h-[3px] bg-linear-to-r from-primary-400 via-primary-500 to-secondary-400 z-9999 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(65,114,181,0.5)]"
                style={{ width: `${scrollPct}%` }}
            />

            {/* Floating Glass Scroll To Top Button */}
            <button
                onClick={scrollToTop}
                className={`fixed right-6 bottom-6 w-12 h-12 bg-white/70 backdrop-blur-xl border border-white/80 hover:border-primary-300 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 z-9000 focus:outline-none group ${showTopBtn ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none translate-y-4'}`}
                aria-label="Scroll to top"
            >
                <div className="absolute inset-0 rounded-full bg-primary-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <HiChevronUp className="text-3xl text-gray-400 group-hover:text-primary-600 z-10 transition-colors" />
            </button>

            {/* Premium Light Glass Page Loader Overlay */}
            <div
                className={`fixed inset-0 z-10000 flex flex-col items-center justify-center bg-[#F8FAFC]/90 backdrop-blur-2xl transition-opacity duration-500 ease-in-out pointer-events-none ${loading ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
                <div className="relative w-16 h-16 flex items-center justify-center mb-6">
                    <div className="absolute inset-0 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin" />
                    <span className="font-black text-primary-600 text-2xl z-10 pt-[2px]">V</span>
                </div>
                <h2 className="text-primary-800 font-extrabold tracking-[0.2em] text-sm md:text-base uppercase animate-pulse">
                    Virginia...
                </h2>
            </div>
        </>
    )
}
