'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Reveal — CSS-only scroll reveal using IntersectionObserver.
 * 
 * WHY: Replaced framer-motion (motion.div with opacity/y) which:
 *   1. Ran on the JS main thread → caused 72 "non-composited animation" warnings
 *   2. Started with opacity:0, meaning LCP elements inside were invisible until
 *      JS hydrated → directly caused the 26s mobile LCP disaster
 * 
 * This implementation:
 *   - Uses CSS transitions (GPU compositor thread, zero TBT impact)
 *   - Uses IntersectionObserver (off main thread)
 *   - Does NOT hide content before hydration (no opacity:0 on SSR)
 */

export function Reveal({
    children,
    className,
    delay = 0,
    yOffset = 40,
    xOffset = 0,
    duration = 0.8,
    once = true,
}) {
    const ref = useRef(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        // Apply initial hidden state only after mount (not SSR) so LCP elements
        // are visible before JS runs, then animate in when scrolled into view.
        el.style.opacity = '0'
        el.style.transform = `translateY(${yOffset}px) translateX(${xOffset}px)`
        el.style.transition = `opacity ${duration}s cubic-bezier(0.21,0.47,0.32,0.98) ${delay}s, transform ${duration}s cubic-bezier(0.21,0.47,0.32,0.98) ${delay}s`

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.style.opacity = '1'
                    el.style.transform = 'none'
                    if (once) observer.disconnect()
                }
            },
            { rootMargin: '-10% 0px -10% 0px', threshold: 0 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [delay, yOffset, xOffset, duration, once])

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    )
}

export function StaggerChildren({ children, className, delay = 0.1, staggerAmount = 0.1, once = true }) {
    const ref = useRef(null)

    useEffect(() => {
        const container = ref.current
        if (!container) return

        // Stagger direct children via CSS transitions
        const items = Array.from(container.children)
        items.forEach((item, i) => {
            item.style.opacity = '0'
            item.style.transform = 'translateY(24px)'
            item.style.transition = `opacity 0.6s ease ${delay + i * staggerAmount}s, transform 0.6s ease ${delay + i * staggerAmount}s`
        })

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    items.forEach((item) => {
                        item.style.opacity = '1'
                        item.style.transform = 'none'
                    })
                    if (once) observer.disconnect()
                }
            },
            { rootMargin: '-10% 0px -10% 0px', threshold: 0 }
        )
        observer.observe(container)
        return () => observer.disconnect()
    }, [delay, staggerAmount, once])

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    )
}

export function Child({ children, className }) {
    // Child is used inside StaggerChildren which already handles the animation.
    // Just a passthrough wrapper now.
    return (
        <div className={className}>
            {children}
        </div>
    )
}
