'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const variants = {
    primary:
        'bg-primary-600 text-white hover:bg-primary-700 shadow-xl shadow-primary-500/20 active:shadow-none',
    secondary:
        'bg-white dark:bg-white/5 text-primary-900 dark:text-white border border-primary-200 dark:border-white/10 hover:bg-primary-50 dark:hover:bg-white/10',
    white: 
        'bg-white text-gray-900 hover:bg-gray-50 shadow-2xl',
    outline:
        'bg-transparent border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white',
    ghost: 
        'text-primary-700 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30',
}

const sizes = {
    sm: 'px-5 py-2.5 text-xs font-black tracking-widest uppercase',
    md: 'px-8 py-4 text-sm font-black tracking-wider uppercase',
    lg: 'px-12 py-6 text-base font-black tracking-widest uppercase',
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    href,
    showShimmer = true,
    ...props
}) {
    const base = 'inline-flex items-center justify-center gap-3 rounded-2xl transition-all duration-300 relative overflow-hidden group font-black'
    const classes = cn(base, variants[variant], sizes[size], className)

    const motionProps = {
        whileHover: { scale: 1.02, y: -2 },
        whileTap: { scale: 0.98, y: 0 },
        className: classes,
        ...props
    }

    const content = (
        <>
            <span className="relative z-10 flex items-center gap-2">{children}</span>
            {showShimmer && (
                <div className="absolute inset-0 -z-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                </div>
            )}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-active:opacity-100 transition-opacity pointer-events-none" />
        </>
    )

    if (href) {
        return (
            <motion.div {...motionProps}>
                <Link href={href} className="w-full h-full flex items-center justify-center">
                    {content}
                </Link>
            </motion.div>
        )
    }

    return (
        <motion.button {...motionProps}>
            {content}
        </motion.button>
    )
}
