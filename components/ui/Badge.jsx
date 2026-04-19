import clsx from 'clsx'

const variants = {
    default: 'bg-primary-50 text-primary-700',
    success: 'bg-emerald-50 text-emerald-700',
    warning: 'bg-amber-50 text-amber-700',
    info: 'bg-blue-50 text-blue-700',
    accent: 'bg-amber-50 text-amber-700',
}

export default function Badge({ children, variant = 'default', className = '' }) {
    return (
        <span
            className={clsx(
                'inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide',
                variants[variant],
                className,
            )}
        >
            {children}
        </span>
    )
}
