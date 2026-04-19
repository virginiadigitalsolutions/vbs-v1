'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => { } })

export function useTheme() {
    return useContext(ThemeContext)
}

// Read initial theme synchronously to avoid flash
function getInitialTheme() {
    if (typeof window === 'undefined') return 'light'
    const stored = localStorage.getItem('vbs-theme')
    if (stored) return stored
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
    return 'light'
}

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(getInitialTheme)

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('vbs-theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
