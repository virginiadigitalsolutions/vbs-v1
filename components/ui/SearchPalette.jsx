'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { HiSearch, HiOutlineDocument, HiOutlineBookOpen, HiOutlineExternalLink, HiOutlineX } from 'react-icons/hi'
import { useTheme } from '@/components/ui/ThemeProvider'

const TYPE_ICONS = {
    page: HiOutlineDocument,
    blog: HiOutlineBookOpen,
    resource: HiOutlineExternalLink,
}

const TYPE_LABELS = {
    page: 'Pages',
    blog: 'Blog Posts',
    resource: 'Resources',
}

export default function SearchPalette() {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const inputRef = useRef(null)
    const router = useRouter()
    const { theme } = useTheme()
    const debounceRef = useRef(null)

    // Open on Ctrl+K / Cmd+K
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                setIsOpen((prev) => !prev)
            }
            if (e.key === 'Escape') {
                setIsOpen(false)
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100)
            setQuery('')
            setResults([])
            setActiveIndex(0)
        }
    }, [isOpen])

    // Debounced search
    const searchAPI = useCallback(async (q) => {
        if (q.length < 2) {
            setResults([])
            return
        }
        setLoading(true)
        try {
            const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
            const data = await res.json()
            setResults(data.results || [])
            setActiveIndex(0)
        } catch {
            setResults([])
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => searchAPI(query), 300)
        return () => clearTimeout(debounceRef.current)
    }, [query, searchAPI])

    // Navigate to result
    const navigateTo = (result) => {
        setIsOpen(false)
        if (result.external) {
            window.open(result.url, '_blank')
        } else {
            router.push(result.url)
        }
    }

    // Keyboard navigation
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setActiveIndex((i) => Math.min(i + 1, results.length - 1))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActiveIndex((i) => Math.max(i - 1, 0))
        } else if (e.key === 'Enter' && results[activeIndex]) {
            e.preventDefault()
            navigateTo(results[activeIndex])
        }
    }

    // Group results by type
    const grouped = results.reduce((acc, item) => {
        if (!acc[item.type]) acc[item.type] = []
        acc[item.type].push(item)
        return acc
    }, {})

    if (!isOpen) return null

    const isDark = theme === 'dark'

    return (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh]">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
            />

            {/* Palette */}
            <div className={`relative w-full max-w-2xl mx-4 rounded-2xl shadow-2xl border overflow-hidden ${isDark ? 'bg-[#111827]/95 border-white/10' : 'bg-white/95 border-gray-200'} backdrop-blur-2xl`}>
                {/* Search Input */}
                <div className={`flex items-center gap-3 px-5 py-4 border-b ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
                    <HiSearch className={`text-xl shrink-0 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search pages, blogs, resources..."
                        className={`flex-1 bg-transparent outline-none text-lg font-medium placeholder:font-normal ${isDark ? 'text-gray-100 placeholder:text-gray-600' : 'text-gray-900 placeholder:text-gray-400'}`}
                    />
                    <button
                        onClick={() => setIsOpen(false)}
                        className={`shrink-0 text-xs font-bold px-2 py-1 rounded-md border ${isDark ? 'text-gray-500 border-white/10 hover:bg-white/5' : 'text-gray-400 border-gray-200 hover:bg-gray-50'}`}
                    >
                        ESC
                    </button>
                </div>

                {/* Results */}
                <div className="max-h-[50vh] overflow-y-auto p-2">
                    {loading && (
                        <div className={`p-8 text-center text-sm font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            <div className="inline-block w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mr-2" />
                            Searching...
                        </div>
                    )}

                    {!loading && query.length >= 2 && results.length === 0 && (
                        <div className={`p-8 text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            <p className="text-4xl mb-3">🔍</p>
                            <p className="font-semibold">No results found</p>
                            <p className="text-sm mt-1">Try a different search term</p>
                        </div>
                    )}

                    {!loading && query.length < 2 && (
                        <div className={`p-8 text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            <p className="text-4xl mb-3">⌨️</p>
                            <p className="font-semibold text-sm">Type to search across all content</p>
                        </div>
                    )}

                    {!loading && Object.entries(grouped).map(([type, items]) => {
                        const Icon = TYPE_ICONS[type] || HiOutlineDocument
                        return (
                            <div key={type} className="mb-2">
                                <div className={`px-3 py-2 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                    {TYPE_LABELS[type] || type}
                                </div>
                                {items.map((item) => {
                                    const flatIndex = results.indexOf(item)
                                    const isActive = flatIndex === activeIndex
                                    return (
                                        <button
                                            key={`${type}-${item.url}`}
                                            onClick={() => navigateTo(item)}
                                            onMouseEnter={() => setActiveIndex(flatIndex)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-150 ${isActive
                                                ? isDark
                                                    ? 'bg-primary-500/15 text-primary-300'
                                                    : 'bg-primary-50 text-primary-700'
                                                : isDark
                                                    ? 'text-gray-300 hover:bg-white/5'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            <Icon className={`text-lg shrink-0 ${isActive ? 'text-primary-500' : isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-sm truncate">{item.title}</p>
                                                {item.description && (
                                                    <p className={`text-xs truncate mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                                        {item.description}
                                                    </p>
                                                )}
                                            </div>
                                            {item.external && (
                                                <HiOutlineExternalLink className="text-sm shrink-0 opacity-50" />
                                            )}
                                        </button>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>

                {/* Footer */}
                <div className={`px-5 py-3 border-t flex items-center justify-between text-xs font-medium ${isDark ? 'border-white/10 text-gray-600' : 'border-gray-100 text-gray-400'}`}>
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                            <kbd className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-200'}`}>↑↓</kbd>
                            Navigate
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-200'}`}>↵</kbd>
                            Open
                        </span>
                    </div>
                    <span>Powered by VBS</span>
                </div>
            </div>
        </div>
    )
}
