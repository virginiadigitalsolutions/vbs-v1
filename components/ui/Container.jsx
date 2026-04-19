import { cn } from '@/lib/utils'

export default function Container({ children, className = '', width = '7xl' }) {
    const maxWidths = {
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        '7xl': 'max-w-7xl',
        'full': 'max-w-full'
    }

    return (
        <div className={cn('mx-auto px-6 sm:px-10 lg:px-12 w-full', maxWidths[width], className)}>
            {children}
        </div>
    )
}
