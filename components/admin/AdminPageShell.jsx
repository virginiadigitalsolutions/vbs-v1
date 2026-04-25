import Link from 'next/link'

export function AdminPageShell({ children, className = '' }) {
    return <div className={`space-y-6 ${className}`.trim()}>{children}</div>
}

export function AdminPageHeader({
    eyebrow,
    title,
    description,
    action,
    meta = [],
}) {
    return (
        <section className="overflow-hidden rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:p-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                    {eyebrow && (
                        <div className="mb-3 text-[11px] font-black uppercase tracking-[0.22em] text-primary-600">
                            {eyebrow}
                        </div>
                    )}
                    <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-[2rem]">{title}</h2>
                    {description && (
                        <p className="mt-3 text-sm font-medium leading-7 text-slate-500 sm:text-base">
                            {description}
                        </p>
                    )}
                </div>
                {action && <div className="shrink-0">{action}</div>}
            </div>

            {meta.length > 0 && (
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {meta.map((item) => (
                        <div key={item.label} className="rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-3">
                            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                                {item.label}
                            </div>
                            <div className="mt-1 text-sm font-bold text-slate-900">{item.value}</div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}

export function AdminStatsGrid({ items = [] }) {
    if (!items.length) return null

    return (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {items.map((item) => {
                const Icon = item.icon
                return (
                    <div
                        key={item.label}
                        className="rounded-[24px] border border-slate-200/70 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
                    >
                        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent || 'from-slate-700 to-slate-900'} text-white shadow-sm`}>
                            {Icon ? <Icon className="text-xl" /> : <span className="text-sm font-black">{item.value}</span>}
                        </div>
                        <div className="mt-4 text-3xl font-black tracking-tight text-slate-950">{item.value}</div>
                        <div className="mt-1 text-sm font-bold text-slate-800">{item.label}</div>
                        {item.detail && (
                            <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                                {item.detail}
                            </div>
                        )}
                    </div>
                )
            })}
        </section>
    )
}

export function AdminPanel({ title, description, action, children, padded = true }) {
    return (
        <section className="overflow-hidden rounded-[28px] border border-slate-200/70 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
            {(title || description || action) && (
                <div className="flex flex-col gap-4 border-b border-slate-200/70 px-6 py-5 sm:flex-row sm:items-start sm:justify-between sm:px-7">
                    <div className="max-w-2xl">
                        {title && <h3 className="text-lg font-black tracking-tight text-slate-950">{title}</h3>}
                        {description && <p className="mt-1 text-sm font-medium leading-7 text-slate-500">{description}</p>}
                    </div>
                    {action && <div className="shrink-0">{action}</div>}
                </div>
            )}
            <div className={padded ? 'px-6 py-6 sm:px-7' : ''}>{children}</div>
        </section>
    )
}

export function AdminActionButton({ href, children, target, variant = 'primary' }) {
    const classes =
        variant === 'secondary'
            ? 'border border-slate-200 bg-white text-slate-700 hover:border-primary-200 hover:text-primary-700'
            : 'bg-slate-950 text-white hover:bg-primary-700 shadow-[0_12px_30px_rgba(15,23,42,0.16)]'

    return (
        <Link
            href={href}
            target={target}
            className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition-all ${classes}`}
        >
            {children}
        </Link>
    )
}
