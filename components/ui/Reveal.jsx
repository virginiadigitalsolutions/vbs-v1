'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

export function Reveal({ 
    children, 
    className, 
    delay = 0, 
    yOffset = 40, 
    xOffset = 0,
    duration = 0.8, 
    scale = 1, 
    rotate = 0,
    once = true 
}) {
    const ref = useRef(null)
    const inView = useInView(ref, { once, margin: "-10% 0px -10% 0px" })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: yOffset, x: xOffset, scale: scale, rotate: rotate }}
            animate={inView ? { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 } : { opacity: 0, y: yOffset, x: xOffset, scale: scale, rotate: rotate }}
            transition={{
                duration,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function StaggerChildren({ children, className, delay = 0.1, staggerAmount = 0.1, once = true }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once, margin: "-10% 0px -10% 0px" })

    const variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: delay,
                staggerChildren: staggerAmount,
            },
        },
    }

    return (
        <motion.div
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function Child({ children, className, yOffset = 30, xOffset = 0, rotate = 0, scale = 1 }) {
    const variants = {
        hidden: { opacity: 0, y: yOffset, x: xOffset, rotate: rotate, scale: scale },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            rotate: 0,
            scale: 1,
            transition: {
                duration: 0.7,
                ease: [0.21, 0.47, 0.32, 0.98]
            }
        },
    }

    return (
        <motion.div variants={variants} className={className}>
            {children}
        </motion.div>
    )
}
