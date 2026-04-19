'use client'

import { motion } from 'framer-motion'

/* ─── Reusable SVG Vector Decorations for Pages ───────────────────
   Animated SVG shapes that add visual depth between sections.
   Import and place these between or inside layout sections.
─────────────────────────────────────────────────────────────────── */

/* ── Modern Mesh Gradient ────────────────────────────────────────── */
export function MeshGradient({ className = '' }) {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary-400/10 blur-[120px] animate-morph-blob" />
            <div className="absolute top-[20%] -right-[5%] w-[35%] h-[35%] rounded-full bg-accent-400/10 blur-[100px] animate-morph-blob delay-2000" />
            <div className="absolute -bottom-[10%] left-[15%] w-[30%] h-[30%] rounded-full bg-primary-300/10 blur-[110px] animate-morph-blob delay-5000" />
        </div>
    )
}

/* ── Modern Grid with Light Beams ─────────────────────────────────── */
export function ModernGrid({ className = '', showBeams = true }) {
    return (
        <div className={`absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] ${className}`}>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            
            {showBeams && (
                <>
                    <motion.div 
                        initial={{ x: '-100%', opacity: 0 }}
                        animate={{ x: '100%', opacity: [0, 1, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[20%] left-0 w-full h-px bg-linear-to-r from-transparent via-primary-500 to-transparent"
                    />
                    <motion.div 
                        initial={{ y: '-100%', opacity: 0 }}
                        animate={{ y: '100%', opacity: [0, 1, 0] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 2 }}
                        className="absolute top-0 left-[30%] w-px h-full bg-linear-to-b from-transparent via-accent-300 to-transparent"
                    />
                </>
            )}
        </div>
    )
}

/* ── Floating Dots Grid ──────────────────────────────────────────── */
export function DotsGrid({ className = '', color = 'text-primary-300 dark:text-primary-600' }) {
    return (
        <svg className={`absolute pointer-events-none opacity-20 ${color} ${className}`} width="200" height="200" viewBox="0 0 200 200" fill="currentColor">
            {Array.from({ length: 100 }).map((_, i) => (
                <circle key={i} cx={(i % 10) * 20 + 10} cy={Math.floor(i / 10) * 20 + 10} r="2" />
            ))}
        </svg>
    )
}

/* ── Abstract Glass Shapes ───────────────────────────────────────── */
export function GlassShapes({ className = '' }) {
    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
            <motion.div 
                animate={{ 
                    rotate: [0, 90, 180, 270, 360],
                    scale: [1, 1.1, 1, 0.9, 1]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute top-[10%] right-[10%] w-96 h-96 border border-primary-500/10 dark:border-primary-400/5 rounded-[40px] rotate-12 backdrop-blur-[2px]"
            />
            <motion.div 
                animate={{ 
                    rotate: [360, 270, 180, 90, 0],
                    scale: [1, 0.9, 1, 1.1, 1]
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[20%] left-[5%] w-64 h-64 border border-accent-500/10 dark:border-accent-400/5 rounded-full backdrop-blur-[1px]"
            />
        </div>
    )
}

/* ── Abstract Circuit Lines ──────────────────────────────────────── */
export function CircuitLines({ className = '', color = 'text-primary-200 dark:text-primary-700' }) {
    return (
        <svg className={`absolute pointer-events-none opacity-30 ${color} ${className}`} width="300" height="300" viewBox="0 0 300 300" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M50 150 H120 V80 H200" strokeLinecap="round" />
            <path d="M80 250 V180 H180 V100" strokeLinecap="round" />
            <path d="M200 250 H250 V150 H280" strokeLinecap="round" />
            <circle cx="120" cy="80" r="4" fill="currentColor" />
            <circle cx="180" cy="100" r="4" fill="currentColor" />
            <circle cx="250" cy="150" r="4" fill="currentColor" />
            <circle cx="50" cy="150" r="4" fill="currentColor" />
            <circle cx="80" cy="250" r="4" fill="currentColor" />
        </svg>
    )
}

/* ── Floating Geometric Shapes ───────────────────────────────────── */
export function FloatingShapes({ className = '' }) {
    return (
        <div className={`absolute pointer-events-none ${className}`}>
            {/* Triangle */}
            <svg className="absolute top-0 left-0 w-16 h-16 text-primary-300/20 dark:text-primary-500/15 animate-float-slow" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="32,8 56,56 8,56" />
            </svg>
            {/* Circle */}
            <svg className="absolute top-20 right-10 w-12 h-12 text-accent-300/25 dark:text-accent-500/15 animate-float" style={{ animationDelay: '1s' }} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="24" cy="24" r="20" />
            </svg>
            {/* Square rotated */}
            <svg className="absolute bottom-10 left-10 w-10 h-10 text-primary-200/20 dark:text-primary-600/15 animate-float-slow" style={{ animationDelay: '2s' }} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="8" y="8" width="24" height="24" rx="3" transform="rotate(15 20 20)" />
            </svg>
            {/* Plus sign */}
            <svg className="absolute bottom-20 right-5 w-8 h-8 text-accent-400/20 dark:text-accent-600/15 animate-sparkle" viewBox="0 0 32 32" fill="currentColor">
                <rect x="13" y="4" width="6" height="24" rx="3" />
                <rect x="4" y="13" width="24" height="6" rx="3" />
            </svg>
        </div>
    )
}

/* ── Wave Section Divider ────────────────────────────────────────── */
export function WaveDivider({ flip = false, className = '', color = 'fill-white dark:fill-slate-900' }) {
    return (
        <div className={`absolute left-0 right-0 overflow-hidden leading-none ${flip ? 'top-0 rotate-180' : 'bottom-0'} ${className}`}>
            <svg className={`relative w-full h-[40px] md:h-[60px] ${color}`} viewBox="0 0 1440 60" preserveAspectRatio="none">
                <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z" />
            </svg>
        </div>
    )
}

/* ── Hexagon Grid ────────────────────────────────────────────────── */
export function HexGrid({ className = '', color = 'text-primary-200/15 dark:text-primary-600/10' }) {
    return (
        <svg className={`absolute pointer-events-none ${color} ${className}`} width="240" height="200" viewBox="0 0 240 200" fill="none" stroke="currentColor" strokeWidth="1">
            {[
                [40, 30], [100, 30], [160, 30],
                [70, 80], [130, 80], [190, 80],
                [40, 130], [100, 130], [160, 130],
            ].map(([cx, cy], i) => (
                <polygon key={i} points={hexPoints(cx, cy, 28)} />
            ))}
        </svg>
    )
}

function hexPoints(cx, cy, r) {
    return Array.from({ length: 6 })
        .map((_, i) => {
            const angle = (Math.PI / 3) * i - Math.PI / 6
            return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`
        })
        .join(' ')
}

/* ── Gradient Orb ────────────────────────────────────────────────── */
export function GradientOrb({ className = '', size = 'w-64 h-64', colors = 'from-primary-400/10 to-accent-400/10 dark:from-primary-600/8 dark:to-accent-600/5' }) {
    return (
        <div className={`absolute rounded-full bg-linear-to-br ${colors} ${size} blur-3xl pointer-events-none animate-morph-blob ${className}`} />
    )
}

/* ── Section Connector Line ──────────────────────────────────────── */
export function SectionConnector({ className = '' }) {
    return (
        <div className={`flex justify-center ${className}`}>
            <div className="w-px h-16 bg-linear-to-b from-primary-300/40 via-primary-400/20 to-transparent dark:from-primary-600/30 dark:via-primary-600/10" />
        </div>
    )
}

/* ── Floating Icons Cloud ────────────────────────────────────────── */
export function FloatingIcons({ className = '', icons = ['📊', '💡', '🚀', '📱', '⚡'] }) {
    return (
        <div className={`absolute pointer-events-none ${className}`}>
            {icons.map((icon, i) => (
                <span
                    key={i}
                    className="absolute text-2xl opacity-10 animate-float-slow select-none"
                    style={{
                        top: `${15 + (i * 20) % 80}%`,
                        left: `${5 + (i * 25) % 90}%`,
                        animationDelay: `${i * 0.8}s`,
                        animationDuration: `${5 + i}s`,
                    }}
                >
                    {icon}
                </span>
            ))}
        </div>
    )
}
