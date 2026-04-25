'use client'

import { createContext, useContext, useEffect } from 'react'

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => { } })

export function useTheme() {
    return useContext(ThemeContext)
}

export default function ThemeProvider({ children }) {
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', 'light')
        document.documentElement.classList.remove('dark')
        localStorage.removeItem('vbs-theme')
    }, [])

    return (
        <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => { } }}>
            {children}
        </ThemeContext.Provider>
    )
}
