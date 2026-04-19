'use client'

/**
 * WaveSeparator — Smooth SVG wave/gradient transition between sections
 * @param {string} variant - "wave" | "curve" | "tilt"
 * @param {boolean} flip - Flip vertically (for top placement)
 * @param {string} fillColor - Fill color for the wave shape
 * @param {string} className - Additional classes
 */
export default function WaveSeparator({ 
    variant = 'wave', 
    flip = false, 
    fillColor = '#F5F7FA',
    className = '' 
}) {
    const flipClass = flip ? 'rotate-180' : ''

    if (variant === 'curve') {
        return (
            <div className={`wave-separator ${flipClass} ${className}`}>
                <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M0 80L1440 80L1440 30C1440 30 1200 0 720 0C240 0 0 30 0 30L0 80Z" fill={fillColor} />
                </svg>
            </div>
        )
    }

    if (variant === 'tilt') {
        return (
            <div className={`wave-separator ${flipClass} ${className}`}>
                <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <polygon points="0,60 1440,20 1440,60" fill={fillColor} />
                </svg>
            </div>
        )
    }

    // Default wave
    return (
        <div className={`wave-separator ${flipClass} ${className}`}>
            <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path
                    d="M0 50L48 45C96 40 192 30 288 28C384 26 480 32 576 40C672 48 768 58 864 56C960 54 1056 40 1152 34C1248 28 1344 30 1392 31L1440 32V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z"
                    fill={fillColor}
                />
            </svg>
        </div>
    )
}
